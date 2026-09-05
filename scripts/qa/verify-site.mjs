/**
 * Verifies a running build (default http://localhost:3000):
 *   - every route responds 200 and contains title/description/canonical/OG tags
 *   - every internal link found on those pages resolves (no 404s)
 *   - tel:/mailto: links match the central contact data
 *   - JSON-LD blocks parse and contain the expected @types
 *   - sitemap.xml, robots.txt, manifest respond correctly
 *   - configured redirects return 308 with the expected Location
 *
 * Usage: QA_BASE_URL=http://localhost:3000 node scripts/qa/verify-site.mjs
 */
import { pageRoutes, baseUrl } from "./routes.mjs";
import { readFile } from "node:fs/promises";

const results = [];
let failures = 0;

function ok(name, detail = "") {
  results.push({ ok: true, name, detail });
}
function fail(name, detail = "") {
  failures += 1;
  results.push({ ok: false, name, detail });
}

async function get(path, opts = {}) {
  const res = await fetch(baseUrl + path, { redirect: "manual", ...opts });
  const text = await res.text();
  return { res, text };
}

function attr(html, re) {
  const m = html.match(re);
  return m ? m[1] : null;
}

// ---- Load central content for cross checks (parse TS loosely) ----
const companySrc = await readFile(new URL("../../src/content/company.ts", import.meta.url), "utf8");
const phoneE164 = attr(companySrc, /phoneE164:\s*"([^"]+)"/);
const email = attr(companySrc, /email:\s*"([^"]+)"/);
const redirectsSrc = await readFile(new URL("../../src/config/redirects.ts", import.meta.url), "utf8");
const redirectRules = [...redirectsSrc.matchAll(/source:\s*"([^"]+)",\s*destination:\s*"([^"]+)"/g)].map((m) => ({ source: m[1], destination: m[2] }));

// ---- Pages ----
const seenLinks = new Set();
for (const path of pageRoutes) {
  const { res, text } = await get(path);
  if (res.status !== 200) {
    fail(`GET ${path}`, `status ${res.status}`);
    continue;
  }
  ok(`GET ${path}`, "200");

  const title = attr(text, /<title>([^<]*)<\/title>/);
  const description = attr(text, /<meta name="description" content="([^"]*)"/);
  const canonical = attr(text, /<link rel="canonical" href="([^"]*)"/);
  const ogTitle = attr(text, /<meta property="og:title" content="([^"]*)"/);
  const ogImage = attr(text, /<meta property="og:image" content="([^"]*)"/);
  const h1Count = (text.match(/<h1[\s>]/g) ?? []).length;
  const lang = attr(text, /<html[^>]*lang="([^"]*)"/);

  if (!title) fail(`${path} <title>`); else ok(`${path} <title>`, title);
  if (!description) fail(`${path} meta description`); else if (description.length > 165) fail(`${path} meta description length`, `${description.length} chars`); else ok(`${path} meta description`, `${description.length} chars`);
  if (!canonical) fail(`${path} canonical`); else ok(`${path} canonical`, canonical);
  if (!ogTitle) fail(`${path} og:title`); else ok(`${path} og:title`);
  if (!ogImage) fail(`${path} og:image`); else ok(`${path} og:image`, ogImage);
  if (h1Count !== 1) fail(`${path} exactly one <h1>`, `found ${h1Count}`); else ok(`${path} exactly one <h1>`);
  if (lang !== "de") fail(`${path} html lang`, String(lang)); else ok(`${path} html lang`, "de");

  // JSON-LD
  const blocks = [...text.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  const types = [];
  for (const b of blocks) {
    try {
      const parsed = JSON.parse(b);
      for (const node of Array.isArray(parsed) ? parsed : [parsed]) types.push(Array.isArray(node["@type"]) ? node["@type"].join("+") : node["@type"]);
    } catch (e) {
      fail(`${path} JSON-LD parse`, String(e));
    }
  }
  if (types.length) ok(`${path} JSON-LD`, types.join(", ")); else fail(`${path} JSON-LD`, "no blocks");
  if (path !== "/" && !types.includes("BreadcrumbList")) fail(`${path} BreadcrumbList schema`);
  if (path === "/" && !types.some((t) => t.includes("LocalBusiness"))) fail(`/ LocalBusiness schema`);
  if (path === "/faq" && !types.includes("FAQPage")) fail(`/faq FAQPage schema`);
  if (path.startsWith("/leistungen/") && !types.includes("Service")) fail(`${path} Service schema`);

  // Contact links
  const telLinks = [...text.matchAll(/href="tel:([^"]+)"/g)].map((m) => m[1]);
  const mailLinks = [...text.matchAll(/href="mailto:([^"]+)"/g)].map((m) => m[1]);
  if (!telLinks.length) fail(`${path} tel: link present`); else if (telLinks.some((t) => t !== phoneE164)) fail(`${path} tel: links match company phone`, telLinks.join(",")); else ok(`${path} tel: links`, `${telLinks.length}× ${phoneE164}`);
  if (!mailLinks.length) fail(`${path} mailto: link present`); else if (mailLinks.some((t) => t !== email)) fail(`${path} mailto: links match company email`, mailLinks.join(",")); else ok(`${path} mailto: links`, `${mailLinks.length}× ${email}`);

  // Collect internal links
  for (const m of text.matchAll(/href="(\/[^"#?]*)(?:[#?][^"]*)?"/g)) seenLinks.add(m[1]);
}

// ---- Internal links resolve ----
for (const link of [...seenLinks].sort()) {
  if (link.startsWith("/_next/")) continue;
  const res = await fetch(baseUrl + link, { redirect: "manual" });
  if (res.status === 200) ok(`link ${link}`, "200");
  else if (res.status === 308 || res.status === 307) ok(`link ${link}`, `${res.status} → ${res.headers.get("location")}`);
  else fail(`link ${link}`, `status ${res.status}`);
}

// ---- Sitemap / robots / manifest ----
{
  const { res, text } = await get("/sitemap.xml");
  const urls = [...text.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  if (res.status !== 200 || !urls.length) fail("sitemap.xml", `status ${res.status}, ${urls.length} urls`);
  else ok("sitemap.xml", `${urls.length} URLs: ${urls.map((u) => new URL(u).pathname).join(" ")}`);
  for (const u of urls) {
    const p = new URL(u).pathname;
    if (!pageRoutes.includes(p) && !p.startsWith("/projekte/")) fail("sitemap URL known", p);
    if (p === "/impressum" || p === "/datenschutz") fail("sitemap excludes legal pages", p);
  }
  if (urls.some((u) => u.includes("localhost"))) fail("sitemap uses production host", urls[0]);
  else ok("sitemap uses configured host", urls[0]);
}
{
  const { res, text } = await get("/robots.txt");
  if (res.status !== 200) fail("robots.txt", `status ${res.status}`);
  else ok("robots.txt", text.replace(/\n/g, " | "));
}
{
  const { res, text } = await get("/manifest.webmanifest");
  try {
    const json = JSON.parse(text);
    if (res.status === 200 && json.name) ok("manifest.webmanifest", json.name); else fail("manifest.webmanifest", `status ${res.status}`);
  } catch {
    fail("manifest.webmanifest", "invalid JSON");
  }
}
for (const asset of ["/icon.svg", "/apple-icon.png", "/images/brand/og-default.png", "/images/brand/phoenix.svg", "/images/brand/icon-512.png"]) {
  const res = await fetch(baseUrl + asset);
  if (res.status === 200) ok(`asset ${asset}`, res.headers.get("content-type") ?? ""); else fail(`asset ${asset}`, `status ${res.status}`);
}

// ---- 404 ----
{
  const res = await fetch(baseUrl + "/diese-seite-gibt-es-nicht");
  if (res.status === 404) ok("404 page", "status 404"); else fail("404 page", `status ${res.status}`);
}

// ---- Redirects ----
for (const rule of redirectRules) {
  const res = await fetch(baseUrl + rule.source, { redirect: "manual" });
  const loc = res.headers.get("location") ?? "";
  const locPath = loc.startsWith("http") ? new URL(loc).pathname : loc;
  if ((res.status === 308 || res.status === 301) && locPath === rule.destination) ok(`redirect ${rule.source}`, `${res.status} → ${rule.destination}`);
  else fail(`redirect ${rule.source}`, `status ${res.status}, location ${loc}`);
}

// ---- Security headers ----
{
  const res = await fetch(baseUrl + "/");
  for (const h of ["x-content-type-options", "x-frame-options", "referrer-policy"]) {
    if (res.headers.get(h)) ok(`header ${h}`, res.headers.get(h)); else fail(`header ${h}`);
  }
  if (res.headers.get("x-powered-by")) fail("x-powered-by removed"); else ok("x-powered-by removed");
}

// ---- Report ----
const lines = results.map((r) => `${r.ok ? "PASS" : "FAIL"}  ${r.name}${r.detail ? `  — ${r.detail}` : ""}`);
console.log(lines.join("\n"));
console.log(`\n${results.length - failures} passed, ${failures} failed`);
if (process.env.QA_REPORT) {
  const { writeFile, mkdir } = await import("node:fs/promises");
  await mkdir(new URL("../output/", import.meta.url), { recursive: true });
  await writeFile(new URL("../output/verify-site.txt", import.meta.url), lines.join("\n") + `\n\n${results.length - failures} passed, ${failures} failed\n`);
}
process.exit(failures ? 1 : 0);
