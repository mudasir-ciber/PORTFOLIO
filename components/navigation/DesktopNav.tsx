import { navLinks } from "@/data/navigation";
import { cn } from "@/lib/utils";

type DesktopNavProps = {
  className?: string;
};

export function DesktopNav({ className }: DesktopNavProps) {
  return (
    <nav aria-label="Primary" className={cn("hidden lg:block", className)}>
      <ul className="flex items-center gap-8">
        {navLinks.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="text-label text-text-secondary transition-colors duration-[var(--duration-fast)] ease-[var(--ease-out)] hover:text-text focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)] rounded-sm"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
