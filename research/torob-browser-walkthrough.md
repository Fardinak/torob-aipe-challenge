# Torob browser walkthrough

Observed 2026-09-19 using T3Code's internal browser at 1280 × 800. This supplements the earlier [public-page research](torob-product-research.md) with actual navigation, rendered screenshots, and filter interactions. Prices and counts below describe the observed session, not lasting market facts.

## Category journey

From the homepage, opened **موبایل و کالای دیجیتال → گوشی موبایل** through the navigation menu. The menu exposes a large hierarchy, including individual phone brands and related products. [Homepage](https://torob.com/), [phone category](https://torob.com/browse/94/گوشی-موبایل-mobile/).

The desktop category page uses a product grid beside a right-hand filter sidebar. The sidebar and results have separate scrolling regions. Cards show an image, variant-specific title, starting price, and seller count; favorites and price-alert icons are also visible. Ads have a visible label. The header retains search and navigation.

Observed filters include price bounds, searchable brands, storage, RAM, screen size, battery, cellular network, SIM count, ROM country, registration, and activation status. Other controls cover installments, physical purchase, new/used condition, in-stock results, and sorting. The sort menu itself was not successfully opened.

**Interaction verified:** selected **256 GB** storage. The checkbox selected immediately; after asynchronous loading, an active-filter chip appeared, the URL gained `storage=256%20gb`, and the displayed results changed to 256 GB variants. The immediate snapshot still showed the previous results, so this was verified again after loading. This is a useful reminder to distinguish a selected control from a completed result update. [Filtered category](https://torob.com/browse/94/گوشی-موبایل-mobile/?storage=256%20gb).

## Product detail reached from the category

Opened the **Samsung S26 Ultra 256 GB / 12 GB** card. The page combines product-level identity with seller-level terms. This inspection concerns the site's UX, not independent verification of its phone specifications. [Observed product](https://torob.com/p/9bcf3364-2387-42ab-b712-bfc6c429ab07/).

- The top section has images, Persian and English product names, and variant choices with their own starting prices or explicit unavailable states.
- A prominent purchase button named a guarantee-backed seller at 316,800,000 toman while the lowest nationwide online price shown was 315,900,000 toman. The feature therefore should not be described as always selecting the absolute cheapest seller; the selection algorithm was not inspected.
- Seller filters display conditional starting prices before selection: guarantee-backed, installment purchase, and all-Iran offers. City selection is adjacent.
- Seller rows show merchant name, city, score and tenure, original offer title, warranty/terms, price, purchase action, and reporting. Some rows surface shipping or installment information. A labeled advertisement appeared above a cheaper offer.
- Online and physical seller sections have separate counts and expansion controls. Physical sellers expose address snippets and contact actions.
- Specifications sit beside the seller area on desktop. Further down, the rendered price-history graph has minimum-price and average-price series. No history tooltip or time-range interaction was tested.
- A product-context TorobChat input is visible; no conversation was submitted.

**Interaction verified:** selected **دارای ضمانت ترب**. After loading, the seller list changed to guarantee-backed offers, starting with the 316,800,000-toman seller, and the expansion control read 51 stores. Before filtering, the online expansion control read 192 stores. Product-level seller counts and offer counts differed; do not treat them as interchangeable without understanding their definitions.

## Separate search journey

Opened a fresh homepage tab, typed **هدفون سونی** (“Sony headphones”), and pressed Enter. This led to a search URL, independently of the phone-category journey. [Search](https://torob.com/search/?query=هدفون%20سونی&_search_landing=home).

The results reuse the grid/sidebar structure but expose headphone-relevant filters: usage (general, gaming, sport, studio), wired/wireless, Bluetooth version, price, and brands. Suggested categories include headphones/headsets, speakers, and headphone cases. The visible brand list was broad rather than restricted to Sony; typing a brand did not visibly select a brand facet.

Results included a labeled advertisement for an accessory case alongside actual headphones. Some similarly named headphone models appeared in separate cards with large price differences and an **اصل** (“original”) marker on selected cards. This is evidence that distinctions remain visible in the UI, not proof of any seller's authenticity or a diagnosis of the grouping algorithm.

**Partially verified interaction:** entered `10000000` as the maximum price and clicked Apply. The browser reported navigation to a URL containing `price__lt=10000000`. The browser host then became unavailable, so the refreshed results were not inspected. No claim is made that every resulting card satisfied this bound. A separate product click from search was not completed; the full product-detail inspection above came from the category journey.

## Implications for our VPS prototype

These are proposed adaptations, not Torob features:

1. **Use one results experience for browsing and search.** A default plan list and editable filters should work immediately. Natural-language search can populate the same filters later.
2. **Expose the comparison unit.** Show provider and plan identity plus CPU allocation, RAM, disk, location, and included traffic. Group by comparable requirements without pretending plans from different providers are identical hardware.
3. **Separate factual constraints from usage assumptions.** RAM/location filters select offers; hours/traffic/IP requirements recalculate estimates. Keep both visible so a user can explain why results changed.
4. **Show scenario price and base price together.** The equivalent of Torob's conditional price summaries is a clear estimate under the current usage assumptions, with known extras and unknown fees available to inspect.
5. **Use compact offer summaries and deeper details.** A comparison-friendly table or compact cards suit server plans better than large product photos. Open a detail panel for billing rules, source links, freshness, and provider handoff.
6. **Make the choice reversible and reproducible.** Active filter chips and URL state are small, useful additions. URL persistence is a stretch item under the weekend budget; selected filters must at least remain visible in the UI.
7. **State why a result is first.** Rank complete eligible estimates by computed cost. Label incomplete estimates separately; never convert missing charges to zero or invent provider trust scores.

## Evidence and limits

Saved browser screenshots:

- [Product overview](/home/fardin/.t3/userdata/browser-artifacts/browser-screenshot-torob-com-mu7qbo3v-77a497a4.png)
- [Search results](/home/fardin/.t3/userdata/browser-artifacts/browser-screenshot-torob-com-mu7qch6a-6fae5fa9.png)
- [Rendered history graph and related products](/home/fardin/.t3/userdata/browser-artifacts/browser-screenshot-torob-com-mu7qbxm4-a27f7a18.png)

The internal browser initially worked; later status/open/snapshot calls returned no available automation host. No login, purchase, merchant outbound click, notification signup, precise-location permission, report submission, or assistant message was performed. No mobile viewport was tested. The earlier research's “no interactive browser” limitation applies to that earlier pass; the interactions documented here supersede it for these specific journeys only.
