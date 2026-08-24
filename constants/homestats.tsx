import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Gauge,
  Layers3,
  ScanSearch,
  Search,
  Smartphone,
  Users,
} from "lucide-react";

import { homeToolCount } from "@/constants/homeLinks";

export type HomeStat = {
  value: string;
  label: string;
  detail: string;
  icon: LucideIcon;
};

/**
 * Platform figures shown on the homepage. These are reported numbers, not live
 * telemetry: the static export has no server, so update them here when the
 * backend dashboards move. Keep them conservative — they are public claims.
 */
export const homeStats: HomeStat[] = [
  {
    value: "4K+",
    label: "Students a day",
    detail: "Daily active students across web, Android and iOS.",
    icon: Users,
  },
  {
    value: "100K+",
    label: "Searches a month",
    detail: "Result, backlog and credit lookups run every month.",
    icon: Search,
  },
  {
    value: "2.3L+",
    label: "Roll numbers searched",
    detail: "Student roll numbers looked up on the platform so far.",
    icon: ScanSearch,
  },
  {
    value: "22K+",
    label: "API calls a day",
    detail: "Result, notification and syllabus requests served daily.",
    icon: Activity,
  },
  {
    value: "<40ms",
    label: "Cached response",
    detail: "Typical response time for an already-cached result.",
    icon: Gauge,
  },
  {
    value: "10K+",
    label: "App downloads",
    detail: "Installs of the native Android and iOS apps.",
    icon: Smartphone,
  },
  {
    value: `${homeToolCount}`,
    label: "Student tools",
    detail: "Results, credits, syllabus, calendars, careers and more.",
    icon: Layers3,
  },
];

export const openSourceRepositories = [
  {
    label: "Web",
    href: "https://github.com/ThilakReddyy/JNTUHRESULTS-WEB",
  },
  {
    label: "Backend",
    href: "https://github.com/ThilakReddyy/jntuh-backend",
  },
  {
    label: "Android",
    href: "https://github.com/ThilakReddyy/jntuhconnect",
  },
  {
    label: "iOS",
    href: "https://github.com/ThilakReddyy/jntuhconnect-ios",
  },
];
