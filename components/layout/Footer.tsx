"use client";

import { SocialLinks } from "@/components/contact/SocialLinks";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { getPublicEmail, getVisibleSocials } from "@/data/contact";
import { footerContent } from "@/data/footer";
import { footerNavLinks } from "@/data/navigation";
import { transition } from "@/lib/motion";
import { motion } from "motion/react";

export function Footer() {
  const email = getPublicEmail();
  const socials = getVisibleSocials();

  return (
    <footer className="relative mt-auto border-t border-border-subtle">
      <Container className="py-[var(--section-y)]">
        <div className="max-w-3xl">
          <motion.p
            className="text-label mb-4 text-text-muted"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={transition.normal}
          >
            {footerContent.eyebrow}
          </motion.p>

          <h2 className="text-hero">
            {footerContent.headlineLines.map((line, index) => {
              const isAccent = index >= footerContent.accentFromLine;
              return (
                <span
                  key={`${line}-${index}`}
                  className="block overflow-hidden pb-[0.04em]"
                >
                  <motion.span
                    className="block"
                    initial={{ y: "110%", opacity: 0 }}
                    whileInView={{ y: "0%", opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      ...transition.cinematic,
                      delay: 0.08 * index,
                    }}
                  >
                    {isAccent ? (
                      <span className="text-accent">{line}</span>
                    ) : (
                      line
                    )}
                  </motion.span>
                </span>
              );
            })}
          </h2>

          <Reveal delay={0.12}>
            <div className="mt-8">
              <ButtonLink
                href={footerContent.ctaHref}
                size="lg"
                aria-label="Start a project — go to contact"
                className="group"
              >
                {footerContent.ctaLabel}
                <span
                  aria-hidden
                  className="inline-block transition-transform duration-[var(--duration-fast)] ease-[var(--ease-out)] group-hover:translate-x-1"
                >
                  →
                </span>
              </ButtonLink>
            </div>
          </Reveal>
        </div>

        <div className="mt-14 border-t border-border-subtle pt-10 md:mt-16 md:pt-12">
          <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-[1.2fr_1fr_1fr] md:gap-8">
            <div>
              <p className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-[-0.02em] text-text">
                {footerContent.brandName}
              </p>
              <p className="mt-2 text-label text-text-muted">
                {footerContent.brandRole}
              </p>
              {email ? (
                <a
                  href={`mailto:${email}`}
                  className="mt-4 inline-block text-body-sm text-text-secondary transition-colors hover:text-accent focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)] rounded-sm"
                >
                  {email}
                </a>
              ) : null}
            </div>

            <nav aria-label="Footer">
              <p className="text-label text-text-muted">Navigation</p>
              <ul className="mt-4 flex flex-col gap-2">
                {footerNavLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-body-sm text-text-secondary transition-colors hover:text-accent focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)] rounded-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <p className="text-label text-text-muted">Social</p>
              <div className="mt-4">
                {socials.length > 0 ? (
                  <SocialLinks />
                ) : (
                  <p className="text-body-sm text-text-muted">
                    Profiles appear here when linked in contact config.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-border-subtle pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-label text-text-muted">
            © {footerContent.copyrightYear} {footerContent.copyrightName}
          </p>
          <p className="text-label text-text-muted">All rights reserved.</p>
        </div>
      </Container>

      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px overflow-hidden"
        aria-hidden
      >
        <div className="mx-auto h-px w-1/3 bg-accent/40" />
      </div>
    </footer>
  );
}
