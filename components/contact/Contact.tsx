"use client";

import { ContactDetails } from "@/components/contact/ContactDetails";
import { ProjectInquiryForm } from "@/components/contact/ProjectInquiryForm";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { contactContent } from "@/data/contact";
import { transition } from "@/lib/motion";
import { motion } from "motion/react";

export function Contact() {
  return (
    <Section id="contact" ariaLabel="Contact" className="scroll-mt-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16 xl:gap-20">
          <div>
            <motion.p
              className="text-label mb-4 text-text-muted"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={transition.normal}
            >
              {contactContent.eyebrow}
            </motion.p>

            <h2 className="text-hero">
              {contactContent.headlineLines.map((line, index) => {
                const isAccent = index >= contactContent.accentFromLine;
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
              className="text-body-lg mt-5 max-w-md"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...transition.slow, delay: 0.2 }}
            >
              {contactContent.description}
            </motion.p>

            {/* Abstract contact visual */}
            <Reveal delay={0.1}>
              <div
                className="relative mt-10 hidden overflow-hidden rounded-[var(--radius-lg)] border border-border-subtle aspect-[16/10] lg:block"
                aria-hidden
                style={{
                  background:
                    "radial-gradient(ellipse 70% 55% at 55% 40%, rgba(196,165,116,0.16), transparent 58%), linear-gradient(155deg, #16151a 0%, #0c0c0e 55%, #1a1712 100%)",
                }}
              >
                <div className="absolute inset-x-0 top-0 h-[8%] bg-bg/45" />
                <div className="absolute inset-x-0 bottom-0 h-[8%] bg-bg/45" />
                <div className="absolute left-[14%] right-[14%] top-1/2 h-px bg-accent/40" />
                <div className="absolute left-4 top-4 h-2.5 w-2.5 border-l border-t border-accent/70" />
                <div className="absolute right-4 top-4 h-2.5 w-2.5 border-r border-t border-accent/70" />
                <div className="absolute bottom-4 left-4 h-2.5 w-2.5 border-b border-l border-accent/70" />
                <div className="absolute bottom-4 right-4 h-2.5 w-2.5 border-b border-r border-accent/70" />
                <div className="absolute inset-0 flex items-end justify-between p-5">
                  <p className="text-label text-text-secondary">Inquiry lane</p>
                  <p className="text-label text-text-muted">FRAME</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="mt-8">
                <ContactDetails />
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.08}>
            <ProjectInquiryForm />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
