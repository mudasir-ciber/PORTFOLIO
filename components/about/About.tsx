"use client";

import { AboutCTA } from "@/components/about/AboutCTA";
import { AboutIntro } from "@/components/about/AboutIntro";
import { AboutVisual } from "@/components/about/AboutVisual";
import { CreativePhilosophy } from "@/components/about/CreativePhilosophy";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { aboutContent } from "@/data/about";
import { transition } from "@/lib/motion";
import { motion } from "motion/react";

export function About() {
  return (
    <Section id="about" ariaLabel="About" className="scroll-mt-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16 xl:gap-20">
          <div>
            <h2 className="text-hero">
              {aboutContent.headlineLines.map((line, index) => {
                const isAccent = index >= aboutContent.accentFromLine;
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
          </div>

          <AboutIntro />
        </div>

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-14">
          <AboutVisual />
          <div className="flex flex-col gap-10 lg:pt-2">
            <Reveal>
              <p className="text-label text-text-muted">Creative philosophy</p>
            </Reveal>
            <CreativePhilosophy />
          </div>
        </div>

        <div className="mt-14 md:mt-16">
          <AboutCTA />
        </div>
      </Container>
    </Section>
  );
}
