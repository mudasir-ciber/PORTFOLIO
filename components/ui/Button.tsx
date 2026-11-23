import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  className?: string;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: [
    "bg-accent text-accent-ink",
    "hover:bg-accent-hover",
    "active:scale-[0.98]",
    "disabled:opacity-40 disabled:pointer-events-none disabled:active:scale-100",
  ].join(" "),
  secondary: [
    "bg-transparent text-text border border-border",
    "hover:border-accent hover:text-accent",
    "active:scale-[0.98]",
    "disabled:opacity-40 disabled:pointer-events-none disabled:active:scale-100",
  ].join(" "),
  ghost: [
    "bg-transparent text-text-secondary px-0",
    "hover:text-accent",
    "active:opacity-80",
    "disabled:opacity-40 disabled:pointer-events-none",
  ].join(" "),
};

const sizeClasses: Record<ButtonSize, string> = {
  md: "h-11 px-6 text-[length:var(--text-button)]",
  lg: "h-12 px-7 text-[length:var(--text-button)]",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-pill font-medium tracking-wide",
        "transition-[color,background-color,border-color,transform,opacity] duration-[var(--duration-fast)] ease-[var(--ease-out)]",
        "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]",
        variant !== "ghost" && sizeClasses[size],
        variant === "ghost" && "min-h-11",
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
