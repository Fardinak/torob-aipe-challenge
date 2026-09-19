# VPS comparison — throwaway UI prototype

Three Persian RTL layouts answer: **which immediate offer comparison makes cheapest-plan discovery and minimum-resource filtering easiest?** This is disposable exploration code, not a production application.

## Run

```sh
npm install
npm run prototype
```

Open **http://localhost:5173/prototype/vps?variant=A**.

- **A — Offer list:** globally price-sorted rows with resources, traffic wording and expandable evidence.
- **B — Attribute table:** dense cross-provider comparison aligned by attribute; horizontally scrollable on small screens.
- **C — Provider groups:** separate provider columns, each price-sorted; groups ordered by their cheapest matching offer.

The floating bottom control and left/right keyboard arrows cycle layouts. Arrow keys inside inputs, selects and editable text retain their usual behavior. `?variant=A|B|C` survives reload; filters stay in memory across variant switches and reset on reload. The development-only state panel and console show filters, ordering and matching IDs. The switcher/state panel are omitted from production builds.

## Try these tasks

1. Start without constraints: the first offer in A/B is ManageIT at 710,000 toman/month, the lowest **advertised base price in this 11-plan sample**.
2. Choose the 4 GB RAM preset: 8 offers match; the lowest base is 1,420,000 toman. No CPU or disk requirement is added.
3. Choose 4 GB RAM + 1 TB outbound: zero confirmed matches, with those 8 hardware candidates explicitly unverified for egress. Expand an offer to inspect the source terms.
4. Enter 128 GB RAM: no matching resources; reset returns all 11.
5. Switch layouts with filters active. Compare scanning the rows, reading aligned attributes, and inspecting one provider's upgrade options.

All prices come from `research/vps-comparison-data.json`. “Upload” and “download” remain provider wording: neither is silently interpreted as server egress. There are no complete-bill estimates, checkout/stock claims, performance benchmarks, fake reviews, or external mutations. The optional floating-IP fee is shown as optional. Fonts use Vazirmatn from Google Fonts with a system fallback; application behavior needs no external service.

## Capture and validation

- Branch: `prototype/vps-comparison`. The `main` branch contains research and the approved scope only.
- Context pointer: [locked scope](research/locked-prototype-scope.md). No implementation issue exists in the workspace.
- Verdict: **pending user layout review**; no UI preference is validated yet. Preserve useful decisions, then rewrite the selected design for implementation rather than shipping these variants.
- `npm run build` passes TypeScript checking and Vite compilation.
- The local route returns HTTP 200.
- Browser visual/interaction review is **not completed**: T3Code reported no preview automation host, and the alternate browser inventory was empty. Responsive CSS and interactions are implemented but not browser-verified in this session.
- No test suite was added, following the throwaway prototype skill.

See [comparison gate](research/vps-comparison-gate.md) for pricing evidence and limitations.
