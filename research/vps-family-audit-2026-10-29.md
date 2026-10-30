# Iranian VPS linked-family audit — 2026-10-29

Reviewed the finite `/tmp/family-audit.json` queue and relevant linked first-party Iran families, without new broad discovery. Catalog baseline: **540 rows**, SHA-256 `0146b238c5b1955cdf0ad88f373133134c71b755a707a8d4813a60140c61efc9`. No catalog, code, tracker, or existing documentation was edited.

**225 canonical reviewed configuration records**: **103** `new-reviewable`, **11** `gap-incomplete-resources`, **11** `gap-alias-or-distinct-datacenter`, **1** `gap-conflicting-resources`, **46** `existing-catalog-identity`, **47** `excluded-explicitly-unavailable`, **1** `gap-no-resource-identity`, **5** `gap-iran-location-unconfirmed`. These are review records, not an admission count. Alias pages and responsive copies do not multiply rows.

## Evidence and admission rules

The [normalized offers](evidence/vps-family-audit-2026-10-29/normalized-offers.json) are the root admission handoff. Each row includes existing provider key, plan name, source URL/snapshot/capture/hash, resources, nullable media, public price/native tariff, billing wording, traffic, fees/IP/uncertainties, disposition and exact duplicate IDs. `catalog_resource_match_candidates` are **not** duplicate proof. Only `catalog_duplicate_ids` is the exact identity mapping.

Every successful page has raw `.html`, original Persian `.txt`, extracted hrefs and metadata. The [source index](evidence/vps-family-audit-2026-10-29/source-index.json) retains failures and exclusions too. The [family link closure](evidence/vps-family-audit-2026-10-29/family-link-closure.json) records linked-family decisions; all raw links remain in per-page files. Original wording is retained in full snapshots rather than paraphrased into invented units. Normalized rows are retained as the admission handoff.

Manual source review checked the actual CPU/RAM/disk labels, including tables with disk before RAM and reversed label/value order. MB is divided by1000, TB multiplied by1000; published GB is preserved without GiB inference. GHz, CPU model and thread count never become core count. SAS/SATA alone leave media null. Disk numbers lacking GB/TB leave capacity null. Configurators contribute only publicly displayed priced presets; their rate grids are not expanded into invented SKUs.

Monthly toman is a published reference/base price, not a completed checkout total. Annual option amounts remain explicit on the same identity; no USD/toman conversion or arbitrary hourly×730 conversion was performed. Native hourly/day quotes remain visible with null monthly reference. Source51 has unidentified currency and resources, so10/month is an unranked identity gap, not assumed USD/toman.

No accounts, contact, payment, reservation, purchase or cart mutation occurred. `a=add` hrefs were inspected only as retained identity evidence, never requested. Only safe product-listing GETs were fetched.

## Material findings and limits

- Liara: six VPS offers, separate IPv4 charge200000/month (277/hour), download2500/GB and free upload. Monthly references coexist with hourly payment.
- Tadserver: Respina/Shatel featured links overlap, but Shatel64GB disk differs. Treat Shatel identities as unresolved, not another11 admitted rows. NVMe16GB heading/body12GB conflict remains unresolved; full list CPU values take precedence only with explicit featured-card conflict flags.
- Negarnovin: Iran/cheap-Iran/Respina/game/class/infrastructure `irkvm/p1…p8` are exact current identities. Asiatech `milad/p1…p8` are distinct SKUs despite equal arrays.
- Mihanwebhost: managed VPS is a separate service variant; auction rows use published GB, not MB. The managed table unusual3096MB is retained as3.096GB.
- ServerVDS: explicit allocated slash-core counts retained. Description/display prices conflict on products538/614/616. SAS/SATA media and unitless disk labels stay unknown. Zero-stock product538 remains excluded.
- Webdade: G9/G11 tables show100GB while prose says traffic packages removed and PAYG inbound at1000/GB; no free allowance assumed. G11 SAS media stays unknown. Bourse CPU/RAM are published “from” values. MikroTik disk remains missing. Store category pages returned no products; this does not withdraw marketing-page offers.
- IRVM: only Respina ready family available, other16 configurations explicitly unavailable. Public custom default is1core/1GB/10GB HDD/100GB/1IPv4 at636000/month, explicitly estimated.
- VidaServer: exact supplied product URL returned404 twice; error body/header evidence retained. No guessed replacement or withdrawal claim.

Queue stopping rule: relevant newly linked families were followed until they resolved to retained/admitted pages, explicit foreign/non-VPS exclusions, exact aliases, empty categories, or the documented access/location/product identity gaps. No search engine discovery was added. The task cannot establish exhaustive coverage of providers’ unlinked/private products or live checkout availability.

## Source-by-source coverage

| Source | First-party page / retained evidence | Review outcome |
|---|---|---|
| [01-liara](https://liara.ir/products/iranian-vps/) · [snapshot](evidence/vps-family-audit-2026-10-29/01-liara.html) | خرید سرور مجازی ایران  /  VPS ایرانی ترافیک نامحدود - لیارا | Six VPS sizes; Windows/trade/game/Linux/cloud pages repeat same six tariff rows, not 36 extra SKUs. Separate IPv4 200000/month; download 2500/GB; upload free. |
| [02-iranica](https://iranicaserver.com/mikrotik-server/) · [snapshot](evidence/vps-family-audit-2026-10-29/02-iranica.html) | خرید سرور مجازی میکروتیک ایران خرید VPS میکروتیک MikroTik – ایرانیکاسرور | Three MikroTik sizes, disk missing. Card/table prices agree but summary/FAQ conflict; retain gaps. |
| [03-tadserver](https://tadserver.com/respina-vps/) · [snapshot](evidence/vps-family-audit-2026-10-29/03-tadserver.html) | سرور مجازی رسپینا - تاد سرور | 11 Respina sizes; separate order slugs from generic Iran catalog. Explicit identity caution, not tuple-only duplicate. |
| [04-tadserver](https://tadserver.com/shatel-vps/) · [snapshot](evidence/vps-family-audit-2026-10-29/04-tadserver.html) | سرور مجازی شاتل - تاد سرور | 11 Shatel sizes; featured order links point at Respina. 64GB disk differs (200 vs 150GB). Alias/distinct-family identity gap, no automatic extra count. |
| [05-inet](https://inetisp.ir/pricing-vps.php) · [snapshot](evidence/vps-family-audit-2026-10-29/05-inet.html) | تعرفه سرور مجازی  /  آی نت | Redirect .php to existing pricing-vps; exact six duplicates. |
| [06-irvm](https://irvm.org/virtual-server-iran/) · [snapshot](evidence/vps-family-audit-2026-10-29/06-irvm.html) | سرور مجازی ایران  /  ایران وی ام | Country page returns all 20 ready plans (four each for Respina/Afranet/Asiatech/Shatel/Fanap). Only Respina available; generic/status art is not availability evidence. |
| [07-irvm](https://irvm.org/virtual-server-raspina/) · [snapshot](evidence/vps-family-audit-2026-10-29/07-irvm.html) | سرور مجازی رسپینا  /  ایران وی ام | Four Respina ready plans map to existing IDs. One explicit priced custom preset additionally reviewed. Ready-card media absent, custom preset HDD, earlier catalog NVMe from separate evidence. |
| [08-irvm](https://irvm.org/virtual-server-afranet/) · [snapshot](evidence/vps-family-audit-2026-10-29/08-irvm.html) | سرور مجازی افرانت  /  ایران وی ام | Four priced Afranet plans reviewed via family + country page; explicitly unavailable. |
| [09-irvm](https://irvm.org/virtual-server-asiatech/) · [snapshot](evidence/vps-family-audit-2026-10-29/09-irvm.html) | سرور مجازی آسیاتک  /  ایران وی ام | Four priced Asiatech plans reviewed via family + country page; explicitly unavailable. |
| [10-irvm](https://irvm.org/سرور-مجازی-شاتل/) · access-error | سرور مجازی شاتل | Initial Unicode request construction failure; safely encoded retry 45-irvm succeeded. This is not a provider access gap. |
| [11-mihanwebhost](https://mihanwebhost.com/my/managed-vps) · [snapshot](evidence/vps-family-audit-2026-10-29/11-mihanwebhost.html) | خرید سرور مجازی مدیریت شده ایران  /  میهن وب هاست | Eight managed VPS plans: first three full capacity, five available. Decimal MB normalization preserves unusual 3096MB. Distinct service from existing unmanaged VPS. |
| [12-logicserver](https://logicserver.org/vps-management/) · [snapshot](evidence/vps-family-audit-2026-10-29/12-logicserver.html) | مدیریت سرور مجازی ایران (VPS مدیریت شده)  /  مانیتورینگ 24/7، امنیت، کنترل‌پنل | Four managed VPS configurations. SSD on plan cards/table; hero NVMe not substituted. Dedicated IPv4; automatic backup setup vs extra paid backup frequency kept separate. |
| [13-spadserver](https://crm.spadserver.com/cart.php?gid=3) · [snapshot](evidence/vps-family-audit-2026-10-29/13-spadserver.html) | کارت خرید - اسپاد سرور | Nine exact existing VPS duplicates. Last card has reversed label/value order; manually checked 24GB RAM, 12 cores, 200GB SSD. |
| [14-spadserver](https://crm.spadserver.com/store/iran-semi-dedicate) · [snapshot](evidence/vps-family-audit-2026-10-29/14-spadserver.html) | کارت خرید - اسپاد سرور | Eight distinct advanced VPS configurations; gid=4 alias retrieved at 36. |
| [15-azardata](javascript:void(0);) · excluded-out-of-scope | سرور مجازی (VPS) ایران آسیاتک به دلیل استفاده از سخت افزار های حرفه ای و پینگ بسیار عالی (به داخل و  | javascript href excluded; no navigation attempted. |
| [16-azardata](https://azardata.net/vps/nvme/germany/) · excluded-out-of-scope | سرور مجازی SSD NVMe آلمان سرور پرسرعت NVMe آلمان و ایران دارای ارتباط زیرساختی بسیار مناسب با ایران  | Germany VPS excluded before retrieval. |
| [17-azardata](https://azardata.net/vps/gitlab/) · access-error | سرور گیت لب شخصی - GitLab سرور گیت لب Gitlab : گیت (Git) یک نرم‌افزار کنترل نسخه است که به تیم ها بر | Initial transport error; retry 46 succeeded; followed Iran GitLab child 63. |
| [18-afagh](https://afagh.info/germany-vps/) · excluded-out-of-scope | WORLD برای ارتباط فراتر از مرزها وقتی کاربران یا سرویس‌های وابسته در خارج از ایران قرار دارند، موقعی | Germany/Finland foreign family excluded before retrieval. |
| [19-servervds](https://clients.servervds.com/index.php?rp=/store/o3o-uo-uoosso2uoe-u-uoeu-o3o-uo-ossuoeo-ossu) · [snapshot](evidence/vps-family-audit-2026-10-29/19-servervds.html) | کارت خرید - سرور وی‌دی‌اس | Seven game configurations; all disk numbers omit units. One zero-stock and conflicting price 230000 vs 330000. Raw allocation counts use explicit /N Core, not CPU model/frequency. |
| [20-servervds](https://clients.servervds.com/index.php?rp=/store/o3o-uo-uoosso2uoe-nvme-ossuoeo-ossu-402) · [snapshot](evidence/vps-family-audit-2026-10-29/20-servervds.html) | کارت خرید - سرور وی‌دی‌اس | Six NVMe402 configurations, download fair use / unlimited upload. Display/description price conflicts on product614 (820000 vs 600000), product616 (1160000 vs 950000). |
| [21-servervds](https://clients.servervds.com/index.php?rp=/store/o3o-uo-uoosso2uoe-ossuoeo-ossu-ssd402) · [snapshot](evidence/vps-family-audit-2026-10-29/21-servervds.html) | کارت خرید - سرور وی‌دی‌اس | Six SSD402 configurations; product624 disk 65 SSD lacks capacity unit, remains null. |
| [22-servervds](https://clients.servervds.com/index.php?rp=/store/o3o-uo-uoosso2uoe-ossuoeo-ossu-raid10-ossuoeuoao-u34o-ossuoeo2402) · [snapshot](evidence/vps-family-audit-2026-10-29/22-servervds.html) | کارت خرید - سرور وی‌دی‌اس | Six RAID10 SAS configurations; SAS interface does not prove HDD/SSD. |
| [23-servervds](https://clients.servervds.com/index.php?rp=/store/o3o-uo-uoosso2uoe-ossuoeo-ossu-uosso-o-ossoroaouossouuoe-402) · [snapshot](evidence/vps-family-audit-2026-10-29/23-servervds.html) | کارت خرید - سرور وی‌دی‌اس | Four ST semi-dedicated virtual configurations; SATA interface does not prove media; explicit TB normalized decimal. |
| [24-dyar](https://client.dyarhost.com/store/iran-pishgaman-eco-vps) · [snapshot](evidence/vps-family-audit-2026-10-29/24-dyar.html) | کارت خرید - دیارهاست | All five Eco Pishgaman configurations reviewed; all explicitly unavailable. Download+upload traffic basis retained. |
| [25-milad](https://www.miladserver.ir/cart.php?gid=1) · [snapshot](evidence/vps-family-audit-2026-10-29/25-milad.html) | خرید پلن اقتصادی سرور مجازی ایران  /  لیست پلن‌ها و قیمت — میلاد سرور | Three economic SKUs; one zero-stock. Landing 33 resolves storage media and explicit toman against RIAL footer. |
| [26-serversetup](https://wiki.serversetup.co/%d8%af%d9%84%d8%a7%db%8c%d9%84-%d8%a7%d8%b3%d8%aa%d9%81%d8%a7%d8%af%d9%87-%d8%b3%d8%b1%d9%88%d8%b1-%d9%85%d8%ac%d8%a7%d8%b2%db%8c-%d8%a7%db%8c%d8%b1%d8%a7%d9%86/) · excluded-out-of-scope | دلایل استفاده از سرور مجازی ایران | Wiki/article link excluded before retrieval. |
| [27-negarnovin](https://negarnovin.com/%d8%b3%d8%b1%d9%88%d8%b1-%d9%85%d8%ac%d8%a7%d8%b2%db%8c-%d8%a7%db%8c%d8%b1%d8%a7%d9%86-%d8%a7%d8%b1%d8%b2%d8%a7%d9%86/) · [snapshot](evidence/vps-family-audit-2026-10-29/27-negarnovin.html) | سرور مجازی ایران ارزان  /  پورت ۱۰ گیگ  /  تحویل فوری  /  هارد SSD | Cheap-Iran alias: same irkvm/p1–p8 as current catalog and sources 28/29. |
| [28-negarnovin](https://negarnovin.com/%d8%b3%d8%b1%d9%88%d8%b1-%d9%85%d8%ac%d8%a7%d8%b2%db%8c-%d8%a7%db%8c%d8%b1%d8%a7%d9%86/) · [snapshot](evidence/vps-family-audit-2026-10-29/28-negarnovin.html) | سرور مجازی ایران  /  خرید VPS ایران NVMe پورت 10G — نگارنوین | Eight exact irkvm duplicates with annual option amounts retained. No new annual SKU invented. |
| [29-negarnovin](https://negarnovin.com/%d8%b3%d8%b1%d9%88%d8%b1-%d9%85%d8%ac%d8%a7%d8%b2%db%8c-%d8%b1%d8%b3%d9%be%db%8c%d9%86%d8%a7/) · [snapshot](evidence/vps-family-audit-2026-10-29/29-negarnovin.html) | خرید سرور مجازی رسپینا  /  VPS ایران NVMe پورت ۱۰گیگ — نگارنوین | Respina alias of exact irkvm/p1–p8 products, not another family count. |
| [30-negarnovin](https://negarnovin.com/%d8%b3%d8%b1%d9%88%d8%b1-%d9%85%d8%ac%d8%a7%d8%b2%db%8c-%d8%a2%d8%b3%db%8c%d8%a7%d8%aa%da%a9/) · [snapshot](evidence/vps-family-audit-2026-10-29/30-negarnovin.html) | سرور مجازی آسیاتک 10G Asiatech Server | Eight distinct Asiatech milad/p1–p8 SKUs, same resource/price array as irkvm but different product identities. |
| [31-vidaserver](https://vidaserver.ir/vps-iran) · access-error | سرور مجازی ایران (برج میلاد) | HTTP404. Retry47 also404; error body+headers retained in 89-vidaserver-error files. No withdrawal inferred and no guessed replacement URL. |
| [32-sonhost](https://7ho.st/vps-hosting) · [snapshot](evidence/vps-family-audit-2026-10-29/32-sonhost.html) | خرید سرور مجازی (VPS)  /  مقایسه پلن‌ها و قیمت - سون هاست | Market Iran section five exact catalog duplicates; other market products explicitly foreign. |
| [33-milad](https://www.miladserver.ir/vps/iran/) · [snapshot](evidence/vps-family-audit-2026-10-29/33-milad.html) | خرید سرور مجازی ایران ارزان  /  VPS ایران با تحویل آنی — میلاد سرور | Nine total Iran SKUs; seven catalog duplicates and two explicit unavailable. Full landing wording says final toman and IPv4 included. |
| [34-webdade](https://webdade.com/iran-vps-server) · [snapshot](evidence/vps-family-audit-2026-10-29/34-webdade.html) | سرور مجازی ایران [ متصل به اینترنت بین الملل - دارای تست ] | Eight new fixed Iran configurations: four G9 NVMe/four G11 SAS-null-media. 100GB table conflicts with PAYG package-removal prose. 10/50Gbps responsive copy conflict retained. |
| [35-mtserver](https://my.mtserver.ir/index.php?rp=/store/mobinone) · [snapshot](evidence/vps-family-audit-2026-10-29/35-mtserver.html) | کارت خرید - ام تی سرور | Requested mobinone URL redirects to Fanava. Actual product212–215 are exact existing Fanava IDs, not MobinOne duplicates/new products. |
| [36-spadserver](https://crm.spadserver.com/cart.php?gid=4) · [snapshot](evidence/vps-family-audit-2026-10-29/36-spadserver.html) | کارت خرید - اسپاد سرور | gid=4 redirects to source14 advanced family; alias only. |
| [37-spadserver](https://crm.spadserver.com/cart.php?gid=25) · [snapshot](evidence/vps-family-audit-2026-10-29/37-spadserver.html) | کارت خرید - اسپاد سرور | Three priced GitLab VPS resource configurations, traffic unspecified; retained as compute software variant. |
| [38-spadserver](https://crm.spadserver.com/store/gyt-gitlab-iran-yrn) · [snapshot](evidence/vps-family-audit-2026-10-29/38-spadserver.html) | کارت خرید - اسپاد سرور | Same GitLab category as37; alias only. |
| [39-tadserver](https://tadserver.com/iran-vps-nvme/) · [snapshot](evidence/vps-family-audit-2026-10-29/39-tadserver.html) | سرور مجازی NVMe - تاد سرور | All seven full-list NVMe rows reviewed. 16GB heading vs12GB body, featured4/8GB CPU/disk conflicts, conditional 1:10 unlimited wording flagged. |
| [40-irvm](https://irvm.org/virtual-server-fanap/) · [snapshot](evidence/vps-family-audit-2026-10-29/40-irvm.html) | خرید سرور مجازی فناپ  /  ایران وی ام | Fanap family unavailable; four sizes retained via source06. |
| [41-milad](https://www.miladserver.ir/cart.php?gid=3) · [snapshot](evidence/vps-family-audit-2026-10-29/41-milad.html) | خرید پلن حرفه ای سرور مجازی ایران  /  لیست پلن‌ها و قیمت — میلاد سرور | Professional category alias matches source33 professional three SKUs. |
| [42-mtserver](https://my.mtserver.ir/index.php?rp=/store/respina) · [snapshot](evidence/vps-family-audit-2026-10-29/42-mtserver.html) | کارت خرید - ام تی سرور | Four Respina sizes; three unavailable, fourth exact current catalog duplicate. |
| [43-mtserver](https://my.mtserver.ir/index.php?rp=/store/vps-iran-asia-10gb) · [snapshot](evidence/vps-family-audit-2026-10-29/43-mtserver.html) | کارت خرید - ام تی سرور | Four Asiatech sizes, all unavailable; 300/500GB traffic retained. |
| [44-mtserver](https://my.mtserver.ir/index.php?rp=/store/vps-game) · [snapshot](evidence/vps-family-audit-2026-10-29/44-mtserver.html) | کارت خرید - ام تی سرور | Seven game sizes all unavailable; one unlimited and six300GB traffic, not sampled. |
| [45-irvm](https://irvm.org/سرور-مجازی-شاتل/) · [snapshot](evidence/vps-family-audit-2026-10-29/45-irvm.html) | سرور مجازی شاتل  /  ایران وی ام | Successfully encoded Shatel family; unavailable four ready plans retained via source06. |
| [46-azardata](https://azardata.net/vps/gitlab/) · [snapshot](evidence/vps-family-audit-2026-10-29/46-azardata.html) | سرور گیت لب GitLab  /  خرید سرور گیت لب شخصی ایران و آلمان - آذردیتا | GitLab location selector only, from price lacks resources; followed Iran63. Germany child excluded. |
| [47-vidaserver](https://vidaserver.ir/vps-iran) · access-error | سرور مجازی ایران (برج میلاد) | Second404 access gap; see31/89. |
| [48-liara](https://liara.ir/products/windows-vps/) · [snapshot](evidence/vps-family-audit-2026-10-29/48-liara.html) | خرید سرور مجازی (VPS) ویندوز  /  وی پی اس ویندوز - لیارا | Same six VPS tariff rows as01; Windows marketing alias. |
| [49-liara](https://liara.ir/products/trade-vps/) · [snapshot](evidence/vps-family-audit-2026-10-29/49-liara.html) | خرید سرور ترید  /  VPS ترید ساعتی با آی‌پی ثابت و پینگ پایین - لیارا | Same six VPS tariff rows as01; trade marketing alias, all tariff locations Iran. |
| [50-liara](https://liara.ir/products/gaming-vps/) · [snapshot](evidence/vps-family-audit-2026-10-29/50-liara.html) | خرید سرور مجازی گیم  /  VPS گیمینگ ایرانی پر قدرت - لیارا | Same six VPS tariff rows as01; game marketing alias. |
| [51-servervds](https://clients.servervds.com/index.php?rp=/store/vmware-auto-vps) · [snapshot](evidence/vps-family-audit-2026-10-29/51-servervds.html) | کارت خرید - سرور وی‌دی‌اس | VPS enterprise product445 has 10/month with currency and all resources unidentified. Visible unranked gap; no invented conversion. |
| [52-servervds](https://clients.servervds.com/index.php?rp=/store/srwr-mjzy-trfykh-nmhdwd-hjmy) · [snapshot](evidence/vps-family-audit-2026-10-29/52-servervds.html) | کارت خرید - سرور وی‌دی‌اس | Unlimited-volume category returned no product cards. |
| [53-servervds](https://clients.servervds.com/index.php?rp=/store/srwr-mjzy-trfykh-nmhdwd-phny-bnd) · [snapshot](evidence/vps-family-audit-2026-10-29/53-servervds.html) | کارت خرید - سرور وی‌دی‌اس | Unlimited-bandwidth category returned no product cards. |
| [54-milad](https://www.miladserver.ir/store/stwrj) · [snapshot](evidence/vps-family-audit-2026-10-29/54-milad.html) | خرید استورج  /  لیست پلن‌ها و قیمت — میلاد سرور | Iran storage category explicitly no visible products. |
| [55-milad](https://www.miladserver.ir/store/stwrj-rwp) · [snapshot](evidence/vps-family-audit-2026-10-29/55-milad.html) | خرید استورج اروپا  /  لیست پلن‌ها و قیمت — میلاد سرور | European storage category foreign, no visible products; incidental prefix-match fetch, excluded. |
| [56-webdade](https://webdade.com/bourse-vps) · [snapshot](evidence/vps-family-audit-2026-10-29/56-webdade.html) | سرور مجازی بورس  /  خرید سرور بورس  /  خرید سرور مجازی بورس  /  سرور بورس  /  وب داده | Four Tehran Windows Bourse base configurations, CPU/RAM published as from; distinct port speeds preserve separate Bourse3/4. |
| [57-webdade](https://webdade.com/mikrotik-vps) · [snapshot](evidence/vps-family-audit-2026-10-29/57-webdade.html) | سرور مجازی میکروتیک  /  وب داده | One Iran MikroTik from quote, disk missing; foreign three locations excluded. IPv4+IPv6 free, L6 license. |
| [58-azardata](https://azardata.net/vps/) · [snapshot](evidence/vps-family-audit-2026-10-29/58-azardata.html) | خرید سرور مجازی  /  سرور مجازی ایران، آلمان و هلند، لینوکس و ویندوز - آذردیتا | VPS overview/location selectors; child Iran families followed, generic from figures not extra configurations. |
| [59-azardata](https://azardata.net/vps/semi-dedicated/) · [snapshot](evidence/vps-family-audit-2026-10-29/59-azardata.html) | سرور نیمه اختصاصی آلمان  /  خرید سرور نیمه اختصاصی آلمان - آذردیتا | Six semi-dedicated configurations explicitly Germany; all excluded by location. |
| [60-azardata](https://azardata.net/vps/storage/) · [snapshot](evidence/vps-family-audit-2026-10-29/60-azardata.html) | سرور مجازی حجیم  /  خرید سرور مجازی پر حجم ایران و آلمان - آذردیتا | Storage selector; followed Iran66, excluded Germany child. |
| [61-azardata](https://azardata.net/vps/telegram/) · [snapshot](evidence/vps-family-audit-2026-10-29/61-azardata.html) | سرور ربات تلگرام NVMe  /  سرور مخصوص ربات تلگرام هلند و آلمان - آذردیتا | Telegram selector explicitly Germany/Netherlands; foreign excluded. |
| [62-azardata](https://azardata.net/vps/managed/) · [snapshot](evidence/vps-family-audit-2026-10-29/62-azardata.html) | سرور مجازی مدیریت شده  /  خرید سرور مجازی مدیریت شده ایران و آلمان - آذردیتا | Managed selector; followed Iran67, excluded Germany child. |
| [63-azardata](https://azardata.net/vps/gitlab/iran/) · [snapshot](evidence/vps-family-audit-2026-10-29/63-azardata.html) | سرور گیت لب GitLab ایران  /  خرید سرور گیت لب شخصی ایران - آذردیتا | All four Iran GitLab fixed VPS configurations. |
| [64-azardata](https://azardata.net/vps/nvme/) · [snapshot](evidence/vps-family-audit-2026-10-29/64-azardata.html) | سرور مجازی NVMe  /  خرید سرور مجازی NVMe ایران، آلمان و هلند - آذردیتا | NVMe selector, existing Iran source already admitted; no new identity. |
| [65-webdade](https://my.webdade.com/store/bourse) · [snapshot](evidence/vps-family-audit-2026-10-29/65-webdade.html) | خرید و راه اندازی سرویس جدید - وب داده | Store category says no products found. It cannot resolve additional product resources; its Bourse marketing page56 remains retained evidence. |
| [66-azardata](https://azardata.net/vps/storage/iran/) · [snapshot](evidence/vps-family-audit-2026-10-29/66-azardata.html) | سرور مجازی حجیم ایران  /  خرید سرور مجازی پر حجم ایران - آذردیتا | Six Iran storage configurations all full capacity; SAS media stays null. |
| [67-azardata](https://azardata.net/vps/managed/iran/) · [snapshot](evidence/vps-family-audit-2026-10-29/67-azardata.html) | سرور مجازی مدیریت شده ایران  /  خرید سرور مجازی مدیریت شده ایران - آذردیتا | Four Iran managed VPS fixed configurations, distinct software/management service variant. |
| [68-iranica](https://iranicaserver.com/vps) · [snapshot](evidence/vps-family-audit-2026-10-29/68-iranica.html) | خرید سرور مجازی (VPS)  /  لینوکس و ویندوز، ایران و خارج – ایرانیکاسرور | General VPS overview; points to Iran/MikroTik/game families already reviewed, no extra priced resource rows. |
| [69-iranica](https://iranicaserver.com/game-server) · [snapshot](evidence/vps-family-audit-2026-10-29/69-iranica.html) | خرید گیم سرور  /  سرور مجازی گیمینگ با پینگ مناسب  /  ایرانیکاسرور | Five game sizes returned with distinct pid49/50/134/156/157. Iran location not stated for game rows (navigation is insufficient); retained location gaps. |
| [70-iranica](https://iranicaserver.com/mikrotik) · [snapshot](evidence/vps-family-audit-2026-10-29/70-iranica.html) | سرور میکروتیک – ایرانیکاسرور | MikroTik Iran/foreign family overview, no additional exact configuration; Iran child02 reviewed. |
| [71-negarnovin](https://negarnovin.com/%d8%b3%d8%b1%d9%88%d8%b1-%d9%85%d8%ac%d8%a7%d8%b2%db%8c-%da%a9%d8%a7%d9%87%d8%b4-%d9%be%db%8c%d9%86%da%af) · [snapshot](evidence/vps-family-audit-2026-10-29/71-negarnovin.html) | خرید سرور مجازی کاهش پینگ  /  VPS گیم و ترید 10G — نگارنوین | Game/ping alias uses identical irkvm/p1–p8, same array, not new products. |
| [72-negarnovin](https://negarnovin.com/%d8%b3%d8%b1%d9%88%d8%b1-%d9%85%d8%ac%d8%a7%d8%b2%db%8c-%da%a9%d9%84%d8%a7%d8%b3-%d8%a2%d9%86%d9%84%d8%a7%db%8c%d9%86) · [snapshot](evidence/vps-family-audit-2026-10-29/72-negarnovin.html) | سرور مجازی کلاس آنلاین نامحدود تحویل فوری | Online-class alias uses identical irkvm/p1–p8. |
| [73-negarnovin](https://negarnovin.com/unlimited-traffic-virtual-server) · [snapshot](evidence/vps-family-audit-2026-10-29/73-negarnovin.html) | خرید سرور مجازی ترافیک نامحدود  /  VPS 10G NVMe — نگارنوین | Eight global unlimited configurations say 50+ locations, order links anchors and no exact Iran identity. Excluded from Iran admission; full original array retained in text. |
| [74-webdade](https://webdade.com/vps) · [snapshot](evidence/vps-family-audit-2026-10-29/74-webdade.html) | خرید سرور مجازی (VPS)  /  ۹ لوکیشن، تحویل آنی  /  وب داده | General VPS page Iran section duplicates34 G9 and57 MikroTik; foreign Netherlands/Germany/USA sizes excluded. Explicit no VAT added documented. |
| [75-webdade](https://webdade.com/free-vps) · [snapshot](evidence/vps-family-audit-2026-10-29/75-webdade.html) | وب داده  /  سرور مجازی رایگان  /  وی پی اس رایگان  /  vps رایگان | Default public 1core/1GB/20GB quote1204/hour and28886/day exactly maps two existing unranked rows; no month conversion. Credit is not recurring price. |
| [76-mihanwebhost](https://mihanwebhost.com/my/trade-server) · [snapshot](evidence/vps-family-audit-2026-10-29/76-mihanwebhost.html) | سرور مجازی trade برای امنیت معاملات آنلاین  /  میهن وب هاست | Three trade configurations explicitly German static IP, all full capacity; excluded by location. |
| [77-mihanwebhost](https://mihanwebhost.com/my/vpsoffer) · [snapshot](evidence/vps-family-audit-2026-10-29/77-mihanwebhost.html) | خرید سرور مجازی vps   /  میهن وب هاست | All ten available Iranian auction rows reviewed; country img alt/title Iran and detailed own datacenter. Table disk then RAM order manually checked. Actual pid retained, names are review labels. |
| [78-spadserver](https://crm.spadserver.com/store/bigbluebutton-iran) · [snapshot](evidence/vps-family-audit-2026-10-29/78-spadserver.html) | کارت خرید - اسپاد سرور | BBB hourly-named session product displays350000/month but only meeting scheduling description, no CPU/RAM/disk/VPS identity. Excluded application/session offer. |
| [79-liara](https://liara.ir/products/linux-server) · [snapshot](evidence/vps-family-audit-2026-10-29/79-liara.html) | سرور مجازی لینوکس ساعتی  /  خرید وی پی اس (VPS) لینوکس - لیارا | Linux alias same six fixed VPS tariff rows as01. |
| [80-liara](https://liara.ir/products/cloud-server) · [snapshot](evidence/vps-family-audit-2026-10-29/80-liara.html) | خرید VPS  /  خرید سرور مجازی ساعتی  /  وی پی اس ارزان - لیارا | Cloud-server alias same six fixed VPS tariff rows as01. |
| [81-sonhost](https://7ho.st/vps-hosting/storage) · [snapshot](evidence/vps-family-audit-2026-10-29/81-sonhost.html) | خرید سرور مجازی حجیم  /  VPS فضای بالا لیتوانی - سون هاست | Five storage products explicitly Lithuania; all foreign excluded. |
| [82-logicserver](https://logicserver.org/trade-vps) · [snapshot](evidence/vps-family-audit-2026-10-29/82-logicserver.html) | خرید سرور مجازی ترید (Trade VPS)  /  NVME، IP ثابت اروپا، ویندوز سرور | Four trade VPS products explicitly Frankfurt/Helsinki; all foreign excluded. |
| [83-webdade](https://my.webdade.com/cloud.php) · [snapshot](evidence/vps-family-audit-2026-10-29/83-webdade.html) | سرور ابری وب داده - وب داده | Cloud hourly component rates and same public default; source75 displayed full default retained. Resource-rate continuum not synthesized into invented SKU grid. |
| [84-webdade](https://my.webdade.com/store/iran-vps) · [snapshot](evidence/vps-family-audit-2026-10-29/84-webdade.html) | خرید و راه اندازی سرویس جدید - وب داده | Standard store category returns no products; no additional configurations or availability inferred. |
| [85-webdade](https://my.webdade.com/store/mikrotik-vps) · [snapshot](evidence/vps-family-audit-2026-10-29/85-webdade.html) | خرید و راه اندازی سرویس جدید - وب داده | MikroTik store category returns no products; missing disk remains unresolved. |
| [86-negarnovin](https://negarnovin.com/%d8%b3%d8%b1%d9%88%d8%b1-%d9%85%d8%ac%d8%a7%d8%b2%db%8c-%d8%b2%db%8c%d8%b1-%d8%b3%d8%a7%d8%ae%d8%aa) · [snapshot](evidence/vps-family-audit-2026-10-29/86-negarnovin.html) | سرور مجازی زیرساخت Zirsakht Server ارزان نامحدود | Infrastructure alias uses same irkvm/p1–p8 products and array. |
| [87-negarnovin](https://negarnovin.com/vps/) · [snapshot](evidence/vps-family-audit-2026-10-29/87-negarnovin.html) | خرید سرور مجازی ابری  /  VPS NVMe پورت ۱۰ گیگ — نگارنوین | Generic global VPS marketing eight rows have unresolved exact Iran identity; no additional qualifying Iran SKU proved. |
| [88-spadserver](https://crm.spadserver.com/cart.php?gid=28) · [snapshot](evidence/vps-family-audit-2026-10-29/88-spadserver.html) | کارت خرید - اسپاد سرور | gid28 redirects to BBB Iran source78; application/session exclusion unchanged. |

## All reviewed configurations and exact duplicate mapping

A dash means unknown. Prices below are public monthly toman unless the cell states a native basis. Detailed fee/IP/billing/uncertainty facts live on **each JSON row** and in the source snapshots. `existing-catalog-identity` means do not add another offer; unavailable/gap rows are retained for coverage, not automatic ranking.

| Review ID / source | Plan | CPU | RAM GB | Disk GB / media | Published tariff | Disposition / exact existing IDs |
|---|---|---:|---:|---|---|---|
| family-01-liara-1 | مشتری | 1 | 2 | 20 / SSD | 1,475,000 / month | new-reviewable |
| family-01-liara-2 | زحل | 2 | 4 | 40 / SSD | 2,650,000 / month | new-reviewable |
| family-01-liara-3 | اورانوس | 4 | 8 | 80 / SSD | 4,600,000 / month | new-reviewable |
| family-01-liara-4 | نپتون | 8 | 16 | 160 / SSD | 8,000,000 / month | new-reviewable |
| family-01-liara-5 | پلوتون | 16 | 32 | 320 / SSD | 14,000,000 / month | new-reviewable |
| family-01-liara-6 | اریس | 32 | 64 | 640 / SSD | 24,600,000 / month | new-reviewable |
| family-02-iranica-1 | سرور میکروتیک ایران – پلن 1 | 1 | 0.512 | — / unknown | 549,000 / month | gap-incomplete-resources |
| family-02-iranica-2 | سرور میکروتیک ایران – پلن 2 | 2 | 2.048 | — / unknown | 749,000 / month | gap-incomplete-resources |
| family-02-iranica-3 | سرور میکروتیک ایران – پلن 3 | 4 | 4.096 | — / unknown | 1,449,000 / month | gap-incomplete-resources |
| family-03-tadserver-1 | سرور مجازی ۲ گیگابایت ایران | 1 | 2 | 20 / SSD | 480,000 / month | new-reviewable |
| family-03-tadserver-2 | سرور مجازی ۳ گیگابایت ایران | 2 | 3 | 25 / SSD | 590,000 / month | new-reviewable |
| family-03-tadserver-3 | سرور مجازی ۴ گیگابایت ایران | 2 | 4 | 30 / SSD | 720,000 / month | new-reviewable |
| family-03-tadserver-4 | سرور مجازی ۶ گیگابایت ایران | 3 | 6 | 40 / SSD | 850,000 / month | new-reviewable |
| family-03-tadserver-5 | سرور مجازی ۸ گیگابایت ایران | 4 | 8 | 50 / SSD | 980,000 / month | new-reviewable |
| family-03-tadserver-6 | سرور مجازی ۱۲ گیگابایت ایران | 6 | 12 | 60 / SSD | 1,465,000 / month | new-reviewable |
| family-03-tadserver-7 | سرور مجازی ۱۶ گیگابایت ایران | 8 | 16 | 70 / SSD | 1,950,000 / month | new-reviewable |
| family-03-tadserver-8 | سرور مجازی ۲۴ گیگابایت ایران | 10 | 24 | 80 / SSD | 2,900,000 / month | new-reviewable |
| family-03-tadserver-9 | سرور مجازی ۳۲ گیگابایت ایران | 16 | 32 | 100 / SSD | 3,900,000 / month | new-reviewable |
| family-03-tadserver-10 | سرور مجازی ۶۴ گیگابایت ایران | 32 | 64 | 150 / SSD | 7,500,000 / month | new-reviewable |
| family-03-tadserver-11 | سرور مجازی ۱۲۸ گیگابایت ایران | 48 | 128 | 300 / SSD | 12,000,000 / month | new-reviewable |
| family-04-tadserver-1 | سرور مجازی ۲ گیگابایت شاتل | 1 | 2 | 20 / SSD | 480,000 / month | gap-alias-or-distinct-datacenter |
| family-04-tadserver-2 | سرور مجازی ۳ گیگابایت شاتل | 2 | 3 | 25 / SSD | 590,000 / month | gap-alias-or-distinct-datacenter |
| family-04-tadserver-3 | سرور مجازی ۴ گیگابایت شاتل | 2 | 4 | 30 / SSD | 720,000 / month | gap-alias-or-distinct-datacenter |
| family-04-tadserver-4 | سرور مجازی ۶ گیگابایت شاتل | 3 | 6 | 40 / SSD | 850,000 / month | gap-alias-or-distinct-datacenter |
| family-04-tadserver-5 | سرور مجازی ۸ گیگابایت شاتل | 4 | 8 | 50 / SSD | 980,000 / month | gap-alias-or-distinct-datacenter |
| family-04-tadserver-6 | سرور مجازی ۱۲ گیگابایت شاتل | 6 | 12 | 60 / SSD | 1,465,000 / month | gap-alias-or-distinct-datacenter |
| family-04-tadserver-7 | سرور مجازی ۱۶ گیگابایت شاتل | 8 | 16 | 70 / SSD | 1,950,000 / month | gap-alias-or-distinct-datacenter |
| family-04-tadserver-8 | سرور مجازی ۲۴ گیگابایت شاتل | 10 | 24 | 80 / SSD | 2,900,000 / month | gap-alias-or-distinct-datacenter |
| family-04-tadserver-9 | سرور مجازی ۳۲ گیگابایت شاتل | 16 | 32 | 100 / SSD | 3,900,000 / month | gap-alias-or-distinct-datacenter |
| family-04-tadserver-10 | سرور مجازی ۶۴ گیگابایت شاتل | 32 | 64 | 200 / SSD | 7,500,000 / month | gap-alias-or-distinct-datacenter |
| family-04-tadserver-11 | سرور مجازی ۱۲۸ گیگابایت شاتل | 48 | 128 | 300 / SSD | 12,000,000 / month | gap-alias-or-distinct-datacenter |
| family-39-tadserver-1 | سرور مجازی ۲ گیگابایت NVMe | 1 | 2 | 20 / NVMe | 600,000 / month | new-reviewable |
| family-39-tadserver-2 | سرور مجازی ۳ گیگابایت NVMe | 2 | 3 | 25 / NVMe | 738,000 / month | new-reviewable |
| family-39-tadserver-3 | سرور مجازی ۴ گیگابایت NVMe | 2 | 4 | 30 / NVMe | 900,000 / month | new-reviewable |
| family-39-tadserver-4 | سرور مجازی ۶ گیگابایت NVMe | 3 | 6 | 40 / NVMe | 1,060,000 / month | new-reviewable |
| family-39-tadserver-5 | سرور مجازی ۸ گیگابایت NVMe | 4 | 8 | 50 / NVMe | 1,225,000 / month | new-reviewable |
| family-39-tadserver-6 | سرور مجازی ۱۲ گیگابایت NVMe | 6 | 12 | 60 / NVMe | 1,830,000 / month | new-reviewable |
| family-39-tadserver-7 | سرور مجازی ۱۶ گیگابایت NVMe | 8 | 12 | 70 / NVMe | 1,830,000 / month | gap-conflicting-resources |
| family-05-inet-1 | ram-1 | 1 | 1 | 20 / SSD | 790,000 / month | existing-catalog-identity → inet-iran-ram-1 |
| family-05-inet-2 | ram-2 | 2 | 2 | 30 / SSD | 1,320,000 / month | existing-catalog-identity → inet-iran-ram-2 |
| family-05-inet-3 | ram-3 | 3 | 3 | 40 / SSD | 1,730,000 / month | existing-catalog-identity → inet-iran-ram-3 |
| family-05-inet-4 | ram-4 | 4 | 4 | 50 / SSD | 2,100,000 / month | existing-catalog-identity → inet-iran-ram-4 |
| family-05-inet-5 | ram-6 | 6 | 6 | 60 / SSD | 2,900,000 / month | existing-catalog-identity → inet-iran-ram-6 |
| family-05-inet-6 | ram-8 | 8 | 8 | 80 / SSD | 3,800,000 / month | existing-catalog-identity → inet-iran-ram-8 |
| family-07-irvm-1 | استارتر | 1 | 1 | 10 / unknown | 545,000 / month | existing-catalog-identity → irvm-respina-starter |
| family-07-irvm-2 | برنز | 2 | 2 | 20 / unknown | 895,000 / month | existing-catalog-identity → irvm-respina-bronze |
| family-07-irvm-3 | سیلور | 2 | 4 | 30 / unknown | 1,495,000 / month | existing-catalog-identity → irvm-respina-silver |
| family-07-irvm-4 | گلد | 4 | 8 | 50 / unknown | 2,895,000 / month | existing-catalog-identity → irvm-respina-gold |
| family-08-irvm-1 | استارتر | 1 | 1 | 10 / unknown | 545,000 / month | excluded-explicitly-unavailable |
| family-08-irvm-2 | برنز | 2 | 2 | 20 / unknown | 895,000 / month | excluded-explicitly-unavailable |
| family-08-irvm-3 | سیلور | 2 | 4 | 30 / unknown | 1,495,000 / month | excluded-explicitly-unavailable |
| family-08-irvm-4 | گلد | 4 | 8 | 50 / unknown | 2,895,000 / month | excluded-explicitly-unavailable |
| family-09-irvm-1 | استارتر | 1 | 1 | 10 / unknown | 545,000 / month | excluded-explicitly-unavailable |
| family-09-irvm-2 | برنز | 2 | 2 | 20 / unknown | 895,000 / month | excluded-explicitly-unavailable |
| family-09-irvm-3 | سیلور | 2 | 4 | 30 / unknown | 1,495,000 / month | excluded-explicitly-unavailable |
| family-09-irvm-4 | گلد | 4 | 8 | 50 / unknown | 2,895,000 / month | excluded-explicitly-unavailable |
| family-45-irvm-1 | استارتر | 1 | 1 | 10 / unknown | 545,000 / month | excluded-explicitly-unavailable |
| family-45-irvm-2 | برنز | 2 | 2 | 20 / unknown | 895,000 / month | excluded-explicitly-unavailable |
| family-45-irvm-3 | سیلور | 2 | 4 | 30 / unknown | 1,495,000 / month | excluded-explicitly-unavailable |
| family-45-irvm-4 | گلد | 4 | 8 | 50 / unknown | 2,895,000 / month | excluded-explicitly-unavailable |
| family-40-irvm-1 | استارتر | 1 | 1 | 10 / unknown | 545,000 / month | excluded-explicitly-unavailable |
| family-40-irvm-2 | برنز | 2 | 2 | 20 / unknown | 895,000 / month | excluded-explicitly-unavailable |
| family-40-irvm-3 | سیلور | 2 | 4 | 30 / unknown | 1,495,000 / month | excluded-explicitly-unavailable |
| family-40-irvm-4 | گلد | 4 | 8 | 50 / unknown | 2,895,000 / month | excluded-explicitly-unavailable |
| family-11-mihanwebhost-1 | مدیریت شده پلن 1 | 5 | 1.024 | 30 / SSD | 2,622,000 / month | excluded-explicitly-unavailable |
| family-11-mihanwebhost-2 | مدیریت شده پلن 2 | 5 | 2.048 | 35 / SSD | 3,420,000 / month | excluded-explicitly-unavailable |
| family-11-mihanwebhost-3 | مدیریت شده پلن 3 | 5 | 3.096 | 40 / SSD | 3,960,000 / month | excluded-explicitly-unavailable |
| family-11-mihanwebhost-4 | مدیریت شده پلن 4 | 6 | 4.096 | 60 / SSD | 5,400,000 / month | new-reviewable |
| family-11-mihanwebhost-5 | مدیریت شده پلن 5 | 7 | 6.144 | 70 / SSD | 5,820,000 / month | new-reviewable |
| family-11-mihanwebhost-6 | مدیریت شده پلن 6 | 8 | 8.192 | 80 / SSD | 6,900,000 / month | new-reviewable |
| family-11-mihanwebhost-7 | مدیریت شده پلن 7 | 9 | 10.24 | 90 / SSD | 7,890,000 / month | new-reviewable |
| family-11-mihanwebhost-8 | مدیریت شده پلن 8 | 10 | 12.288 | 100 / SSD | 8,550,000 / month | new-reviewable |
| family-12-logicserver-1 | مدیریت شده 1 | 4 | 4 | 30 / SSD | 999,000 / month | new-reviewable |
| family-12-logicserver-2 | مدیریت شده 2 | 6 | 6 | 100 / SSD | 1,399,000 / month | new-reviewable |
| family-12-logicserver-3 | مدیریت شده 3 | 8 | 8 | 150 / SSD | 1,599,000 / month | new-reviewable |
| family-12-logicserver-4 | مدیریت شده 4 | 10 | 10 | 200 / SSD | 1,999,000 / month | new-reviewable |
| family-13-spadserver-1 | پلن یک سرور مجازی ایران | 2 | 2 | 35 / SSD | 849,900 / month | existing-catalog-identity → spadserver-iran-spadserver-1 |
| family-13-spadserver-2 | پلن دو سرور مجازی ایران | 2 | 4 | 45 / SSD | 1,108,900 / month | existing-catalog-identity → spadserver-iran-spadserver-2 |
| family-13-spadserver-3 | پلن سه سرور مجازی ایران | 4 | 8 | 55 / SSD | 1,347,900 / month | existing-catalog-identity → spadserver-iran-spadserver-3 |
| family-13-spadserver-4 | پلن چهار سرور مجازی ایران | 6 | 10 | 85 / SSD | 1,928,900 / month | existing-catalog-identity → spadserver-iran-spadserver-4 |
| family-13-spadserver-5 | پلن پنج سرور مجازی ایران | 6 | 12 | 115 / SSD | 2,454,900 / month | existing-catalog-identity → spadserver-iran-spadserver-5 |
| family-13-spadserver-6 | پلن شش سرور مجازی ایران | 8 | 16 | 130 / SSD | 3,055,900 / month | existing-catalog-identity → spadserver-iran-spadserver-6 |
| family-13-spadserver-7 | پلن هفت سرور مجازی ایران | 8 | 20 | 150 / SSD | 3,505,900 / month | existing-catalog-identity → spadserver-iran-spadserver-7 |
| family-13-spadserver-8 | پلن هشت سرور مجازی ایران | 10 | 24 | 180 / SSD | 5,083,900 / month | existing-catalog-identity → spadserver-iran-spadserver-8 |
| family-13-spadserver-9 | پلن نه سرور مجازی ایران | 12 | 24 | 200 / SSD | 6,660,900 / month | existing-catalog-identity → spadserver-iran-spadserver-9 |
| family-14-spadserver-1 | پلن یک سرور مجازی پیشرفته ایران | 2 | 2 | 35 / SSD | 1,018,900 / month | new-reviewable |
| family-14-spadserver-2 | پلن دو سرور مجازی پیشرفته ایران | 2 | 4 | 45 / SSD | 1,329,900 / month | new-reviewable |
| family-14-spadserver-3 | پلن سه سرور مجازی پیشرفته ایران | 4 | 8 | 55 / SSD | 1,616,900 / month | new-reviewable |
| family-14-spadserver-4 | پلن چهار سرور مجازی پیشرفته ایران | 6 | 10 | 85 / SSD | 2,313,900 / month | new-reviewable |
| family-14-spadserver-5 | پلن پنج سرور مجازی پیشرفته ایران | 6 | 12 | 115 / SSD | 2,944,900 / month | new-reviewable |
| family-14-spadserver-6 | پلن شش سرور مجازی پیشرفته ایران | 8 | 16 | 130 / SSD | 3,665,900 / month | new-reviewable |
| family-14-spadserver-7 | پلن هفت سرور مجازی پیشرفته ایران | 8 | 20 | 150 / SSD | 4,206,900 / month | new-reviewable |
| family-14-spadserver-8 | پلن هشت سرور مجازی پیشرفته ایران | 10 | 24 | 180 / SSD | 6,099,900 / month | new-reviewable |
| family-37-spadserver-1 | پلن یک گیت لب ایران | 4 | 8 | 55 / SSD | 1,618,900 / month | new-reviewable |
| family-37-spadserver-2 | پلن دو گیت لب ایران | 6 | 10 | 85 / SSD | 2,315,900 / month | new-reviewable |
| family-37-spadserver-3 | پلن سه گیت لب ایران | 6 | 12 | 115 / SSD | 2,946,900 / month | new-reviewable |
| family-19-servervds-1 | گیم سرور مجازی Personal NVMe | 2 | 2.0 | — / NVMe | 330,000 / month | excluded-explicitly-unavailable |
| family-19-servervds-2 | گیم سرور مجازی Personal  NVme+ | 4 | 4.0 | — / NVMe | 470,000 / month | gap-incomplete-resources |
| family-19-servervds-3 | گیم سرور مجازی   Pro NVme | 8 | 6.0 | — / NVMe | 640,000 / month | gap-incomplete-resources |
| family-19-servervds-4 | گیم سرور مجازی NVme Pro+ | 16 | 8.0 | — / NVMe | 877,000 / month | gap-incomplete-resources |
| family-19-servervds-5 | گیم سرور مجازی Pro ++ | 10 | 12.0 | — / SSD | 877,000 / month | gap-incomplete-resources |
| family-19-servervds-6 | گیم سرور مجازی  NVMe E+ | 12 | 16.0 | — / NVMe | 1,490,000 / month | gap-incomplete-resources |
| family-19-servervds-7 | گیم سرور مجازی NVme C+ | 16 | 32.0 | — / NVMe | 2,870,000 / month | gap-incomplete-resources |
| family-20-servervds-1 | NVMe | 4 | 2.0 | 35 / NVMe | 395,000 / month | new-reviewable |
| family-20-servervds-2 | NVME+ | 4 | 4.0 | 50 / NVMe | 478,000 / month | new-reviewable |
| family-20-servervds-3 | NVME Pro | 8 | 8.0 | 85 / NVMe | 820,000 / month | new-reviewable |
| family-20-servervds-4 | NVME Pro+ | 10 | 10.0 | 100 / NVMe | 920,000 / month | new-reviewable |
| family-20-servervds-5 | NVME E+ | 12 | 12.0 | 150 / NVMe | 1,160,000 / month | new-reviewable |
| family-20-servervds-6 | NVME C+ | 16 | 16.0 | 210 / NVMe | 1,400,000 / month | new-reviewable |
| family-21-servervds-1 | سرور مجازی ایران SSD-Personal | 2 | 1.0 | 35 / SSD | 380,000 / month | new-reviewable |
| family-21-servervds-2 | سرور مجازی ایران SSD-Personal+ | 4 | 2.0 | 50 / SSD | 410,000 / month | new-reviewable |
| family-21-servervds-3 | سرور مجازی ایران SSD-Pro | 6 | 4.0 | — / SSD | 475,000 / month | gap-incomplete-resources |
| family-21-servervds-4 | سرور مجازی ایران SSD-Pro+ | 12 | 10.0 | 85 / SSD | 720,000 / month | new-reviewable |
| family-21-servervds-5 | سرور مجازی ایران SSD-Company | 12 | 16.0 | 150 / SSD | 1,250,000 / month | new-reviewable |
| family-21-servervds-6 | سرور مجازی ایران SSD-Corporation | 16 | 32.0 | 400 / SSD | 2,380,000 / month | new-reviewable |
| family-22-servervds-1 | سرور مجازی ایران R-Personal | 2 | 1.0 | 50 / unknown | 345,000 / month | new-reviewable |
| family-22-servervds-2 | سرور مجازی ایران R-Personal+ | 4 | 2.0 | 75 / unknown | 420,000 / month | new-reviewable |
| family-22-servervds-3 | سرور مجازی ایران R-Pro | 8 | 4.0 | 120 / unknown | 529,000 / month | new-reviewable |
| family-22-servervds-4 | سرور مجازی ایران R-Pro+ | 8 | 8.0 | 185 / unknown | 687,000 / month | new-reviewable |
| family-22-servervds-5 | سرور مجازی ایران R-Company | 8 | 8.0 | 400 / unknown | 976,000 / month | new-reviewable |
| family-22-servervds-6 | سرور مجازی ایران R-Company+ | 16 | 16.0 | 400 / unknown | 1,350,000 / month | new-reviewable |
| family-23-servervds-1 | سرور نیمه اختصاصی ST0 | 2 | 3.0 | 500 / unknown | 550,000 / month | new-reviewable |
| family-23-servervds-2 | سرور نیمه اختصاصی ST1 | 2 | 3.0 | 1000 / unknown | 750,000 / month | new-reviewable |
| family-23-servervds-3 | سرور نیمه اختصاصی ST2 | 4 | 4.0 | 2000 / unknown | 930,000 / month | new-reviewable |
| family-23-servervds-4 | سرور نیمه اختصاصی ST3 | 4 | 4.0 | 3000 / unknown | 1,260,000 / month | new-reviewable |
| family-24-dyar-1 | سرور مجازی پیشگامان اقتصادی پلن1 | 1 | 1 | 10 / SSD | 599,000 / month | excluded-explicitly-unavailable |
| family-24-dyar-2 | سرور مجازی پیشگامان اقتصادی پلن2 | 1 | 2 | 10 / SSD | 700,000 / month | excluded-explicitly-unavailable |
| family-24-dyar-3 | سرور مجازی پیشگامان اقتصادی پلن3 | 2 | 2 | 10 / SSD | 900,000 / month | excluded-explicitly-unavailable |
| family-24-dyar-4 | سرور مجازی پیشگامان اقتصادی پلن4 | 3 | 4 | 10 / SSD | 1,200,000 / month | excluded-explicitly-unavailable |
| family-24-dyar-5 | سرور مجازی پیشگامان اقتصادی پلن5 | 4 | 6 | 10 / SSD | 1,600,000 / month | excluded-explicitly-unavailable |
| family-33-milad-1 | سرور مجازی لینوکسی ایران ارزان سرور اقتصادی 1 | 1 | 1.024 | 30 / NVMe | 585,000 / month | existing-catalog-identity → milad-milad-eco-108 |
| family-33-milad-2 | سرور مجازی ایران پایه 1 | 2 | 4 | 60 / HDD | 725,000 / month | existing-catalog-identity → milad-milad-base-111 |
| family-33-milad-3 | سرور مجازی لینوکسی ایران اقتصادی 2 | 2 | 2 | 45 / HDD | 610,000 / month | excluded-explicitly-unavailable |
| family-33-milad-4 | سرور مجازی لینوکسی ایران اقتصادی 3 | 2 | 3 | 60 / NVMe | 680,000 / month | existing-catalog-identity → milad-milad-eco-110 |
| family-33-milad-5 | سرور مجازی ایران پایه 2 | 2 | 4 | 120 / HDD | 799,000 / month | excluded-explicitly-unavailable |
| family-33-milad-6 | سرور مجازی ایران پایه 3 | 2 | 4 | 150 / HDD | 855,000 / month | existing-catalog-identity → milad-milad-base-113 |
| family-33-milad-7 | سرور مجازی ایران حرفه ای 1 | 4 | 8 | 120 / HDD | 1,680,000 / month | existing-catalog-identity → milad-milad-pro-114 |
| family-33-milad-8 | سرور مجازی ایران حرفه ای 2 | 8 | 16 | 200 / HDD | 2,680,000 / month | existing-catalog-identity → milad-milad-pro-115 |
| family-33-milad-9 | سرور مجازی ایران حرفه ای 3 | 6 | 12 | 200 / HDD | 2,150,000 / month | existing-catalog-identity → milad-milad-pro-116 |
| family-28-negarnovin-1 | irkvm پلن 1 | 2 | 4 | 30 / NVMe | 1,700,000 / month | existing-catalog-identity → negarnovin-negarnovin-130 |
| family-28-negarnovin-2 | irkvm پلن 2 | 4 | 6 | 40 / NVMe | 2,000,000 / month | existing-catalog-identity → negarnovin-negarnovin-131 |
| family-28-negarnovin-3 | irkvm پلن 3 | 6 | 10 | 50 / NVMe | 2,400,000 / month | existing-catalog-identity → negarnovin-negarnovin-132 |
| family-28-negarnovin-4 | irkvm پلن 4 | 6 | 12 | 60 / NVMe | 2,800,000 / month | existing-catalog-identity → negarnovin-negarnovin-133 |
| family-28-negarnovin-5 | irkvm پلن 5 | 8 | 16 | 70 / NVMe | 3,200,000 / month | existing-catalog-identity → negarnovin-negarnovin-134 |
| family-28-negarnovin-6 | irkvm پلن 6 | 12 | 24 | 80 / NVMe | 3,500,000 / month | existing-catalog-identity → negarnovin-negarnovin-135 |
| family-28-negarnovin-7 | irkvm پلن 7 | 12 | 32 | 90 / NVMe | 4,000,000 / month | existing-catalog-identity → negarnovin-negarnovin-136 |
| family-28-negarnovin-8 | irkvm پلن 8 | 16 | 32 | 100 / NVMe | 4,800,000 / month | existing-catalog-identity → negarnovin-negarnovin-137 |
| family-30-negarnovin-1 | milad پلن 1 | 2 | 4 | 30 / NVMe | 1,700,000 / month | new-reviewable |
| family-30-negarnovin-2 | milad پلن 2 | 4 | 6 | 40 / NVMe | 2,000,000 / month | new-reviewable |
| family-30-negarnovin-3 | milad پلن 3 | 6 | 10 | 50 / NVMe | 2,400,000 / month | new-reviewable |
| family-30-negarnovin-4 | milad پلن 4 | 6 | 12 | 60 / NVMe | 2,800,000 / month | new-reviewable |
| family-30-negarnovin-5 | milad پلن 5 | 8 | 16 | 70 / NVMe | 3,200,000 / month | new-reviewable |
| family-30-negarnovin-6 | milad پلن 6 | 12 | 24 | 80 / NVMe | 3,500,000 / month | new-reviewable |
| family-30-negarnovin-7 | milad پلن 7 | 12 | 32 | 90 / NVMe | 4,000,000 / month | new-reviewable |
| family-30-negarnovin-8 | milad پلن 8 | 16 | 32 | 100 / NVMe | 4,800,000 / month | new-reviewable |
| family-32-sonhost-1 | سرور مجازی ایران / بسته 1 | 1 | 1 | 10 / unknown | 1,150,000 / month | existing-catalog-identity → sonhost-sonhost-iran-403 |
| family-32-sonhost-2 | سرور مجازی ایران / بسته 2 | 2 | 2 | 20 / unknown | 1,350,000 / month | existing-catalog-identity → sonhost-sonhost-iran-404 |
| family-32-sonhost-3 | سرور مجازی ایران / بسته 3 | 3 | 4 | 40 / unknown | 1,425,000 / month | existing-catalog-identity → sonhost-sonhost-iran-405 |
| family-32-sonhost-4 | سرور مجازی ایران / بسته 4 | 3 | 6 | 60 / unknown | 1,725,000 / month | existing-catalog-identity → sonhost-sonhost-iran-406 |
| family-32-sonhost-5 | سرور مجازی ایران / بسته 5 | 4 | 8 | 80 / unknown | 2,145,000 / month | existing-catalog-identity → sonhost-sonhost-iran-407 |
| family-34-webdade-1 | ستاره | 2 | 2 | 40 / NVMe | 700,000 / month | new-reviewable |
| family-34-webdade-2 | سبلان | 4 | 4 | 60 / NVMe | 1,150,000 / month | new-reviewable |
| family-34-webdade-3 | دماوند | 8 | 8 | 80 / NVMe | 2,150,000 / month | new-reviewable |
| family-34-webdade-4 | اورست | 8 | 16 | 200 / NVMe | 3,600,000 / month | new-reviewable |
| family-34-webdade-5 | فیروزه | 1 | 1 | 25 / unknown | 1,900,000 / month | new-reviewable |
| family-34-webdade-6 | نگین | 2 | 2 | 50 / unknown | 3,500,000 / month | new-reviewable |
| family-34-webdade-7 | یاقوت | 3 | 4 | 80 / unknown | 5,650,000 / month | new-reviewable |
| family-34-webdade-8 | الماس | 4 | 8 | 120 / unknown | 9,250,000 / month | new-reviewable |
| family-56-webdade-1 | Bourse-1 | 4 | 4 | 40 / NVMe | 1,450,000 / month | new-reviewable |
| family-56-webdade-2 | Bourse-2 | 6 | 6 | 60 / NVMe | 2,050,000 / month | new-reviewable |
| family-56-webdade-3 | Bourse-3 | 8 | 8 | 70 / NVMe | 2,850,000 / month | new-reviewable |
| family-56-webdade-4 | Bourse-4 | 8 | 8 | 70 / NVMe | 4,850,000 / month | new-reviewable |
| family-57-webdade-1 | Mikrotik-IR | 1 | 1 | — / unknown | 1,077,100 / month | gap-incomplete-resources |
| family-35-mtserver-1 | سرور مجازی فن آوا  Plan-1 | 1 | 1 | 20 / NVMe | 550,000 / month | existing-catalog-identity → mtserver-mt-15-group-5-1 |
| family-35-mtserver-2 | سرور مجازی فن آوا  Plan-2 | 2 | 2 | 25 / NVMe | 690,000 / month | existing-catalog-identity → mtserver-mt-15-group-5-2 |
| family-35-mtserver-3 | سرور مجازی فن آوا  Plan-3 | 2 | 4 | 30 / NVMe | 850,000 / month | existing-catalog-identity → mtserver-mt-15-group-5-3 |
| family-35-mtserver-4 | سرور مجازی فن آوا  Plan-4 | 4 | 8 | 40 / NVMe | 1,500,000 / month | existing-catalog-identity → mtserver-mt-15-group-5-4 |
| family-42-mtserver-1 | سرور مجازی رسپینا Plan-1 | 1 | 1 | 20 / NVMe | 550,000 / month | excluded-explicitly-unavailable |
| family-42-mtserver-2 | سرور مجازی رسپینا Plan-2 | 2 | 2 | 25 / NVMe | 690,000 / month | excluded-explicitly-unavailable |
| family-42-mtserver-3 | سرور مجازی رسپینا Plan-3 | 2 | 4 | 30 / NVMe | 850,000 / month | excluded-explicitly-unavailable |
| family-42-mtserver-4 | سرور مجازی رسپینا Plan-4 | 4 | 8 | 40 / NVMe | 1,500,000 / month | existing-catalog-identity → mtserver-mt-16-group-6-4 |
| family-43-mtserver-1 | سرور مجازی آسیاتک  Plan-1 | 1 | 1 | 20 / NVMe | 550,000 / month | excluded-explicitly-unavailable |
| family-43-mtserver-2 | سرور مجازی آسیاتک Plan-2 | 2 | 2 | 25 / NVMe | 690,000 / month | excluded-explicitly-unavailable |
| family-43-mtserver-3 | سرور مجازی آسیاتک Plan-3 | 2 | 4 | 30 / NVMe | 850,000 / month | excluded-explicitly-unavailable |
| family-43-mtserver-4 | سرور مجازی آسیاتک Plan-4 | 4 | 8 | 40 / NVMe | 1,500,000 / month | excluded-explicitly-unavailable |
| family-44-mtserver-1 | سرور مجازی گیم ایران GSM 1 /  Plan | 1 | 1 | 20 / SSD | 300,000 / month | excluded-explicitly-unavailable |
| family-44-mtserver-2 | سرور مجازی گیم ایران GSM 2 /  Plan | 1 | 2 | 25 / SSD | 350,000 / month | excluded-explicitly-unavailable |
| family-44-mtserver-3 | سرور مجازی گیم ایران GSM 3 /  Plan | 2 | 3 | 30 / SSD | 460,000 / month | excluded-explicitly-unavailable |
| family-44-mtserver-4 | سرور مجازی گیم ایران GSM 4 /  Plan | 2 | 4 | 40 / SSD | 550,000 / month | excluded-explicitly-unavailable |
| family-44-mtserver-5 | سرور مجازی گیم ایران GSM 5 /  Plan | 3 | 6 | 40 / SSD | 690,000 / month | excluded-explicitly-unavailable |
| family-44-mtserver-6 | سرور مجازی گیم ایران GSM 6 /  Plan | 4 | 8 | 60 / SSD | 899,000 / month | excluded-explicitly-unavailable |
| family-44-mtserver-7 | سرور مجازی گیم ایران GSM 7 /  Plan | 8 | 16 | 70 / SSD | 1,599,000 / month | excluded-explicitly-unavailable |
| family-51-servervds-1 | VPS enterprise | — | — | — / unknown | {'amount': 10, 'currency': None, 'basis': 'monthly'} | gap-no-resource-identity |
| family-63-azardata-1 | gitlab-on-vps پلن 1 | 3 | 6 | 60 / NVMe | 2,599,000 / month | new-reviewable |
| family-63-azardata-2 | gitlab-on-vps پلن 2 | 4 | 8 | 80 / NVMe | 3,450,000 / month | new-reviewable |
| family-63-azardata-3 | gitlab-on-vps پلن 3 | 6 | 16 | 160 / NVMe | 6,799,000 / month | new-reviewable |
| family-63-azardata-4 | gitlab-on-vps پلن 4 | 8 | 32 | 320 / NVMe | 11,598,000 / month | new-reviewable |
| family-67-azardata-1 | managed-vps پلن 1 | 1 | 2 | 20 / NVMe | 1,299,000 / month | new-reviewable |
| family-67-azardata-2 | managed-vps پلن 2 | 2 | 4 | 30 / NVMe | 1,799,000 / month | new-reviewable |
| family-67-azardata-3 | managed-vps پلن 3 | 4 | 8 | 80 / NVMe | 2,999,000 / month | new-reviewable |
| family-67-azardata-4 | managed-vps پلن 4 | 8 | 16 | 160 / NVMe | 5,825,000 / month | new-reviewable |
| family-66-azardata-1 | storage-vps پلن 1 | 1 | 2 | 300 / unknown | 1,290,000 / month | excluded-explicitly-unavailable |
| family-66-azardata-2 | storage-vps پلن 2 | 2 | 4 | 500 / unknown | 1,799,000 / month | excluded-explicitly-unavailable |
| family-66-azardata-3 | storage-vps پلن 3 | 3 | 6 | 800 / unknown | 2,599,000 / month | excluded-explicitly-unavailable |
| family-66-azardata-4 | storage-vps پلن 4 | 4 | 8 | 1000 / unknown | 4,650,000 / month | excluded-explicitly-unavailable |
| family-66-azardata-5 | storage-vps پلن 5 | 6 | 12 | 2000 / unknown | 7,799,000 / month | excluded-explicitly-unavailable |
| family-66-azardata-6 | storage-vps پلن 6 | 8 | 16 | 4000 / unknown | 12,399,000 / month | excluded-explicitly-unavailable |
| family-69-iranica-1 | گیم سرور پلن 3 | 2 | 3 | 50 / unknown | 800,000 / month | gap-iran-location-unconfirmed |
| family-69-iranica-2 | گیم سرور پلن 4 | 3 | 4 | 60 / unknown | 750,000 / month | gap-iran-location-unconfirmed |
| family-69-iranica-3 | گیم سرور پلن 5 | 4 | 6 | 70 / unknown | 999,000 / month | gap-iran-location-unconfirmed |
| family-69-iranica-4 | گیم سرور پلن 6 | 5 | 8 | 80 / unknown | 1,100,000 / month | gap-iran-location-unconfirmed |
| family-69-iranica-5 | گیم سرور پلن 7 | 8 | 10 | 90 / unknown | 1,450,000 / month | gap-iran-location-unconfirmed |
| family-77-mihanwebhost-1 | حراج سرور مجازی / pid=66606 | 5 | 8 | 35 / SSD | 2,500,000 / month | new-reviewable |
| family-77-mihanwebhost-2 | حراج سرور مجازی / pid=66605 | 5 | 8 | 40 / SSD | 2,550,000 / month | new-reviewable |
| family-77-mihanwebhost-3 | حراج سرور مجازی / pid=66603 | 6 | 8 | 60 / SSD | 2,800,000 / month | new-reviewable |
| family-77-mihanwebhost-4 | حراج سرور مجازی / pid=89493 | 6 | 8 | 90 / SSD | 2,950,000 / month | new-reviewable |
| family-77-mihanwebhost-5 | حراج سرور مجازی / pid=89495 | 6 | 10 | 70 / SSD | 3,156,000 / month | new-reviewable |
| family-77-mihanwebhost-6 | حراج سرور مجازی / pid=66602 | 7 | 10 | 60 / SSD | 3,500,000 / month | new-reviewable |
| family-77-mihanwebhost-7 | حراج سرور مجازی / pid=66607 | 5 | 12 | 40 / SSD | 3,800,000 / month | new-reviewable |
| family-77-mihanwebhost-8 | حراج سرور مجازی / pid=89492 | 7 | 10 | 90 / SSD | 4,000,000 / month | new-reviewable |
| family-77-mihanwebhost-9 | حراج سرور مجازی / pid=66604 | 6 | 12 | 60 / SSD | 4,200,000 / month | new-reviewable |
| family-77-mihanwebhost-10 | حراج سرور مجازی / pid=89494 | 6 | 12 | 80 / SSD | 4,300,000 / month | new-reviewable |
| family-75-webdade-1 | پروژه ابری ایران / default | 1 | 1 | 20 / unknown | {'amount': 1204, 'currency': 'toman', 'basis': 'hour'} | existing-catalog-identity → webdade-iran-default-1c-1g-20g-hour |
| family-75-webdade-2 | پروژه ابری ایران / default | 1 | 1 | 20 / unknown | {'amount': 28886, 'currency': 'toman', 'basis': 'day'} | existing-catalog-identity → webdade-iran-default-1c-1g-20g-day |
| family-07-irvm-5 | منابع دلخواه / پیکربندی پیش‌فرض | 1 | 1 | 10 / HDD | 636,000 / month | new-reviewable |

## Verification

The handoff was checked for valid provider keys, unique review IDs, valid exact duplicate IDs, source snapshot/hash integrity, null monthly reference for native hourly/day quotes, and no invented media for interface-only rows. Source page coverage includes every fixed configuration returned in qualifying families; unavailable sizes are explicitly enumerated. Baseline/index and checks are retained with the evidence.
