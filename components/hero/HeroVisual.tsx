"use client";

import { transition } from "@/lib/motion";
import { motion } from "motion/react";

/**
 * Cinematic media placeholder ready for future showreel / project frame.
 * No stock photography — abstract editorial composition only.
 */
export function HeroVisual() {
  return (
    <motion.div
      className="relative w-full lg:justify-self-end"
      initial={{ opacity: 0, scale: 0.96, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ ...transition.cinematic, delay: 0.45 }}
    >
      <div className="relative overflow-hidden rounded-[var(--radius-lg)] border border-border-subtle bg-bg-elevated aspect-[16/11] lg:aspect-[4/5]">
        {/* Soft cinematic light */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 62% 38%, rgba(196,165,116,0.22), transparent 58%), linear-gradient(160deg, #16151a 0%, #0c0c0e 48%, #1a1712 100%)",
          }}
        />

        {/* Slow breathing media plane — swap for video/image later */}
        <motion.div
          className="absolute inset-[-4%]"
          aria-hidden
          animate={{ scale: [1, 1.04, 1] }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            background:
              "linear-gradient(125deg, transparent 20%, rgba(244,241,236,0.04) 46%, transparent 70%)",
          }}
        />

        {/* Letterbox bars */}
        <div className="absolute inset-x-0 top-0 h-[9%] bg-bg/70" aria-hidden />
        <div
          className="absolute inset-x-0 bottom-0 h-[9%] bg-bg/70"
          aria-hidden
        />

        {/* Frame corner marks */}
        <div
          className="pointer-events-none absolute inset-5 border border-border/70"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute left-5 top-5 h-3 w-3 border-l border-t border-accent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute right-5 top-5 h-3 w-3 border-r border-t border-accent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute bottom-5 left-5 h-3 w-3 border-b border-l border-accent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute bottom-5 right-5 h-3 w-3 border-b border-r border-accent"
          aria-hidden
        />

        {/* Editorial overlay copy */}
        <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <p className="text-label text-text-secondary">Opening frame</p>
            <p className="text-label text-text-muted tabular-nums">01:00:00:00</p>
          </div>

          <div className="max-w-[16rem]">
            <p className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-[-0.03em] text-text sm:text-3xl">
              Scroll to reel
            </p>
            <p className="mt-2 text-body-sm text-text-secondary">
              Showreel and selected work live below — add media when ready.
            </p>
          </div>
        </div>

        {/* Accent sweep line */}
        <motion.div
          className="absolute left-[12%] right-[12%] top-1/2 h-px origin-left bg-accent/50"
          aria-hidden
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ ...transition.cinematic, delay: 0.85 }}
        />
      </div>

      {/* Soft glow behind frame */}
      <div
        className="pointer-events-none absolute -inset-8 -z-10 rounded-full opacity-60 blur-3xl"
        aria-hidden
        style={{
          background:
            "radial-gradient(circle at 50% 45%, rgba(196,165,116,0.16), transparent 62%)",
        }}
      />
    </motion.div>
  );
}
