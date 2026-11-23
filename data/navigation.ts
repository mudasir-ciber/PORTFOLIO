export const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Process", href: "#process" },
] as const;

/** Footer includes Contact — navbar uses primaryCta for that destination */
export const footerNavLinks = [
  ...navLinks,
  { label: "Contact", href: "#contact" },
] as const;

export const primaryCta = {
  label: "Let's Work Together",
  href: "#contact",
} as const;

export const heroContent = {
  eyebrow: "Freelance Video Editor",
  headlineLines: ["Editing stories", "that demand", "attention."],
  description:
    "I craft YouTube, short-form, and branded edits with cinematic pacing, clean picture, and intentional sound.",
  primaryCta: {
    label: "View My Work",
    href: "#work",
  },
  secondaryCta: {
    label: "Let's Work Together",
    href: "#contact",
  },
} as const;
