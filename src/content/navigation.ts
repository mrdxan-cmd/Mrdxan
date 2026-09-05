import { services } from "./services";

export interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string; description?: string }[];
}

/** Main navigation – order follows the mockup (Startseite · Leistungen · Projekte · Über uns · Kontakt). */
export const mainNavigation: NavItem[] = [
  { label: "Startseite", href: "/" },
  {
    label: "Leistungen",
    href: "/leistungen",
    children: services.map((s) => ({
      label: s.label,
      href: `/leistungen/${s.slug}`,
      description: s.teaser,
    })),
  },
  { label: "Projekte", href: "/projekte" },
  { label: "Über uns", href: "/ueber-uns" },
  { label: "Kontakt", href: "/kontakt" },
];

export const footerNavigation = {
  seiten: [
    { label: "Startseite", href: "/" },
    { label: "Leistungen", href: "/leistungen" },
    { label: "Projekte", href: "/projekte" },
    { label: "Über uns", href: "/ueber-uns" },
    { label: "FAQ", href: "/faq" },
    { label: "Kontakt", href: "/kontakt" },
  ],
  leistungen: services.map((s) => ({ label: s.label, href: `/leistungen/${s.slug}` })),
  rechtliches: [
    { label: "Impressum", href: "/impressum" },
    { label: "Datenschutz", href: "/datenschutz" },
  ],
};
