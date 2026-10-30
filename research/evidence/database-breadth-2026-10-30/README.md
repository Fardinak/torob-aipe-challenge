# Database breadth evidence — 2026-10-30

Read the findings in [`../../database-source-breadth-2026-10-30.md`](../../database-source-breadth-2026-10-30.md).

- `manifest.json`: SHA-256, byte count and UTC file timestamp for each retained artifact. The manifest excludes itself to avoid recursive hashing.
- `request-index.json`: consolidated direct HTTP attempts, URLs, timestamps, status, failures and verification of the raw-body hashes. Original per-request `.meta.json` files remain authoritative.
- `*.html`: actual curl response bodies, including JSON API results, JavaScript and unsuccessful/interstitial bodies. Extension does not establish content type or verification success.
- `*.headers.txt`: actual curl response headers across redirects.
- `*.txt`, `*.links.json`: extracted derivatives of the raw snapshots; header files are not page text.
- `search*.json`, `arvan-*.json`, `abrclick-sky-web.json`, `sako.json`, `chab.json`, `web.json`: retained search/web retrieval transcripts. HTTP status is unknown when the tool did not expose it. Some files record retention time rather than the exact original tool-call time; do not invent a more precise timestamp. Search-index snippets are leads, not freshly verified tariffs.
- `issue-12.json`, `issue-21.json`, `issue-retrieval-metadata.json`: full GitHub issue body/comments and CLI retrieval metadata; no tracker changes.
- `chabokan-quote-inventory.json`: mechanical transcription of 26 actual successful public GET quote responses with request metadata and raw hashes. Includes named plans and separately qualified custom requests, not synthetic catalog fixtures.
- `chabokan-engine-page-audit.json`: confirms all eight named monthly tariff amounts were present in each of the thirteen retained engine pages; this is an audit derivative, not an independent source.
- `chabokan-flight-decoded.txt`: decoded source-page derivative used to inspect initial pricing/settings.
- `capture.py`: the actual read-only HTTP capture helper. Empty or interstitial bodies remain evidence of an access limitation, not evidence of an offer's content.

No accounts, provider contact, purchases or authenticated provider consoles were used. See the findings for engine applicability, coming-soon exclusions, shared quotas, incomplete prices, nominal match candidates and unfinished configuration acquisition.
