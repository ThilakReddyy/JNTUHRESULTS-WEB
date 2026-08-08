# JNTUH Connect Web

<p align="center">
  <a href="https://github.com/ThilakReddyy/JNTUHRESULTS-WEB/actions/workflows/github-static-check.yml"><img src="https://github.com/ThilakReddyy/JNTUHRESULTS-WEB/actions/workflows/github-static-check.yml/badge.svg" alt="Static build status"/></a>
  <a href="https://app.codacy.com/gh/ThilakReddyy/JNTUHRESULTS-WEB/dashboard"><img src="https://app.codacy.com/project/badge/Grade/fd2876a01109454886ce0c49811c3450" alt="Codacy code quality"/></a>
  <a href="https://jntuhconnect.dhethi.com"><img src="https://img.shields.io/website?url=https%3A%2F%2Fjntuhconnect.dhethi.com&style=flat-square&label=production" alt="Production website status"/></a>
  <a href="https://github.com/ThilakReddyy/JNTUHRESULTS-WEB"><img src="https://img.shields.io/github/languages/code-size/ThilakReddyy/JNTUHRESULTS-WEB?style=flat-square" alt="Code size"/></a>
  <a href="https://github.com/ThilakReddyy/JNTUHRESULTS-WEB/commits/main"><img src="https://img.shields.io/github/last-commit/ThilakReddyy/JNTUHRESULTS-WEB?style=flat-square" alt="Last commit"/></a>
  <a href="https://github.com/ThilakReddyy/JNTUHRESULTS-WEB/blob/main/LICENSE"><img src="https://img.shields.io/github/license/ThilakReddyy/JNTUHRESULTS-WEB?style=flat-square" alt="License"/></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js 15"/>
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 18"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS"/>
  <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white" alt="Axios"/>
  <img src="https://img.shields.io/badge/PWA-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white" alt="Progressive Web App"/>
</p>

The public web client for JNTUH Connect. It is a statically exported Next.js application that lets students view academic results, all exam attempts, backlogs, credits, class results, comparisons, notifications, calendars, syllabus documents, grace-marks information, and fresher jobs.

Production: [jntuhconnect.dhethi.com](https://jntuhconnect.dhethi.com)

## Core features

- Consolidated academic results with SGPA/CGPA and semester summaries.
- Complete regular, supplementary, RCRV, and grace attempt history.
- Backlog, credit, class, contrast, journey, wrapped, and Excel-oriented views.
- Result notifications, academic calendars, syllabus links, channels, and help content.
- Grace-marks eligibility/proof workflow and hidden admin review UI.
- Fresher job and internship board.
- Installable PWA metadata and optional browser push subscription.
- MCP setup and educational content for the backend's read-only tools.

## Architecture

The project uses the Next.js App Router, React, TypeScript, Tailwind CSS, Radix-based components, and Axios. `next.config.js` sets `output: "export"`, so production output is static files in `out/`; there are no Next.js API routes or server-rendered runtime dependencies.

Browser components call the JNTUH backend directly. `lib/apiClient.ts` owns the backend URL and the global Axios `X-Api-Key` interceptor. Result adapters in `components/api/fetchResults.tsx` translate HTTP pending/error responses into UI states. See [architecture.md](architecture.md) for the full component and data flow.

## Environment

Create `.env.local` from `.env.example` and configure:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_URL` | Backend base URL, including a trailing slash. |
| `NEXT_PUBLIC_API_KEY` | Public browser gateway value sent as `X-Api-Key`. |
| `NEXT_PUBLIC_VAPID_PUBLIC_KEY` | Optional browser Web Push application-server public key. |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS` | Optional Google Analytics measurement ID. |

All `NEXT_PUBLIC_*` values are embedded in the static client bundle and are not secrets. `REDIS_URL` remains in the example file but the current static application does not use Redis directly.

## Local development

```bash
git clone https://github.com/ThilakReddyy/JNTUHRESULTS-WEB.git
cd JNTUHRESULTS-WEB
npm ci
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). A local backend normally runs at `http://localhost:8000/` and must allow the web origin through CORS.

## Validation

```bash
npm run lint
npm run build
```

`npm run build` must create `out/`. GitHub Actions performs the static build on pushes and pull requests.

## Documentation

| Guide | Purpose |
| --- | --- |
| [Architecture](architecture.md) | Static application structure, backend integration, result flow, and browser state. |
| [Contributing](CONTRIBUTING.md) | Setup, validation, code conventions, and pull request expectations. |
| [Deployment](DEPLOYMENT.md) | Static build contract, environment injection, hosting, and rollback. |
| [Security](SECURITY.md) | Reporting, public configuration, student data, admin UI, and dependency guidance. |
| [Operations runbook](RUNBOOK.md) | Triage for build, hosting, backend, CORS, result, and push failures. |

## Related projects

- [Backend](https://github.com/ThilakReddyy/jntuh-backend)
- [Android app](https://github.com/ThilakReddyy/jntuhconnect)
- [iOS app](https://github.com/ThilakReddyy/jntuhconnect-ios)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Do not commit `.env.local`, production tokens, student records, or generated `out/` content.

## License

Licensed under the [GNU General Public License v3.0](LICENSE).
