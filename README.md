# سروربین — sampled VPS comparison

Persian RTL React + TypeScript application for issue #2. Compares the advertised monthly **base price** of six ManageIT and five IranServer plans, with optional minimum RAM, CPU and disk. This slice assumes zero traffic usage; it does not estimate complete bills or claim live stock or exhaustive market coverage.

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

`compare(catalog, request)` in `src/comparison.ts` owns input validation, resource eligibility, reasons and deterministic ordering. It returns ranked, unpriced and excluded groups plus validation errors. In this zero-usage slice, valid eligible plans all have advertised base prices, so the unpriced group is empty. Unknown traffic direction or overage does not invent a tariff or prevent comparing base prices at zero usage. Future traffic policy belongs at this boundary, separately from source facts, not in components.

Blank requirements impose no constraints. Nonnegative whole numbers (including Persian/Arabic digits) update results immediately. Invalid input hides quotes until corrected. Equal prices sort by stable plan ID, with no performance preference implied.

Billing disclosures preserve unknown CPU allocation, tax, mandatory fees and IPv4 inclusion. ManageIT's optional floating IPv4 price is explanatory only. Published monthly prices are not converted to hourly prices. The prototype remains on `prototype/vps-comparison`; this application implements layout A's interaction without merging the prototype.
