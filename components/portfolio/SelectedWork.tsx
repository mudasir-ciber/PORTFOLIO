"use client";

import { FeaturedProject } from "@/components/portfolio/FeaturedProject";
import { ProjectEmptyState } from "@/components/portfolio/ProjectEmptyState";
import { ProjectFilter } from "@/components/portfolio/ProjectFilter";
import { ProjectGrid } from "@/components/portfolio/ProjectGrid";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VideoModal } from "@/components/media/VideoModal";
import { Reveal } from "@/components/motion/Reveal";
import {
  getFeaturedProjects,
  getProjectsByCategory,
  projects,
  type Project,
  type ProjectCategoryFilter,
} from "@/data/projects";
import { useMemo, useState } from "react";

export function SelectedWork() {
  const [category, setCategory] =
    useState<ProjectCategoryFilter>("All");
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const featured = useMemo(() => getFeaturedProjects(projects), []);
  const filtered = useMemo(
    () => getProjectsByCategory(category, projects),
    [category],
  );

  const nonFeatured = useMemo(() => {
    if (category !== "All") return filtered;
    const featuredIds = new Set(featured.map((item) => item.id));
    return filtered.filter((item) => !featuredIds.has(item.id));
  }, [category, featured, filtered]);

  const isEmpty = projects.length === 0;

  return (
    <Section id="work" ariaLabel="Selected work">
      <Container>
        <Reveal>
          <div className="mb-8 flex flex-col gap-6 md:mb-10 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Selected work"
              title="Projects in frame"
              description={
                isEmpty
                  ? "The portfolio system is in place. Real cuts and case studies will populate this section."
                  : "A living collection of edits across platforms and formats."
              }
            />
            <ProjectFilter
              projects={projects}
              active={category}
              onChange={setCategory}
            />
          </div>
        </Reveal>

        {isEmpty ? (
          <Reveal delay={0.06}>
            <ProjectEmptyState />
          </Reveal>
        ) : (
          <div className="flex flex-col gap-14">
            {category === "All" && featured.length > 0 ? (
              <div className="flex flex-col gap-10">
                {featured.map((project) => (
                  <Reveal key={project.id}>
                    <FeaturedProject
                      project={project}
                      onOpen={setActiveProject}
                    />
                  </Reveal>
                ))}
              </div>
            ) : null}

            <ProjectGrid projects={nonFeatured} onOpen={setActiveProject} />

            {filtered.length === 0 ? (
              <p className="text-body-sm text-text-muted">
                No projects in this category yet.
              </p>
            ) : null}
          </div>
        )}
      </Container>

      <VideoModal
        open={Boolean(activeProject)}
        onClose={() => setActiveProject(null)}
        src={activeProject?.video}
        poster={activeProject?.thumbnail}
        title={activeProject?.title ?? "Project"}
      />
    </Section>
  );
}
