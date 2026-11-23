import { siteConfig } from "@/data/site";

/**
 * Footer copy — edit here without touching layout components.
 */
export const footerContent = {
  eyebrow: "Next frame",
  headlineLines: ["Ready for", "the next cut?"],
  accentFromLine: 1,
  ctaLabel: "Start a Project",
  ctaHref: "#contact",
  brandName: siteConfig.name,
  brandRole: `${siteConfig.role} / ${siteConfig.tagline}`,
  copyrightName: siteConfig.name,
  /** Update annually — avoid runtime Date during prerender */
  copyrightYear: 2026,
} as const;
