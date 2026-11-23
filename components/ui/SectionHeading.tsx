import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  align = "left",
}: SectionHeadingProps) {
  return (
    <header
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? <p className="text-label">{eyebrow}</p> : null}
      <h2 className="text-h2 text-text max-w-[18ch]">{title}</h2>
      {description ? (
        <p className="text-body-lg max-w-xl">{description}</p>
      ) : null}
    </header>
  );
}
