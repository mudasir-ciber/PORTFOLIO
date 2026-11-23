"use client";

import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { Reveal } from "@/components/motion/Reveal";
import type { Project } from "@/data/projects";

type ProjectGridProps = {
  projects: Project[];
  onOpen: (project: Project) => void;
};

export function ProjectGrid({ projects, onOpen }: ProjectGridProps) {
  if (projects.length === 0) return null;

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:gap-10">
      {projects.map((project, index) => (
        <Reveal key={project.id} delay={Math.min(index * 0.05, 0.2)}>
          <ProjectCard project={project} onOpen={onOpen} />
        </Reveal>
      ))}
    </div>
  );
}
