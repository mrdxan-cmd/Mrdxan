/**
 * Checks that every URL of the live site (scripts/output/live-urls.json, produced by
 * crawl-live-site.mjs) resolves on the NEW site – either directly (200) or through a
 * permanent redirect (301/308) to a page that returns 200.
 *
 * Usage: node scripts/check-redirects.mjs http://localhost:3000
 *        node scripts/check-redirects.mjs https://<preview>.vercel.app
 */
import { readFile } from "node:fs/promises";

const target = (process.argv[2] ?? "http://localhost:3000").replace(/\/+$/, "");
let urls;
try {
  urls = JSON.parse(await readFile(new URL("./output/live-urls.json", import.meta.url), "utf8"));
} catch {
  console.error("scripts/output/live-urls.json not found – run `node scripts/crawl-live-site.mjs` first.");
  process.exit(2);
}

let failures = 0;
for (const entry of urls) {
  if (entry.status && entry.status >= 400) continue; // already dead on the live site
  const pathname = new URL(entry.url).pathname;
  const res = await fetch(target + pathname, { redirect: "manual" });
  if (res.status === 200) {
    console.log(`PASS 200      ${pathname}`);
    continue;
  }
  if (res.status === 301 || res.status === 308) {
    const loc = res.headers.get("location") ?? "";
    const locPath = loc.startsWith("http") ? new URL(loc).pathname : loc;
    const final = await fetch(target + locPath, { redirect: "manual" });
    if (final.status === 200) {
      console.log(`PASS ${res.status} → ${locPath.padEnd(28)} ${pathname}`);
      continue;
    }
    failures += 1;
    console.log(`FAIL ${res.status} → ${locPath} (${final.status})  ${pathname}`);
    continue;
  }
  failures += 1;
  console.log(`FAIL ${res.status}      ${pathname}   ← add a rule to src/config/redirects.ts`);
}
console.log(`\n${urls.length} URLs checked, ${failures} missing`);
process.exit(failures ? 1 : 0);
