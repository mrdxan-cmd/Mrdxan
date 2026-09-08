# Maler Phönix – Website (Next.js)

Neue, eigenständige Website für **Maler Phönix / Phönix FO GmbH, Näfels GL** – entwickelt als Ersatz für die bestehende Website auf [www.maler-gl.ch](https://www.maler-gl.ch).

> **Die bestehende Website bleibt unverändert online.** Dieses Projekt wird separat entwickelt, als Preview deployt und erst nach vollständiger QA, Redirect-Prüfung und ausdrücklicher Freigabe auf die Produktionsdomain umgestellt. Siehe [docs/MIGRATION.md](docs/MIGRATION.md).

## Stack

- [Next.js 16](https://nextjs.org) (App Router, statisch vorgerendert) · React 19 · TypeScript (strict)
- Tailwind CSS 4 mit eigenem Design-Token-Set (`src/app/globals.css`)
- Self-hosted Fonts (Inter, Caveat – OFL), keine externen Requests zu Google Fonts
- Design gemäss Homepage-Mockup (dunkler Hero, Phönix-Artwork, Magenta→Violett→Blau-Verlauf), siehe `docs/DESIGN.md`
- Offertformular als Server Action mit Zod-Validierung, Honeypot und Rate-Limit; E-Mail-Versand via Resend oder Webhook (portabel, kein Vendor-Lock-in)
- SEO: Metadata API, Canonicals, Open Graph, `sitemap.xml`, `robots.txt`, JSON-LD (LocalBusiness, Service, FAQPage, BreadcrumbList), 308-Redirects für alte URLs
- QA-Suite mit Playwright (Screenshots 360–1440 px, Route-/Link-/Schema-Checks, Formular-Test)

## Schnellstart

```bash
npm install
cp .env.example .env.local     # optional anpassen
npm run dev                    # http://localhost:3000
```

Weitere Befehle:

| Befehl                     | Zweck                                                                 |
| -------------------------- | --------------------------------------------------------------------- |
| `npm run build`            | Produktions-Build (inkl. TypeScript-Prüfung)                          |
| `npm run start`            | Produktions-Server lokal                                              |
| `npm run typecheck`        | `tsc --noEmit`                                                        |
| `npm run lint`             | ESLint                                                                |
| `npm run qa`               | Build + Server + komplette QA-Suite (Screenshots, Routen, Formular)   |
| `npm run crawl:live`       | Bestehende Website read-only crawlen (URLs, SEO-Texte, Bilder)        |
| `npm run check:redirects`  | Alle alten URLs gegen die neue Site prüfen (200 oder 308 → 200)       |
| `node scripts/generate-assets.mjs`  | OG-Bild und Icons aus dem Phönix-Artwork erzeugen               |
| `node scripts/prepare-phoenix.mjs <jpg>` | Phönix-Artwork freistellen (Alpha) → phoenix.png / phoenix-logo.png |
| `node scripts/qa/pdf-preview.mjs`   | Alle Seiten als Screenshots in **einem PDF** (Desktop + Mobile) → `docs/preview/` |

## Projektstruktur

```
src/
  app/                 Routen (App Router): /, /leistungen, /leistungen/[slug], /projekte,
                       /projekte/[slug], /ueber-uns, /kontakt, /faq, /impressum, /datenschutz
                       + sitemap.ts, robots.ts, manifest.ts, icon.png, apple-icon.png, not-found.tsx
  content/             ZENTRALE INHALTE – hier werden Texte und Firmendaten gepflegt
    site.ts            Site-Name, Domain, Standard-Metadaten
    company.ts         Firma, Adresse, Telefon, E-Mail, UID, Öffnungszeiten
    services.ts        Leistungen (4 Bereiche) inkl. Texte, Features, Ablauf, FAQ
    projects.ts        Referenzprojekte (+ Bildpfade)
    faq.ts             Allgemeine FAQ
    social.ts          Social-/Profil-Links, Google-Bewertungslink
    service-areas.ts   Einzugsgebiet
    trust.ts           Vertrauensmerkmale, Kennzahlen
    reviews.ts         Kundenbewertungen (nur echte!)
    navigation.ts      Haupt- und Footer-Navigation
  config/redirects.ts  301/308-Redirects alte → neue URLs
  components/          UI-Komponenten (layout, home, services, projects, forms, faq, ui, seo)
  lib/                 seo.ts (Metadata-Helper), schema.ts (JSON-LD), mail.ts (Versand), fonts.ts
public/images/
  brand/               Phönix-Artwork (freigestellt), Logo, OG-Bild, Icons
  services/ projects/ general/   Platz für die echten Fotos der bestehenden Website
scripts/               QA- und Migrationswerkzeuge (siehe docs/MIGRATION.md)
docs/                  MIGRATION.md, CONTENT-VERIFICATION.md, DESIGN.md, QA-REPORT.md
  preview/             Maler-Phoenix-Website-Vorschau.pdf (Screenshots aller Seiten)
```

## Inhalte pflegen

Alle Geschäftsdaten liegen in `src/content/*.ts`. Komponenten enthalten **keine** hartkodierten Firmendaten.
Felder, die vor dem Go-live gegen die bestehende Website geprüft werden müssen, sind mit `VERIFY` kommentiert – die Checkliste steht in [docs/CONTENT-VERIFICATION.md](docs/CONTENT-VERIFICATION.md).

**Projekte:** Einträge mit `placeholder: true` sind Struktur-Beispiele. Sie erscheinen nur in Entwicklung/Preview (`NEXT_PUBLIC_SHOW_PLACEHOLDERS=true`), tragen ein «Beispiel»-Badge und sind von der Sitemap ausgeschlossen. Es werden keine KI-generierten Projektfotos verwendet.

## Deployment (Vercel, Preview)

1. Repository bei Vercel importieren (Framework: Next.js, Root: `/`).
2. Environment Variables gemäss `.env.example` setzen – für Preview: `NEXT_PUBLIC_SHOW_PLACEHOLDERS=true`, `NEXT_PUBLIC_ALLOW_INDEXING=false`, E-Mail-Provider konfigurieren.
3. Deploy → temporäre `*.vercel.app`-URL. **Keine Domain verbinden.**
4. QA gemäss [docs/MIGRATION.md](docs/MIGRATION.md) durchführen.

Die Anwendung ist reines Next.js ohne Vercel-spezifische APIs und lässt sich ebenso mit `npm run build && npm run start` auf jedem Node-Host (Docker, Hetzner, Infomaniak Node-Hosting usw.) betreiben.

## Lizenzhinweise

Inter und Caveat werden unter der SIL Open Font License eingebunden (`src/fonts/LICENSE-*.txt`).
