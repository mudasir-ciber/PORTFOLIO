import { budgetRanges, projectTypes } from "@/data/contact";

export type ProjectInquiry = {
  name: string;
  email: string;
  projectType: string;
  budget?: string;
  details: string;
  projectLink?: string;
  /** Honeypot — must stay empty */
  website?: string;
};

export type InquiryFieldErrors = Partial<
  Record<keyof ProjectInquiry, string>
>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function validateInquiry(
  data: ProjectInquiry,
): { ok: true } | { ok: false; errors: InquiryFieldErrors } {
  const errors: InquiryFieldErrors = {};

  if (!data.name.trim()) {
    errors.name = "Please enter your name.";
  }

  if (!data.email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!emailPattern.test(data.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (!data.projectType.trim()) {
    errors.projectType = "Please select a project type.";
  } else if (
    !projectTypes.includes(
      data.projectType as (typeof projectTypes)[number],
    )
  ) {
    errors.projectType = "Please choose a valid project type.";
  }

  if (!data.details.trim() || data.details.trim().length < 20) {
    errors.details = "Please share a bit more about the project.";
  }

  if (data.budget && data.budget.trim()) {
    if (
      !budgetRanges.includes(data.budget as (typeof budgetRanges)[number])
    ) {
      errors.budget = "Please choose a valid budget range.";
    }
  }

  if (data.projectLink?.trim() && !isValidUrl(data.projectLink.trim())) {
    errors.projectLink = "Please enter a valid URL.";
  }

  if (data.website?.trim()) {
    errors.website = "Spam detected.";
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return { ok: true };
}

export function normalizeInquiry(data: ProjectInquiry): ProjectInquiry {
  return {
    name: data.name.trim(),
    email: data.email.trim().toLowerCase(),
    projectType: data.projectType.trim(),
    budget: data.budget?.trim() || undefined,
    details: data.details.trim(),
    projectLink: data.projectLink?.trim() || undefined,
    website: data.website?.trim() || "",
  };
}
