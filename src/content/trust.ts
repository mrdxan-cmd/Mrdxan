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
