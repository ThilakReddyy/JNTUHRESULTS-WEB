# Security Policy

## Reporting

Do not open a public issue for credential exposure, admin-route access, student-data leakage, XSS, unsafe external navigation, push-subscription abuse, or dependency vulnerabilities. Use GitHub private vulnerability reporting when available, or contact the repository owner privately through GitHub to establish a secure channel.

Use synthetic hall-ticket numbers and redact response payloads, subscriptions, tokens, and headers.

## Browser security model

This is a static client. Everything delivered to the browser—including `NEXT_PUBLIC_API_KEY`—is observable by users and must be treated as public. It can reduce casual unauthenticated traffic but cannot authorize privileged backend operations.

- Never add `GRACE_MARKS_ADMIN_KEY`, AWS credentials, provider secrets, private VAPID material, or other privileged values to the client.
- Hidden routes and UI controls are not authorization.
- Backend admin endpoints must validate server-held credentials independently.

## Student data

- Minimize browser persistence of names, hall-ticket numbers, marks, and derived academic statistics.
- Do not place result payloads in analytics, console logs, URLs beyond the required identifier, or error-reporting services.
- Use synthetic data in screenshots and tests.
- Clear no-longer-needed state and provide understandable privacy information.

## Web risks

- Preserve React escaping; carefully review any `dangerouslySetInnerHTML` use.
- Validate external URLs before navigation and avoid executable/non-HTTP schemes.
- Keep backend CORS origins narrow.
- Protect the static host with HTTPS and appropriate security headers.
- Do not cache mutable HTML or service-worker scripts as immutable.
- Keep service-worker scope and push payload navigation constrained to expected origins/routes.
- Treat uploaded grace-marks files as sensitive; the browser should send them only to the authenticated backend endpoint over HTTPS.

## Dependency and release security

- Review npm audit/Dependabot findings and lockfile changes.
- Use `npm ci` for reproducible builds.
- Run lint/build after dependency updates.
- Keep the static host, DNS, and analytics accounts protected with MFA and least privilege.
- Rotate the public gateway value if abused, understanding that a static redeploy is required.

## Secrets

Do not commit `.env.local`, access tokens, admin keys, cloud credentials, private keys, push subscriptions, or real student data. If a privileged secret is exposed, rotate it at the provider immediately; removing it from Git history is not a substitute for rotation.
