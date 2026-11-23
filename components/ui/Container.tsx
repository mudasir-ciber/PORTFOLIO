import { cn } from "@/lib/utils";
import type { ElementType, ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  wide?: boolean;
  as?: ElementType;
};

export function Container({
  children,
  className,
  wide = false,
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag className={cn(wide ? "container-wide" : "container", className)}>
      {children}
    </Tag>
  );
}
