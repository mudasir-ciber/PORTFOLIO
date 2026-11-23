"use client";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { VideoModal } from "@/components/media/VideoModal";
import { VideoPlayer } from "@/components/media/VideoPlayer";
import { Reveal } from "@/components/motion/Reveal";
import { ShowreelPlaceholder } from "@/components/showreel/ShowreelPlaceholder";
import { showreel } from "@/data/showreel";
import { useState } from "react";

export function Showreel() {
  const [open, setOpen] = useState(false);
  const hasVideo = Boolean(showreel.video);

  return (
    <Section id="showreel" ariaLabel="Showreel" className="!pt-[var(--space-8)]">
      <Container>
        <Reveal>
          <div className="mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-label mb-3">{showreel.eyebrow}</p>
              <h2 className="text-h2 text-text">{showreel.title}</h2>
            </div>
            <p className="text-body-lg max-w-md md:text-right">
              {showreel.description}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08} variant="scale">
          {hasVideo ? (
            <button
              type="button"
              className="group relative block w-full overflow-hidden rounded-[var(--radius-lg)] text-left focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
              onClick={() => setOpen(true)}
              aria-label={showreel.ctaLabel}
            >
              <div className="pointer-events-none">
                <VideoPlayer
                  src={showreel.video}
                  poster={showreel.poster}
                  title={showreel.title}
                  muted
                  controls={false}
                />
              </div>
              <span className="absolute inset-0 grid place-items-center bg-bg/20 transition-colors group-hover:bg-bg/30">
                <span className="play-button" aria-hidden>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M5 3.5v11l10-5.5L5 3.5Z" fill="currentColor" />
                  </svg>
                </span>
              </span>
            </button>
          ) : (
            <ShowreelPlaceholder
              onPlayRequest={() => {
                if (hasVideo) setOpen(true);
              }}
            />
          )}
        </Reveal>
      </Container>

      <VideoModal
        open={open}
        onClose={() => setOpen(false)}
        src={showreel.video}
        poster={showreel.poster}
        title={showreel.title}
      />
    </Section>
  );
}
