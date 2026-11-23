"use client";

import { MediaPlaceholder } from "@/components/media/MediaPlaceholder";
import { showreel } from "@/data/showreel";
import { cn } from "@/lib/utils";

type ShowreelPlaceholderProps = {
  onPlayRequest?: () => void;
};

export function ShowreelPlaceholder({ onPlayRequest }: ShowreelPlaceholderProps) {
  const available = Boolean(showreel.video);

  return (
    <button
      type="button"
      onClick={onPlayRequest}
      disabled={!available}
      className={cn(
        "group relative block w-full rounded-[var(--radius-lg)] text-left",
        "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]",
        !available && "cursor-default",
      )}
      aria-label={
        available ? showreel.ctaLabel : showreel.unavailableLabel
      }
    >
      <MediaPlaceholder
        label="Showreel"
        meta="Master pending"
        title={showreel.unavailableLabel}
        description="Drop the final reel into /public/videos and wire it in data/showreel.ts."
        aspect="cinema"
        className="transition-[border-color] duration-[var(--duration-normal)] ease-[var(--ease-out)] group-hover:border-border"
      />

      <span className="pointer-events-none absolute inset-0 grid place-items-center">
        <span
          className={cn("play-button", !available && "opacity-60")}
          aria-hidden
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M5 3.5v11l10-5.5L5 3.5Z" fill="currentColor" />
          </svg>
        </span>
      </span>
    </button>
  );
}
