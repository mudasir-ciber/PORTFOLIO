import { siteConfig } from "@/data/site";
import type { MetadataRoute } from "next";

/**
 * robots.txt — allow indexing.
 * Sitemap URL is emitted only once siteUrl is configured.
 */
export default function robots(): MetadataRoute.Robots {
  const rules = {
    userAgent: "*",
    allow: "/",
  };

  if (!siteConfig.siteUrl) {
    return { rules };
  }

  return {
    rules,
    sitemap: `${siteConfig.siteUrl}/sitemap.xml`,
  };
}
