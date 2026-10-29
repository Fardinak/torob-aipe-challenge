import { z } from "zod";
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
