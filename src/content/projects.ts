/**
 * Reference projects.
 *
 * IMPORTANT – real content only:
 * The photographs and project descriptions on https://www.maler-gl.ch are the
 * source of truth. They could not be downloaded from the build environment.
 *
 * Workflow to import them (see docs/MIGRATION.md → "Projekte & Bilder"):
 *   1. `node scripts/crawl-live-site.mjs` on a machine with internet access
 *      → downloads every image from the live site into public/images/imported/
 *   2. Move the relevant photos to public/images/projects/<slug>/ and describe
 *      each project below with `placeholder: false`.
 *
 * Entries with `placeholder: true` are SAMPLE structures only. They are
 * rendered with a visible "Beispiel" badge, are excluded from the sitemap and
 * are hidden entirely in production unless NEXT_PUBLIC_SHOW_PLACEHOLDERS=true.
 * No AI-generated images are used – placeholders render a neutral graphic.
 */

import type { Service } from "./services";

export interface ProjectImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Project {
  slug: string;
  title: string;
  /** Short location, e.g. "Näfels GL" */
  location: string;
  /** Year or period of execution */
  year?: string;
  /** Related service slugs */
  services: Service["slug"][];
  /** Short teaser for cards */
  teaser: string;
  /** Description paragraphs */
  description: string[];
  /** Work performed */
  scope: string[];
  /** Cover image – optional until real photos are imported */
  cover?: ProjectImage;
  /** Gallery images */
  gallery?: ProjectImage[];
  /** Sample entry – replace with a real reference before go-live */
  placeholder: boolean;
}

export const projects: Project[] = [
  {
    slug: "fassadenrenovation-einfamilienhaus",
    title: "Fassadenrenovation Einfamilienhaus",
    location: "Glarus Nord",
    year: "2024",
    services: ["fassaden", "gipserarbeiten"],
    teaser: "Putzsanierung und zweischichtiger Silikonharz-Anstrich an einem Einfamilienhaus.",
    description: [
      "BEISPIELPROJEKT – Struktur für eine reale Referenz. Beschreiben Sie hier Ausgangslage, Ziel und Resultat des Projekts in zwei bis drei Absätzen.",
    ],
    scope: ["Fassadenreinigung", "Risssanierung", "Grundierung", "Zweischichtiger Fassadenanstrich"],
    placeholder: true,
  },
  {
    slug: "wohnungsrenovation-mieterwechsel",
    title: "Wohnungsrenovation bei Mieterwechsel",
    location: "Näfels GL",
    year: "2024",
    services: ["malerarbeiten"],
    teaser: "Wände und Decken einer 4.5-Zimmer-Wohnung frisch gestrichen, Türen und Rahmen lackiert.",
    description: [
      "BEISPIELPROJEKT – Struktur für eine reale Referenz. Beschreiben Sie hier Ausgangslage, Ziel und Resultat des Projekts in zwei bis drei Absätzen.",
    ],
    scope: ["Abdecken und Schützen", "Spachteln und Schleifen", "Wand- und Deckenanstrich", "Lackierung Türen"],
    placeholder: true,
  },
  {
    slug: "neubau-mehrfamilienhaus",
    title: "Gipser- und Malerarbeiten Neubau Mehrfamilienhaus",
    location: "Linthgebiet",
    year: "2023",
    services: ["neubau-renovation", "gipserarbeiten", "malerarbeiten"],
    teaser: "Weissputz, Deckenspachtelungen und Anstriche in sechs Wohnungen – termingerecht zur Übergabe.",
    description: [
      "BEISPIELPROJEKT – Struktur für eine reale Referenz. Beschreiben Sie hier Ausgangslage, Ziel und Resultat des Projekts in zwei bis drei Absätzen.",
    ],
    scope: ["Innenputz Q3", "Deckenspachtelungen", "Wand- und Deckenanstriche", "Koordination mit Bauleitung"],
    placeholder: true,
  },
];

const showPlaceholders =
  process.env.NODE_ENV !== "production" || process.env.NEXT_PUBLIC_SHOW_PLACEHOLDERS === "true";

/** Projects that may be displayed in the current environment. */
export const visibleProjects: Project[] = projects.filter((p) => !p.placeholder || showPlaceholders);

/** Projects that should be indexed by search engines (never placeholders). */
export const indexableProjects: Project[] = projects.filter((p) => !p.placeholder);

export function getProject(slug: string): Project | undefined {
  return visibleProjects.find((p) => p.slug === slug);
}
