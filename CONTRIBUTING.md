# Contributing to JNTUH Connect Web

## Setup

Prerequisites: a maintained Node.js release compatible with Next.js 15 and npm.

```bash
git clone https://github.com/ThilakReddyy/JNTUHRESULTS-WEB.git
cd JNTUHRESULTS-WEB
npm ci
cp .env.example .env.local
npm run dev
```

Configure `NEXT_PUBLIC_URL` and `NEXT_PUBLIC_API_KEY` for the backend you intend to use. Configure `NEXT_PUBLIC_VAPID_PUBLIC_KEY` only when testing browser push. All public variables are compiled into the browser bundle.

## Before changing code

Read `architecture.md`, `SECURITY.md`, and the backend API contract. The web application is a static export; do not introduce request-time server dependencies without an approved deployment change.

## Validation

```bash
npm run lint
npm run build
```

The build must produce `out/`. Test the affected flow in a browser, including narrow and wide layouts, light/dark themes, loading, pending, empty, error, and successful states.

For result changes, verify:

- Academic and all-attempt results.
- Backlogs/credits/class/contrast where shared types changed.
- Backend `202` pending behavior.
- Invalid hall-ticket handling.
- Network timeout and rate-limit messaging.
- Print/download behavior if rendered result markup changed.

## Code conventions

- Keep TypeScript strict and prefer explicit response types.
- Reuse `lib/apiClient.ts` for backend configuration and Axios header behavior.
- Add the API header manually to raw backend `fetch()` calls.
- Keep route metadata in `lib/page-metadata.ts` and update sitemap/social assets when adding public pages.
- Reuse shared UI primitives and preserve keyboard, focus, labels, contrast, and reduced-motion behavior.
- Do not put privileged secrets in `NEXT_PUBLIC_*` values.
- Do not add direct JNTUH scraping to the browser.
- Preserve the static-export contract.

## Environment changes

Document new variables in `.env.example`, `README.md`, `DEPLOYMENT.md`, and `SECURITY.md` as appropriate. Distinguish required build configuration from optional feature configuration.

## Pull requests

1. Branch from current `main`.
2. Keep generated `out/`, `.next/`, local env files, and personal data out of Git.
3. Run lint and the static build.
4. Explain affected routes, backend contract changes, responsive/accessibility checks, and deployment configuration.
5. Include screenshots only when they materially help review and contain no real student data.

See the GPL-3.0 `LICENSE` for contribution licensing.
