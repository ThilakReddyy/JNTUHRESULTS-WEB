import type { MetadataRoute } from "next";

const siteUrl = "https://jntuhconnect.dhethi.com";

export const dynamic = "force-static";

const routes = [
  "",
  "/academicresult",
  "/academicallresult",
  "/backlogreport",
  "/calendars",
  "/careers",
  "/channels",
  "/classresult",
  "/creditchecker",
  "/excelresult",
  "/faq",
  "/gracemarks",
  "/helpcenter",
  "/journey",
  "/mcp",
  "/notifications",
  "/notifications/examcode",
  "/privacy",
  "/resultcontrast",
  "/syllabus",
  "/wrapped",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route, index) => ({
    url: `${siteUrl}${route}`,
    changeFrequency: index === 0 ? "daily" : "weekly",
    priority: index === 0 ? 1 : 0.7,
  }));
}
