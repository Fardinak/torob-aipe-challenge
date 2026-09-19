# Torob: product features and transferable value

Reviewed 2026-09-19. Primary-source research for the AI Product Engineer challenge. English paraphrases of Persian sources. **Observed** means public page content retrieved through the web reader; it does not mean a browser interaction was exercised. **Official claim** means Torob's documentation or developer-authored app description. **Inference** means our product interpretation, not Torob's assertion.

## Product thesis

**Inference:** Torob's strongest transferable idea is to turn a fragmented market into a decision a buyer can inspect: identify the same thing across sellers, compare meaningful offer differences, evaluate the seller, and proceed to purchase. Its advantage is the combination of comparison and confidence; copying a search box alone would miss most of that value. This interpretation is grounded in its [aggregation process](https://torob.com/pages/about-us/), [seller scoring](https://torob.com/landings/shop-score), and [purchase guidance](https://torob.com/pages/safe-shopping-guide/).

## Verified features and why they matter

### 1. A direct starting point for purchase intent

**Observed:** The home page centers a product-or-store search input, with broad category navigation and a concise promise to compare millions of products across thousands of stores. Links to safe-shopping advice and order follow-up sit alongside general service links. [Homepage](https://torob.com/)

**Inference:** A shopper can start with either the item they need or a seller they already know. Category navigation provides a second route without making the user formulate a perfect query. The page communicates its practical job immediately.

### 2. One product, multiple comparable offers

**Official claim:** Torob's bots retrieve online-store products; a content team reviews categorization and merging. Physical stores can find an existing catalog item and add their price without uploading the product's photos and specifications again. Online sellers pay for non-repeated click sessions and must maintain account credit for continued visibility. These facts establish both catalog consolidation and paid merchant participation; they do not reveal the ranking algorithm. [About Torob](https://torob.com/pages/about-us/)

**Inference:** Product identity is foundational. A useful comparison requires separating the shared product from each merchant's offer, while preserving variant, condition, and contractual differences. Consolidation also lowers the effort for small merchants to become discoverable.

### 3. A product page that exposes purchasing tradeoffs

**Observed:** A Xiaomi MQXJQ01KL lint-remover page exposes merchant-specific titles, prices, locations, seller tenure/status, warranty text where supplied, report actions, and outbound purchase links. It separates online and physical sellers, offers city selection, and displays starting-price summaries for guarantee-backed sellers, TorobPay, installments, and nationwide offers. It also contains specifications, similar products, and a price-change section; the chart itself was not loaded by the reader. Advertising is explicitly labeled and appears above cheaper offers in this snapshot. [Inspected product page](https://torob.com/p/3e0abd31-ac05-45f3-8363-b06c3b0c39e5/)

**Inference:** The experience answers “what changes if I want a safer seller, local pickup, or different payment terms?” Conditional price summaries make those tradeoffs tangible. The inspection does not establish that every offer is sorted by price or that placement is commercially neutral.

### 4. Trust signals connected to operational evidence

**Official claim:** Seller scores reflect order-follow-up cases over the preceding three months, their outcomes, and their ratio to approximate order volume. Score details expose approximate orders and follow-up counts; merchant profiles include case outcomes. New stores normally lack a calculated score during their first three to four weeks. [Scoring explanation](https://torob.com/landings/shop-score)

**Observed:** A newly listed merchant profile displays license status, Torob cooperation history, an explicit insufficient-data explanation, payment/shipping/return-policy sections, and contact information. Missing merchant policies are labeled as unprovided. [Inspected merchant profile](https://torob.com/shop/490890/)

**Inference:** These signals help a shopper judge a cheap unfamiliar seller. “Insufficient evidence” and explicit missing information are useful states. A prototype should imitate that honesty rather than invent a reassuring score.

### 5. A guarantee for selected sellers

**Official claim:** The guarantee applies only to qualifying purchases from merchants with the badge, through accepted payment routes, within specified reporting windows and subject to review and exclusions. It covers certain non-delivery, mismatch, and defect cases. The page has differing monetary limits in different sections, so this research does not assert one universal cap or simplify it into an unconditional refund promise. [Guarantee conditions](https://torob.com/landings/guarantee)

**Inference:** This converts a trust badge into a concrete remedy. A prototype can expose verified policies, but should not suggest it offers financial guarantees that do not exist.

### 6. Online and local shopping in the same discovery system

**Official claim:** Torob's install page advertises nearby goods/services discovery and text, image, and voice search. It also promotes installment purchasing and gold-related services. These are marketed capabilities, not workflows exercised here. [Official installation page](https://torob.com/install/)

**Observed:** The sampled merchant catalog exposes price range, search within results, physical-purchase availability, new/used condition, discounts, and in-stock controls. This verifies those controls in that catalog context, not universally across every category. [Merchant catalog](https://torob.com/shop/490890/کالینو-ترند/محصولات/)

**Inference:** User constraints extend beyond price: geography, availability, condition, and payment method can determine whether an offer is usable.

### 7. Support for decisions across time

**Official claim:** Torob's developer description on its officially linked Cafe Bazaar listing advertises price-history charts, a price-change alert bell, and the shopping assistant “Ask Torob.” It says users buy from merchants rather than Torob itself. This evidence comes from the developer introduction, not user reviews or the store's additional editorial FAQ. [Torob's app description](https://cafebazaar.ir/app/ir.torob)

**Observed:** Public website navigation includes favorite products, favorite stores, recent views, price changes, and reports. [Public site navigation](https://torob.com/shop-list/)

**Inference:** Research, waiting, and returning are part of shopping. Persistence can preserve comparison work and help users decide when to act. Alert delivery, account requirements, and assistant quality remain untested.

### 8. Explicit purchase boundaries and correction paths

**Official claim:** Torob describes itself as a shopping search engine. Its guide warns that superficially similar but different items can occasionally be merged, and that buyers should confirm final specifications, price, stock, and shipping with the merchant. Users can report incorrect matches or price/stock. Order-follow-up cases also inform seller evaluation. [Safe-shopping guide](https://torob.com/pages/safe-shopping-guide/)

**Inference:** Aggregation does not eliminate uncertainty. Maintaining source identity, showing gaps, and enabling correction are part of the product. Merchant handoff also makes it possible to provide useful discovery without operating fulfillment.

## What to carry into the challenge prototype

These are recommendations derived from the evidence, not additional challenge requirements:

1. **Choose a precise comparison unit.** Establish what counts as the same product/service, and which differences must remain visible.
2. **Make offers comparable.** Expose material cost and eligibility differences rather than merely displaying extracted headline prices.
3. **Keep evidence close.** Preserve source URLs, retrieval dates, and unknown fields; explain recommendations using those fields.
4. **Use trust signals appropriate to the market.** Verified terms or observed reliability can be useful; fabricated ratings cannot.
5. **Complete a decision journey.** Search, narrow, inspect, compare, and reach the provider with context intact.
6. **Add retention after the core works.** Saved comparisons or alerts have value once the underlying offers are reliable.

The product hypothesis to test is whether users make a confident decision faster with consolidated, explained offers than with separate provider pages. This research establishes feature existence and design opportunities, not measured user preference or competitive uniqueness.

## Follow-up browser evidence

A later [T3Code browser walkthrough](torob-browser-walkthrough.md) exercised category navigation, a storage filter, product detail, a seller-guarantee filter, and a separate search. It also rendered the price-history graph. See that document for observations and the subsequent browser-host disconnection. The limitations below describe this original research pass.

## Access limits

Public home, help, merchant, catalog, product, installation, and developer-description content was readable. A direct search-page request failed; other dynamic sections returned empty content or loading indicators. No interactive browser, signed-in flow, purchase, alert, assistant conversation, image/voice query, ranking experiment, or mobile app was exercised. Consequently, visual hierarchy, latency, relevance quality, coverage quality, and actual notification behavior remain unverified. Marketing scale claims were not independently audited. No claims from secondary explainers or app-user reviews were used.
