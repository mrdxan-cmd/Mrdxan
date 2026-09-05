import { services } from "./services";

export interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string; description?: string }[];
}

export const mainNavigation: NavItem[] = [
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
  { label: "FAQ", href: "/faq" },
  { label: "Kontakt", href: "/kontakt" },
];

export const footerNavigation = {
  leistungen: services.map((s) => ({ label: s.label, href: `/leistungen/${s.slug}` })),
  unternehmen: [
    { label: "Über uns", href: "/ueber-uns" },
    { label: "Projekte", href: "/projekte" },
    { label: "FAQ", href: "/faq" },
    { label: "Kontakt & Offerte", href: "/kontakt" },
  ],
  rechtliches: [
    { label: "Impressum", href: "/impressum" },
    { label: "Datenschutz", href: "/datenschutz" },
  ],
};
