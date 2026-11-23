import { cn } from "@/lib/utils";

type PlayButtonProps = {
  label?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
};

export function PlayButton({
  label = "Play",
  onClick,
  className,
  disabled,
}: PlayButtonProps) {
  return (
    <button
      type="button"
      className={cn("play-button", className)}
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        aria-hidden
      >
        <path d="M5 3.5v11l10-5.5L5 3.5Z" fill="currentColor" />
      </svg>
    </button>
  );
}
