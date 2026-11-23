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
    <div className="relative max-w-full">
      <div
        className="flex max-w-full items-center gap-1 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
                "shrink-0 rounded-sm px-3 py-2 text-label transition-colors duration-[var(--duration-fast)] ease-[var(--ease-out)]",
                "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]",
                isActive
                  ? "text-accent"
                  : "text-text-muted hover:text-text",
              )}
            >
              <span
                className={cn(
                  "border-b pb-1 transition-[border-color,color]",
                  isActive
                    ? "border-accent"
                    : "border-transparent",
                )}
              >
                {category === "Motion Graphics" ? "Motion" : category}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
