/**
 * Future case-study helpers.
 * Full project pages/modals can import from here without reshaping data.
 */
import type { Project } from "@/data/projects";

export type ProjectDetail = Pick<
  Project,
  | "id"
  | "slug"
  | "title"
  | "category"
  | "description"
  | "thumbnail"
  | "video"
  | "client"
  | "year"
  | "tools"
  | "challenge"
  | "approach"
  | "result"
  | "featured"
>;

export function toProjectDetail(project: Project): ProjectDetail {
  return {
    id: project.id,
    slug: project.slug,
    title: project.title,
    category: project.category,
    description: project.description,
    thumbnail: project.thumbnail,
    video: project.video,
    client: project.client ?? null,
    year: project.year ?? null,
    tools: project.tools ?? [],
    challenge: project.challenge ?? null,
    approach: project.approach ?? null,
    result: project.result ?? null,
    featured: project.featured ?? false,
  };
}
