"use client";

import { MediaPlaceholder } from "@/components/media/MediaPlaceholder";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";
import Image from "next/image";

type FeaturedProjectProps = {
  project: Project;
  onOpen: (project: Project) => void;
};

export function FeaturedProject({ project, onOpen }: FeaturedProjectProps) {
  return (
    <article className="grid-editorial">
      <button
        type="button"
        onClick={() => onOpen(project)}
        className="group relative overflow-hidden rounded-[var(--radius-lg)] text-left focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
        aria-label={`Open featured project ${project.title}`}
      >
        <div className="media-frame media-frame--16x9 lg:aspect-[21/9]">
          {project.thumbnail ? (
            <Image
              src={project.thumbnail}
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="media-hover object-cover"
              priority={false}
            />
          ) : (
            <MediaPlaceholder
              label="Featured"
              title={project.title}
              description="Featured media pending"
              aspect="cinema"
              className="h-full rounded-none border-0"
            />
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-transparent" />
        </div>
      </button>

      <div className="flex flex-col justify-center">
        <p className="text-label text-accent">Featured</p>
        <p className="text-label mt-3 text-text-muted">
          {project.category}
          {project.year ? ` · ${project.year}` : ""}
        </p>
        <h3 className="text-h3 mt-3 text-text">{project.title}</h3>
        <p className="text-body-lg mt-4 max-w-md">{project.description}</p>
        <button
          type="button"
          onClick={() => onOpen(project)}
          className={cn(
            "mt-6 inline-flex w-fit items-center text-label text-text-secondary transition-colors",
            "hover:text-accent focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]",
          )}
        >
          View project →
        </button>
      </div>
    </article>
  );
}
