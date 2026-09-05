import type { Metadata } from "next";
import Image from "next/image";
import { company } from "@/content/company";
import { trustItems } from "@/content/trust";
import { services } from "@/content/services";
import { PageHero } from "@/components/layout/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ServiceCard } from "@/components/services/ServiceCard";
import { CtaBanner } from "@/components/home/CtaBanner";
import { ServiceAreasSection } from "@/components/home/ServiceAreasSection";
import { TrustGlyph } from "@/components/ui/Icons";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Über uns – Ihr Malergeschäft in Näfels",
  description:
    "Lernen Sie Maler Phönix kennen: ein regionales Malergeschäft aus Näfels GL mit Leidenschaft für saubere Maler- und Gipserarbeiten und persönlicher Beratung.",
  path: "/ueber-uns",
});

const values = [
  {
    title: "Wie der Phönix: Erneuerung",
    text: "Der Phönix steht für Neubeginn. Genau das tun wir für Ihre Räume und Fassaden – wir geben ihnen neuen Glanz und schützen, was Ihnen wichtig ist.",
  },
  {
    title: "Persönlich & nah",
    text: "Sie sprechen von der Offerte bis zur Abnahme mit derselben Person. Kurze Wege, klare Antworten, keine Überraschungen.",
  },
  {
    title: "Qualität im Detail",
    text: "Saubere Kanten, gleichmässige Flächen, dauerhafte Untergründe – Handwerk, das man sieht und das man spürt.",
  },
];

export default function UeberUnsPage() {
  return (
    <>
      <PageHero
        eyebrow="Über uns"
        title="Handwerk aus Näfels – mit Herz und Präzision"
        text={company.shortDescription}
        crumbs={[{ name: "Über uns", path: "/ueber-uns" }]}
      />

      <Section tone="paper">
        <div className="container-x grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div className="relative mx-auto w-full max-w-md">
            <div aria-hidden="true" className="absolute inset-[15%] rounded-full bg-ember-500/20 blur-3xl" />
            <div className="surface-dark relative overflow-hidden rounded-3xl p-8">
              <Image src="/images/brand/phoenix.svg" alt="Phönix – Symbol für Erneuerung" width={800} height={800} className="mx-auto w-4/5" />
              <p className="mt-2 text-center font-display text-lg font-bold text-white">
                {company.brand}
                <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-ember-300">{company.legalName}</span>
              </p>
            </div>
          </div>
          <div>
            <SectionHeading eyebrow="Unsere Geschichte" title="Ein Malergeschäft, das mitdenkt" />
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink-700">
              <p>
                {company.brand} ist ein inhabergeführtes Malergeschäft aus {company.address.city}. Wir arbeiten für Privatpersonen, Eigentümer,
                Verwaltungen und Gewerbebetriebe im Kanton Glarus und in der Region – vom kleinen Zimmer bis zur ganzen Liegenschaft.
              </p>
              <p>
                Was uns antreibt: Räume und Gebäude, die nach unserer Arbeit besser aussehen und länger halten. Dafür bereiten wir Untergründe
                sorgfältig vor, setzen hochwertige Materialien ein und arbeiten so, dass Sie sich jederzeit auf uns verlassen können.
              </p>
              <p>
                {company.owner.name}, {company.owner.role}, ist Ihr direkter Ansprechpartner – von der ersten Besichtigung bis zur Abnahme.
              </p>
            </div>
            <ul className="mt-8 flex flex-wrap gap-2">
              {company.languages.map((l) => (
                <li key={l} className="rounded-full border border-ink-200 px-3 py-1 text-sm font-medium text-ink-700">
                  {l}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section tone="dark">
        <div className="container-x">
          <SectionHeading eyebrow="Werte" title="Wofür Maler Phönix steht" tone="dark" />
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {values.map((v) => (
              <li key={v.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                <h3 className="font-display text-xl font-bold text-white">{v.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-300">{v.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="white">
        <div className="container-x">
          <SectionHeading eyebrow="Versprechen" title="Darauf können Sie zählen" align="center" />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {trustItems.map((item) => (
              <li key={item.title} className="flex gap-4 rounded-2xl border border-ink-100 bg-paper p-5">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-ember-50 text-ember-600">
                  <TrustGlyph icon={item.icon} size={20} />
                </span>
                <div>
                  <h3 className="font-display font-bold text-ink-900">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-600">{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="paper" padding="tight">
        <div className="container-x">
          <h2 className="font-display text-2xl font-bold text-ink-900">Unsere Leistungen</h2>
          <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <li key={s.slug}>
                <ServiceCard service={s} />
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <ServiceAreasSection />
      <CtaBanner title="Lernen wir uns kennen." text="Vereinbaren Sie einen unverbindlichen Besichtigungstermin – wir freuen uns auf Ihr Projekt." />
    </>
  );
}
