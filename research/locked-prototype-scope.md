# Locked prototype scope

2026-09-19 — approved by the user before invoking the prototype skill.

- Persian RTL interface; 11 captured plans across ManageIT and IranServer, explicitly a limited snapshot.
- Default: all offers sorted by advertised monthly toman, no minimum resources.
- Editable RAM, CPU and disk minimums. No inferred CPU constraint from a RAM request.
- Traffic is expected monthly usage. Assume ManageIT download means server egress by default (editable); compute base + egress GB × 1,200 toman. Preserve the original tariff wording and label estimates as assumption-based.
- Unspecified traffic direction stays unspecified in the offer, but its allowance is treated as shared ingress + egress for filtering. Optional inbound usage defaults to zero.
- Exceeding a known hard cap with no additional traffic excludes the plan. Unknown overage terms remove it from ranked results and place it in a separate unpriced section; unknown does not mean unavailable.
- Immediate provider offer rows show price, resources, traffic wording, known extras and sources. Expand details inline.
- Rank by base + calculated traffic subtotal when usage is entered, otherwise base price. Unknown mandatory fees remain unknown. No all-in bill, live-stock claim or performance ranking.
- TypeScript/React, reviewed JSON, memory-only state. No database, crawler or runtime AI dependency.
- Success: find cheapest sampled offer; apply 4 GB minimum; compare 1 TB traffic estimates, see the ranking change, and understand cap/overage behavior.

## Design question

Which immediate comparison layout makes those three tasks easiest: compact offer list, attribute table, or provider-grouped offers?

The throwaway prototype is captured on `prototype/vps-comparison`. Run `npm install && npm run prototype`, then open `/prototype/vps?variant=A` (also B/C). No implementation issue exists in this local workspace, so this file is the context pointer. Layout verdict is pending user review; no winner has been validated or promoted.
