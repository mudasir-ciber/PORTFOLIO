"use client";

import { ButtonLink } from "@/components/ui/ButtonLink";
import { navLinks, primaryCta } from "@/data/navigation";
import { transition } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useId, useRef } from "react";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const frame = window.requestAnimationFrame(() => {
      closeRef.current?.focus();
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.cancelAnimationFrame(frame);
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
      previouslyFocused.current?.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={transition.fast}
        >
          <button
            type="button"
            className="absolute inset-0 bg-bg/80 backdrop-blur-sm"
            aria-label="Close menu"
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="absolute inset-x-0 top-0 flex min-h-dvh flex-col bg-bg px-[var(--gutter)] pb-10 pt-6 border-b border-border"
            initial={{ y: -12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -8, opacity: 0 }}
            transition={transition.normal}
          >
            <div className="flex items-center justify-between">
              <p id={titleId} className="text-label text-text-muted">
                Menu
              </p>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                className={cn(
                  "inline-flex h-11 items-center justify-center rounded-pill border border-border px-4 text-label text-text",
                  "transition-colors duration-[var(--duration-fast)] ease-[var(--ease-out)]",
                  "hover:border-accent hover:text-accent",
                  "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]",
                )}
              >
                Close
              </button>
            </div>

            <nav aria-label="Mobile" className="mt-12 flex flex-1 flex-col">
              <ul className="flex flex-col gap-2">
                {navLinks.map((link, index) => (
                  <li key={link.href}>
                    <motion.a
                      href={link.href}
                      onClick={onClose}
                      className="block border-b border-border-subtle py-4 font-[family-name:var(--font-display)] text-[clamp(1.75rem,8vw,2.5rem)] font-semibold tracking-[-0.02em] text-text transition-colors hover:text-accent focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ ...transition.normal, delay: 0.05 * index }}
                    >
                      {link.label}
                    </motion.a>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-10">
                <ButtonLink
                  href={primaryCta.href}
                  onClick={onClose}
                  className="w-full"
                >
                  {primaryCta.label}
                </ButtonLink>
              </div>
            </nav>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
