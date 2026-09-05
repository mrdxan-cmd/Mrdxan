import localFont from "next/font/local";

/**
 * Self-hosted variable fonts (SIL Open Font License, see src/fonts/LICENSE-*.txt).
 * No runtime requests to Google Fonts — fully portable across hosting providers.
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

export const outfit = localFont({
  src: [
    { path: "../fonts/outfit-latin-wght-normal.woff2", weight: "100 900", style: "normal" },
    { path: "../fonts/outfit-latin-ext-wght-normal.woff2", weight: "100 900", style: "normal" },
  ],
  variable: "--font-outfit",
  display: "swap",
  preload: true,
});
