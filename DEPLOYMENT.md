# Web Deployment Guide

## Artifact

Production is a static Next.js export. The release artifact is the `out/` directory created by:

```bash
npm ci
npm run build
```

No Node.js application server is required after the build. Upload the contents of `out/` to the configured static host/CDN.

## Build-time environment

Configure before running the build:

| Variable | Requirement |
| --- | --- |
| `NEXT_PUBLIC_URL` | Required for production backend calls; include trailing slash. |
| `NEXT_PUBLIC_API_KEY` | Required when the backend demands an exact browser gateway value. |
| `NEXT_PUBLIC_VAPID_PUBLIC_KEY` | Required only for browser push subscription. |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS` | Optional analytics measurement ID. |

These values are public and immutable inside the built files. A change requires a new build/deploy. Never place an admin key, cloud credential, private VAPID key, or database credential in a public variable.

## Continuous validation

`.github/workflows/github-static-check.yml` runs `npm ci`, `npm run build`, and verifies that `out/` exists on pushes to `main` and pull requests. It validates the artifact but does not publish it. Hosting deployment is configured outside this repository and must be checked separately.

The workflow currently selects Node 25. Keep local/CI/host build versions aligned when debugging dependency differences.

## Hosting contract

The static host must provide:

- HTTPS.
- `index.html`/route fallback behavior compatible with exported Next.js paths.
- Long-lived immutable caching for hashed `_next/static` assets.
- Short or revalidated caching for HTML, `sw.js`, manifests, and mutable public metadata.
- Correct MIME types and compression.
- The production domain allowed by backend CORS.

`vercel.json` defines asset cache headers for Vercel-style hosting. Cloudflare or another host requires equivalent platform configuration.

## Release verification

After deployment:

1. Load the home page and several deep links directly.
2. Confirm static JS/CSS assets return 200 without stale chunk errors.
3. Submit a known result query and confirm the backend header is accepted.
4. Confirm a queued result displays pending state rather than a generic crash.
5. Test notifications, calendars, syllabus, jobs, and MCP page links.
6. Validate mobile/desktop layout, metadata, sitemap, robots, and social cards.
7. If push is enabled, test service-worker registration and a controlled subscription.
8. Inspect browser console/network logs for CORS, mixed-content, and API failures.

## Rollback

Retain the previous immutable `out/` artifact or hosting deployment. Roll back by promoting the last known-good artifact, then investigate build/config changes. Because environment values are compiled into assets, rolling back code also rolls back its backend URL/public gateway configuration.

## Related deployment

The web release depends on a compatible backend deployment. Coordinate changes to endpoint paths, query names, CORS origins, response envelopes, and API header requirements.
