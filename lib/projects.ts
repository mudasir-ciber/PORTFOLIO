import { demoProjects } from "@/data/projects.demo";
import { projects, type Project } from "@/data/projects";
import { siteConfig } from "@/data/site";

/** Resolves production projects, optionally merging DEMO fixtures. */
export function getPortfolioProjects(): Project[] {
  if (!siteConfig.showDemoProjects) return projects;
  return [...projects, ...demoProjects];
}
