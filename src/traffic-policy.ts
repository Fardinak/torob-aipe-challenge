import { z } from "zod";
import type { Catalog, Plan } from "./catalog";
const whole = z.number().int().nonnegative().max(Number.MAX_SAFE_INTEGER);
export const trafficPolicySchema = z.object({
  direction: z.enum(["egress", "shared"]),
  includedGb: whole.nullable(),
  overage: z.discriminatedUnion("kind", [
    z.object({ kind: z.literal("unknown") }),
    z.object({ kind: z.literal("unavailable") }),
    z.object({ kind: z.literal("priced"), rateTomanPerGb: whole.nullable() }),
  ]),
});
export type TrafficPolicy = z.infer<typeof trafficPolicySchema>;
export type TrafficPolicies = Record<string, TrafficPolicy>;

// Approved product interpretations, separate from the unchanged source snapshot.
export function sampleTrafficPolicy(
  catalog: Catalog,
  plan: Plan,
): TrafficPolicy {
  return plan.provider === "manageit"
    ? {
        direction: "egress",
        includedGb: 0,
        overage: {
          kind: "priced",
          rateTomanPerGb:
            catalog.providers.manageit.traffic_original_labels
              .download_toman_per_gb,
        },
      }
    : {
        direction: "shared",
        includedGb: plan.traffic_allowance_gb_unspecified_direction,
        overage: { kind: "unknown" },
      };
}
