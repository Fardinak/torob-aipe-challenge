# سروربین — sampled VPS comparison

Persian RTL React + TypeScript application for issues #2 and #3. Compares monthly **base-plus-traffic subtotals** of six ManageIT and five IranServer plans, with optional minimum RAM, CPU and disk and expected outbound/inbound usage. Estimates exclude unresolved fees and tax; the sample does not claim live stock or exhaustive market coverage.

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

The journey checks ranking, arithmetic, unknown costs, original terms, all
three provider/source destinations, keyboard tab order and focus, RTL, asset
loading, runtime errors, reset and reload. Hosting serves the single application
route `/torob-aipe-challenge/`; no other application routes are defined.

## Data and boundaries

`research/vps-comparison-data.json` is the reviewed source snapshot, kept intact with original terms, links and unresolved fields. `src/catalog.ts` validates its shape, unique identifiers, source references and nonnegative integer prices. Missing required facts block validation; explicit unknowns remain unknown. The application does not display snapshot timestamps.

`compare(catalog, request)` in `src/comparison.ts` owns validation, resource and traffic eligibility, exact integer arithmetic, reasons and deterministic subtotal ordering. It returns ranked, unpriced and excluded groups plus validation errors. `src/traffic-policy.ts` keeps fixed product interpretations separate from source facts: ManageIT download is egress billed at the source rate (1,200 toman/GB), upload is free ingress; IranServer’s unspecified-direction allowance is treated as shared ingress plus egress. Unknown overage is unpriced above the allowance. Confirmed hard caps exclude plans; known paid overage charges only excess. Synthetic policies enter through the optional third comparison argument in tests, without adding live offers. Calculations outside JavaScript’s safe integer range remain unpriced.

Blank resource requirements impose no constraints; blank usage is zero. Usage is in whole GB, with 1 TB explicitly equal to 1,000 GB. Nonnegative whole numbers (including Persian/Arabic digits) update results immediately. Invalid input hides quotes until corrected. Equal prices sort by stable plan ID, with no performance preference implied.

Billing disclosures preserve unknown CPU allocation, tax, mandatory fees and IPv4 inclusion. ManageIT's optional floating IPv4 price is explanatory only. Published monthly prices are not converted to hourly prices. The prototype remains on `prototype/vps-comparison`; this application implements layout A's interaction without merging the prototype.

## Traffic comparison demo

Choose **۴ GB رم + ۱ TB خروجی**: eight offers are priced, led by IranServer NGP-small40 at 1,823,999 toman. ManageIT 2c/4g/75g shows 1,420,000 base + 1,200,000 traffic = 2,620,000 toman. Change outbound to 1,200 GB: three ManageIT offers remain ranked (2c/4g/75g at 2,860,000), with five IranServer offers separately unpriced. Inspect the original tariff wording and limitations, then reset. CPU and disk remain unconstrained by this preset.

## Reproducible demo outline (under five minutes)

1. **0:00–0:35:** Open the deployed URL and explain
   the buyer problem: comparing sampled Iranian VPS offers requires
   interpreting both resources and traffic terms.
2. **0:35–1:30:** Show the default 11 offers, select **۴ GB رم + ۱ TB خروجی**, and point out
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
