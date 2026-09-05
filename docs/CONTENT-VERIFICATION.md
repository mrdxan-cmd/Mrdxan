# Inhalts-Verifikation vor dem Go-live

## Ausgangslage

Die Build-Umgebung hat **keinen Netzwerkzugriff auf www.maler-gl.ch** (Egress-Proxy antwortet mit 403; ebenso local.ch, zefix.ch, web.archive.org, Google Maps). Der Crawl wurde in beiden Sessions versucht:

```
$ npm run crawl:live
403  https://www.maler-gl.ch
1 URLs, 0 images downloaded
```

Damit fehlt die vom Auftrag vorgesehene Quelle der Wahrheit. Die Inhalte stammen deshalb aus drei Quellen mit unterschiedlicher Verlässlichkeit:

| Quelle | Verlässlichkeit | Verwendung |
|--------|-----------------|------------|
| **A** Suchmaschinen-Snippets (local.ch-Eintrag «Phönix Fo GmbH – Maler in Näfels») | mittel | Firma, Ort |
| **B** Dokumente im Google Drive des Auftraggebers (Angaben zum Arbeitgeber Phönix FO GmbH) | mittel–hoch | Adresse, Telefon, UID, Inhaber |
| **C** Design-Mockup (Homepage) | **nur visuell**; Texte sind Platzhalter (z. B. «Familie Müller», «50+ Bewertungen») | Slogans, Layout, Wording |

Der Auftrag verlangt ausdrücklich, keine Bewertungen, Statistiken, Garantien oder Projektfakten zu erfinden. Mockup-Angaben dieser Art sind daher im Code hinterlegt, aber **deaktiviert** (siehe Tabelle) und erscheinen erst nach Bestätigung.

## Verifizierte / übernommene Daten

| Feld | Wert | Quelle | Status |
|------|------|--------|--------|
| Markenname | Maler Phönix | Auftrag, Mockup | ✅ |
| Firma | Phönix FO GmbH | A (local.ch) | ⬜ Schreibweise («FO»/«Fo») prüfen |
| Ort | 8752 Näfels GL | A, B | ✅ |
| Strasse | Burgstrasse 8 | B | ⬜ bestätigen |
| UID | CHE-376.925.972 | B | ⬜ zefix.ch |
| Inhaber / Rolle | Firas Othman, Geschäftsführer | B | ⬜ bestätigen |
| Slogan | «Farbe schafft Lebensräume» | C | ✅ übernommen (Wording, kein Fakt) |
| Claim | «Aus Glarus. Für schöne Lebensräume.» | C | ✅ übernommen |
| Handschrift-Notizen | «Schönere Räume. Stärkere Region.», «Gemeinsam schöner wohnen.» | C | ✅ übernommen |
| Leistungstexte (Teaser) | aus Mockup-Karten | C | ✅ übernommen; Detailtexte neu geschrieben |
| Footer-Claim | «Qualität. Farbe. Vertrauen.» | C | ✅; Zusatz «Seit über 12 Jahren» deaktiviert |

## Ungelöste Konflikte (Entscheid des Inhabers nötig)

| # | Feld | Wert A/B | Wert Mockup (C) | Aktuell im Code | Datei |
|---|------|----------|-----------------|-----------------|-------|
| 1 | **Telefon** | 079 223 25 13 (Arbeitgeber-Telefon in Drive-Formular) | 055 610 27 44 | 079 223 25 13 | `company.ts` |
| 2 | **E-Mail** | – | info@maler-gl.ch | info@maler-gl.ch (Annahme, deckt sich mit Mockup) | `company.ts` |
| 3 | **Öffnungszeiten** | – | Mo–Fr 07:00–17:00 | Mo–Fr 07:00–17:00 | `company.ts` |
| 4 | Garantie «5 Jahre» | – | ja | **deaktiviert** (`verified: false`) | `trust.ts` |
| 5 | «12+ Jahre Erfahrung» / «Seit über 12 Jahren» | – | ja | **deaktiviert** | `trust.ts` |
| 6 | Google-Bewertung «4.9 / 5, 50+ Bewertungen» | – | ja | **nicht gesetzt** (`ratingSummary = null`) | `reviews.ts` |
| 7 | Kundenstimmen (Familie Müller, Thomas Eberle, Sandra Küng) | – | ja | **nicht übernommen** (offensichtliche Platzhalter) | `reviews.ts` |
| 8 | Projekte (Fassadenrenovation Glarus, Innenanstrich Wohnung Glarus, Neubau Komplettausbau Netstal) | – | ja | als **Platzhalter** mit Badge, ohne Fotos, nicht in Sitemap | `projects.ts` |
| 9 | Social-Profile Facebook / Instagram / LinkedIn | – | Icons ohne URLs | ausgeblendet bis URLs vorliegen | `social.ts` |
| 10 | Sprachen, Gründungsjahr, MWST-Nummer | – | – | Annahme / null | `company.ts` |
| 11 | Hero-/Sektionsfotos (Haus, Berge, Projekte) | – | KI-/Stock-Bilder im Mockup | **nicht verwendet**; SVG-Bergsilhouette + Marken-Grafiken bis echte Fotos importiert sind | `MountainBackdrop.tsx`, `ServiceIllustration.tsx` |

## Importierte Bilder

| Datei | Herkunft | Verwendung |
|-------|----------|------------|
| `public/images/brand/phoenix.png` | Vom Auftraggeber geliefertes Phönix-Artwork; schwarzer Hintergrund per `scripts/prepare-phoenix.mjs` freigestellt, getrimmt (1427×996, Alpha) | Hero, Über uns |
| `public/images/brand/phoenix-logo.png` | dito, 320 px | Header-/Footer-Logo, Mobile-Menü |
| `public/images/brand/og-default.png` | generiert (`scripts/generate-assets.mjs`) | Social Sharing |
| `src/app/icon.png`, `src/app/apple-icon.png`, `public/images/brand/icon-512.png` | generiert | Favicon / PWA |

**Keine Projekt- oder Leistungsfotos importiert** – die Live-Site war nicht erreichbar. Vorgehen nach lokalem Crawl: `docs/MIGRATION.md`, Abschnitt 3.

## Seiten, die der Inhaber bestätigen muss

| Seite | Was zu prüfen ist |
|-------|-------------------|
| `/` | Telefonnummer, Slogans, Hero-Highlights (Garantie/Erfahrung freischalten?), Projektkarten |
| `/leistungen/*` | Fachtexte, Leistungsumfang, FAQ-Antworten, Fotos |
| `/projekte`, `/projekte/*` | Platzhalter durch echte Referenzen ersetzen (Titel, Ort, Jahr, Fotos, Vorher/Nachher) |
| `/ueber-uns` | Firmengeschichte, Inhaber, Sprachen, Werte |
| `/kontakt` | Telefon, E-Mail, Adresse, Öffnungszeiten, WhatsApp ja/nein, Empfänger des Formulars |
| `/faq` | Antworten zu Offerte, Einzugsgebiet, Terminen |
| `/impressum` | Rechtsform, UID, MWST, vertretungsberechtigte Person |
| `/datenschutz` | Hosting (Vercel), E-Mail-Dienst (Resend/Webhook), Google Maps |

## Vorgehen

1. `npm run crawl:live` lokal ausführen → `scripts/output/live-pages.json`, `live-images.json`.
2. Tabellen oben abarbeiten, Werte in `src/content/*.ts` setzen, `VERIFY`-Kommentare entfernen (`grep -rn VERIFY src/content`).
3. `npm run check:redirects -- http://localhost:3000` und `npm run qa` erneut ausführen.
