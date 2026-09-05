import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/content/services";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { ServiceIllustration } from "@/components/services/ServiceIllustration";
import { CtaBanner } from "@/components/home/CtaBanner";
import { TrustSection } from "@/components/home/TrustSection";
import { ArrowRightIcon, CheckIcon } from "@/components/ui/Icons";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
  title: "Leistungen – Malerarbeiten, Gipserarbeiten & Fassaden",
  description:
    "Alle Leistungen von Maler Phönix in Näfels: Fassadenrenovation, Malerarbeiten innen & aussen, Gipserarbeiten sowie Neubau und Renovation im Kanton Glarus.",
  path: "/leistungen",
});

export default function LeistungenPage() {
  return (
    <>
      <PageHero
        eyebrow="Leistungen"
        title="Maler- und Gipserarbeiten aus einer Hand"
        text="Vier Fachbereiche, ein Anspruch: saubere Untergründe, hochwertige Materialien und ein Resultat, das lange Freude macht."
        crumbs={[{ name: "Leistungen", path: "/leistungen" }]}
      />

      <Section tone="paper">
        <div className="container-x space-y-16 lg:space-y-24">
          {services.map((service, i) => (
            <article key={service.slug} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
              <ServiceIllustration service={service} className={cn("aspect-[4/3] lg:aspect-[5/4]", i % 2 === 1 && "lg:order-2")} />
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-magenta">{service.label}</p>
                <h2 className="mt-2 font-display text-3xl font-bold text-ink-900 sm:text-4xl">
                  <Link href={`/leistungen/${service.slug}`} className="hover:text-brand-magenta">
                    {service.title}
                  </Link>
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-ink-600">{service.intro[0]}</p>
                <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                  {service.features.slice(0, 4).map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-[15px] text-ink-700">
                      <CheckIcon size={18} strokeWidth={2.4} className="mt-0.5 shrink-0 text-brand-magenta" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href={`/leistungen/${service.slug}`} className="mt-7 inline-flex items-center gap-2 font-semibold text-brand-magenta hover:text-brand-violet">
                  Mehr zu {service.label}
                  <ArrowRightIcon size={18} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <TrustSection />
      <CtaBanner />
    </>
  );
}
