import { company, mailHref, telHref } from "@/content/company";
import { Section, SectionHeading } from "@/components/ui/Section";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { MailIcon, PhoneIcon, PinIcon } from "@/components/ui/Icons";
import type { ReactNode } from "react";

/**
 * Mockup: "KONTAKT · Jetzt kostenlose Offerte anfordern." – contact items left,
 * compact form card right, paint splashes in the corners, handwritten note.
 */
export function ContactSection({ compact = true }: { compact?: boolean }) {
  return (
    <Section id="kontakt" tone="paper" className="relative overflow-hidden">
      <div aria-hidden="true" className="splash-brand pointer-events-none absolute -left-16 bottom-0 h-56 w-72 opacity-70" />
      <div aria-hidden="true" className="splash-brand pointer-events-none absolute -right-16 -top-10 h-56 w-72 opacity-70" />
      <div className="container-x relative grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
        <div>
          <SectionHeading
            eyebrow="Kontakt"
            title="Jetzt kostenlose Offerte anfordern."
            text="Unverbindlich, schnell und persönlich. Wir freuen uns auf Ihr Projekt!"
          />
          <ul className="mt-8 grid gap-5 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            <ContactItem href={telHref} icon={<PhoneIcon size={20} strokeWidth={2} />} label={company.contact.phoneDisplay} sub={company.openingHoursShort} />
            <ContactItem href={mailHref} icon={<MailIcon size={20} strokeWidth={2} />} label={company.contact.email} sub="Wir antworten rasch" />
            <ContactItem href="/kontakt#kontaktdaten" icon={<PinIcon size={20} strokeWidth={2} />} label={company.regionLabel} sub="Regional. Persönlich. Zuverlässig." />
          </ul>
          <p className="font-hand mt-10 text-4xl leading-tight text-ink-800 sm:text-5xl">
            Gemeinsam
            <br />
            <span className="text-gradient-brand">schöner wohnen.</span>
          </p>
        </div>
        <div id="offerte" className="scroll-mt-24 rounded-3xl border border-ink-100 bg-white p-6 shadow-card sm:p-8">
          <QuoteForm compact={compact} />
        </div>
      </div>
    </Section>
  );
}

function ContactItem({ href, icon, label, sub }: { href: string; icon: ReactNode; label: string; sub: string }) {
  const external = /^(tel:|mailto:|https?:)/.test(href);
  return (
    <li>
      <a href={href} {...(external && href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="group flex items-center gap-3">
        <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-brand text-white shadow-glow transition-transform group-hover:scale-105">
          {icon}
        </span>
        <span className="min-w-0">
          <span className="block break-words text-[15px] font-bold leading-tight text-ink-900">{label}</span>
          <span className="block text-xs text-ink-500">{sub}</span>
        </span>
      </a>
    </li>
  );
}
