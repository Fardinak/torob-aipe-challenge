# Discovery layout prototype — awaiting human feedback

Throwaway primary source for [Choose the discovery layout through a working prototype](https://github.com/Fardinak/torob-aipe-challenge/issues/9). This is a planning asset, not production implementation or a resolved decision.

On branch `prototype/discovery-layout`, open `index.html` directly, or run `npm run dev` and open the existing `/` route. No installation beyond existing project dependencies is needed. The original application remains on the original branch. Do not merge this branch.

- `?variant=A`: dense result rows, right sidebar; collapsible filters on mobile.
- `?variant=B`: configuration cards and filters above results.
- `?variant=C`: master/detail layout; the selected detail moves above the list on mobile.

The floating arrows or keyboard Left/Right switch variants without dropping discovery state. Arrow keys remain available to inputs and selects. Start from the search homepage or use `?view=results&category=vps&variant=A` and `?view=results&category=db&variant=B`. The bottom state disclosure shows the complete current query state.

Try search/category → resource/provider/budget filters → details → provider catalog → handoff. Query, filters, sort, selected offer, provider catalog and variant live in the URL; browser Back/Forward restores them. The handoff opens a new tab with a cancellable five-second countdown and then visits the public provider page. It explicitly does not promise a precise checkout destination.

## Evidence and deliberate limits

VPS samples come from the existing `research/vps-comparison-data.json` snapshot of 2026-09-19. Database tariff examples come from [the retained research report](https://github.com/Fardinak/torob-aipe-challenge/blob/32c13717c161036134e55eda114463df195a2ff2/research/managed-database-coverage.md), researched 2026-09-20. First-party links are available in offer details. These are historical examples, not newly verified prices or an approved release catalog.

Database examples are explicitly marked research candidates: engine applicability, topology, versions, packages and additional charges need review before release admission. No database version is invented; a version filter produces no matches. Unresolved topology/storage cannot establish identical configurations, so those examples remain separate rather than fabricating multi-provider groups. This dataset therefore does not validate the visual density of several providers inside one consolidated listing item. No synthetic prices or provider offers are introduced.

Published base-price ordering is separate per category. A budget filter checks only base price. Every sample displays stale evidence and unknown total cost; details show dates and responsibilities. The VPS usage controls expose assumptions without claiming a ranked subtotal where required traffic evidence is unknown. Existing production traffic calculation code is unchanged. There is no AI parsing, refreshed ingestion, backend, user account or real mutation.

Font: embedded Vazirmatn Arabic subset, SIL Open Font License, from the project's installed @fontsource/vazirmatn dependency.

## Questions for human feedback

Which result hierarchy should lead: A, B, C, or a combination? Then refine mobile filter placement, evidence/detail density, traffic assumption placement and the five-second handoff. A preference has not yet been supplied; leave the decision ticket open.

## Verification

Script parsed successfully. Headless browser checks covered resource filtering/URL changes, offer details, provider profile, excluding unknown versions, master/detail rendering and mobile filter visibility at 390px. No page runtime errors were observed; the tested mobile page had no horizontal overflow. Desktop and mobile renders were visually inspected. T3 html_preview failed twice because its headless browser download was blocked; the installed local Playwright browser was used for verification. The inline HTML rendering was submitted separately.
