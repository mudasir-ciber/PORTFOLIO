/**
 * Editing process / workflow content.
 * Edit steps here — UI reads from this file only.
 * Do not invent delivery promises or fake metrics.
 */

export type ProcessStep = {
  id: string;
  number: string;
  title: string;
  shortDescription: string;
  description: string;
  points: string[];
};

export const processContent = {
  eyebrow: "The process",
  microLabel: "From raw footage to final cut",
  titleLines: ["Good editing starts", "long before the", "final cut."],
  accentFromLine: 2,
  description:
    "A clear path from brief to delivery — structure, craft, and review so every sequence earns its place.",
  ctaEyebrow: "Ready when you are",
  ctaTitle: "Ready to turn the footage into something worth watching?",
  ctaDescription: "Share the goal, the footage, and the story — I’ll shape the rest.",
  ctaLabel: "Start a Project",
  ctaHref: "#contact",
} as const;

export const processSteps: ProcessStep[] = [
  {
    id: "brief",
    number: "01",
    title: "Brief",
    shortDescription: "Understand the project.",
    description:
      "Align on objective, audience, references, and what “done” looks like before a single cut.",
    points: [
      "Goals and audience",
      "References and tone",
      "Footage and deliverables",
    ],
  },
  {
    id: "structure",
    number: "02",
    title: "Structure",
    shortDescription: "Find the story.",
    description:
      "Review the material, pull selects, and map narrative flow so pacing has a backbone.",
    points: [
      "Footage review",
      "Selects and story beats",
      "Sequence structure",
    ],
  },
  {
    id: "edit",
    number: "03",
    title: "Edit",
    shortDescription: "Build the rhythm.",
    description:
      "Shape the cut through timing, picture, transitions, and sound until the sequence feels intentional.",
    points: [
      "Cuts and pacing",
      "Visual flow",
      "Sound and transitions",
    ],
  },
  {
    id: "refine",
    number: "04",
    title: "Refine",
    shortDescription: "Polish every detail.",
    description:
      "Tighten consistency — color, audio, timing, and small fixes that raise the overall finish.",
    points: [
      "Picture consistency",
      "Audio polish",
      "Timing and cleanup",
    ],
  },
  {
    id: "deliver",
    number: "05",
    title: "Deliver",
    shortDescription: "Prepare the final cut.",
    description:
      "Final review, required exports, and clean handoff of the finished files.",
    points: [
      "Final review",
      "Export and formats",
      "Delivery package",
    ],
  },
];
