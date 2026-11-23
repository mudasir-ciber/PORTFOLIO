/**
 * Site-level config.
 * Update branding details as final assets arrive.
 */
export const siteConfig = {
  name: "Mudasir",
  role: "Freelance Video Editor",
  title: "Mudasir | Freelance Video Editor",
  description:
    "Premium freelance video editing for YouTube, short-form, and digital platforms.",
  email: null as string | null,
  whatsapp: null as string | null,
  /**
   * When true, injects clearly labeled DEMO fixtures from data/projects.demo.ts
   * for layout testing. Keep false until you want to preview the filled grid.
   */
  showDemoProjects: false,
} as const;
