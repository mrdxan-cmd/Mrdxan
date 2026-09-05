# Migrationsplan: maler-gl.ch → neue Next.js-Website

Die bestehende Website auf **www.maler-gl.ch bleibt bis zur ausdrücklichen Freigabe unverändert online.**
Es werden weder DNS-Einträge geändert noch die Produktionsdomain verbunden.

```
AKTUELLE WEBSITE (maler-gl.ch)      bleibt online
        │
NEUE WEBSITE (dieses Repository)
  1. Entwicklung & Build        ✅ erledigt (siehe docs/QA-REPORT.md)
  1b. Abgleich mit Design-Mockup ✅ erledigt (docs/DESIGN.md)
  2. Inhalte verifizieren       ⬜ docs/CONTENT-VERIFICATION.md abarbeiten (Konflikte Telefon/Öffnungszeiten)
  3. Bilder importieren         ⬜ scripts/crawl-live-site.mjs
  4. Redirects vervollständigen ⬜ src/config/redirects.ts + scripts/check-redirects.mjs
  5. Preview-Deployment         ⬜ Vercel, *.vercel.app (noindex)
  6. QA auf dem Preview         ⬜ npm run qa gegen die Preview-URL
  7. Freigabe durch Inhaber     ⬜
  8. Produktionsumstellung      ⬜ erst nach Freigabe
```

## 1. Bestehende Website analysieren (lokal, mit Internetzugang)

Aus der Build-Umgebung war maler-gl.ch in beiden Sessions nicht erreichbar (Egress-Proxy: `403 https://www.maler-gl.ch`, 0 Bilder). Der Crawl muss daher einmalig lokal ausgeführt werden – er ist **read-only** und verändert die bestehende Website nicht:

```bash
npm run crawl:live            # = node scripts/crawl-live-site.mjs https://www.maler-gl.ch
```

Ergebnis:

- `scripts/output/live-urls.json` – alle URLs der bestehenden Website (Basis für Redirects)
- `scripts/output/live-pages.json` – Title, Meta-Description, H1/H2 pro Seite (SEO-Texte, die erhalten bleiben sollen)
- `scripts/output/live-images.json` + `public/images/imported/` – alle Bilder inkl. Alt-Texten

## 2. Inhalte verifizieren

Alle Felder mit `VERIFY` in `src/content/*.ts` gegen die bestehende Website bzw. Impressum abgleichen.
Checkliste: [CONTENT-VERIFICATION.md](CONTENT-VERIFICATION.md).

## 3. Projekte & Bilder

1. Echte Projektfotos aus `public/images/imported/` nach `public/images/projects/<slug>/` verschieben (Dateinamen sprechend, Grösse ≤ 2000 px, JPG/WebP).
2. In `src/content/projects.ts` pro Projekt `cover`/`gallery` mit `src`, `alt`, `width`, `height` eintragen und `placeholder: false` setzen.
3. Beispiel-Einträge (`placeholder: true`) löschen.
4. Optional: Leistungsfotos in `public/images/services/` ablegen und im jeweiligen Service unter `image` referenzieren (ersetzt die Illustration).

`next/image` optimiert alle Bilder automatisch (AVIF/WebP, responsive Grössen).

## 4. Redirects

`src/config/redirects.ts` enthält Regeln für gängige alte Pfade. Nach dem Crawl:

1. Jede URL aus `live-urls.json`, die im neuen Routing nicht existiert, auf die passende neue Seite mappen (`permanent: true` → 308, von Suchmaschinen wie 301 behandelt).
2. Prüfen: `npm run build && npm run start` in einem Terminal, dann

   ```bash
   npm run check:redirects -- http://localhost:3000
   ```

   Jede alte URL muss `200` oder `308 → 200` liefern.

3. Nach dem Preview-Deployment erneut gegen die Preview-URL prüfen.

Wix/Baukasten-Besonderheiten: Falls die alte Website URLs mit Query-Parametern oder Grossbuchstaben verwendet, diese ebenfalls als Regeln erfassen (Next.js matched Pfade case-sensitiv; bei Bedarf `source: "/(.*)"`-Regeln mit `has` verwenden).

## 5. Preview-Deployment (Vercel)

1. Repository bei Vercel importieren (Framework-Preset: Next.js).
2. Environment Variables (Preview):

   | Variable                        | Wert                                          |
   | ------------------------------- | --------------------------------------------- |
   | `NEXT_PUBLIC_ALLOW_INDEXING`    | `false` (Preview bleibt `noindex`)            |
   | `NEXT_PUBLIC_SHOW_PLACEHOLDERS` | `true` solange Beispielprojekte gezeigt werden |
   | `RESEND_API_KEY` / `QUOTE_TO_EMAIL` **oder** `QUOTE_WEBHOOK_URL` | Formularversand                |

3. Deploy → `https://<projekt>-<hash>.vercel.app`. **Keine Domain hinzufügen.**
4. Formular auf dem Preview real testen (E-Mail kommt an?).

Alternative Hosts: Das Projekt nutzt keine Vercel-spezifischen APIs. `npm run build && npm run start` läuft auf jedem Node ≥ 20 Host (Docker, Hetzner, Infomaniak, Render …).

## 6. QA auf dem Preview

```bash
QA_BASE_URL=https://<preview>.vercel.app node scripts/qa/verify-site.mjs
QA_BASE_URL=https://<preview>.vercel.app node scripts/qa/screenshots.mjs
QA_BASE_URL=https://<preview>.vercel.app node scripts/qa/form.mjs
node scripts/check-redirects.mjs https://<preview>.vercel.app
```

Zusätzlich manuell: Google Rich-Results-Test (LocalBusiness/FAQ/Service), Lighthouse (Performance, SEO, Accessibility), Darstellung auf echten Geräten.

## 7. Freigabe

Der Inhaber prüft Preview, Inhalte, Bilder, Impressum/Datenschutz und gibt die Umstellung schriftlich frei.

## 8. Produktionsumstellung (erst nach Freigabe)

1. Production-Environment bei Vercel: `NEXT_PUBLIC_SITE_URL=https://www.maler-gl.ch`, `NEXT_PUBLIC_ALLOW_INDEXING=true`, `NEXT_PUBLIC_SHOW_PLACEHOLDERS` entfernen, E-Mail-Provider mit verifizierter Domain.
2. Domain `www.maler-gl.ch` (und `maler-gl.ch` → Redirect auf www) im Vercel-Projekt hinzufügen; DNS gemäss Vercel-Anleitung umstellen (CNAME `www` → `cname.vercel-dns.com`, A `@` → Vercel-IP). TTL vorher auf 300 s senken.
3. Nach DNS-Umstellung: `node scripts/check-redirects.mjs https://www.maler-gl.ch`, `robots.txt`/`sitemap.xml` prüfen, Sitemap in der Google Search Console einreichen.
4. Alte Website erst nach 2–4 Wochen stabiler Laufzeit beim alten Anbieter kündigen (Rollback-Möglichkeit).

## Rollback

DNS auf die alten Werte zurücksetzen – die bisherige Website ist bis zur Kündigung unverändert vorhanden.
