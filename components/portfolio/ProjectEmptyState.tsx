import { portfolioContent } from "@/data/portfolio";

/**
 * Intentional empty portfolio — not an error state.
 * Ghost frames preview the editorial rhythm awaiting real media.
 */
export function ProjectEmptyState() {
  return (
    <div className="mt-4">
      <div className="mb-10 max-w-2xl">
        <h3 className="text-h3 text-text">{portfolioContent.emptyTitle}</h3>
        <p className="text-body-lg mt-4">{portfolioContent.emptyDescription}</p>
        <p className="text-label mt-5 text-text-muted">
          {portfolioContent.emptyHint}
        </p>
      </div>

      {/* Ghost editorial rhythm — visual only */}
      <div className="grid gap-4 md:gap-5" aria-hidden>
        <GhostFrame className="aspect-[21/9]" label="Featured frame" wide />
        <div className="grid gap-4 md:grid-cols-12 md:gap-5">
          <GhostFrame className="aspect-[16/10] md:col-span-7" label="01" />
          <GhostFrame className="aspect-[4/5] md:col-span-5" label="02" />
        </div>
        <div className="grid gap-4 md:grid-cols-12 md:gap-5">
          <GhostFrame className="aspect-[4/5] md:col-span-5" label="03" />
          <GhostFrame className="aspect-[16/10] md:col-span-7" label="04" />
        </div>
      </div>
    </div>
  );
}

function GhostFrame({
  className,
  label,
  wide = false,
}: {
  className?: string;
  label: string;
  wide?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[var(--radius-lg)] border border-border-subtle ${className ?? ""}`}
      style={{
        background:
          "linear-gradient(155deg, rgba(26,26,30,0.9) 0%, rgba(12,12,14,0.95) 55%, rgba(26,23,18,0.85) 100%)",
      }}
    >
      <div className="absolute inset-x-0 top-0 h-[7%] bg-bg/40" />
      <div className="absolute inset-x-0 bottom-0 h-[7%] bg-bg/40" />
      <div className="absolute left-4 top-4 h-2.5 w-2.5 border-l border-t border-accent/50" />
      <div className="absolute right-4 top-4 h-2.5 w-2.5 border-r border-t border-accent/50" />
      <div className="absolute bottom-4 left-4 h-2.5 w-2.5 border-b border-l border-accent/50" />
      <div className="absolute bottom-4 right-4 h-2.5 w-2.5 border-b border-r border-accent/50" />
      <div
        className={`absolute inset-0 flex ${wide ? "items-end p-6" : "items-end p-5"}`}
      >
        <p className="text-label text-text-muted">{label}</p>
      </div>
    </div>
  );
}
