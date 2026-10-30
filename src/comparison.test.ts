import { expect, test } from "vitest";
import { catalog as reviewedCatalog, type Catalog } from "./catalog";
import { compare } from "./comparison";
// Preserve the original worked examples independently of later tariff revisions.
const catalog: Catalog = {
  ...reviewedCatalog,
  plans: reviewedCatalog.plans
    .filter((p) => p.revisions.length)
    .map((p) => ({
      ...p,
      ...p.revisions[0],
      revisions: [],
      verification_attempts: [],
    })),
};

// Synthetic overlaps exercise grouping only; these are never release offers.
function overlappingCatalog(): Catalog {
  const sample = structuredClone(catalog);
  const original = sample.plans[0];
  sample.providers.other = {
    ...sample.providers.manageit,
    name: "Other provider",
  };
  sample.sources.other = {
    ...sample.sources.manageit,
    provider: "other",
    url: "https://example.com/tariff",
  };
  sample.plans = [
    original,
    {
      ...structuredClone(original),
      id: "second",
      provider: "other",
      source: "other",
      evidence: { ...structuredClone(original.evidence), sources: ["other"] },
      advertised_monthly_toman: 800000,
    },
  ];
  return sample;
}

test("retains a native tariff without inventing a monthly toman starting price", () => {
  const sample = overlappingCatalog();
  Object.assign(sample.providers.other, { currency: "USD" });
  Object.assign(sample.plans[1], {
    advertised_monthly_toman: null,
    published_tariff: { amount: 50, currency: "USD", basis: "month" },
  });
  sample.plans[1].evidence.facts.advertised_monthly_toman = "unknown";
  Object.assign(sample.plans[1].evidence.facts, {
    published_tariff: "verified",
  });
  const result = compare(sample, { provider: "other" });
  expect(result.errors).toEqual({});
  expect(result.ranked).toEqual([]);
  expect(result.items[0].startingPriceToman).toBeNull();
  expect(result.items[0].offers[0].plan).toMatchObject({
    advertised_monthly_toman: null,
    published_tariff: { amount: 50, currency: "USD", basis: "month" },
  });
  expect(result.unpriced[0].reasons).toContain("monthly_reference_unavailable");
  const budgeted = compare(sample, { provider: "other", budget: 1000000 });
  expect(budgeted.items).toEqual([]);
  expect(
    budgeted.excluded.find((offer) => offer.plan.id === "second")?.reasons,
  ).toContain("monthly_reference_unavailable");
});

test("consolidates only evidenced exact resources and storage type, retaining offer prices", () => {
  const sample = overlappingCatalog();
  const grouped = compare(sample, {});
  expect(grouped.items).toHaveLength(1);
  expect(grouped.items[0]).toMatchObject({
    exactIdentity: true,
    startingPriceToman: 710000,
  });
  expect(grouped.items[0].offers.map((o) => o.plan.id)).toEqual([
    "manageit-1c-1g-25g",
    "second",
  ]);
  for (const change of [
    { ram_gb: 2 },
    { cpu_count: 2 },
    { disk_gb: 50 },
    { storage_type: "NVMe" },
    { storage_type: null },
    {
      evidence: {
        ...sample.plans[1].evidence,
        facts: {
          ...sample.plans[1].evidence.facts,
          storage_label: "unknown" as const,
        },
      },
    },
  ]) {
    const distinct = structuredClone(sample);
    Object.assign(distinct.plans[1], change);
    expect(compare(distinct, {}).items).toHaveLength(2);
  }
  sample.plans.forEach((p) => (p.evidence.facts.cpu_count = "unknown"));
  expect(compare(sample, {}).items.every((i) => !i.exactIdentity)).toBe(true);
  expect(compare(sample, {}).items).toHaveLength(2);
});

test("provider selection isolates own prices before consolidation, including multiple selected providers", () => {
  const sample = overlappingCatalog();
  const own = compare(sample, { provider: "other" });
  expect(own.items[0]).toMatchObject({
    startingPriceToman: 800000,
    startingOfferId: "second",
  });
  expect(own.items[0].offers.map(({ plan }) => plan.provider)).toEqual([
    "other",
  ]);
  expect(
    compare(sample, { provider: "other,manageit" }).items[0].offers,
  ).toHaveLength(2);
  expect(compare(sample, { provider: "missing" }).items).toEqual([]);
});

test("traffic starting prices use eligible subtotals inside an exact listing, keeping unknown charges inspectable", () => {
  const sample = overlappingCatalog();
  sample.plans[1].traffic_assumption = "unspecified-shared";
  sample.plans[1].traffic_policy = {
    direction: "shared",
    includedGb: 1000,
    overage: { kind: "unknown" },
  };
  expect(compare(sample, {}).items[0].startingOfferId).toBe(
    "manageit-1c-1g-25g",
  );
  const traffic = compare(sample, { priceMode: "traffic", egress: 1000 });
  expect(traffic.errors).toEqual({});
  expect(traffic.items).toHaveLength(1);
  expect(traffic.items[0]).toMatchObject({
    startingOfferId: "second",
    startingPriceToman: 800000,
  });
  const excess = compare(sample, { priceMode: "traffic", egress: 1200 });
  expect(excess.items[0]).toMatchObject({
    startingOfferId: "manageit-1c-1g-25g",
    startingPriceToman: 2150000,
  });
  expect(excess.items[0].offers).toHaveLength(2);
  expect(excess.unpriced[0]).toMatchObject({
    plan: { id: "second" },
    billableGb: 200,
    reasons: ["unknown_overage"],
  });
  expect(
    excess.items[0].offers.find(({ plan }) => plan.id === "second")?.quote,
  ).toBeUndefined();
  const budget = compare(sample, {
    priceMode: "traffic",
    egress: 1000,
    budget: 710000,
  });
  expect(budget.items[0]).toMatchObject({
    startingOfferId: "manageit-1c-1g-25g",
    startingPriceToman: 1910000,
  });
});

test("exact mode constrains every selected resource, including zero, while blanks impose no constraint", () => {
  expect(
    compare(catalog, { ram: 4, resourceMode: "exact" }).ranked.map(
      (q) => q.plan.id,
    ),
  ).toEqual(["manageit-2c-4g-75g", "NGP-small40", "manageit-4c-4g-75g"]);
  expect(
    compare(catalog, {
      ram: "۴",
      cpu: "٢",
      disk: "",
      resourceMode: "exact",
    }).ranked.map((q) => q.plan.id),
  ).toEqual(["manageit-2c-4g-75g"]);
  expect(compare(catalog, { ram: 0, resourceMode: "exact" }).items).toEqual([]);
  const sample = overlappingCatalog();
  sample.plans[0].evidence.facts.ram_gb = "unknown";
  expect(
    compare(sample, { ram: 1, resourceMode: "exact" }).excluded[0].reasons,
  ).toEqual(["ram_unresolved"]);
});

test("base budgets filter offers before starting prices, retain unknown mandatory fees and reject unresolved tariffs", () => {
  const sample = overlappingCatalog();
  sample.plans[0].evidence.facts.advertised_monthly_toman = "conflicting";
  expect(compare(sample, {}).items[0]).toMatchObject({
    startingPriceToman: 800000,
    startingOfferId: "second",
  });
  const budgeted = compare(sample, { budget: "۸۰۰۰۰۰" });
  expect(
    budgeted.items[0].offers.find((o) => o.plan.id === "second"),
  ).toMatchObject({ totalCostUnknown: true });
  expect(
    compare(sample, { budget: 799999 }).items[0].startingPriceToman,
  ).toBeNull();
  expect(compare(sample, { budget: 799999 }).excluded[0].reasons).toContain(
    "base_price_above_budget",
  );
  expect(compare(sample, { budget: 0 }).ranked).toEqual([]);
  expect(compare(sample, { budget: "-1" }).errors.budget).toBeTruthy();
});

test("default discovery compares published monthly bases even with usage; traffic is a separate subtotal promise", () => {
  const base = compare(catalog, { ram: 4, egress: 1200 });
  expect(base.priceMode).toBe("base");
  expect(base.items[0]).toMatchObject({
    startingPriceToman: 1420000,
    startingOfferId: "manageit-2c-4g-75g",
    billingBasis: "published-monthly-reference",
  });
  expect(base.unpriced).toEqual([]);
  const traffic = compare(catalog, {
    ram: 4,
    egress: 1200,
    priceMode: "traffic",
  });
  expect(traffic.items[0].startingPriceToman).toBe(2860000);
  expect(traffic.unpriced).toHaveLength(5);
  expect(
    compare(catalog, { priceMode: "invalid" } as never).errors.priceMode,
  ).toBeTruthy();
  expect(
    compare(catalog, { resourceMode: "invalid" } as never).errors.resourceMode,
  ).toBeTruthy();
});

test("ranks the complete reviewed sample by exact monthly base prices", () => {
  const result = compare(catalog, {});
  expect(result.errors).toEqual({});
  expect(result.ranked.map((q) => [q.plan.id, q.baseMonthlyToman])).toEqual([
    ["manageit-1c-1g-25g", 710000],
    ["manageit-1c-2g-50g", 975000],
    ["manageit-2c-2g-75g", 1325000],
    ["manageit-2c-4g-75g", 1420000],
    ["NGP-small40", 1823999],
    ["manageit-4c-4g-75g", 2030000],
    ["NGP-medium40", 2803199],
    ["manageit-6c-12g-150g", 3950000],
    ["NGP-large80", 4823039],
    ["NGP-xlarge120", 8801279],
    ["NGP-2xlarge160", 16696319],
  ]);
  expect(result.unpriced).toEqual([]);
  expect(result.excluded).toEqual([]);
});

test("applies only explicit resource minimums, inclusively, and explains exclusions", () => {
  const result = compare(catalog, { ram: "4", cpu: "", disk: "" });
  expect(result.ranked).toHaveLength(8);
  expect(result.ranked[0]).toMatchObject({
    plan: { id: "manageit-2c-4g-75g" },
    baseMonthlyToman: 1420000,
  });
  expect(result.ranked.some((q) => q.plan.id === "NGP-small40")).toBe(true);
  expect(result.excluded).toHaveLength(3);
  expect(result.excluded[0].reasons).toEqual(["ram_below_minimum"]);
  expect(
    compare(catalog, { cpu: 8, disk: 160 }).ranked.map((q) => q.plan.id),
  ).toEqual(["NGP-2xlarge160"]);
  expect(compare(catalog, { ram: 128 }).ranked).toEqual([]);
});

test.each([
  -1,
  1.5,
  Infinity,
  NaN,
  "oops",
  "1.5",
  "-1",
  "Infinity",
  "1e3",
  "0x10",
])("rejects invalid resource input %s without stale quotes", (value) => {
  for (const resource of ["ram", "cpu", "disk", "egress", "ingress"]) {
    const result = compare(catalog, { [resource]: value });
    expect(result.errors).toHaveProperty(resource);
    expect(result.ranked).toEqual([]);
  }
});
test("accepts explicit zero and Persian and Arabic whole numbers", () => {
  expect(compare(catalog, { ram: 0 }).ranked).toHaveLength(11);
  expect(compare(catalog, { ram: "۴", cpu: "١" }).ranked).toHaveLength(8);
});

test("uses stable identifiers to break equal-price ties regardless of catalog order", () => {
  const sample: Catalog = structuredClone(catalog);
  sample.plans = [sample.plans[1], sample.plans[0]];
  sample.plans.forEach((p) => {
    p.advertised_monthly_toman = 710000;
  });
  expect(compare(sample, {}).ranked.map((q) => q.plan.id)).toEqual([
    "manageit-1c-1g-25g",
    "manageit-1c-2g-50g",
  ]);
});
test.each([
  (c: any) => {
    c.plans.push(c.plans[0]);
  },
  (c: any) => {
    c.plans[0].advertised_monthly_toman = -1;
  },
  (c: any) => {
    c.plans[0].advertised_monthly_toman = Infinity;
  },
  (c: any) => {
    delete c.plans[0].ram_gb;
  },
  (c: any) => {
    c.plans[0].source = "missing";
  },
  (c: any) => {
    c.plans[0].traffic_policy.overage.rateTomanPerGb = -1;
  },
])("blocks malformed catalog instead of inventing offers", (mutate) => {
  const sample: Catalog = structuredClone(catalog);
  mutate(sample);
  const result = compare(sample, {});
  expect(result.errors.catalog).toBeTruthy();
  expect(result.ranked).toEqual([]);
});

test("prices the 4 GB plus 1 TB scenario and changes the cheapest offer", () => {
  const result = compare(catalog, {
    ram: 4,
    priceMode: "traffic",
    egress: 1000,
  });
  expect(result.ranked).toHaveLength(8);
  expect(result.ranked[0]).toMatchObject({
    plan: { id: "NGP-small40" },
    subtotalToman: 1823999,
  });
  expect(
    result.ranked.find((q) => q.plan.id === "manageit-2c-4g-75g"),
  ).toMatchObject({
    baseMonthlyToman: 1420000,
    billableGb: 1000,
    rateTomanPerGb: 1200,
    trafficChargeToman: 1200000,
    subtotalToman: 2620000,
  });
});

test("separates unknown overage using shared ingress plus egress", () => {
  const result = compare(catalog, {
    ram: 4,
    priceMode: "traffic",
    egress: 1200,
  });
  expect(result.ranked).toHaveLength(3);
  expect(result.unpriced).toHaveLength(5);
  expect(result.unpriced[0]).toMatchObject({
    billableGb: 200,
    reasons: ["unknown_overage"],
  });
  expect(result.ranked[0]).toMatchObject({
    trafficChargeToman: 1440000,
    subtotalToman: 2860000,
  });
  expect(
    compare(catalog, {
      ram: 4,
      priceMode: "traffic",
      egress: 800,
      ingress: 200,
    }).ranked,
  ).toHaveLength(8);
  expect(
    compare(catalog, {
      ram: 4,
      priceMode: "traffic",
      egress: 1000,
      ingress: 200,
    }).unpriced,
  ).toHaveLength(5);
  expect(
    compare(catalog, { ram: 4, priceMode: "traffic", ingress: 1200 }).ranked[0],
  ).toMatchObject({
    trafficChargeToman: 0,
    subtotalToman: 1420000,
  });
});

test("applies confirmed hard caps and paid excess without adding synthetic live offers", () => {
  const sample: Catalog = structuredClone(catalog);
  sample.plans = [sample.plans.find((p) => p.id === "NGP-small40")!];
  sample.plans[0].evidence.facts.traffic_overage = "verified";
  sample.plans[0].evidence.facts.traffic_rate = "verified";
  const policies = {
    "NGP-small40": {
      direction: "shared" as const,
      includedGb: 1000,
      overage: { kind: "unavailable" as const },
    },
  };
  const capped = compare(
    sample,
    { priceMode: "traffic", egress: 1000, ingress: 200 },
    policies,
  );
  expect(capped.ranked).toEqual([]);
  expect(capped.unpriced).toEqual([]);
  expect(capped.excluded[0].reasons).toEqual(["traffic_hard_cap"]);
  const paid = {
    "NGP-small40": {
      ...policies["NGP-small40"],
      overage: { kind: "priced" as const, rateTomanPerGb: 1234 },
    },
  };
  expect(
    compare(sample, { priceMode: "traffic", egress: 800, ingress: 200 }, paid)
      .ranked[0],
  ).toMatchObject({
    billableGb: 0,
    trafficChargeToman: 0,
    subtotalToman: 1823999,
  });
  expect(
    compare(sample, { priceMode: "traffic", egress: 1000, ingress: 200 }, paid)
      .ranked[0],
  ).toMatchObject({
    billableGb: 200,
    rateTomanPerGb: 1234,
    trafficChargeToman: 246800,
    subtotalToman: 2070799,
  });
});

test("never fabricates a quote from missing data or unsafe arithmetic", () => {
  const sample: Catalog = structuredClone(catalog);
  sample.plans.forEach((p) => {
    if (p.traffic_policy?.overage.kind === "priced")
      p.traffic_policy.overage.rateTomanPerGb = null;
    if (p.traffic_policy?.direction === "shared")
      p.traffic_policy.includedGb = null;
  });
  sample.plans.forEach((p) => {
    p.traffic_allowance_gb_unspecified_direction = null;
  });
  const result = compare(sample, { priceMode: "traffic", egress: 1 });
  expect(result.ranked).toEqual([]);
  expect(result.unpriced).toHaveLength(11);
  expect(result.unpriced[0].reasons).toEqual(["missing_traffic_rate"]);
  expect(result.unpriced[6].reasons).toEqual(["unknown_allowance"]);
  expect(compare(sample, {}).ranked).toHaveLength(11);
  const huge = compare(catalog, {
    priceMode: "traffic",
    egress: Number.MAX_SAFE_INTEGER,
    ingress: Number.MAX_SAFE_INTEGER,
  });
  expect(huge.ranked).toEqual([]);
  expect(huge.unpriced).toHaveLength(11);
});

test("unresolved facts affect only comparisons that depend on them, and withdrawal excludes", () => {
  const sample = structuredClone(catalog);
  sample.plans = [sample.plans[0]];
  sample.plans[0].evidence.facts.ram_gb = "conflicting";
  expect(compare(sample, {}).ranked).toHaveLength(1);
  expect(compare(sample, { ram: 1 }).excluded[0].reasons).toContain(
    "ram_unresolved",
  );
  sample.plans[0].evidence.facts.advertised_monthly_toman = "failed";
  expect(compare(sample, {}).unpriced[0].reasons).toContain(
    "base_price_unresolved",
  );
  sample.plans[0].lifecycle = "withdrawn";
  sample.plans[0].withdrawal = {
    confirmed_at: "2026-10-29",
    source: "manageit",
    reason: "Confirmed withdrawal fixture",
  };
  expect(compare(sample, {}).excluded[0].reasons).toContain("withdrawn");
});

test("a stale or failed review does not refresh evidence or disable unrelated facts", () => {
  const sample = structuredClone(catalog);
  sample.plans = [sample.plans[0]];
  const offer = sample.plans[0];
  offer.verification_attempts.push({
    attempted_at: "2026-10-29",
    outcome: "failed",
    sources: [offer.source],
    affected_facts: ["traffic_rate"],
    note: "Tariff request failed",
  });
  expect(compare(sample, {}).ranked).toHaveLength(1);
  expect(
    compare(sample, { priceMode: "traffic", egress: 1 }).unpriced[0].reasons,
  ).toContain("missing_traffic_rate");
  expect(compare(sample, {}).ranked[0].plan.evidence.last_verified_at).toBe(
    "2026-09-19",
  );
  offer.evidence.last_verified_at = "2026-10-29";
  expect(compare(sample, {}).errors.catalog).toBeTruthy();
});

test("accepts another provider and source while rejecting identity rewrites and dangling evidence", () => {
  const sample = structuredClone(catalog);
  sample.plans = [sample.plans[0]];
  sample.providers.other = { ...sample.providers.manageit, name: "Other" };
  sample.sources.other = {
    ...sample.sources.manageit,
    provider: "other",
    url: "https://example.com/tariff",
  };
  sample.plans[0].provider = "other";
  sample.plans[0].source = "other";
  sample.plans[0].evidence.sources = ["other"];
  expect(
    compare(sample, { priceMode: "traffic", egress: 1 }).ranked[0]
      .subtotalToman,
  ).toBe(711200);
  sample.plans[0].revisions = [
    { ...structuredClone(sample.plans[0]), revision_id: "previous", ram_gb: 2 },
  ];
  expect(compare(sample, {}).errors.catalog).toBeTruthy();
  sample.plans[0].revisions = [];
  sample.plans[0].evidence.sources = ["missing"];
  expect(compare(sample, {}).errors.catalog).toBeTruthy();
});

test("uses refreshed prices, retains revisions and separates the changed resource configuration", () => {
  const result = compare(reviewedCatalog, {
    ram: 4,
    priceMode: "traffic",
    egress: 1000,
  });
  expect(result.errors).toEqual({});
  expect(result.ranked[0]).toMatchObject({
    plan: { id: "NGP-small40" },
    subtotalToman: 2436399,
  });
  expect(
    result.ranked.find(
      (q) => q.plan.id === "iranserver-ngp-large80-4c-32g-80g-monthly",
    )?.plan.ram_gb,
  ).toBe(32);
  expect(
    result.excluded.find((q) => q.plan.id === "NGP-large80")?.reasons,
  ).toContain("ram_unresolved");
  expect(result.ranked[0].plan.revisions[0].advertised_monthly_toman).toBe(
    1823999,
  );
});

test("missing traffic evidence leaves the base usable until usage needs that evidence", () => {
  const sample = structuredClone(catalog);
  sample.plans = [sample.plans[0]];
  sample.plans[0].traffic_policy = null;
  expect(compare(sample, {}).ranked[0]?.subtotalToman).toBe(710000);
  expect(
    compare(sample, { priceMode: "traffic", egress: 1 }).unpriced[0].reasons,
  ).toContain("unknown_traffic_policy");
});

test("managed database boundaries isolate engines, versions, topology and VPS traffic", () => {
  const sample = overlappingCatalog();
  const db = (id: string, engine: string, price: number) => ({
    ...structuredClone(sample.plans[0]),
    id,
    category: "database" as const,
    advertised_monthly_toman: price,
    topology: "single-node",
    database: {
      engine,
      versions: ["18.4"],
      version_status: "verified" as const,
      topology_status: "verified" as const,
      management: {
        status: "verified" as const,
        detail: "Provider monitors the database",
      },
      backup: { status: "unknown" as const, detail: "Not established" },
      location: { status: "unknown" as const, detail: "Not established" },
      feature_package: { status: "verified" as const, detail: "Base" },
      mandatory_charges: {
        status: "unknown" as const,
        detail: "Tax unresolved",
      },
    },
  });
  sample.plans = [
    db("pg", "PostgreSQL", 900),
    db("redis", "Redis", 100),
    db("pg-old", "PostgreSQL", 200),
    sample.plans[0],
  ];
  sample.plans[2].database!.versions = ["17.10"];
  const result = compare(sample, {
    category: "database",
    engine: "PostgreSQL",
    version: "18.4",
    priceMode: "traffic",
    egress: 999999,
  });
  expect(result.errors).toEqual({});
  expect(result.priceMode).toBe("base");
  expect(result.items).toHaveLength(1);
  expect(result.items[0].startingPriceToman).toBe(900);
  expect(result.items[0].offers.map((o) => o.plan.id)).toEqual(["pg"]);
  expect(compare(sample, { category: "database" }).items).toHaveLength(2);
  expect(
    compare(sample, { category: "database" }).items.map((item) => [
      item.engine,
      item.startingPriceToman,
    ]),
  ).toEqual([
    ["PostgreSQL", 200],
    ["Redis", 100],
  ]);
  sample.plans[2].database!.version_status = "unknown";
  expect(
    compare(sample, {
      category: "database",
      engine: "PostgreSQL",
      version: "17.10",
    }).items,
  ).toEqual([]);
  sample.plans[2].database!.version_status = "verified";
  sample.plans[2].database!.topology_status = "unknown";
  expect(
    compare(sample, { category: "database", engine: "PostgreSQL" }).items,
  ).toHaveLength(2);
  expect(compare(sample, {}).ranked.map((q) => q.plan.id)).toEqual([
    "manageit-1c-1g-25g",
  ]);
});

test("failed database evidence gates versions and topology without hiding unaffected base prices", () => {
  const sample = structuredClone(reviewedCatalog);
  sample.plans = sample.plans
    .filter(
      (p) => p.category === "database" && p.database?.engine === "PostgreSQL",
    )
    .slice(0, 1);
  const plan = sample.plans[0];
  sample.providers.liara.mandatory_fee_completeness = true;
  expect(
    compare(sample, { category: "database" }).items[0].offers[0]
      .totalCostUnknown,
  ).toBe(true);
  plan.verification_attempts.push({
    attempted_at: "2026-10-30",
    outcome: "failed",
    sources: plan.evidence.sources,
    affected_facts: ["database_version"],
    note: "Version page unavailable",
  });
  expect(
    compare(sample, {
      category: "database",
      engine: "PostgreSQL",
      version: "18.4",
    }).items,
  ).toEqual([]);
  expect(compare(sample, { category: "database" }).ranked).toHaveLength(1);
  plan.verification_attempts.push({
    attempted_at: "2026-10-31",
    outcome: "success",
    sources: plan.evidence.sources,
    affected_facts: ["database_version"],
    note: "Version reviewed again",
  });
  expect(
    compare(sample, {
      category: "database",
      engine: "PostgreSQL",
      version: "18.4",
    }).ranked,
  ).toHaveLength(1);
  plan.topology = "single-node";
  plan.database!.topology_status = "verified";
  expect(compare(sample, { category: "database" }).items[0].exactIdentity).toBe(
    true,
  );
  plan.verification_attempts.push({
    attempted_at: "2026-11-01",
    outcome: "failed",
    sources: plan.evidence.sources,
    affected_facts: ["database_topology"],
    note: "Topology no longer verifiable",
  });
  expect(compare(sample, { category: "database" }).items[0].exactIdentity).toBe(
    false,
  );
  plan.verification_attempts.push({
    attempted_at: "2026-11-02",
    outcome: "failed",
    sources: plan.evidence.sources,
    affected_facts: ["database_management"],
    note: "Operating responsibility no longer verifiable",
  });
  expect(compare(sample, { category: "database" }).items).toEqual([]);
});

test("searches catalog names across separate categories without searching providers or recommending hardware", () => {
  const all = compare(reviewedCatalog, { category: "all" });
  expect(all.items.some((item) => item.engine === null)).toBe(true);
  expect(all.items.some((item) => item.engine === "PostgreSQL")).toBe(true);
  const postgres = compare(reviewedCatalog, {
    category: "all",
    query: "postgresql",
  });
  expect(postgres.items).toHaveLength(2);
  expect(
    compare(reviewedCatalog, { category: "all", query: "پستگرس" }).items,
  ).toHaveLength(2);
  expect(
    compare(reviewedCatalog, { category: "all", query: "ردیس" }).items,
  ).toHaveLength(2);
  expect(postgres.items.every((item) => item.engine === "PostgreSQL")).toBe(
    true,
  );
  expect(
    compare(reviewedCatalog, { category: "all", query: "Liara" }).items,
  ).toEqual([]);
  expect(
    compare(reviewedCatalog, { category: "all", query: "wordpress" }).items,
  ).toEqual([]);
  expect(
    compare(reviewedCatalog, { category: "all", query: "سرور مجازی" }).items,
  ).toHaveLength(compare(reviewedCatalog, { category: "vps" }).items.length);
});

test("global traffic discovery keeps database base prices and sorts within each engine only", () => {
  const result = compare(reviewedCatalog, {
    category: "all",
    priceMode: "traffic",
    egress: "1200",
    sort: "price-desc",
  });
  const databases = result.ranked.filter(
    ({ plan }) => plan.category === "database",
  );
  expect(databases).toHaveLength(4);
  expect(databases.every((quote) => quote.trafficChargeToman === 0)).toBe(true);
  expect(
    databases.find(({ plan }) => plan.id === "liara-pg-2c-4g-40g-base")
      ?.subtotalToman,
  ).toBe(4125000);
  expect(
    result.items
      .filter((item) => item.engine === "PostgreSQL")
      .map((item) => item.startingPriceToman),
  ).toEqual([4125000, 1300000]);
});
