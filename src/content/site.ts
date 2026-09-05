/**
 * Global site configuration.
 *
 * The production domain (www.maler-gl.ch) is only used for canonical URLs,
 * sitemap and structured data. It does NOT connect the domain – DNS and the
 * production switch happen manually after owner approval (see docs/MIGRATION.md).
 *
 * Preview deployments can override the base URL with NEXT_PUBLIC_SITE_URL.
 */
export const site = {
  name: "Maler Phönix",
  shortName: "Phönix",
  tagline: "Maler- und Gipserarbeiten im Glarnerland",
  /** Canonical production URL (future). */
  productionUrl: "https://www.maler-gl.ch",
  locale: "de-CH",
  language: "de",
  /** Default meta description used when a page does not define one. */
  defaultDescription:
    "Maler Phönix, Ihr Malergeschäft in Näfels: Malerarbeiten, Gipserarbeiten, Fassaden sowie Neubau & Renovation im Kanton Glarus. Jetzt Offerte anfragen.",
  /** Title template for sub pages. */
  titleTemplate: "%s | Maler Phönix Näfels",
  defaultTitle: "Maler Phönix – Malerarbeiten, Gipserarbeiten & Fassaden in Näfels GL",
  /** Default social sharing image (generated static asset). */
  ogImage: "/images/brand/og-default.png",
  themeColor: "#0d0c0a",
} as const;

/**
 * Base URL used at build time. Falls back to the future production URL so that
 * canonical tags and the sitemap are correct for the final domain.
 */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/+$/, "");
  // Vercel preview deployments expose VERCEL_URL without protocol.
  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel && process.env.VERCEL_ENV !== "production") return `https://${vercel}`;
  return site.productionUrl;
}
