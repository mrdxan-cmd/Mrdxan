import { z } from "zod";
import { services } from "@/content/services";

export const serviceOptions = [
  ...services.map((s) => ({ value: s.slug, label: s.label })),
  { value: "sonstiges", label: "Sonstiges / Beratung" },
] as const;

const serviceValues = serviceOptions.map((o) => o.value) as [string, ...string[]];

/**
 * Validation for the quote form. The homepage uses the compact variant from the
 * mockup (Name, E-Mail, Telefon, Nachricht) – therefore location and service are
 * optional; the full form on /kontakt shows them as additional fields.
 */
export const quoteSchema = z.object({
  name: z.string().trim().min(2, "Bitte geben Sie Ihren Namen an.").max(120),
  phone: z
    .string()
    .trim()
    .min(7, "Bitte geben Sie Ihre Telefonnummer an.")
    .max(30)
    .regex(/^[+0-9 ()/.-]+$/, "Bitte geben Sie eine gültige Telefonnummer an."),
  email: z.string().trim().toLowerCase().email("Bitte geben Sie eine gültige E-Mail-Adresse an.").max(200),
  location: z.string().trim().max(120).optional().or(z.literal("")),
  service: z.enum(serviceValues).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Beschreiben Sie Ihr Projekt bitte in ein paar Sätzen.").max(4000),
  consent: z.literal("on", { message: "Bitte stimmen Sie der Datenschutzerklärung zu." }),
  /** Honeypot – must stay empty */
  website: z.string().max(0).optional(),
});

export type QuoteInput = z.infer<typeof quoteSchema>;
export type QuoteFieldErrors = Partial<Record<keyof QuoteInput, string>>;

export interface QuoteState {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: QuoteFieldErrors;
  /** Echo of submitted values to repopulate the form on validation errors. */
  values?: Partial<Record<keyof QuoteInput, string>>;
}
