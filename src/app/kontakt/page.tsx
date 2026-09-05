import type { Metadata } from "next";
import { company, fullAddress, mailHref, mapsHref, telHref, whatsappHref } from "@/content/company";
import { PageHero } from "@/components/layout/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { ClockIcon, MailIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { contactPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Kontakt & Offerte anfragen",
  description: `Kontaktieren Sie Maler Phönix in Näfels: Telefon ${company.contact.phoneDisplay}, E-Mail oder Offertformular. Kostenlose Besichtigung und unverbindliche Offerte im Kanton Glarus.`,
  path: "/kontakt",
});

export default function KontaktPage() {
  return (
    <>
      <JsonLd data={contactPageSchema()} />
      <PageHero
        eyebrow="Kontakt"
        title="Sprechen wir über Ihr Projekt"
        text="Kostenlose Besichtigung, unverbindliche Offerte, Antwort innert eines Arbeitstages."
        crumbs={[{ name: "Kontakt", path: "/kontakt" }]}
        compact
      />

      <Section tone="paper">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
          <div id="kontaktdaten" className="scroll-mt-24 space-y-4">
            <SectionHeading title="Direkt erreichen" text="Rufen Sie an, schreiben Sie uns oder kommen Sie vorbei." />
            <ul className="mt-6 space-y-3">
              <ContactItem href={telHref} icon={<PhoneIcon size={22} />} label="Telefon" value={company.contact.phoneDisplay} />
              {whatsappHref && (
                <ContactItem href={whatsappHref} icon={<WhatsAppIcon size={22} />} label="WhatsApp" value="Nachricht senden" external />
              )}
              <ContactItem href={mailHref} icon={<MailIcon size={22} />} label="E-Mail" value={company.contact.email} />
              <ContactItem
                href={mapsHref}
                icon={<PinIcon size={22} />}
                label="Adresse"
                value={
                  <>
                    {company.legalName}
                    <br />
                    {fullAddress}
                  </>
                }
                external
              />
            </ul>
            <div className="rounded-2xl border border-ink-100 bg-white p-5">
              <p className="inline-flex items-center gap-2 font-display font-bold text-ink-900">
                <ClockIcon size={20} className="text-brand-magenta" />
                Öffnungszeiten
              </p>
              <ul className="mt-3 space-y-1 text-[15px] text-ink-700">
                {company.openingHours.map((h) => (
                  <li key={`${h.label}-${h.opens}`} className="flex justify-between gap-4">
                    <span>{h.label}</span>
                    <span className="font-medium tabular-nums">
                      {h.opens} – {h.closes}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-sm text-ink-500">{company.openingHoursNote}</p>
            </div>
          </div>

          <div id="offerte" className="scroll-mt-24">
            <div className="rounded-3xl border border-ink-100 bg-white p-6 shadow-card sm:p-8 lg:p-10">
              <h2 className="font-display text-2xl font-bold text-ink-900 sm:text-3xl">Offerte anfragen</h2>
              <p className="mt-2 text-ink-600">Füllen Sie das Formular aus – wir melden uns innert eines Arbeitstages.</p>
              <div className="mt-8">
                <QuoteForm />
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="tint" padding="tight">
        <div className="container-x">
          <div className="overflow-hidden rounded-3xl border border-ink-100 bg-white">
            <iframe
              title={`Standort ${company.legalName} auf der Karte`}
              src={`https://www.google.com/maps?q=${encodeURIComponent(fullAddress)}&output=embed&hl=de`}
              width="100%"
              height="380"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="block w-full"
            />
          </div>
          <p className="mt-3 text-xs text-ink-500">
            Die Karte wird von Google Maps geladen. Es gelten die Datenschutzbestimmungen von Google.{" "}
            <a href={mapsHref} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-magenta underline-offset-4 hover:underline">
              In Google Maps öffnen
            </a>
          </p>
        </div>
      </Section>
    </>
  );
}

function ContactItem({ href, icon, label, value, external }: { href: string; icon: React.ReactNode; label: string; value: React.ReactNode; external?: boolean }) {
  return (
    <li>
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="group flex items-start gap-4 rounded-2xl border border-ink-100 bg-white p-5 transition-all hover:-translate-y-0.5 hover:shadow-card"
      >
        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ink-50 text-brand-magenta group-hover:bg-ink-500 group-hover:text-white">
          {icon}
        </span>
        <span>
          <span className="block text-xs font-bold uppercase tracking-[0.16em] text-ink-500">{label}</span>
          <span className="mt-1 block font-semibold text-ink-900">{value}</span>
        </span>
      </a>
    </li>
  );
}
