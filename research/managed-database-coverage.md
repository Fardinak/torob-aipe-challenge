# Iranian managed database coverage

Research date: 2026-09-20. Decision support for [Investigate Iranian managed database coverage and comparable tariff evidence](https://github.com/Fardinak/torob-aipe-challenge/issues/6), within [Chart a complete datacenter discovery experience for the Torob challenge](https://github.com/Fardinak/torob-aipe-challenge/issues/5).

## Finding

**There is enough publicly documented provider diversity to investigate a useful managed-database discovery category. There is not yet enough evidence for an unconditional cheapest complete-bill ranking or verified checkout availability.** This is a research conclusion, not approval of release scope.

The bounded shortlist examined Liara, Hamravesh, ArvanCloud, ManageIT and existing VPS provider IranServer. Four publish relevant database products; three publish usable headline resource/price examples. Public sources demonstrate product existence and handoff paths, not capacity or successful provisioning. No account creation, purchase, outreach, workload testing or production catalog changes occurred.

## Provider evidence

### Liara

The DBaaS page names PostgreSQL, MySQL, MongoDB, Redis, MariaDB, Elasticsearch and MSSQL, and describes provider handling of installation, updates, monitoring and scaling. Its current visible table advertises Earth: 0.512 GB RAM / 0.5 vCPU / 5 GB SSD at 750,000 toman/month or 1,041/hour; Mars: 1 GB / 1 vCPU / 10 GB at 1,300,000/month or 1,805/hour; Jupiter: 2 GB / 1 vCPU / 20 GB at 2,300,000/month or 3,194/hour. These are published reference amounts, not a derived hourly-to-monthly bill. Minimum wallet credit, rounding, taxes, traffic allowance, selectable regions and capacity are unverified. [DBaaS product and tariff](https://liara.ir/products/cloud-database/).

Hardware and feature packages are separate choices. [Plan structure](https://docs.liara.ir/dbaas/details/plans/about/). The feature-package document says bronze has no automatic/manual backups; silver has daily backups retained seven days and 45 GB backup storage; gold adds hourly/weekly/monthly retention and 155 GB storage. Public-network access appears across packages. Feature-package prices were not established. [Feature packages](https://docs.liara.ir/dbaas/details/plans/software-plans/).

That conflicts with the general PostgreSQL backup guide saying automatic daily backups occur. Do not assign daily backups to the cheapest plan until that discrepancy is resolved. [Backup guide](https://docs.liara.ir/dbaas/postgresql/how-tos/create-backup/). The PostgreSQL setup guide requires login and selection of engine version, private network, hardware and feature package. Public access is optional; its Pgvector support explicitly excludes HNSW indexing. This is a concrete reason software-name matching cannot imply workload compatibility. [Setup guide](https://docs.liara.ir/dbaas/postgresql/quick-setup/).

A freshness trap appeared during research: the search-index version of the DBaaS page showed Earth at 209,000/month, while opening the current page showed 750,000. The figures above use the opened page; this observation is not evidence of the date or cause of a tariff change. Recheck before publication.

### Hamravesh

Its docs explicitly distinguish ordinary cloud databases from managed databases: ordinary offers independent management and daily backups; managed adds PITR, horizontal scaling and continuous monitoring. Both list PostgreSQL and MySQL. One-click applications are therefore not sufficient evidence of a managed service. [Database classes](https://docs.hamravesh.com/products/dbaas).

The managed setup guide shows PostgreSQL 17 as an example, also supports MySQL, and asks users to select a Kubernetes cluster and namespace. Standalone is explicitly **not HA**; the standby-node configuration adds HA. The final monthly cost appears in the console. The observed documentation did not establish numerical CPU/RAM/storage options, publicly reproducible price, billing quantum, minimum wallet charge, or selectable database locations. [Managed setup](https://docs.hamravesh.com/products/dbaas/managed-database/quick-start).

Managed PITR covers 48 hours and stores recovery data outside the primary datacenter; restore/fork creates a new database. [Backup documentation](https://docs.hamravesh.com/products/dbaas/managed-database/backup). Credentials/access grants remain a customer concern; public exposure is optional, and standby read traffic is not automatically balanced. [FAQ](https://docs.hamravesh.com/products/dbaas/faq). The product page advertises provider maintenance, version upgrades, monitoring and 24/7 support. [Managed service](https://hamravesh.com/managed-database).

**Candidate status:** documented managed PostgreSQL/MySQL product, price unknown. No invented plan sizes or prices.

### ArvanCloud

The product page has creation links for managed PostgreSQL and MySQL. MongoDB and Redis are marked coming soon, so exclude them from available offers. It describes provider installation, backup and updates, daily backups in two locations, optional standby nodes for HA, and read-only nodes. The PITR section itself says the panel capability is coming soon; do not infer available self-service PITR from general marketing. Creation includes datacenter selection, but this investigation did not establish current selectable regions. [Managed database product](https://www.arvancloud.ir/fa/products/databases).

The tariff page advertises Starter 2 CPU / 2 GB RAM / 20 GB disk at 1,267,350 toman/month, with a creation URL identifying `Starter-sb1-2-2-0`. It describes hourly PAYG and a wallet balance sufficient for seven future service days. This is a credit prerequisite, not evidence of a seven-day minimum charge. Upload and download are listed free; backup through seven days is free; IPv4 is 195,000/month. Disk rates per GB/month are HDD 14,400, SSD 30,000 and local SSD 42,000. Exact engine/region applicability, IP inclusion in headline examples, tax, allocation across replicas, billing rounding and checkout totals remain unresolved. [Tariff](https://www.arvancloud.ir/fa/pricing/databases).

The tariff first returned a transfer interstitial; following the product's pricing link later produced the full public page. An access failure is not evidence that a product is absent.

### ManageIT

The database page names PostgreSQL, MySQL, MariaDB, Redis, MongoDB and Elastic. It advertises managed installation/maintenance, seven retained daily backups, TLS-only connections, optional private networking, monitoring and separately charged read replicas. Example monthly toman rows: 1 vCPU / 2 GB / 25 GB SSD / 100 connections = 980,000; 2 vCPU / 4 GB / 50 GB / 200 connections = 1,890,000; 2 vCPU / 8 GB / 100 GB / 300 connections = 2,690,000. Read replicas cost the selected plan again. Billing is described as hourly PAYG despite monthly table amounts. Engine versions, region-specific availability, minimum credit, traffic, extra backup storage, IP, tax and hourly conversion remain unknown. The HA marketing does not establish failover semantics or an SLA. [Database product and tariffs](https://www.manageitcloud.com/database).

### IranServer

The inspected product menu covers VPS, dedicated servers, cloud infrastructure and ready applications; this bounded review did not locate a standalone managed-database offer or tariff. This is a **not verified** result, not a claim that IranServer cannot provide one. Preserve the existing VPS records as their own product class. [Public product menu](https://www.iranserver.com/).

## Public handoff and purchase verification

The advertised actions lead to [Liara databases](https://console.liara.ir/databases), [Hamravesh databases](https://console.hamravesh.com/dbaas), [Arvan Starter creation](https://panel.arvancloud.ir/dbaas/databases/create?flavor=Starter-sb1-2-2-0), and [ManageIT projects](https://console.manageit.dev/projects). The text retrieval returned JavaScript shells (Liara explicitly requires JavaScript), not usable checkout selections. Liara's setup docs explicitly require login. Authentication details for the other consoles were not verified. None of these links proves stock, engine-specific pricing or purchasability without an account. Do not label an offer currently available based solely on a CTA.

## Minimal candidate catalog to evaluate

Research recommendation for the subsequent human catalog decision:

- Start with PostgreSQL as the common managed engine. A common engine gives meaningful alternatives without promising performance equivalence or prescribing hardware for an unknown workload.
- Use two small advertised sizes each from Liara and ManageIT as candidate price examples, preserving provider and feature-package identities. Add Arvan's Starter configuration only with explicit unresolved inclusion/engine/region facts. These yield five price examples across three providers, subject to source recheck and admission policy.
- Retain Hamravesh as an evidence-backed, unpriced product candidate if discovery is allowed to show unknown prices. Do not fabricate a comparable sized plan.
- Keep ordinary hosted databases, managed databases and self-installed VPS distinguishable. ManageIT's VPS presence does not make its database offer identical to its VPS offering.

These recommendations derive from the sources above; they do not decide which candidates ship. Database catalog admission should require: provider, product class, engine/version evidence, hardware and feature package, node topology, resource units, billing basis, included/excluded charges, source date and handoff URL. Unknown values should stay unknown. A CPU count alone is not evidence of comparable performance.

## Decisions the evidence leaves open

[Choose the catalog boundary and comparison promises](https://github.com/Fardinak/torob-aipe-challenge/issues/7) should decide whether the challenge permits published-price discovery with clearly unpriced/partially priced results, or requires verified complete totals before admission. The latter needs additional evidence/access work.

Before ranking complete costs, settle feature-package surcharges and backup contradiction for Liara; engine/region applicability and IPv4 inclusion for Arvan; traffic, hourly conversion and mandatory fees for ManageIT; and public or authenticated tariff evidence for Hamravesh. Across all admitted offers, confirm tax treatment, region, versions, capacity and minimum charge separately from wallet credit. No quantitative suitability recommendation for PostgreSQL follows from this research.

The best-supported distinction for the UX is therefore product/service responsibility plus explicit published pricing, not an undifferentiated cheapest machine list. The existing VPS comparison can remain useful alongside database discovery, but should not silently donate its traffic policy to a database product.
