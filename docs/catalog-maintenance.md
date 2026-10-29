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
   actual retrieval time, digest and original wording. Review each sampled row's
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
