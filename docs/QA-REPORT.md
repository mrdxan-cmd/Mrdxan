# QA-Bericht – Stand 5. September 2026 (nach Mockup-Abgleich)

Ausgeführt mit `npm run qa` (Produktions-Build, `NEXT_PUBLIC_SHOW_PLACEHOLDERS=true`, `QUOTE_ALLOW_LOG_ONLY=true`) in der Entwicklungsumgebung (Node 22, Chromium via Playwright).
Detail-Logs: `scripts/output/verify-site.txt`, `scripts/output/screenshots.json`, `scripts/output/qa-run.log` (nicht versioniert).

| # | Prüfpunkt | Ergebnis |
|---|-----------|----------|
| 1 | Typecheck (`tsc --noEmit`) | ✅ 0 Fehler |
| 2 | Lint (`eslint .`) | ✅ 0 Fehler, 0 Warnungen |
| 3 | Produktions-Build (`next build`) | ✅ 22 Seiten statisch generiert |
| 4 | Responsive QA (360 / 390 / 430 / 768 / 1024 / 1440 px) | ✅ 76 Screenshot-Checks, kein horizontales Scrollen, Burger-Menü (Portal) öffnet/schliesst |
| 5 | Formular-QA | ✅ Vollformular /kontakt: Sammelfehler + 6 Feldfehler bei Leer-Absenden, ungültige E-Mail abgewiesen, Eingaben bleiben erhalten, Erfolgsmeldung; **kompaktes Startseiten-Formular** (Name · E-Mail · Telefon · Nachricht) sendet erfolgreich; Leistungsseite wählt Leistung vor |
| 6 | Broken-Link-Check | ✅ 12 Seiten + alle 18 intern verlinkten Pfade liefern 200 (bzw. 308 → 200); 404-Seite liefert 404 |
| 7 | Sitemap | ✅ 10 URLs auf `https://www.maler-gl.ch`, ohne Impressum/Datenschutz/Platzhalter-Projekte |
| 8 | robots.txt | ✅ Produktion `Allow: /` + Sitemap; Preview ohne `NEXT_PUBLIC_ALLOW_INDEXING` → `Disallow: /` |
| 9 | Strukturierte Daten | ✅ LocalBusiness/HousePainter + WebSite global; Service + FAQPage auf 4 Leistungsseiten; FAQPage auf /faq; ContactPage; BreadcrumbList auf allen Unterseiten – valides JSON |
| 10 | Metadata | ✅ Title, Description ≤ 160, Canonical, OG-Title/-Image (neues OG-Bild mit Phönix), genau ein `<h1>`, `lang="de"` |
| 11 | Telefon-/E-Mail-Links | ✅ `tel:+41792232513` und `mailto:info@maler-gl.ch` auf jeder Seite identisch mit `company.ts` |
| 12 | Redirects | ✅ 27 konfigurierte Regeln → 308 mit korrektem Ziel |
| 13 | Security-Header / Assets | ✅ nosniff, SAMEORIGIN, Referrer-Policy; `icon.png`, `apple-icon.png`, `icon-512.png`, `og-default.png`, `phoenix.png`, `phoenix-logo.png` erreichbar |

**Gesamt:** 191 Site-Checks, 76 Screenshot-Checks und 10 Formular-Checks bestanden, 0 Fehler.

## Abgleich mit dem Mockup (visuell geprüft, 1440 / 1024 / 390 px)

Header, Hero (Headline mit Verlaufszeile, Verlauf-/Outline-CTA, Trust-Reihe, Phönix rechts mit Handschrift-Notizen und Schweizer Fahne), Leistungskarten mit Icon-Badge, dunkle Projektsektion mit Vorher/Nachher-Rahmen, Kundenstimmen-Layout, Kontaktsektion mit Farbspritzern und kompaktem Formular, dunkler Footer – siehe `docs/DESIGN.md` für die Zuordnung. Screenshots liegen nach `npm run qa` unter `scripts/output/screenshots/`.

## Nicht in dieser Umgebung prüfbar

- **Live-Site-Crawl** (`npm run crawl:live`): Egress-Proxy blockiert www.maler-gl.ch (403) → keine echten Inhalte/Bilder/URLs; `npm run check:redirects` hat daher nur die Proxy-Antwort geprüft. Lokal ausführen (docs/MIGRATION.md).
- Google-Maps-Einbettung auf /kontakt lädt nur mit Internetzugang (Fallback-Link vorhanden).
- E-Mail-Versand nur im Log-Modus getestet; auf dem Preview mit Resend/Webhook wiederholen.
- Lighthouse / Google Rich-Results-Test auf dem Preview ausführen.

## Preview-Deployment

Noch nicht erstellt (benötigt Vercel-Zugang). Build ist preview-bereit; Anleitung in `docs/MIGRATION.md` Abschnitt 5. **Die Produktionsdomain wird nicht angebunden.**
