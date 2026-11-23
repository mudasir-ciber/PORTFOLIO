"use client";

import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type ProjectCardProps = {
  project: Project;
  onOpen: (project: Project) => void;
  className?: string;
  /** Editorial media proportion */
  mediaAspect?: "video" | "portrait" | "cinema";
};

export function ProjectCard({
  project,
  onOpen,
  className,
  mediaAspect = "video",
}: ProjectCardProps) {
  const [hovering, setHovering] = useState(false);
  const [canPreview, setCanPreview] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasPreview = Boolean(project.previewVideo);
  const hasThumb = Boolean(project.thumbnail);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !hasPreview) return;

    if (hovering && canPreview) {
      void video.play().catch(() => undefined);
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [hovering, canPreview, hasPreview]);

  const aspectClass =
    mediaAspect === "portrait"
      ? "media-frame--4x5"
      : mediaAspect === "cinema"
        ? "media-frame--cinema"
        : "media-frame--16x9";

  return (
    <article
      className={cn("group relative h-full", className)}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <button
        type="button"
        onClick={() => onOpen(project)}
        className="flex h-full w-full flex-col text-left focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)] rounded-[var(--radius-lg)]"
        aria-label={`Open project ${project.title}`}
      >
        <div className={cn("media-frame overflow-hidden", aspectClass)}>
          {hasThumb ? (
            <Image
              src={project.thumbnail}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
              className={cn(
                "object-cover transition-transform duration-[var(--duration-slow)] ease-[var(--ease-cinematic)]",
                hovering && "scale-[1.035]",
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
              <p className="text-label text-text-muted">
                {project.isDemo ? "DEMO frame" : "Thumbnail pending"}
              </p>
            </div>
          )}

          {hasPreview ? (
            <video
              ref={videoRef}
              className={cn(
                "absolute inset-0 h-full w-full object-cover transition-opacity duration-[var(--duration-normal)]",
                hovering && canPreview ? "opacity-100" : "opacity-0",
              )}
              src={project.previewVideo ?? undefined}
              muted
              loop
              playsInline
              preload="none"
              aria-hidden
              onLoadedData={() => setCanPreview(true)}
            />
          ) : null}

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/75 via-transparent to-transparent opacity-90" />

          {project.isDemo ? (
            <span className="absolute left-4 top-4 rounded-sm border border-border bg-bg/70 px-2 py-1 text-label text-accent backdrop-blur-sm">
              DEMO
            </span>
          ) : null}
        </div>

        <div className="mt-4 flex flex-1 items-start justify-between gap-4">
          <div>
            <p className="text-label text-text-muted">{project.category}</p>
            <h3 className="mt-2 font-[family-name:var(--font-display)] text-[clamp(1.15rem,2vw,1.45rem)] font-semibold tracking-[-0.02em] text-text transition-colors group-hover:text-accent">
              {project.title}
            </h3>
            {project.description ? (
              <p className="mt-2 max-w-md text-body-sm text-text-secondary md:opacity-80 md:transition-opacity md:group-hover:opacity-100">
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
