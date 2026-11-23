import type { Project } from "@/data/projects";

/**
 * DEMO-ONLY layout fixtures.
 * Enabled only when siteConfig.showDemoProjects === true.
 * Clearly labeled — never present as real client work.
 * Delete or keep disabled for production.
 */
export const demoProjects: Project[] = [
  {
    id: "demo-01",
    slug: "demo-featured-cut",
    title: "DEMO — Featured Cut",
    category: "YouTube",
    description: "Layout fixture for featured treatment. Replace with real work.",
    thumbnail: "",
    video: null,
    previewVideo: null,
    client: null,
    year: null,
    tools: [],
    featured: true,
    isDemo: true,
    order: 1,
  },
  {
    id: "demo-02",
    slug: "demo-short-form",
    title: "DEMO — Short Form Frame",
    category: "Short Form",
    description: "Asymmetric card fixture.",
    thumbnail: "",
    video: null,
    isDemo: true,
    featured: false,
    order: 2,
  },
  {
    id: "demo-03",
    slug: "demo-motion",
    title: "DEMO — Motion Study",
    category: "Motion Graphics",
    description: "Supporting card fixture.",
    thumbnail: "",
    video: null,
    isDemo: true,
    featured: false,
    order: 3,
  },
  {
    id: "demo-04",
    slug: "demo-doc",
    title: "DEMO — Documentary Pace",
    category: "Documentary",
    description: "Wide supporting fixture.",
    thumbnail: "",
    video: null,
    isDemo: true,
    featured: false,
    order: 4,
  },
];
