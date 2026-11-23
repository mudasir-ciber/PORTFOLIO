import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  ariaLabel?: string;
};

export function Section({ children, className, id, ariaLabel }: SectionProps) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={cn("section", className)}
    >
      {children}
    </section>
  );
}
