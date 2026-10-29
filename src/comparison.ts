import { trafficPolicySchema, type TrafficPolicies } from "./traffic-policy";
import { catalogSchema, databaseServiceKeys, type Plan } from "./catalog";
export type Resource = "ram" | "cpu" | "disk";
export type InputField = Resource | "egress" | "ingress" | "budget";
export type Request = Partial<Record<InputField, string | number>> & {
  category?: "vps" | "database" | "all";
  query?: string;
  sort?: "price-asc" | "price-desc";
  provider?: string;
  engine?: string;
  version?: string;
  resourceMode?: "minimum" | "exact";
  priceMode?: "base" | "traffic";
};
export type Quote = {
  plan: Plan;
  baseMonthlyToman: number;
  billableGb: number;
  rateTomanPerGb: number | null;
  trafficChargeToman: number;
  subtotalToman: number;
  reasons: string[];
};
export type ProviderOffer = {
  plan: Plan;
  quote?: Quote;
  billableGb?: number;
  reasons: string[];
  totalCostUnknown: boolean;
};
export type ListingItem = {
  id: string;
  exactIdentity: boolean;
  engine: string | null;
  topology: string | null;
  configuration: {
    cpu: number | null;
    ram: number | null;
    disk: number | null;
    storageType: string | null;
  };
  offers: ProviderOffer[];
  startingPriceToman: number | null;
  startingOfferId: string | null;
  billingBasis: "published-monthly-reference";
};
export type Comparison = {
  items: ListingItem[];
  priceMode: "base" | "traffic";
  ranked: Quote[];
  unpriced: { plan: Plan; billableGb?: number; reasons: string[] }[];
  excluded: { plan: Plan; reasons: string[] }[];
  errors: Partial<
    Record<
      | InputField
      | "catalog"
      | "resourceMode"
      | "priceMode"
      | "sort"
      | "category"
      | "version",
      string
    >
  >;
};
const resources = { ram: "ram_gb", cpu: "cpu_count", disk: "disk_gb" } as const;
export function compare(
  inputCatalog: unknown,
  request: Request,
  policies?: TrafficPolicies,
): Comparison {
  const result: Comparison = {
    items: [],
    priceMode:
      request.category === "database" ? "base" : (request.priceMode ?? "base"),
    ranked: [],
    unpriced: [],
    excluded: [],
    errors: {},
  };
  const parsed = catalogSchema.safeParse(inputCatalog);
  if (!parsed.success) {
    result.errors.catalog = "داده‌های فهرست معتبر نیست؛ مقایسه در دسترس نیست.";
    return result;
  }
  const catalog = parsed.data;
  if (
    request.resourceMode !== undefined &&
    !["minimum", "exact"].includes(request.resourceMode)
  )
    result.errors.resourceMode = "روش تطبیق منابع معتبر نیست.";
  if (
    request.priceMode !== undefined &&
    !["base", "traffic"].includes(request.priceMode)
  )
    result.errors.priceMode = "روش مقایسه قیمت معتبر نیست.";
  if (
    request.category !== undefined &&
    !["vps", "database", "all"].includes(request.category)
  )
    result.errors.category = "دسته معتبر نیست.";
  if (
    request.sort !== undefined &&
    !["price-asc", "price-desc"].includes(request.sort)
  )
    result.errors.sort = "ترتیب معتبر نیست.";
  if (request.version && (!request.engine || request.category !== "database"))
    result.errors.version = "برای نسخه، موتور دیتابیس را انتخاب کنید.";
  const amounts: Record<InputField, number> = {
    ram: 0,
    cpu: 0,
    disk: 0,
    egress: 0,
    ingress: 0,
    budget: 0,
  };
  for (const key of Object.keys(amounts) as InputField[]) {
    const raw = request[key];
    const text = String(raw ?? "")
      .trim()
      .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 1776))
      .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 1632));
    const value = Number(text);
    if (
      (text !== "" && !/^\d+$/.test(text)) ||
      !Number.isSafeInteger(value) ||
      value < 0
    )
      result.errors[key] = "عدد صحیح صفر یا بیشتر وارد کنید.";
    else amounts[key] = value;
  }
  if (Object.keys(result.errors).length) return result;
  for (const plan of catalog.plans) {
    // Parsing gives us a private copy. A latest failed attempt invalidates only
    // its affected facts, even if a maintainer omitted a redundant status edit.
    const db = plan.database;
    const reviewedFacts: Record<
      string,
      Plan["evidence"]["facts"]["cpu_count"]
    > = {
      ...plan.evidence.facts,
      ...(db
        ? {
            database_version: db.version_status,
            database_topology: db.topology_status,
            ...Object.fromEntries(
              databaseServiceKeys.map((key) => [
                `database_${key}`,
                db[key].status,
              ]),
            ),
          }
        : {}),
    };
    const effectiveFacts = { ...reviewedFacts };
    for (const attempt of plan.verification_attempts) {
      for (const key of attempt.affected_facts) {
        if (reviewedFacts[key] !== undefined)
          effectiveFacts[key] =
            attempt.outcome === "failed" ? "failed" : reviewedFacts[key];
      }
    }
    for (const key of Object.keys(
      plan.evidence.facts,
    ) as (keyof Plan["evidence"]["facts"])[])
      plan.evidence.facts[key] = effectiveFacts[key];
    if (db) {
      db.version_status = effectiveFacts.database_version;
      db.topology_status = effectiveFacts.database_topology;
      for (const key of databaseServiceKeys)
        db[key].status = effectiveFacts[`database_${key}`];
    }
    if (
      (request.category !== "all" &&
        plan.category !== (request.category ?? "vps")) ||
      (request.provider &&
        !request.provider.split(",").includes(plan.provider)) ||
      !matchesSearch(plan, request.query ?? "") ||
      (plan.category === "database" && db?.management.status !== "verified") ||
      (request.engine && plan.database?.engine !== request.engine) ||
      (request.version &&
        (plan.database?.version_status !== "verified" ||
          !plan.database.versions.includes(request.version)))
    ) {
      result.excluded.push({ plan, reasons: ["service_filter_mismatch"] });
      continue;
    }
    if (plan.lifecycle === "withdrawn") {
      result.excluded.push({ plan, reasons: ["withdrawn"] });
      continue;
    }
    const reasons = (Object.keys(resources) as Resource[])
      .filter(
        (key) =>
          String(request[key] ?? "").trim() !== "" &&
          (plan.evidence.facts[resources[key]] !== "verified" ||
            (request.resourceMode === "exact"
              ? plan[resources[key]] !== amounts[key]
              : plan[resources[key]] < amounts[key])),
      )
      .map((key) =>
        plan.evidence.facts[resources[key]] !== "verified"
          ? `${key}_unresolved`
          : `${key}_${request.resourceMode === "exact" ? "not_exact" : "below_minimum"}`,
      );
    if (reasons.length) {
      result.excluded.push({ plan, reasons });
      continue;
    }
    if (plan.evidence.facts.advertised_monthly_toman !== "verified") {
      result.unpriced.push({ plan, reasons: ["base_price_unresolved"] });
      continue;
    }
    if (
      String(request.budget ?? "").trim() !== "" &&
      plan.advertised_monthly_toman > amounts.budget
    ) {
      result.excluded.push({ plan, reasons: ["base_price_above_budget"] });
      continue;
    }
    if (result.priceMode === "base" || plan.category === "database") {
      result.ranked.push({
        plan,
        baseMonthlyToman: plan.advertised_monthly_toman,
        billableGb: 0,
        rateTomanPerGb: null,
        trafficChargeToman: 0,
        subtotalToman: plan.advertised_monthly_toman,
        reasons: ["published_base_price"],
      });
      continue;
    }
    const trafficRequested = amounts.egress > 0 || amounts.ingress > 0;
    const policyResult = trafficPolicySchema.safeParse(
      policies ? policies[plan.id] : plan.traffic_policy,
    );
    if (!policyResult.success && trafficRequested) {
      result.unpriced.push({ plan, reasons: ["unknown_traffic_policy"] });
      continue;
    }
    const policy = policyResult.success
      ? policyResult.data
      : {
          direction: "egress" as const,
          includedGb: 0,
          overage: { kind: "unknown" as const },
        };
    const facts = plan.evidence.facts;
    // An unspecified source direction may use the disclosed shared-pool assumption.
    // A failed/conflicting direction cannot support any usage calculation.
    if (
      trafficRequested &&
      facts.traffic_direction !== "verified" &&
      !(
        facts.traffic_direction === "unknown" &&
        ((plan.traffic_assumption === "unspecified-shared" &&
          policy.direction === "shared") ||
          (plan.traffic_assumption === "download-as-egress-free-upload" &&
            policy.direction === "egress"))
      )
    ) {
      result.unpriced.push({ plan, reasons: ["traffic_evidence_unresolved"] });
      continue;
    }
    const usage =
      policy.direction === "shared"
        ? amounts.egress + amounts.ingress
        : amounts.egress;
    if (!Number.isSafeInteger(usage)) {
      result.unpriced.push({ plan, reasons: ["arithmetic_out_of_range"] });
      continue;
    }
    if (
      usage > 0 &&
      (policy.includedGb === null || facts.traffic_allowance !== "verified")
    ) {
      result.unpriced.push({ plan, reasons: ["unknown_allowance"] });
      continue;
    }
    const billableGb = Math.max(0, usage - (policy.includedGb ?? 0));
    const rateTomanPerGb =
      policy.overage.kind === "priced" ? policy.overage.rateTomanPerGb : null;
    if (
      billableGb > 0 &&
      (["failed", "conflicting"].includes(facts.traffic_overage) ||
        (policy.overage.kind !== "unknown" &&
          facts.traffic_overage !== "verified"))
    ) {
      result.unpriced.push({ plan, reasons: ["traffic_evidence_unresolved"] });
      continue;
    }
    if (billableGb > 0 && policy.overage.kind === "unavailable") {
      result.excluded.push({ plan, reasons: ["traffic_hard_cap"] });
      continue;
    }
    if (
      billableGb > 0 &&
      (rateTomanPerGb === null || facts.traffic_rate !== "verified")
    ) {
      result.unpriced.push({
        plan,
        billableGb,
        reasons: [
          policy.overage.kind === "unknown"
            ? "unknown_overage"
            : "missing_traffic_rate",
        ],
      });
      continue;
    }
    const trafficChargeToman = billableGb * (rateTomanPerGb ?? 0);
    const subtotalToman = plan.advertised_monthly_toman + trafficChargeToman;
    if (!Number.isSafeInteger(subtotalToman)) {
      result.unpriced.push({ plan, reasons: ["arithmetic_out_of_range"] });
      continue;
    }
    result.ranked.push({
      plan,
      baseMonthlyToman: plan.advertised_monthly_toman,
      billableGb,
      rateTomanPerGb,
      trafficChargeToman,
      subtotalToman,
      reasons: ["base_plus_traffic"],
    });
  }
  result.ranked.sort(
    (a, b) =>
      (a.plan.database?.engine ?? "").localeCompare(
        b.plan.database?.engine ?? "",
      ) ||
      a.subtotalToman - b.subtotalToman ||
      (a.plan.id < b.plan.id ? -1 : a.plan.id > b.plan.id ? 1 : 0),
  );
  const items = new Map<string, ListingItem>();
  const offers: ProviderOffer[] = [
    ...result.ranked.map((quote) => ({
      plan: quote.plan,
      quote,
      reasons: quote.reasons,
      totalCostUnknown:
        !catalog.providers[quote.plan.provider].mandatory_fee_completeness ||
        (quote.plan.database !== undefined &&
          quote.plan.database.mandatory_charges.status !== "verified"),
    })),
    ...result.unpriced.map((offer) => ({ ...offer, totalCostUnknown: true })),
  ];
  for (const offer of offers) {
    const { plan } = offer;
    const configuration = {
      cpu: plan.evidence.facts.cpu_count === "verified" ? plan.cpu_count : null,
      ram: plan.evidence.facts.ram_gb === "verified" ? plan.ram_gb : null,
      disk: plan.evidence.facts.disk_gb === "verified" ? plan.disk_gb : null,
      storageType:
        plan.evidence.facts.storage_label === "verified"
          ? plan.storage_type
          : null,
    };
    const engine = plan.database?.engine ?? null;
    const topology =
      plan.database?.topology_status === "verified" ? plan.topology : null;
    const exactIdentity =
      (plan.category === "vps" || topology !== null) &&
      Object.values(configuration).every((value) => value !== null);
    const id = exactIdentity
      ? `${plan.category}:${engine ?? ""}:${plan.category === "database" ? topology : ""}:${JSON.stringify(configuration)}`
      : `offer:${plan.id}`;
    let item = items.get(id);
    if (!item) {
      item = {
        id,
        exactIdentity,
        engine,
        topology,
        configuration,
        offers: [],
        startingPriceToman: offer.quote?.subtotalToman ?? null,
        startingOfferId: offer.quote ? plan.id : null,
        billingBasis: "published-monthly-reference",
      };
      items.set(id, item);
    }
    item.offers.push(offer);
  }
  result.items = [...items.values()].sort(
    (a, b) =>
      (a.engine ?? "").localeCompare(b.engine ?? "") ||
      (a.startingPriceToman === null && b.startingPriceToman === null
        ? 0
        : a.startingPriceToman === null
          ? 1
          : b.startingPriceToman === null
            ? -1
            : (a.startingPriceToman - b.startingPriceToman) *
              (request.sort === "price-desc" ? -1 : 1)) ||
      (a.id < b.id ? -1 : a.id > b.id ? 1 : 0),
  );
  return result;
}

// Category names are the release vocabulary; engine/product names come from
// the reviewed catalog. Provider names and workload guesses never enter search.
function matchesSearch(plan: Plan, query: string): boolean {
  const normalize = (value: string) =>
    value
      .toLowerCase()
      .normalize("NFKC")
      .replace(/ي/g, "ی")
      .replace(/ك/g, "ک")
      .replace(/[\u200c-\u200f-]/g, " ");
  const names =
    plan.category === "vps"
      ? "VPS virtual private server سرور مجازی"
      : "managed database دیتابیس مدیریت شده";
  // Verified Persian spellings in retained Liara setup evidence; see
  // docs/search-aliases.md. New engines still match their catalog names.
  const aliases: Record<string, string> = {
    PostgreSQL: "پستگرس",
    Redis: "ردیس",
  };
  const searchable = normalize(
    `${names} ${plan.database?.engine ?? ""} ${aliases[plan.database?.engine ?? ""] ?? ""} ${plan.provider_plan_name ?? ""}`,
  );
  return normalize(query)
    .trim()
    .split(/\s+/)
    .every((word) => searchable.includes(word));
}
