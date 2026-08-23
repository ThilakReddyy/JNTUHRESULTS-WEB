import axios from "axios";
import { logger } from "@/lib/telemetry/logger";
import { trackEvent } from "@/lib/telemetry/analytics";

// Backend header guard: every request to the results backend must carry this
// header or it is rejected with 403. The value must match the backend's
// API_ACCESS_KEY env var. Import this module (for its side effect) in any
// file that calls the backend with axios; use API_KEY/API_KEY_HEADER
// directly for raw fetch() calls.
export const API_KEY_HEADER = "X-Api-Key";
export const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "";

export const BACKEND_URL =
  process.env.NEXT_PUBLIC_URL || "http://localhost:8000/";

axios.interceptors.request.use((config) => {
  if (API_KEY && axios.getUri(config).startsWith(BACKEND_URL)) {
    config.headers.set(API_KEY_HEADER, API_KEY);
  }
  return config;
});

// Path -> label allowlist for failure telemetry. Deliberately keyed on the
// URL *path* only (never the query string, which is where roll numbers
// live) so a new/unlisted path just falls back to "unknown" instead of
// risking a student identifier leaking into an event.
const ROUTE_LABELS: Record<string, string> = {
  "/api/getAcademicResult": "academicresult",
  "/api/getAllResult": "allresult",
  "/api/getBacklogs": "backlogreport",
  "/api/getCreditsChecker": "creditchecker",
  "/api/getResultContrast": "resultcontrast",
  "/api/getClassResults": "classresult",
  "/api/notifications": "notifications",
  "/api/getCMM": "cmm-download",
  "/api/grace-marks/eligibility": "grace-marks-eligibility",
  "/api/grace-marks/proof": "grace-marks-proof",
  "/api/grace-marks/proofs": "grace-marks-admin",
  "/api/grace-marks/marks": "grace-marks-admin",
  "/api/calendars": "calendars",
  "/api/syllabus": "syllabus",
  "/save-subscription": "push-subscription",
};

function routeLabelFor(url?: string): string {
  if (!url) return "unknown";
  let path = url;
  try {
    path = url.startsWith("http") ? new URL(url).pathname : url.split("?")[0];
  } catch {
    return "unknown";
  }
  const match = Object.keys(ROUTE_LABELS).find((prefix) =>
    path.startsWith(prefix),
  );
  return match ? ROUTE_LABELS[match] : "unknown";
}

// Most call sites use `validateStatus: () => true` and branch on
// response.status themselves, so this only fires for genuine network
// failures (timeout/offline/DNS) plus, in the fulfilled branch below,
// backend 5xx/429s that those call sites don't already treat as a normal
// UI state (202/404/409/... are expected outcomes, not failures).
axios.interceptors.response.use(
  (response) => {
    if (response.status >= 500 || response.status === 429) {
      const routeLabel = routeLabelFor(response.config?.url);
      logger.warn("api", `non-2xx response (${response.status})`, {
        routeLabel,
      });
      trackEvent("api_failure", { route: routeLabel, status: response.status });
    }
    return response;
  },
  (error) => {
    const routeLabel = routeLabelFor(error.config?.url);
    logger.error("api", error, { routeLabel });
    trackEvent("api_failure", {
      route: routeLabel,
      status: error.response?.status ?? 0,
    });
    return Promise.reject(error);
  },
);
