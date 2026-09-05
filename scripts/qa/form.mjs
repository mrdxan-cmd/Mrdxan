/**
 * Exercises the quote form with Playwright:
 *   1. empty submit → validation errors shown, nothing sent
 *   2. invalid e-mail → field error
 *   3. valid submit → success state
 *
 * Run the server with QUOTE_ALLOW_LOG_ONLY=true (or a configured provider).
 * Usage: QA_BASE_URL=http://localhost:3000 node scripts/qa/form.mjs
 */
import { launch } from "./browser.mjs";
import { baseUrl } from "./routes.mjs";

const browser = await launch();
let failures = 0;
const check = (name, cond, detail = "") => {
  if (!cond) failures += 1;
  console.log(`${cond ? "PASS" : "FAIL"}  ${name}${detail ? ` — ${detail}` : ""}`);
};

try {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(baseUrl + "/kontakt#offerte", { waitUntil: "networkidle" });

  const form = page.locator("form").first();
  const submit = form.getByRole("button", { name: /Offerte anfordern/ });

  // 1. Empty submit (browser validation is disabled via noValidate, so the server action validates)
  await submit.click();
  const alert = form.locator('p[role="alert"]');
  await alert.waitFor({ timeout: 15000 });
  const alertText = await alert.textContent();
  check("empty submit shows summary error", /markierten Felder/.test(alertText ?? ""), alertText ?? "");
  const errorCount = await form.locator("p.text-flame-600").count();
  check("empty submit shows field errors", errorCount >= 4, `${errorCount} field errors`);

  // 2. Invalid e-mail
  await form.locator('input[name="name"]').fill("Test Person");
  await form.locator('input[name="phone"]').fill("079 000 00 00");
  await form.locator('input[name="email"]').fill("keine-email");
  await form.locator('input[name="location"]').fill("8752 Näfels");
  await form.locator('select[name="service"]').selectOption("malerarbeiten");
  check("full form shows location and service fields", (await form.locator('input[name="location"]').count()) === 1 && (await form.locator('select[name="service"]').count()) === 1);
  await form.locator('textarea[name="message"]').fill("QA-Testanfrage: 4.5-Zimmer-Wohnung, Wände und Decken streichen.");
  await form.locator('input[name="consent"]').check();
  await submit.click();
  await page.waitForTimeout(1500);
  const emailError = await form.locator('input[name="email"] ~ p, input[name="email"] + p').first().textContent().catch(() => "");
  const anyEmailError = await form.getByText("gültige E-Mail-Adresse").count();
  check("invalid e-mail is rejected", anyEmailError > 0, emailError ?? "");
  const nameKept = await form.locator('input[name="name"]').inputValue();
  check("entered values are kept after validation error", nameKept === "Test Person", nameKept);

  // 3. Valid submit
  await form.locator('input[name="email"]').fill("qa@example.com");
  await form.locator('input[name="consent"]').check();
  await submit.click();
  const status = page.locator('div[role="status"]');
  await status.waitFor({ timeout: 20000 });
  const statusText = await status.textContent();
  check("valid submit shows success", /Anfrage gesendet/.test(statusText ?? ""), statusText ?? "");

  // 4. Homepage compact form (mockup: Name · E-Mail · Telefon · Nachricht)
  await page.goto(baseUrl + "/#offerte", { waitUntil: "networkidle" });
  const homeForm = page.locator("#offerte form").first();
  const compactFields = await homeForm.locator("input:not([type=hidden]):not([type=checkbox]):not([name=website]), textarea").count();
  check("homepage compact form has 4 visible fields", compactFields === 4, `${compactFields} fields`);
  check("homepage compact form hides service select", (await homeForm.locator("select").count()) === 0);
  await homeForm.locator('input[name="name"]').fill("Test Person");
  await homeForm.locator('input[name="email"]').fill("qa@example.com");
  await homeForm.locator('input[name="phone"]').fill("079 000 00 00");
  await homeForm.locator('textarea[name="message"]').fill("QA-Testanfrage über das Startseiten-Formular.");
  await homeForm.locator('input[name="consent"]').check();
  await homeForm.getByRole("button", { name: /Offerte anfordern/ }).click();
  const homeStatus = page.locator('#offerte div[role="status"]');
  await homeStatus.waitFor({ timeout: 20000 });
  check("homepage compact form submits successfully", /Anfrage gesendet/.test((await homeStatus.textContent()) ?? ""));

  // 5. Service page form preselects the service
  await page.goto(baseUrl + "/leistungen/fassaden#offerte", { waitUntil: "networkidle" });
  const preselected = await page.locator('select[name="service"]').inputValue();
  check("service page preselects service", preselected === "fassaden", preselected);
} finally {
  await browser.close();
}

console.log(`\n${failures ? failures + " failed" : "all form checks passed"}`);
process.exit(failures ? 1 : 0);
