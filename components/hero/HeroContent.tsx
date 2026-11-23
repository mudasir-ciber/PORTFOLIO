"use client";

import { HeroCTA } from "@/components/hero/HeroCTA";
import { HeroHeadline } from "@/components/hero/HeroHeadline";
import { heroContent } from "@/data/navigation";
import { transition } from "@/lib/motion";
import { motion } from "motion/react";

export function HeroContent() {
  return (
    <div className="relative z-10 flex max-w-2xl flex-col">
      <motion.p
        className="text-label mb-5 text-text-muted"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...transition.normal, delay: 0.16 }}
      >
        {heroContent.eyebrow}
      </motion.p>

      <HeroHeadline lines={heroContent.headlineLines} />

      <motion.p
        className="text-body-lg mt-6 max-w-md"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...transition.slow, delay: 0.52 }}
      >
        {heroContent.description}
      </motion.p>

      <HeroCTA />
    </div>
  );
}
