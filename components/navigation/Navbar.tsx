"use client";

import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { DesktopNav } from "@/components/navigation/DesktopNav";
import { MobileMenu } from "@/components/navigation/MobileMenu";
import { primaryCta } from "@/data/navigation";
import { siteConfig } from "@/data/site";
import { transition } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (value) => {
    setScrolled(value > 24);
  });

  return (
    <>
      <motion.header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,backdrop-filter,padding] duration-[var(--duration-normal)] ease-[var(--ease-out)]",
          scrolled
            ? "border-b border-border bg-bg/80 py-3 backdrop-blur-md"
            : "border-b border-transparent bg-transparent py-5",
        )}
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={transition.normal}
      >
        <Container className="flex items-center justify-between gap-6">
          <a
            href="#top"
            className="group relative z-10 flex items-baseline gap-2 focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)] rounded-sm"
          >
            <span className="font-[family-name:var(--font-display)] text-[1.05rem] font-semibold tracking-[-0.02em] text-text transition-colors group-hover:text-accent">
              {siteConfig.name}
            </span>
            <span className="hidden text-label text-text-muted sm:inline">
              Editor
            </span>
          </a>

          <DesktopNav />

          <div className="flex items-center gap-3">
            <ButtonLink
              href={primaryCta.href}
              className="max-md:hidden"
              size="md"
            >
              {primaryCta.label}
            </ButtonLink>

            <button
              type="button"
              className={cn(
                "inline-flex h-11 items-center justify-center rounded-pill border border-border px-4 text-label text-text lg:hidden",
                "transition-colors duration-[var(--duration-fast)] ease-[var(--ease-out)]",
                "hover:border-accent hover:text-accent",
                "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]",
              )}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen(true)}
            >
              Menu
            </button>
          </div>
        </Container>
      </motion.header>

      <div id="mobile-menu">
        <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      </div>
    </>
  );
}
