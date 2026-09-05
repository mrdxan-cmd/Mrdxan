import type { MetadataRoute } from "next";
import { services } from "@/content/services";
import { indexableProjects } from "@/content/projects";
import { absoluteUrl } from "@/lib/seo";

const lastModified = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/leistungen"), lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/projekte"), lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/ueber-uns"), lastModified, changeFrequency: "yearly", priority: 0.6 },
    { url: absoluteUrl("/kontakt"), lastModified, changeFrequency: "yearly", priority: 0.9 },
    { url: absoluteUrl("/faq"), lastModified, changeFrequency: "monthly", priority: 0.6 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
    url: absoluteUrl(`/leistungen/${s.slug}`),
    lastModified,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const projectRoutes: MetadataRoute.Sitemap = indexableProjects.map((p) => ({
    url: absoluteUrl(`/projekte/${p.slug}`),
    lastModified,
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes];
}
