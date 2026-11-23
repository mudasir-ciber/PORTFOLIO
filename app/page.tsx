import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Hero } from "@/components/hero";
import { Footer } from "@/components/layout";
import { Navbar } from "@/components/navigation";
import { SelectedWork } from "@/components/portfolio";
import { Process } from "@/components/process";
import { Services } from "@/components/services";
import { Showreel } from "@/components/showreel";

/**
 * Homepage — narrative through footer.
 */
export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Showreel />
        <SelectedWork />
        <Services />
        <About />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
