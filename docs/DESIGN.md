# Design-System

Das visuelle Konzept folgt der Vorgabe «Phönix-Hero-Artwork als eigenständiges Bild, alles andere als echte Web-Komponenten».
Das im Auftrag erwähnte Design-Mockup lag in der Entwicklungs-Session **nicht** vor – die Umsetzung basiert auf der Beschreibung (dunkler Hero mit Phönix, warme Feuerfarben, klare helle Inhaltsbereiche). Sobald das Mockup vorliegt, lassen sich Farben, Typografie und Abstände zentral in `src/app/globals.css` (`@theme`) anpassen.

## Farben (Tokens)

| Token            | Wert      | Verwendung                              |
| ---------------- | --------- | --------------------------------------- |
| `ember-500`      | `#f45f14` | Primär-CTA, Akzente                     |
| `ember-600/700`  | `#d9470a` / `#b0360b` | Hover/Active                |
| `flame-500`      | `#e0341e` | Verlauf-Ende, Fehlerzustände            |
| `gold-300/400`   | `#ffd98a` / `#f6c04e` | Verlauf-Anfang, Sterne, Badges |
| `ink-950 … 50`   | warmes Anthrazit bis Off-White | Text, dunkle Sektionen, Rahmen |
| `paper`          | `#fbf9f6` | Seitenhintergrund                       |

Verlauf `text-gradient-ember` (Gold → Orange → Rot) für Hero-Headline und Kennzahlen; `surface-dark` für dunkle Sektionen mit radialem Ember-Glow.

## Typografie

- **Outfit** (Variable, 100–900) für Überschriften – `font-display`
- **Inter** (Variable) für Fliesstext – `font-sans`
- Beide self-hosted über `next/font/local` (`src/fonts/`), `font-display: swap`, Preload.

## Komponenten

- `Button` – Varianten `primary`, `secondary`, `dark`, `ghost`, `outline-light`; rendert `<a>` für tel:/mailto:/extern, `<Link>` intern.
- `Section` / `SectionHeading` / `Container` – Layoutraster (max. 80 rem, responsive Innenabstände).
- `Header` (Sticky, Desktop-Dropdown für Leistungen) + `MobileNav` (Fullscreen-Dialog per Portal, Escape/Scroll-Lock).
- `StickyContactBar` – mobile Schnellaktionen Anrufen / WhatsApp / Offerte (reine Links, funktioniert ohne JS).
- `ServiceCard`, `ServiceIllustration` (Foto oder Marken-Grafik), `ProjectCard`, `ProjectMedia` (Foto oder neutraler Platzhalter – nie KI-Bilder).
- `FaqAccordion` – natives `<details>/<summary>`, barrierefrei, ohne JS.
- `QuoteForm` – Client-Komponente mit `useActionState`, Server Action `submitQuote`, Zod-Validierung, Honeypot, Rate-Limit, kontrollierte Felder (Eingaben bleiben bei Fehlern erhalten).
- `JsonLd`, `Breadcrumbs` – strukturierte Daten.

## Responsive Breakpoints

Mobile-first. Geprüfte Viewports: 360, 390, 430, 768, 1024, 1440 px (`scripts/qa/screenshots.mjs`, inkl. Test auf horizontales Scrollen).

- < 1024 px: Burger-Menü, Sticky-Kontaktleiste, einspaltige Sektionen (ab 640 px zweispaltige Karten)
- ≥ 1024 px: Desktop-Navigation, Hero zweispaltig, Karten 3–4-spaltig; Telefonnummer im Header ab 1280 px

## Barrierefreiheit

Skip-Link, semantische Landmarks, sichtbarer Fokus (`:focus-visible`), `aria-*` für Menü und Formular, Kontrast ≥ 4.5:1 für Text, `prefers-reduced-motion` respektiert, Formular-Fehler mit `role="alert"`, Erfolgsmeldung mit `role="status"`.
