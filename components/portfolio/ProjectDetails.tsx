"use client";

import { VideoPlayer } from "@/components/media/VideoPlayer";
import type { Project } from "@/data/projects";
import { transition } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useId, useRef } from "react";

type ProjectDetailsProps = {
  project: Project | null;
  open: boolean;
  onClose: () => void;
};

export function ProjectDetails({
  project,
  open,
  onClose,
}: ProjectDetailsProps) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const frame = window.requestAnimationFrame(() => {
      closeRef.current?.focus();
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      previouslyFocused.current?.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && project ? (
        <motion.div
          className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={transition.fast}
        >
          <button
            type="button"
            className="absolute inset-0 bg-bg/85 backdrop-blur-sm"
            aria-label="Close project details"
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className={cn(
              "relative z-10 flex max-h-[92dvh] w-full max-w-5xl flex-col overflow-hidden rounded-t-[var(--radius-xl)] border border-border bg-bg-elevated sm:rounded-[var(--radius-lg)]",
            )}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={transition.normal}
          >
            <div className="flex items-center justify-between gap-4 border-b border-border-subtle px-4 py-3 sm:px-5">
              <div>
                <p className="text-label text-text-muted">
                  {project.category}
                  {project.isDemo ? " · DEMO" : ""}
                </p>
                <h2 id={titleId} className="mt-1 text-h3 text-text">
                  {project.title}
                </h2>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                className="shrink-0 rounded-pill border border-border px-3 py-2 text-label text-text transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
              >
                Close
              </button>
            </div>

            <div className="overflow-y-auto p-4 sm:p-5">
              {project.video ? (
                <VideoPlayer
                  src={project.video}
                  poster={project.thumbnail || null}
                  title={project.title}
                  autoPlay
                />
              ) : (
                <div className="flex aspect-video items-center justify-center rounded-[var(--radius-md)] border border-border-subtle bg-bg">
                  <div className="px-6 text-center">
                    <p className="text-label text-text-muted">
                      {project.isDemo
                        ? "DEMO — no media attached"
                        : "Final video not added yet"}
                    </p>
                    <p className="mt-2 text-body-sm text-text-secondary">
                      Drop an MP4 in /public/videos and set the project video
                      path.
                    </p>
                  </div>
                </div>
              )}

              <div className="mt-6 grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
                <div>
                  {project.description ? (
                    <p className="text-body-lg">{project.description}</p>
                  ) : null}

                  {project.challenge ? (
                    <DetailBlock label="Challenge" body={project.challenge} />
                  ) : null}
                  {project.approach ? (
                    <DetailBlock label="Approach" body={project.approach} />
                  ) : null}
                  {project.result ? (
                    <DetailBlock label="Result" body={project.result} />
                  ) : null}
                </div>

                <dl className="space-y-4 rounded-[var(--radius-md)] border border-border-subtle bg-bg/50 p-4">
                  {project.client ? (
                    <MetaItem label="Client" value={project.client} />
                  ) : null}
                  {project.year ? (
                    <MetaItem label="Year" value={String(project.year)} />
                  ) : null}
                  <MetaItem label="Category" value={project.category} />
                  {project.tools && project.tools.length > 0 ? (
                    <MetaItem label="Tools" value={project.tools.join(", ")} />
                  ) : null}
                </dl>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function DetailBlock({ label, body }: { label: string; body: string }) {
  return (
    <div className="mt-6">
      <p className="text-label text-text-muted">{label}</p>
      <p className="mt-2 text-body text-text-secondary">{body}</p>
    </div>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-label text-text-muted">{label}</dt>
      <dd className="mt-1 text-body-sm text-text">{value}</dd>
    </div>
  );
}
