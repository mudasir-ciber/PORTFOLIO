"use client";

import { ServiceList } from "@/components/services/ServiceList";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { servicesContent } from "@/data/services";
import { transition } from "@/lib/motion";
import { motion } from "motion/react";

export function Services() {
  return (
    <Section id="services" ariaLabel="Services" className="scroll-mt-24">
      <Container>
        <div className="mb-10 max-w-3xl md:mb-14">
          <motion.p
            className="text-label mb-4 text-text-muted"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={transition.normal}
          >
            {servicesContent.eyebrow}
          </motion.p>

          <h2 className="text-h1">
            {servicesContent.titleLines.map((line, index) => (
              <span key={line} className="block overflow-hidden pb-[0.04em]">
                <motion.span
                  className="block"
                  initial={{ y: "110%", opacity: 0 }}
                  whileInView={{ y: "0%", opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ ...transition.cinematic, delay: 0.08 * index }}
                >
                  {index === servicesContent.titleLines.length - 1 ? (
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
            transition={{ ...transition.slow, delay: 0.18 }}
          >
            {servicesContent.description}
          </motion.p>
        </div>

        <ServiceList />

        <Reveal delay={0.08}>
          <div className="mt-14 flex flex-col gap-6 border-t border-border-subtle pt-10 md:mt-16 md:flex-row md:items-end md:justify-between md:pt-12">
            <div className="max-w-xl">
              <p className="text-label text-text-muted">
                {servicesContent.ctaEyebrow}
              </p>
              <h3 className="text-h3 mt-3 text-text">
                {servicesContent.ctaTitle}
              </h3>
              <p className="text-body-lg mt-3">
                {servicesContent.ctaDescription}
              </p>
            </div>
            <ButtonLink href={servicesContent.ctaHref} size="lg">
              {servicesContent.ctaLabel} →
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
