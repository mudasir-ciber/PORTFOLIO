"use client";

import { ServicePreview } from "@/components/services/ServicePreview";
import type { Service } from "@/data/services";
import { transition } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";

type ServiceItemProps = {
  service: Service;
  open: boolean;
  onToggle: () => void;
  highlighted: boolean;
  onHighlight: (active: boolean) => void;
};

export function ServiceItem({
  service,
  open,
  onToggle,
  highlighted,
  onHighlight,
}: ServiceItemProps) {
  const panelId = `service-panel-${service.id}`;
  const buttonId = `service-trigger-${service.id}`;

  return (
    <div
      className={cn(
        "border-b border-border-subtle transition-colors duration-[var(--duration-normal)] ease-[var(--ease-out)]",
        (open || highlighted) && "border-border",
      )}
      onMouseEnter={() => onHighlight(true)}
      onMouseLeave={() => onHighlight(false)}
    >
      <button
        id={buttonId}
        type="button"
        className={cn(
          "grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-4 py-6 text-left sm:gap-6 sm:py-7 lg:grid-cols-[4.5rem_minmax(0,1fr)_minmax(12rem,18rem)_auto] lg:items-center",
          "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)] rounded-sm",
        )}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
      >
        <span className="text-label pt-1 text-text-muted tabular-nums lg:pt-0">
          {service.number}
        </span>

        <span className="min-w-0">
          <span
            className={cn(
              "block font-[family-name:var(--font-display)] text-[clamp(1.35rem,2.8vw,2rem)] font-semibold tracking-[-0.03em] transition-[color,transform] duration-[var(--duration-fast)] ease-[var(--ease-out)]",
              open || highlighted ? "text-accent translate-x-0.5" : "text-text",
            )}
          >
            {service.title}
          </span>
          <span className="mt-2 block text-body-sm text-text-secondary lg:hidden">
            {service.shortDescription}
          </span>
        </span>

        <span
          className={cn(
            "hidden text-body-sm transition-colors duration-[var(--duration-fast)] lg:block",
            open || highlighted ? "text-text" : "text-text-secondary",
          )}
        >
          {service.shortDescription}
        </span>

        <span
          className={cn(
            "mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-pill border border-border text-text-secondary transition-all duration-[var(--duration-fast)] ease-[var(--ease-out)] lg:mt-0",
            (open || highlighted) && "border-accent text-accent",
            open && "rotate-45",
          )}
          aria-hidden
        >
          →
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
            <div className="grid gap-6 pb-8 lg:grid-cols-[4.5rem_minmax(0,1fr)_minmax(14rem,20rem)] lg:gap-8">
              <div className="hidden lg:block" aria-hidden />

              <div className="max-w-2xl">
                <p className="text-body-lg">{service.description}</p>
                <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                  {service.deliverables.map((item) => (
                    <li
                      key={item}
                      className="border-l border-border pl-3 text-body-sm text-text-secondary"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <ServicePreview service={service} active className="w-full" />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
