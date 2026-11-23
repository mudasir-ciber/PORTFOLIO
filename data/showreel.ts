/**
 * Showreel media config.
 *
 * Replace `video` + `poster` with real assets when ready:
 * - /public/videos/showreel.mp4
 * - /public/images/showreel-poster.jpg
 */
export const showreel = {
  id: "showreel",
  eyebrow: "Showreel",
  title: "The cut, in motion.",
  description:
    "A concentrated look at pacing, picture, and sound. The full reel lands here once the master is ready.",
  /** Set to e.g. "/videos/showreel.mp4" when available */
  video: null as string | null,
  /** Set to e.g. "/images/showreel-poster.jpg" when available */
  poster: null as string | null,
  ctaLabel: "Play Showreel",
  unavailableLabel: "Showreel coming soon",
} as const;
