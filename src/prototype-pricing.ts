// THROWAWAY scenario arithmetic. Source facts and user-approved assumptions stay separate.
import catalog from '../research/vps-comparison-data.json';
export type Plan = typeof catalog.plans[number];
export type Usage = {egress: number; ingress: number};
export type TrafficPolicy =
  | {kind: 'metered'; rate: number}
  | {kind: 'allowance'; gb: number; additional: 'none' | 'unknown' | 'priced'; rate?: number};
export type Quote = {status: 'eligible' | 'unknown' | 'excluded'; subtotal: number | null; trafficCost: number | null; billableGb: number; sharedUsageGb: number; reason: string};
export function policyFor(plan: Plan): TrafficPolicy {
  return plan.provider === 'manageit'
    ? {kind: 'metered', rate: catalog.providers.manageit.traffic_original_labels.download_toman_per_gb}
    : {kind: 'allowance', gb: plan.traffic_allowance_gb_unspecified_direction!, additional: 'unknown'};
}
export function quotePlan(plan: Plan, usage: Usage, policy = policyFor(plan)): Quote {
  const sharedUsageGb = usage.egress + usage.ingress;
  const result = (status: Quote['status'], trafficCost: number | null, billableGb: number, reason: string): Quote => ({status, trafficCost, billableGb, sharedUsageGb, reason, subtotal: trafficCost === null ? null : plan.advertised_monthly_toman + trafficCost});
  if (sharedUsageGb === 0) return result('eligible', 0, 0, 'no_usage_entered');
  if (policy.kind === 'metered') {
    // Fixed prototype rule approved by the user: download is server egress.
    return result('eligible', usage.egress * policy.rate, usage.egress, 'download_assumed_egress');
  }
  // Undeclared direction is a shared ingress + egress allowance for filtering.
  if (sharedUsageGb <= policy.gb) return result('eligible', 0, 0, 'within_assumed_shared_allowance');
  const excess = sharedUsageGb - policy.gb;
  if (policy.additional === 'none') return result('excluded', null, excess, 'hard_traffic_limit');
  if (policy.additional === 'priced' && policy.rate != null) return result('eligible', excess * policy.rate, excess, 'priced_overage');
  return result('unknown', null, excess, 'overage_unverified');
}
