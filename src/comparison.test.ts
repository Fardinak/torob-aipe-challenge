import { expect, test } from "vitest";
import { catalog, type Catalog } from "./catalog";
import { compare } from "./comparison";

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
    c.providers.manageit.traffic_original_labels.download_toman_per_gb = -1;
  },
])("blocks malformed catalog instead of inventing offers", (mutate) => {
  const sample: Catalog = structuredClone(catalog);
  mutate(sample);
  const result = compare(sample, {});
  expect(result.errors.catalog).toBeTruthy();
  expect(result.ranked).toEqual([]);
});

test("prices the 4 GB plus 1 TB scenario and changes the cheapest offer", () => {
  const result = compare(catalog, { ram: 4, egress: 1000 });
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
  const result = compare(catalog, { ram: 4, egress: 1200 });
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
    compare(catalog, { ram: 4, egress: 800, ingress: 200 }).ranked,
  ).toHaveLength(8);
  expect(
    compare(catalog, { ram: 4, egress: 1000, ingress: 200 }).unpriced,
  ).toHaveLength(5);
  expect(compare(catalog, { ram: 4, ingress: 1200 }).ranked[0]).toMatchObject({
    trafficChargeToman: 0,
    subtotalToman: 1420000,
  });
});

test("applies confirmed hard caps and paid excess without adding synthetic live offers", () => {
  const sample: Catalog = structuredClone(catalog);
  sample.plans = [sample.plans.find((p) => p.id === "NGP-small40")!];
  const policies = {
    "NGP-small40": {
      direction: "shared" as const,
      includedGb: 1000,
      overage: { kind: "unavailable" as const },
    },
  };
  const capped = compare(sample, { egress: 1000, ingress: 200 }, policies);
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
    compare(sample, { egress: 800, ingress: 200 }, paid).ranked[0],
  ).toMatchObject({
    billableGb: 0,
    trafficChargeToman: 0,
    subtotalToman: 1823999,
  });
  expect(
    compare(sample, { egress: 1000, ingress: 200 }, paid).ranked[0],
  ).toMatchObject({
    billableGb: 200,
    rateTomanPerGb: 1234,
    trafficChargeToman: 246800,
    subtotalToman: 2070799,
  });
});

test("never fabricates a quote from missing data or unsafe arithmetic", () => {
  const sample: Catalog = structuredClone(catalog);
  sample.providers.manageit.traffic_original_labels.download_toman_per_gb =
    null;
  sample.plans.forEach((p) => {
    p.traffic_allowance_gb_unspecified_direction = null;
  });
  const result = compare(sample, { egress: 1 });
  expect(result.ranked).toEqual([]);
  expect(result.unpriced).toHaveLength(11);
  expect(result.unpriced[0].reasons).toEqual(["missing_traffic_rate"]);
  expect(result.unpriced[6].reasons).toEqual(["unknown_allowance"]);
  expect(compare(sample, {}).ranked).toHaveLength(11);
  const huge = compare(catalog, {
    egress: Number.MAX_SAFE_INTEGER,
    ingress: Number.MAX_SAFE_INTEGER,
  });
  expect(huge.ranked).toEqual([]);
  expect(huge.unpriced).toHaveLength(11);
});
