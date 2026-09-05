import type { Metadata } from "next";
import { faq } from "@/content/faq";
import { services } from "@/content/services";
import { PageHero } from "@/components/layout/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { CtaBanner } from "@/components/home/CtaBanner";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "FAQ – Häufige Fragen zu Maler- & Gipserarbeiten",
  description:
    "Antworten auf häufige Fragen zu Offerte, Ablauf, Kosten, Einzugsgebiet und Materialien von Maler Phönix in Näfels GL.",
  path: "/faq",
});

export default function FaqPage() {
  const serviceFaq = services.flatMap((s) => s.faq.map((f) => ({ ...f, service: s.label })));
  const all = [...faq, ...serviceFaq];
  return (
    <>
      <JsonLd data={faqSchema(all)} />
      <PageHero
        eyebrow="FAQ"
        title="Häufige Fragen"
        text="Alles, was Sie vor Ihrem Projekt wissen möchten. Ihre Frage fehlt? Rufen Sie uns an – wir helfen gerne weiter."
        crumbs={[{ name: "FAQ", path: "/faq" }]}
        compact
      />
      <Section tone="paper">
        <div className="container-x max-w-4xl space-y-14">
          <div>
            <SectionHeading eyebrow="Allgemein" title="Offerte, Ablauf & Region" />
            <FaqAccordion items={faq} className="mt-8" />
          </div>
          {services
            .filter((s) => s.faq.length > 0)
            .map((s) => (
              <div key={s.slug}>
                <SectionHeading eyebrow={s.label} title={`Fragen zu ${s.label}`} />
                <FaqAccordion items={s.faq} className="mt-8" />
              </div>
            ))}
        </div>
      </Section>
      <CtaBanner title="Noch Fragen?" text="Wir beantworten sie gerne persönlich – am Telefon oder bei der Besichtigung vor Ort." />
    </>
  );
}
