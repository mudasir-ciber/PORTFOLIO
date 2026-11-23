/**
 * Portfolio project data.
 *
 * HOW TO ADD A PROJECT LATER
 * 1. Drop video in /public/videos/
 * 2. Drop thumbnail in /public/images/projects/
 * 3. Append an object to `projects` below
 * 4. Set `featured: true` for larger treatment
 *
 * Do not invent clients, results, or fake work.
 */

export const projectCategories = [
  "All",
  "YouTube",
  "Documentary",
  "Short Form",
  "Commercial",
  "Motion Graphics",
  "Social Media",
] as const;

export type ProjectCategoryFilter = (typeof projectCategories)[number];
export type ProjectCategory = Exclude<ProjectCategoryFilter, "All">;

export type Project = {
  id: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  description: string;
  /** Path under /public, e.g. /images/projects/title.jpg */
  thumbnail: string;
  /** Path under /public, e.g. /videos/title.mp4 — null until provided */
  video: string | null;
  /** Optional muted hover/tap preview — keep short & compressed */
  previewVideo?: string | null;
  client?: string | null;
  year?: number | null;
  tools?: string[];
  featured?: boolean;
  /** True only for local layout fixtures — never real client work */
  isDemo?: boolean;
  /** Optional visual weight hint for editorial grids */
  size?: "full" | "large" | "medium";
  /** Case-study fields for future detail views */
  challenge?: string | null;
  approach?: string | null;
  result?: string | null;
  order?: number;
};

/**
 * Real projects go here.
 * Keep empty until authentic media + copy are provided.
 *
 * Example entry (do not uncomment with fake data):
 *
 * {
 *   id: "01",
 *   slug: "project-slug",
 *   title: "Project title",
 *   category: "YouTube",
 *   description: "Short description.",
 *   thumbnail: "/images/projects/project-slug.jpg",
 *   video: "/videos/project-slug.mp4",
 *   previewVideo: "/videos/project-slug-preview.mp4",
 *   client: null,
 *   year: 2026,
 *   tools: ["Premiere Pro"],
 *   featured: true,
 *   order: 1,
 * }
 */
export const projects: Project[] = [];

export function getFeaturedProjects(items: Project[] = projects) {
  return items
    .filter((project) => project.featured)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export function getProjectsByCategory(
  category: ProjectCategoryFilter,
  items: Project[] = projects,
) {
  const sorted = [...items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  if (category === "All") return sorted;
  return sorted.filter((project) => project.category === category);
}

export function getAvailableCategories(items: Project[] = projects) {
  const present = new Set(items.map((project) => project.category));
  return projectCategories.filter(
    (category) => category === "All" || present.has(category),
  );
}

export function getProjectBySlug(slug: string, items: Project[] = projects) {
  return items.find((project) => project.slug === slug) ?? null;
}
