/**
 * Services section content — edit here only.
 * Presentation reads from this file.
 */

export type Service = {
  id: string;
  number: string;
  title: string;
  shortDescription: string;
  description: string;
  deliverables: string[];
  category: string;
  featured?: boolean;
  /** Abstract visual tone for preview panel */
  visual: "amber" | "steel" | "smoke" | "ember" | "slate" | "sand";
};

export const servicesContent = {
  eyebrow: "Services",
  titleLines: ["Editing is more", "than cutting footage."],
  description:
    "Rhythm, emotion, and structure — the craft that turns raw footage into something people finish watching.",
  ctaEyebrow: "Next step",
  ctaTitle: "Have a project in mind?",
  ctaDescription:
    "Let’s turn the footage into something worth watching.",
  ctaLabel: "Start a Project",
  ctaHref: "#contact",
} as const;

export const services: Service[] = [
  {
    id: "video-editing",
    number: "01",
    title: "Video Editing",
    shortDescription: "Narrative-driven post-production",
    description:
      "Full-form edits shaped for clarity, pacing, and picture — from rough assembly to a polished final cut.",
    deliverables: [
      "Narrative structure & pacing",
      "Color refinement",
      "Sound design & mix",
      "Transitions & polish",
      "Export optimization",
    ],
    category: "Core",
    featured: true,
    visual: "amber",
  },
  {
    id: "youtube-editing",
    number: "02",
    title: "YouTube Editing",
    shortDescription: "Long-form built for retention",
    description:
      "Channel-ready edits that hold attention: hooks, chapter flow, captions, and pacing tuned for the platform.",
    deliverables: [
      "Hook & opening structure",
      "Retention-focused pacing",
      "Captions & on-screen text",
      "B-roll & visual support",
      "Thumbnail-ready frames",
    ],
    category: "Platform",
    visual: "steel",
  },
  {
    id: "short-form",
    number: "03",
    title: "Short-Form Editing",
    shortDescription: "Reels, Shorts & vertical cuts",
    description:
      "Tight vertical edits designed for the feed — fast hooks, clean captions, and motion that stops the scroll.",
    deliverables: [
      "Vertical framing & crop",
      "Hook-first pacing",
      "Kinetic captions",
      "Trend-aware transitions",
      "Platform-ready exports",
    ],
    category: "Platform",
    visual: "ember",
  },
  {
    id: "documentary",
    number: "04",
    title: "Documentary Editing",
    shortDescription: "Story first, always",
    description:
      "Longer-form storytelling with intentional rhythm — interviews, vérité, and archival woven into a clear narrative arc.",
    deliverables: [
      "Interview assembly",
      "Story arc & chaptering",
      "Natural pacing",
      "Music & atmosphere",
      "Picture & sound finish",
    ],
    category: "Narrative",
    visual: "smoke",
  },
  {
    id: "motion-graphics",
    number: "05",
    title: "Motion Graphics",
    shortDescription: "Type, graphics & visual accents",
    description:
      "Motion that supports the edit — titles, lower thirds, simple explainers, and graphic moments that feel native to the cut.",
    deliverables: [
      "Titles & lower thirds",
      "Simple explainers",
      "Logo / brand moments",
      "Kinetic type",
      "Seamless edit integration",
    ],
    category: "Design",
    visual: "slate",
  },
  {
    id: "social-media",
    number: "06",
    title: "Social Media Editing",
    shortDescription: "Multi-format content packs",
    description:
      "Consistent edits across platforms — cutdowns, captions, and format variants that stay on-brand without losing energy.",
    deliverables: [
      "Platform cutdowns",
      "Caption styles",
      "Aspect ratio variants",
      "Series consistency",
      "Delivery packages",
    ],
    category: "Platform",
    visual: "sand",
  },
];
