/**
 * Portable e-mail delivery for the quote form.
 *
 * Provider is chosen by environment variables (see .env.example):
 *   - RESEND_API_KEY + QUOTE_TO_EMAIL           → Resend HTTP API (works on Vercel & any Node host)
 *   - QUOTE_WEBHOOK_URL                          → generic JSON POST (Make, Zapier, n8n, own backend …)
 *   - none (development)                         → logs the request to the server console
 *   - none (production)                          → returns { ok: false } so the UI shows a fallback (phone/e-mail)
 */
import { company } from "@/content/company";

export interface QuoteMail {
  name: string;
  phone: string;
  email: string;
  location: string;
  service: string;
  message: string;
}

export interface MailResult {
  ok: boolean;
  provider: "resend" | "webhook" | "log" | "none";
  error?: string;
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);
}

function renderText(q: QuoteMail): string {
  return [
    `Neue Offertanfrage über ${company.brand} Website`,
    "",
    `Name:      ${q.name}`,
    `Telefon:   ${q.phone}`,
    `E-Mail:    ${q.email}`,
    `Objekt:    ${q.location}`,
    `Leistung:  ${q.service}`,
    "",
    "Nachricht:",
    q.message,
  ].join("\n");
}

function renderHtml(q: QuoteMail): string {
  const row = (label: string, value: string) =>
    `<tr><td style="padding:6px 12px 6px 0;color:#665f56;white-space:nowrap">${label}</td><td style="padding:6px 0;font-weight:600">${escapeHtml(value)}</td></tr>`;
  return `<!doctype html><html lang="de"><body style="font-family:Inter,Arial,sans-serif;color:#211f1c;line-height:1.5">
  <h2 style="margin:0 0 12px;color:#d9470a">Neue Offertanfrage</h2>
  <table style="border-collapse:collapse">${row("Name", q.name)}${row("Telefon", q.phone)}${row("E-Mail", q.email)}${row("Objekt", q.location)}${row("Leistung", q.service)}</table>
  <h3 style="margin:20px 0 6px">Nachricht</h3>
  <p style="white-space:pre-wrap">${escapeHtml(q.message)}</p>
  <p style="margin-top:24px;color:#8b8378;font-size:12px">Gesendet über das Offertformular auf ${escapeHtml(process.env.NEXT_PUBLIC_SITE_URL ?? "maler-gl.ch")}</p>
</body></html>`;
}

export async function sendQuoteMail(quote: QuoteMail): Promise<MailResult> {
  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.QUOTE_TO_EMAIL ?? company.contact.email;
  const from = process.env.QUOTE_FROM_EMAIL ?? `${company.brand} Website <no-reply@maler-gl.ch>`;
  const subject = `Offertanfrage: ${quote.service} – ${quote.name}`;

  if (resendKey) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from,
          to: [to],
          reply_to: quote.email,
          subject,
          text: renderText(quote),
          html: renderHtml(quote),
        }),
      });
      if (!res.ok) {
        const body = await res.text();
        console.error("[quote] Resend error", res.status, body);
        return { ok: false, provider: "resend", error: `Resend responded with ${res.status}` };
      }
      return { ok: true, provider: "resend" };
    } catch (err) {
      console.error("[quote] Resend request failed", err);
      return { ok: false, provider: "resend", error: String(err) };
    }
  }

  const webhook = process.env.QUOTE_WEBHOOK_URL;
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...quote, subject, to, receivedAt: new Date().toISOString() }),
      });
      if (!res.ok) {
        console.error("[quote] Webhook error", res.status);
        return { ok: false, provider: "webhook", error: `Webhook responded with ${res.status}` };
      }
      return { ok: true, provider: "webhook" };
    } catch (err) {
      console.error("[quote] Webhook request failed", err);
      return { ok: false, provider: "webhook", error: String(err) };
    }
  }

  if (process.env.NODE_ENV !== "production" || process.env.QUOTE_ALLOW_LOG_ONLY === "true") {
    console.info("[quote] No mail provider configured – logging request:\n" + renderText(quote));
    return { ok: true, provider: "log" };
  }

  console.error("[quote] No mail provider configured in production (set RESEND_API_KEY or QUOTE_WEBHOOK_URL).");
  return { ok: false, provider: "none", error: "No provider configured" };
}
