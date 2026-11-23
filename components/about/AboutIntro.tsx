"use client";

import { aboutContent } from "@/data/about";
import { transition } from "@/lib/motion";
import { motion } from "motion/react";

export function AboutIntro() {
  const meta = [
    aboutContent.role,
    aboutContent.specialization,
    aboutContent.location,
    aboutContent.availability,
  ].filter(Boolean) as string[];

  return (
    <div className="flex flex-col gap-6 lg:max-w-md">
      <motion.p
        className="text-label text-text-muted"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={transition.normal}
      >
        {aboutContent.eyebrow}
      </motion.p>

      <motion.p
        className="text-body-lg"
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ ...transition.slow, delay: 0.08 }}
      >
        {aboutContent.intro}
      </motion.p>

      <motion.p
        className="text-body text-text-secondary"
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ ...transition.slow, delay: 0.14 }}
      >
        {aboutContent.body}
      </motion.p>

      {meta.length > 0 ? (
        <motion.ul
          className="mt-2 flex flex-col gap-2 border-t border-border-subtle pt-5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ ...transition.normal, delay: 0.2 }}
        >
          {meta.map((item) => (
            <li key={item} className="text-label text-text-muted">
              {item}
            </li>
          ))}
        </motion.ul>
      ) : null}
    </div>
  );
}
