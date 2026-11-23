"use client";

import { aboutContent } from "@/data/about";
import { transition } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import Image from "next/image";

type AboutVisualProps = {
  className?: string;
};

const aspectClass = {
  portrait: "aspect-[4/5]",
  video: "aspect-video",
  square: "aspect-square",
} as const;

/**
 * Reusable personal visual slot.
 * Uses abstract cinematic treatment until a real image path is set.
 */
export function AboutVisual({ className }: AboutVisualProps) {
  const { image } = aboutContent;
  const hasImage = Boolean(image.src);

  return (
    <motion.figure
      className={cn("relative w-full", className)}
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={transition.cinematic}
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-[var(--radius-lg)] border border-border-subtle bg-bg-elevated",
          aspectClass[image.aspect],
        )}
      >
        {hasImage && image.src ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover object-center"
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 65% 55% at 55% 38%, rgba(196,165,116,0.2), transparent 58%), linear-gradient(155deg, #18161a 0%, #0c0c0e 48%, #1a1712 100%)",
            }}
            aria-hidden
          >
            <div className="absolute inset-x-0 top-0 h-[8%] bg-bg/50" />
            <div className="absolute inset-x-0 bottom-0 h-[8%] bg-bg/50" />
            <div className="absolute left-[16%] right-[16%] top-1/2 h-px bg-accent/35" />
            <div className="absolute left-[22%] top-[26%] h-[48%] w-px bg-border" />
            <div className="absolute right-[28%] top-[32%] h-[36%] w-px bg-border-subtle" />
            <div className="absolute left-4 top-4 h-2.5 w-2.5 border-l border-t border-accent/70" />
            <div className="absolute right-4 top-4 h-2.5 w-2.5 border-r border-t border-accent/70" />
            <div className="absolute bottom-4 left-4 h-2.5 w-2.5 border-b border-l border-accent/70" />
            <div className="absolute bottom-4 right-4 h-2.5 w-2.5 border-b border-r border-accent/70" />
            <div className="absolute inset-0 flex flex-col justify-between p-5">
              <p className="text-label text-text-secondary">Identity frame</p>
              <p className="max-w-[14rem] text-body-sm text-text-muted">
                Abstract placeholder — swap for portrait or studio still.
              </p>
            </div>
          </div>
        )}
      </div>

      {image.caption ? (
        <figcaption className="mt-3 text-label text-text-muted">
          {image.caption}
        </figcaption>
      ) : null}
    </motion.figure>
  );
}
