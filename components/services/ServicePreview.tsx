"use client";

import type { Service } from "@/data/services";
import { cn } from "@/lib/utils";

const visualStyles: Record<Service["visual"], string> = {
  amber:
    "radial-gradient(ellipse 70% 60% at 60% 40%, rgba(196,165,116,0.28), transparent 58%), linear-gradient(150deg, #1a1712 0%, #0c0c0e 55%, #12100c 100%)",
  steel:
    "radial-gradient(ellipse 65% 55% at 40% 35%, rgba(160,170,180,0.18), transparent 55%), linear-gradient(155deg, #14161a 0%, #0b0c0e 60%, #101215 100%)",
  smoke:
    "radial-gradient(ellipse 75% 50% at 50% 45%, rgba(244,241,236,0.08), transparent 55%), linear-gradient(160deg, #161616 0%, #0a0a0b 50%, #121212 100%)",
  ember:
    "radial-gradient(ellipse 60% 55% at 70% 30%, rgba(196,120,90,0.22), transparent 55%), linear-gradient(145deg, #1a1210 0%, #0c0a0a 55%, #14100e 100%)",
  slate:
    "radial-gradient(ellipse 70% 60% at 35% 50%, rgba(120,140,160,0.16), transparent 58%), linear-gradient(150deg, #12151a 0%, #0a0b0d 60%, #101318 100%)",
  sand:
    "radial-gradient(ellipse 65% 50% at 55% 35%, rgba(196,165,116,0.14), transparent 55%), linear-gradient(155deg, #18160f 0%, #0c0c0a 55%, #14120e 100%)",
};

type ServicePreviewProps = {
  service: Service;
  active?: boolean;
  className?: string;
};

/**
 * Abstract cinematic preview — not portfolio footage.
 */
export function ServicePreview({
  service,
  active = false,
  className,
}: ServicePreviewProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[var(--radius-md)] border border-border-subtle aspect-[16/11]",
        className,
      )}
      aria-hidden
    >
      <div
        className="absolute inset-0 transition-opacity duration-[var(--duration-normal)] ease-[var(--ease-out)]"
        style={{
          background: visualStyles[service.visual],
          opacity: active ? 1 : 0.85,
        }}
      />

      {/* Soft scan / timeline suggestion */}
      <div className="absolute inset-x-[12%] top-1/2 h-px origin-left bg-accent/35" />
      <div className="absolute left-[18%] top-[28%] h-[44%] w-px bg-border" />
      <div className="absolute right-[22%] top-[34%] h-[32%] w-px bg-border-subtle" />

      <div className="absolute inset-x-0 top-0 h-[8%] bg-bg/45" />
      <div className="absolute inset-x-0 bottom-0 h-[8%] bg-bg/45" />

      <div className="absolute left-3 top-3 h-2 w-2 border-l border-t border-accent/60" />
      <div className="absolute right-3 top-3 h-2 w-2 border-r border-t border-accent/60" />
      <div className="absolute bottom-3 left-3 h-2 w-2 border-b border-l border-accent/60" />
      <div className="absolute bottom-3 right-3 h-2 w-2 border-b border-r border-accent/60" />

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-3">
        <p className="text-label text-text-muted">{service.number}</p>
        <p className="text-label text-text-secondary">{service.category}</p>
      </div>
    </div>
  );
}
