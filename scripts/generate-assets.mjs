/**
 * Generates raster brand assets from the SVG artwork using the bundled Chromium:
 *   - public/images/brand/og-default.png   (1200×630 social sharing image)
 *   - src/app/apple-icon.png                (180×180)
 *   - public/images/brand/icon-512.png      (512×512, manifest)
 *
 * Usage: node scripts/generate-assets.mjs
 */
import { launch } from "./qa/browser.mjs";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const phoenix = await readFile(path.join(root, "public/images/brand/phoenix.svg"), "utf8");
const mark = await readFile(path.join(root, "public/images/brand/logo-mark.svg"), "utf8");
const outfit = (await readFile(path.join(root, "src/fonts/outfit-latin-wght-normal.woff2"))).toString("base64");
const inter = (await readFile(path.join(root, "src/fonts/inter-latin-wght-normal.woff2"))).toString("base64");

const fontCss = `
@font-face{font-family:"Outfit";src:url(data:font/woff2;base64,${outfit}) format("woff2");font-weight:100 900}
@font-face{font-family:"Inter";src:url(data:font/woff2;base64,${inter}) format("woff2");font-weight:100 900}
`;

const og = `<!doctype html><html><head><meta charset="utf-8"><style>${fontCss}
html,body{margin:0;width:1200px;height:630px;overflow:hidden}
body{font-family:Inter,sans-serif;background:#0d0c0a;color:#fff;position:relative;
background-image:radial-gradient(60rem 30rem at 85% -10%,rgba(244,95,20,.28),transparent 60%),radial-gradient(40rem 24rem at -10% 110%,rgba(233,169,29,.12),transparent 60%)}
.grid{position:absolute;inset:0;opacity:.07;background-image:linear-gradient(rgba(255,255,255,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.6) 1px,transparent 1px);background-size:56px 56px}
.art{position:absolute;right:40px;top:35px;width:560px;height:560px;filter:drop-shadow(0 30px 60px rgba(244,95,20,.35))}
.art svg{width:100%;height:100%}
.text{position:absolute;left:72px;top:110px;width:600px}
.eyebrow{display:inline-flex;align-items:center;gap:10px;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.05);border-radius:999px;padding:8px 16px;font-size:16px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:#ffc7a3}
.eyebrow i{width:8px;height:8px;border-radius:50%;background:#ff7a33;display:inline-block}
h1{font-family:Outfit,sans-serif;font-size:74px;line-height:1.02;margin:28px 0 0;letter-spacing:-.02em;font-weight:800}
h1 span{background:linear-gradient(100deg,#ffd98a 0%,#ff7a33 45%,#e0341e 100%);-webkit-background-clip:text;background-clip:text;color:transparent}
p{font-size:24px;line-height:1.45;color:#d8d2c9;margin:26px 0 0;max-width:560px}
.brand{position:absolute;left:72px;bottom:56px;display:flex;align-items:center;gap:16px}
.brand svg{width:56px;height:56px}
.brand b{font-family:Outfit,sans-serif;font-size:26px;display:block}
.brand small{font-size:13px;letter-spacing:.2em;text-transform:uppercase;color:#ffa06a;font-weight:700}
</style></head><body>
<div class="grid"></div>
<div class="art">${phoenix}</div>
<div class="text">
  <span class="eyebrow"><i></i>Malergeschäft in Näfels GL</span>
  <h1>Farbe, die bleibt.<br><span>Handwerk, das überzeugt.</span></h1>
  <p>Malerarbeiten · Gipserarbeiten · Fassaden · Neubau &amp; Renovation im Kanton Glarus</p>
</div>
<div class="brand">${mark}<div><b>Maler Phönix</b><small>www.maler-gl.ch</small></div></div>
</body></html>`;

const icon = (size) => `<!doctype html><html><head><meta charset="utf-8"><style>
html,body{margin:0;width:${size}px;height:${size}px;overflow:hidden;background:transparent}
svg{width:${size}px;height:${size}px;display:block}
</style></head><body>${mark}</body></html>`;

const browser = await launch();
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.setContent(og, { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  await mkdir(path.join(root, "public/images/brand"), { recursive: true });
  await writeFile(path.join(root, "public/images/brand/og-default.png"), await page.screenshot({ type: "png" }));
  console.log("✓ public/images/brand/og-default.png");

  for (const [size, file] of [
    [180, "src/app/apple-icon.png"],
    [512, "public/images/brand/icon-512.png"],
  ]) {
    const p = await browser.newPage({ viewport: { width: size, height: size }, deviceScaleFactor: 1 });
    await p.setContent(icon(size), { waitUntil: "load" });
    await writeFile(path.join(root, file), await p.screenshot({ type: "png", omitBackground: true }));
    console.log(`✓ ${file}`);
    await p.close();
  }
} finally {
  await browser.close();
}
