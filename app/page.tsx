import { About } from "@/components/about";
import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navigation";
import { SelectedWork } from "@/components/portfolio";
import { Process } from "@/components/process";
import { Services } from "@/components/services";
import { Showreel } from "@/components/showreel";

/**
 * Homepage through Phase 7 — hero through process.
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
        <About />
        <Process />

        {/* Future section anchors */}
        <div id="contact" className="h-px scroll-mt-24" aria-hidden />
      </main>
    </>
  );
}
