import { z } from "zod";
import snapshot from "../research/vps-comparison-data.json";
const whole = z.number().int().nonnegative().max(Number.MAX_SAFE_INTEGER);
const text = z.string().min(1);
const source = z.object({
  url: z.url().refine((url) => url.startsWith("https://")),
  snapshot: text,
  snapshot_saved_at: text,
  sha256: text,
});
const provider = z.object({
  currency: z.literal("toman"),
  billing: text,
  cpu_allocation: text.nullable(),
  verified_server_egress_allowance_gb: whole.nullable(),
  base_ipv4_included: z.boolean().nullable(),
  ipv6_included: z.boolean().nullable(),
  tax_basis: text.nullable(),
  mandatory_fee_completeness: z.boolean(),
  plan_location_mapping: text,
});
export const catalogSchema = z
  .object({
    status: text,
    scope: text,
    units: text,
    sources: z.object({
      manageit: source,
      iranserver: source,
      manageit_ip: source,
    }),
    providers: z.object({
      manageit: provider.extend({
        traffic_original_labels: z.object({
          upload: text,
          download_toman_per_gb: whole.nullable(),
          applicable_datacenters: z.array(text).min(1),
        }),
        optional_independent_floating_ipv4_monthly_toman: whole.nullable(),
      }),
      iranserver: provider.extend({ traffic_original_label: text }),
    }),
    plans: z
      .array(
        z.object({
          id: text,
          provider: z.enum(["manageit", "iranserver"]),
          provider_plan_name: text.nullable(),
          cpu_count: whole.positive(),
          ram_gb: whole.positive(),
          disk_gb: whole.positive(),
          storage_label: text,
          advertised_monthly_toman: whole,
          traffic_allowance_gb_unspecified_direction: whole.nullable(),
          source: z.enum(["manageit", "iranserver"]),
          availability: z.literal("not_verified"),
        }),
      )
      .min(1),
  })
  .superRefine((catalog, ctx) => {
    const ids = new Set<string>();
    for (const plan of catalog.plans) {
      if (ids.has(plan.id))
        ctx.addIssue({
          code: "custom",
          message: `Duplicate plan ID: ${plan.id}`,
        });
      if (plan.source !== plan.provider)
        ctx.addIssue({
          code: "custom",
          message: `Source mismatch: ${plan.id}`,
        });
      ids.add(plan.id);
    }
  });
export type Catalog = z.infer<typeof catalogSchema>;
export type Plan = Catalog["plans"][number];
// The reviewed snapshot remains the single source of facts; no tariff interpretation is added here.
export const catalog = catalogSchema.parse(snapshot);
