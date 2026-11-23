import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Aspect = "16x9" | "4x5" | "9x16" | "square" | "cinema";

type MediaFrameProps = {
  children: ReactNode;
  aspect?: Aspect;
  className?: string;
  hoverZoom?: boolean;
};

const aspectClass: Record<Aspect, string> = {
  "16x9": "media-frame--16x9",
  "4x5": "media-frame--4x5",
  "9x16": "media-frame--9x16",
  square: "media-frame--square",
  cinema: "media-frame--cinema",
};

export function MediaFrame({
  children,
  aspect = "16x9",
  className,
  hoverZoom = true,
}: MediaFrameProps) {
  return (
    <div
      className={cn(
        "media-frame",
        aspectClass[aspect],
        hoverZoom && "group",
        className,
      )}
    >
      <div className={cn(hoverZoom && "media-hover h-full w-full")}>
        {children}
      </div>
    </div>
  );
}
