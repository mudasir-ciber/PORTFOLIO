import { buildPersonJsonLd } from "@/lib/seo";

/**
 * Person / Creative Professional structured data.
 * Only emits fields backed by real site config + visible socials.
 */
export function PersonJsonLd() {
  const data = buildPersonJsonLd();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
