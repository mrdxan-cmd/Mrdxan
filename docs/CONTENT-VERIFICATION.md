# Inhalts-Verifikation vor dem Go-live

Die Build-Umgebung hatte **keinen Zugriff auf www.maler-gl.ch** (Netzwerk-Egress gesperrt) und auch nicht auf Verzeichnisse (local.ch, zefix), Archive (web.archive.org) oder Google Maps. Die folgenden Angaben stammen deshalb aus Suchmaschinen-Snippets und aus dem Google Drive des Auftraggebers (Formular «Artikel 32 Gesuch», Angaben zum Arbeitgeber). Sie müssen vor dem Go-live gegen die bestehende Website und das Impressum geprüft werden.

Alle betroffenen Stellen sind im Code mit `VERIFY` markiert (`grep -rn VERIFY src/content`).

| # | Feld | Aktueller Wert | Quelle | Datei | Status |
|---|------|----------------|--------|-------|--------|
| 1 | Markenname | Maler Phönix | Aufgabenstellung | `site.ts`, `company.ts` | ✅ |
| 2 | Rechtsform / Firma | Phönix FO GmbH | local.ch-Eintrag «Phönix Fo GmbH – Maler in Näfels» | `company.ts` | ⬜ Schreibweise prüfen |
| 3 | UID | CHE-376.925.972 | Drive-Formular | `company.ts` | ⬜ zefix.ch |
| 4 | MWST-Nummer | – (null) | – | `company.ts` | ⬜ falls MWST-pflichtig eintragen |
| 5 | Strasse | Burgstrasse 8 | Drive-Formular | `company.ts` | ⬜ |
| 6 | PLZ / Ort | 8752 Näfels | local.ch, Drive | `company.ts` | ✅ |
| 7 | Telefon | 079 223 25 13 / +41 79 223 25 13 | Drive-Formular («Telefon Arbeitgeber») | `company.ts` | ⬜ Geschäftsnummer bestätigen |
| 8 | E-Mail | info@maler-gl.ch | **Annahme** anhand Domain | `company.ts` | ⬜ **muss geprüft werden** |
| 9 | WhatsApp-Nummer | wie Telefon | Annahme | `company.ts` | ⬜ oder `null` setzen |
| 10 | Inhaber / Rolle | Firas Othman, Geschäftsführer | Drive-Dokumente | `company.ts` | ⬜ |
| 11 | Öffnungszeiten | Mo–Fr 07:00–12:00, 13:00–17:30 | **Annahme** | `company.ts` | ⬜ |
| 12 | Gründungsjahr | – (null) | – | `company.ts` | ⬜ optional |
| 13 | Sprachen | Deutsch, Englisch, Arabisch, Kurdisch | Annahme | `company.ts` | ⬜ |
| 14 | Geokoordinaten | 47.0975 / 9.0633 (Näfels Zentrum) | Näherung | `company.ts` | ⬜ exakt geocodieren |
| 15 | Leistungstexte | neu geschrieben | Aufgabenstellung (4 Bereiche) | `services.ts` | ⬜ mit Live-Texten abgleichen, SEO-Formulierungen übernehmen |
| 16 | Einzugsgebiet | Kanton Glarus, Linthgebiet, March | Annahme | `service-areas.ts` | ⬜ |
| 17 | Vertrauensmerkmale / Kennzahlen | Jahre Erfahrung & Projekte = null (ausgeblendet) | – | `trust.ts` | ⬜ echte Zahlen eintragen |
| 18 | Kundenbewertungen | leer (keine erfunden) | – | `reviews.ts` | ⬜ echte Bewertungen + Google-Rating |
| 19 | Projekte / Referenzen | 3 Beispiel-Platzhalter | – | `projects.ts` | ⬜ durch echte Projekte + Originalfotos ersetzen |
| 20 | Social Links | local.ch (aus Suchergebnis), Rest null | Suche | `social.ts` | ⬜ Google-Profil, Instagram, Facebook |
| 21 | Google-Bewertungslink | null | – | `social.ts` | ⬜ Place-ID-Link eintragen |
| 22 | Impressum | Standardtexte CH | – | `app/impressum/page.tsx` | ⬜ mit bestehendem Impressum abgleichen |
| 23 | Datenschutzerklärung | revDSG-konform, Vercel/Resend/Maps erwähnt | – | `app/datenschutz/page.tsx` | ⬜ Hosting/Provider final eintragen |
| 24 | Alte URLs / Redirects | generische Regeln | – | `config/redirects.ts` | ⬜ nach Crawl vervollständigen |
| 25 | Logo | neu erstelltes Phönix-Zeichen (SVG) | – | `public/images/brand/` | ⬜ falls Original-Logo existiert: ersetzen |
| 26 | Design-Mockup | nicht in der Session enthalten | – | – | ⬜ Mockup nachreichen → Abgleich Farben/Typografie/Layout |

## Vorgehen

1. `npm run crawl:live` lokal ausführen (siehe MIGRATION.md) → `scripts/output/live-pages.json` öffnen.
2. Tabelle Zeile für Zeile abarbeiten, Werte in `src/content/*.ts` korrigieren, `VERIFY`-Kommentare entfernen.
3. `npm run qa` erneut ausführen (prüft u. a., dass alle `tel:`/`mailto:`-Links den zentralen Daten entsprechen).
