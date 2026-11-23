"use client";

import { VideoPlayer } from "@/components/media/VideoPlayer";
import { transition } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useId, useRef } from "react";

type VideoModalProps = {
  open: boolean;
  onClose: () => void;
  src?: string | null;
  poster?: string | null;
  title?: string;
};

export function VideoModal({
  open,
  onClose,
  src,
  poster,
  title = "Video",
}: VideoModalProps) {
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
      {open ? (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={transition.fast}
        >
          <button
            type="button"
            className="absolute inset-0 bg-bg/85 backdrop-blur-sm"
            aria-label="Close video"
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className={cn(
              "relative z-10 w-full max-w-5xl overflow-hidden rounded-[var(--radius-lg)] border border-border bg-bg-elevated shadow-2xl",
            )}
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={transition.normal}
          >
            <div className="flex items-center justify-between gap-4 border-b border-border-subtle px-4 py-3 sm:px-5">
              <h2 id={titleId} className="text-label text-text">
                {title}
              </h2>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                className="rounded-pill border border-border px-3 py-2 text-label text-text transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
              >
                Close
              </button>
            </div>

            <div className="p-3 sm:p-4">
              {src ? (
                <VideoPlayer
                  src={src}
                  poster={poster}
                  title={title}
                  autoPlay
                  muted={false}
                />
              ) : (
                <div className="flex aspect-video items-center justify-center rounded-[var(--radius-md)] border border-border-subtle bg-bg">
                  <p className="text-label text-text-muted">
                    Video file not added yet
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
