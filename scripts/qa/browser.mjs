/**
 * Launches Chromium for the QA scripts. Uses Playwright's bundled browser when
 * available, otherwise a system/pre-installed executable (PLAYWRIGHT_CHROMIUM_PATH
 * or /opt/pw-browsers/chromium in the remote build environment).
 */
import { chromium } from "playwright";
import { existsSync } from "node:fs";

export async function launch(options = {}) {
  const candidates = [process.env.PLAYWRIGHT_CHROMIUM_PATH, "/opt/pw-browsers/chromium"].filter(Boolean);
  try {
    return await chromium.launch(options);
  } catch (err) {
    const executablePath = candidates.find((p) => existsSync(p));
    if (!executablePath) throw err;
    return chromium.launch({ ...options, executablePath });
  }
}
