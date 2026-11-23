/**
 * About / professional identity content.
 * Edit this file to update biography, philosophy, and media.
 * Do not invent unverified credentials or achievements here.
 */

export type PhilosophyItem = {
  number: string;
  title: string;
  description: string;
};

export const aboutContent = {
  eyebrow: "About",
  headlineLines: ["I do not just", "edit footage.", "I shape how", "a story is felt."],
  /** Accent starts at this headline line index (0-based) */
  accentFromLine: 2,
  intro:
    "I am a video editor focused on turning raw footage into clear, engaging visual stories — cuts where pacing, picture, and sound work as one.",
  body:
    "My approach is intentional: structure first, then rhythm, then the details that make a sequence feel finished. Every edit should earn its place.",
  role: "Independent Video Editor",
  specialization: "Visual storytelling & post-production",
  /** Set when you want a public location line, e.g. "Based in Pakistan · Working globally" */
  location: null as string | null,
  availability: "Available for selected projects",
  image: {
    /** e.g. "/images/about/portrait.jpg" — null keeps the abstract placeholder */
    src: null as string | null,
    alt: "Portrait placeholder — replace with a professional photo",
    caption: "Portrait / studio frame — add when ready",
    aspect: "portrait" as "portrait" | "video" | "square",
  },
  philosophy: [
    {
      number: "01",
      title: "Story",
      description: "Every cut should have a reason — clarity before decoration.",
    },
    {
      number: "02",
      title: "Rhythm",
      description: "Pacing decides how the audience feels a moment land.",
    },
    {
      number: "03",
      title: "Detail",
      description: "Sound, timing, and visual consistency finish the emotion.",
    },
  ] satisfies PhilosophyItem[],
  ctaEyebrow: "Next",
  ctaTitle: "Have something worth editing?",
  ctaDescription: "Let’s talk about the footage and the story you want people to feel.",
  ctaLabel: "Start a Project",
  ctaHref: "#contact",
} as const;
