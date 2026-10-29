# VPS sample evidence refresh — 2026-10-29

Reviewer: Codex, through direct retrieval and inspection of first-party HTML.
Scope: recheck the original six ManageIT and five IranServer configurations for
issue #13. This is not the broader acquisition/release work in issue #12.

The web reader initially failed for ManageIT and timed out on IranServer
follow-up. Direct HTTPS retrieval succeeded for all three pages. Those retrieval
failures and the successful fallback are recorded; source capture timestamps and
SHA-256 digests are in `vps-reviewed-catalog.json`. Full new HTML snapshots are
retained beside the unchanged historical evidence. Successful review dates are
2026-10-29 for the newly reviewed configurations. The old 16 GB configuration
retains its documented 2026-09-19 successful review date.

## Reviewed findings

- [ManageIT server tariff](https://www.manageitcloud.com/cloud-server): all six
  sampled CPU/RAM/SSD sizes and monthly-reference prices match the old sample.
  Hourly PAYG wording remains; divisor, rounding and cap are unresolved. Upload
  remains free; download is 1,200 toman/GB for Parvaz, Omid and Parsian. Per-plan
  datacenter mapping is unresolved. The egress interpretation remains a disclosed
  product assumption; the source does not explicitly verify server direction.
- [ManageIT floating IP](https://www.manageitcloud.com/floating-ip): one independent
  floating IPv4 remains 195,000 toman per reference month, charged hourly; this is
  optional and is not added to the VPS base. Free IPv6 is stated. Base IPv4
  inclusion, tax and complete mandatory fees remain unknown.
- [IranServer Iran VPS tariff](https://www.iranserver.com/vps/iran/): the table and
  repeated cards agree on the sampled current configurations below. Each has
  1,000 GB traffic, with direction and overage unresolved. Shared CPU is stated
  for the family; general NVMe marketing does not verify each plan's storage type.

| Published name | CPU / RAM GB / disk GB | Monthly toman | Identity decision             |
| -------------- | ---------------------- | ------------: | ----------------------------- |
| NGP-small40    | 1 / 4 / 40             |     2,436,399 | Retain ID; new price revision |
| NGP-medium40   | 2 / 8 / 40             |     3,517,599 | Retain ID; new price revision |
| NGP-large80    | 4 / 32 / 80            |     8,800,639 | New ID; changed RAM           |
| NGP-xlarge120  | 8 / 32 / 120           |    10,140,479 | Retain ID; new price revision |
| NGP-2xlarge160 | 16 / 64 / 160          |    18,857,919 | Retain ID; new price revision |

The former NGP-large80 had 16 GB RAM and a 4,823,039 toman monthly tariff. Its
current RAM and tariff support are unresolved, and its old values cannot support
RAM filters or price calculations. The name's reuse does not justify rewriting
its identity. The retained old offer is inspectable without a resource filter,
with warnings and a failed verification attempt linking the new source. No
withdrawal was confirmed, and neither this change nor access failure claims one.

The refreshed 4 GB / 1,000 GB egress example still changes ordering: ManageIT's
2c/4g/75g base of 1,420,000 becomes a 2,620,000 toman subtotal; IranServer
NGP-small40 contributes 2,436,399 within the shared-pool assumption. Above the
allowance, IranServer remains unpriced rather than competing with a base price.
Both figures exclude unresolved mandatory costs and tax and imply no live stock.

Provider records and offer policies are data-driven; neither IDs nor provider
names choose traffic behavior. Twelve retained records represent eleven newly
reviewed configurations and one unresolved historical configuration. Earlier
research and snapshots have not been relabelled as current verification.
