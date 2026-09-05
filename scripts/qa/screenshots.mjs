/**
 * Full-page screenshots of every route at the required viewport widths
 * (360, 390, 430, 768, 1024, 1440) + checks for horizontal overflow.
 *
 * Usage: QA_BASE_URL=http://localhost:3000 node scripts/qa/screenshots.mjs
 * Output: scripts/output/screenshots/<route>--<width>.png
 */
import { launch } from "./browser.mjs";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { pageRoutes, viewports, baseUrl } from "./routes.mjs";

const outDir = path.resolve("scripts/output/screenshots");
await mkdir(outDir, { recursive: true });

const routes = [...pageRoutes, ...(process.env.QA_EXTRA_ROUTES?.split(",").filter(Boolean) ?? [])];
const browser = await launch();
let failures = 0;
const summary = [];

try {
  for (const vp of viewports) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 1,
      isMobile: vp.mobile,
      hasTouch: vp.mobile,
      locale: "de-CH",
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    const consoleErrors = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") consoleErrors.push(msg.text());
    });
    page.on("pageerror", (err) => consoleErrors.push(String(err)));

    for (const route of routes) {
      const res = await page.goto(baseUrl + route, { waitUntil: "networkidle" });
      const status = res?.status();
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      const file = `${route === "/" ? "home" : route.slice(1).replace(/\//g, "_")}--${vp.name}.png`;
      await page.screenshot({ path: path.join(outDir, file), fullPage: true });
      const bad = status !== 200 || overflow > 0;
      if (bad) failures += 1;
      summary.push({ route, width: vp.name, status, overflow, file, ok: !bad });
      console.log(`${bad ? "FAIL" : "PASS"}  ${vp.name.padStart(4)}px ${route.padEnd(32)} status=${status} overflow=${overflow}px → ${file}`);
    }

    // Mobile menu interaction
    if (vp.mobile && vp.width < 1024) {
      await page.goto(baseUrl + "/", { waitUntil: "networkidle" });
      await page.getByRole("button", { name: "Menü öffnen" }).click();
      const dialog = page.getByRole("dialog", { name: "Navigation" });
      const visible = await dialog.isVisible();
      await page.screenshot({ path: path.join(outDir, `menu-open--${vp.name}.png`), fullPage: false });
      await page.getByRole("button", { name: "Menü schliessen" }).click();
      const hiddenAfter = await dialog.isHidden();
      const okMenu = visible && hiddenAfter;
      if (!okMenu) failures += 1;
      console.log(`${okMenu ? "PASS" : "FAIL"}  ${vp.name.padStart(4)}px mobile menu open/close`);
      summary.push({ route: "mobile-menu", width: vp.name, ok: okMenu });
    }

    if (consoleErrors.length) {
      // Filter noisy third-party (Google Maps iframe is blocked in sandboxes)
      const relevant = consoleErrors.filter((e) => !/maps\.google|googleapis|ERR_|net::/i.test(e));
      if (relevant.length) {
        failures += 1;
        console.log(`FAIL  ${vp.name}px console errors:\n  ${relevant.join("\n  ")}`);
      }
    }
    await context.close();
  }
} finally {
  await browser.close();
}

if (process.env.QA_REPORT) {
  const { writeFile } = await import("node:fs/promises");
  await writeFile(path.resolve("scripts/output/screenshots.json"), JSON.stringify(summary, null, 2));
}
console.log(`\n${summary.filter((s) => s.ok).length} passed, ${failures} failed`);
process.exit(failures ? 1 : 0);
