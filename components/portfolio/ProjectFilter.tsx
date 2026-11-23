"use client";

import {
  getAvailableCategories,
  type Project,
  type ProjectCategoryFilter,
} from "@/data/projects";
import { cn } from "@/lib/utils";

type ProjectFilterProps = {
  projects: Project[];
  active: ProjectCategoryFilter;
  onChange: (category: ProjectCategoryFilter) => void;
};

export function ProjectFilter({
  projects,
  active,
  onChange,
}: ProjectFilterProps) {
  const categories = getAvailableCategories(projects);

  if (projects.length === 0) return null;

  return (
    <div
      className="flex flex-wrap items-center gap-2"
      role="tablist"
      aria-label="Filter projects by category"
    >
      {categories.map((category) => {
        const isActive = category === active;
        return (
          <button
            key={category}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(category)}
            className={cn(
              "rounded-pill border px-4 py-2 text-label transition-colors duration-[var(--duration-fast)] ease-[var(--ease-out)]",
              "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]",
              isActive
                ? "border-accent bg-accent text-accent-ink"
                : "border-border text-text-secondary hover:border-accent hover:text-accent",
            )}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
