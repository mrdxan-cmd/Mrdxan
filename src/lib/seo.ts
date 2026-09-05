import type { Metadata } from "next";
import { getSiteUrl, site } from "@/content/site";

interface PageMetaInput {
  title: string;
  description: string;
  /** Path starting with "/" */
  path: string;
  /** Prevent indexing (e.g. legal pages or placeholder content) */
  noIndex?: boolean;
  /** Override OG image path */
  image?: string;
  type?: "website" | "article";
}

export function absoluteUrl(path: string): string {
  const base = getSiteUrl();
  if (path === "/") return `${base}/`;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Builds consistent page metadata: canonical URL, Open Graph, Twitter and robots.
 * Title template is applied by the root layout.
 */
export function pageMetadata({ title, description, path, noIndex, image, type = "website" }: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  const ogImage = image ?? site.ogImage;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      locale: "de_CH",
      type,
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${site.name} – ${site.tagline}` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: noIndex ? { index: false, follow: true } : { index: true, follow: true },
  };
}
