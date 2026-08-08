# Web Operations Runbook

## Triage order

1. Confirm the static site and hashed assets load.
2. Check the browser console/network panel.
3. Determine whether every API feature fails or one endpoint/view fails.
4. Verify the compiled backend URL, backend health, CORS, and API header.
5. Check whether the backend returned a normal `202` pending response.

## Static site unavailable

- Check DNS, TLS, CDN/host status, and latest deployment.
- Load a known static asset directly.
- Inspect whether HTML references chunks absent from the deployed artifact.
- Roll back to the last complete `out/` artifact if a partial/stale deployment occurred.

Do not mix files from two builds; hashed chunks and HTML must come from one artifact.

## Build fails or `out/` is missing

```bash
npm ci
npm run build
```

Check the first build error, Node version, lockfile integrity, static-export-incompatible route features, and required public configuration. The GitHub check intentionally fails when `out/` is absent.

## API requests return 403

- Confirm `NEXT_PUBLIC_API_KEY` was set at build time.
- Confirm `NEXT_PUBLIC_URL` exactly matches the request prefix used by the Axios interceptor.
- Inspect whether the failing call uses raw `fetch()` and must add `X-Api-Key` explicitly.
- Confirm the backend's `API_ACCESS_KEY` expectation and CORS origin.

A configuration change requires rebuilding the static site.

## API requests fail with CORS or mixed content

- Production must call an HTTPS backend.
- Add the exact web origin to backend CORS configuration.
- Confirm preflight responses allow the method and headers.
- Check redirects; an unexpected redirect can move the request to an origin without CORS policy.

## Results remain pending

`202` means the backend queued a scrape. Show the pending state and retry after the worker has time to process. If it persists, use the backend `RUNBOOK.md` to check RabbitMQ, the result worker, PostgreSQL, Redis, and JNTUH upstream availability.

## One result page crashes or renders incorrectly

- Capture response status/shape with sensitive values redacted.
- Compare TypeScript types and adapter logic with the backend schema.
- Check academic versus all-attempt envelopes; they are intentionally different.
- Verify null/empty semesters, failed grades, RCRV/grace attempts, and pending/error branches.
- Reproduce through a minimal synthetic fixture before changing rendering logic.

## Browser push fails

- Require HTTPS or localhost.
- Confirm notification permission and browser support.
- Confirm `/sw.js` loads with the correct MIME type and is not stale-cached.
- Confirm `NEXT_PUBLIC_VAPID_PUBLIC_KEY` matches the backend VAPID key pair.
- Inspect the subscription POST for CORS/header/backend errors.
- Do not log or share the full push subscription.

## Stale deployment

- Purge/revalidate HTML and `sw.js`, not immutable hashed chunks indiscriminately.
- Confirm the active deployment contains one coherent build.
- Ask users to reload only after the host/CDN is corrected.
- Roll back if a changed backend contract cannot be restored quickly.

## Recovery verification

- Home and deep links load directly.
- A known result returns and a missing result shows pending state.
- Notifications, content, jobs, and grace-marks pages call the expected backend.
- No CORS, mixed-content, missing-chunk, or hydration errors appear.
- Mobile and desktop navigation work.
- Monitoring/analytics contain no academic payloads or identifiers.
