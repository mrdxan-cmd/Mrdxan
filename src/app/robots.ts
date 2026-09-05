import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
import { getSiteUrl, site } from "@/content/site";

/**
 * Preview / staging deployments must NOT be indexed. Only the production
 * domain (or NEXT_PUBLIC_ALLOW_INDEXING=true) allows crawling.
 */
export default function robots(): MetadataRoute.Robots {
  const isProductionDomain = getSiteUrl() === site.productionUrl && process.env.VERCEL_ENV !== "preview";
  const allowIndexing = isProductionDomain || process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";

  if (!allowIndexing) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: getSiteUrl(),
  };
}
