# Torob AI Product Engineer challenge

Reviewed 2026-09-19. English summary of Torob's Persian challenge. Research only; no application, credit request, or puzzle submission was made.

## What Torob asks for

Build a **“Torob for X”**: choose a market whose search experience could be substantially better, and build your own product for it. The examples are airline tickets, insurance, cars, and housing; these are examples, not an exhaustive list. Torob asks applicants to turn an ambiguous problem into a usable demo independently. [Challenge](https://jobs.torob.com/ai-product-engineer)

The stated sequence is:

1. Choose a market and create a Torob-like experience with your own perspective.
2. Use AI tools for research, coding, design, data, testing, and rapid iteration.
3. Record a video **at most five minutes long**, showing the problem, product, and important decisions.
4. Send the video, project link, and contact information. [Application flow](https://jobs.torob.com/ai-product-engineer#flow)

## Deliverables and submission details

| Item | Published requirement |
| --- | --- |
| Product | A built product demonstrated in the video. |
| Demo video | Maximum five minutes; upload a file or provide a link the reviewers can access. |
| Uploaded video | Maximum 200 MB; client accepts MP4, WebM, and MOV. |
| Project link | Required URL; labeled “GitHub or project link.” The GitHub placeholder does not establish a mandatory public repository. |
| Contact information | Full name, email, and phone number are required. |
| Additional explanation | Optional; the visible text field has a 700-character maximum. |
| Consent | Required consent to review the submitted information for potential collaboration. |

Sources: [Demo submission form](https://jobs.torob.com/ai-product-engineer#demo-apply), [first-party form validation script](https://jobs.torob.com/challenge.js?v=20260914-review-panel-1). The interface labels the upload limit “200 MB”; the client implements it as `200 * 1024 * 1024` bytes.

There is also an optional **$20 AI credit** route for applicants who lack suitable access to AI tools. It requires contact details, consent, and a PDF résumé of at most 5 MB. Torob reviews the request and coordinates credit only if approved. Credit and demo submissions are reviewed separately; requesting credit is not presented as a prerequisite to building or submitting. [Credit route](https://jobs.torob.com/ai-product-engineer#credit-apply)

The browser script checks that the role is available and that the applicant has completed the careers-site puzzle before enabling the challenge interface. A server-issued proof accompanies submissions. This is an access/submission prerequisite, separate from the product brief. The puzzle was not attempted during this research. [First-party challenge script](https://jobs.torob.com/challenge.js?v=20260914-review-panel-1)

## What appears to matter in evaluation

Torob explicitly describes the desired combination as **full-stack engineering, product judgment, UX taste, and practical use of AI**. The role description emphasizes understanding a problem, thinking with users and data, quickly prototyping with AI, and personally bringing the experience to a usable level. No numerical scoring rubric is published in the reviewed challenge. [Role description](https://jobs.torob.com/ai-product-engineer#role)

The hero illustrates a pipeline of collecting offers, normalizing messy data, ranking for user intent, and explaining the best choice. A separate diagram connects user problems with data, ranking, and UX. These communicate the kind of product Torob has in mind, but the page does **not explicitly mandate** that exact architecture or every illustrated step. [Challenge](https://jobs.torob.com/ai-product-engineer)

**Interpretation:** a focused, credible comparison/search product with clear decisions is likely a stronger fit than a broad unfinished application. AI use in the development process is explicit; a runtime LLM feature is not explicitly required. These are readings of the brief, not additional Torob rules.

## Practical scope to consider

The following is a suggested way to satisfy the brief, not a prescribed implementation:

- Pick one market, one user type, and one consequential search or comparison task.
- Make one complete journey work: express a need, inspect comparable options, understand a recommendation or ordering, and reach a useful next action.
- Choose a data source and scope that allow the demo to make honest, reproducible claims; visibly explain any sample data or freshness limitations.
- Spend the five-minute video budget on the user's problem, the working journey, and the most important product/engineering tradeoffs. Briefly show how AI helped deliver the work.

The principal design risk is choosing a market whose acquisition and normalization demands consume the time needed to demonstrate a useful product. A small coherent slice is a reasonable starting hypothesis; no market has been selected by this research.

## Unspecified details

The reviewed page does not specify a deadline, expected build duration, required stack, minimum dataset size, source count, deployment requirement, public-source-code requirement, video language, runtime-AI requirement, or policy on existing projects. It also does not establish whether synthetic/sample data would satisfy reviewers. Treat these as open questions rather than implied permission or prohibition. [Challenge and application form](https://jobs.torob.com/ai-product-engineer)

## Source and access notes

- [Official challenge page](https://jobs.torob.com/ai-product-engineer): primary source for the brief, role framing, submission forms, and optional credit path. The web reader could not open it; its publicly served HTML was retrieved directly and inspected.
- [Official browser script](https://jobs.torob.com/challenge.js?v=20260914-review-panel-1): primary source for client-side file validation and access behavior. Server-side acceptance and the current live job status were not tested.
- The page links to the careers listing and internal sections; no separate detailed specification or starter project was linked in the inspected challenge HTML.
