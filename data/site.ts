/**
 * Site-level config + SEO foundation.
 * Set `siteUrl` and OG image when the production domain is known.
 */
export const siteConfig = {
  name: "Mudasir",
  role: "Video Editor",
  tagline: "Visual Storyteller",
  title: "Mudasir — Video Editor",
  description:
    "Portfolio of Mudasir, a video editor focused on cinematic storytelling across YouTube, documentary, short-form, and digital content.",
  email: null as string | null,
  whatsapp: null as string | null,
  /**
   * Production origin without trailing slash, e.g. "https://mudasir.studio"
   * Leave null until deployment domain is known.
   */
  siteUrl: null as string | null,
  /**
   * Social preview image under /public when available.
   * Example: "/images/og.jpg"
   */
  ogImage: null as string | null,
  /**
   * When true, injects clearly labeled DEMO fixtures from data/projects.demo.ts
   * for layout testing. Keep false until you want to preview the filled grid.
   */
  showDemoProjects: false,
  locale: "en_US",
} as const;

export function getMetadataBase() {
  if (siteConfig.siteUrl) {
    try {
      return new URL(siteConfig.siteUrl);
    } catch {
      return undefined;
    }
  }
  return undefined;
}
