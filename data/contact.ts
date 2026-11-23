import { services } from "@/data/services";
import { siteConfig } from "@/data/site";

/**
 * Contact / inquiry content.
 * Set email and socials when ready — leave empty until real.
 */

export type SocialLink = {
  label: string;
  href: string;
};

export const contactContent = {
  eyebrow: "Contact",
  headlineLines: ["Let's make", "something", "worth watching."],
  accentFromLine: 1,
  description:
    "Tell me what you’re working on, what you need edited, and where the final piece should live — YouTube, documentary, short-form, social, commercial, or something in between.",
  formEyebrow: "Project inquiry",
  submitLabel: "Send Inquiry",
  submittingLabel: "Sending...",
  successTitle: "Message received",
  successBody:
    "Thanks for reaching out. Your project details have been noted. I’ll follow up when delivery is connected — or reply via email if listed.",
  errorTitle: "Something went wrong",
  errorBody:
    "Please try again. If it keeps failing, use email when available.",
  notConfiguredTitle: "Inquiry form is ready",
  notConfiguredBody:
    "Validation works. Connect a delivery endpoint to start receiving submissions. Prefer email for now if an address is listed.",
  preferEmailLabel: "Prefer email?",
  location: null as string | null,
  availability: null as string | null,
} as const;

/** Derived from Services — keep inquiry types in sync */
export const projectTypes = [
  ...services.map((service) => service.title),
  "Other",
] as const;

export const budgetRanges = [
  "Prefer to discuss",
  "Under $250",
  "$250–$500",
  "$500–$1,000",
  "$1,000+",
] as const;

/**
 * Only links with non-empty href are shown.
 * Add real profiles when available.
 */
export const socialLinks: SocialLink[] = [
  // { label: "Instagram", href: "https://instagram.com/..." },
  // { label: "LinkedIn", href: "https://linkedin.com/in/..." },
  // { label: "YouTube", href: "https://youtube.com/@..." },
];

export function getPublicEmail() {
  return siteConfig.email?.trim() || null;
}

export function getVisibleSocials() {
  return socialLinks.filter((link) => link.label && link.href);
}
