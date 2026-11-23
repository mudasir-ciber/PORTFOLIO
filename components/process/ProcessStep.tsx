"use client";

import type { ProcessStep as ProcessStepData } from "@/data/process";
import { transition } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";

type ProcessStepProps = {
  step: ProcessStepData;
  open: boolean;
  onToggle: () => void;
  active: boolean;
  onActivate: (active: boolean) => void;
  isLast: boolean;
};

export function ProcessStepItem({
  step,
  open,
  onToggle,
  active,
  onActivate,
  isLast,
}: ProcessStepProps) {
  const panelId = `process-panel-${step.id}`;
  const buttonId = `process-trigger-${step.id}`;
  const emphasized = open || active;

  return (
    <div
      className="relative grid grid-cols-[2.5rem_minmax(0,1fr)] gap-4 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-6"
      onMouseEnter={() => onActivate(true)}
      onMouseLeave={() => onActivate(false)}
    >
      {/* Vertical progress rail */}
      <div className="relative flex flex-col items-center">
        <span
          className={cn(
            "relative z-10 flex h-8 w-8 items-center justify-center rounded-pill border text-label tabular-nums transition-colors duration-[var(--duration-fast)]",
            emphasized
              ? "border-accent bg-accent text-accent-ink"
              : "border-border bg-bg text-text-muted",
          )}
          aria-hidden
        >
          {step.number}
        </span>
        {!isLast ? (
          <span
            className={cn(
              "mt-1 w-px flex-1 min-h-[2.5rem] transition-colors duration-[var(--duration-normal)]",
              emphasized ? "bg-accent/50" : "bg-border-subtle",
            )}
            aria-hidden
          />
        ) : null}
      </div>

      <div
        className={cn(
          "border-b border-border-subtle pb-6 transition-opacity duration-[var(--duration-normal)]",
          !emphasized && "opacity-70",
          emphasized && "opacity-100 border-border",
        )}
      >
        <button
          id={buttonId}
          type="button"
          className="flex w-full items-start justify-between gap-4 text-left focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)] rounded-sm"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
        >
          <span>
            <span
              className={cn(
                "block font-[family-name:var(--font-display)] text-[clamp(1.35rem,2.5vw,1.85rem)] font-semibold tracking-[-0.03em] transition-[color,transform] duration-[var(--duration-fast)] ease-[var(--ease-out)]",
                emphasized ? "text-accent translate-x-0.5" : "text-text",
              )}
            >
              {step.title}
            </span>
            <span className="mt-2 block text-body-sm text-text-secondary">
              {step.shortDescription}
            </span>
          </span>

          <span
            className={cn(
              "mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-pill border text-label transition-all duration-[var(--duration-fast)]",
              emphasized
                ? "border-accent text-accent"
                : "border-border text-text-muted",
              open && "rotate-45",
            )}
            aria-hidden
          >
            +
          </span>
        </button>

        <AnimatePresence initial={false}>
          {open ? (
            <motion.div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={transition.normal}
              className="overflow-hidden"
            >
              <div className="pt-5">
                <p className="max-w-2xl text-body-lg">{step.description}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {step.points.map((point) => (
                    <li
                      key={point}
                      className="rounded-pill border border-border-subtle px-3 py-1.5 text-label text-text-secondary"
                    >
                      {point}
                    </li>
                  ))}
                </ul>

                {/* Abstract timeline cue */}
                <div
                  className="mt-6 h-10 overflow-hidden rounded-[var(--radius-md)] border border-border-subtle"
                  aria-hidden
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(196,165,116,0.08), transparent 40%), linear-gradient(180deg, #121214, #0a0a0b)",
                  }}
                >
                  <div className="flex h-full items-center gap-2 px-3">
                    <span className="h-1.5 w-1.5 rounded-pill bg-accent" />
                    <span className="h-px flex-1 bg-border" />
                    <span className="text-label text-text-muted tabular-nums">
                      {step.number}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
