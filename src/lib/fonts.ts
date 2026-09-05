import localFont from "next/font/local";

/**
 * Self-hosted fonts (SIL Open Font License, see src/fonts/LICENSE-*.txt).
 * No runtime requests to Google Fonts – fully portable across hosting providers.
 *
 * Inter  – headings and body (matches the mockup's bold geometric headline style)
 * Caveat – handwritten accents ("Schönere Räume. Stärkere Region.")
 */
export const inter = localFont({
  src: [
    { path: "../fonts/inter-latin-wght-normal.woff2", weight: "100 900", style: "normal" },
    { path: "../fonts/inter-latin-ext-wght-normal.woff2", weight: "100 900", style: "normal" },
  ],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

export const caveat = localFont({
  src: [{ path: "../fonts/caveat-latin-700-normal.woff2", weight: "700", style: "normal" }],
  variable: "--font-caveat",
  display: "swap",
  preload: false,
});
