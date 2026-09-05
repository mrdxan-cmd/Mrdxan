/**
 * 301/308 redirects from OLD URLs (current website on maler-gl.ch) to the new
 * route structure.
 *
 * HOW TO COMPLETE THIS LIST (see docs/MIGRATION.md):
 *   1. Run `node scripts/crawl-live-site.mjs` on a machine with internet access.
 *      It writes `scripts/output/live-urls.json` with every URL of the live site.
 *   2. Map every old URL that does not exist in the new site to its best
 *      replacement below. Keep existing routes that already match (/kontakt, /faq …).
 *   3. Verify with `node scripts/check-redirects.mjs http://localhost:3000`.
 *
 * `permanent: true` results in a 308 (treated like a 301 by search engines).
 */
export interface RedirectRule {
  source: string;
  destination: string;
  permanent: boolean;
}

export const redirects: RedirectRule[] = [
  // Common builder default paths
  { source: "/home", destination: "/", permanent: true },
  { source: "/index.html", destination: "/", permanent: true },
  { source: "/index.php", destination: "/", permanent: true },
  { source: "/startseite", destination: "/", permanent: true },

  // Legacy naming variants → new routes (adjust after crawl)
  { source: "/dienstleistungen", destination: "/leistungen", permanent: true },
  { source: "/leistungen/fassade", destination: "/leistungen/fassaden", permanent: true },
  { source: "/leistungen/fassadenrenovation", destination: "/leistungen/fassaden", permanent: true },
  { source: "/leistungen/maler", destination: "/leistungen/malerarbeiten", permanent: true },
  { source: "/leistungen/gipser", destination: "/leistungen/gipserarbeiten", permanent: true },
  { source: "/leistungen/neubau", destination: "/leistungen/neubau-renovation", permanent: true },
  { source: "/leistungen/renovation", destination: "/leistungen/neubau-renovation", permanent: true },
  { source: "/fassaden", destination: "/leistungen/fassaden", permanent: true },
  { source: "/malerarbeiten", destination: "/leistungen/malerarbeiten", permanent: true },
  { source: "/gipserarbeiten", destination: "/leistungen/gipserarbeiten", permanent: true },
  { source: "/neubau-renovation", destination: "/leistungen/neubau-renovation", permanent: true },
  { source: "/referenzen", destination: "/projekte", permanent: true },
  { source: "/galerie", destination: "/projekte", permanent: true },
  { source: "/ueber-mich", destination: "/ueber-uns", permanent: true },
  { source: "/uber-uns", destination: "/ueber-uns", permanent: true },
  { source: "/team", destination: "/ueber-uns", permanent: true },
  { source: "/offerte", destination: "/kontakt", permanent: true },
  { source: "/offerte-anfragen", destination: "/kontakt", permanent: true },
  { source: "/anfrage", destination: "/kontakt", permanent: true },
  { source: "/contact", destination: "/kontakt", permanent: true },
  { source: "/impressum-datenschutz", destination: "/impressum", permanent: true },
  { source: "/datenschutzerklaerung", destination: "/datenschutz", permanent: true },
  { source: "/agb", destination: "/impressum", permanent: true },
];
