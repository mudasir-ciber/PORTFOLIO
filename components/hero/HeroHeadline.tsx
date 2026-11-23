"use client";

import { transition } from "@/lib/motion";
import { motion } from "motion/react";

type HeroHeadlineProps = {
  lines: readonly string[];
};

export function HeroHeadline({ lines }: HeroHeadlineProps) {
  return (
    <h1 className="text-hero">
      {lines.map((line, index) => {
        const isAccent = index === lines.length - 1;
        return (
          <span key={line} className="block overflow-hidden pb-[0.04em]">
            <motion.span
              className="block w-max max-w-full will-change-transform"
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{
                ...transition.cinematic,
                delay: 0.28 + index * 0.1,
              }}
            >
              {isAccent ? <span className="text-accent">{line}</span> : line}
            </motion.span>
          </span>
        );
      })}
    </h1>
  );
}
