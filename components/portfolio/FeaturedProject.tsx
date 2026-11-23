"use client";

import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";
import Image from "next/image";

type FeaturedProjectProps = {
  project: Project;
  onOpen: (project: Project) => void;
};

export function FeaturedProject({ project, onOpen }: FeaturedProjectProps) {
  const hasThumb = Boolean(project.thumbnail);

  return (
    <article className="group">
      <button
        type="button"
        onClick={() => onOpen(project)}
        className="block w-full text-left focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)] rounded-[var(--radius-lg)]"
        aria-label={`Open featured project ${project.title}`}
      >
        <div className="media-frame media-frame--cinema overflow-hidden">
          {hasThumb ? (
            <Image
              src={project.thumbnail}
              alt=""
              fill
              sizes="100vw"
              className="object-cover transition-transform duration-[var(--duration-slow)] ease-[var(--ease-cinematic)] group-hover:scale-[1.025]"
              priority={false}
            />
          ) : (
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 70% 55% at 55% 40%, rgba(196,165,116,0.16), transparent 58%), linear-gradient(155deg, #16151a 0%, #0c0c0e 50%, #1a1712 100%)",
              }}
            />
          )}

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg via-bg/20 to-transparent" />

          {project.isDemo ? (
            <span className="absolute left-5 top-5 rounded-sm border border-border bg-bg/70 px-2 py-1 text-label text-accent backdrop-blur-sm">
              DEMO
            </span>
          ) : null}

          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8 lg:p-10">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-label text-accent">Featured</p>
                <p className="text-label mt-3 text-text-secondary">
                  {project.category}
                  {project.year ? ` · ${project.year}` : ""}
                  {project.client ? ` · ${project.client}` : ""}
                </p>
                <h3 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,3rem)] font-semibold tracking-[-0.03em] text-text">
                  {project.title}
                </h3>
                {project.description ? (
                  <p className="mt-3 max-w-xl text-body-sm text-text-secondary sm:text-[length:var(--text-body-lg)] sm:leading-[var(--leading-body)]">
                    {project.description}
                  </p>
                ) : null}
              </div>

              <span
                className={cn(
                  "inline-flex items-center text-label text-text-secondary transition-colors",
                  "group-hover:text-accent",
                )}
              >
                View project →
              </span>
            </div>
          </div>
        </div>
      </button>
    </article>
  );
}
