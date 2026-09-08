/**
 * Builds ONE PDF with screenshots of every page of the website
 * (desktop 1440px + mobile 390px, full page).
 *
 * Tall full-page screenshots are sliced into readable, page-sized chunks:
 *   - desktop: one 1440×988 slice per PDF page (≈ a real viewport)
 *   - mobile:  390×842 slices, three per PDF page
 *
 * Usage:  QA_BASE_URL=http://localhost:3000 node scripts/qa/pdf-preview.mjs
 * Output: docs/preview/Maler-Phoenix-Website-Vorschau.pdf
 */
import { mkdir, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { launch } from "./browser.mjs";
import { baseUrl } from "./routes.mjs";

const outDir = path.resolve("docs/preview");
const tmpDir = path.resolve("scripts/output/pdf-slices");
await mkdir(outDir, { recursive: true });
await rm(tmpDir, { recursive: true, force: true });
await mkdir(tmpDir, { recursive: true });

/** Pages in the order they appear in the navigation. */
const pages = [
  { route: "/", title: "Startseite", note: "Hero, Leistungen, Projekte, Kundenstimmen, Kontakt" },
  { route: "/leistungen", title: "Leistungen – Übersicht", note: "Alle vier Fachbereiche" },
  { route: "/leistungen/fassaden", title: "Leistung: Fassaden", note: "Fassadenrenovation & Fassadenanstrich" },
  { route: "/leistungen/malerarbeiten", title: "Leistung: Malerarbeiten", note: "Innen & aussen" },
  { route: "/leistungen/gipserarbeiten", title: "Leistung: Gipserarbeiten", note: "Verputz & Trockenbau" },
  { route: "/leistungen/neubau-renovation", title: "Leistung: Neubau & Renovation", note: "Gesamtlösungen" },
  { route: "/projekte", title: "Projekte – Übersicht", note: "Referenzen (aktuell Beispiel-Platzhalter)" },
  { route: "/projekte/fassadenrenovation-glarus", title: "Projekt-Detailseite", note: "Struktur einer Referenz" },
  { route: "/ueber-uns", title: "Über uns", note: "Firma, Werte, Versprechen, Einzugsgebiet" },
  { route: "/kontakt", title: "Kontakt & Offerte", note: "Kontaktdaten, Offertformular, Karte" },
  { route: "/faq", title: "FAQ", note: "Häufige Fragen (allgemein + je Leistung)" },
  { route: "/impressum", title: "Impressum", note: "Rechtliche Angaben" },
  { route: "/datenschutz", title: "Datenschutzerklärung", note: "revDSG" },
  { route: "/diese-seite-gibt-es-nicht", title: "404 – Seite nicht gefunden", note: "Fehlerseite" },
];

const DESKTOP = { width: 1440, height: 900, sliceHeight: 988, renderWidth: 1100 };
const MOBILE = { width: 390, height: 844, sliceHeight: 842, renderWidth: 390 };

/** JPEG quality – lower keeps the PDF small enough to download and open everywhere. */
const QUALITY = Number(process.env.PDF_QUALITY ?? 68);

/** Cuts a tall screenshot into page-sized JPEG slices (downscaled + mozjpeg to keep the PDF light). */
async function slice(buffer, sliceHeight, prefix, renderWidth) {
  const meta = await sharp(buffer).metadata();
  const total = meta.height ?? 0;
  const count = Math.max(1, Math.ceil(total / sliceHeight));
  const files = [];
  for (let i = 0; i < count; i++) {
    const top = i * sliceHeight;
    const height = Math.min(sliceHeight, total - top);
    if (height <= 4) break;
    const file = path.join(tmpDir, `${prefix}-${String(i).padStart(2, "0")}.jpg`);
    let pipeline = sharp(buffer).extract({ left: 0, top, width: meta.width, height }).flatten({ background: "#ffffff" });
    if (renderWidth && renderWidth < meta.width) pipeline = pipeline.resize({ width: renderWidth });
    await pipeline.jpeg({ quality: QUALITY, mozjpeg: true, progressive: true }).toFile(file);
    files.push({ file, height, width: meta.width, index: i, count });
  }
  return files;
}

const browser = await launch();
const captured = [];

try {
  for (const spec of pages) {
    const shot = {};
    for (const [key, vp] of [
      ["desktop", DESKTOP],
      ["mobile", MOBILE],
    ]) {
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        deviceScaleFactor: 1,
        isMobile: key === "mobile",
        hasTouch: key === "mobile",
        locale: "de-CH",
        reducedMotion: "reduce",
      });
      const page = await context.newPage();
      const res = await page.goto(baseUrl + spec.route, { waitUntil: "networkidle" });
      // Google Maps iframe stays blank without internet – hide it so the PDF has no empty box.
      await page.addStyleTag({ content: "iframe{display:none!important}" }).catch(() => {});
      await page.waitForTimeout(250);
      const buffer = await page.screenshot({ type: "png", fullPage: true });
      const prefix = `${key}-${spec.route === "/" ? "home" : spec.route.slice(1).replace(/\//g, "_")}`;
      shot[key] = await slice(buffer, vp.sliceHeight, prefix, vp.renderWidth);
      shot[`${key}Status`] = res?.status();
      await context.close();
    }
    captured.push({ ...spec, ...shot });
    console.log(`✓ ${spec.route.padEnd(40)} desktop ${shot.desktop.length} · mobile ${shot.mobile.length} Seiten`);
  }

  // ---------- Build the PDF document ----------
  const fileUrl = (p) => `file://${p}`;
  const logo = fileUrl(path.resolve("public/images/brand/phoenix.png"));
  const today = new Date().toLocaleDateString("de-CH", { day: "2-digit", month: "long", year: "numeric" });

  const toc = captured
    .map(
      (c) => `<li><span class="toc-name">${c.title}</span><span class="toc-route">${c.route}</span></li>`,
    )
    .join("");

  const sections = captured
    .map((c) => {
      const desktop = c.desktop
        .map(
          (s) => `<section class="sheet">
        <header class="bar"><span class="bar-title">${c.title}</span><span class="bar-meta">Desktop 1440 px · ${c.route} · ${s.index + 1}/${s.count}</span></header>
        <div class="shot"><img src="${fileUrl(s.file)}" alt=""></div>
      </section>`,
        )
        .join("");

      const groups = [];
      for (let i = 0; i < c.mobile.length; i += 3) groups.push(c.mobile.slice(i, i + 3));
      const mobile = groups
        .map(
          (g, gi) => `<section class="sheet">
        <header class="bar"><span class="bar-title">${c.title}</span><span class="bar-meta">Mobile 390 px · ${c.route} · Teil ${gi + 1}/${groups.length}</span></header>
        <div class="phones">${g.map((s) => `<div class="phone"><img src="${fileUrl(s.file)}" alt=""></div>`).join("")}</div>
      </section>`,
        )
        .join("");

      return `<section class="sheet divider">
        <div class="divider-inner">
          <p class="divider-eyebrow">Seite</p>
          <h2>${c.title}</h2>
          <p class="divider-route">${c.route}</p>
          <p class="divider-note">${c.note}</p>
        </div>
      </section>${desktop}${mobile}`;
    })
    .join("");

  const html = `<!doctype html><html lang="de"><head><meta charset="utf-8"><style>
  @page { size: A4 landscape; margin: 0; }
  * { box-sizing: border-box; }
  body { margin: 0; font-family: "DejaVu Sans", Arial, sans-serif; color: #10111c; background: #fff; }
  .sheet { width: 297mm; height: 210mm; page-break-after: always; break-after: page; overflow: hidden; position: relative; display: flex; flex-direction: column; }
  .sheet:last-child { page-break-after: auto; }

  /* Cover */
  .cover { background: #07070f; color: #fff; align-items: center; justify-content: center; text-align: center;
    background-image: radial-gradient(70rem 36rem at 80% -20%, rgba(124,44,245,.45), transparent 60%),
                      radial-gradient(50rem 30rem at -10% 110%, rgba(255,31,143,.28), transparent 60%),
                      radial-gradient(40rem 26rem at 110% 100%, rgba(31,123,255,.3), transparent 60%); }
  .cover img { width: 150mm; margin-bottom: 6mm; }
  .cover h1 { font-size: 30pt; margin: 0; letter-spacing: -0.5pt; font-weight: 800; }
  .cover h1 span { background: linear-gradient(90deg,#ff1f8f,#7c2cf5 55%,#1f7bff); -webkit-background-clip: text; background-clip: text; color: transparent; }
  .cover p { color: #d2d6e2; font-size: 12pt; margin: 4mm 0 0; }
  .cover .meta { margin-top: 10mm; font-size: 9pt; color: #aab0c3; }
  .cover .badge { display: inline-block; margin-top: 6mm; border: 1px solid rgba(255,255,255,.25); border-radius: 999px; padding: 2mm 6mm; font-size: 9pt; color: #ffc7e6; }

  /* Table of contents */
  .toc { padding: 18mm 22mm; }
  .toc h2 { font-size: 20pt; margin: 0 0 8mm; }
  .toc ol { columns: 2; column-gap: 14mm; margin: 0; padding-left: 6mm; font-size: 11pt; line-height: 1.9; }
  .toc li { break-inside: avoid; }
  .toc-name { font-weight: 700; }
  .toc-route { color: #7d8499; font-size: 9pt; margin-left: 3mm; }
  .toc .hint { margin-top: 10mm; font-size: 9pt; color: #5a6076; line-height: 1.6; column-span: all; }

  /* Divider before each page */
  .divider { background: #f7f7fb; align-items: center; justify-content: center; }
  .divider-inner { text-align: center; }
  .divider-eyebrow { font-size: 9pt; letter-spacing: 3pt; text-transform: uppercase; color: #ff1f8f; font-weight: 800; margin: 0 0 4mm; }
  .divider h2 { font-size: 26pt; margin: 0; font-weight: 800; }
  .divider-route { font-family: "DejaVu Sans Mono", monospace; font-size: 11pt; color: #7c2cf5; margin: 3mm 0 0; }
  .divider-note { font-size: 10pt; color: #5a6076; margin: 5mm 0 0; }

  /* Screenshot sheets */
  .bar { height: 10mm; flex: 0 0 10mm; display: flex; align-items: center; justify-content: space-between;
         padding: 0 8mm; background: #10111c; color: #fff; font-size: 8.5pt; }
  .bar-title { font-weight: 700; }
  .bar-meta { color: #aab0c3; }
  .shot { flex: 1; display: flex; align-items: flex-start; justify-content: center; overflow: hidden; background: #fff; }
  .shot img { width: 100%; height: auto; display: block; }
  .phones { flex: 1; display: flex; gap: 6mm; align-items: flex-start; justify-content: center; padding: 4mm 8mm; background: #f7f7fb; }
  .phone { flex: 0 1 86mm; border: 1px solid #d2d6e2; border-radius: 3mm; overflow: hidden; background: #fff; }
  .phone img { width: 100%; height: auto; display: block; }
  </style></head><body>

  <section class="sheet cover">
    <div>
      <img src="${logo}" alt="">
      <h1>Maler <span>Phönix</span> – Website-Vorschau</h1>
      <p>Alle Seiten der neuen Website als Screenshots · Desktop 1440 px &amp; Mobile 390 px</p>
      <div class="badge">Vorschau / Staging – nicht öffentlich, Produktionsdomain unverändert</div>
      <p class="meta">Stand ${today} · maler-gl.ch (neu, Next.js) · ${captured.length} Seiten</p>
    </div>
  </section>

  <section class="sheet toc">
    <h2>Inhalt</h2>
    <ol>${toc}</ol>
    <p class="hint">Jede Seite wird zuerst in der Desktop-Ansicht (1440 px) und anschliessend in der Mobile-Ansicht (390 px) gezeigt.
    Lange Seiten sind in mehrere Abschnitte unterteilt. Projekt-Einträge mit «Beispiel»-Badge sind Struktur-Platzhalter und werden vor dem Go-live
    durch echte Referenzen mit Originalfotos ersetzt. Die Karte auf der Kontaktseite ist in dieser Vorschau ausgeblendet (kein Internetzugriff beim Rendern).</p>
  </section>

  ${sections}
  </body></html>`;

  const htmlFile = path.join(tmpDir, "document.html");
  await writeFile(htmlFile, html);

  const page = await browser.newPage();
  await page.goto(`file://${htmlFile}`, { waitUntil: "load" });
  await page.evaluate(() => Promise.all(Array.from(document.images).filter((i) => !i.complete).map((i) => new Promise((r) => { i.onload = i.onerror = r; }))));
  await page.emulateMedia({ media: "print" });
  const pdfPath = path.join(outDir, "Maler-Phoenix-Website-Vorschau.pdf");
  await page.pdf({ path: pdfPath, format: "A4", landscape: true, printBackground: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } });
  await page.close();
  const { size } = await stat(pdfPath);
  console.log(`\n✓ ${pdfPath} (${(size / 1048576).toFixed(1)} MB)`);
} finally {
  await browser.close();
}
