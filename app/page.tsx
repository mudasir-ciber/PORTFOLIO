import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navigation";
import { SelectedWork } from "@/components/portfolio";
import { Services } from "@/components/services";
import { Showreel } from "@/components/showreel";

/**
 * Homepage through Phase 5 — hero, showreel, work, services.
 */
export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pb-[var(--space-11)]">
        <Hero />
        <Showreel />
        <SelectedWork />
        <Services />

        {/* Future section anchors */}
        <div id="about" className="h-px scroll-mt-24" aria-hidden />
        <div id="process" className="h-px scroll-mt-24" aria-hidden />
        <div id="contact" className="h-px scroll-mt-24" aria-hidden />
      </main>
    </>
  );
}
