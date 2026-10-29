# Additional Iranian VPS search — 2026-10-29

Research handoff for [issue #20](https://github.com/Fardinak/torob-aipe-challenge/issues/20), read with its labels and empty comment list via `gh issue view 20 --repo Fardinak/torob-aipe-challenge --json title,body,labels,comments`. Read AGENTS.md, docs/agents/domain.md, CONTEXT.md and docs/agents/issue-tracker.md before exploration. Applied the research skill primary-source standard; performed research directly, without child agents, per the task instruction.

**Saturation is not reached.** The second broad query round continued to add distinct providers and resource shapes. This is a durable additional-source handoff, not completion of issue #20 or a claim that all Iranian VPS providers have been covered. No numeric sampling cap was used within reviewed tariff pages: every distinct fixed configuration in their returned public tariff content is represented below, including held and unavailable rows. Landing-page duplicate cards are consolidated; location, hardware, OS, traffic-family and billing distinctions are retained. Related tariff pages followed during this pass are also enumerated. Unfollowed leads are named at the end.

No catalog or existing files were edited. New raw HTML, extraction text and request metadata accompany this one research report under `research/evidence/vps-additional-2026-10-29/`. Requests used Python urllib, a normal browser User-Agent, public GETs only. No accounts, cart additions, outreach or purchases. Raw HTML is original response bytes; `.txt` is a convenience extraction with scripts/styles removed. Metadata includes requested/final URL, UTC attempt timestamp, HTTP status/headers, and byte length; the manifest below adds actual file-save UTC timestamps and SHA-256. These dates are retrieval/check dates, never asserted provider publication dates. A 200 maintenance page is not tariff verification.

## Admission interpretation

`reviewable base` means public numeric monthly tariff, identifiable resources, explicit Iran product/location and a source/handoff page exist. It is a recommendation for parent admission with disclosures, not a checkout quote or assurance of stock. All amounts are provider-published base prices; tax, mandatory fees, IPv4 and license inclusion remain **unknown unless explicitly stated** below. Do not rank these as total costs. Unknown storage type prevents exact disk-type grouping. Published CPU core counts do not establish dedicated physical-core allocation. No GB/GiB equivalence is inferred. Source uses of SATA, SSD and NVMe stay distinct; SATA alone does not establish SSD or HDD. Out-of-stock rows are retained but excluded from current available-choice admission. Do not infer withdrawn offers from inaccessible pages.

The CPU/RAM/disk/type tables are exact transcriptions of published facts (Latin digit normalization only), with each source section applying to all its rows. Handoff links are the source page unless a more precise extracted order link is included. Public order hrefs are retained without visiting action URLs that would add to a cart.


## Hostida — all 19 metered Iran VPS configurations

First-party source and handoff: [https://hostida.com/cloud/vps/iran/](https://hostida.com/cloud/vps/iran/). Raw: [hostida.html](evidence/vps-additional-2026-10-29/hostida.html).

All rows explicitly SSD, DDR3, shared 10 Gbit/s port, 100 GB traffic. Both upload and download consume traffic; FAQ explicitly says no 1:10 restriction on this metered product. IPv6 advertised free; base IPv4 inclusion unknown. Backup, management, licenses and extra IP are optional addons; final mandatory-extra/tax completeness unknown. Three tables map to Milad Tower Hostida network, Milad Tower Asiatech network and Jordan Respina respectively. Monthly / 3-month / 6-month / annual totals are copied, without assuming the advertised 5/10/20% discounts reconcile every value.

| Plan / DC family | CPU | RAM | Disk | Traffic | Totals: 1 / 3 / 6 / 12 months (toman) | Handoff |
| --- | --- | --- | --- | --- | --- | --- |
| IR Hostida 2 | 2 هسته | 2 گیگابایت DDR3 | 30 گیگابایت SSD | ۱۰۰ گیگابایت | 950,000  تومان; 2,707,500  تومان; 5,130,000  تومان; 9,120,000  تومان | [order](https://my.hostida.com/cart.php?a=add&pid=474) |
| IR Hostida 4 | 3 هسته | 4 گیگابایت DDR3 | 40 گیگابایت SSD | ۱۰۰ گیگابایت | 1,250,000  تومان; 3,562,500  تومان; 6,750,000  تومان; 12,000,000  تومان | [order](https://my.hostida.com/cart.php?a=add&pid=753) |
| IR Hostida 6 | 4 هسته | 6 گیگابایت DDR3 | 50 گیگابایت SSD | ۱۰۰ گیگابایت | 1,600,000  تومان; 4,560,000  تومان; 8,640,000  تومان; 15,360,000  تومان | [order](https://my.hostida.com/cart.php?a=add&pid=754) |
| IR Hostida 8 | 5 هسته | 8 گیگابایت DDR3 | 60 گیگابایت SSD | ۱۰۰ گیگابایت | 1,900,000  تومان; 5,415,000  تومان; 10,260,000  تومان; 18,240,000  تومان | [order](https://my.hostida.com/cart.php?a=add&pid=755) |
| IR Hostida 10 | 6 هسته | 10 گیگابایت DDR3 | 70 گیگابایت SSD | ۱۰۰ گیگابایت | 2,250,000  تومان; 6,412,500  تومان; 12,150,000  تومان; 21,600,000  تومان | [order](https://my.hostida.com/cart.php?a=add&pid=756) |
| IR Hostida 12 | 7 هسته | 12 گیگابایت DDR3 | 80 گیگابایت SSD | ۱۰۰ گیگابایت | 2,650,000  تومان; 7,552,500  تومان; 14,310,000  تومان; 25,440,000  تومان | [order](https://my.hostida.com/cart.php?a=add&pid=757) |

| Plan / DC family | CPU | RAM | Disk | Traffic | Totals: 1 / 3 / 6 / 12 months (toman) | Handoff |
| --- | --- | --- | --- | --- | --- | --- |
| IR AsiaTech 1 | 1 هسته | 1 گیگابایت DDR3 | 20 گیگابایت SSD | 100 گیگابایت | 750,000  تومان; 2,140,000  تومان; 4,000,000  تومان; 7,200,000  تومان | [order](https://my.hostida.com/cart.php?a=add&pid=733) |
| IR AsiaTech 2 | 1 هسته | 2 گیگابایت DDR3 | 30 گیگابایت SSD | 100 گیگابایت | 960,000  تومان; 2,750,000  تومان; 5,220,000  تومان; 9,280,000  تومان | [order](https://my.hostida.com/cart.php?a=add&pid=734) |
| IR AsiaTech 4 | 2 هسته | 4 گیگابایت DDR3 | 40 گیگابایت SSD | 100 گیگابایت | 1,400,000  تومان; 3,860,000  تومان; 7,550,000  تومان; 13,400,000  تومان | [order](https://my.hostida.com/cart.php?a=add&pid=735) |
| IR AsiaTech 6 | 2 هسته | 6 گیگابایت DDR3 | 50 گیگابایت SSD | 100 گیگابایت | 1,600,000  تومان; 4,600,000  تومان; 8,700,000  تومان; 15,500,000  تومان | [order](https://my.hostida.com/cart.php?a=add&pid=736) |
| IR AsiaTech 8 | 3 هسته | 8 گیگابایت DDR3 | 60 گیگابایت SSD | 100 گیگابایت | 2,000,000  تومان; 5,830,000  تومان; 11,000,000  تومان; 19,650,000  تومان | [order](https://my.hostida.com/cart.php?a=add&pid=737) |
| IR AsiaTech 10 | 3 هسته | 10 گیگابایت DDR3 | 70 گیگابایت SSD | 100 گیگابایت | 2,260,000  تومان; 6,440,000  تومان; 12,200,000  تومان; 21,690,000  تومان | [order](https://my.hostida.com/cart.php?a=add&pid=738) |

| Plan / DC family | CPU | RAM | Disk | Traffic | Totals: 1 / 3 / 6 / 12 months (toman) | Handoff |
| --- | --- | --- | --- | --- | --- | --- |
| IR Respina 1 | 1 هسته | 2 گیگابایت DDR3 | 20 گیگابایت SSD | 100 گیگابایت | 949,000  تومان; 2,704,650  تومان; 5,124,600  تومان; 9,679,800  تومان | [order](https://my.hostida.com/cart.php?a=add&pid=739) |
| IR Respina 2 | 2 هسته | 4 گیگابایت DDR3 | 30 گیگابایت SSD | 100 گیگابایت | 1,250,000  تومان; 3,562,500  تومان; 6,750,000  تومان; 12,750,000  تومان | [order](https://my.hostida.com/cart.php?a=add&pid=740) |
| IR Respina 4 | 3 هسته | 6 گیگابایت DDR3 | 40 گیگابایت SSD | 100 گیگابایت | 1,850,000  تومان; 5,272,500  تومان; 9,990,000  تومان; 18,870,000  تومان | [order](https://my.hostida.com/cart.php?a=add&pid=741) |
| IR Respina 6 | 4 هسته | 8 گیگابایت DDR3 | 50 گیگابایت SSD | 100 گیگابایت | 2,050,000  تومان; 5,842,500  تومان; 11,070,000  تومان; 20,910,000  تومان | [order](https://my.hostida.com/cart.php?a=add&pid=742) |
| IR Respina 8 | 5 هسته | 10 گیگابایت DDR3 | 60 گیگابایت SSD | 100 گیگابایت | 2,450,000  تومان; 6,982,500  تومان; 13,230,000  تومان; 24,990,000  تومان | [order](https://my.hostida.com/cart.php?a=add&pid=743) |
| IR Respina 10 | 6 هسته | 12 گیگابایت DDR3 | 70 گیگابایت SSD | 100 گیگابایت | 2,750,000  تومان; 7,837,500  تومان; 14,850,000  تومان; 28,050,000  تومان | [order](https://my.hostida.com/cart.php?a=add&pid=744) |
| IR Respina 16 | 7 هسته | 16 گیگابایت DDR3 | 100 گیگابایت SSD | 100 گیگابایت | 4,450,000  تومان; 12,682,500  تومان; 24,030,000  تومان; 45,390,000  تومان | [order](https://my.hostida.com/cart.php?a=add&pid=750) |

## Hostida — all 6 unlimited NVMe cloud configurations

First-party source and handoff: [https://hostida.com/cloud/iran/](https://hostida.com/cloud/iran/). Raw: [hostida-cloud.html](evidence/vps-additional-2026-10-29/hostida-cloud.html).

Separate family linked from metered VPS page. All six explicitly تکمیل ظرفیت (full capacity): retain evidence, exclude from current available choice. DDR4, NVMe, shared 10 Gbit/s, unlimited traffic conditional on 1:10 consumption. Do not translate unlimited into unconditional traffic. Six-month Cloud 6 price is published as 268,000,000; preserve apparent anomaly rather than repair it. All billing totals below are copied.

| Plan | CPU | RAM | Disk | Totals: 1 / 3 / 6 / 12 months (toman) | Status |
| --- | --- | --- | --- | --- | --- |
| IR NVMe Cloud 2 | 2 هسته | 2 گیگابایت DDR4 | 40 گیگابایت NVMe | 2,790,000  تومان; 7,960,000  تومان; 15,000,000  تومان; 28,480,000  تومان | unavailable |
| IR NVMe Cloud 4 | 3 هسته | 4 گیگابایت DDR4 | 60 گیگابایت NVMe | 3,730,000  تومان; 10,630,000  تومان; 20,100,000  تومان; 38,000,000  تومان | unavailable |
| IR NVMe Cloud 6 | 4 هسته | 6 گیگابایت DDR4 | 80 گیگابایت NVMe | 4,970,000  تومان; 14,170,000  تومان; 268,000,000  تومان; 50,700,000  تومان | unavailable |
| IR NVMe Cloud 8 | 6 هسته | 8 گیگابایت DDR4 | 120 گیگابایت NVMe | 6,000,000  تومان; 17,300,000  تومان; 32,760,000  تومان; 61,890,000  تومان | unavailable |
| IR NVMe Cloud 12 | 8 هسته | 12 گیگابایت DDR4 | 150 گیگابایت NVMe | 8,100,000  تومان; 23,100,000  تومان; 43,700,000  تومان; 82,600,000  تومان | unavailable |
| IR NVMe Cloud 16 | 10 هسته | 16 گیگابایت DDR4 | 200 گیگابایت NVMe | 10,580,000  تومان; 30,180,000  تومان; 57,180,000  تومان; 108,000,000  تومان | unavailable |

## HiData — all 19 NVMe store configurations

First-party source and handoff: [https://my.hidata.org/store/iran-nvme-vps](https://my.hidata.org/store/iran-nvme-vps). Raw: [hidata-store.html](evidence/vps-additional-2026-10-29/hidata-store.html).

Followed [eight-card landing page](https://hidata.org/vps/iran-nvme/) → “more plans” public store. Store expands through 32 GB RAM, without inventing interpolated 17/18/19/21 GB sizes. Prices agree with live landing cards; the landing FAQ still says 520,000 while the live 1 GB card/store says 650,000. Use card/store tariffs. NVMe, KVM, DDR4, 10 Gbit/s; landing says reserved RAM/disk but shared CPU, included fixed IPv4 and IPv6 subnet; upload unlimited, quotas are download into server, resets first of calendar month, download throttles to 3 Mbit/s when quota exhausted. No provider backups: customer responsibility. Store UI top currency selector says IRR, but actual plan price explicitly says toman, with landing JSON-LD IRR at ten times the toman amount confirming display unit. No tax/mandatory-extra completeness claim.

| Plan | CPU cores as advertised | RAM GB (unless stated) | Disk capacity / published type | Published monthly base price, toman unless stated | Traffic | Admission assessment |
| --- | --- | --- | --- | --- | --- | --- |
| [IR-NVMe-1GB](https://my.hidata.org/store/iran-nvme-vps/ir-nvme-1gb) | 1 | 1 | 30 GB NVMe | 650,000 | 100 GB download | 36 stock; reviewable base |
| [IR-NVMe-2GB](https://my.hidata.org/store/iran-nvme-vps/ir-nvme-2gb) | 1 | 2 | 45 GB NVMe | 810,000 | 250 GB download | 22 stock; reviewable base |
| [IR-NVMe-3GB](https://my.hidata.org/store/iran-nvme-vps/ir-nvme-3gb) | 2 | 3 | 60 GB NVMe | 1,130,000 | 500 GB download | 17 stock; reviewable base |
| [IR-NVMe-4GB](https://my.hidata.org/store/iran-nvme-vps/ir-nvme-4gb) | 2 | 4 | 75 GB NVMe | 1,290,000 | 750 GB download | 13 stock; reviewable base |
| [IR-NVMe-5GB](https://my.hidata.org/store/iran-nvme-vps/ir-nvme-5gb) | 3 | 5 | 90 GB NVMe | 1,610,000 | 1000 GB download | 9 stock; reviewable base |
| [IR-NVMe-6GB](https://my.hidata.org/store/iran-nvme-vps/ir-nvme-6gb) | 3 | 6 | 105 GB NVMe | 1,770,000 | 1250 GB download | 8 stock; reviewable base |
| [IR-NVMe-7GB](https://my.hidata.org/store/iran-nvme-vps/ir-nvme-7gb) | 4 | 7 | 120 GB NVMe | 2,090,000 | 1500 GB download | 5 stock; reviewable base |
| [IR-NVMe-8GB](https://my.hidata.org/store/iran-nvme-vps/ir-nvme-8gb) | 4 | 8 | 135 GB NVMe | 2,250,000 | 1750 GB download | 5 stock; reviewable base |
| [IR-NVMe-9GB](https://my.hidata.org/store/iran-nvme-vps/ir-nvme-9gb) | 5 | 9 | 150 GB NVMe | 2,570,000 | 2000 GB download | 5 stock; reviewable base |
| [IR-NVMe-10GB](https://my.hidata.org/store/iran-nvme-vps/ir-nvme-10gb) | 5 | 10 | 165 GB NVMe | 2,730,000 | 2250 GB download | 4 stock; reviewable base |
| [IR-NVMe-11GB](https://my.hidata.org/store/iran-nvme-vps/ir-nvme-11gb) | 6 | 11 | 180 GB NVMe | 3,050,000 | 2500 GB download | 4 stock; reviewable base |
| [IR-NVMe-12GB](https://my.hidata.org/store/iran-nvme-vps/ir-nvme-12gb) | 6 | 12 | 195 GB NVMe | 3,210,000 | 2750 GB download | 4 stock; reviewable base |
| [IR-NVMe-13GB](https://my.hidata.org/store/iran-nvme-vps/ir-nvme-13gb) | 7 | 13 | 210 GB NVMe | 3,530,000 | 3000 GB download | 4 stock; reviewable base |
| [IR-NVMe-14GB](https://my.hidata.org/store/iran-nvme-vps/ir-nvme-14gb) | 7 | 14 | 225 GB NVMe | 3,690,000 | 3250 GB download | 3 stock; reviewable base |
| [IR-NVMe-15GB](https://my.hidata.org/store/iran-nvme-vps/ir-nvme-15gb) | 8 | 15 | 240 GB NVMe | 4,010,000 | 3500 GB download | 2 stock; reviewable base |
| [IR-NVMe-16GB](https://my.hidata.org/store/iran-nvme-vps/ir-nvme-16gb) | 8 | 16 | 255 GB NVMe | 4,170,000 | 3750 GB download | 1 stock; reviewable base |
| [IR-NVMe-20GB](https://my.hidata.org/store/iran-nvme-vps/ir-nvme-20gb) | 10 | 20 | 315 GB NVMe | 5,130,000 | 4750 GB download | 0 stock; unavailable |
| [IR-NVMe-24GB](https://my.hidata.org/store/iran-nvme-vps/ir-nvme-24gb) | 12 | 24 | 375 GB NVMe | 6,090,000 | 5750 GB download | 1 stock; reviewable base |
| [IR-NVMe-32GB](https://my.hidata.org/store/iran-nvme-vps/ir-nvme-32gb) | 16 | 32 | 495 GB NVMe | 8,010,000 | 7750 GB download | 0 stock; unavailable |

## HiData — all 8 SATA store configurations

First-party source and handoff: [https://my.hidata.org/store/ir-sata-vps](https://my.hidata.org/store/ir-sata-vps). Raw: [hidata-sata-store.html](evidence/vps-additional-2026-10-29/hidata-sata-store.html).

Followed [SATA tariff page](https://hidata.org/vps/iran-sata/) to its public store. Eight rows only; no “more plans” omitted beyond the store. Store disk label “Enterprise”, product/landing explicitly SATA: retain SATA, do not infer SSD/HDD. KVM, DDR4, 10 Gbit/s, reserved resources, Iran. Upload unlimited, published download quotas; separate monthly and 3-month landing totals equal 3× monthly (1,350,000; 1,680,000; 2,340,000; 2,670,000; 3,330,000; 3,660,000; 4,320,000; 4,650,000). IPv4 inclusion not established for this family by its cards. Base/tax completeness unknown.

| Plan | CPU cores as advertised | RAM GB (unless stated) | Disk capacity / published type | Published monthly base price, toman unless stated | Traffic | Admission assessment |
| --- | --- | --- | --- | --- | --- | --- |
| [IR-SATA-1GB](https://my.hidata.org/store/ir-sata-vps/ir-sata-1gb) | 1 | 1 | 60 GB SATA (medium unknown) | 450,000 | 250 GB download | 21 stock; reviewable base |
| [IR-SATA-2GB](https://my.hidata.org/store/ir-sata-vps/ir-sata-2gb) | 1 | 2 | 120 GB SATA (medium unknown) | 560,000 | 500 GB download | 10 stock; reviewable base |
| [IR-SATA-3GB](https://my.hidata.org/store/ir-sata-vps/ir-sata-3gb) | 2 | 3 | 180 GB SATA (medium unknown) | 780,000 | 750 GB download | 6 stock; reviewable base |
| [IR-SATA-4GB](https://my.hidata.org/store/ir-sata-vps/ir-sata-4gb) | 2 | 4 | 240 GB SATA (medium unknown) | 890,000 | 1000 GB download | 4 stock; reviewable base |
| [IR-SATA-5GB](https://my.hidata.org/store/ir-sata-vps/ir-sata-5gb) | 3 | 5 | 300 GB SATA (medium unknown) | 1,110,000 | 1250 GB download | 3 stock; reviewable base |
| [IR-SATA-6GB](https://my.hidata.org/store/ir-sata-vps/ir-sata-6gb) | 3 | 6 | 360 GB SATA (medium unknown) | 1,220,000 | 1500 GB download | 3 stock; reviewable base |
| [IR-SATA-7GB](https://my.hidata.org/store/ir-sata-vps/ir-sata-7gb) | 4 | 7 | 420 GB SATA (medium unknown) | 1,440,000 | 1750 GB download | 3 stock; reviewable base |
| [IR-SATA-8GB](https://my.hidata.org/store/ir-sata-vps/ir-sata-8gb) | 4 | 8 | 480 GB SATA (medium unknown) | 1,550,000 | 2000 GB download | 1 stock; reviewable base |

## Famaserver — all 25 fixed Iran configurations

First-party source and handoff: [https://famaserver.com/vps/iran/](https://famaserver.com/vps/iran/). Raw: [famaserver-iran.html](evidence/vps-additional-2026-10-29/famaserver-iran.html).

Followed [VPS overview](https://famaserver.com/vps/) to Iran tariff page. All 25 cards included, including high-RAM, CPU and mixed-disk families hidden by category filters; card `data-bprice` and displayed monthly amount agree. CPU series GOLD/E5 v4 and OS remain separate facts. Cards explicitly label SSD; generic prose also mentions SSD/NVMe, which does not map NVMe to individual cards. Use card SSD type, never upgrade to NVMe. KVM; cards state Iran, dedicated IP, VNC/rebuild and dedicated resources. Tax, IPv4 version, traffic direction/ratio and license fees unknown. Longer-cycle controls advertise 10/20/30% discounts; only explicit monthly base prices transcribed, no invented cycle totals. Mixed-disk rows retain each disk and source TB units; no summed single disk capacity. Names starting `trvps` still explicitly say Iran: do not infer Turkey from name. Rows 19–21 have HDD family names but displayed SSD capacity (and HDD 0 on 19/21), so hold their disk identity for reconciliation. Rows 22–25 are explicit mixed SSD + HDD, not exact matches to a single SSD disk.

| Plan | CPU cores as advertised | RAM GB (unless stated) | Disk capacity / published type | Published monthly base price, toman unless stated | Traffic | Admission assessment |
| --- | --- | --- | --- | --- | --- | --- |
| [irvps1_Linux](https://crm.famaserver.com/store/vps-iran/irvps1-linux) | 1 vCPU | 1 GB DDR4 | 25 GB SSD | 680,000 | 150 GB | GOLD; Linux; reviewable base |
| [irvps2_Linux](https://crm.famaserver.com/store/vps-iran/irvps2-linux) | 1 vCPU | 2 GB DDR4 | 35 GB SSD | 730,000 | 150 GB | GOLD; Linux; reviewable base |
| [irvps3_Linux](https://crm.famaserver.com/store/vps-iran/irvps3-linux) | 2 vCPU | 2 GB DDR4 | 50 GB SSD | 930,000 | 150 GB | GOLD; Linux; reviewable base |
| [irvps4_Linux](https://crm.famaserver.com/store/vps-iran/irvps4-linux) | 2 vCPU | 4 GB DDR4 | 60 GB SSD | 1,199,000 | 150 GB | E5 v4; Linux; reviewable base |
| [irvps5_Linux](https://crm.famaserver.com/store/vps-iran/irvps5-linux) | 4 vCPU | 8 GB DDR4 | 100 GB SSD | 1,999,000 | 300 GB | E5 v4; Linux; reviewable base |
| [irvps6_Linux](https://crm.famaserver.com/store/vps-iran/irvps6-linux) | 8 vCPU | 16 GB DDR4 | 150 GB SSD | 3,999,000 | 300 GB | E5 v4; Linux; reviewable base |
| [irvps7_Windows](https://crm.famaserver.com/store/vps-iran/irvps7-windows) | 2 vCPU | 4 GB DDR4 | 60 GB SSD | 1,199,000 | 200 GB | GOLD; Windows; reviewable base |
| [irvps8_Windows](https://crm.famaserver.com/store/vps-iran/irvps8-windows) | 4 vCPU | 8 GB DDR4 | 100 GB SSD | 1,999,000 | 300 GB | GOLD; Windows; reviewable base |
| [irvps9_Windows](https://crm.famaserver.com/store/vps-iran/irvps9-windows) | 8 vCPU | 16 GB DDR4 | 150 GB SSD | 3,999,000 | 300 GB | E5 v4; Windows; reviewable base |
| [irvps10_Windows](https://crm.famaserver.com/store/vps-iran/irvps10-windows) | 16 vCPU | 32 GB DDR4 | 300 GB SSD | 5,999,000 | 400 GB | E5 v4; Windows; reviewable base |
| [irvps11_RAM](https://crm.famaserver.com/store/vps-iran/irvps11-ram) | 3 vCPU | 8 GB DDR4 | 60 GB SSD | 1,999,000 | 300 GB | GOLD; ; reviewable base |
| [irvps12_RAM](https://crm.famaserver.com/store/vps-iran/irvps12-ram) | 4 vCPU | 16 GB DDR4 | 100 GB SSD | 2,200,000 | 500 GB | E5 v4; ; reviewable base |
| [irvps13_RAM](https://crm.famaserver.com/store/vps-iran/irvps13-ram) | 6 vCPU | 32 GB DDR4 | 300 GB SSD | 4,900,000 | 1 TB | E5 v4; ; reviewable base |
| [irvps14_RAM](https://crm.famaserver.com/store/vps-iran/irvps14-ram) | 8 vCPU | 64 GB DDR4 | 300 GB SSD | 9,850,000 | 1 TB | E5 v4; ; reviewable base |
| [irvps15_CPU](https://crm.famaserver.com/store/vps-iran/irvps15-cpu) | 8 vCPU | 4 GB DDR4 | 60 GB SSD | 4,500,000 | 300 GB | GOLD; ; reviewable base |
| [irvps16_CPU](https://crm.famaserver.com/store/vps-iran/irvps16-cpu) | 16 vCPU | 8 GB DDR4 | 100 GB SSD | 7,920,000 | 500 GB | GOLD; ; reviewable base |
| [irvps17_CPU](https://crm.famaserver.com/store/vps-iran/irvps17-cpu) | 24 vCPU | 10 GB DDR4 | 150 GB SSD | 12,850,000 | 1 TB | GOLD; ; reviewable base |
| [irvps18_CPU](https://crm.famaserver.com/store/vps-iran/irvps18-cpu) | 48 vCPU | 16 GB DDR4 | 300 GB SSD | 19,450,000 | 2 TB | GOLD; ; reviewable base |
| [trvps19-HDD](https://crm.famaserver.com/store/vps-iran/irvps19-hdd) | 2 vCPU | 4 GB DDR4 | 300 GB SSD + 0 HDD | 2,800,000 | 500 GB | GOLD; ; hold disk-family conflict |
| [trvps20-HDD](https://crm.famaserver.com/store/vps-iran/irvps20-hdd) | 2 vCPU | 6 GB DDR4 | 500 GB SSD | 3,550,000 | 1 TB | GOLD; ; hold disk-family conflict |
| [trvps21-HDD](https://crm.famaserver.com/store/vps-iran/irvps21-hdd) | 4 vCPU | 8 GB DDR4 | 1 TB SSD + 0 HDD | 6800000 | 2 TB | E5 v4; ; hold disk-family conflict |
| [trvps22-HDD](https://crm.famaserver.com/store/vps-iran/irvps22-hdd) | 8 vCPU | 16 GB DDR4 | 500 GB SSD + 1 TB HDD | 9,500,000 | 3 TB | E5 v4; ; reviewable mixed disks; schema decision |
| [trvps23-HDD](https://crm.famaserver.com/store/vps-iran/irvps23-hdd) | 8 vCPU | 16 GB DDR4 | 1 TB SSD + 2 TB HDD | 14,800,000 | 4 TB | E5 v4; ; reviewable mixed disks; schema decision |
| [trvps24-HDD](https://crm.famaserver.com/store/vps-iran/irvps24-hdd) | 16 vCPU | 32 GB DDR4 | 500 GB SSD + 3 TB HDD | 18,700,000 | 5 TB | E5 v4; ; reviewable mixed disks; schema decision |
| [trvps25-HDD](https://crm.famaserver.com/store/vps-iran/irvps25-hdd) | 32 vCPU | 64 GB DDR4 | 4 TB SSD + 8 TB HDD | 29,200,000 | نامحدود | GOLD; ; unavailable |

## Logicserver — all 5 Iran SSD configurations

First-party source and handoff: [https://logicserver.org/iran-vps/](https://logicserver.org/iran-vps/). Raw: [logicserver.html](evidence/vps-additional-2026-10-29/logicserver.html).

KVM, one included dedicated IPv4 per plan, free IPv6 advertised, instant activation, Ubuntu/Debian/AlmaLinux. Automatic backups claimed but retention/scope/restore fees unknown. Numeric monthly prices explicit; annual discount advertised without numeric tariff. No tax/mandatory-extra completeness claim.

| Plan | CPU cores as advertised | RAM GB (unless stated) | Disk capacity / published type | Published monthly base price, toman unless stated | Traffic | Admission assessment |
| --- | --- | --- | --- | --- | --- | --- |
| [Iran 1](https://crm.logicserver.org/index.php?rp=/store/iran-ssd/plan1) | 1 | 1 | 30 GB SSD | 269,000 | 100 GB | reviewable base |
| [Iran 2](https://crm.logicserver.org/index.php?rp=/store/iran-ssd/plan2) | 2 | 3 | 40 GB SSD | 309,000 | 200 GB | reviewable base |
| [Iran 3](https://crm.logicserver.org/index.php?rp=/store/iran-ssd/plan3) | 2 | 4 | 50 GB SSD | 349,000 | 300 GB | reviewable base |
| [Iran 4](https://crm.logicserver.org/index.php?rp=/store/iran-ssd/plan4) | 3 | 6 | 70 GB SSD | 449,000 | 500 GB | reviewable base |
| [Iran 5](https://crm.logicserver.org/index.php?rp=/store/iran-ssd/plan5) | 4 | 8 | 100 GB SSD | 609,000 | 700 GB | reviewable base |

## Spadserver — all 9 Iran SSD configurations

First-party source and handoff: [https://crm.spadserver.com/store/iran-vps](https://crm.spadserver.com/store/iran-vps). Raw: [spadserver.html](evidence/vps-additional-2026-10-29/spadserver.html).

All store prices explicitly start-from monthly, free setup per card. Traffic 100 GB for plans 1–8; plan 9 says unlimited, conditions unknown. SSD and Iran identified; base IPv4 and tax unknown. No inference that unlimited and metered tariffs have identical effective cost.

| Plan | CPU cores as advertised | RAM GB (unless stated) | Disk capacity / published type | Published monthly base price, toman unless stated | Traffic | Admission assessment |
| --- | --- | --- | --- | --- | --- | --- |
| [plan 1](https://crm.spadserver.com/store/iran-vps/pln1) | 2 | 2 | 35 GB SSD | 849,900 | 100 GB | reviewable base; setup free |
| [plan 2](https://crm.spadserver.com/store/iran-vps/pln2) | 2 | 4 | 45 GB SSD | 1,108,900 | 100 GB | reviewable base; setup free |
| [plan 3](https://crm.spadserver.com/store/iran-vps/pln3) | 4 | 8 | 55 GB SSD | 1,347,900 | 100 GB | reviewable base; setup free |
| [plan 4](https://crm.spadserver.com/store/iran-vps/pln4) | 6 | 10 | 85 GB SSD | 1,928,900 | 100 GB | reviewable base; setup free |
| [plan 5](https://crm.spadserver.com/store/iran-vps/pln5) | 6 | 12 | 115 GB SSD | 2,454,900 | 100 GB | reviewable base; setup free |
| [plan 6](https://crm.spadserver.com/store/iran-vps/pln6) | 8 | 16 | 130 GB SSD | 3,055,900 | 100 GB | reviewable base; setup free |
| [plan 7](https://crm.spadserver.com/store/iran-vps/pln7) | 8 | 20 | 150 GB SSD | 3,505,900 | 100 GB | reviewable base; setup free |
| [plan 8](https://crm.spadserver.com/store/iran-vps/pln8) | 10 | 24 | 180 GB SSD | 5,083,900 | 100 GB | reviewable base; setup free |
| [plan 9](https://crm.spadserver.com/store/iran-vps/pln9) | 12 | 24 | 200 GB SSD | 6,660,900 | unlimited (conditions unknown) | reviewable base; setup free |

## Shetabanhost — all 4 RSP Iran NVMe configurations

First-party source and handoff: [https://shetabanhost.com/vps/iran-ssd/](https://shetabanhost.com/vps/iran-ssd/). Raw: [shetabanhost.html](evidence/vps-additional-2026-10-29/shetabanhost.html).

Monthly base amounts, setup 0, one base IP included (version unspecified), 100 GB traffic, 10 Gbit/s, DDR4, Iran. Addons and final amount shown before payment; no total-cost claim. Linux/Windows supported, license costs unknown.

| Plan | CPU cores as advertised | RAM GB (unless stated) | Disk capacity / published type | Published monthly base price, toman unless stated | Traffic | Admission assessment |
| --- | --- | --- | --- | --- | --- | --- |
| RSP-2GB | 2 | 2 | 20 GB NVMe | 559,000 | 100 GB | reviewable base; setup free |
| RSP-4GB | 3 | 4 | 30 GB NVMe | 739,000 | 100 GB | reviewable base; setup free |
| RSP-6GB | 4 | 6 | 50 GB NVMe | 909,000 | 100 GB | reviewable base; setup free |
| RSP-8GB | 6 | 8 | 80 GB NVMe | 1,179,000 | 100 GB | reviewable base; setup free |

## Azardata — all 5 Iran NVMe configurations

First-party source and handoff: [https://azardata.net/vps/nvme/iran/](https://azardata.net/vps/nvme/iran/). Raw: [azardata.html](evidence/vps-additional-2026-10-29/azardata.html).

Iran Asiatech, NVMe explicit, 1 Gbit/s port, dedicated IP, Linux/Windows, monthly toman. Introduction says unlimited bandwidth but each plan has a finite traffic quota: use finite quotas, preserve contradiction. Prices differ from search index; values below come from raw live cards. Tax/license inclusion unknown.

| Plan | CPU cores as advertised | RAM GB (unless stated) | Disk capacity / published type | Published monthly base price, toman unless stated | Traffic | Admission assessment |
| --- | --- | --- | --- | --- | --- | --- |
| NVMe plan 1 | 2 | 4 | 30 GB NVMe | 1,799,000 | 100 GB | reviewable base |
| NVMe plan 2 | 3 | 6 | 60 GB NVMe | 2,599,000 | 200 GB | reviewable base |
| NVMe plan 3 | 4 | 8 | 80 GB NVMe | 3,450,000 | 500 GB | reviewable base |
| NVMe plan 4 | 6 | 16 | 160 GB NVMe | 6,799,000 | 1 TB | reviewable base |
| NVMe plan 5 | 8 | 32 | 320 GB NVMe | 11,598,000 | 2 TB | reviewable base |

## OnlineServer — all 4 SATA Iran configurations

First-party source and handoff: [https://onlineserver.ir/virtual-server/iran-virtual-server](https://onlineserver.ir/virtual-server/iran-virtual-server). Raw: [onlineserver-iran.html](evidence/vps-additional-2026-10-29/onlineserver-iran.html).

VMware; all-plan facts explicitly map disk type to this product family, datacenters Soroush Resaneh/Shatel, Iran, upload unlimited/free, only download into server consumes quota. Prices exclude VAT. Extra download: ordinary 1,600,000 toman/TB and 160,000/100 GB, time-limited 1,200,000/TB and 120,000/100 GB. Base IPv4 and other mandatory fees unknown. Both families must remain distinct even when resources match. Homepage snippets are consolidated into these full product pages.

| Plan | CPU cores as advertised | RAM GB (unless stated) | Disk capacity / published type | Published monthly base price, toman unless stated | Traffic | Admission assessment |
| --- | --- | --- | --- | --- | --- | --- |
| plan 1 | 2 | 2 | 35 GB SATA | 618,000 | 60 GB download | reviewable base; VAT extra |
| plan 2 | 3 | 3 | 50 GB SATA | 765,000 | 90 GB download | reviewable base; VAT extra |
| plan 3 | 4 | 4 | 60 GB SATA | 882,000 | 120 GB download | reviewable base; VAT extra |
| plan 4 | 8 | 8 | 120 GB SATA | 1,588,500 | 250 GB download | reviewable base; VAT extra |

## OnlineServer — all 4 SSD Iran configurations

First-party source and handoff: [https://onlineserver.ir/virtual-server/iran-virtual-ssd-server](https://onlineserver.ir/virtual-server/iran-virtual-ssd-server). Raw: [onlineserver-ssd.html](evidence/vps-additional-2026-10-29/onlineserver-ssd.html).

VMware; all-plan facts explicitly map disk type to this product family, datacenters Soroush Resaneh/Shatel, Iran, upload unlimited/free, only download into server consumes quota. Prices exclude VAT. Extra download: ordinary 1,600,000 toman/TB and 160,000/100 GB, time-limited 1,200,000/TB and 120,000/100 GB. Base IPv4 and other mandatory fees unknown. Both families must remain distinct even when resources match. Homepage snippets are consolidated into these full product pages.

| Plan | CPU cores as advertised | RAM GB (unless stated) | Disk capacity / published type | Published monthly base price, toman unless stated | Traffic | Admission assessment |
| --- | --- | --- | --- | --- | --- | --- |
| plan 1 | 2 | 2 | 35 GB SSD | 811,500 | 60 GB download | reviewable base; VAT extra |
| plan 2 | 3 | 3 | 50 GB SSD | 1,059,000 | 90 GB download | reviewable base; VAT extra |
| plan 3 | 4 | 4 | 60 GB SSD | 1,482,500 | 120 GB download | reviewable base; VAT extra |
| plan 4 | 8 | 8 | 120 GB SSD | 2,400,000 | 250 GB download | reviewable base; VAT extra |

## Mobinhost — all 18 Iran fixed cards across 3 traffic families

First-party source and handoff: [https://www.mobinhost.com/vps-iran/](https://www.mobinhost.com/vps-iran/). Raw: [mobinhost.html](evidence/vps-additional-2026-10-29/mobinhost.html).

SSD, Iran, fixed internal IP, root/admin; metered and macro port 10 Gbit/s. Preserve separate unlimited and metered cards. For prices rendered `1,395 میلیون` etc, the UI literally mixes a comma-separated numeral and “million”; below retain the raw display rather than silently interpreting 1,395 as 1.395. Small `795 هزار` and `995 هزار` amounts are unambiguous. Unlimited cards offer selectable bandwidth: mandatory bandwidth price/completeness unresolved. High-price cards need order-page unit clarification before numeric catalog admission. No checkout requested.

| Plan | CPU cores as advertised | RAM GB (unless stated) | Disk capacity / published type | Published monthly base price, toman unless stated | Traffic | Admission assessment |
| --- | --- | --- | --- | --- | --- | --- |
| metered 2GB | 1 | 2 | 25 GB SSD | 695 thousand toman | 100 GB | unavailable |
| metered 4GB | 2 | 4 | 40 GB SSD | 795 thousand toman | 100 GB | reviewable base |
| metered 6GB | 3 | 6 | 50 GB SSD | 995 thousand toman | 100 GB | reviewable base |
| metered 8GB | 4 | 8 | 60 GB SSD | 1,395 million toman | 100 GB | hold price-unit ambiguity |
| metered 12GB | 4 | 12 | 80 GB SSD | 1,595 million toman | 100 GB | hold price-unit ambiguity |
| metered 16GB | 6 | 16 | 100 GB SSD | 1,795 million toman | 100 GB | hold price-unit ambiguity |
| unlimited 4GB | 2 | 4 | 40 GB SSD | 795 thousand toman | unlimited | hold bandwidth final price |
| unlimited 6GB | 3 | 6 | 50 GB SSD | 995 thousand toman | unlimited | hold bandwidth final price |
| unlimited 8GB | 4 | 8 | 60 GB SSD | 1,395 million toman | unlimited | hold price-unit ambiguity |
| unlimited 12GB | 4 | 12 | 80 GB SSD | 1,595 million toman | unlimited | hold price-unit ambiguity |
| unlimited 16GB | 6 | 16 | 100 GB SSD | 1,995 million toman | unlimited | hold price-unit ambiguity |
| macro 16GB | 8 | 16 | 150 GB SSD | 3,040 million toman | 1024 GB | hold price-unit ambiguity |
| macro 24GB | 12 | 24 | 200 GB SSD | 4,090 million toman | 1024 GB | hold price-unit ambiguity |
| macro 32GB | 16 | 32 | 250 GB SSD | 5,020 million toman | 1024 GB | hold price-unit ambiguity |
| macro 48GB | 24 | 48 | 300 GB SSD | 5,990 million toman | 1024 GB | hold price-unit ambiguity |
| macro 64GB | 32 | 64 | 350 GB SSD | 7,090 million toman | 1024 GB | hold price-unit ambiguity |
| macro 128GB | 40 | 128 | 400 GB SSD | 8,440 million toman | 1024 GB | unavailable |
| macro 256GB | 40 | 256 | 700 GB SSD | 10,490 million toman | 1024 GB | unavailable |

## Shopingserver — all 4 Iran configurations, exact disk subtype held

First-party source and handoff: [https://shopingserver.com/vps/iran-vps/](https://shopingserver.com/vps/iran-vps/). Raw: [shopingserver.html](evidence/vps-additional-2026-10-29/shopingserver.html).

Asiatech/Zirsakht, DDR4, Linux/Windows, 1000 Mb port. Wide cards label disk SSD while duplicate narrow cards label same capacity NVMe; family heading/name NVMe. Preserve as SSD / NVMe ambiguity, do not claim type-exact overlap. Numeric live tariffs differ from search excerpts. Annual totals copied; source says 15% discount but annual equals 10× monthly: do not recompute. Extra IP 500,000 toman, 100 GB extra disk 1,000,000, 1 TB extra traffic 150,000. Footnote says Iran traffic 200 GB but individual plans say 200/400/600/600: preserve discrepancy. Tax/base-IP/license unknown.

| Plan | CPU cores as advertised | RAM GB (unless stated) | Disk capacity / published type | Published monthly base price, toman unless stated | Traffic | Admission assessment |
| --- | --- | --- | --- | --- | --- | --- |
| VPS 2048 NVMe | 2 | 2 | 40 GB SSD / NVMe conflict | 1,300,000 (annual 13,000,000) | 200 GB card | hold disk subtype conflict |
| VPS 4096 NVMe | 3 | 4 | 40 GB SSD / NVMe conflict | 1,700,000 (annual 17,000,000) | 400 GB card | hold disk subtype conflict |
| VPS 8192 NVMe | 4 | 8 | 40 GB SSD / NVMe conflict | 2,700,000 (annual 27,000,000) | 600 GB card | hold disk subtype conflict |
| VDS NVMe | 4 | 12 | 80 GB SSD / NVMe conflict | 3,200,000 (annual 32,000,000) | 600 GB card | hold disk subtype conflict |

## Visnet — all 5 published Iran NVMe configurations, handoff held

First-party source and handoff: [https://host.visnet.ir/%D8%B3%D8%B1%D9%88%D8%B1-%D9%85%D8%AC%D8%A7%D8%B2%DB%8C-%D8%A7%DB%8C%D8%B1%D8%A7%D9%86/](https://host.visnet.ir/%D8%B3%D8%B1%D9%88%D8%B1-%D9%85%D8%AC%D8%A7%D8%B2%DB%8C-%D8%A7%DB%8C%D8%B1%D8%A7%D9%86/). Raw: [visnet.html](evidence/vps-additional-2026-10-29/visnet.html).

Monthly header, Iran product page, NVME explicit; published “real processor” claim retained as claim, not benchmark. Every plan buy href is empty, so no working per-plan purchase handoff verified. Traffic/IP/tax unknown. Preserve rows but resolve handoff before usable catalog admission.

| Plan | CPU cores as advertised | RAM GB (unless stated) | Disk capacity / published type | Published monthly base price, toman unless stated | Traffic | Admission assessment |
| --- | --- | --- | --- | --- | --- | --- |
| row 1 | 1 | 512 MB | 10 GB NVMe | 223,000 | unknown | hold empty order href |
| row 2 | 1 | 1 | 25 GB NVMe | 270,000 | unknown | hold empty order href |
| row 3 | 2 | 2 | 50 GB NVMe | 378,000 | unknown | hold empty order href |
| row 4 | 4 | 4 | 80 GB NVMe | 599,000 | unknown | hold empty order href |
| row 5 | 8 | 8 | 160 GB NVMe | 966,000 | unknown | hold empty order href |

## Pouyasazan — all 6 Iran configurations, storage type unknown

First-party source and handoff: [https://panel.pouyasazan.org/store/iran-vps](https://panel.pouyasazan.org/store/iran-vps). Raw: [pouyasazan.html](evidence/vps-additional-2026-10-29/pouyasazan.html).

Monthly toman, unlimited traffic claim, Iran product group. Six raw live tariffs differ from cached search results. Cards say hard drive capacity without medium/type; do not borrow SSD from another provider. Hold exact-type grouping, parent may admit with unknown type if catalog rule permits. Store footer generic “free setup” appears in cart recommendation modal and is not plan-specific proof of zero setup.

| Plan | CPU cores as advertised | RAM GB (unless stated) | Disk capacity / published type | Published monthly base price, toman unless stated | Traffic | Admission assessment |
| --- | --- | --- | --- | --- | --- | --- |
| [VIR1](https://panel.pouyasazan.org/store/iran-vps/vir1) | 1 | 1 | 20 GB unknown type | 2,695,000 | unlimited (conditions unknown) | hold storage type / review unknown-type base only |
| [VIR2](https://panel.pouyasazan.org/store/iran-vps/vir2) | 2 | 2 | 30 GB unknown type | 3,595,000 | unlimited (conditions unknown) | hold storage type / review unknown-type base only |
| [VIR3](https://panel.pouyasazan.org/store/iran-vps/vir3) | 3 | 3 | 40 GB unknown type | 4,495,000 | unlimited (conditions unknown) | hold storage type / review unknown-type base only |
| [VIR4](https://panel.pouyasazan.org/store/iran-vps/vir4) | 4 | 4 | 50 GB unknown type | 5,345,000 | unlimited (conditions unknown) | hold storage type / review unknown-type base only |
| [VIR5](https://panel.pouyasazan.org/store/iran-vps/vir5) | 5 | 5 | 60 GB unknown type | 6,245,000 | unlimited (conditions unknown) | hold storage type / review unknown-type base only |
| [VIR6](https://panel.pouyasazan.org/store/iran-vps/vir6) | 6 | 6 | 70 GB unknown type | 7,095,000 | unlimited (conditions unknown) | hold storage type / review unknown-type base only |

## Afagh — all 6 Iran configurations, storage type unknown

First-party source and handoff: [https://afagh.info/vps-iran/](https://afagh.info/vps-iran/). Raw: [afagh.html](evidence/vps-additional-2026-10-29/afagh.html).

Page has SSD decorative label but plan cards only “space”; no confident per-plan medium mapping. Monthly toman, 10 Gbit/s. First card explicitly unavailable; five others have order links. Management separate; IP/IPv6 must be discussed with provider but no outreach performed; base inclusion unknown.

| Plan | CPU cores as advertised | RAM GB (unless stated) | Disk capacity / published type | Published monthly base price, toman unless stated | Traffic | Admission assessment |
| --- | --- | --- | --- | --- | --- | --- |
| plan 1 | 1 | 1 | 8 GB unknown type | 350,000 | 100 GB | unavailable |
| plan 2 | 2 | 2 | 10 GB unknown type | 915,000 | 1 TB | hold storage type / review unknown-type base only |
| plan 3 | 3 | 4 | 40 GB unknown type | 1,365,000 | 1 TB | hold storage type / review unknown-type base only |
| plan 4 | 4 | 6 | 60 GB unknown type | 1,715,000 | 1 TB | hold storage type / review unknown-type base only |
| plan 5 | 4 | 8 | 80 GB unknown type | 2,064,000 | 1 TB | hold storage type / review unknown-type base only |
| plan 6 | 8 | 10 | 100 GB unknown type | 2,945,000 | 1 TB | hold storage type / review unknown-type base only |

## Userver — all 13 VPS cards; tariff-unit hold, dedicated servers excluded

First-party source and handoff: [https://userver.ir/vps-iran/](https://userver.ir/vps-iran/). Raw: [userver.html](evidence/vps-additional-2026-10-29/userver.html).

Three physical dedicated-server cards (2×E5, 64/128 GB RAM) excluded from VPS. Include Linux (4), managed VPS (4) and MikroTik (5) below: managed VPS is still compute, not a managed database. All cards show monthly numbers already in hundreds of thousands/millions but label them “thousand toman”; no silent 1000× correction. Hold numeric tariff admission pending public clarification. Product prose variously names Tehran and Qom; retain Iran, exact DC unknown. Dedicated IP advertised for all; upload free, extra download 550,000 toman/TB. Linux/managed/MikroTik license costs and tax unknown; MikroTik cards advertise license, unlimited variants have no numeric throughput guarantee despite name.

| Plan | CPU cores as advertised | RAM GB (unless stated) | Disk capacity / published type | Published monthly base price, toman unless stated | Traffic | Admission assessment |
| --- | --- | --- | --- | --- | --- | --- |
| Linux card 1 | 2 | 2 | 20 GB NVMe | 559000 thousand toman (literal) | 100 GB | hold tariff unit |
| Linux card 2 | 2 | 3 | 25 GB NVMe | 649000 thousand toman (literal) | 300 GB | hold tariff unit |
| Linux card 3 | 4 | 4 | 30 GB NVMe | 999000 thousand toman (literal) | 500 GB | hold tariff unit |
| Linux card 4 | 6 | 8 | 40 GB NVMe | 1799000 thousand toman (literal) | 1000 GB | hold tariff unit |
| managed VPS card 1 | 2 | 3 | 40 GB NVMe | 999000 thousand toman (literal) | 500 GB | hold tariff unit |
| managed VPS card 2 | 4 | 4 | 80 GB NVMe | 1599000 thousand toman (literal) | 1 TB | hold tariff unit |
| managed VPS card 3 | 6 | 6 | 100 GB NVMe | 1899000 thousand toman (literal) | 2 TB | hold tariff unit |
| managed VPS card 4 | 8 | 8 | 160 GB NVMe | 2599000 thousand toman (literal) | 2 TB | hold tariff unit |
| MikroTik card 1 | 1 | 256 MB | 1 GB NVMe | 499000 thousand toman (literal) | 100 GB | hold tariff unit |
| MikroTik card 2 | 1 | 256 MB | 1 GB NVMe | 799000 thousand toman (literal) | 500 GB | hold tariff unit |
| MikroTik card 3 | 1 | 1 | 1 GB NVMe | 1299000 thousand toman (literal) | 1 TB | hold tariff unit |
| MikroTik card 4 | 1 | 256 MB | 1 GB NVMe | 2199000 thousand toman (literal) | unlimited / name 5 | hold tariff unit |
| MikroTik card 5 | 2 | 1 | 1 GB NVMe | 3999000 thousand toman (literal) | unlimited / name 10 | hold tariff unit |

## HodaCloud — all 6 fixed SSD cards, period/resource holds

First-party source and handoff: [https://hodacloud.com/](https://hodacloud.com/). Raw: [hodacloud.html](evidence/vps-additional-2026-10-29/hodacloud.html).

Iran focus, SSD 15 GB per card, dedicated IP, 50 GB initial traffic, 10 GB port as literally printed, upload described free one-to-one. Starting prices have no verified billing period on homepage. Professional two cards disagree between teaser CPU/RAM and expanded detail, so do not choose either. Economic/gold four are resource-identifiable but price period needs confirmation. Duplicate homepage sections consolidated. Custom configurator price 800,000 lacks selected CPU/RAM/disk: excluded.

| Plan | CPU cores as advertised | RAM GB (unless stated) | Disk capacity / published type | Published monthly base price, toman unless stated | Traffic | Admission assessment |
| --- | --- | --- | --- | --- | --- | --- |
| economic 1 | 1 | 1 | 15 GB SSD | 280,000 toman, period unknown | 50 GB initial | hold billing period |
| economic 2 | 1 | 2 | 15 GB SSD | 480,000 toman, period unknown | 50 GB initial | hold billing period |
| gold 1 | 2 | 2 | 15 GB SSD | 700,000 toman, period unknown | 50 GB initial | hold billing period |
| gold 2 | 2 | 4 | 15 GB SSD | 1,000,000 toman, period unknown | 50 GB initial | hold billing period |
| professional 1 | teaser 2 / detail 3 | teaser 2 / detail 4 | 15 GB SSD | 1,200,000 toman, period unknown | 50 GB initial | hold billing period; resource conflict |
| professional 2 | teaser 2 / detail 4 | 4 | 15 GB SSD | 1,400,000 toman, period unknown | 50 GB initial | hold billing period; resource conflict |

## AbraServer — all 3 fixed VPS cards; location and order holds

First-party source and handoff: [https://abraserver.com/](https://abraserver.com/). Raw: [abraserver.html](evidence/vps-additional-2026-10-29/abraserver.html).

First-party homepage offers these monthly NVMe tariffs but no explicit Iran hosting location for these VPS cards. Serving Iranian businesses does not prove Iran datacenter. Buy links are page anchors rather than a verified matching product/order destination; homepage also says site under update. Exclude from Iran catalog pending location and handoff proof, not evidence of withdrawal.

| Plan | CPU cores as advertised | RAM GB (unless stated) | Disk capacity / published type | Published monthly base price, toman unless stated | Traffic | Admission assessment |
| --- | --- | --- | --- | --- | --- | --- |
| base | 1 | 1 | 20 GB NVMe | 250,000 | 1 TB | hold Iran location + handoff |
| professional | 2 | 2 | 40 GB NVMe | 450,000 | 2 TB + IP | hold Iran location + handoff |
| advanced | 4 | 4 | 80 GB NVMe | 890,000 | 4 TB + IP | hold Iran location + handoff |

## IRServerCo — all 8 published NVMe plans, unavailable

First-party source and handoff: [https://irserverco.ir/vps-iran/](https://irserverco.ir/vps-iran/). Raw: [irserverco.html](evidence/vps-additional-2026-10-29/irserverco.html).

Shatel Iran, all eight say full capacity, exclude current available choice. Monthly toman, NVMe, DDR4; download quota cards plus unlimited upload. VH-IR4 desktop/mobile tariffs disagree 1,100,000 vs 995,000. FAQ uses download/send and upload/receive inconsistently and separately suggests 70×RAM quota; use explicit card quotas with conflict disclosed. No fabricated current orderability.

| Plan | CPU cores as advertised | RAM GB (unless stated) | Disk capacity / published type | Published monthly base price, toman unless stated | Traffic | Admission assessment |
| --- | --- | --- | --- | --- | --- | --- |
| VH-IR1 | 1 | 512 MB | 25 GB NVMe | 575,000 | 30 GB card download; upload unlimited | unavailable |
| VH-IR2 | 2 | 1 | 30 GB NVMe | 685,000 | 70 GB card download; upload unlimited | unavailable |
| VH-IR3 | 3 | 2 | 35 GB NVMe | 910,000 | 140 GB card download; upload unlimited | unavailable |
| VH-IR4 | 4 | 4 | 50 GB NVMe | 1,100,000 / 995,000 | 250 GB card download; upload unlimited | unavailable; price conflict |
| VH-IR5 | 5 | 6 | 70 GB NVMe | 1,410,000 | 400 GB card download; upload unlimited | unavailable |
| VH-IR6 | 6 | 8 | 100 GB NVMe | 1,610,000 | 500 GB card download; upload unlimited | unavailable |
| VH-IR7 | 7 | 12 | 150 GB NVMe | 1,930,000 | 800 GB card download; upload unlimited | unavailable |
| VH-IR8 | 8 | 16 | 200 GB NVMe | 2,450,000 | 1000 GB card download; upload unlimited | unavailable |

## ServerVDS — all 8 published Iran SSD configurations

First-party source and handoff: [https://clients.servervds.com/index.php?rp=%2Fstore%2Fo3o-uo-uoosso2uoe-ossuoeo-ossu-ssd](https://clients.servervds.com/index.php?rp=%2Fstore%2Fo3o-uo-uoosso2uoe-ossuoeo-ossu-ssd). Raw: [servervds.html](evidence/vps-additional-2026-10-29/servervds.html).

Asiatech Milad Tower, SSD, DDR3 ECC, CPU phrases give core counts and aggregate GHz as distinct claims (not dedicated-core proof). Monthly amounts are explicitly denominated in toman in descriptions despite bare numeric price display. First 3 explicitly zero stock; remaining 5 lack zero marker, so reviewable published base, actual availability unconfirmed. All traffic unlimited upload/download claim; conditions unknown. Extra IPv4 30,000 toman/month except Company++ says 8,000: retain difference. No plan-specific proof of base IP inclusion, tax/setup unknown.

| Plan | CPU cores as advertised | RAM GB (unless stated) | Disk capacity / published type | Published monthly base price, toman unless stated | Traffic | Admission assessment |
| --- | --- | --- | --- | --- | --- | --- |
| Personal | 2 | 1 | 35 GB SSD | 100,000 | unlimited upload/download | unavailable |
| Personal+ | 4 | 2 | 50 GB SSD | 135,000 | unlimited upload/download | unavailable |
| Personal++ | 4 | 4 | 70 GB SSD | 200,000 | unlimited upload/download | unavailable |
| Pro | 8 | 6 | 85 GB SSD | 235,000 | unlimited upload/download | reviewable base; stock unconfirmed |
| Pro+ | 12 | 10 | 120 GB SSD | 360,000 | unlimited upload/download | reviewable base; stock unconfirmed |
| Company | 8 | 8 | 200 GB SSD | 400,000 | unlimited upload/download | reviewable base; stock unconfirmed |
| Company+ | 12 | 12 | 220 GB SSD | 500,000 | unlimited upload/download | reviewable base; stock unconfirmed |
| Company++ | 12 | 10 | 400 GB SSD | 750,000 | unlimited upload/download | reviewable base; stock unconfirmed |

## Abrha — all 6 cards on Iran-named page, location conflicts exclude

First-party source and handoff: [https://abrha.org/vps/unlimited-vps/](https://abrha.org/vps/unlimited-vps/). Raw: [abrha.html](evidence/vps-additional-2026-10-29/abrha.html).

Heading/prose says Iran; five resource-identifiable cards explicitly say Germany. Linux 2 card is generic cloud hosting/WordPress text without CPU/RAM, so not an identifiable VPS configuration. Heading says unlimited, cards explicitly 1000/1500 GB. All excluded pending consistent plan-specific Iran proof; no substitution of heading for contradictory cards.

| Plan | CPU cores as advertised | RAM GB (unless stated) | Disk capacity / published type | Published monthly base price, toman unless stated | Traffic | Admission assessment |
| --- | --- | --- | --- | --- | --- | --- |
| Linux 1 | 1 | 1 | 25 GB SSD | 470,000 | 1000 GB | exclude Iran admission: Germany card |
| Linux 2 | unknown | unknown | 50 GB SSD | 505,000 | 1000 GB | exclude Iran admission: CPU/RAM missing; generic hosting |
| Linux 3 | 2 | 2 | 50 GB SSD | 715,000 | 1500 GB | exclude Iran admission: Germany card |
| Windows 1 | 1 | 2 | 40 GB SSD | 505,000 | 1000 GB | exclude Iran admission: Germany card |
| Windows 2 | 2 | 2 | 50 GB SSD | 715,000 | 1500 GB | exclude Iran admission: Germany card |
| Windows 3 | 2 | 4 | 60 GB SSD | 835,000 | 1500 GB | exclude Iran admission: Germany card |

## Other examined sources and access gaps

These are examined sources, not silent omissions. No qualifying fixed Iranian VPS configurations could be verified in their returned primary-source content:


| Provider / source | Direct retrieval outcome | Assessment / reason |
| --- | --- | --- |
| [PersianWhois](https://persianwhois.com/virtual-server/ssd-vps/) | 200; retained persianwhois.html | SSD tariffs reviewed; explicitly Germany/Georgia, location flags NL/GE/TR/DE; no Iran configuration. Exclude foreign location. |
| [Noderio](https://noderio.com/vps) | 200; retained noderio.html | Six sample resource/starting-price rows, but no Iran location assigned. Public country list foreign; full per-country tariffs require login. No account created. Exclude from Iran scope; public-location/price mapping gap. |
| [SamanHosting](https://samanhosting.ir/index.php?rp=%2Fstore%2Fvps-irn-nvme) | 200 maintenance; retained samanhosting.html | Current source says temporary upgrade/outage; no tariff. Search index shows historical NVMe plans and optional IPv4 surcharge, not current successful tariff verification. No current rows admitted. |
| [HighHost](https://client.highhost.org/store/iran-normal-vps?language=farsi) | 200 empty group; retained highhost.html | Current group explicitly has no visible products. Cached indexed plans not promoted as live. Not proof of withdrawal. |
| [BerbidServer](https://berbidserver.com/portal/index.php?rp=%2Fstore%2Fvps-iran-ssd) | 403; retained failure metadata | Indexed four SSD tariffs not treated as verified. Direct public evidence retrieval failed; needs retry or another accessible first-party page. No access-control bypass attempted. |
| [Arianet pricing](https://www.ariaservice.net/pricing) and [Iran page](https://www.ariaservice.net/سرورمجازی-ارزان-ایران) | Both 200; retained arianet.html and arianet-iran.html | Live pricing returns foreign locations; previously indexed Iran R1024 tariff absent. Live Iran page is explanatory prose without numeric fixed tariff. No current Iran offer admitted. Prose update date 1405/08/06 is source publication metadata, not retrieval date. |
| [Famaserver VPS overview](https://famaserver.com/vps/) | 200; retained famaserver.html | Overview mixes foreign plans and headline Iran price without full configuration; followed full Iran page and reviewed all 25 cards above. |
| [OnlineServer homepage](https://onlineserver.ir/) | 200; retained onlineserver.html | Three homepage snippets consolidated into full four-plan SATA product page; additionally followed SSD Iran family and reviewed its four plans. |

## Exact-overlap investigation for parent

Identity stays `(category=vps, CPU count, RAM, storage capacity, storage type)`. These are exact resource facts only: traffic, tax and billing differences still matter. Different CPU hardware/OS/packages remain provider-offer facts and must be represented. SSD is not treated as NVMe; SATA alone is not HDD. Unknown type is never a wildcard. Database configurations remain a distinct category even if hardware matches.

Within newly reviewed sources:

- **2 cores / 4 GB / 40 GB SSD:** Hostida IR AsiaTech 4, 1,400,000 toman/month and Mobinhost metered 4 GB, 795,000/month. Both publish 100 GB traffic but Hostida counts both directions and Mobinhost direction is unresolved. Mobinhost unlimited 4 GB has the same shape and base 795,000 but mandatory selectable bandwidth completeness is unresolved. This is a strong usable resource overlap with base-cost disclosures.
- **2 cores / 2 GB / 35 GB SSD:** Spadserver plan 1, 849,900/month and OnlineServer SSD plan 1, 811,500/month (excludes VAT); traffic 100 GB direction unknown vs 60 GB download respectively. OnlineServer SATA 1 is not in this SSD group.
- **4 cores / 8 GB / 100 GB SSD:** Logicserver Iran 5, 609,000/month, and Famaserver irvps5_Linux / irvps8_Windows, 1,999,000/month. Hardware and OS differ; keep offer-specific facts. Famaserver explicitly maps SSD at card level; no inference of NVMe.
- **1 core / 1 GB / 25 GB SSD:** Famaserver irvps1_Linux, 680,000/month matches the parent's retained ManageIT 1c/1g/25g SSD shape. Parent must rely on its own successful current evidence for ManageIT; this research did not reverify it. Visnet 1c/1g/25g is NVMe, not an SSD identity match.
- **2 cores / 4 GB / 60 GB SSD:** Famaserver irvps4_Linux and irvps7_Windows, each 1,199,000/month, match the parent's Artin ram-4 configurations (all six separately mapped DC offers). Parent retains Artin source review and must verify no type/mapping revision before grouping.
- Negative identity checks: OnlineServer SSD plan 3 is 4/4/60, whereas Iranica plan 4 is 3/4/60; equal RAM/disk does not make the CPU counts match. HiData 2/4/75 is NVMe whereas the retained ManageIT 2/4/75 shape is SSD, so this is not a type-exact match.
- **8 cores / 8 GB / 160 GB NVMe:** Visnet row 5, 966,000/month matches parent IranHost IR-VPS-8-8-160 resource tuple, but Visnet handoff is empty: retain as an investigated exact-resource lead, not an admitted buyer choice.
- **2 cores / 2 GB / 20 GB NVMe:** Shetabanhost RSP-2GB 559,000/month is a new exact tuple; parent's IRVM bronze 2/2/20 NVMe can be paired if its live verification remains valid. Userver Linux first card has same resources but holds price units; cannot contribute a normalized starting price.

The following mechanically enumerated comparison reads the shared parent catalog as it existed during this handoff. It is an investigation index, **not a re-verification** of those parent sources. It excludes null storage type, database rows, mixed disks and source-conflict rows; held prices/handoffs/stock remain explicitly identified in their source section. Parent catalog may change concurrently. Use original first-party evidence for final admission.


| CPU/RAM GB/disk GB/type | New source | New plan | New-source assessment | Matching parent ID (parent evidence required) |
| --- | --- | --- | --- | --- |
| 1/1/20/SSD | hostida | IR AsiaTech 1 | reviewable base | inet-iran-ram-1 |
| 1/1/25/SSD | abrha | Linux 1 | exclude Iran admission: Germany card | manageit-1c-1g-25g |
| 1/1/25/SSD | famaserver-iran | irvps1_Linux | reviewable base | manageit-1c-1g-25g |
| 1/2/20/SSD | hostida | IR Respina 1 | reviewable base | tadserver-iran-ram-2 |
| 2/2/20/NVMe | shetabanhost | RSP-2GB | reviewable base; setup free | irvm-respina-bronze |
| 2/2/20/NVMe | userver | Linux card 1 | hold tariff unit | irvm-respina-bronze |
| 2/2/30/SSD | hostida | IR Hostida 2 | reviewable base | inet-iran-ram-2 |
| 2/2/35/SSD | onlineserver-ssd | plan 1 | reviewable base; VAT extra | onlineserver-iran-onlineserver-managed-1 |
| 2/2/35/SSD | onlineserver-ssd | plan 1 | reviewable base; VAT extra | onlineserver-iran-onlineserver-ssd-1 |
| 2/2/35/SSD | spadserver | [plan 1](https://crm.spadserver.com/store/iran-vps/pln1) | reviewable base; setup free | onlineserver-iran-onlineserver-managed-1 |
| 2/2/35/SSD | spadserver | [plan 1](https://crm.spadserver.com/store/iran-vps/pln1) | reviewable base; setup free | onlineserver-iran-onlineserver-ssd-1 |
| 2/2/40/NVMe | abraserver | professional | hold Iran location + handoff | iranhost-iran-IR-VPS-2-2-40 |
| 2/2/40/NVMe | hostida-cloud | IR NVMe Cloud 2 | unavailable | iranhost-iran-IR-VPS-2-2-40 |
| 2/4/30/NVMe | azardata | NVMe plan 1 | reviewable base | irvm-respina-silver |
| 2/4/30/SSD | hostida | IR Respina 2 | reviewable base | tadserver-iran-ram-4 |
| 2/4/60/SSD | abrha | Windows 3 | exclude Iran admission: Germany card | artin-afranet-ram-4 |
| 2/4/60/SSD | abrha | Windows 3 | exclude Iran admission: Germany card | artin-asiatek-milad-ram-4 |
| 2/4/60/SSD | abrha | Windows 3 | exclude Iran admission: Germany card | artin-asiatek-miremad-ram-4 |
| 2/4/60/SSD | abrha | Windows 3 | exclude Iran admission: Germany card | artin-hiweb-ram-4 |
| 2/4/60/SSD | abrha | Windows 3 | exclude Iran admission: Germany card | artin-respina-ram-4 |
| 2/4/60/SSD | abrha | Windows 3 | exclude Iran admission: Germany card | artin-tabian-ram-4 |
| 2/4/60/SSD | famaserver-iran | irvps4_Linux | reviewable base | artin-afranet-ram-4 |
| 2/4/60/SSD | famaserver-iran | irvps4_Linux | reviewable base | artin-asiatek-milad-ram-4 |
| 2/4/60/SSD | famaserver-iran | irvps4_Linux | reviewable base | artin-asiatek-miremad-ram-4 |
| 2/4/60/SSD | famaserver-iran | irvps4_Linux | reviewable base | artin-hiweb-ram-4 |
| 2/4/60/SSD | famaserver-iran | irvps4_Linux | reviewable base | artin-respina-ram-4 |
| 2/4/60/SSD | famaserver-iran | irvps4_Linux | reviewable base | artin-tabian-ram-4 |
| 2/4/60/SSD | famaserver-iran | irvps7_Windows | reviewable base | artin-afranet-ram-4 |
| 2/4/60/SSD | famaserver-iran | irvps7_Windows | reviewable base | artin-asiatek-milad-ram-4 |
| 2/4/60/SSD | famaserver-iran | irvps7_Windows | reviewable base | artin-asiatek-miremad-ram-4 |
| 2/4/60/SSD | famaserver-iran | irvps7_Windows | reviewable base | artin-hiweb-ram-4 |
| 2/4/60/SSD | famaserver-iran | irvps7_Windows | reviewable base | artin-respina-ram-4 |
| 2/4/60/SSD | famaserver-iran | irvps7_Windows | reviewable base | artin-tabian-ram-4 |
| 3/3/50/SSD | onlineserver-ssd | plan 2 | reviewable base; VAT extra | onlineserver-iran-onlineserver-ssd-2 |
| 3/6/40/SSD | hostida | IR Respina 4 | reviewable base | tadserver-iran-ram-6 |
| 4/4/60/SSD | onlineserver-ssd | plan 3 | reviewable base; VAT extra | onlineserver-iran-onlineserver-managed-2 |
| 4/4/60/SSD | onlineserver-ssd | plan 3 | reviewable base; VAT extra | onlineserver-iran-onlineserver-ssd-3 |
| 4/4/80/NVMe | abraserver | advanced | hold Iran location + handoff | iranhost-iran-IR-VPS-4-4-80 |
| 4/4/80/NVMe | userver | managed VPS card 2 | hold tariff unit | iranhost-iran-IR-VPS-4-4-80 |
| 4/4/80/NVMe | visnet | row 4 | hold empty order href | iranhost-iran-IR-VPS-4-4-80 |
| 4/8/100/SSD | famaserver-iran | irvps5_Linux | reviewable base | artin-afranet-ram-8 |
| 4/8/100/SSD | famaserver-iran | irvps5_Linux | reviewable base | artin-asiatek-milad-ram-8 |
| 4/8/100/SSD | famaserver-iran | irvps5_Linux | reviewable base | artin-asiatek-miremad-ram-8 |
| 4/8/100/SSD | famaserver-iran | irvps5_Linux | reviewable base | artin-hiweb-ram-8 |
| 4/8/100/SSD | famaserver-iran | irvps5_Linux | reviewable base | artin-respina-ram-8 |
| 4/8/100/SSD | famaserver-iran | irvps5_Linux | reviewable base | artin-tabian-ram-8 |
| 4/8/100/SSD | famaserver-iran | irvps8_Windows | reviewable base | artin-afranet-ram-8 |
| 4/8/100/SSD | famaserver-iran | irvps8_Windows | reviewable base | artin-asiatek-milad-ram-8 |
| 4/8/100/SSD | famaserver-iran | irvps8_Windows | reviewable base | artin-asiatek-miremad-ram-8 |
| 4/8/100/SSD | famaserver-iran | irvps8_Windows | reviewable base | artin-hiweb-ram-8 |
| 4/8/100/SSD | famaserver-iran | irvps8_Windows | reviewable base | artin-respina-ram-8 |
| 4/8/100/SSD | famaserver-iran | irvps8_Windows | reviewable base | artin-tabian-ram-8 |
| 4/8/100/SSD | logicserver | [Iran 5](https://crm.logicserver.org/index.php?rp=/store/iran-ssd/plan5) | reviewable base | artin-afranet-ram-8 |
| 4/8/100/SSD | logicserver | [Iran 5](https://crm.logicserver.org/index.php?rp=/store/iran-ssd/plan5) | reviewable base | artin-asiatek-milad-ram-8 |
| 4/8/100/SSD | logicserver | [Iran 5](https://crm.logicserver.org/index.php?rp=/store/iran-ssd/plan5) | reviewable base | artin-asiatek-miremad-ram-8 |
| 4/8/100/SSD | logicserver | [Iran 5](https://crm.logicserver.org/index.php?rp=/store/iran-ssd/plan5) | reviewable base | artin-hiweb-ram-8 |
| 4/8/100/SSD | logicserver | [Iran 5](https://crm.logicserver.org/index.php?rp=/store/iran-ssd/plan5) | reviewable base | artin-respina-ram-8 |
| 4/8/100/SSD | logicserver | [Iran 5](https://crm.logicserver.org/index.php?rp=/store/iran-ssd/plan5) | reviewable base | artin-tabian-ram-8 |
| 8/8/120/SSD | onlineserver-ssd | plan 4 | reviewable base; VAT extra | onlineserver-iran-onlineserver-managed-3 |
| 8/8/120/SSD | onlineserver-ssd | plan 4 | reviewable base; VAT extra | onlineserver-iran-onlineserver-ssd-4 |
| 8/8/160/NVMe | userver | managed VPS card 4 | hold tariff unit | iranhost-iran-IR-VPS-8-8-160 |
| 8/8/160/NVMe | visnet | row 5 | hold empty order href | iranhost-iran-IR-VPS-8-8-160 |

## Search record and stopping decision

Search queries executed through web search on 2026-10-29 UTC, in order (all searches unrestricted by provider domain; exclusion operators only remove already assigned/noisy results):

1. `خرید سرور مجازی ایران NVMe رم پردازنده قیمت پلن`
2. `سرور مجازی ایران SSD 2 هسته 4 گیگابایت قیمت`
3. `سرور مجازی ایران قیمت "NVMe" "هسته" -site:iranicaserver.com -site:tadserver.com -site:hidata.org`
4. `سرور مجازی ایران "پلن" "SSD" "ماهانه" -site:tadserver.com -site:iranicaserver.com -site:irvm.org`
5. `"سرور مجازی ایران" "1" "25" "NVMe" "قیمت"`
6. `"سرور مجازی ایران" "50" "2" "SSD" "ماهانه" -site:tadserver.com -site:iranicaserver.com -site:whdir.ir -site:irvm.org`

Round 1 (queries 1–2) discovered Userver, PersianWhois, Afagh, Hostida, Pouyasazan, OnlineServer, HiData, HodaCloud, Noderio in addition to already assigned parent providers. Every one was fetched directly; qualifying fixed rows and exclusions are above.

Round 2 (queries 3–4) discovered Visnet, Logicserver, Spadserver, AbraServer, SamanHosting, Azardata, Shopingserver. Each was fetched directly. Search also surfaced [WHDir](https://whdir.ir/c/vps/vps-ir/), a secondary directory: not used as evidence or tariff authority. It exposes additional leads below but those have not been independently reviewed. Parent providers IRVM/iNet repeated and were left to parent.

Round 3 (queries 5–6) discovered Abrha, BerbidServer, HighHost, IRServerCo, ServerVDS, Famaserver, Arianet, Shetabanhost, Mobinhost; all received direct first-party retrieval attempts. This round still yielded meaningful coverage, including new resource-exact overlap pairs. Following source links then added Hostida unlimited cloud, HiData public NVMe and SATA stores, OnlineServer full SATA/SSD pages and Famaserver's complete Iran tariff page. These followups were driven by explicit public links, not a provider/configuration count target.

**Decision: acquisition must resume; no search saturation claim.** Three rounds continued to add useful distinct configurations/providers, not merely duplicate existing shapes. This subtask ends at a reviewable handoff boundary after exhausting fixed cards on successfully retrieved pages, while explicitly leaving further discovery open. Do not mark issue #20 complete based on this report.

Assessable continuation queue:

- Unexamined directory leads (discovery names only, not evidence): SafroOne, Pouyan IT, Hive/HiVoo, BiaToHost, Makenanet, DidebanNet, PentaServer, WebPouyan, ParsVDS, RonakHost, TehranGaming, MahanNet, ZagrosHost, ParsWebHost, MiladServer, SepantaPixel, DiyarHost, RTL Cloud. Find their own Iran tariff sources, then review every fixed row; do not import directory prices.
- Resolve accessible primary evidence for BerbidServer (403), SamanHosting maintenance, HighHost empty group and Arianet absent Iran tariff. Failed access does not advance verification or prove withdrawal.
- Verify Visnet handoff, HodaCloud billing/resource conflicts, Userver thousand-toman labels, Mobinhost “million” labels/selectable bandwidth, Afagh/Pouyasazan storage type, Shopingserver SSD/NVMe conflict, Famaserver 19–21 disk-label conflicts, Abrha/AbraServer plan location. No outreach/account creation authorized or used.
- Further product-family discovery is open: this report exhausts the tariff pages actually retrieved, not every product across each provider's site. A parent needing provider-wide completeness should examine other linked Iran families (e.g. Userver dedicated Linux/MikroTik pages) and may consolidate duplicate identities with preserved source variants.
- Resume broad Persian queries and directed exact-tuple queries after these leads; record marginal new-provider and new-resource coverage per round. Only propose saturation after rounds and first-party followups cease adding meaningful qualifying choice, with remaining exclusions/gaps disclosed. No numeric “N providers” target substitutes for this evidence.

## Snapshot manifest

Every successful 200 response below has its raw bytes retained, including maintenance/empty pages. Dates are actual UTC timestamps from this run. `saved_at` is filesystem mtime immediately after writing response bytes, not provider publish time. Metadata JSON contains response headers, including server Date where present, with no inference that server Date is a tariff publication date. Failure metadata is retained for the 403 with no successful tariff snapshot. `.txt` files are derivative extraction only. SHA-256 is of raw `.html` bytes.


## Extracted public handoff index

The following order hrefs are extracted from retained pages, not visited cart actions. Listed once per source even if responsive markup duplicates them. Blank/anchor-only links are omitted and their gaps described above. Product landing pages remain valid source handoffs where no direct fixed-plan URL was verified.


**hostida**

| Published link label | URL |
| --- | --- |
| سفارش | [https://my.hostida.com/cart.php?a=add&pid=474](https://my.hostida.com/cart.php?a=add&pid=474) |
| سفارش | [https://my.hostida.com/cart.php?a=add&pid=753](https://my.hostida.com/cart.php?a=add&pid=753) |
| سفارش | [https://my.hostida.com/cart.php?a=add&pid=754](https://my.hostida.com/cart.php?a=add&pid=754) |
| سفارش | [https://my.hostida.com/cart.php?a=add&pid=755](https://my.hostida.com/cart.php?a=add&pid=755) |
| سفارش | [https://my.hostida.com/cart.php?a=add&pid=756](https://my.hostida.com/cart.php?a=add&pid=756) |
| سفارش | [https://my.hostida.com/cart.php?a=add&pid=757](https://my.hostida.com/cart.php?a=add&pid=757) |
| سفارش | [https://my.hostida.com/cart.php?a=add&pid=733](https://my.hostida.com/cart.php?a=add&pid=733) |
| سفارش | [https://my.hostida.com/cart.php?a=add&pid=734](https://my.hostida.com/cart.php?a=add&pid=734) |
| سفارش | [https://my.hostida.com/cart.php?a=add&pid=735](https://my.hostida.com/cart.php?a=add&pid=735) |
| سفارش | [https://my.hostida.com/cart.php?a=add&pid=736](https://my.hostida.com/cart.php?a=add&pid=736) |
| سفارش | [https://my.hostida.com/cart.php?a=add&pid=737](https://my.hostida.com/cart.php?a=add&pid=737) |
| سفارش | [https://my.hostida.com/cart.php?a=add&pid=738](https://my.hostida.com/cart.php?a=add&pid=738) |
| سفارش | [https://my.hostida.com/cart.php?a=add&pid=739](https://my.hostida.com/cart.php?a=add&pid=739) |
| سفارش | [https://my.hostida.com/cart.php?a=add&pid=740](https://my.hostida.com/cart.php?a=add&pid=740) |
| سفارش | [https://my.hostida.com/cart.php?a=add&pid=741](https://my.hostida.com/cart.php?a=add&pid=741) |
| سفارش | [https://my.hostida.com/cart.php?a=add&pid=742](https://my.hostida.com/cart.php?a=add&pid=742) |
| سفارش | [https://my.hostida.com/cart.php?a=add&pid=743](https://my.hostida.com/cart.php?a=add&pid=743) |
| سفارش | [https://my.hostida.com/cart.php?a=add&pid=744](https://my.hostida.com/cart.php?a=add&pid=744) |
| سفارش | [https://my.hostida.com/cart.php?a=add&pid=750](https://my.hostida.com/cart.php?a=add&pid=750) |

**hidata-store**

| Published link label | URL |
| --- | --- |
| مشاهده کارت خرید | [https://my.hidata.org/cart.php?a=view](https://my.hidata.org/cart.php?a=view) |
| سفارش دهید | [https://my.hidata.org/store/iran-nvme-vps/ir-nvme-1gb](https://my.hidata.org/store/iran-nvme-vps/ir-nvme-1gb) |
| سفارش دهید | [https://my.hidata.org/store/iran-nvme-vps/ir-nvme-2gb](https://my.hidata.org/store/iran-nvme-vps/ir-nvme-2gb) |
| سفارش دهید | [https://my.hidata.org/store/iran-nvme-vps/ir-nvme-3gb](https://my.hidata.org/store/iran-nvme-vps/ir-nvme-3gb) |
| سفارش دهید | [https://my.hidata.org/store/iran-nvme-vps/ir-nvme-4gb](https://my.hidata.org/store/iran-nvme-vps/ir-nvme-4gb) |
| سفارش دهید | [https://my.hidata.org/store/iran-nvme-vps/ir-nvme-5gb](https://my.hidata.org/store/iran-nvme-vps/ir-nvme-5gb) |
| سفارش دهید | [https://my.hidata.org/store/iran-nvme-vps/ir-nvme-6gb](https://my.hidata.org/store/iran-nvme-vps/ir-nvme-6gb) |
| سفارش دهید | [https://my.hidata.org/store/iran-nvme-vps/ir-nvme-7gb](https://my.hidata.org/store/iran-nvme-vps/ir-nvme-7gb) |
| سفارش دهید | [https://my.hidata.org/store/iran-nvme-vps/ir-nvme-8gb](https://my.hidata.org/store/iran-nvme-vps/ir-nvme-8gb) |
| سفارش دهید | [https://my.hidata.org/store/iran-nvme-vps/ir-nvme-9gb](https://my.hidata.org/store/iran-nvme-vps/ir-nvme-9gb) |
| سفارش دهید | [https://my.hidata.org/store/iran-nvme-vps/ir-nvme-10gb](https://my.hidata.org/store/iran-nvme-vps/ir-nvme-10gb) |
| سفارش دهید | [https://my.hidata.org/store/iran-nvme-vps/ir-nvme-11gb](https://my.hidata.org/store/iran-nvme-vps/ir-nvme-11gb) |
| سفارش دهید | [https://my.hidata.org/store/iran-nvme-vps/ir-nvme-12gb](https://my.hidata.org/store/iran-nvme-vps/ir-nvme-12gb) |
| سفارش دهید | [https://my.hidata.org/store/iran-nvme-vps/ir-nvme-13gb](https://my.hidata.org/store/iran-nvme-vps/ir-nvme-13gb) |
| سفارش دهید | [https://my.hidata.org/store/iran-nvme-vps/ir-nvme-14gb](https://my.hidata.org/store/iran-nvme-vps/ir-nvme-14gb) |
| سفارش دهید | [https://my.hidata.org/store/iran-nvme-vps/ir-nvme-15gb](https://my.hidata.org/store/iran-nvme-vps/ir-nvme-15gb) |
| سفارش دهید | [https://my.hidata.org/store/iran-nvme-vps/ir-nvme-16gb](https://my.hidata.org/store/iran-nvme-vps/ir-nvme-16gb) |
| سفارش دهید | [https://my.hidata.org/store/iran-nvme-vps/ir-nvme-20gb](https://my.hidata.org/store/iran-nvme-vps/ir-nvme-20gb) |
| سفارش دهید | [https://my.hidata.org/store/iran-nvme-vps/ir-nvme-24gb](https://my.hidata.org/store/iran-nvme-vps/ir-nvme-24gb) |
| سفارش دهید | [https://my.hidata.org/store/iran-nvme-vps/ir-nvme-32gb](https://my.hidata.org/store/iran-nvme-vps/ir-nvme-32gb) |

**hidata-sata-store**

| Published link label | URL |
| --- | --- |
| مشاهده کارت خرید | [https://my.hidata.org/cart.php?a=view](https://my.hidata.org/cart.php?a=view) |
| سفارش دهید | [https://my.hidata.org/store/ir-sata-vps/ir-sata-1gb](https://my.hidata.org/store/ir-sata-vps/ir-sata-1gb) |
| سفارش دهید | [https://my.hidata.org/store/ir-sata-vps/ir-sata-2gb](https://my.hidata.org/store/ir-sata-vps/ir-sata-2gb) |
| سفارش دهید | [https://my.hidata.org/store/ir-sata-vps/ir-sata-3gb](https://my.hidata.org/store/ir-sata-vps/ir-sata-3gb) |
| سفارش دهید | [https://my.hidata.org/store/ir-sata-vps/ir-sata-4gb](https://my.hidata.org/store/ir-sata-vps/ir-sata-4gb) |
| سفارش دهید | [https://my.hidata.org/store/ir-sata-vps/ir-sata-5gb](https://my.hidata.org/store/ir-sata-vps/ir-sata-5gb) |
| سفارش دهید | [https://my.hidata.org/store/ir-sata-vps/ir-sata-6gb](https://my.hidata.org/store/ir-sata-vps/ir-sata-6gb) |
| سفارش دهید | [https://my.hidata.org/store/ir-sata-vps/ir-sata-7gb](https://my.hidata.org/store/ir-sata-vps/ir-sata-7gb) |
| سفارش دهید | [https://my.hidata.org/store/ir-sata-vps/ir-sata-8gb](https://my.hidata.org/store/ir-sata-vps/ir-sata-8gb) |

**famaserver-iran**

| Published link label | URL |
| --- | --- |
| خرید لایسنس cPanel نسخه vps | [https://crm.famaserver.com/store/license/cp](https://crm.famaserver.com/store/license/cp) |
| خرید لایسنس cPanel نسخه Dedicate | [https://crm.famaserver.com/store/license/cpanel-metal-licensing-system](https://crm.famaserver.com/store/license/cpanel-metal-licensing-system) |
| خرید لایسنس DirectAdmin | [https://crm.famaserver.com/store/license/directadmin-licensing-system](https://crm.famaserver.com/store/license/directadmin-licensing-system) |
| خرید لایسنس CloudLinux | [https://crm.famaserver.com/store/license/cloudlinux-os-shared-licensing-system](https://crm.famaserver.com/store/license/cloudlinux-os-shared-licensing-system) |
| خرید لایسنس LiteSpeed | [https://crm.famaserver.com/store/license/litespeed-licensing-system](https://crm.famaserver.com/store/license/litespeed-licensing-system) |
| خرید لایسنس Virtualizor | [https://crm.famaserver.com/store/license/virtualizor-licensing-system](https://crm.famaserver.com/store/license/virtualizor-licensing-system) |
| خرید لایسنس Plesk سرور مجازی | [https://crm.famaserver.com/store/license/plesk-web-host-vps-edition-licensing-system](https://crm.famaserver.com/store/license/plesk-web-host-vps-edition-licensing-system) |
| خرید لایسنس Plesk سرور اختصاصی | [https://crm.famaserver.com/store/license/plesk-web-host-dedicated-edition-licensing-system](https://crm.famaserver.com/store/license/plesk-web-host-dedicated-edition-licensing-system) |
| خرید لایسنس JetBackup | [https://crm.famaserver.com/store/license/jetbackup-licensing-system](https://crm.famaserver.com/store/license/jetbackup-licensing-system) |
| خرید لایسنس Imunify360 | [https://crm.famaserver.com/store/license/imunify360-powered-by-ai-and-proactive-defense](https://crm.famaserver.com/store/license/imunify360-powered-by-ai-and-proactive-defense) |
| خرید لایسنس Solusvm سرور مجازی | [https://crm.famaserver.com/store/license/solusvm-slave-license](https://crm.famaserver.com/store/license/solusvm-slave-license) |
| خرید لایسنس Solusvm سرور اختصاصی | [https://crm.famaserver.com/store/license/solusvm-master-license](https://crm.famaserver.com/store/license/solusvm-master-license) |
| خرید | [https://crm.famaserver.com/store/vps-iran/irvps1-linux](https://crm.famaserver.com/store/vps-iran/irvps1-linux) |
| خرید | [https://crm.famaserver.com/store/vps-iran/irvps2-linux](https://crm.famaserver.com/store/vps-iran/irvps2-linux) |
| خرید | [https://crm.famaserver.com/store/vps-iran/irvps3-linux](https://crm.famaserver.com/store/vps-iran/irvps3-linux) |
| خرید | [https://crm.famaserver.com/store/vps-iran/irvps4-linux](https://crm.famaserver.com/store/vps-iran/irvps4-linux) |
| خرید | [https://crm.famaserver.com/store/vps-iran/irvps5-linux](https://crm.famaserver.com/store/vps-iran/irvps5-linux) |
| خرید | [https://crm.famaserver.com/store/vps-iran/irvps6-linux](https://crm.famaserver.com/store/vps-iran/irvps6-linux) |
| خرید | [https://crm.famaserver.com/store/vps-iran/irvps7-windows](https://crm.famaserver.com/store/vps-iran/irvps7-windows) |
| خرید | [https://crm.famaserver.com/store/vps-iran/irvps8-windows](https://crm.famaserver.com/store/vps-iran/irvps8-windows) |
| خرید | [https://crm.famaserver.com/store/vps-iran/irvps9-windows](https://crm.famaserver.com/store/vps-iran/irvps9-windows) |
| خرید | [https://crm.famaserver.com/store/vps-iran/irvps10-windows](https://crm.famaserver.com/store/vps-iran/irvps10-windows) |
| خرید | [https://crm.famaserver.com/store/vps-iran/irvps11-ram](https://crm.famaserver.com/store/vps-iran/irvps11-ram) |
| خرید | [https://crm.famaserver.com/store/vps-iran/irvps12-ram](https://crm.famaserver.com/store/vps-iran/irvps12-ram) |
| خرید | [https://crm.famaserver.com/store/vps-iran/irvps13-ram](https://crm.famaserver.com/store/vps-iran/irvps13-ram) |
| خرید | [https://crm.famaserver.com/store/vps-iran/irvps14-ram](https://crm.famaserver.com/store/vps-iran/irvps14-ram) |
| خرید | [https://crm.famaserver.com/store/vps-iran/irvps15-cpu](https://crm.famaserver.com/store/vps-iran/irvps15-cpu) |
| خرید | [https://crm.famaserver.com/store/vps-iran/irvps16-cpu](https://crm.famaserver.com/store/vps-iran/irvps16-cpu) |
| خرید | [https://crm.famaserver.com/store/vps-iran/irvps17-cpu](https://crm.famaserver.com/store/vps-iran/irvps17-cpu) |
| خرید | [https://crm.famaserver.com/store/vps-iran/irvps18-cpu](https://crm.famaserver.com/store/vps-iran/irvps18-cpu) |
| خرید | [https://crm.famaserver.com/store/vps-iran/irvps19-hdd](https://crm.famaserver.com/store/vps-iran/irvps19-hdd) |
| خرید | [https://crm.famaserver.com/store/vps-iran/irvps20-hdd](https://crm.famaserver.com/store/vps-iran/irvps20-hdd) |
| خرید | [https://crm.famaserver.com/store/vps-iran/irvps21-hdd](https://crm.famaserver.com/store/vps-iran/irvps21-hdd) |
| خرید | [https://crm.famaserver.com/store/vps-iran/irvps22-hdd](https://crm.famaserver.com/store/vps-iran/irvps22-hdd) |
| خرید | [https://crm.famaserver.com/store/vps-iran/irvps23-hdd](https://crm.famaserver.com/store/vps-iran/irvps23-hdd) |
| خرید | [https://crm.famaserver.com/store/vps-iran/irvps24-hdd](https://crm.famaserver.com/store/vps-iran/irvps24-hdd) |

**logicserver**

| Published link label | URL |
| --- | --- |
| سفارش پلن 1 | [https://crm.logicserver.org/index.php?rp=/store/iran-ssd/plan1](https://crm.logicserver.org/index.php?rp=/store/iran-ssd/plan1) |
| سفارش پلن 2 | [https://crm.logicserver.org/index.php?rp=/store/iran-ssd/plan2](https://crm.logicserver.org/index.php?rp=/store/iran-ssd/plan2) |
| سفارش پلن 3 | [https://crm.logicserver.org/index.php?rp=/store/iran-ssd/plan3](https://crm.logicserver.org/index.php?rp=/store/iran-ssd/plan3) |
| سفارش پلن 4 | [https://crm.logicserver.org/index.php?rp=/store/iran-ssd/plan4](https://crm.logicserver.org/index.php?rp=/store/iran-ssd/plan4) |
| سفارش پلن 5 | [https://crm.logicserver.org/index.php?rp=/store/iran-ssd/plan5](https://crm.logicserver.org/index.php?rp=/store/iran-ssd/plan5) |
| خرید | [https://crm.logicserver.org/index.php?rp=/store/iran-ssd/plan1](https://crm.logicserver.org/index.php?rp=/store/iran-ssd/plan1) |
| خرید | [https://crm.logicserver.org/index.php?rp=/store/iran-ssd/plan2](https://crm.logicserver.org/index.php?rp=/store/iran-ssd/plan2) |
| خرید | [https://crm.logicserver.org/index.php?rp=/store/iran-ssd/plan3](https://crm.logicserver.org/index.php?rp=/store/iran-ssd/plan3) |
| خرید | [https://crm.logicserver.org/index.php?rp=/store/iran-ssd/plan4](https://crm.logicserver.org/index.php?rp=/store/iran-ssd/plan4) |
| خرید | [https://crm.logicserver.org/index.php?rp=/store/iran-ssd/plan5](https://crm.logicserver.org/index.php?rp=/store/iran-ssd/plan5) |

**spadserver**

| Published link label | URL |
| --- | --- |
| مشاهده کارت خرید | [https://crm.spadserver.com/cart.php?a=view](https://crm.spadserver.com/cart.php?a=view) |
| سفارش دهید | [https://crm.spadserver.com/store/iran-vps/pln1](https://crm.spadserver.com/store/iran-vps/pln1) |
| سفارش دهید | [https://crm.spadserver.com/store/iran-vps/pln2](https://crm.spadserver.com/store/iran-vps/pln2) |
| سفارش دهید | [https://crm.spadserver.com/store/iran-vps/pln3](https://crm.spadserver.com/store/iran-vps/pln3) |
| سفارش دهید | [https://crm.spadserver.com/store/iran-vps/pln4](https://crm.spadserver.com/store/iran-vps/pln4) |
| سفارش دهید | [https://crm.spadserver.com/store/iran-vps/pln5](https://crm.spadserver.com/store/iran-vps/pln5) |
| سفارش دهید | [https://crm.spadserver.com/store/iran-vps/pln6](https://crm.spadserver.com/store/iran-vps/pln6) |
| سفارش دهید | [https://crm.spadserver.com/store/iran-vps/pln7](https://crm.spadserver.com/store/iran-vps/pln7) |
| سفارش دهید | [https://crm.spadserver.com/store/iran-vps/pln8](https://crm.spadserver.com/store/iran-vps/pln8) |
| سفارش دهید | [https://crm.spadserver.com/store/iran-vps/pln9](https://crm.spadserver.com/store/iran-vps/pln9) |

**shetabanhost**

| Published link label | URL |
| --- | --- |
| انتخاب و سفارش ↖ | [https://my.shetabanhost.com/cart.php?a=add&pid=382&billingcycle=monthly](https://my.shetabanhost.com/cart.php?a=add&pid=382&billingcycle=monthly) |
| انتخاب و سفارش ↖ | [https://my.shetabanhost.com/cart.php?a=add&pid=383&billingcycle=monthly](https://my.shetabanhost.com/cart.php?a=add&pid=383&billingcycle=monthly) |
| انتخاب و سفارش ↖ | [https://my.shetabanhost.com/cart.php?a=add&pid=384&billingcycle=monthly](https://my.shetabanhost.com/cart.php?a=add&pid=384&billingcycle=monthly) |
| انتخاب و سفارش ↖ | [https://my.shetabanhost.com/cart.php?a=add&pid=386&billingcycle=monthly](https://my.shetabanhost.com/cart.php?a=add&pid=386&billingcycle=monthly) |

**azardata**

| Published link label | URL |
| --- | --- |
| سفارش | [https://panel.azardata.net/store/vps-pro-ssd-iran/vps-ir-4](https://panel.azardata.net/store/vps-pro-ssd-iran/vps-ir-4) |
| سفارش | [https://panel.azardata.net/store/vps-pro-ssd-iran/vps-ir-6](https://panel.azardata.net/store/vps-pro-ssd-iran/vps-ir-6) |
| سفارش | [https://panel.azardata.net/store/vps-pro-ssd-iran/vps-ir-8](https://panel.azardata.net/store/vps-pro-ssd-iran/vps-ir-8) |
| سفارش | [https://panel.azardata.net/store/vps-pro-ssd-iran/vps-ir-16](https://panel.azardata.net/store/vps-pro-ssd-iran/vps-ir-16) |
| سفارش | [https://panel.azardata.net/store/vps-pro-ssd-iran/vps-ir-32](https://panel.azardata.net/store/vps-pro-ssd-iran/vps-ir-32) |

**onlineserver-iran**

| Published link label | URL |
| --- | --- |
| سفارش | [https://my.onlineserver.ir/index.php?rp=/store/7f62f60f/srwr-2048-yrn](https://my.onlineserver.ir/index.php?rp=/store/7f62f60f/srwr-2048-yrn) |
| سفارش | [https://my.onlineserver.ir/index.php?rp=/store/7f62f60f/srwr-3072-yrn](https://my.onlineserver.ir/index.php?rp=/store/7f62f60f/srwr-3072-yrn) |
| سفارش | [https://my.onlineserver.ir/index.php?rp=/store/7f62f60f/srwr-4096-yrn](https://my.onlineserver.ir/index.php?rp=/store/7f62f60f/srwr-4096-yrn) |
| سفارش | [https://my.onlineserver.ir/index.php?rp=/store/7f62f60f/srwr-8192-yrn](https://my.onlineserver.ir/index.php?rp=/store/7f62f60f/srwr-8192-yrn) |

**onlineserver-ssd**

| Published link label | URL |
| --- | --- |
| سفارش | [https://my.onlineserver.ir/index.php?rp=/store/7f6303d3/srwr-2-gyg-ssd-yrn](https://my.onlineserver.ir/index.php?rp=/store/7f6303d3/srwr-2-gyg-ssd-yrn) |
| سفارش | [https://my.onlineserver.ir/index.php?rp=/store/7f6303d3/srwr-3-gyg-ssd-yrn](https://my.onlineserver.ir/index.php?rp=/store/7f6303d3/srwr-3-gyg-ssd-yrn) |
| سفارش | [https://my.onlineserver.ir/index.php?rp=/store/7f6303d3/srwr-4-gyg-ssd-yrn](https://my.onlineserver.ir/index.php?rp=/store/7f6303d3/srwr-4-gyg-ssd-yrn) |
| سفارش | [https://my.onlineserver.ir/index.php?rp=/store/7f6303d3/srwr-8-gyg-ssd-yrn](https://my.onlineserver.ir/index.php?rp=/store/7f6303d3/srwr-8-gyg-ssd-yrn) |

**mobinhost**

| Published link label | URL |
| --- | --- |
| ثبت سفارش | [https://my.mobinhost.com/cart.php?a=add&pid=1049](https://my.mobinhost.com/cart.php?a=add&pid=1049) |
| ثبت سفارش | [https://my.mobinhost.com/cart.php?a=add&pid=1050](https://my.mobinhost.com/cart.php?a=add&pid=1050) |
| ثبت سفارش | [https://my.mobinhost.com/cart.php?a=add&pid=1051](https://my.mobinhost.com/cart.php?a=add&pid=1051) |
| ثبت سفارش | [https://my.mobinhost.com/cart.php?a=add&pid=1052](https://my.mobinhost.com/cart.php?a=add&pid=1052) |
| ثبت سفارش | [https://my.mobinhost.com/cart.php?a=add&pid=1053](https://my.mobinhost.com/cart.php?a=add&pid=1053) |
| ثبت سفارش | [https://my.mobinhost.com/cart.php?a=add&pid=1048](https://my.mobinhost.com/cart.php?a=add&pid=1048) |
| ثبت سفارش | [https://my.mobinhost.com/cart.php?a=add&pid=1064](https://my.mobinhost.com/cart.php?a=add&pid=1064) |
| ثبت سفارش | [https://my.mobinhost.com/cart.php?a=add&pid=1065](https://my.mobinhost.com/cart.php?a=add&pid=1065) |
| ثبت سفارش | [https://my.mobinhost.com/cart.php?a=add&pid=1066](https://my.mobinhost.com/cart.php?a=add&pid=1066) |
| ثبت سفارش | [https://my.mobinhost.com/cart.php?a=add&pid=1067](https://my.mobinhost.com/cart.php?a=add&pid=1067) |
| ثبت سفارش | [https://my.mobinhost.com/cart.php?a=add&pid=1260](https://my.mobinhost.com/cart.php?a=add&pid=1260) |
| ثبت سفارش | [https://my.mobinhost.com/cart.php?a=add&pid=1261](https://my.mobinhost.com/cart.php?a=add&pid=1261) |
| ثبت سفارش | [https://my.mobinhost.com/cart.php?a=add&pid=1262](https://my.mobinhost.com/cart.php?a=add&pid=1262) |
| ثبت سفارش | [https://my.mobinhost.com/cart.php?a=add&pid=1263](https://my.mobinhost.com/cart.php?a=add&pid=1263) |
| ثبت سفارش | [https://my.mobinhost.com/cart.php?a=add&pid=1264](https://my.mobinhost.com/cart.php?a=add&pid=1264) |

**shopingserver**

| Published link label | URL |
| --- | --- |
| سفارش و خرید | [https://clients.shopingserver.net/cart.php?a=add&pid=251](https://clients.shopingserver.net/cart.php?a=add&pid=251) |
| سفارش و خرید | [https://clients.shopingserver.net/cart.php?a=add&pid=253](https://clients.shopingserver.net/cart.php?a=add&pid=253) |
| سفارش و خرید | [https://clients.shopingserver.net/cart.php?a=add&pid=484](https://clients.shopingserver.net/cart.php?a=add&pid=484) |
| سفارش و خرید | [https://clients.shopingserver.net/cart.php?a=add&pid=749](https://clients.shopingserver.net/cart.php?a=add&pid=749) |

**pouyasazan**

| Published link label | URL |
| --- | --- |
| مشاهده سبد خرید 0 | [https://panel.pouyasazan.org/cart.php?a=view](https://panel.pouyasazan.org/cart.php?a=view) |
| سفارش دهید | [https://panel.pouyasazan.org/store/iran-vps/vir1](https://panel.pouyasazan.org/store/iran-vps/vir1) |
| سفارش دهید | [https://panel.pouyasazan.org/store/iran-vps/vir2](https://panel.pouyasazan.org/store/iran-vps/vir2) |
| سفارش دهید | [https://panel.pouyasazan.org/store/iran-vps/vir3](https://panel.pouyasazan.org/store/iran-vps/vir3) |
| سفارش دهید | [https://panel.pouyasazan.org/store/iran-vps/vir4](https://panel.pouyasazan.org/store/iran-vps/vir4) |
| سفارش دهید | [https://panel.pouyasazan.org/store/iran-vps/vir5](https://panel.pouyasazan.org/store/iran-vps/vir5) |
| سفارش دهید | [https://panel.pouyasazan.org/store/iran-vps/vir6](https://panel.pouyasazan.org/store/iran-vps/vir6) |

**afagh**

| Published link label | URL |
| --- | --- |
| خرید این پلن | [https://my.afagh.info/cart.php?a=add&pid=55](https://my.afagh.info/cart.php?a=add&pid=55) |
| خرید این پلن | [https://my.afagh.info/cart.php?a=add&pid=56](https://my.afagh.info/cart.php?a=add&pid=56) |
| خرید این پلن | [https://my.afagh.info/cart.php?a=add&pid=72](https://my.afagh.info/cart.php?a=add&pid=72) |
| خرید این پلن | [https://my.afagh.info/cart.php?a=add&pid=151](https://my.afagh.info/cart.php?a=add&pid=151) |
| خرید این پلن | [https://my.afagh.info/cart.php?a=add&pid=162](https://my.afagh.info/cart.php?a=add&pid=162) |

**userver**

| Published link label | URL |
| --- | --- |
| سفارش | [https://my.userver.ir/cart.php?a=add&pid=25](https://my.userver.ir/cart.php?a=add&pid=25) |
| سفارش | [https://my.userver.ir/cart.php?a=add&pid=24](https://my.userver.ir/cart.php?a=add&pid=24) |
| سفارش | [https://my.userver.ir/cart.php?a=add&pid=23](https://my.userver.ir/cart.php?a=add&pid=23) |
| سفارش | [https://my.userver.ir/cart.php?a=add&pid=22](https://my.userver.ir/cart.php?a=add&pid=22) |
| سفارش | [https://my.userver.ir/cart.php?a=add&pid=%20377](https://my.userver.ir/cart.php?a=add&pid=%20377) |
| سفارش | [https://my.userver.ir/cart.php?a=add&pid=50](https://my.userver.ir/cart.php?a=add&pid=50) |
| سفارش | [https://my.userver.ir/cart.php?a=add&pid=49](https://my.userver.ir/cart.php?a=add&pid=49) |
| سفارش | [https://my.userver.ir/cart.php?a=add&pid=48](https://my.userver.ir/cart.php?a=add&pid=48) |
| سفارش | [https://my.userver.ir/cart.php?a=add&pid=320](https://my.userver.ir/cart.php?a=add&pid=320) |
| سفارش | [https://my.userver.ir/cart.php?a=add&pid=319](https://my.userver.ir/cart.php?a=add&pid=319) |
| سفارش | [https://my.userver.ir/cart.php?a=add&pid=250](https://my.userver.ir/cart.php?a=add&pid=250) |
| سفارش | [https://my.userver.ir/cart.php?a=add&pid=249](https://my.userver.ir/cart.php?a=add&pid=249) |
| سفارش | [https://my.userver.ir/cart.php?a=add&pid=376](https://my.userver.ir/cart.php?a=add&pid=376) |

**servervds**

| Published link label | URL |
| --- | --- |
| مشاهده کارت خرید | [https://clients.servervds.com/cart.php?a=view](https://clients.servervds.com/cart.php?a=view) |
| سفارش دهید | [https://clients.servervds.com/index.php?rp=/store/o3o-uo-uoosso2uoe-ossuoeo-ossu-ssd/o3o-uo-uoosso2uoe-ossuoeo-ossu-ssd-personal-2](https://clients.servervds.com/index.php?rp=/store/o3o-uo-uoosso2uoe-ossuoeo-ossu-ssd/o3o-uo-uoosso2uoe-ossuoeo-ossu-ssd-personal-2) |
| سفارش دهید | [https://clients.servervds.com/index.php?rp=/store/o3o-uo-uoosso2uoe-ossuoeo-ossu-ssd/o3o-uo-uoosso2uoe-ossuoeo-ossu-ssd-personal-3](https://clients.servervds.com/index.php?rp=/store/o3o-uo-uoosso2uoe-ossuoeo-ossu-ssd/o3o-uo-uoosso2uoe-ossuoeo-ossu-ssd-personal-3) |
| سفارش دهید | [https://clients.servervds.com/index.php?rp=/store/o3o-uo-uoosso2uoe-ossuoeo-ossu-ssd/o3o-uo-uoosso2uoe-ossuoeo-ossu-ssd-personal-4](https://clients.servervds.com/index.php?rp=/store/o3o-uo-uoosso2uoe-ossuoeo-ossu-ssd/o3o-uo-uoosso2uoe-ossuoeo-ossu-ssd-personal-4) |
| سفارش دهید | [https://clients.servervds.com/index.php?rp=/store/o3o-uo-uoosso2uoe-ossuoeo-ossu-ssd/o3o-uo-uoosso2uoe-ossuoeo-ossu-ssd-pro-2](https://clients.servervds.com/index.php?rp=/store/o3o-uo-uoosso2uoe-ossuoeo-ossu-ssd/o3o-uo-uoosso2uoe-ossuoeo-ossu-ssd-pro-2) |
| سفارش دهید | [https://clients.servervds.com/index.php?rp=/store/o3o-uo-uoosso2uoe-ossuoeo-ossu-ssd/o3o-uo-uoosso2uoe-ossuoeo-ossu-ssd-pro-3](https://clients.servervds.com/index.php?rp=/store/o3o-uo-uoosso2uoe-ossuoeo-ossu-ssd/o3o-uo-uoosso2uoe-ossuoeo-ossu-ssd-pro-3) |
| سفارش دهید | [https://clients.servervds.com/index.php?rp=/store/o3o-uo-uoosso2uoe-ossuoeo-ossu-ssd/o3o-uo-uoosso2uoe-ossuoeo-ossu-ssd-company-1](https://clients.servervds.com/index.php?rp=/store/o3o-uo-uoosso2uoe-ossuoeo-ossu-ssd/o3o-uo-uoosso2uoe-ossuoeo-ossu-ssd-company-1) |
| سفارش دهید | [https://clients.servervds.com/index.php?rp=/store/o3o-uo-uoosso2uoe-ossuoeo-ossu-ssd/o3o-uo-uoosso2uoe-ossuoeo-ossu-ssd-company-2](https://clients.servervds.com/index.php?rp=/store/o3o-uo-uoosso2uoe-ossuoeo-ossu-ssd/o3o-uo-uoosso2uoe-ossuoeo-ossu-ssd-company-2) |
| سفارش دهید | [https://clients.servervds.com/index.php?rp=/store/o3o-uo-uoosso2uoe-ossuoeo-ossu-ssd/o3o-uo-uoosso2uoe-ossuoeo-ossu-ssd-company-3](https://clients.servervds.com/index.php?rp=/store/o3o-uo-uoosso2uoe-ossuoeo-ossu-ssd/o3o-uo-uoosso2uoe-ossuoeo-ossu-ssd-company-3) |

## Raw snapshot records


| Source | Attempt UTC | Saved UTC | HTTP result | Raw artifact | SHA-256 |
| --- | --- | --- | --- | --- | --- |
| [abraserver](https://abraserver.com/) | 2026-10-29T02:23:53.357115+00:00 | 2026-10-29T02:23:59.967782+00:00 | 200 | [abraserver.html](evidence/vps-additional-2026-10-29/abraserver.html) | f53be0e877569f967b760c30e7b25528c0bf8d3a1e94ed471169746b5fc794a9 |
| [abrha](https://abrha.org/vps/unlimited-vps/) | 2026-10-29T02:23:53.361480+00:00 | 2026-10-29T02:24:03.740090+00:00 | 200 | [abrha.html](evidence/vps-additional-2026-10-29/abrha.html) | 7a6dd2afd4a101fa1051ad8465893b7c664a1dbc7296cf7d1c05c443a8004c8d |
| [afagh](https://afagh.info/vps-iran/) | 2026-10-29T02:22:59.673878+00:00 | 2026-10-29T02:23:25.500720+00:00 | 200 | [afagh.html](evidence/vps-additional-2026-10-29/afagh.html) | b92e2646797d3afdd3821e9d1360dcea0042e1a01d9385449977baeabd12abca |
| [arianet-iran](https://www.ariaservice.net/%D8%B3%D8%B1%D9%88%D8%B1%D9%85%D8%AC%D8%A7%D8%B2%DB%8C-%D8%A7%D8%B1%D8%B2%D8%A7%D9%86-%D8%A7%DB%8C%D8%B1%D8%A7%D9%86) | 2026-10-29T02:25:28.978237+00:00 | 2026-10-29T02:25:29.368759+00:00 | 200 | [arianet-iran.html](evidence/vps-additional-2026-10-29/arianet-iran.html) | 0c251dee705d70d2fa4ce04d44f1f744bd6ed8e92a35c88d12293d9d21a2cbbb |
| [arianet](https://www.ariaservice.net/pricing) | 2026-10-29T02:23:55.034930+00:00 | 2026-10-29T02:23:55.396160+00:00 | 200 | [arianet.html](evidence/vps-additional-2026-10-29/arianet.html) | cbde1e79aff9a8461146f232e79ef88c78d4b30e8f67a3eaba0f838f7be9fc13 |
| [azardata](https://azardata.net/vps/nvme/iran/) | 2026-10-29T02:23:52.817369+00:00 | 2026-10-29T02:23:53.204301+00:00 | 200 | [azardata.html](evidence/vps-additional-2026-10-29/azardata.html) | 9cfe70b339e0154763b3ce744f9aa6c4c7079a127837bc66f4c9757624179c9e |
| [berbidserver](https://berbidserver.com/portal/index.php?rp=%2Fstore%2Fvps-iran-ssd) | 2026-10-29T02:23:52.818641+00:00 | no successful snapshot | HTTP Error 403: Forbidden | [berbidserver.metadata.json](evidence/vps-additional-2026-10-29/berbidserver.metadata.json) | — |
| [famaserver-iran](https://famaserver.com/vps/iran/) | 2026-10-29T02:25:28.977658+00:00 | 2026-10-29T02:25:29.339861+00:00 | 200 | [famaserver-iran.html](evidence/vps-additional-2026-10-29/famaserver-iran.html) | f69e1f1a927e97eaa5fd2ef30f1500db3eaf101636e1e3b7d721a714cd13b123 |
| [famaserver](https://famaserver.com/vps/) | 2026-10-29T02:23:54.737838+00:00 | 2026-10-29T02:23:54.934751+00:00 | 200 | [famaserver.html](evidence/vps-additional-2026-10-29/famaserver.html) | c2d20707783164cf7d49b23ad0521e522d9d0cd1078c395005864ad8815c4c40 |
| [hidata-sata-store](https://my.hidata.org/store/ir-sata-vps) | 2026-10-29T02:26:23.739181+00:00 | 2026-10-29T02:26:25.213284+00:00 | 200 | [hidata-sata-store.html](evidence/vps-additional-2026-10-29/hidata-sata-store.html) | aca5abed0717cac2f2adf8a3cb22ff541442bca4c50d031b540eee93e901c71a |
| [hidata-sata](https://hidata.org/vps/iran-sata/) | 2026-10-29T02:24:41.393434+00:00 | 2026-10-29T02:24:42.567510+00:00 | 200 | [hidata-sata.html](evidence/vps-additional-2026-10-29/hidata-sata.html) | 54e61d708ce803929f289d4b471181a3472e960bae807e14f1d10c36f9311182 |
| [hidata-store](https://my.hidata.org/store/iran-nvme-vps) | 2026-10-29T02:25:28.976911+00:00 | 2026-10-29T02:25:31.041260+00:00 | 200 | [hidata-store.html](evidence/vps-additional-2026-10-29/hidata-store.html) | a6c27183ac9536df9888a703cab49b0a111e8048ae8d6799ed459c4eb9407f22 |
| [hidata](https://hidata.org/vps/iran-nvme/) | 2026-10-29T02:22:59.676036+00:00 | 2026-10-29T02:23:00.991010+00:00 | 200 | [hidata.html](evidence/vps-additional-2026-10-29/hidata.html) | 3142a4b4317e3f39285a971041327d1f108b115a9c86c79ba65c3b553d661189 |
| [highhost](https://client.highhost.org/store/iran-normal-vps?language=farsi) | 2026-10-29T02:23:53.495023+00:00 | 2026-10-29T02:23:59.697699+00:00 | 200 | [highhost.html](evidence/vps-additional-2026-10-29/highhost.html) | 4af5ca42ece83c3f7f8e0eb1be9ddbcad2932d96cf294510838e347f162646d8 |
| [hodacloud](https://hodacloud.com/) | 2026-10-29T02:22:59.676593+00:00 | 2026-10-29T02:23:10.837961+00:00 | 200 | [hodacloud.html](evidence/vps-additional-2026-10-29/hodacloud.html) | cbd2c99a223cb64edaf3898e1419c6c3085316a48e06a7fa2bf0d4f9ff7a840f |
| [hostida-cloud](https://hostida.com/cloud/iran/) | 2026-10-29T02:24:42.667804+00:00 | 2026-10-29T02:24:43.031525+00:00 | 200 | [hostida-cloud.html](evidence/vps-additional-2026-10-29/hostida-cloud.html) | 6c17bd368c23f95dfa5d121e4cf5cdcaa8032e3706acc642dc835dc35b196dc4 |
| [hostida](https://hostida.com/cloud/vps/iran/) | 2026-10-29T02:22:59.674442+00:00 | 2026-10-29T02:23:00.174003+00:00 | 200 | [hostida.html](evidence/vps-additional-2026-10-29/hostida.html) | d1343d73ef17d42c8be3b3b0ff15152b3c30b3140983c1729281dd6fba96aae1 |
| [irserverco](https://irserverco.ir/vps-iran/) | 2026-10-29T02:23:53.520179+00:00 | 2026-10-29T02:23:54.653836+00:00 | 200 | [irserverco.html](evidence/vps-additional-2026-10-29/irserverco.html) | e60b56b2fbc9e91b00f9faa3497aea8ed8f69a8e20693c5ada0fca41454cc668 |
| [logicserver](https://logicserver.org/iran-vps/) | 2026-10-29T02:23:52.815872+00:00 | 2026-10-29T02:23:53.313751+00:00 | 200 | [logicserver.html](evidence/vps-additional-2026-10-29/logicserver.html) | 9f47db367c79f51e889519810edfdf01440ed0e1b582a8c18d9f5ad47229d1e4 |
| [mobinhost](https://www.mobinhost.com/vps-iran/) | 2026-10-29T02:23:52.822952+00:00 | 2026-10-29T02:24:00.490260+00:00 | 200 | [mobinhost.html](evidence/vps-additional-2026-10-29/mobinhost.html) | e0d00fb0b9c0558725c71095e74f172c2be368a41242d08c54a316957236c760 |
| [noderio](https://noderio.com/vps) | 2026-10-29T02:22:59.681618+00:00 | 2026-10-29T02:23:06.244956+00:00 | 200 | [noderio.html](evidence/vps-additional-2026-10-29/noderio.html) | cf6cd69d9c0aa4cebc804040483c9bcb930ea65c98ff286bca76919ba0dd3524 |
| [onlineserver-iran](https://onlineserver.ir/virtual-server/iran-virtual-server) | 2026-10-29T02:24:43.089750+00:00 | 2026-10-29T02:24:49.503902+00:00 | 200 | [onlineserver-iran.html](evidence/vps-additional-2026-10-29/onlineserver-iran.html) | cf055cf8bd5ea5b0cb13c48314249f2af9c2d2095ba324b46726f86b20637780 |
| [onlineserver-ssd](https://onlineserver.ir/virtual-server/iran-virtual-ssd-server) | 2026-10-29T02:26:39.420557+00:00 | 2026-10-29T02:26:45.987310+00:00 | 200 | [onlineserver-ssd.html](evidence/vps-additional-2026-10-29/onlineserver-ssd.html) | 90dd70b3848c52b63e03c686ac2abdbe5d86906b9e4a94ba430444817c16626f |
| [onlineserver](https://onlineserver.ir/) | 2026-10-29T02:22:59.675525+00:00 | 2026-10-29T02:23:00.371732+00:00 | 200 | [onlineserver.html](evidence/vps-additional-2026-10-29/onlineserver.html) | 294fda58b0245d07eddfb5b4773fb7607533d6570de20ad7a9352345eba8bff5 |
| [persianwhois](https://persianwhois.com/virtual-server/ssd-vps/) | 2026-10-29T02:22:59.680214+00:00 | 2026-10-29T02:23:06.973994+00:00 | 200 | [persianwhois.html](evidence/vps-additional-2026-10-29/persianwhois.html) | 1f0d5deaf2cfe735eaa9fa7e156317dc26e6bb5acaa2bc1edcaf40c8b20cdd29 |
| [pouyasazan](https://panel.pouyasazan.org/store/iran-vps) | 2026-10-29T02:22:59.674849+00:00 | 2026-10-29T02:23:06.729747+00:00 | 200 | [pouyasazan.html](evidence/vps-additional-2026-10-29/pouyasazan.html) | 788944fa6aca8d6430b795106b1c55652fea80267571ccf0a7484718c9d7f9b9 |
| [samanhosting](https://samanhosting.ir/index.php?rp=%2Fstore%2Fvps-irn-nvme) | 2026-10-29T02:23:52.817019+00:00 | 2026-10-29T02:23:53.597773+00:00 | 200 | [samanhosting.html](evidence/vps-additional-2026-10-29/samanhosting.html) | 9c7a47eb41f31188e5cd653e36b1ae29160bbc0ec19534a4351150a6be04beb9 |
| [servervds](https://clients.servervds.com/index.php?rp=%2Fstore%2Fo3o-uo-uoosso2uoe-ossuoeo-ossu-ssd) | 2026-10-29T02:23:53.601966+00:00 | 2026-10-29T02:24:00.218188+00:00 | 200 | [servervds.html](evidence/vps-additional-2026-10-29/servervds.html) | 523b07d5f70cbe41b8e5ebd65f8a7ff75262a7f7206c5703c02e2a107407d2f4 |
| [shetabanhost](https://shetabanhost.com/vps/iran-ssd/) | 2026-10-29T02:23:52.819278+00:00 | 2026-10-29T02:23:53.443213+00:00 | 200 | [shetabanhost.html](evidence/vps-additional-2026-10-29/shetabanhost.html) | 6b7bdfacdee7b6d6758615bf79e5bcbdeca3a755a5e2846a5204f2301b862907 |
| [shopingserver](https://shopingserver.com/vps/iran-vps/) | 2026-10-29T02:23:52.818051+00:00 | 2026-10-29T02:24:16.039039+00:00 | 200 | [shopingserver.html](evidence/vps-additional-2026-10-29/shopingserver.html) | 9f45ddc1800cff84d54948b72281200981deec0fe7eaf4251d288457513492f1 |
| [spadserver](https://crm.spadserver.com/store/iran-vps) | 2026-10-29T02:23:52.816574+00:00 | 2026-10-29T02:23:53.484183+00:00 | 200 | [spadserver.html](evidence/vps-additional-2026-10-29/spadserver.html) | 58983463540309edeec4eb13a4618e7245f498da0f045fe03f7ab33a38ebc456 |
| [userver](https://userver.ir/vps-iran/) | 2026-10-29T02:22:59.673018+00:00 | 2026-10-29T02:23:06.419651+00:00 | 200 | [userver.html](evidence/vps-additional-2026-10-29/userver.html) | 59ab46dfeb299a97ba77748dbfb9462c36ad57f974be3ac5a61a2f764ffd14d8 |
| [visnet](https://host.visnet.ir/%D8%B3%D8%B1%D9%88%D8%B1-%D9%85%D8%AC%D8%A7%D8%B2%DB%8C-%D8%A7%DB%8C%D8%B1%D8%A7%D9%86/) | 2026-10-29T02:23:52.824367+00:00 | 2026-10-29T02:23:59.524804+00:00 | 200 | [visnet.html](evidence/vps-additional-2026-10-29/visnet.html) | 0d217bd7b531111e5eb06eca5090cdd1d51c3b18bb655224773e3853af3a1121 |


Review accounting: 191 published plan/card rows recorded across source sections (includes held/unavailable/location-conflict/incomplete-resource rows, not an admission count); 33 public retrieval attempts/sources retained in manifest. Counts are descriptive outcomes, not selection ceilings. No rows were added to the catalog by this research task.

