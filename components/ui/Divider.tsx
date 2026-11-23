import { cn } from "@/lib/utils";

type DividerProps = {
  subtle?: boolean;
  className?: string;
};

export function Divider({ subtle = false, className }: DividerProps) {
  return (
    <hr
      className={cn(subtle ? "divider-subtle" : "divider", "border-0", className)}
    />
  );
}
