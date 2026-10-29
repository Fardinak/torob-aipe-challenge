# Discovery search vocabulary

Search is case-insensitive, normalizes Persian/Arabic kaf and yeh and treats
hyphens and zero-width word separators as spaces. Every query word must match
an offer's category, product name or engine; provider names are excluded.
There is no workload-to-hardware mapping or fuzzy recommendation.

Category aliases use the release vocabulary from issue #12 and CONTEXT.md:
`VPS`, `virtual private server`, `سرور مجازی`; `managed database`,
`دیتابیس مدیریت‌شده`. Product and engine names come directly from admitted
catalog offers, without a fixed engine whitelist.

Two additional Persian engine aliases were checked against retained first-party
setup evidence on 2026-10-29:

| Engine     | Alias  | Evidence                                                                                                                                                             |
| ---------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| PostgreSQL | پستگرس | [Liara setup](https://docs.liara.ir/dbaas/postgresql/quick-setup/), retained in `research/evidence/liara-pg-setup-2026-10-29.html`: «دیتابیس پستگرس لیارا»           |
| Redis      | ردیس   | [Liara setup](https://docs.liara.ir/dbaas/redis/quick-setup/), retained in `research/evidence/liara-redis-setup-2026-10-29.html`: «ردیس علاوه بر ذخیره‌سازی داده‌ها» |

Add other spellings only after checking applicable evidence. A provider name
can still match if it is itself part of a published product name; provider
metadata never supplies searchable text.
