"use client";

import { transition } from "@/lib/motion";
import { motion } from "motion/react";

export function ScrollIndicator() {
  return (
    <motion.a
      href="#showreel"
      className="group absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 items-center gap-3 md:flex lg:bottom-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ...transition.slow, delay: 1.05 }}
      aria-label="Scroll to showreel"
    >
      <span className="text-label text-text-muted transition-colors group-hover:text-text">
        Scroll
      </span>
      <span className="relative h-8 w-px overflow-hidden bg-border">
        <motion.span
          className="absolute inset-x-0 top-0 h-3 bg-accent"
          animate={{ y: ["-100%", "220%"] }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </span>
    </motion.a>
  );
}
