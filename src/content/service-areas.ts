/**
 * Service areas (used for the "Einzugsgebiet" section, SEO copy and schema.org areaServed).
 * VERIFY against the live website / actual business coverage.
 */
export interface ServiceArea {
  name: string;
  /** Canton abbreviation */
  canton: "GL" | "SZ" | "SG";
  /** Highlighted (primary) areas are rendered first. */
  primary?: boolean;
}

export const serviceAreas: ServiceArea[] = [
  { name: "Näfels", canton: "GL", primary: true },
  { name: "Mollis", canton: "GL", primary: true },
  { name: "Niederurnen", canton: "GL", primary: true },
  { name: "Oberurnen", canton: "GL", primary: true },
  { name: "Netstal", canton: "GL", primary: true },
  { name: "Glarus", canton: "GL", primary: true },
  { name: "Bilten", canton: "GL" },
  { name: "Ziegelbrücke", canton: "GL" },
  { name: "Ennenda", canton: "GL" },
  { name: "Schwanden", canton: "GL" },
  { name: "Weesen", canton: "SG" },
  { name: "Uznach", canton: "SG" },
  { name: "Rapperswil-Jona", canton: "SG" },
  { name: "Reichenburg", canton: "SZ" },
  { name: "Siebnen", canton: "SZ" },
  { name: "Lachen", canton: "SZ" },
];

export const regions = [
  { name: "Kanton Glarus", description: "Glarus Nord, Glarus und Glarus Süd" },
  { name: "Linthgebiet", description: "Weesen, Uznach, Rapperswil-Jona" },
  { name: "March SZ", description: "Reichenburg, Siebnen, Lachen" },
];
