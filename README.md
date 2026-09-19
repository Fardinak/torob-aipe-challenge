# سروربین — sampled VPS comparison

Persian RTL React + TypeScript application for issues #2 and #3. Compares monthly **base-plus-traffic subtotals** of six ManageIT and five IranServer plans, with optional minimum RAM, CPU and disk and expected outbound/inbound usage. Estimates exclude unresolved fees and tax; the sample does not claim live stock or exhaustive market coverage.

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

On supported Linux systems without browser libraries, use `npx playwright install --with-deps chromium`. `npm run test:unit` runs comparison tests; `npm run test:browser` runs the same user journey at desktop and mobile widths. `npm run build` checks types and catalog validity before emitting `dist/`. Preview it with `npm run preview`; deploy `dist/` to any static host. No API, database or secrets are needed.

## Data and boundaries

`research/vps-comparison-data.json` is the reviewed source snapshot, kept intact with original terms, links and unresolved fields. `src/catalog.ts` validates its shape, unique identifiers, source references and nonnegative integer prices. Missing required facts block validation; explicit unknowns remain unknown. The application does not display snapshot timestamps.

`compare(catalog, request)` in `src/comparison.ts` owns validation, resource and traffic eligibility, exact integer arithmetic, reasons and deterministic subtotal ordering. It returns ranked, unpriced and excluded groups plus validation errors. `src/traffic-policy.ts` keeps fixed product interpretations separate from source facts: ManageIT download is egress billed at the source rate (1,200 toman/GB), upload is free ingress; IranServer’s unspecified-direction allowance is treated as shared ingress plus egress. Unknown overage is unpriced above the allowance. Confirmed hard caps exclude plans; known paid overage charges only excess. Synthetic policies enter through the optional third comparison argument in tests, without adding live offers. Calculations outside JavaScript’s safe integer range remain unpriced.

Blank resource requirements impose no constraints; blank usage is zero. Usage is in whole GB, with 1 TB explicitly equal to 1,000 GB. Nonnegative whole numbers (including Persian/Arabic digits) update results immediately. Invalid input hides quotes until corrected. Equal prices sort by stable plan ID, with no performance preference implied.

Billing disclosures preserve unknown CPU allocation, tax, mandatory fees and IPv4 inclusion. ManageIT's optional floating IPv4 price is explanatory only. Published monthly prices are not converted to hourly prices. The prototype remains on `prototype/vps-comparison`; this application implements layout A's interaction without merging the prototype.

## Traffic comparison demo

Choose **۴ GB رم + ۱ TB خروجی**: eight offers are priced, led by IranServer NGP-small40 at 1,823,999 toman. ManageIT 2c/4g/75g shows 1,420,000 base + 1,200,000 traffic = 2,620,000 toman. Change outbound to 1,200 GB: three ManageIT offers remain ranked (2c/4g/75g at 2,860,000), with five IranServer offers separately unpriced. Inspect the original tariff wording and limitations, then reset. CPU and disk remain unconstrained by this preset.
