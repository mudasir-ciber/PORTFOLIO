import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type MediaPlaceholderProps = {
  label?: string;
  meta?: string;
  title?: string;
  description?: string;
  className?: string;
  children?: ReactNode;
  aspect?: "video" | "portrait" | "cinema";
};

const aspectClass = {
  video: "aspect-video",
  portrait: "aspect-[4/5]",
  cinema: "aspect-[21/9]",
} as const;

export function MediaPlaceholder({
  label = "Media slot",
  meta,
  title,
  description,
  className,
  children,
  aspect = "video",
}: MediaPlaceholderProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[var(--radius-lg)] border border-border-subtle bg-bg-elevated",
        aspectClass[aspect],
        className,
      )}
    >
      <div
        className="absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 55% 40%, rgba(196,165,116,0.14), transparent 58%), linear-gradient(155deg, #16151a 0%, #0c0c0e 50%, #1a1712 100%)",
        }}
      />

      <div className="absolute inset-x-0 top-0 h-[8%] bg-bg/55" aria-hidden />
      <div className="absolute inset-x-0 bottom-0 h-[8%] bg-bg/55" aria-hidden />

      <div
        className="pointer-events-none absolute inset-5 border border-border/60"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-5 top-5 h-3 w-3 border-l border-t border-accent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-5 top-5 h-3 w-3 border-r border-t border-accent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-5 left-5 h-3 w-3 border-b border-l border-accent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-5 right-5 h-3 w-3 border-b border-r border-accent"
        aria-hidden
      />

      <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <p className="text-label text-text-secondary">{label}</p>
          {meta ? <p className="text-label text-text-muted">{meta}</p> : null}
        </div>

        <div className="max-w-md">
          {title ? (
            <p className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-[-0.03em] text-text sm:text-2xl">
              {title}
            </p>
          ) : null}
          {description ? (
            <p className="mt-2 text-body-sm text-text-secondary">{description}</p>
          ) : null}
          {children}
        </div>
      </div>
    </div>
  );
}
