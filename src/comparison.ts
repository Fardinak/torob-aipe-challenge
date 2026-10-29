import { trafficPolicySchema, type TrafficPolicies } from "./traffic-policy";
import { catalogSchema, type Plan } from "./catalog";
export type Resource = "ram" | "cpu" | "disk";
export type InputField = Resource | "egress" | "ingress";
export type Request = Partial<Record<InputField, string | number>>;
export type Quote = {
  plan: Plan;
  baseMonthlyToman: number;
  billableGb: number;
  rateTomanPerGb: number | null;
  trafficChargeToman: number;
  subtotalToman: number;
  reasons: string[];
};
export type Comparison = {
  ranked: Quote[];
  unpriced: { plan: Plan; billableGb?: number; reasons: string[] }[];
  excluded: { plan: Plan; reasons: string[] }[];
  errors: Partial<Record<InputField | "catalog", string>>;
};
const resources = { ram: "ram_gb", cpu: "cpu_count", disk: "disk_gb" } as const;
export function compare(
  inputCatalog: unknown,
  request: Request,
  policies?: TrafficPolicies,
): Comparison {
  const result: Comparison = {
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
  const minimums: Record<InputField, number> = {
    ram: 0,
    cpu: 0,
    disk: 0,
    egress: 0,
    ingress: 0,
  };
  for (const key of Object.keys(minimums) as InputField[]) {
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
    else minimums[key] = value;
  }
  if (Object.keys(result.errors).length) return result;
  for (const plan of catalog.plans) {
    // Parsing gives us a private copy. A latest failed attempt invalidates only
    // its affected facts, even if a maintainer omitted a redundant status edit.
    const reviewedFacts = { ...plan.evidence.facts };
    for (const attempt of plan.verification_attempts) {
      for (const key of attempt.affected_facts) {
        plan.evidence.facts[key] =
          attempt.outcome === "failed" ? "failed" : reviewedFacts[key];
      }
    }
    if (plan.lifecycle === "withdrawn") {
      result.excluded.push({ plan, reasons: ["withdrawn"] });
      continue;
    }
    const reasons = (Object.keys(resources) as Resource[])
      .filter(
        (key) =>
          minimums[key] > 0 &&
          (plan.evidence.facts[resources[key]] !== "verified" ||
            plan[resources[key]] < minimums[key]),
      )
      .map((key) =>
        plan.evidence.facts[resources[key]] !== "verified"
          ? `${key}_unresolved`
          : `${key}_below_minimum`,
      );
    if (reasons.length) {
      result.excluded.push({ plan, reasons });
      continue;
    }
    if (plan.evidence.facts.advertised_monthly_toman !== "verified") {
      result.unpriced.push({ plan, reasons: ["base_price_unresolved"] });
      continue;
    }
    const trafficRequested = minimums.egress > 0 || minimums.ingress > 0;
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
        ? minimums.egress + minimums.ingress
        : minimums.egress;
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
      a.subtotalToman - b.subtotalToman ||
      (a.plan.id < b.plan.id ? -1 : a.plan.id > b.plan.id ? 1 : 0),
  );
  return result;
}
