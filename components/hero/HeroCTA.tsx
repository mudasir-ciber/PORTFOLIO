"use client";

import { ButtonLink } from "@/components/ui/ButtonLink";
import { heroContent } from "@/data/navigation";
import { transition } from "@/lib/motion";
import { motion } from "motion/react";

export function HeroCTA() {
  return (
    <motion.div
      className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...transition.slow, delay: 0.62 }}
    >
      <ButtonLink href={heroContent.primaryCta.href} size="lg">
        {heroContent.primaryCta.label}
      </ButtonLink>
      <ButtonLink
        href={heroContent.secondaryCta.href}
        variant="secondary"
        size="lg"
      >
        {heroContent.secondaryCta.label}
      </ButtonLink>
    </motion.div>
  );
}
