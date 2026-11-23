import { getVisibleSocials } from "@/data/contact";
import { getMetadataBase, siteConfig } from "@/data/site";
import type { Metadata } from "next";

/**
 * Shared SEO helpers. Set `siteConfig.siteUrl` and `siteConfig.ogImage`
 * before production deployment for absolute Open Graph / Twitter URLs.
 */

export function buildPageMetadata(): Metadata {
  const metadataBase = getMetadataBase();
  const ogImage = siteConfig.ogImage;

  const images = ogImage
    ? [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} — ${siteConfig.role}`,
        },
      ]
    : undefined;

  return {
    title: {
      default: siteConfig.title,
      template: `%s — ${siteConfig.name}`,
    },
    description: siteConfig.description,
    applicationName: siteConfig.name,
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    ...(metadataBase ? { metadataBase } : {}),
    ...(siteConfig.siteUrl
      ? {
          alternates: {
            canonical: "/",
          },
        }
      : {}),
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      title: siteConfig.title,
      description: siteConfig.description,
      siteName: siteConfig.name,
      ...(siteConfig.siteUrl ? { url: siteConfig.siteUrl } : {}),
      ...(images ? { images } : {}),
    },
    twitter: {
      card: images ? "summary_large_image" : "summary",
      title: siteConfig.title,
      description: siteConfig.description,
      ...(images ? { images: [ogImage as string] } : {}),
    },
    robots: {
      index: true,
      follow: true,
    },
    icons: {
      icon: [{ url: "/favicon.ico", sizes: "any" }],
    },
  };
}

export function buildPersonJsonLd() {
  const sameAs = getVisibleSocials().map((link) => link.href);
  const url = siteConfig.siteUrl || undefined;

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: siteConfig.role,
    description: siteConfig.description,
    ...(url ? { url } : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
    knowsAbout: [
      "Video editing",
      "Cinematic storytelling",
      "YouTube editing",
      "Short-form video",
      "Documentary editing",
    ],
  };
}
