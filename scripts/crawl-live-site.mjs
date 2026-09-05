/**
 * Crawls the CURRENT live website (read-only) to collect:
 *   - every internal URL (for the redirect map)           → scripts/output/live-urls.json
 *   - page titles, meta descriptions, H1s (SEO reference) → scripts/output/live-pages.json
 *   - every image with alt text, downloaded to            → public/images/imported/
 *
 * It never modifies the live site. Run it on a machine with internet access:
 *   node scripts/crawl-live-site.mjs https://www.maler-gl.ch
 *
 * Afterwards:
 *   1. Map old URLs in src/config/redirects.ts
 *   2. Move real project photos to public/images/projects/<slug>/ and reference them in src/content/projects.ts
 *   3. Compare live-pages.json with the new copy (src/content/*.ts) and preserve valuable SEO wording
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const start = process.argv[2] ?? "https://www.maler-gl.ch";
const origin = new URL(start).origin;
const outDir = path.resolve("scripts/output");
const imgDir = path.resolve("public/images/imported");
await mkdir(outDir, { recursive: true });
await mkdir(imgDir, { recursive: true });

const ua = "Mozilla/5.0 (compatible; MalerPhoenixMigrationBot/1.0; +read-only crawl for site migration)";
const queue = [start];
const seen = new Set();
const pages = [];
const images = new Map();

function normalize(href, base) {
  try {
    const u = new URL(href, base);
    if (u.origin !== origin) return null;
    u.hash = "";
    u.search = "";
    let p = u.pathname.replace(/\/+$/, "") || "/";
    return origin + p;
  } catch {
    return null;
  }
}

function text(re, html) {
  const m = html.match(re);
  return m ? m[1].replace(/\s+/g, " ").trim() : null;
}

// Try the sitemap first
try {
  const sm = await fetch(origin + "/sitemap.xml", { headers: { "user-agent": ua } });
  if (sm.ok) {
    const xml = await sm.text();
    for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
      const n = normalize(m[1], origin);
      if (n) queue.push(n);
    }
    console.log(`sitemap.xml: ${queue.length - 1} URLs`);
  }
} catch (e) {
  console.warn("sitemap.xml not reachable:", e.message);
}

while (queue.length) {
  const url = queue.shift();
  if (seen.has(url)) continue;
  seen.add(url);
  let res;
  try {
    res = await fetch(url, { headers: { "user-agent": ua }, redirect: "follow" });
  } catch (e) {
    pages.push({ url, error: e.message });
    continue;
  }
  const finalUrl = res.url;
  const type = res.headers.get("content-type") ?? "";
  const entry = { url, finalUrl, status: res.status, contentType: type };
  if (type.includes("text/html")) {
    const html = await res.text();
    entry.title = text(/<title[^>]*>([^<]*)<\/title>/i, html);
    entry.description = text(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i, html);
    entry.h1 = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) => m[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim());
    entry.h2 = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map((m) => m[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim());
    entry.canonical = text(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["']/i, html);
    entry.textLength = html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<[^>]+>/g, " ").replace(/\s+/g, " ").trim().length;
    for (const m of html.matchAll(/href=["']([^"'#]+)["']/gi)) {
      const n = normalize(m[1], finalUrl);
      if (n && !seen.has(n)) queue.push(n);
    }
    for (const m of html.matchAll(/<img[^>]+>/gi)) {
      const tag = m[0];
      const src = text(/(?:data-src|src)=["']([^"']+)["']/i, tag);
      const alt = text(/alt=["']([^"']*)["']/i, tag) ?? "";
      if (!src || src.startsWith("data:")) continue;
      const abs = new URL(src, finalUrl).href;
      if (!images.has(abs)) images.set(abs, { src: abs, alt, pages: [url] });
      else images.get(abs).pages.push(url);
    }
  }
  pages.push(entry);
  console.log(`${res.status}  ${url}${entry.title ? `  — ${entry.title}` : ""}`);
}

// Download images
const downloaded = [];
for (const img of images.values()) {
  try {
    const res = await fetch(img.src, { headers: { "user-agent": ua } });
    if (!res.ok) continue;
    const buf = Buffer.from(await res.arrayBuffer());
    const ext = (res.headers.get("content-type") ?? "").split("/")[1]?.split(";")[0] || path.extname(new URL(img.src).pathname).slice(1) || "bin";
    const name = `${String(downloaded.length + 1).padStart(3, "0")}-${path.basename(new URL(img.src).pathname).replace(/[^a-z0-9._-]/gi, "_").slice(0, 60) || "image"}.${ext.replace("jpeg", "jpg")}`;
    await writeFile(path.join(imgDir, name), buf);
    downloaded.push({ ...img, file: `public/images/imported/${name}`, bytes: buf.length });
  } catch (e) {
    console.warn("image failed:", img.src, e.message);
  }
}

await writeFile(path.join(outDir, "live-urls.json"), JSON.stringify(pages.map((p) => ({ url: p.url, status: p.status, finalUrl: p.finalUrl })), null, 2));
await writeFile(path.join(outDir, "live-pages.json"), JSON.stringify(pages, null, 2));
await writeFile(path.join(outDir, "live-images.json"), JSON.stringify(downloaded, null, 2));
console.log(`\n${pages.length} URLs, ${downloaded.length} images downloaded → scripts/output/ and public/images/imported/`);
