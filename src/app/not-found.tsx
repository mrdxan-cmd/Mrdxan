import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { services } from "@/content/services";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Seite nicht gefunden",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="surface-dark min-h-[70vh]">
      <div className="container-x py-20 text-center sm:py-28">
        <p className="font-display text-7xl font-extrabold text-gradient-ember sm:text-8xl">404</p>
        <h1 className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl">Diese Seite gibt es nicht (mehr)</h1>
        <p className="mx-auto mt-4 max-w-md text-ink-300">
          Vielleicht wurde die Seite verschoben. Hier geht es weiter zu unseren Leistungen oder zurück zur Startseite.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href="/" size="lg">
            Zur Startseite
          </Button>
          <Button href="/kontakt" size="lg" variant="outline-light">
            Kontakt aufnehmen
          </Button>
        </div>
        <ul className="mx-auto mt-12 flex max-w-2xl flex-wrap justify-center gap-2">
          {services.map((s) => (
            <li key={s.slug}>
              <Link href={`/leistungen/${s.slug}`} className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-ink-100 hover:border-ember-400 hover:text-white">
                {s.label}
                <ArrowRightIcon size={14} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
