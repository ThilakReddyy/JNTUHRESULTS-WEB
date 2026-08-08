# CLAUDE.md

Guidance for coding assistants working in JNTUH Connect Web.

## Priorities

Result lookup and interpretation are the primary product flows. Preserve academic/all-attempt/backlog/credits semantics, backend pending behavior, and student-data privacy before changing supporting content.

## Architecture

- Next.js 15 App Router with React, TypeScript, Tailwind, and static export.
- `next.config.js` requires `output: "export"`; production has no Next.js server.
- Browser code calls the FastAPI backend directly.
- `lib/apiClient.ts` owns `NEXT_PUBLIC_URL`, `NEXT_PUBLIC_API_KEY`, and the Axios header interceptor.
- Result adapters are concentrated in `components/api/fetchResults.tsx`.
- Public routes and most interactive screens are client components.

Read `architecture.md` before changing routing, backend integration, push, or deployment.

## Commands

```bash
npm ci
cp .env.example .env.local
npm run dev
npm run lint
npm run build
```

The build must produce `out/`. Do not introduce middleware, runtime API routes, server actions, or request-time secrets without changing the deployment architecture deliberately.

## Environment

- `NEXT_PUBLIC_URL`: backend base with trailing slash.
- `NEXT_PUBLIC_API_KEY`: public gateway header value.
- `NEXT_PUBLIC_VAPID_PUBLIC_KEY`: optional browser push public key (used by code even though the current example file may not list it).
- `NEXT_PUBLIC_GOOGLE_ANALYTICS`: optional analytics ID.
- `REDIS_URL`: currently unused by the static application.

Every `NEXT_PUBLIC_*` value is public and build-time. Never place admin/provider/cloud secrets in it.

## Invariants

- Treat backend `202` as queued/pending, not an unknown error.
- Do not scrape JNTUH from the browser.
- Keep academic and all-attempt response shapes distinct.
- Update adapters, TypeScript types, derived Journey/Wrapped calculations, and renderers together when the API changes.
- Raw backend `fetch()` calls must attach the API header explicitly; Axios calls should import/use the shared client configuration.
- Validate external URLs and preserve React's default escaping.
- Avoid logging hall-ticket numbers, marks, proof documents, subscriptions, or admin values.
- Keep static route metadata, sitemap, and social content aligned when adding pages.

## Dirty worktrees

Existing local changes belong to the user. In particular, do not overwrite `.env.example` changes while documenting or refactoring unrelated code.

## Documentation

Update `README.md`, `architecture.md`, `CONTRIBUTING.md`, `DEPLOYMENT.md`, `SECURITY.md`, and `RUNBOOK.md` when their contracts change.
