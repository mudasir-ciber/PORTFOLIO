"use client";

import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

type ProjectCardProps = {
  project: Project;
  onOpen: (project: Project) => void;
  className?: string;
};

export function ProjectCard({ project, onOpen, className }: ProjectCardProps) {
  const [active, setActive] = useState(false);
  const hasPreview = Boolean(project.previewVideo);
  const hasThumb = Boolean(project.thumbnail);

  return (
    <article
      className={cn("group relative", className)}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      <button
        type="button"
        onClick={() => onOpen(project)}
        className="block w-full text-left focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)] rounded-[var(--radius-lg)]"
        aria-label={`Open project ${project.title}`}
      >
        <div className="media-frame media-frame--16x9 overflow-hidden">
          {hasThumb ? (
            <Image
              src={project.thumbnail}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className={cn(
                "media-hover object-cover",
                active && "scale-[1.03]",
              )}
            />
          ) : (
            <div
              className="absolute inset-0 flex flex-col justify-between p-5"
              style={{
                background:
                  "linear-gradient(155deg, #16151a 0%, #0c0c0e 50%, #1a1712 100%)",
              }}
            >
              <p className="text-label text-text-secondary">{project.category}</p>
              <p className="text-label text-text-muted">Thumbnail pending</p>
            </div>
          )}

          {hasPreview && active ? (
            <video
              className="absolute inset-0 h-full w-full object-cover"
              src={project.previewVideo ?? undefined}
              muted
              loop
              playsInline
              autoPlay
              preload="none"
              aria-hidden
            />
          ) : null}

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent opacity-80" />
        </div>

        <div className="mt-4 flex items-start justify-between gap-4">
          <div>
            <p className="text-label text-text-muted">{project.category}</p>
            <h3 className="mt-2 font-[family-name:var(--font-display)] text-xl font-semibold tracking-[-0.02em] text-text transition-colors group-hover:text-accent">
              {project.title}
            </h3>
            {project.description ? (
              <p
                className={cn(
                  "mt-2 max-w-md text-body-sm text-text-secondary transition-opacity duration-[var(--duration-normal)]",
                  active ? "opacity-100" : "opacity-80 md:opacity-0 md:group-hover:opacity-100",
                )}
              >
                {project.description}
              </p>
            ) : null}
          </div>
          {project.year ? (
            <p className="text-label text-text-muted tabular-nums">{project.year}</p>
          ) : null}
        </div>
      </button>
    </article>
  );
}
