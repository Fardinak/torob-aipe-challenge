import { z } from "zod";
import { trafficPolicySchema } from "./traffic-policy";
import reviewed from "../research/vps-reviewed-catalog.json";
const whole = z.number().int().nonnegative().max(Number.MAX_SAFE_INTEGER);
const text = z.string().min(1);
const date = z.iso.date();
const source = z.object({
  provider: text,
  label: text,
  url: z.url().refine((url) => url.startsWith("https://")),
  snapshot: text,
  snapshot_saved_at: z.iso.datetime({ offset: true }),
  sha256: z.string().regex(/^[a-f0-9]{64}$/),
});
const provider = z.object({
  name: text,
  currency: z.enum(["toman", "USD"]),
  billing: text,
  cpu_allocation: text.nullable(),
  base_ipv4_included: z.boolean().nullable(),
  ipv6_included: z.boolean().nullable(),
  tax_basis: text.nullable(),
  mandatory_fee_completeness: z.boolean(),
  plan_location_mapping: text,
  disclosures: z.array(text),
});
const configuration = z.object({
  cpu_count: z.number().positive().max(Number.MAX_SAFE_INTEGER).nullable(),
  ram_gb: z.number().positive().max(Number.MAX_SAFE_INTEGER),
  disk_gb: whole.positive(),
  storage_type: text.nullable(),
  // Unknown identity dimensions do not establish equivalence across offers.
  region: text.nullable(),
  hardware_package: text.nullable(),
  feature_package: text.nullable(),
  topology: text.nullable(),
  billing_variant: text,
});
const factStatus = z.enum(["verified", "unknown", "conflicting", "failed"]);
const facts = z.object({
  cpu_count: factStatus,
  ram_gb: factStatus,
  disk_gb: factStatus,
  storage_label: factStatus,
  advertised_monthly_toman: factStatus,
  traffic_direction: factStatus,
  traffic_allowance: factStatus,
  traffic_rate: factStatus,
  traffic_overage: factStatus,
  published_tariff: factStatus.optional(),
});
const evidence = z.object({
  last_verified_at: date.nullable(),
  sources: z.array(text).min(1),
  facts,
  notes: z.array(text),
});
export const databaseServiceKeys = [
  "management",
  "backup",
  "location",
  "feature_package",
  "mandatory_charges",
] as const;
const databaseFactKeys = z.enum([
  "database_version",
  "database_topology",
  ...databaseServiceKeys.map((key) => `database_${key}` as const),
]);
const serviceFact = z.object({ status: factStatus, detail: text });
const database = z.object({
  engine: text,
  versions: z.array(text),
  version_status: factStatus,
  topology_status: factStatus,
  management: serviceFact,
  backup: serviceFact,
  location: serviceFact,
  feature_package: serviceFact,
  mandatory_charges: serviceFact,
});
const published = configuration.extend({
  category: z.enum(["vps", "database"]).default("vps"),
  database: database.optional(),
  billing_display: text,
  storage_label: text,
  traffic_assumption: z
    .enum(["download-as-egress-free-upload", "unspecified-shared"])
    .nullable(),
  provider_plan_name: text.nullable(),
  advertised_monthly_toman: whole.nullable(),
  published_tariff: z
    .object({
      amount: z.number().nonnegative().max(Number.MAX_SAFE_INTEGER),
      currency: z.enum(["toman", "USD"]),
      basis: z.enum(["hour", "day", "month", "quarter", "half-year", "year"]),
    })
    .optional(),
  traffic_allowance_gb_unspecified_direction: whole.nullable(),
  source: text,
  availability: z.literal("not_verified"),
  traffic_terms: text,
  // Explicit reviewed interpretation per offer; never inferred from provider ID.
  traffic_policy: trafficPolicySchema.nullable(),
  evidence,
});
const plan = published.extend({
  id: text,
  provider: text,
  lifecycle: z.enum(["active", "withdrawn"]),
  withdrawal: z
    .object({ confirmed_at: date, source: text, reason: text })
    .nullable(),
  revisions: z.array(published.extend({ revision_id: text })),
  verification_attempts: z.array(
    z.object({
      attempted_at: date,
      outcome: z.enum(["success", "failed"]),
      sources: z.array(text).min(1),
      affected_facts: z.array(z.union([facts.keyof(), databaseFactKeys])),
      note: text,
    }),
  ),
});
export const catalogSchema = z
  .object({
    status: text,
    scope: text,
    units: text,
    sources: z.record(text, source),
    providers: z.record(text, provider),
    plans: z.array(plan).min(1),
  })
  .superRefine((catalog, ctx) => {
    const issue = (message: string) =>
      ctx.addIssue({ code: "custom", message });
    const ids = new Set<string>();
    for (const offer of catalog.plans) {
      if (ids.has(offer.id)) issue(`Duplicate plan ID: ${offer.id}`);
      ids.add(offer.id);
      if (!catalog.providers[offer.provider])
        issue(`Missing provider: ${offer.id}`);
      if ((offer.lifecycle === "withdrawn") !== (offer.withdrawal !== null))
        issue(`Withdrawal requires confirmation: ${offer.id}`);
      if (
        offer.category === "database" &&
        (!offer.database || !offer.evidence.last_verified_at)
      )
        issue(
          `Managed database requires reviewed operating responsibility: ${offer.id}`,
        );
      if (offer.category === "vps" && offer.database)
        issue(`VPS cannot carry database identity: ${offer.id}`);
      const references = [
        offer.source,
        ...(offer.withdrawal ? [offer.withdrawal.source] : []),
      ];
      const revisions = new Set<string>();
      let previousDate: string | null = null;
      for (const revision of [...offer.revisions, offer]) {
        if (
          revision.cpu_count === null &&
          revision.evidence.facts.cpu_count === "verified"
        )
          issue(`Verified CPU requires a value: ${offer.id}`);
        if (
          revision.advertised_monthly_toman === null &&
          revision.evidence.facts.advertised_monthly_toman === "verified"
        )
          issue(`Verified monthly reference requires a value: ${offer.id}`);
        if (
          revision.published_tariff &&
          revision.published_tariff.currency !==
            catalog.providers[offer.provider]?.currency
        )
          issue(`Native tariff currency mismatch: ${offer.id}`);
        if (
          catalog.providers[offer.provider]?.currency === "USD" &&
          revision.advertised_monthly_toman !== null
        )
          issue(`Foreign tariff cannot imply a toman conversion: ${offer.id}`);
        if (
          revision.evidence.facts.published_tariff === "verified" &&
          !revision.published_tariff
        )
          issue(`Verified native tariff requires a value: ${offer.id}`);
        references.push(revision.source, ...revision.evidence.sources);
        if (!revision.evidence.sources.includes(revision.source))
          issue(`Missing primary evidence: ${offer.id}`);
        for (const key of Object.keys(configuration.shape) as (keyof z.infer<
          typeof configuration
        >)[]) {
          if (revision[key] !== offer[key])
            issue(`Identity changed under ${offer.id}: ${key}`);
        }
        if (
          revision.category !== offer.category ||
          revision.database?.engine !== offer.database?.engine
        )
          issue(`Service identity changed: ${offer.id}`);
        const verified = revision.evidence.last_verified_at;
        if (
          verified === null &&
          Object.values(revision.evidence.facts).includes("verified")
        )
          issue(`Verified facts require a successful review date: ${offer.id}`);
        if (verified && previousDate && verified < previousDate)
          issue(`Review dates go backwards: ${offer.id}`);
        previousDate = verified ?? previousDate;
        if ("revision_id" in revision) {
          if (revisions.has(revision.revision_id))
            issue(`Duplicate revision: ${offer.id}`);
          revisions.add(revision.revision_id);
        }
      }
      let previousAttempt: string | null = null;
      for (const attempt of offer.verification_attempts) {
        if (previousAttempt && attempt.attempted_at < previousAttempt)
          issue(`Attempts go backwards: ${offer.id}`);
        previousAttempt = attempt.attempted_at;
        references.push(...attempt.sources);
        if (
          attempt.outcome === "failed" &&
          attempt.attempted_at === offer.evidence.last_verified_at &&
          !offer.verification_attempts.some(
            (a) =>
              a.outcome === "success" &&
              a.attempted_at === attempt.attempted_at,
          ) &&
          !offer.revisions.some(
            (r) => r.evidence.last_verified_at === attempt.attempted_at,
          )
        )
          issue(`Failed attempt cannot establish verification: ${offer.id}`);
      }
      for (const ref of references) {
        if (!catalog.sources[ref]) issue(`Missing source ${ref}: ${offer.id}`);
        else if (catalog.sources[ref].provider !== offer.provider)
          issue(`Source provider mismatch: ${offer.id}`);
      }
    }
  });
export type Catalog = z.infer<typeof catalogSchema>;
export type Plan = Catalog["plans"][number];
export const catalog = catalogSchema.parse(reviewed);

export function evidenceIsStale(
  lastVerified: string | null,
  now = new Date(),
): boolean {
  return (
    lastVerified === null ||
    now.getTime() - Date.parse(`${lastVerified}T00:00:00Z`) > 30 * 86400000
  );
}
