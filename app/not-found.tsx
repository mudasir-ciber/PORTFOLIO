import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/data/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

/**
 * Minimal premium 404 — same visual language as the portfolio.
 */
export default function NotFound() {
  return (
    <main className="flex min-h-[100svh] flex-col justify-center py-[var(--section-y)]">
      <Container>
        <p className="text-label text-text-muted">404</p>
        <h1 className="text-hero mt-4 max-w-2xl">
          This frame
          <span className="block text-accent">is missing.</span>
        </h1>
        <p className="text-body-lg mt-5 max-w-md">
          {`The page you asked for is not part of ${siteConfig.name}'s portfolio. Head back to the cut that is.`}
        </p>
        <div className="mt-8">
          <ButtonLink href="/" size="lg" className="group">
            Return home
            <span
              aria-hidden
              className="inline-block transition-transform duration-[var(--duration-fast)] ease-[var(--ease-out)] group-hover:translate-x-1"
            >
              →
            </span>
          </ButtonLink>
        </div>
      </Container>
    </main>
  );
}
