/**
 * Trust indicators / USPs shown on the homepage and service pages.
 * VERIFY numbers (years of experience, projects) against real figures before go-live.
 */
export type TrustIcon = "shield" | "clock" | "sparkles" | "handshake" | "map" | "leaf";

export interface TrustItem {
  icon: TrustIcon;
  title: string;
  text: string;
}

export const trustItems: TrustItem[] = [
  {
    icon: "shield",
    title: "Meisterhafte Qualität",
    text: "Sorgfältige Untergrundvorbereitung und hochwertige Materialien – für Resultate, die Jahre halten.",
  },
  {
    icon: "clock",
    title: "Termintreu & zuverlässig",
    text: "Was wir zusagen, halten wir: klare Terminplanung und ein fester Ansprechpartner für Ihr Projekt.",
  },
  {
    icon: "handshake",
    title: "Faire, transparente Offerten",
    text: "Kostenlose Besichtigung und eine Offerte ohne versteckte Kosten – Sie wissen von Anfang an, woran Sie sind.",
  },
  {
    icon: "sparkles",
    title: "Sauber & rücksichtsvoll",
    text: "Wir schützen Ihre Einrichtung, arbeiten staubarm und übergeben die Räume besenrein.",
  },
  {
    icon: "map",
    title: "Regional verwurzelt",
    text: "Ihr Malergeschäft aus Näfels – kurze Wege im ganzen Glarnerland und in der Region.",
  },
  {
    icon: "leaf",
    title: "Wohngesunde Produkte",
    text: "Emissionsarme Farben für Innenräume, in denen Sie sich sofort wieder wohlfühlen.",
  },
];

/**
 * Hero highlights (mockup: "5 Jahre Garantie", "12+ Jahre Erfahrung", "Schnelle Rückmeldung").
 * Claims that are facts about the business (guarantee, years) are NOT shown until the owner
 * confirms them – set `verified: true` after checking. Unverified items are never rendered.
 */
export type HighlightIcon = "shield" | "users" | "bolt" | "check" | "sparkles";
export interface Highlight {
  icon: HighlightIcon;
  label: string;
  verified: boolean;
}
export const heroHighlights: Highlight[] = [
  { icon: "shield", label: "5 Jahre Garantie", verified: false }, // VERIFY – from mockup
  { icon: "users", label: "12+ Jahre Erfahrung", verified: false }, // VERIFY – from mockup
  { icon: "bolt", label: "Schnelle Rückmeldung", verified: true },
  { icon: "check", label: "Kostenlose Offerte", verified: true },
  { icon: "sparkles", label: "Sauber & termintreu", verified: true },
];
export const visibleHighlights = heroHighlights.filter((h) => h.verified).slice(0, 3);

/** Footer claim (mockup: "Qualität. Farbe. Vertrauen. Seit über 12 Jahren.") – years part hidden until verified. */
export const footerClaim = "Qualität. Farbe. Vertrauen.";
export const footerClaimSuffix: string | null = null; // e.g. "Seit über 12 Jahren." once verified

/** Key figures – set `value` to null to hide a stat until the real number is confirmed. VERIFY */
export interface Stat {
  value: string | null;
  label: string;
}

export const stats: Stat[] = [
  { value: null, label: "Jahre Erfahrung" },
  { value: null, label: "abgeschlossene Projekte" },
  { value: "100%", label: "regionale Handwerksqualität" },
  { value: "24h", label: "Antwort auf Ihre Anfrage" },
];

export const visibleStats = stats.filter((s): s is Stat & { value: string } => s.value !== null);
