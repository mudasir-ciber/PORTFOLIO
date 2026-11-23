"use client";

import { ProcessCTA } from "@/components/process/ProcessCTA";
import { ProcessTimeline } from "@/components/process/ProcessTimeline";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { processContent } from "@/data/process";
import { transition } from "@/lib/motion";
import { motion } from "motion/react";

export function Process() {
  return (
    <Section id="process" ariaLabel="Editing process" className="scroll-mt-24">
      <Container>
        <div className="mb-10 max-w-3xl md:mb-14">
          <motion.p
            className="text-label mb-3 text-text-muted"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={transition.normal}
          >
            {processContent.eyebrow}
          </motion.p>

          <motion.p
            className="text-label mb-5 text-accent"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...transition.normal, delay: 0.05 }}
          >
            {processContent.microLabel}
          </motion.p>

          <h2 className="text-h1">
            {processContent.titleLines.map((line, index) => {
              const isAccent = index >= processContent.accentFromLine;
              return (
                <span
                  key={`${line}-${index}`}
                  className="block overflow-hidden pb-[0.04em]"
                >
                  <motion.span
                    className="block"
                    initial={{ y: "110%", opacity: 0 }}
                    whileInView={{ y: "0%", opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      ...transition.cinematic,
                      delay: 0.08 * index,
                    }}
                  >
                    {isAccent ? (
                      <span className="text-accent">{line}</span>
                    ) : (
                      line
                    )}
                  </motion.span>
                </span>
              );
            })}
          </h2>

          <motion.p
            className="text-body-lg mt-5 max-w-xl"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...transition.slow, delay: 0.2 }}
          >
            {processContent.description}
          </motion.p>
        </div>

        <ProcessTimeline />
        <ProcessCTA />
      </Container>
    </Section>
  );
}
