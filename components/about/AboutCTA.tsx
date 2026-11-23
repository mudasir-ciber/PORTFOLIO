"use client";

import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/motion/Reveal";
import { aboutContent } from "@/data/about";

export function AboutCTA() {
  return (
    <Reveal>
      <div className="flex flex-col gap-6 border-t border-border-subtle pt-10 md:flex-row md:items-end md:justify-between md:pt-12">
        <div className="max-w-xl">
          <p className="text-label text-text-muted">{aboutContent.ctaEyebrow}</p>
          <h3 className="text-h3 mt-3 text-text">{aboutContent.ctaTitle}</h3>
          <p className="text-body-lg mt-3">{aboutContent.ctaDescription}</p>
        </div>
        <ButtonLink href={aboutContent.ctaHref} size="lg">
          {aboutContent.ctaLabel} →
        </ButtonLink>
      </div>
    </Reveal>
  );
}
