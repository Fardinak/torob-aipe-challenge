# Prototype plan for the Torob challenge

Drafted 2026-09-19. The user is open to a market recommendation and has a weekend budget. This proposes a Persian-first VPS comparison prototype for one builder, with roughly 12–16 focused hours. The comparison gate is complete. The user subsequently approved assumption-based traffic subtotals and filtering; verified all-in billing remains blocked by source ambiguity. See [gate findings](vps-comparison-gate.md). A throwaway UI prototype now exists on `prototype/vps-comparison`.

## Product thesis

Help a specific buyer turn scattered offers into a defensible decision. Carry forward Torob's useful sequence: express intent → find comparable options → examine price and evidence → choose a supplier. See [Torob product research](torob-product-research.md) for observations and primary sources, and [challenge requirements](torob-ai-product-engineer-challenge.md) for the application brief.

The prototype should prove three things: the comparison is valid, the recommended ordering follows the user's constraints, and the user can verify consequential facts. Market coverage and retention features can grow later.

## Candidate directions

These are design judgments, not validated market research or claims of competitive novelty.

| Direction | Decision the product improves | Main prototype uncertainty | Position |
| --- | --- | --- | --- |
| Cloud/VPS plans | Which plan meets my stated requirements at the lowest estimated monthly cost? | Billing semantics, incomplete fees, and unequal CPU performance | Provisional first choice: source pages are accessible and a calculation can make value visible. |
| Camera/equipment rental in one city | Where can I rent this exact kit for these dates at the best total cost? | Dates, deposits, and actual availability may require supplier cooperation | Strong consumer alternative if the user has supplier access. |
| Courses for one learning goal | Which course fits my level, budget, and desired outcome? | Courses are not identical goods; quality and outcome evidence need careful treatment | Alternative if learning-domain knowledge or data is available. |

I would reconsider the ranking immediately if the user has direct access to users or data in another market. A usable data source and a familiar user problem matter more than an impressive category name.

## Provisional concept: Torob for cloud servers

**User:** a Persian-speaking developer selecting a small Linux VPS in Iran, with known minimum resources and expected traffic.

**Promise:** find the cheapest published offer in a clearly scoped catalog, filter by stated requirements, and inspect traffic terms and unknown costs before visiting a provider. Traffic subtotals use explicit user-approved assumptions; complete bills still require verified billing rules.

**Example query:** «سرور ایران با حداقل ۴ گیگ رم، ۲ هسته و ۴۰ گیگ دیسک؛ ماهی ۱۰۰ گیگ ترافیک خروجی و یک IPv4». Budget is an editable field. Avoid inferring exact compute requirements from vague business descriptions without asking the user to confirm them.

### Provider shortlist and next data check

The user's shortlist supersedes the earlier provisional Liara/IranServer pairing:

- [ManageIT Cloud](https://www.manageitcloud.com/cloud-server)
- [IranServer](https://www.iranserver.com/vps/iran/)
- [ArvanCloud](https://www.arvancloud.ir/fa/products/cloud-server)
- [Parspack VPS Iran](https://parspack.com/vps/iran)
- [IranHost VPS](https://iranhost.com/server/vps/)

Start the gate with ManageIT Cloud and IranServer; inspect the other three if a source has incomplete tariffs or to find a simpler comparison-ready pair. This ordering is a proposed research order, not a quality ranking. Retain only two providers for the weekend unless adding a third is straightforward.

The completed [gate](vps-comparison-gate.md) captured six ManageIT and five IranServer plans and assessed all five providers. Traffic direction and fee completeness remain unresolved. Parspack is a promising fallback, but embedded disabled tariffs need verification before ranking.

The first source pass should record CPU allocation/architecture, RAM, storage, location, billing period and caps, traffic allowances/direction/overage, IP costs, setup fees, tax basis, promotional conditions, and availability. Missing fields remain unknown. Use primary pages rather than search excerpts and keep all initial calculations in one currency.

### Browser-informed UX refinement

The [T3Code walkthrough](torob-browser-walkthrough.md) verified a category journey, storage filtering, product details, seller-guarantee filtering, and a separate search journey. Use a shared results interface for browsing and search, visible selected filters, compact offer summaries, and deeper billing/source details. Keep factual eligibility filters distinct from usage inputs that recalculate cost. Price summaries must explain the selected scenario. The later [provider data gate](vps-comparison-gate.md) is now complete with a narrowed scope.

### First gate: prove the comparison before building the interface

Completed with a partial pass; see [results and calculations](vps-comparison-gate.md). The original criteria were:

1. If reachable, ask one or two developers to describe their most recent server-selection task and the facts they had difficulty comparing. Otherwise explicitly retain the problem as an unvalidated hypothesis and use a concrete recent decision as the initial scenario. No outreach has been performed.
2. Collect roughly 10–12 real plans/configurations across two providers. A third is optional only after the core works. Store source URL, original units, billing conditions, and missing fields.
3. Hand-calculate three realistic scenarios. Confirm at least one meaningful difference between headline price and scenario cost, or another consequential tradeoff worth showing.
4. Continue with this market only if the comparable fees can be established and users recognize the problem. Otherwise revise scope or choose an alternative before investing in UI work.

Small, manually reviewed snapshots are acceptable for an honest prototype. Mark the dataset's coverage; describe it as a snapshot rather than live availability. Challenge acceptance of sample data is unspecified, so prefer actual sourced offers.

## The experience to build

1. **Search and editable intent.** A structured form produces visible fields for location, RAM, CPU, disk, monthly traffic, IPv4, and budget. A Persian-query enhancement can populate these fields if time remains; the user can correct every interpretation.
2. **Immediate offer list.** Requirements sit above provider rows, following Torob's immediate vendor preview. Default to advertised monthly price within the covered sample. Show resources, traffic wording and unknown fees. For unspecified direction, use a shared ingress + egress limit internally and preserve the source wording. Assume ManageIT download is egress as a fixed prototype rule and add its published per-GB charge. Rank eligible traffic subtotals, exclude confirmed hard-cap violations, and show unknown overage candidates separately outside ranked results.
3. **Inspect an offer inline.** Expand billing facts and source evidence from the row. A separate side-by-side comparison is stretch work. Shared/dedicated CPU and architecture remain visible; equal core counts do not imply equal performance.
4. **Explain a choice with evidence.** “Lowest estimated cost among these eligible plans under your assumptions” is supportable. Link each consequential fee or constraint to its source. Let users expand a cost breakdown and change traffic to observe the result.
5. **Continue to provider.** Open the relevant plan page. Preserve the current comparison in page state. Persistent shortlists, shareable URLs, and feedback collection are stretch work.

Use Persian RTL layout, explicit تومان labels, legible numeric columns, keyboard-accessible controls, and layouts that work on a phone. Show loading, no-match, missing-data, source-refresh failure, and AI-unavailable states as part of the journey.

## AI and deterministic behavior

If the core journey is complete, use AI to translate a Persian request into a validated schema. Require confirmation of ambiguous quantities and retain a structured-form fallback. Optionally use AI during ingestion to propose fee extraction with source evidence, followed by human review before publication.

Calculate prices and filter/rank offers in ordinary code. Generate explanations from the same facts and calculation trace. A language model can improve phrasing but cannot invent fees, performance claims, or provider ratings. Keep source text isolated as data during extraction.

The monthly estimate includes the provider's billing rule, compute, applicable IP/storage charges, traffic allowances and overage, and known mandatory fees. Preserve rounding and caps per provider. State the scenario duration and tax basis; do not claim an all-in price when tax or mandatory fees remain unknown. Promotions and initial signup credit should not silently reduce ongoing cost.

## Implementation shape

One web application, one small database, and a repeatable import command are sufficient. Proposed tools: TypeScript with a React UI and server routes, SQLite, and an isolated model adapter. Final framework choice can follow the builder's familiarity; no provider subscription is required by this plan.

Store provider, plan/configuration, source snapshot, and versioned tariff facts separately from a user's scenario and computed quote. Each quote should be reproducible from its inputs and data version. Start with reviewed JSON imports. Automate a source only as stretch work after correctness is established. A scheduled crawler, vector database, distributed services, and user accounts are outside the initial scope.

## Weekend sequence and cut line

| Budget | Outcome |
| --- | --- |
| Saturday, hours 1–2 | Validate two usable sources and three example cost calculations; confirm or reject the VPS direction. |
| Saturday, hours 3–5 | Create the reviewed 10–12-offer dataset, scenario pricing, and correctness checks. |
| Saturday, hours 6–8 | Finish structured search → results → compare → source/provider links. |
| Sunday, hours 1–2 | Polish Persian/mobile UX, transparent cost breakdowns, no matches, and missing-data states. |
| Sunday, hour 3 | If the core is reliable, add Persian intent parsing with a visible editable interpretation. Otherwise spend this hour fixing the journey. |
| Sunday, hour 4 | Observe one or two target users if available; fix the clearest misunderstanding. |
| Sunday, hours 5–6 | Check deployment, README, source accuracy, and record a demo targeting 4:50. Keep remaining time as buffer. |

**Required:** two real sources, the reviewed 11-row dataset, editable requirements, correct advertised-price sorting, immediate comparison rows, visible evidence/unknowns, provider handoff, and a reproducible demonstration. Assumption-based traffic subtotals must be labeled and used for ranking; all-in bills remain deferred until source completeness permits them.

**Stretch:** AI query parsing, saved/shareable comparison, one automated source importer.

**Deferred:** live crawling, price history, notifications, accounts, provider reputation scoring, checkout, payments, GPU/managed hosting, overseas plans, and multi-currency support. AI-assisted research, extraction review, implementation, and testing still demonstrate practical AI use if runtime AI is cut; the challenge explicitly asks for AI use during building, not necessarily an LLM feature.

## Definition of a convincing prototype

Proposed acceptance targets, not Torob's published scoring rubric:

- All displayed consequential facts have a source; no invented reviews, guarantees, or uptime measurements.
- Ten hand-verified billing scenarios match computed output under documented rounding, including traffic allowances, missing costs, and billing caps where applicable.
- Hard constraints are never silently relaxed; no-result suggestions require the user to change them.
- If AI parsing is included, a small Persian-query evaluation set checks digits/units, negation, ambiguous budgets, and missing fields. Model failures leave the form usable.
- One or two available target users attempt to find an eligible option and explain the main cost tradeoff within two minutes without coaching. Record what worked and failed; this is qualitative feedback, not validation at scale. If nobody is available, say that usability remains untested.
- One end-to-end check covers query → correction → comparison → source inspection → provider link. Verify desktop and mobile layouts.
- Refresh failures retain the previous snapshot and clearly indicate that refresh failed.

## Five-minute application story

| Time | What to show |
| --- | --- |
| 0:00–0:35 | A real decision problem and what the user currently has to compare manually. |
| 0:35–1:25 | Enter requirements, view eligible plans; demonstrate Persian query parsing only if implemented. |
| 1:25–2:30 | Compare offers, reveal a consequential extra charge, change traffic, and show the resulting ordering. |
| 2:30–3:20 | Inspect source evidence, explain an unknown field, continue to the provider. |
| 3:20–4:15 | Explain the engineering choices and where AI helped, including a useful failure/fallback case. |
| 4:15–4:50 | Show a tested correction or observed limitation, acknowledge dataset scope, and identify the next improvement. |

Target 4:50 to leave recording margin. Application deliverables remain the working project/repository link and accessible demo video described in the [official challenge](https://jobs.torob.com/ai-product-engineer). Price history needs actual accumulated observations; alerts, accounts, reviews, checkout, guarantees, and payments can wait.

## Decisions still open

ManageIT and IranServer supply the initial advertised-price catalog. The user supplied a concrete purchase account supporting cheapest-offer discovery and minimum-requirement search. Verified egress semantics, availability of usability testers, and deployment services remain open. The next implementation can use the narrower scope in the gate report; verified all-in ranking requires additional first-party evidence. The throwaway app is implemented; no external submission has been made. The research calculation script is not a production pricing engine.

## Approved traffic iteration

The user found resource filtering easy and identified missing traffic pricing as the main gap. Implemented: expected outbound and optional inbound GB, base + traffic subtotals across A/B/C, fixed ManageIT download-as-egress rule, shared allowance filtering for unspecified direction, and separate unpriced overage candidates. At 4 GB RAM + 1,000 GB egress, ManageIT is 2,620,000 toman and IranServer is 1,823,999 under these assumptions. At 1,200 GB combined usage, IranServer is outside ranked results because overage terms are unknown. Confirmed no-extra hard caps are excluded entirely. No source facts were rewritten to make these assumptions appear verified.
