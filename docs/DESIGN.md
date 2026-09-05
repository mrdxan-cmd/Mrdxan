# Design-System (Stand: Abgleich mit Homepage-Mockup)

Das Mockup (dunkler Alpen-Hero, farbiger Phönix mit Pinsel, Magenta→Violett→Blau-Verlauf, weisse Karten, dunkler Projektbereich und Footer) ist die visuelle Referenz. Alles ausser dem Phönix-Artwork ist als echte HTML/React-Komponente umgesetzt.

## Abgleich Mockup → Implementierung

| Mockup-Element | Umsetzung |
|----------------|-----------|
| Header: Phönix-Logo + «Maler **Phönix**» (Verlauf) + «FARBE SCHAFFT LEBENSRÄUME», Nav, Telefon-Pill, Verlauf-CTA | `Header.tsx`, `Logo.tsx`, `NavLink.tsx` (aktiver Link mit Verlaufs-Unterstrich) |
| Hero: «Maler & Gipser / **in Glarus**», Subline, Verlauf-Button + Outline-Button, Trust-Reihe, Phönix rechts, Handschrift-Notizen, Schweizer Fahne | `Hero.tsx`, `MountainBackdrop.tsx` (SVG statt Foto), `SwissFlag.tsx`, Caveat-Font |
| Leistungen: Eyebrow magenta, «Qualität für heute. Werte für morgen.», Karten mit Bild, rundem Icon-Badge, «Mehr erfahren →» | `ServicesSection.tsx`, `ServiceCard.tsx`, `ServiceIllustration.tsx` (Foto oder Verlauf-Grafik) |
| Projekte: dunkle Alpen-Sektion, Vorher/Nachher-Slider, Ort mit Pin | `ProjectsSection.tsx`, `ProjectCard.tsx`, `BeforeAfterSlider.tsx` (Range-Input, Tastatur/Touch) |
| Kundenstimmen: «Vertrauen, das bleibt.», Sterne + Rating rechts, 3 Karten | `ReviewsSection.tsx` – nur echte Daten; leerer Zustand mit Bewertungs-CTA |
| Kontakt: «Jetzt kostenlose Offerte anfordern.», 3 Kontakt-Items mit Verlauf-Icons, kompaktes Formular, Farbspritzer, «Gemeinsam schöner wohnen.» | `ContactSection.tsx`, `QuoteForm.tsx` (`compact`), `splash-brand`-Utility |
| Footer: dunkel, Logo, Seiten-Links, Social-Icons, www.maler-gl.ch, Claim, Copyright | `Footer.tsx` |
| Mobile | Burger-Menü (Portal), gestapelter Hero mit Phönix unter dem Text, Sticky-Leiste Anrufen/WhatsApp/Offerte |

Bewusste Abweichungen: Fotos im Mockup (Haus, Berge, Vorher/Nachher, Leistungen) sind KI-/Stock-Bilder und wurden **nicht** übernommen – Platzhalter-Grafiken bis echte Fotos vorliegen. Vier statt drei Leistungskarten (Gipserarbeiten als eigene Seite gemäss Auftrag).

## Farben (Tokens in `src/app/globals.css`)

| Token | Wert | Verwendung |
|-------|------|------------|
| `brand-magenta` | `#ff1f8f` | Eyebrows, Links, Verlaufsstart |
| `brand-violet` | `#7c2cf5` | Verlaufsmitte, Fokus-Ring |
| `brand-blue` | `#1f7bff` | Verlaufsende |
| `--gradient-brand` | magenta → violet → blue | Buttons, Headline-Zeile, Icons |
| `ember-*`, `gold-*` | Orange/Gelb | Akzente des Artworks, Sterne, Badges |
| `ink-950 … 50` | Navy-Schwarz bis Off-White | Hintergründe, Text |
| `paper` | `#f7f7fb` | Seitenhintergrund |

## Typografie

- **Inter** (Variable) für Headlines (800, enge Laufweite) und Fliesstext
- **Caveat 700** für handschriftliche Akzente
- Self-hosted via `next/font/local` (`src/fonts/`), OFL-Lizenzen beiliegend

## Assets

- `scripts/prepare-phoenix.mjs` – stellt das gelieferte JPG frei (Screen-Keying, Alpha) → `phoenix.png`, `phoenix-logo.png`
- `scripts/generate-assets.mjs` – OG-Bild (1200×630) und Icons (64/180/512)

## Breakpoints & Barrierefreiheit

Geprüfte Viewports: 360, 390, 430, 768, 1024, 1440 px. Skip-Link, Landmarks, sichtbarer Fokus, `aria-*` für Menü/Formular/Slider, `prefers-reduced-motion`, Formularfehler mit `role="alert"`, Erfolg mit `role="status"`.
