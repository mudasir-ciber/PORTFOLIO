import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navigation";
import { SelectedWork } from "@/components/portfolio";
import { Showreel } from "@/components/showreel";

/**
 * PHASE 3 — Showreel + portfolio media foundation on the homepage.
 */
export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pb-[var(--space-11)]">
        <Hero />
        <Showreel />
        <SelectedWork />

        {/* Future section anchors */}
        <div id="services" className="h-px scroll-mt-24" aria-hidden />
        <div id="about" className="h-px scroll-mt-24" aria-hidden />
        <div id="process" className="h-px scroll-mt-24" aria-hidden />
        <div id="contact" className="h-px scroll-mt-24" aria-hidden />
      </main>
    </>
  );
}
