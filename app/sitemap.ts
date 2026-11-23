import { siteConfig } from "@/data/site";
import type { MetadataRoute } from "next";

/**
 * Sitemap for public routes only.
 * Returns empty until production `siteUrl` is set (avoids inventing a domain).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteConfig.siteUrl) {
    return [];
  }

  return [
    {
      url: siteConfig.siteUrl,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
