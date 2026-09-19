# Locked prototype scope

2026-09-19 — approved by the user before invoking the prototype skill.

- Persian RTL interface; 11 captured plans across ManageIT and IranServer, explicitly a limited dated snapshot.
- Default: all offers sorted by advertised monthly toman, no minimum resources.
- Editable RAM, CPU and disk minimums. No inferred CPU constraint from a RAM request.
- Traffic evidence is incomplete. A strict egress requirement yields zero confirmed matches; resource-matching candidates remain inspectable as unverified.
- Immediate provider offer rows show price, resources, traffic wording, known extras and sources. Expand details inline.
- Unknown fees remain unknown. No all-in estimate, live-stock claim or performance ranking.
- TypeScript/React, reviewed JSON, memory-only state. No database, crawler or runtime AI dependency.
- Success: find cheapest sampled offer; apply 4 GB minimum; understand why 1 TB egress is unconfirmed.

## Design question

Which immediate comparison layout makes those three tasks easiest: compact offer list, attribute table, or provider-grouped offers?

The throwaway prototype is captured on `prototype/vps-comparison`. Run `npm install && npm run prototype`, then open `/prototype/vps?variant=A` (also B/C). No implementation issue exists in this local workspace, so this file is the context pointer. Layout verdict is pending user review; no winner has been validated or promoted.

## Implementation handoff

The approved traffic-pricing decisions and implementation scope are recorded in [the implementation spec](../specs/vps-comparison.md) and [GitHub issue #1](https://github.com/Fardinak/torob-aipe-challenge/issues/1). These supersede the initial eligibility rules above. The captured UI prototype remains on `prototype/vps-comparison`; repository setup and the implementation spec are on `main`.
