import { getVisibleSocials } from "@/data/contact";
import { cn } from "@/lib/utils";

type SocialLinksProps = {
  className?: string;
};

export function SocialLinks({ className }: SocialLinksProps) {
  const links = getVisibleSocials();
  if (links.length === 0) return null;

  return (
    <ul className={cn("flex flex-wrap gap-3", className)}>
      {links.map((link) => (
        <li key={link.href}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-label text-text-secondary transition-colors hover:text-accent focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)] rounded-sm"
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
