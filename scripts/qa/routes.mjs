/** Shared list of routes used by the QA scripts. */
export const pageRoutes = [
  "/",
  "/leistungen",
  "/leistungen/fassaden",
  "/leistungen/malerarbeiten",
  "/leistungen/gipserarbeiten",
  "/leistungen/neubau-renovation",
  "/projekte",
  "/ueber-uns",
  "/kontakt",
  "/faq",
  "/impressum",
  "/datenschutz",
];

export const viewports = [
  { name: "360", width: 360, height: 780, mobile: true },
  { name: "390", width: 390, height: 844, mobile: true },
  { name: "430", width: 430, height: 932, mobile: true },
  { name: "768", width: 768, height: 1024, mobile: true },
  { name: "1024", width: 1024, height: 768, mobile: false },
  { name: "1440", width: 1440, height: 900, mobile: false },
];

export const baseUrl = (process.env.QA_BASE_URL ?? "http://localhost:3000").replace(/\/+$/, "");
