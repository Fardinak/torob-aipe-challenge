# Initial managed database review — 2026-10-29

Reviewed by Codex against retained first-party HTML snapshots and their build-validated SHA-256 hashes. These are four initial offers for #15, not the broad acquisition or exact cross-provider release gate of #12.

Liara's PostgreSQL and Redis quick-setup pages explicitly direct buyers to the shared database hardware and feature packages. The current pricing page's DBaaS base table publishes Mars (1 vCPU, 1 GB RAM, 10 GB SSD, 1,300,000 toman/month) and Saturn (2 vCPU, 4 GB RAM, 40 GB SSD, 4,125,000 toman/month). Admit these configurations for both engines with the base package. Retain source monthly references and separate hourly billing; do not derive a conversion. Versions are copied from each engine's own choose-version documentation.

The software-package documentation establishes provider resource monitoring (seven days of charts in base), beyond initial provisioning. No automatic maintenance/update promise is inferred. The PostgreSQL backup guide claims daily automatic backups, while the package table says base has no backups. Record a conflict and expose both sources; do not promise backup inclusion. Redis backup applicability likewise remains unresolved rather than inferred from a generic guide. Node topology, location, mandatory network charges and tax are unknown. Unknown topology prevents cross-offer consolidation. Ordinary hosting and VPS plans are not admitted as database offers.

Sources: https://liara.ir/pricing/, https://docs.liara.ir/dbaas/details/plans/software-plans/, engine quick-setup and choose-version pages, and https://docs.liara.ir/dbaas/postgresql/how-tos/create-backup/. See catalog source references for exact retained files and capture times. The live captured tariff differs from older search-index copies; retained HTML is the reviewed price evidence.

Other sizes, packages, engines and providers require the dedicated acquisition review; this sample imposes no whitelist or coverage ceiling. No real cross-provider match is claimed. Provider links lead to general tariffs, not configuration checkout or evidence of available capacity.
