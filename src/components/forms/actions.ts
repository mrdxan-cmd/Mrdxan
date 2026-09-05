"use server";

import { headers } from "next/headers";
import { quoteSchema, serviceOptions, type QuoteState } from "./quote-schema";
import { sendQuoteMail } from "@/lib/mail";
import { company } from "@/content/company";

/** Very small in-memory rate limiter (per server instance). */
const attempts = new Map<string, { count: number; reset: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function rateLimited(key: string): boolean {
  const now = Date.now();
  const entry = attempts.get(key);
  if (!entry || entry.reset < now) {
    attempts.set(key, { count: 1, reset: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

function pick(formData: FormData, key: string): string {
  const v = formData.get(key);
  return typeof v === "string" ? v : "";
}

export async function submitQuote(_prev: QuoteState, formData: FormData): Promise<QuoteState> {
  const raw = {
    name: pick(formData, "name"),
    phone: pick(formData, "phone"),
    email: pick(formData, "email"),
    location: pick(formData, "location"),
    service: pick(formData, "service"),
    message: pick(formData, "message"),
    consent: pick(formData, "consent"),
    website: pick(formData, "website"),
  };

  // Honeypot filled → pretend success without sending.
  if (raw.website) {
    return { status: "success", message: "Vielen Dank! Wir melden uns so schnell wie möglich bei Ihnen." };
  }

  const parsed = quoteSchema.safeParse(raw);
  if (!parsed.success) {
    const errors: QuoteState["errors"] = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as keyof typeof raw;
      if (field && !errors[field]) errors[field] = issue.message;
    }
    return {
      status: "error",
      message: "Bitte prüfen Sie die markierten Felder.",
      errors,
      values: { ...raw, consent: raw.consent },
    };
  }

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  if (rateLimited(ip)) {
    return {
      status: "error",
      message: `Zu viele Anfragen. Bitte versuchen Sie es später erneut oder rufen Sie uns an: ${company.contact.phoneDisplay}.`,
      values: raw,
    };
  }

  const serviceLabel = serviceOptions.find((o) => o.value === parsed.data.service)?.label ?? parsed.data.service;
  const result = await sendQuoteMail({
    name: parsed.data.name,
    phone: parsed.data.phone,
    email: parsed.data.email,
    location: parsed.data.location,
    service: serviceLabel,
    message: parsed.data.message,
  });

  if (!result.ok) {
    return {
      status: "error",
      message: `Ihre Anfrage konnte leider nicht gesendet werden. Bitte rufen Sie uns an (${company.contact.phoneDisplay}) oder schreiben Sie an ${company.contact.email}.`,
      values: raw,
    };
  }

  return {
    status: "success",
    message: "Vielen Dank für Ihre Anfrage! Wir melden uns in der Regel innert eines Arbeitstages bei Ihnen.",
  };
}
