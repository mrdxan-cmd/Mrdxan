import { company, mailHref, telHref } from "@/content/company";
import { Button } from "@/components/ui/Button";
import { ArrowRightIcon, MailIcon, PhoneIcon } from "@/components/ui/Icons";

export function CtaBanner({ title = "Bereit für frische Farbe?", text }: { title?: string; text?: string }) {
  return (
    <section className="container-x py-16 sm:py-20">
      <div className="surface-dark relative overflow-hidden rounded-3xl px-6 py-12 sm:px-12 sm:py-16">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-ember-500/30 blur-3xl" />
        <div className="relative grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div>
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">{title}</h2>
            <p className="mt-3 max-w-xl text-lg text-ink-200">
              {text ?? "Erzählen Sie uns von Ihrem Projekt. Wir melden uns innert eines Arbeitstages und vereinbaren einen Termin für die kostenlose Besichtigung."}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <Button href="/kontakt#offerte" size="lg">
              Offerte anfragen
              <ArrowRightIcon size={20} />
            </Button>
            <Button href={telHref} size="lg" variant="outline-light">
              <PhoneIcon size={20} className="text-ember-300" />
              {company.contact.phoneDisplay}
            </Button>
          </div>
        </div>
        <p className="relative mt-6 text-sm text-ink-300">
          Oder per E-Mail an{" "}
          <a href={mailHref} className="inline-flex items-center gap-1 font-semibold text-white underline-offset-4 hover:underline">
            <MailIcon size={16} />
            {company.contact.email}
          </a>
        </p>
      </div>
    </section>
  );
}
