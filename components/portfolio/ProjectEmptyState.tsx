import { Divider } from "@/components/ui/Divider";

export function ProjectEmptyState() {
  return (
    <div className="surface-elevated px-6 py-12 sm:px-10 sm:py-16">
      <p className="text-label mb-4">Selected work</p>
      <h3 className="text-h3 text-text max-w-[16ch]">
        Selected work coming soon.
      </h3>
      <p className="text-body-lg mt-4 max-w-xl">
        This grid is ready. When real projects, thumbnails, and cuts are added
        to the portfolio data, they appear here automatically — featured pieces
        first, then the full collection.
      </p>

      <Divider subtle className="my-8" />

      <div className="grid gap-4 sm:grid-cols-3">
        {["Thumbnail", "Title & category", "Optional case study"].map(
          (item, index) => (
            <div
              key={item}
              className="rounded-[var(--radius-md)] border border-border-subtle bg-bg/40 px-4 py-5"
            >
              <p className="text-label text-accent">
                {String(index + 1).padStart(2, "0")}
              </p>
              <p className="mt-3 text-body-sm text-text-secondary">{item}</p>
            </div>
          ),
        )}
      </div>
    </div>
  );
}
