/**
 * Site-level config + SEO foundation.
 * Set `siteUrl` / env `NEXT_PUBLIC_SITE_URL` and OG image when deploying.
 */

function readSiteUrl() {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) {
    return fromEnv.replace(/\/$/, "");
  }
  return null;
}

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
   * Production origin without trailing slash.
   * Prefer NEXT_PUBLIC_SITE_URL in the host environment, or set here.
   */
  siteUrl: readSiteUrl() as string | null,
  /**
   * Social preview image under /public when available.
   * Example: "/images/og/og.jpg"
   */
  ogImage: null as string | null,
  /**
   * When true, injects clearly labeled DEMO fixtures from data/projects.demo.ts
   * for layout testing. Keep false in production.
   */
  showDemoProjects: false,
  locale: "en_US",
};

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
