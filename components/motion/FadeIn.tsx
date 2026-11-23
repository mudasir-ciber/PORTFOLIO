"use client";

import { transition } from "@/lib/motion";
import { motion } from "motion/react";
import type { ReactNode } from "react";

type FadeInProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

/**
 * Simple mount fade — for controlled page/section entrances later.
 * Reduced motion is handled globally via MotionConfig (reducedMotion="user").
 */
export function FadeIn({ children, delay = 0, className }: FadeInProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ...transition.normal, delay }}
    >
      {children}
    </motion.div>
  );
}
