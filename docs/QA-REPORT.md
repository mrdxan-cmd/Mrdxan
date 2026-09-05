# QA-Bericht – Stand 5. September 2026

Ausgeführt mit `npm run qa` (Produktions-Build, `NEXT_PUBLIC_SHOW_PLACEHOLDERS=true`, `QUOTE_ALLOW_LOG_ONLY=true`) in der Entwicklungsumgebung (Node 22, Chromium via Playwright).
Detail-Logs: `scripts/output/verify-site.txt`, `scripts/output/screenshots.json`, `scripts/output/qa-run.log` (nicht versioniert).

| # | Prüfpunkt (Aufgabenstellung) | Ergebnis |
|---|------------------------------|----------|
| 1 | Produktions-Build (`next build`) | ✅ 22 Seiten statisch generiert, keine Warnungen |
| 2 | Typecheck (`tsc --noEmit`) | ✅ 0 Fehler |
| 3 | Lint (`eslint .`) | ✅ 0 Fehler, 0 Warnungen |
| 4 | Alle Routen | ✅ 12 Seiten + 4 Leistungs-Detailseiten + 3 Projekt-Detailseiten (Preview) liefern 200; alle 30 intern verlinkten Pfade auflösbar; 404-Seite liefert Status 404 |
| 5 | Kontakt-Buttons | ✅ Header, Hero, Sticky-Bar (mobil), CTA-Banner, Footer, Kontaktseite – alle als echte `<a>`-Links |
| 6 | Telefon-Links | ✅ `tel:+41792232513` auf jeder Seite, identisch mit `company.ts` |
| 7 | E-Mail-Links | ✅ `mailto:info@maler-gl.ch` auf jeder Seite, identisch mit `company.ts` (Adresse selbst noch zu verifizieren) |
| 8 | Offertformular | ✅ Leer-Absenden → Sammelfehler + 8 Feldfehler; ungültige E-Mail → Feldfehler, Eingaben bleiben erhalten; gültig → Erfolgsmeldung, Anfrage serverseitig geloggt; Leistungsseite wählt Leistung vor |
| 9 | Mobile (360 / 390 / 430 / 768 px) | ✅ 48 Screenshots, kein horizontales Scrollen, Burger-Menü öffnet/schliesst |
| 10 | Desktop (1024 / 1440 px) | ✅ 24 Screenshots, kein Overflow, Dropdown-Navigation |
| 11 | Metadata | ✅ Title, Description (≤ 160 Zeichen), Canonical, OG-Title/-Image, genau ein `<h1>`, `lang="de"` auf allen 12 Seiten |
| 12 | Sitemap | ✅ `/sitemap.xml` mit 10 URLs auf `https://www.maler-gl.ch`, ohne Impressum/Datenschutz/Platzhalter-Projekte |
| 13 | robots.txt | ✅ Produktion: `Allow: /`, Sitemap-Verweis; Preview (`NEXT_PUBLIC_ALLOW_INDEXING` nicht gesetzt & Nicht-Produktionsdomain): `Disallow: /` |
| 14 | schema.org | ✅ LocalBusiness/HousePainter + WebSite global; Service + FAQPage auf Leistungsseiten; FAQPage auf /faq; ContactPage; BreadcrumbList auf Unterseiten – alle Blöcke valides JSON |
| 15 | Redirects | ✅ 27 konfigurierte Regeln liefern 308 → korrektes Ziel; endgültige Liste erst nach Crawl der Live-Site möglich (siehe MIGRATION.md) |
| – | Security-Header | ✅ `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`; `X-Powered-By` entfernt |
| – | Assets | ✅ `icon.svg`, `apple-icon.png`, `manifest.webmanifest`, OG-Bild 1200×630, Phönix-SVG |

**Gesamt:** 192 automatische Site-Checks bestanden, 76 Screenshot-Checks bestanden, alle Formular-Checks bestanden, 0 Fehler.

## Behobene Befunde während der QA

- Mobile-Menü wurde vom `backdrop-blur` des Sticky-Headers auf Header-Höhe beschnitten → Panel wird jetzt per Portal in `<body>` gerendert.
- Eingaben im Offertformular gingen nach Validierungsfehler verloren (React 19 setzt unkontrollierte Formulare nach Server Actions zurück) → kontrollierte Felder.
- Navigation umbrach bei 1024 px → `whitespace-nowrap`, Telefonnummer im Header erst ab 1280 px als Text.
- Meta-Description der Startseite war 196 Zeichen → auf 150 gekürzt.

## Offen / nicht in dieser Umgebung prüfbar

- Zugriff auf www.maler-gl.ch war blockiert: Inhalte, Bilder und alte URLs müssen lokal nachgezogen werden (`docs/CONTENT-VERIFICATION.md`, `docs/MIGRATION.md`).
- Google-Maps-Einbettung auf /kontakt lädt nur mit Internetzugang (im Sandbox-Test blockiert, Fallback-Link vorhanden).
- E-Mail-Versand wurde nur im Log-Modus getestet; auf dem Preview mit echtem Provider (Resend/Webhook) wiederholen.
- Lighthouse / Google Rich-Results-Test auf dem Preview-Deployment ausführen.
- Das Design-Mockup lag nicht vor; Abgleich nach Erhalt.

## Preview-Deployment

Noch nicht erstellt – benötigt Vercel-Zugang. Anleitung in `docs/MIGRATION.md` Abschnitt 5. **Die Produktionsdomain wird nicht angebunden.**
