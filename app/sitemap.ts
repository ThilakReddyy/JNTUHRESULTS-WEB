import type { MetadataRoute } from "next";
import { pageMetadataDefinitions } from "@/lib/page-metadata";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  // Query-dependent notification details have no standalone indexable content.
  return Object.entries(pageMetadataDefinitions)
    .filter(([key]) => key !== "examNotification")
    .map(([, page]) => ({ url: `${SITE_URL}${page.path}` }));
}
