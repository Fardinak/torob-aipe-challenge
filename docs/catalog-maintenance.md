# Manual infrastructure evidence refresh and identity

The application is static. Edit `research/vps-reviewed-catalog.json`, review the
first-party evidence and run the production checks before publication. The
2026-09-19 JSON and research remain historical assets; their capture timestamps
are not fresh verification dates. See [the initial refresh](../research/vps-evidence-refresh-2026-10-29.md).

## Identity and retained revisions

Provider and source keys are open records, not an enum. Add a provider with its
name, billing disclosures and explicit unknowns; add first-party sources owned
by that provider with HTTPS URL, human-readable label, local snapshot path,
capture timestamp and SHA-256. Source keys are immutable evidence revisions:
create a new key/file when refreshing, rather than overwriting the old source.
The build verifies every retained snapshot's hash.

Offer IDs are opaque permanent identifiers. Names and prices are not identity.
Before changing either, append the previous published offer fields and evidence
to `revisions`, with a unique `revision_id`; keep chronological successful-review
dates. The current fields are the latest revision. Earlier revisions retain
original tariffs, configuration, unknowns, source references and interpretations.

Different CPU/RAM/disk sizes, storage types, hardware/feature packages,
topologies, regions or billing variants get different IDs. The validator rejects
changes to those dimensions within one ID's history. A display label is not a
storage type. Unknown identity dimensions are `null`; they cannot prove that two
offers match. Listing consolidation requires all exact identity facts to be verified. Never recycle an
old ID for a replacement sold under the same marketing name. If the old
configuration cannot be reverified, keep its history, mark affected facts
unresolved and record the attempt; absence alone is not confirmed withdrawal.

## Refresh procedure

1. Retrieve every applicable first-party tariff and terms page. Retain the bytes,
   actual retrieval time, digest and original wording. Review every qualifying row's
   resources, price and currency, billing basis, traffic terms and applicability,
   optional extras, tax, mandatory fees and unresolved claims. A 200 response
   without the required content is not successful verification.
2. Record every verification attempt in chronological order (array order breaks
   same-day ties), with date, sources, outcome, affected fact keys and an explanation. A failed request must not advance `last_verified_at`
   or imply withdrawal. Mark facts whose support could not be reverified `failed`;
   preserve their last known values and earlier successful date. A later successful
   review may restore them; a tool failing before a successful fallback is retained
   as an attempt without leaving those facts failed.
3. Set fact statuses to `verified`, `unknown`, `conflicting` or `failed`. Preserve
   both dated sources for a conflict, and explain the claims in evidence notes or
   attempt notes. Keep unaffected facts verified. Unknown is never zero, included,
   unlimited or unavailable. A previously known value may remain in the record,
   but its status controls whether it supports a result.
4. Only after reviewing the supporting evidence successfully, set
   `last_verified_at` to that review's UTC date and add a successful attempt. The
   historical 2026-09-19 review is supported by `vps-comparison-gate.md`, not inferred
   from snapshot save times. Partial or failed reviews leave that date unchanged.
5. Keep billing wording and monthly-reference labels explicit. This operation
   continues comparing published monthly reference prices; it does not invent
   hourly conversions, complete bills or other-period conversions. Retain null
   IPv4/tax/location facts and mark mandatory-fee completeness honestly.
6. Review the explicit per-offer `traffic_policy` and `traffic_assumption`.
   The historical product interpretations are download-as-egress/free-upload for
   ManageIT and a shared ingress-plus-egress allowance for unspecified-direction
   terms. These are not newly verified direction facts. New sources require their
   own supported interpretation; a provider ID never chooses one automatically.
   Unknown rate/allowance/overage cannot manufacture a usage subtotal. A known hard
   cap excludes, and known paid overage charges only excess. Preserve original
   source labels and tariff applicability alongside the interpretation.
7. Confirm withdrawal using first-party evidence before setting `lifecycle` to
   `withdrawn` with a dated `withdrawal` source and reason. Retain the entire offer
   and revisions in the catalog archive; the comparison operation excludes it from
   all active results. No sampled offer's withdrawal was confirmed in this refresh.
8. Run `npm run typecheck`, `BASE_PATH=/torob-aipe-challenge/ npm test` and
   `npm run build`, review the diff and evidence, then publish through existing CI.
   Live deployment smoke checks remain a separate CI gate after publication.

## Eligibility and freshness

`compare(catalog, request, policies?)` remains the public boundary. It validates
catalog references/identities and the request before computing. An unresolved
resource cannot satisfy its selected minimum; unresolved base price cannot rank;
traffic evidence gates only usage that depends on it. Each fact’s latest failed
attempt also gates it automatically, even if its status was not manually updated;
a later successful attempt restores the reviewed status, including any explicit
unknown or conflict. Zero usage can retain a
verified base when traffic policy is unknown. Stale evidence alone never removes
eligibility. The UI displays successful-review dates and a warning beside overdue
prices after 30 elapsed UTC days, including historical prices in disclosures.
Conflicts/failed facts remain visibly unresolved, separate from stale evidence.

Synthetic test fixtures cover withdrawal, failed refresh, unknown traffic and
identity failures; they are never release offers or evidence of market coverage.
The original worked arithmetic remains tested against the historical tariffs;
the application uses the refreshed reviewed catalog.

## Managed database evidence

Set category to `database` with a free-form engine identity and retained version
evidence. Ordinary hosting and a database installed on VPS do not qualify.
Admission requires an identifiable priced configuration and first-party provider
operating responsibility beyond provisioning. Keep sources and review dates.
An unresolved management responsibility excludes the offer from database results;
unresolved versions cannot satisfy a version filter. Version is not listing identity.
Database grouping additionally requires verified node topology and the same engine.

Record database attempts using `database_version`, `database_topology`,
`database_management`, `database_backup`, `database_location`,
`database_feature_package` and `database_mandatory_charges` in `affected_facts`.
The same latest-attempt rule applies as for resources and tariffs. Successful
attempts restore the reviewed status, including explicit unknown/conflicting facts.
Keep conflicting backup claims and their applicable package visible; a generic
backup guide cannot override a package restriction or establish another engine's
backup guarantee. Per-offer unresolved mandatory charges preserve cost uncertainty
even when provider-wide fees are documented. Database offers never inherit VPS
traffic policies or compete on price across engines.

The [initial review](../research/managed-database-initial-review-2026-10-29.md)
is a sample, not the broad acquisition or exact cross-provider release gate.


## VPS breadth acquisition (#20)

Continue from [the breadth review](../research/vps-breadth-review-2026-10-29.md)
and its linked source manifests, rather than repeating the original shortlist.
Review all returned qualifying fixed configurations, including nondefault family
and datacenter tabs; do not use the old two-by-two target as a cap. Preserve
excluded rows, failed requests and unfinished leads with their reasons. A new
provider or resource/traffic/billing family that adds meaningful coverage reopens
the breadth search; matching resources alone do not complete acquisition.

The production build publishes the reviewed data at `evidence/catalog.json`
and each referenced snapshot as `evidence/<source-key>.txt`. Offer disclosures
link the retained snapshot next to the live first-party page. Raw provider HTML
is served as plain text so its scripts cannot execute on the catalog origin.
Both current and historical referenced snapshots are emitted; build validation
checks their original byte hashes before publication.

Monthly toman reference prices remain the ranking basis. A missing reference is
`null`, never zero. A verified `published_tariff` records native amount, currency
and hour/day/month basis; `evidence.facts.published_tariff` and verification
attempts follow the same fact-specific lifecycle. Native tariffs without a toman
monthly reference remain inspectable outside ranking and cannot satisfy a toman
budget. The validator rejects a USD offer claiming a fabricated toman reference.
Preserve other published
billing periods in evidence, without inventing monthly/hourly conversions.
Unknown storage type permits base-price admission but cannot prove exact
identity. Mixed-media offers retain their composition; any decimal aggregate
capacity is explicitly derived, never treated as a single-media exact match.
MB values use decimal MB/1000 for the GB filter, retaining the original MB label;
no implicit MB/MiB or GB/GiB equivalence is introduced.

## Database breadth acquisition (#21)

Continue from the [acquisition review](../research/database-acquisition-review-2026-10-30.md),
[source search](../research/database-source-breadth-2026-10-30.md) and
[machine-readable progress](../research/database-acquisition-progress.json).
The reviewed named configurations span Liara, Chabokan, Weblines, ArvanCloud
and Darmant, including engines beyond PostgreSQL/Redis. Engine-specific setup
links or engine-page cards establish tariff applicability; shared platform
quotas and same-page engine logos do not establish individual engine allocations.

Preserve the explicit hourly/monthly references and native three-month, six-month
and annual totals. The latter have no invented monthly reference and stay
outside monthly ranking/budgets. Billing variants have distinct offer IDs.
An unknown CPU is `null` with unknown evidence, remains inspectable, cannot
satisfy a CPU filter and cannot prove exact identity. Unknown versions never
satisfy a version filter. Reuse the existing catalog validator, comparison
operation and representative multi-engine browser journeys.

Custom-resource grids and ambiguous shared bundles remain unfinished acquisition,
not an implicitly approved cap at named plans. The progress ledger records the
remaining source/orderability/allocation questions. Return an evidence-backed
inability to cover them to the human before changing the agreed scope.
