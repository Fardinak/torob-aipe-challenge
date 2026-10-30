# Integrated release verification — 2026-10-30

Release ticket: [#22](https://github.com/Fardinak/torob-aipe-challenge/issues/22),
under [#12](https://github.com/Fardinak/torob-aipe-challenge/issues/12).
Implementation/review baseline: `3fd997c2021c557b5a423309c6dc6a0517083ce1`.
This review consolidates acquisition evidence and verifies the integrated release;
recording and challenge submission remain subsequent work.

## Search scope and completion boundary

The [VPS breadth review](../research/vps-breadth-review-2026-10-29.md) indexes
search rounds, public-store resolution, linked-family audit and the final repeated
search. Family closure and repeated discovery supplied the stopping rationale,
not a provider/configuration quota. Retained outcomes: 639 VPS records across
56 providers, including unknown/conflicting/native-tariff and historical records.

The [database breadth search](../research/database-source-breadth-2026-10-30.md)
retains source/engine selection, exclusions and two final varied search rounds
without meaningful new provider coverage. The [acquisition review](../research/database-acquisition-review-2026-10-30.md)
and [progress ledger](../research/database-acquisition-progress.json) distinguish
source-search saturation from unfinished custom/shared-family acquisition.
[#21](https://github.com/Fardinak/torob-aipe-challenge/issues/21) records the
explicit human decision **“Publish verified configurations; retain gaps.”** That
approved boundary governs this release; it is not an arbitrary named-plan ceiling
or a claim to have acquired the deferred families.

Within that boundary, all selected, verified named/published configurations span
Liara (189 records, nine engines), Chabokan (1,040, thirteen engines, both advertised
regions/five periods), Weblines (20, five engines), ArvanCloud (66, two engines/all
33 hardware examples) and Darmant (one explicitly MySQL Base allocation). There
are 1,316 database records: 484 configurations with monthly references and 832
native billing variants, covering 16 distinct engine identities. Total retained
inventory is 1,955 records, 60 distinct providers and 195 source revisions. Billing
variants do not establish additional provider breadth. RabbitMQ/Prometheus/search
services retain their distinct engine identities and provider service descriptions.

Custom Chabokan grids, Arvan custom node/disk/region matrices, SakooCloud and larger
Darmant shared bundles remain explicit deferred gaps. ManageIT's engine-to-tariff
mapping is unverified; it is not multiplied across advertised logos. Product-only,
coming-soon, unpriced, ordinary hosting/VPS and access-limited leads retain their
specific exclusions in the ledger. No synthetic offer, account, provider contact
or purchase supplies coverage.

## Pre-release evidence review

Reviewer: Codex. Reviewed the acquisition reports, source dispositions, current
catalog and retained first-party artifacts on 2026-10-30. This is a release review
of the dated evidence, not a fresh live retrieval of every source or a new
successful-verification date for each offer. The published data is unchanged.

- **Real exact overlap:** `irvm-pricing` retains the Respina Starter's 1 core,
  1 GB RAM, 10 GB disk and 545,000 toman/month. `irvm-family` explicitly supports
  NVMe for the family. `mehranhost` explicitly lists 1/1/10 NVMe at 680,360 for
  730 hours. Both first-party configurations are retained, distinct offers in one
  verified NVMe listing; their traffic and billing responsibilities remain distinct.
  Unknown storage/topology prevents nominal database overlaps being counted.
- **Database applicability/service review:** Liara engine-specific setup/version
  and hardware/package sources support its engine/plan matrix. Retained package
  quotas and PostgreSQL backup instructions still conflict; the Base PostgreSQL
  and 108 non-Earth Silver/Gold conflicts remain disclosed. Chabokan's engine
  cards establish applicability of the actual retained quote responses (smallest
  Iran quote: 177,498 monthly, 1,818,576 yearly; not rounded hours × 720).
  Weblines' engine/pack overview and tariff support the five-engine matrix;
  Redis backup documentation explicitly says unsupported. Arvan's first-party
  textual fallback and plan/management evidence remain distinct from the failed
  direct interstitial. Darmant's single MySQL Base bundle is not expanded to
  shared plans or other engines. Management beyond provisioning, native periods,
  unknown versions/CPU/storage/topology and mandatory costs remain explicit.
- **Lifecycle/history:** 15 offers retain earlier revisions, including four original
  Liara records. Successful dates remain 2026-10-29 (VPS), 2026-10-30 (database),
  and 2026-09-19 for the unresolved historical IranServer record. Failed Arvan
  content attempts precede successful fallback attempts without erasing history.
  No withdrawal is confirmed. Access failure or age does not establish withdrawal;
  30-day stale warnings preserve the successful date. Confirmed withdrawal requires
  its own retained first-party source and removes active eligibility.
- **Publication:** schema/identity/reference validation and all 195 retained source
  byte hashes are checked by the build. Current and historical evidence are emitted
  beside `evidence/catalog.json` as plain text, not executable provider HTML.

## Recomputed eligibility and release examples

The public `compare` operation, using the real validated catalog, recomputed:

| Request | Result |
| --- | --- |
| VPS exact 1 CPU / 1 GB / 10 GB, IranVM + MehranHost | NVMe item: two eligible offers, starting at 545,000 toman |
| Same resources, MehranHost only | One offer, starting at 680,360; excluded IranVM cannot supply the headline |
| VPS minimum 4 GB, ManageIT + IranServer, base | Eight priced offers; ManageIT leads at 1,420,000 |
| Same, traffic / 1,000 GB outbound | Eight priced; IranServer leads at 2,436,399; ManageIT 1,420,000 + 1,200,000 = 2,620,000 |
| Same, traffic / 1,200 GB outbound | Three priced, five separately unpriced; ManageIT leads at 2,860,000 |

Exact resource filters do not constrain unselected storage type: another SSD
IranVM item may coexist with the NVMe item. No wildcard joins them. Provider
filters run before grouping/starting prices. Unsupported resources/versions fail
only dependent filters; unknown tariff cannot supply a price, and required
unknown traffic cannot compete with subtotals. Database prices remain within
engine and outside VPS traffic policy. Native tariffs without monthly toman
references cannot satisfy a monthly budget. Base prices and traffic subtotals
retain incomplete-cost warnings; neither is an unconditional total bill.

## Verification and delivery gate

The existing consequential `compare` tests and ten representative browser journey
definitions are the verification seams. No suite per provider/engine or snapshots
were added. Three desktop-only journeys intentionally skip on mobile, whose
integrated journeys cover restoration, drawer, list position and handoff.

Every browser journey now checks page/console errors and failed application
assets/HTTP responses, including newly opened handoff tabs. Expected canceled
navigation requests are ignored. External handoff destinations are intercepted;
these checks establish the selected URL/countdown/cancellation behavior, not
provider availability or checkout success.

Run `BASE_PATH=/torob-aipe-challenge/ npm test`: unit tests followed by desktop/mobile
journeys against the production build. The build checks types/catalog/hashes.
Journeys cover homepage search/category entry, multi-engine/version/minimum/exact
and provider/budget filters, own-price provider catalogs, matched offers, retained
evidence downloads, empty recovery, URL/reload/Back/Forward, mobile drawer/detail/
list-position restoration, traffic arithmetic and selected-offer handoff.

Local execution on 2026-10-30 passed: type checking, catalog validation of 1,955
records/all 195 source hashes, production base-path build, 42 comparison tests,
and 17 desktop/mobile journeys (three intentional mobile skips). The focused
real-overlap journey also passed on both viewports after the shared health gate
was applied. No application runtime/console or asset errors were reported.

The Pages workflow retains this pre-publication gate and repeats the same journeys
at the deployed base path after publishing. A deployed failure leaves delivery
unverified even if Pages uploaded successfully. The final commit, run URL and
actual local/deployed results are recorded on #22 before closure; publication alone
is not grounds to close it. To reproduce against deployment:

```sh
PLAYWRIGHT_BASE_URL=https://fardinak.github.io/torob-aipe-challenge/ npm run test:browser
```

## Current guidance versus historical work

[README](../README.md) describes the shipped all-engine discovery, explicit
CPU/RAM/disk constraints, visible dates and incomplete prices. The old memory-only,
VPS-only and hidden-date prototype/research/spec files remain dated historical
records, not current product scope. #12–#22 and #21's recorded human approval
supersede those earlier limits. Do not rewrite historical evidence into fresh
observations. [Maintenance](catalog-maintenance.md) documents evidence refresh,
identity/history, conflicts/failures/withdrawal and release checks. The later
[demo outline](demo-outline.md) covers discovery through handoff, the real traffic
ordering change and engineering/AI-assisted decisions.

## Standards

Independent review of the release diff against the implementation baseline found
no documented-standard violations or material baseline smells. The shared fixture
removes duplicate checks without coupling journeys to application internals.
Documentation preserves domain terminology, dated evidence, history and unknowns;
historical research and pre-existing untracked files remain unchanged.

## Spec

Independent review found no missing or incorrect behavior or scope creep in the
release diff. Counts, exact-overlap/provider-filter examples, traffic arithmetic
and representative journeys agree with the documentation and #21's approved
boundary. Deployment verification and ticket closure remain required final actions.

Review totals: Standards 0 findings; Spec 0 findings; no material issue in either axis.

## Parent #12 completion audit — 2026-10-30

All ten direct sub-issues are closed. Their bodies and resolution comments were
checked against the parent specification and the integrated release at
`d4b7b5ad00efb865cba13b8e4366a57994589b7c`:

- #13–#15: evidence lifecycle, exact configurations and separate managed-engine discovery.
- #16–#19: search/restoration, provider catalogs, traffic comparison and cancellable handoff.
- #20–#21: breadth acquisition, real VPS overlap and the approved database completion boundary.
- #22: integrated release review, production/deployed checks and current operating/demo guidance.

The explicit approval in [#21's final resolution](https://github.com/Fardinak/torob-aipe-challenge/issues/21#issuecomment-6533023155)
also governs parent completion: **“Publish verified configurations; retain gaps.”**
The parent’s original all-configurations wording must be read with that later
scope decision. Deferred custom/shared families remain resumable acquisition
work. Recording/submission remain subsequent work as specified by #12.

The [release workflow for the audited implementation](https://github.com/Fardinak/torob-aipe-challenge/actions/runs/41126671687)
completed successfully, including its post-publication desktop/mobile journeys.
A fresh local run of `BASE_PATH=/torob-aipe-challenge/ npm test` passed all 42
comparison tests and 17 browser journeys, with three intentional mobile skips;
type checking, catalog/evidence hashes and the production build passed as well.
Parent completion preserves the dated evidence and approved gaps rather than
claiming a new successful source verification. Pre-existing untracked research,
context and specification files are outside this audit commit.

### Standards review

Independent review of `git diff 02aa858...d4b7b5a` (the implementation since
before #13) found no documented-standard violations or material baseline smells
in application code, validation, delivery configuration or representative tests.
Catalog values were assessed through validation/publication paths; this review
does not constitute fresh provider research. The parent audit's documentation
diff also passes `git diff --check`.

### Specification review

Independent review against #12 and the recorded #21 approval found no missing or
incorrect requirements or scope creep. The real VPS overlap satisfies the match
gate; retained database gaps follow the approved boundary. Reviews assess the
implementation and evidence, independently of the final push and ticket closure.

Parent review totals: Standards 0 findings, no material issue; Specification 0
findings, no material issue.
