"use client";

import Link from "next/link";
import { useActionState, useId, useState } from "react";
import { submitQuote } from "./actions";
import { serviceOptions, type QuoteState } from "./quote-schema";
import { CheckIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

const initialState: QuoteState = { status: "idle" };

const inputClass =
  "block w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-[15px] text-ink-900 placeholder:text-ink-400 transition-colors focus:border-ember-500 focus:outline-none focus:ring-4 focus:ring-ember-500/15 aria-[invalid=true]:border-flame-500";

export function QuoteForm({ defaultService }: { defaultService?: string }) {
  const [state, action, pending] = useActionState(submitQuote, initialState);
  const id = useId();
  const errors = state.errors ?? {};

  // Controlled values: React 19 resets uncontrolled form fields after a server
  // action completes – we keep what the visitor typed when validation fails.
  const [values, setValues] = useState<Record<string, string>>({ service: defaultService ?? "" });
  const [consent, setConsent] = useState(false);
  const set = (name: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setValues((v) => ({ ...v, [name]: e.target.value }));

  if (state.status === "success") {
    return (
      <div role="status" aria-live="polite" className="rounded-2xl border border-ember-200 bg-ember-50 p-8 text-center">
        <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-ember-500 text-white">
          <CheckIcon size={28} strokeWidth={2.5} />
        </span>
        <h3 className="mt-5 font-display text-2xl font-bold text-ink-900">Anfrage gesendet</h3>
        <p className="mt-2 text-ink-700">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={action} noValidate className="space-y-5" aria-describedby={state.status === "error" ? `${id}-status` : undefined}>
      {state.status === "error" && (
        <p id={`${id}-status`} role="alert" className="rounded-xl border border-flame-500/30 bg-flame-500/5 px-4 py-3 text-sm font-medium text-flame-600">
          {state.message}
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={`${id}-name`} label="Name" error={errors.name}>
          <input id={`${id}-name`} name="name" type="text" autoComplete="name" required value={values.name ?? ""} onChange={set("name")} aria-invalid={Boolean(errors.name)} className={inputClass} placeholder="Vor- und Nachname" />
        </Field>
        <Field id={`${id}-phone`} label="Telefon" error={errors.phone}>
          <input id={`${id}-phone`} name="phone" type="tel" autoComplete="tel" required value={values.phone ?? ""} onChange={set("phone")} aria-invalid={Boolean(errors.phone)} className={inputClass} placeholder="079 123 45 67" />
        </Field>
        <Field id={`${id}-email`} label="E-Mail" error={errors.email}>
          <input id={`${id}-email`} name="email" type="email" autoComplete="email" required value={values.email ?? ""} onChange={set("email")} aria-invalid={Boolean(errors.email)} className={inputClass} placeholder="name@beispiel.ch" />
        </Field>
        <Field id={`${id}-location`} label="PLZ / Ort des Objekts" error={errors.location}>
          <input id={`${id}-location`} name="location" type="text" autoComplete="postal-code" required value={values.location ?? ""} onChange={set("location")} aria-invalid={Boolean(errors.location)} className={inputClass} placeholder="8752 Näfels" />
        </Field>
      </div>

      <Field id={`${id}-service`} label="Gewünschte Leistung" error={errors.service}>
        <select id={`${id}-service`} name="service" required value={values.service ?? ""} onChange={set("service")} aria-invalid={Boolean(errors.service)} className={cn(inputClass, "appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23665f56%22 stroke-width=%222%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:20px] bg-[right_1rem_center] bg-no-repeat pr-11")}>
          <option value="" disabled>
            Bitte wählen
          </option>
          {serviceOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </Field>

      <Field id={`${id}-message`} label="Ihr Projekt" error={errors.message}>
        <textarea id={`${id}-message`} name="message" rows={5} required value={values.message ?? ""} onChange={set("message")} aria-invalid={Boolean(errors.message)} className={inputClass} placeholder="Was soll gemacht werden? Ungefähre Fläche, Zustand, Wunschtermin …" />
      </Field>

      {/* Honeypot – hidden from humans */}
      <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor={`${id}-website`}>Website</label>
        <input id={`${id}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      <div>
        <label className="flex items-start gap-3 text-sm text-ink-700">
          <input type="checkbox" name="consent" required checked={consent} onChange={(e) => setConsent(e.target.checked)} aria-invalid={Boolean(errors.consent)} className="mt-0.5 h-5 w-5 shrink-0 rounded border-ink-300 accent-ember-500" />
          <span>
            Ich habe die{" "}
            <Link href="/datenschutz" className="font-semibold text-ember-600 underline-offset-4 hover:underline">
              Datenschutzerklärung
            </Link>{" "}
            gelesen und bin mit der Verarbeitung meiner Angaben zur Bearbeitung der Anfrage einverstanden.
          </span>
        </label>
        {errors.consent && <p className="mt-1.5 text-sm font-medium text-flame-600">{errors.consent}</p>}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-ember-500 px-7 text-base font-semibold text-white shadow-[0_10px_30px_-10px_rgb(244_95_20/0.7)] transition-colors hover:bg-ember-600 disabled:opacity-60 sm:w-auto"
      >
        {pending ? "Wird gesendet …" : "Offerte anfragen"}
      </button>
      <p className="text-xs text-ink-500">Kostenlos und unverbindlich. Wir verwenden Ihre Angaben ausschliesslich zur Bearbeitung Ihrer Anfrage.</p>
    </form>
  );
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-ink-800">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm font-medium text-flame-600">
          {error}
        </p>
      )}
    </div>
  );
}
