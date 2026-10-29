# سروربین — VPS and managed database discovery

Persian RTL React + TypeScript application for issues #2, #3, #13 and #14. Defaults to published **monthly base-price discovery**, with a separate **base-plus-traffic subtotal** mode of six ManageIT and five current IranServer configurations (plus one inspectable unresolved historical configuration), with optional minimum/exact RAM, CPU and disk, a base-price budget and expected outbound/inbound usage. Select a configuration to inspect its eligible provider offers and independent billing terms. Estimates exclude unresolved fees and tax; the sample does not claim live stock or exhaustive market coverage.

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
`/` locally and under the repository path in production. The root page can be
refreshed directly and returns to the default in-memory comparison.

## Run

Use Node.js 22.12+ (or 24+) and npm. From a fresh checkout:

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite. State stays in memory; reload clears requirements.

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

`research/vps-reviewed-catalog.json` is the current reviewed catalog with retained evidence revisions, fact statuses and verification attempts. `research/vps-comparison-data.json` remains the unchanged historical snapshot. `src/catalog.ts` validates provider/source records, unique identifiers, evidence references, identity continuity and nonnegative integer prices. The build also checks retained snapshot hashes. Missing required facts block validation; explicit unknowns remain unknown. The application displays successful-review dates, evidence warnings and source links. Snapshot capture timestamps remain separate from verification dates.

`compare(catalog, request)` in `src/comparison.ts` owns validation, offer eligibility, listing consolidation, starting prices, traffic arithmetic and deterministic ordering. `request.resourceMode` defaults to `minimum`; `exact` requires equality for every selected amount (including zero). `request.budget` is an inclusive monthly base-price ceiling applied per offer before starting prices. Unknown mandatory fees do not prevent base-price eligibility; unresolved base tariffs remain inspectable and never supply a starting price.

`request.priceMode` defaults to `base`, even when usage is supplied. Choose `traffic` to rank base-plus-traffic subtotals. The UI exposes both modes; the usage preset activates traffic mode. Billing uses the catalog's explicitly published monthly reference in toman, retaining each offer's payment terms (including hourly PAYG) without inventing hourly conversions. A budget still constrains base prices in traffic mode and does not guarantee the subtotal or final bill fits it.

The returned `items` contain only eligible provider offers, exact or explicitly incomplete resource identity, a starting price/offer (or null), billing basis and offer-level cost uncertainty. Grouping requires verified CPU, RAM, storage capacity and a known storage type supported by verified storage evidence. Unknown facts produce separate items; equal resources do not promise equal performance. Stable offer IDs break price ties, and stable configuration IDs break listing ties. Legacy `ranked`, `unpriced`, `excluded` and validation errors remain available.

Per-offer traffic policies and explicit assumptions keep product interpretations separate from source facts; `src/traffic-policy.ts` validates them: ManageIT download is egress billed at the source rate (1,200 toman/GB), upload is free ingress; IranServer’s unspecified-direction allowance is treated as shared ingress plus egress. Unknown required traffic charges stay outside ranked subtotals. Confirmed hard caps exclude plans; known paid overage charges only excess. Synthetic overlaps and policies are tests only; the reviewed sample has no established exact cross-provider match and does not satisfy #12's release coverage gate. Calculations outside JavaScript’s safe integer range remain unpriced.

Blank resource requirements impose no constraints; blank usage is zero. Usage is in whole GB, with 1 TB explicitly equal to 1,000 GB. Nonnegative whole numbers (including Persian/Arabic digits) update results immediately. Invalid input hides quotes until corrected. Equal prices sort by stable plan ID, with no performance preference implied.

Billing disclosures preserve unknown CPU allocation, tax, mandatory fees and IPv4 inclusion. ManageIT's optional floating IPv4 price is explanatory only. Published monthly prices are not converted to hourly prices. The prototype remains on `prototype/vps-comparison`; this application implements layout A's interaction without merging the prototype.

See [manual refresh and identity rules](docs/catalog-maintenance.md) and the [2026-10-29 evidence review](research/vps-evidence-refresh-2026-10-29.md). Stale evidence alone stays eligible. Unresolved facts cannot support dependent filters/calculations; confirmed withdrawn offers remain archived and are excluded from comparison. This slice adds exact VPS discovery and preserves traffic comparison; the broader coverage, search, provider catalogs, URL restoration and refined mobile navigation in #12 remain separate work.

## Traffic comparison demo

Choose **۴ GB رم + ۱ TB خروجی**: eight offers are priced, led by IranServer NGP-small40 at 2,436,399 toman. ManageIT 2c/4g/75g shows 1,420,000 base + 1,200,000 traffic = 2,620,000 toman. Change outbound to 1,200 GB: three ManageIT offers remain ranked (2c/4g/75g at 2,860,000), with five IranServer offers separately unpriced. Select a configuration to inspect its provider offer. Inspect the original tariff wording and limitations, then reset. CPU and disk remain unconstrained by this preset.

## Reproducible demo outline (under five minutes)

1. **0:00–0:35:** Open the deployed URL and explain
   the buyer problem: comparing sampled Iranian VPS offers requires
   interpreting both resources and traffic terms.
2. **0:35–1:30:** Show the 11 ranked offers and one unresolved historical record, select **۴ GB رم + ۱ TB خروجی**, and point out
   the changed ranking plus ManageIT's `۱٬۴۲۰٬۰۰۰ + ۱٬۲۰۰٬۰۰۰` arithmetic.
3. **1:30–2:15:** Enter `1200` in outbound usage (without a thousands separator) and show three ranked ManageIT offers
   alongside five separately unpriced candidates; explain why unknown overage
   is not ranked as a cheap base price.
4. **2:15–3:15:** Expand **جزئیات هزینه و منبع** to inspect original tariff wording and open
   the provider source link in a new tab. Reset the filters and refresh to show
   the documented default state.
5. **3:15–4:30:** Close with the engineering boundary: a static React/TypeScript app, exact
   comparison operation tests, responsive browser tests, and fixed product
   interpretations kept separate from source facts. Explain the AI-assisted
   workflow: the agent implemented the approved issues, ran comparison and
   browser tests, and reviewed the changes; human decisions set the buyer
   problem, sample scope and traffic interpretation. Show the issue and test
   results as evidence. AI supports development; the deployed app does not
   call an AI model.

The catalog is a reviewed, limited sample. It does not claim live availability,
exhaustive market coverage, a final bill, or verified current provider terms;
buyers should confirm conditions, inventory, tax and mandatory fees with the
provider before purchase. The prototype reference remains on
`prototype/vps-comparison`.

## Managed database initial slice (#15)

Choose **دیتابیس مدیریت‌شده** in the category control, then an engine and a verified version. PostgreSQL and Redis each have two reviewed initial Liara base-package configurations. Minimum/exact resources and base-price budgets operate before listing prices. Engine/version choices come from admitted offers, with no engine whitelist. Version matching uses the exact published version string. Unknown/unsupported evidence cannot satisfy it. VPS remains the default category. Database comparisons always use base prices and never VPS traffic policies; cross-engine browsing is ordered by engine, then price within each engine.

Database listing identity adds engine and verified node topology to exact CPU/RAM/storage identity, excluding version. Unknown topology keeps the initial offers independent. Details expose management, backups, location, topology, package, billing, mandatory-charge uncertainty, statuses, source links and general-tariff handoff. The visible backup conflict is unresolved, not an included-backup promise. See [initial review](research/managed-database-initial-review-2026-10-29.md). This does not fulfill the separate broad acquisition or genuine cross-provider release gate.

Demo: switch category, select PostgreSQL / 18.4 / minimum 4 GB RAM, inspect Saturn at 4,125,000 toman/month and expand its service evidence. Switch to exact 8 GB to show preserved empty results, return to 4 GB, then choose Redis / 8.0. Follow the disclosed general provider tariff link. The representative browser journey runs on desktop and mobile alongside the existing VPS journeys.
