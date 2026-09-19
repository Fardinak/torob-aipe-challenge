# Build a traffic-aware VPS comparison application

Publication status: local draft; project issue tracker is not configured. Intended triage label: `ready-for-agent`. Proposed test boundary awaits the skill-required user check. No issue has been published.

## Problem Statement

A developer searching for a VPS must open several provider pages, interpret different plan and traffic terms, and manually determine which offer is cheapest for their needs. The user previously bought a $3 VPS and later discovered a $1.50 option. Other searches required at least 4 GB RAM and 1 TB outbound traffic and took substantial effort across tabs.

Sorting headline prices alone does not solve this: a cheaper server can become more expensive after usage charges. Conversely, a plan with a smaller included allowance may still meet the need through paid additional traffic. Unknown terms should remain visible without preventing useful comparison under explicit product assumptions.

## Solution

Build a Persian-first, responsive comparison application using the prototype's immediate offer-list layout (A) as the implementation baseline. Put editable requirements above price-ranked provider offers. Start with the reviewed sample of 11 plans across ManageIT and IranServer. State the limited coverage without suggesting this is the entire market.

With no requirements or usage entered, show all sampled plans sorted by advertised monthly base price. Resource minimums filter the catalog. Expected outbound and optional inbound usage determine traffic eligibility and a monthly base-plus-traffic subtotal. Show the arithmetic directly in each offer, preserve original traffic wording, and allow inline inspection of billing details and provider sources.

Use the agreed fixed pricing interpretation: ManageIT download means server egress and upload means ingress. For allowances with undeclared direction, assume a shared ingress-plus-egress limit internally while continuing to label their direction as unspecified. These are product rules for this sample, not newly verified provider facts. Do not expose an assumption checkbox.

Exclude plans exceeding a confirmed hard cap with no additional traffic. Separate plans whose required overage cannot be priced from the ranked results. Never rank their base price against another plan's usage subtotal as if both were complete estimates.

## User Stories

1. As a VPS buyer, I want to see offers immediately without entering requirements, so that I can discover the cheapest option in the covered catalog.
2. As a VPS buyer, I want to know which providers and how many plans the catalog covers, so that I can judge the search's scope.
3. As a VPS buyer, I want minimum RAM filtering, so that the displayed offers meet my application's memory requirement.
4. As a VPS buyer, I want an optional CPU minimum, so that I can constrain processing resources when I have a specific requirement.
5. As a VPS buyer, I want an optional disk minimum, so that the displayed plans have enough storage.
6. As a VPS buyer, I want unspecified resource fields to impose no restriction, so that the application does not invent requirements for me.
7. As a VPS buyer, I want to enter expected monthly outbound traffic, so that offers reflect what I expect to send from my server.
8. As a VPS buyer, I want to enter optional inbound traffic, so that shared allowances account for both directions.
9. As a VPS buyer, I want blank inbound usage to mean zero, so that I can make a simple outbound-only comparison.
10. As a VPS buyer, I want explicit GB units and a clear TB conversion, so that I do not confuse 1 TB with 1 TiB.
11. As a VPS buyer, I want presets for unconstrained browsing, 4 GB RAM, and 4 GB RAM plus 1 TB outbound, so that I can quickly reproduce common searches.
12. As a VPS buyer, I want to edit a preset's fields, so that I can adapt it to my actual workload.
13. As a VPS buyer, I want the ManageIT traffic interpretation applied consistently without a checkbox, so that I can focus on my usage rather than configure the comparison engine.
14. As a VPS buyer, I want unspecified traffic direction to remain visibly unspecified, so that an internal filtering assumption does not become a misleading provider claim.
15. As a VPS buyer, I want shared allowances to consider total inbound and outbound usage, so that a plan is not wrongly treated as covering the same allowance separately in each direction.
16. As a VPS buyer, I want paid additional traffic included in the subtotal when its tariff is known, so that a smaller included allowance does not automatically disqualify a suitable plan.
17. As a VPS buyer, I want plans with insufficient hard limits excluded, so that results can support my requested usage.
18. As a VPS buyer, I want offers with unknown overage terms separated from priced results, so that an incomplete estimate does not appear artificially cheap.
19. As a VPS buyer, I want eligible offers sorted by their base-plus-traffic subtotal, so that the first offer has the lowest estimated subtotal for my inputs.
20. As a VPS buyer, I want to see the base price, billable quantity, rate and additional traffic charge, so that I can understand why the price changed.
21. As a VPS buyer, I want estimates distinguished from final bills, so that unknown tax, mandatory fees or billing details are not silently treated as zero.
22. As a VPS buyer, I want provider identity, plan name, RAM, CPU and disk visible together, so that I can compare candidates without opening another screen.
23. As a VPS buyer, I want CPU allocation and relevant resource differences available in details, so that equal core counts do not imply equivalent performance.
24. As a VPS buyer, I want known optional extras identified as optional, so that an optional floating IP is not added as a mandatory base charge.
25. As a VPS buyer, I want inline billing and source details, so that I can verify an offer without losing my comparison context.
26. As a VPS buyer, I want a direct link to the provider's tariff page, so that I can check current purchase conditions and continue with the provider.
27. As a VPS buyer, I want an empty-results explanation that preserves my inputs, so that I can deliberately change constraints rather than have them relaxed silently.
28. As a VPS buyer, I want a single reset action, so that I can return to the full sample.
29. As a mobile buyer, I want readable RTL offer rows and accessible controls, so that I can perform the same comparison on a small screen.
30. As a keyboard user, I want labeled inputs, visible focus and operable disclosures, so that the complete comparison journey is usable without a mouse.
31. As the catalog maintainer, I want source facts separated from calculation assumptions, so that I can update tariffs without rewriting their provenance.
32. As the catalog maintainer, I want incomplete tariffs rejected or marked unpriced, so that missing information never produces a misleading low subtotal.
33. As the challenge applicant, I want a runnable application and concise demonstration of traffic changing the ranking, so that I can show the product's practical value within the challenge's video limit.

## Implementation Decisions

- **Implementation baseline:** promote the useful behavior of layout A into a single application screen. A is the recommended baseline following the user's successful filtering exercise; the user did not explicitly select a winner among all three layouts. Do not retain B/C switching or the developer state panel in the application interface.
- **Stack and delivery:** use the repository's TypeScript, React and Vite stack. Ship a static client application with the reviewed JSON catalog. No database or server API is needed for this scope. Support a single local run command and a production build suitable for static hosting; hosting destination remains an implementation choice.
- **Prototype preservation:** retain the throwaway branch as evidence. Implement maintainable application code from the agreed behavior instead of treating prototype constraints as production engineering decisions.
- **Terminology:** a provider publishes a plan. A source snapshot supplies tariff facts. A comparison request contains minimum resources and expected usage. A quote contains calculated traffic charges, a subtotal, eligibility and reasons. An offer row presents a plan and its quote. There is no existing domain glossary or ADR in this repository; use these terms consistently.
- **Catalog scope:** six ManageIT plans and five IranServer general-purpose plans; monthly prices in toman. Preserve provider plan names when published and keep locally assigned identifiers separate. Do not add fake purchasable offers to demonstrate missing policy types.
- **Facts versus interpretation:** keep original traffic terms, allowance amount, billing description, source links, known IP charges, CPU allocation and unresolved fields as facts. Keep direction interpretation in explicit policy data. Unknown is distinct from zero, unlimited and unavailable.
- **Comparison boundary:** evolve the existing quote calculation and component-level filtering into one comparison operation that accepts the catalog and request and returns ranked eligible quotes, unpriced candidates, and excluded plans with reasons. It owns resource eligibility, traffic eligibility, arithmetic and ordering. The UI renders its results and does not reproduce price logic. Keep exclusions available to diagnostics without presenting rejected plans as offers.
- **Input rules:** RAM, CPU and disk minimums are optional nonnegative whole numbers in advertised units; CPU has no implied minimum. Traffic inputs are nonnegative whole GB. Reject invalid, negative or nonfinite entries visibly rather than silently changing the request. Blank resource fields impose no restriction; blank usage is zero. Inputs update the results without a submit step once valid. The UI must not show stale results as if they match invalid inputs.
- **Units:** scenario usage defines 1 TB as 1,000 GB. Preserve advertised resource GB labels without asserting GiB equivalence. All displayed monetary amounts are toman; no rial conversion or exchange-rate logic.
- **ManageIT policy:** treat download as egress and upload as free ingress. Traffic charge equals requested egress GB multiplied by 1,200 toman. No included allowance is deducted in this sample. Use the published monthly base as a reference; do not infer an hourly conversion or billing cap. Keep the applicable datacenter and monthly PAYG limitations in billing details. The interpretation is fixed, not user-configurable.
- **Unspecified direction policy:** use inbound GB plus outbound GB against the shared included allowance. Continue displaying “direction unspecified” from the source. A brief explanation can disclose the shared-limit rule without requiring user configuration.
- **Additional-traffic policy:** represent a known unavailable overage option, a known priced option, and an unknown option separately. At or below the included limit, additional charge is zero. Above it, unavailable means excluded; priced means charge only the excess using the applicable rate; unknown or missing rate means unpriced. IranServer's current overage policy is unknown, not confirmed unavailable.
- **Price presentation:** with zero usage, display base price. With usage, display base plus known traffic charges as an estimated subtotal, with the arithmetic nearby. Never call it an all-in price or final bill. Optional floating IPv4 is explanatory only and is not automatically included. Missing mandatory fees and tax stay explicit in details.
- **Ordering:** sort eligible offers ascending by subtotal, which equals base price for zero usage. Use a stable plan identifier as a deterministic tie-breaker without suggesting a quality preference. Separate unpriced candidates from that ordering and clearly label any displayed base price there. Excluded plans are absent from both offer groups.
- **Offer interaction:** place resource and usage controls above immediate provider rows. Show plan resources, original traffic terms, subtotal and breakdown. Open billing details inline. Source/provider links open independently so the current in-memory comparison remains available.
- **State and interface:** Persian RTL, explicit currency/units, mobile layout and accessible controls. Presets and reset operate on request fields. No persistence is required; reload returns to the default request. Do not show collection timestamps in the interface.
- **Source validation:** validate catalog shape, finite nonnegative prices, unique identifiers and consistent policy fields at the import/build boundary. Missing required policy data must produce a visible unpriced state or block an invalid catalog build, not an invented quote.
- **Week-end delivery:** prioritize comparison correctness, one usable screen, source links, responsive behavior, build/deployment instructions and a reproducible demo. No new provider research is required to implement the approved assumptions; unresolved source semantics remain documented limitations.

## Testing Decisions

- **Proposed seam, pending user check:** use the complete comparison operation as the main automated test boundary: catalog plus request in; ranked, unpriced and excluded results out. Add one browser journey for controls and rendering. This captures the existing pricing behavior at a higher boundary than the prototype's per-plan function and avoids duplicating tests across implementation helpers.
- **Good tests:** assert externally meaningful eligibility, prices, ordering, reasons and visible behavior. Do not assert private helper calls, component structure, CSS class names or snapshots of the entire page. Tests should detect a broken purchase comparison even if the implementation is reorganized.
- **Modules under test:** the comparison operation, including its catalog/request validation behavior, and the application screen through the browser journey. Use small synthetic policy fixtures only for policy cases absent from the real sample; never add them to the live catalog.
- **Prior art:** no automated suite or established test framework exists in this repository. The research arithmetic script, prototype calculation boundary and browser-verified 1,000/1,200 GB cases provide prior behavior to preserve. Choose a lightweight runner compatible with the existing TypeScript toolchain during implementation.
- **Acceptance cases:** use the table below as the core behavioral coverage. Verify exact integer toman results, inclusive allowance boundaries, classification and ranking rather than merely checking that calculation helpers execute.

| Scenario | Expected behavior |
| --- | --- |
| No resource minimums and zero usage | All 11 offers ranked by base price; ManageIT 1c/1g/25g first at 710,000 toman. |
| RAM at least 4 GB, zero usage | Eight ranked offers; ManageIT 2c/4g/75g first at 1,420,000 toman. No CPU/disk minimum added. |
| RAM at least 4 GB, 1,000 GB egress, zero ingress | Eight quotes; IranServer NGP-small40 first at 1,823,999. ManageIT 2c/4g/75g subtotal is 2,620,000, with 1,200,000 traffic cost. |
| ManageIT 2c/4g/75g, 1,200 GB egress | Traffic 1,440,000; subtotal 2,860,000 toman. |
| RAM at least 4 GB, 1,200 GB egress | Three ManageIT offers ranked; five IranServer offers unpriced outside ranking because overage is unknown. |
| Shared 1,000 GB allowance, 800 outbound + 200 inbound | Included allowance exactly covers usage; zero additional traffic charge. |
| Shared 1,000 GB allowance, 1,000 outbound + 200 inbound, unknown overage | Unpriced; reports 200 GB beyond allowance, not a complete base-only estimate. |
| Confirmed shared 1,000 GB hard cap, no extra traffic, 1,200 GB combined | Excluded entirely from offer groups. Synthetic policy fixture. |
| Shared allowance, known paid overage | At the boundary charge zero; above it charge only excess GB × rate. Synthetic policy fixture. |
| ManageIT with 1,200 GB ingress and zero egress | Zero traffic charge under the fixed free-upload rule; base subtotal unchanged. |
| Missing overage rate or unknown allowance needed for usage | No fabricated zero charge or eligible estimate. |
| RAM minimum of 128 GB | No sampled offers; retain requirements and provide a reset/change path. |
| Invalid/negative/nonfinite request | Visible validation failure, no quote generated from a silently altered request. |
| Equal subtotals | Deterministic ordering with no invented quality claim. |

- **Browser journey:** start at default → choose 4 GB + 1 TB → observe changed ordering and ManageIT arithmetic → change outbound to 1,200 → observe the separate unpriced group → expand a source disclosure → reset. Confirm no direction-assumption checkbox and no collection date. Verify provider link destination without requiring a provider purchase or login.
- **Responsive/accessibility checks:** complete the same core interaction at desktop and mobile widths; ensure labels, focus, disclosure controls and readable numeric columns. The browser journey should exercise keyboard access to the key controls.
- **Completion checks:** type checking and production build pass, comparison acceptance cases pass, and the deployed application repeats the journey using the same catalog. Deployment target and application submission are not to be fabricated if no destination is configured.

## Out of Scope

- Global cheapest claims, exhaustive market coverage, live stock or provider checkout verification.
- A complete final-bill calculator, unresolved tax or mandatory fees, hourly proration and caps, or unverified provider tariff guarantees.
- Runtime AI parsing, autonomous tariff extraction, crawlers, scheduled refresh, databases and accounts.
- Multiple layouts, the A/B/C switcher, separate side-by-side comparison, developer state displays and collection timestamps in the interface.
- Price history, alerts, saved/shareable searches, provider ratings, reviews, guarantees, payments and checkout.
- CPU performance benchmarks, equal-performance claims, GPU and managed hosting, overseas catalogs and multi-currency conversion.
- Adding an IP requirement or optional IP calculator; the sample only explains known optional IP pricing.
- Automated provider outreach, contacting test users, or submitting the challenge application on the user's behalf.

## Further Notes

The user reported that finding an offer through filters was easy. Their main missing capability was factoring traffic pricing into the ordering. They explicitly approved the shared-limit interpretation for unspecified direction and later removed the ManageIT interpretation checkbox in favor of a fixed rule. Preserve those decisions instead of reopening them during implementation.

The prototype and its iterations are captured on branch `prototype/vps-comparison`; the traffic-cost implementation was committed as `2baa6ec`, with the fixed direction rule in `e66a63d`. These are primary behavioral evidence, not production code to retain wholesale. The reviewed catalog and source snapshots live in the repository's research collection. The earlier gate report describes what sources establish; this spec describes the subsequently approved product assumptions and supersedes the old rule that unspecified direction must always prevent a ranked estimate.

The dollar-priced purchase story motivates the problem but is not a comparable price claim for the Iran-focused sample. Coverage must remain clear. No external timestamp feature is part of the requested application.

For the Torob challenge, demonstrate the user's problem, the immediate comparison, a traffic-induced ranking change, source inspection and the engineering/AI-assisted development process in a video below five minutes. Runtime AI is not required by the recorded challenge brief. Build and deployment precede preparation of the application package; actual submission is a separate action.

Publishing dependency: run `/setup-matt-pocock-skills` to supply the project issue tracker and triage configuration. Once configured and the testing seam is checked with the user, publish this spec with `ready-for-agent` and record the resulting issue link. Do not substitute an unrelated tracker or silently install a connector.
