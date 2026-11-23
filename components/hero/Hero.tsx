import { Container } from "@/components/ui/Container";
import { HeroContent } from "@/components/hero/HeroContent";
import { HeroVisual } from "@/components/hero/HeroVisual";
import { ScrollIndicator } from "@/components/hero/ScrollIndicator";

export function Hero() {
  return (
    <section
      id="top"
      aria-label="Introduction"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-[5.5rem] pb-16 md:pb-20 lg:pt-24"
    >
      <Container className="relative w-full">
        <div className="grid items-center gap-10 md:gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-14 xl:gap-16">
          <HeroContent />
          <HeroVisual />
        </div>
      </Container>

      <ScrollIndicator />
    </section>
  );
}
