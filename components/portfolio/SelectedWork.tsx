"use client";

import { FeaturedProject } from "@/components/portfolio/FeaturedProject";
import { PortfolioHeader } from "@/components/portfolio/PortfolioHeader";
import { ProjectDetails } from "@/components/portfolio/ProjectDetails";
import { ProjectEmptyState } from "@/components/portfolio/ProjectEmptyState";
import { ProjectFilter } from "@/components/portfolio/ProjectFilter";
import { ProjectGrid } from "@/components/portfolio/ProjectGrid";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { portfolioContent } from "@/data/portfolio";
import {
  getFeaturedProjects,
  getProjectsByCategory,
  type Project,
  type ProjectCategoryFilter,
} from "@/data/projects";
import { getPortfolioProjects } from "@/lib/projects";
import { useMemo, useState } from "react";

export function SelectedWork() {
  const allProjects = useMemo(() => getPortfolioProjects(), []);
  const [category, setCategory] = useState<ProjectCategoryFilter>("All");
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const featured = useMemo(
    () => getFeaturedProjects(allProjects),
    [allProjects],
  );

  const filtered = useMemo(
    () => getProjectsByCategory(category, allProjects),
    [category, allProjects],
  );

  const supporting = useMemo(() => {
    if (category !== "All") return filtered;
    const featuredIds = new Set(featured.map((item) => item.id));
    return filtered.filter((item) => !featuredIds.has(item.id));
  }, [category, featured, filtered]);

  const isEmpty = allProjects.length === 0;

  return (
    <Section id="work" ariaLabel="Selected work" className="scroll-mt-24">
      <Container>
        <PortfolioHeader
          description={portfolioContent.description}
          projectCount={isEmpty ? undefined : allProjects.length}
          actions={
            <ProjectFilter
              projects={allProjects}
              active={category}
              onChange={setCategory}
            />
          }
        />

        <div className="mt-10 md:mt-14">
          {isEmpty ? (
            <Reveal delay={0.05}>
              <ProjectEmptyState />
            </Reveal>
          ) : (
            <div className="flex flex-col gap-14 lg:gap-16">
              {category === "All" && featured.length > 0
                ? featured.map((project) => (
                    <Reveal key={project.id}>
                      <FeaturedProject
                        project={project}
                        onOpen={setActiveProject}
                      />
                    </Reveal>
                  ))
                : null}

              <ProjectGrid projects={supporting} onOpen={setActiveProject} />

              {filtered.length === 0 ? (
                <p className="text-body-sm text-text-muted">
                  {portfolioContent.categoryEmpty}
                </p>
              ) : null}
            </div>
          )}
        </div>
      </Container>

      <ProjectDetails
        project={activeProject}
        open={Boolean(activeProject)}
        onClose={() => setActiveProject(null)}
      />
    </Section>
  );
}
