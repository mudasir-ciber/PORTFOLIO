"use client";

import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { Reveal } from "@/components/motion/Reveal";
import type { Project } from "@/data/projects";
import { AnimatePresence, motion } from "motion/react";
import { transition } from "@/lib/motion";

type ProjectGridProps = {
  projects: Project[];
  onOpen: (project: Project) => void;
};

function resolveSize(
  project: Project,
  index: number,
): "full" | "large" | "medium" {
  if (project.size) return project.size;
  const pattern = index % 5;
  if (pattern === 0) return "full";
  if (pattern === 1 || pattern === 4) return "large";
  return "medium";
}

function sizeClasses(size: "full" | "large" | "medium") {
  switch (size) {
    case "full":
      return "md:col-span-12";
    case "large":
      return "md:col-span-7";
    case "medium":
      return "md:col-span-5";
  }
}

function mediaAspectForSize(
  size: "full" | "large" | "medium",
): "video" | "portrait" | "cinema" {
  if (size === "full") return "cinema";
  if (size === "medium") return "portrait";
  return "video";
}

export function ProjectGrid({ projects, onOpen }: ProjectGridProps) {
  if (projects.length === 0) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={projects.map((p) => p.id).join("-")}
        className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-6 lg:gap-8"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 8 }}
        transition={transition.normal}
      >
        {projects.map((project, index) => {
          const size = resolveSize(project, index);
          return (
            <Reveal
              key={project.id}
              delay={Math.min(index * 0.04, 0.16)}
              className={sizeClasses(size)}
            >
              <ProjectCard
                project={project}
                onOpen={onOpen}
                mediaAspect={mediaAspectForSize(size)}
              />
            </Reveal>
          );
        })}
      </motion.div>
    </AnimatePresence>
  );
}
