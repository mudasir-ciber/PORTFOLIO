"use client";

import { cn } from "@/lib/utils";
import {
  revealVariants,
  transition,
  type RevealVariant,
} from "@/lib/motion";
import { motion, type HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  className?: string;
  once?: boolean;
  amount?: number;
} & Omit<HTMLMotionProps<"div">, "children">;

/**
 * Reusable scroll/mount reveal foundation for future sections.
 * Reduced motion is handled globally via MotionConfig (reducedMotion="user").
 */
export function Reveal({
  children,
  variant = "fadeUp",
  delay = 0,
  className,
  once = true,
  amount = 0.25,
  ...props
}: RevealProps) {
  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={revealVariants[variant]}
      transition={{ ...transition.slow, delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
