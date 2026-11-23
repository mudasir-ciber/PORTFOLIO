"use client";

import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/motion/Reveal";
import { processContent } from "@/data/process";

export function ProcessCTA() {
  return (
    <Reveal>
      <div className="mt-12 flex flex-col gap-6 border-t border-border-subtle pt-10 md:mt-16 md:flex-row md:items-end md:justify-between md:pt-12">
        <div className="max-w-xl">
          <p className="text-label text-text-muted">
            {processContent.ctaEyebrow}
          </p>
          <h3 className="text-h3 mt-3 text-text">{processContent.ctaTitle}</h3>
          <p className="text-body-lg mt-3">{processContent.ctaDescription}</p>
        </div>
        <ButtonLink href={processContent.ctaHref} size="lg" className="group">
          {processContent.ctaLabel}
          <span
            aria-hidden
            className="inline-block transition-transform duration-[var(--duration-fast)] ease-[var(--ease-out)] group-hover:translate-x-1"
          >
            →
          </span>
        </ButtonLink>
      </div>
    </Reveal>
  );
}
