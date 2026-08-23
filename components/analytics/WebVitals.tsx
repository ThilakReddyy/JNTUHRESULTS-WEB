"use client";

import { useReportWebVitals } from "next/web-vitals";
import { trackEvent } from "@/lib/telemetry/analytics";

export default function WebVitals() {
  useReportWebVitals((metric) => {
    trackEvent("web_vitals", {
      metric: metric.name,
      value: Math.round(metric.value),
      rating: "rating" in metric ? String(metric.rating) : "unknown",
    });
  });
  return null;
}
