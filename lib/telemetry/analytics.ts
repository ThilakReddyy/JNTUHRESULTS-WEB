/**
 * Thin wrapper around the existing Google Analytics gtag() call
 * (components/analytics/GoogleAnalytics.tsx). A typed allowlist so no stray
 * payload key (roll number, marks, ...) can ever be passed as an event param
 * — see CLAUDE.md: never put academic identifiers/payloads into analytics.
 */

type AnalyticsEvents = {
  result_lookup_success: { resultType: string };
  result_lookup_failure: { resultType: string; statusCode?: number };
  push_subscription_success: Record<string, never>;
  push_subscription_failure: { reason?: string };
  tool_used: { tool: string };
  api_failure: { route: string; status: number };
  client_error: { scope: string; message: string };
  web_vitals: { metric: string; value: number; rating: string };
};

export function trackEvent<Name extends keyof AnalyticsEvents>(
  name: Name,
  params: AnalyticsEvents[Name],
): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }
  if (!process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS) {
    return;
  }
  window.gtag("event", name, params);
}
