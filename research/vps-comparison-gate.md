# VPS comparison gate

Research date: 2026-09-19. **Decision: proceed with a narrower advertised-price discovery prototype. The original all-in cost comparison gate has not passed.** Eleven published plans support resource filtering and base-price ordering; missing billing semantics prevent a verified winner for the user's 4 GB RAM + 1 TB server-egress request. No app has been built, and checkout availability has not been verified.

## Evidence of the need

The user described buying a $3 VPS and later discovering a $1.50 alternative. They also described spending substantial time across multiple tabs finding at least 4 GB RAM and 1 TB egress. This is one concrete qualitative account, not broad market validation. It supports two jobs:

1. Find the cheapest published offer in the covered catalog, with no resource minimum.
2. Find the cheapest eligible offer for explicit minimum requirements.

The dollar example motivates discovery; it is not price evidence for our Iranian provider sample. We do not convert currencies or claim these providers cover the user's former purchase market.

## Reviewed catalog

Prices below are advertised monthly toman, not complete bills. ManageIT labels monthly prices while billing hourly PAYG; the exact conversion and cap remain unknown. Its resource labels below are ours because the table does not name plans. IranServer names come directly from its general-purpose table. Sources: [ManageIT server page](https://www.manageitcloud.com/cloud-server), [IranServer Iran VPS page](https://www.iranserver.com/vps/iran/).

| Provider / plan | CPU count | RAM GB | Disk GB | Monthly toman |
| --- | ---: | ---: | ---: | ---: |
| ManageIT 1c / 1g | 1 | 1 | 25 | 710,000 |
| ManageIT 1c / 2g | 1 | 2 | 50 | 975,000 |
| ManageIT 2c / 2g | 2 | 2 | 75 | 1,325,000 |
| ManageIT 2c / 4g | 2 | 4 | 75 | 1,420,000 |
| ManageIT 4c / 4g | 4 | 4 | 75 | 2,030,000 |
| ManageIT 6c / 12g | 6 | 12 | 150 | 3,950,000 |
| IranServer NGP-small40 | 1 | 4 | 40 | 1,823,999 |
| IranServer NGP-medium40 | 2 | 8 | 40 | 2,803,199 |
| IranServer NGP-large80 | 4 | 16 | 80 | 4,823,039 |
| IranServer NGP-xlarge120 | 8 | 32 | 120 | 8,801,279 |
| IranServer NGP-2xlarge160 | 16 | 64 | 160 | 16,696,319 |

IranServer explicitly describes this family as shared CPU. Equal core counts across providers do not establish equal performance. Its five captured rows each list 1,000 GB traffic; the table does not establish that this is server egress. Other table families failed to populate in the captured page, so this is not its full catalog. ManageIT advertises SSD and free IPv6, but its page does not establish base IPv4 inclusion. [IranServer](https://www.iranserver.com/vps/iran/), [ManageIT](https://www.manageitcloud.com/cloud-server).

The [normalized JSON](vps-comparison-data.json) includes unknowns, source URLs, snapshot save times and SHA-256 hashes. Timestamps describe our evidence collection; they are not an observed Torob feature. Original HTML and extracted text are in `evidence/`. Resource GB is preserved as published without assuming GiB equivalence.

## Three worked scenarios

### 1. Cheapest published offer, no minimum resources

Among the 11 captured rows, ManageIT 1 CPU / 1 GB / 25 GB has the lowest monthly headline: **710,000 toman**. This establishes discovery and sorting, not global cheapest, current stock, or lowest complete bill. Traffic, IPv4 and tax may affect what a buyer pays. Source: [ManageIT](https://www.manageitcloud.com/cloud-server).

### 2. At least 4 GB RAM and 1 TB server egress

Define this scenario's 1 TB as 1,000 GB per month; do not silently substitute 1 TiB. Add no CPU or disk requirement the user did not request.

The lowest base-price candidates are ManageIT 2 CPU / 4 GB / 75 GB at **1,420,000**, and IranServer NGP-small40 1 CPU / 4 GB / 40 GB at **1,823,999**. The initial base-price gap is **403,999 toman**. [ManageIT](https://www.manageitcloud.com/cloud-server), [IranServer](https://www.iranserver.com/vps/iran/).

ManageIT publishes free “upload” and 1,200 toman per GB “download” in Parvaz, Omid and Parsian. The page does not explicitly map those words to server ingress/egress. Consequently:

- If the requested usage produces 1,000 billable GB under that tariff, its published-component subtotal is `1,420,000 + 1,000 × 1,200 = 2,620,000` toman.
- If IranServer's 1,000 GB allowance covers the same usage with no extra traffic charge, its base remains 1,823,999: **796,001 less** than that ManageIT subtotal.
- If the usage instead falls under ManageIT's free direction, that traffic charge would be zero. The page alone does not settle which branch matches the user's workload.

Under the first two assumptions, the price order changes above `403,999 / 1,200 = 336.6658` billable GB. This is a sensitivity calculation, **not a verified egress-cost ranking**. Tax, mandatory IP charges, datacenter availability and PAYG conversion also remain unresolved. The strict user requirement has **no confirmed eligible winner in this snapshot**.

### 3. A 4 GB plan with 100 billable GB and an optional floating IPv4

For a buyer who explicitly wants an independent floating IPv4, ManageIT lists that add-on at 195,000 toman/month. It is not evidence that every server requires this charge. [Floating IP tariff](https://www.manageitcloud.com/floating-ip).

Using the 4 GB plan and **100 billable GB at the published download tariff**, the subtotal is `1,420,000 + 100 × 1,200 + 195,000 = 1,735,000` toman: **315,000 above the headline**. This demonstrates useful add-on arithmetic. It is conditional on applicable datacenter, billable quantity, full-month reference pricing and add-on selection; it excludes unresolved fees and is not a checkout quote. [Server tariff](https://www.manageitcloud.com/cloud-server).

Run `python research/check-comparison.py` to reproduce these calculations. Execution succeeded. This checks arithmetic and selection from the recorded dataset, not provider billing behavior.

## Other shortlisted providers

| Provider | Evidence found | Decision for weekend sample |
| --- | --- | --- |
| [Parspack](https://parspack.com/vps/iran) | Plan cards distinguish received traffic from free sent traffic. Embedded `productDataMap` has Iran/Linux monthly prices, including 830,000 for 1 GB and 1,550,000 for 4 GB, but those entries have `is_disabled: true`; displayed prices were absent in captured text. The flag's exact UI meaning is not established. | Promising next source for the egress use case, but do not rank hidden tariffs as verified purchasable offers. Confirm selectable term and current quote first. |
| [IranHost](https://iranhost.com/server/vps/) | Iran plan cards and a comparison table expose resources and prices, alongside Canadian plans and annual pricing. At least one traffic amount conflicts between card and table (4 GB / 4 core row: 4 TB versus 2 TB). | Defer until conflicting values and traffic direction are resolved; avoid mixing countries or annual equivalents with monthly payment. |
| [ArvanCloud](https://www.arvancloud.ir/fa/products/cloud-server) | Requests returned a transfer/interstitial page rather than usable tariffs. | No numeric claims or sample plans retained. |

The T3Code browser host was unavailable during the billing follow-up. Public page snapshots were fetched directly; no logged-in configurator, checkout, purchase or provider outreach was performed. ManageIT's public [OpenAPI schema](https://api.manageit.dev/docs/openapi.yaml) did not resolve traffic direction or the monthly conversion. Earlier promotional/social tariff claims were not used to fill current tax fields.

## Weekend product decision

Keep the VPS direction, with an honest boundary: **find and filter published offers, expose uncertainty, and show cost breakdowns only where the rules support them**. The sample coverage is deliberately small. Do not market it as a complete market search or a verified all-in bill calculator.

Carry forward Torob's immediate offer preview: editable requirements above a list of provider offers. Each row shows monthly base price, resources, original traffic terms, known extras, unknown fields and a source link. These are comparable candidates, not identical products sold by interchangeable vendors. A separate side-by-side screen is optional.

Default to cheapest advertised monthly price in the covered sample. A 4 GB filter works immediately. A 1 TB egress requirement should show **no confirmed matches**, with relevant candidates labeled “traffic eligibility unverified.” Unknowns neither satisfy the requirement nor disappear silently. Do not show an invented total or a reassuring zero for an unknown fee. The hypothetical rank reversal belongs in an explicitly labeled explanation, not the default ranking.

Before enabling verified egress-cost ordering, obtain first-party answers for traffic direction, domestic/international weighting, allowance period, overage, mandatory IPv4, tax, and hourly conversion/caps. Prioritize Parspack's selectable current quote or clarified ManageIT/IranServer terms. This is the remaining data dependency; additional interface polish cannot resolve it.

**Gate score:** user problem supported by one account; 11-plan public catalog passed; base-price/resource comparison passed; three arithmetic examples completed (two conditional); verified all-in/egress comparison failed pending source clarification. Proceed only with the narrower promise above.
