"use client";

import { aboutContent, type PhilosophyItem } from "@/data/about";
import { Reveal } from "@/components/motion/Reveal";

type CreativePhilosophyProps = {
  items?: readonly PhilosophyItem[];
};

export function CreativePhilosophy({
  items = aboutContent.philosophy,
}: CreativePhilosophyProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-3 sm:gap-5">
      {items.map((item, index) => (
        <Reveal key={item.number} delay={Math.min(0.06 * index, 0.18)}>
          <article className="border-t border-border-subtle pt-5">
            <p className="text-label text-accent">{item.number}</p>
            <h3 className="mt-3 font-[family-name:var(--font-display)] text-xl font-semibold tracking-[-0.02em] text-text">
              {item.title}
            </h3>
            <p className="mt-2 text-body-sm text-text-secondary">
              {item.description}
            </p>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
