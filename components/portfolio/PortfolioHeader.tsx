"use client";

import { portfolioContent } from "@/data/portfolio";
import { transition } from "@/lib/motion";
import { motion } from "motion/react";
import type { ReactNode } from "react";

type PortfolioHeaderProps = {
  description?: string;
  actions?: ReactNode;
  projectCount?: number;
};

export function PortfolioHeader({
  description = portfolioContent.description,
  actions,
  projectCount,
}: PortfolioHeaderProps) {
  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
      <div className="max-w-3xl">
        <motion.p
          className="text-label mb-4 text-text-muted"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={transition.normal}
        >
          {portfolioContent.eyebrow}
          {typeof projectCount === "number" && projectCount > 0
            ? ` · ${String(projectCount).padStart(2, "0")}`
            : ""}
        </motion.p>

        <h2 className="text-h1">
          {portfolioContent.titleLines.map((line, index) => (
            <span key={line} className="block overflow-hidden pb-[0.04em]">
              <motion.span
                className="block"
                initial={{ y: "110%", opacity: 0 }}
                whileInView={{ y: "0%", opacity: 1 }}
                viewport={{ once: true }}
                transition={{ ...transition.cinematic, delay: 0.08 * index }}
              >
                {index === portfolioContent.titleLines.length - 1 ? (
                  <span className="text-accent">{line}</span>
                ) : (
                  line
                )}
              </motion.span>
            </span>
          ))}
        </h2>

        <motion.p
          className="text-body-lg mt-5 max-w-xl"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ...transition.slow, delay: 0.2 }}
        >
          {description}
        </motion.p>
      </div>

      {actions ? <div className="shrink-0 lg:pb-1">{actions}</div> : null}
    </div>
  );
}
