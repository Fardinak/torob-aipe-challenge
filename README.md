# سروربین — VPS and managed database discovery

Persian RTL React + TypeScript discovery application. The reviewed static catalog includes Iranian VPS configurations across a broad provider search and reviewed managed database configurations across five providers and sixteen engine identities. Browse exact resource configurations, inspect each provider's own tariff and evidence, filter resources/providers/base budgets, and restore the journey through its URL. A separate traffic mode preserves the original ManageIT/IranServer worked scenario; other policies contribute estimates only when supported. Prices are published monthly references, with billing terms, mandatory-charge uncertainty and verification dates visible. No live-stock or complete-bill guarantee is made.

See the [VPS acquisition review](research/vps-breadth-review-2026-10-29.md) for search scope, admission decisions, exact overlaps and remaining limitations. See the [database acquisition review](research/database-acquisition-review-2026-10-30.md) for admitted plans, engine applicability, billing variants and unresolved custom/shared families. The overall release checklist remains separate from acquisition.

## Deployment

Hosting: [GitHub Pages](https://fardinak.github.io/torob-aipe-challenge/).
The repository is public and Pages is configured with **Settings → Pages →
Source: GitHub Actions**. Both are required: making a repository public does
not enable Pages automatically. No application secret is needed.

A push to `main` or a manual run of `Deploy to GitHub Pages` validates the
catalog, checks types, runs comparison tests and the desktop/mobile journey
against the production build, then publishes `dist/` and repeats the journey
against the deployed URL. A failed post-deployment check leaves the site
published but marks the workflow failed; inspect the failed step before
claiming delivery complete. The
Vite base path is supplied by `BASE_PATH`, so the same build remains usable at
`/` locally and under the repository path in production. The root page can be refreshed directly; query parameters restore the discovery comparison and selected detail. A clean homepage URL uses defaults.

## Run

Use Node.js 22.12+ (or 24+) and npm. From a fresh checkout:

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite. Discovery state is stored in the URL. Reload, sharing and browser Back/Forward restore it.

## Verify

```sh
npx playwright install chromium
npm run typecheck
npm test
npm run build
```

On supported Linux systems without browser libraries, use `npx playwright install --with-deps chromium`. `npm run test:unit` runs comparison tests; `npm run test:browser` builds the application and runs the same user journey at desktop and mobile widths against Vite's production preview. Port 4173 must be free. `npm run build` checks types and catalog validity before emitting `dist/`. Preview it with `npm run preview`. No API, database or secrets are needed.

Verify the production project path locally, or target the live deployment
(include the trailing slash; remote verification does not start a local server):

```sh
BASE_PATH=/torob-aipe-challenge/ npm test
PLAYWRIGHT_BASE_URL=https://fardinak.github.io/torob-aipe-challenge/ npm run test:browser
```

The journeys check configuration selection, minimum/exact resources, base-price budgets, traffic ranking/arithmetic, unknown costs, provider/source destinations, visible verification dates, 30-day stale warnings, keyboard operation, RTL, asset loading, runtime errors, reset and reload. Hosting serves the single application
route `/torob-aipe-challenge/`; no other application routes are defined.

## Data and boundaries

`research/vps-reviewed-catalog.json` is the current reviewed catalog with retained evidence revisions, fact statuses and verification attempts. `research/vps-comparison-data.json` remains the unchanged historical snapshot. `src/catalog.ts` validates provider/source records, unique identifiers, evidence references, identity continuity and nonnegative integer prices. The build also checks retained snapshot hashes and publishes referenced evidence as plain text beside `evidence/catalog.json`. Use the production build/preview to inspect these generated download assets. Missing required facts block validation; explicit unknowns remain unknown. The application displays successful-review dates, evidence warnings and source links. Snapshot capture timestamps remain separate from verification dates.

`compare(catalog, request)` in `src/comparison.ts` owns validation, offer eligibility, listing consolidation, starting prices, traffic arithmetic and deterministic ordering. `request.resourceMode` defaults to `minimum`; `exact` requires equality for every selected amount (including zero). `request.budget` is an inclusive monthly base-price ceiling applied per offer before starting prices. Unknown mandatory fees do not prevent base-price eligibility; unresolved base tariffs remain inspectable and never supply a starting price.

Offers with a verified native hourly/daily tariff or USD monthly price retain that amount, currency and period in `published_tariff`. Their absent toman monthly reference is `null`, never zero. Details display the native tariff, while monthly toman ordering and starting prices omit it. A monthly toman budget excludes these offers because no supported conversion establishes eligibility. Published annual monthly equivalents and hourly monthly caps remain separately labelled billing variants; no period or currency conversion is invented.

`request.priceMode` defaults to `base`, even when usage is supplied. Choose `traffic` to rank base-plus-traffic subtotals. The UI exposes both modes; the usage preset activates traffic mode. Billing uses the catalog's explicitly published monthly reference in toman, retaining each offer's payment terms (including hourly PAYG) without inventing hourly conversions. A budget still constrains base prices in traffic mode and does not guarantee the subtotal or final bill fits it.

The returned `items` contain only eligible provider offers, exact or explicitly incomplete resource identity, a starting price/offer (or null), billing basis and offer-level cost uncertainty. Grouping requires verified CPU, RAM, storage capacity and a known storage type supported by verified storage evidence. Unknown facts produce separate items; equal resources do not promise equal performance. Stable offer IDs break price ties, and stable configuration IDs break listing ties. Legacy `ranked`, `unpriced`, `excluded` and validation errors remain available.

Per-offer traffic policies and explicit assumptions keep product interpretations separate from source facts; `src/traffic-policy.ts` validates them: ManageIT download is egress billed at the source rate (1,200 toman/GB), upload is free ingress; IranServer’s unspecified-direction allowance is treated as shared ingress plus egress. Unknown required traffic charges stay outside ranked subtotals. Confirmed hard caps exclude plans; known paid overage charges only excess. Synthetic fixtures remain tests only. The reviewed catalog now contains first-party-backed exact cross-provider VPS matches, documented in the acquisition review; this does not complete database acquisition or every #12 release obligation. Calculations outside JavaScript’s safe integer range remain unpriced.

Blank resource requirements impose no constraints; blank usage is zero. Usage is in whole GB, with 1 TB explicitly equal to 1,000 GB. Nonnegative whole numbers (including Persian/Arabic digits) update results immediately. Invalid input hides quotes until corrected. Equal prices sort by stable plan ID, with no performance preference implied.

Billing disclosures preserve source-specific CPU allocation, tax, mandatory fees, IP/NAT and IPv4 uncertainty. ManageIT's optional floating IPv4 price is explanatory only. Native prices are not converted between currencies or invented monthly/hourly equivalents. The prototype remains on `prototype/vps-comparison`; this application implements approved layout C without merging the prototype.

See [manual refresh and identity rules](docs/catalog-maintenance.md) and the [2026-10-29 evidence review](research/vps-evidence-refresh-2026-10-29.md). Stale evidence alone stays eligible. Unresolved facts cannot support dependent filters/calculations; confirmed withdrawn offers remain archived and are excluded from comparison. VPS acquisition is indexed in the breadth review; database breadth and integrated release verification remain separate #12 work.

## Traffic comparison demo

Open `?category=vps&ram=4&provider=manageit,iranserver&priceMode=traffic&egress=1000` to pin the historical provider scenario while coverage expands: eight offers are priced, led by IranServer NGP-small40 at 2,436,399 toman. ManageIT 2c/4g/75g shows 1,420,000 base + 1,200,000 traffic = 2,620,000 toman. Change outbound to 1,200 GB: three ManageIT offers remain ranked (2c/4g/75g at 2,860,000), with five IranServer offers separately unpriced. Select a configuration to inspect its provider offer. Inspect the original tariff wording and limitations, then reset. CPU and disk remain unconstrained by this preset.

## Reproducible demo outline (under five minutes)

1. **0:00–0:35:** Open the deployed URL and explain
   the buyer problem: comparing sampled Iranian VPS offers requires
   interpreting both resources and traffic terms.
2. **0:35–1:30:** Browse the expanded catalog and a real multi-provider exact item, then open the pinned traffic-scenario URL above and point out
   the changed ranking plus ManageIT's `۱٬۴۲۰٬۰۰۰ + ۱٬۲۰۰٬۰۰۰` arithmetic.
3. **1:30–2:15:** Enter `1200` in outbound usage (without a thousands separator) and show three ranked ManageIT offers
   alongside five separately unpriced candidates; explain why unknown overage
   is not ranked as a cheap base price.
4. **2:15–3:15:** Expand **جزئیات هزینه و منبع** to inspect original tariff wording and open
   the provider handoff in a new tab; cancel the countdown to inspect its warnings, then use Continue now. Share or refresh the URL to restore the comparison; open the clean homepage to show defaults.
5. **3:15–4:30:** Close with the engineering boundary: a static React/TypeScript app, exact
   comparison operation tests, responsive browser tests, and fixed product
   interpretations kept separate from source facts. Explain the AI-assisted
   workflow: the agent implemented the approved issues, ran comparison and
   browser tests, and reviewed the changes; human decisions set the buyer
   problem, sample scope and traffic interpretation. Show the issue and test
   results as evidence. AI supports development; the deployed app does not
   call an AI model.

The catalog is a reviewed, limited sample. It does not claim live availability,
exhaustive market coverage, a final bill, or continuously verified provider terms;
buyers should confirm conditions, inventory, tax and mandatory fees with the
provider before purchase. The prototype reference remains on
`prototype/vps-comparison`.

## Managed database initial slice (#15)

Choose **دیتابیس مدیریت‌شده** in the category control, then an engine and a verified version. PostgreSQL and Redis each have two reviewed initial Liara base-package configurations. Minimum/exact resources and base-price budgets operate before listing prices. Engine/version choices come from admitted offers, with no engine whitelist. Version matching uses the exact published version string. Unknown/unsupported evidence cannot satisfy it. The clean homepage browses both release categories in separate groups; the comparison operation retains VPS as its default for existing callers. Database comparisons always use base prices and never VPS traffic policies; cross-engine browsing is ordered by engine, then price within each engine.

Database listing identity adds engine and verified node topology to exact CPU/RAM/storage identity, excluding version. Unknown topology keeps the initial offers independent. Details expose management, backups, location, topology, package, billing, mandatory-charge uncertainty, statuses, source links and general-tariff handoff. The visible backup conflict is unresolved, not an included-backup promise. See [initial review](research/managed-database-initial-review-2026-10-29.md). This does not fulfill the separate broad acquisition or genuine cross-provider release gate.

Demo: switch category, select PostgreSQL / 18.4 / minimum 4 GB RAM, inspect Saturn at 4,125,000 toman/month and expand its service evidence. Switch to exact 8 GB to show preserved empty results, return to 4 GB, then choose Redis / 8.0. Follow the disclosed general provider tariff link. The representative browser journey runs on desktop and mobile alongside the existing VPS journeys.

## Search and restoration (#16)

The prominent search spans both categories. Category buttons enter the same
results view without a query. Search matches product/category/engine names
and [verified Persian/English aliases](docs/search-aliases.md); it does not
search provider metadata or infer hardware for workloads. Select the database
category to expose engine and applicable version facets. Global browsing keeps
VPS and each database engine in separate price comparisons, including when
VPS traffic mode is active. Sort changes ordering within each group; unpriced
offers remain last.

Filters appear above the desktop list beside a persistent, scrollable detail
pane. On mobile, filters use a keyboard-accessible modal drawer (Escape closes
it); selecting a configuration shows full-width details. Back restores list
position and keyboard focus. Prices, billing basis, verification dates and
relevant uncertainty remain visible; deeper service/evidence information is
expandable. Counts, removable filter buttons and explicit reset recover empty
results without changing constraints silently.

The URL carries `query`, `category`, `engine`, `version`, `ram`, `cpu`, `disk`,
`resourceMode`, `budget`, `provider`, `sort`, `egress`, `ingress`, `priceMode`
and `detail`. No browser-local storage is used. Navigation preserves the
hosting base path. Explicit filter changes clear selected detail; shared or
reloaded detail IDs restore eligible offers. If an ID no longer matches the
catalog, the view explains that it is unavailable rather than substituting a
different selected detail. Invalid inputs suppress results until corrected.

Try searching `پستگرس`, choose the database category / PostgreSQL / 18.4 /
minimum 4 GB, select the configuration, then reload or share its URL. Remove
the search chip, change engine to Redis, and use browser Back/Forward. On a
phone, open the filter drawer, narrow results, inspect a configuration and use
Back. The production browser journeys cover these outcomes, list position,
focus, empty recovery and restored VPS traffic arithmetic under the hosting
base path. The existing catalog coverage/release limitations still apply.

## Provider discovery (#17)

Select one or more providers in the provider filter (Ctrl/Cmd selects multiple
on desktop). Only selected providers contribute offers and starting prices.
The URL's `provider` parameter contains comma-separated stable provider IDs;
removing the provider chip restores all providers.

Open a provider catalog from the provider links or any offer detail. The
`catalog` URL parameter selects a separate profile containing all that
provider's admitted release offers across VPS and managed engines at its own
published base prices. This covers admitted release offers, **not every
product the provider sells**. Discovery filters and traffic assumptions are
retained in the URL for returning to comparison, but do not narrow or reprice
the catalog. Catalog groups retain separate category/engine price comparisons,
verification dates, evidence warnings and unknown mandatory charges. Select a
configuration to inspect its own provider offers; reload, sharing and browser
Back/Forward restore catalog and detail navigation under the hosting base path.

The comparison check uses a synthetic exact overlap to prove that an excluded
cheaper provider cannot supply a starting price. Production VPS and database
journeys exercise provider filtering, catalog prices, all-engine coverage and
restoration. Real exact VPS overlaps are now present; see the acquisition review for supported identities and provider-specific differences. Database breadth and the remaining #12 release gates still require their own verification.

## VPS usage controls (#18)

The **مصرف و روش قیمت VPS** disclosure sits above results on desktop and mobile,
separate from the filter drawer. It opens initially and can be collapsed. The
active mode, entered outbound/inbound GB, decimal TB conversion, base-budget
meaning and applicable product interpretations remain visible below it.
Entering usage retains base mode until the buyer explicitly chooses traffic
mode (or uses the traffic preset). Traffic details show billable GB, applicable
rate, traffic charge and base-plus-traffic arithmetic even when the charge is
zero. Unknown required traffic remains inspectable outside ranked subtotals.
Invalid usage displays an error even while controls are collapsed and removes
quotes until corrected. Database and provider catalogs retain base prices.

For a visible ordering change, browse VPS with minimum 4 GB RAM: base mode
starts at ManageIT's 1,420,000 toman. Enter 1,000 GB outbound and select traffic
mode: IranServer NGP-small40 leads at 2,436,399 toman, while ManageIT becomes
2,620,000. Collapse usage, inspect the zero-charge IranServer breakdown, and
share/reload the selected-detail URL. Back/Forward restores the scenario;
changing the base budget still filters published base prices only.

## Provider handoff (#19)

Each provider offer has **ادامه به …**, opening a new tab at the same hosting
base path. The `handoff` parameter retains the stable selected offer ID alongside
the comparison URL, including traffic usage or provider-catalog context. The
handoff displays that offer's configuration, prices, unresolved costs, evidence
warnings and expandable sources. It never substitutes the cheapest offer's
provider destination. Missing or ineligible IDs stop without redirecting.

The visible five-second countdown automatically opens the selected offer's
retained primary source. **لغو** cancels automatic departure; **ادامه اکنون**
continues immediately, including after cancellation. Return to comparison
restores the URL context. All currently reviewed destinations are general
product/tariff pages, disclosed explicitly rather than presented as direct
checkout. Source links remain available for verification. Published offers and
working links do not establish current stock or provisioning availability.

Desktop/mobile production journeys exercise keyboard opening and cancellation,
immediate continuation, the five-second boundary, offer-specific identity and
provider destination, unknown traffic costs, database evidence conflicts and
staleness, and missing-offer recovery. External destinations are intercepted;
these checks do not log in or purchase.
