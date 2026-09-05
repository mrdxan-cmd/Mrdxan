/**
 * Generates raster brand assets from the phoenix artwork:
 *   - public/images/brand/og-default.png   (1200×630 social sharing image, Chromium)
 *   - src/app/icon.png                      (64×64 favicon)
 *   - src/app/apple-icon.png                (180×180)
 *   - public/images/brand/icon-512.png      (512×512, manifest)
 *
 * Source artwork: public/images/brand/phoenix.png (keyed from the supplied JPG via
 * scripts/prepare-phoenix.mjs). Usage: node scripts/generate-assets.mjs
 */
import { launch } from "./qa/browser.mjs";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const phoenix = await readFile(path.join(root, "public/images/brand/phoenix.png"));
const phoenixData = `data:image/png;base64,${phoenix.toString("base64")}`;
const inter = (await readFile(path.join(root, "src/fonts/inter-latin-wght-normal.woff2"))).toString("base64");
const caveat = (await readFile(path.join(root, "src/fonts/caveat-latin-700-normal.woff2"))).toString("base64");

const fontCss = `
@font-face{font-family:"Inter";src:url(data:font/woff2;base64,${inter}) format("woff2");font-weight:100 900}
@font-face{font-family:"Caveat";src:url(data:font/woff2;base64,${caveat}) format("woff2");font-weight:700}
`;

const og = `<!doctype html><html><head><meta charset="utf-8"><style>${fontCss}
html,body{margin:0;width:1200px;height:630px;overflow:hidden}
body{font-family:Inter,sans-serif;background:#07070f;color:#fff;position:relative;
background-image:radial-gradient(70rem 36rem at 80% -20%,rgba(124,44,245,.32),transparent 60%),radial-gradient(50rem 30rem at -10% 110%,rgba(255,31,143,.18),transparent 60%),radial-gradient(40rem 26rem at 110% 100%,rgba(31,123,255,.2),transparent 60%)}
.art{position:absolute;right:20px;top:70px;width:640px;filter:drop-shadow(0 30px 60px rgba(124,44,245,.45))}
.text{position:absolute;left:72px;top:120px;width:560px}
h1{font-size:82px;line-height:1.0;margin:0;letter-spacing:-.03em;font-weight:800}
h1 span{background:linear-gradient(90deg,#ff1f8f 0%,#7c2cf5 55%,#1f7bff 100%);-webkit-background-clip:text;background-clip:text;color:transparent}
p{font-size:24px;line-height:1.45;color:#d2d6e2;margin:26px 0 0;max-width:520px}
.brand{position:absolute;left:72px;bottom:56px;display:flex;align-items:center;gap:16px}
.brand img{height:64px}
.brand b{font-size:28px;display:block;letter-spacing:-.02em}
.brand b span{background:linear-gradient(90deg,#ff1f8f,#7c2cf5 55%,#1f7bff);-webkit-background-clip:text;background-clip:text;color:transparent}
.brand small{font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:#aab0c3;font-weight:700}
.hand{position:absolute;right:80px;bottom:60px;font-family:Caveat,cursive;font-size:38px;color:rgba(255,255,255,.9);text-align:right;line-height:1.05}
</style></head><body>
<img class="art" src="${phoenixData}" alt="">
<div class="text">
  <h1>Maler &amp; Gipser<br><span>in Glarus</span></h1>
  <p>Fassaden · Malerarbeiten · Gipserarbeiten · Neubau &amp; Renovation</p>
</div>
<div class="hand">Aus Glarus.<br>Für schöne Lebensräume.</div>
<div class="brand"><img src="${phoenixData}" alt=""><div><b>Maler <span>Phönix</span></b><small>Farbe schafft Lebensräume</small></div></div>
</body></html>`;

const browser = await launch();
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.setContent(og, { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  await writeFile(path.join(root, "public/images/brand/og-default.png"), await page.screenshot({ type: "png" }));
  console.log("✓ public/images/brand/og-default.png");
} finally {
  await browser.close();
}

// Icons: phoenix on a dark rounded square
async function icon(size, file) {
  const pad = Math.round(size * 0.1);
  const art = await sharp(phoenix)
    .resize({ width: size - pad * 2, height: size - pad * 2, fit: "inside" })
    .toBuffer();
  const r = Math.round(size * 0.22);
  const mask = Buffer.from(`<svg width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${r}" fill="#07070f"/></svg>`);
  const out = await sharp(mask).composite([{ input: art, gravity: "centre" }]).png().toBuffer();
  await writeFile(path.join(root, file), out);
  console.log(`✓ ${file}`);
}
await icon(64, "src/app/icon.png");
await icon(180, "src/app/apple-icon.png");
await icon(512, "public/images/brand/icon-512.png");
