import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getService, services } from "@/content/services";
import { visibleProjects } from "@/content/projects";
import { PageHero } from "@/components/layout/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ServiceIllustration } from "@/components/services/ServiceIllustration";
import { ServiceCard } from "@/components/services/ServiceCard";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { CtaBanner } from "@/components/home/CtaBanner";
import { JsonLd } from "@/components/seo/JsonLd";
import { CheckIcon } from "@/components/ui/Icons";
import { Button } from "@/components/ui/Button";
import { faqSchema, serviceSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/leistungen/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMetadata({ title: service.seoTitle, description: service.description, path: `/leistungen/${service.slug}` });
}

export default async function ServicePage({ params }: PageProps<"/leistungen/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related = services.filter((s) => s.slug !== service.slug);
  const projects = visibleProjects.filter((p) => p.services.includes(service.slug)).slice(0, 3);

  return (
    <>
      <JsonLd data={service.faq.length ? [serviceSchema(service), faqSchema(service.faq)] : serviceSchema(service)} />
      <PageHero
        eyebrow={service.label}
        title={service.title}
        text={service.teaser}
        crumbs={[
          { name: "Leistungen", path: "/leistungen" },
          { name: service.label, path: `/leistungen/${service.slug}` },
        ]}
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href="#offerte" size="lg">
            Offerte für {service.label} anfragen
          </Button>
        </div>
      </PageHero>

      <Section tone="paper">
        <div className="container-x grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div>
            {service.intro.map((p) => (
              <p key={p} className="mb-5 text-lg leading-relaxed text-ink-700">
                {p}
              </p>
            ))}
            <h2 className="mt-10 font-display text-2xl font-bold text-ink-900">Unsere Leistungen im Bereich {service.label}</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {service.features.map((f) => (
                <li key={f} className="flex items-start gap-3 rounded-xl border border-ink-100 bg-white px-4 py-3 text-[15px] text-ink-800">
                  <CheckIcon size={18} strokeWidth={2.4} className="mt-0.5 shrink-0 text-ember-500" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <ServiceIllustration service={service} className="aspect-[4/5] lg:sticky lg:top-24" />
        </div>
      </Section>

      <Section tone="dark">
        <div className="container-x">
          <SectionHeading eyebrow="Ablauf" title={`So läuft Ihr Projekt ab`} tone="dark" />
          <ol className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {service.process.map((step, i) => (
              <li key={step.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                <span className="font-display text-4xl font-extrabold text-gradient-ember">0{i + 1}</span>
                <h3 className="mt-3 font-display text-lg font-bold text-white">{step.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-300">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {projects.length > 0 && (
        <Section tone="paper">
          <div className="container-x">
            <SectionHeading eyebrow="Referenzen" title={`Projekte: ${service.label}`} />
            <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((p) => (
                <li key={p.slug}>
                  <ProjectCard project={p} />
                </li>
              ))}
            </ul>
          </div>
        </Section>
      )}

      {service.faq.length > 0 && (
        <Section tone="white">
          <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.4fr]">
            <SectionHeading eyebrow="Häufige Fragen" title={`Fragen zu ${service.label}`} />
            <FaqAccordion items={service.faq} />
          </div>
        </Section>
      )}

      <Section id="offerte" tone="tint" className="scroll-mt-20">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <SectionHeading
            eyebrow="Offerte"
            title={`Offerte für ${service.label} anfragen`}
            text="Beschreiben Sie kurz Ihr Vorhaben. Wir melden uns innert eines Arbeitstages und vereinbaren einen Besichtigungstermin."
          />
          <div className="rounded-3xl border border-ink-100 bg-white p-6 shadow-card sm:p-8">
            <QuoteForm defaultService={service.slug} />
          </div>
        </div>
      </Section>

      <Section tone="paper" padding="tight">
        <div className="container-x">
          <h2 className="font-display text-2xl font-bold text-ink-900">Weitere Leistungen</h2>
          <ul className="mt-6 grid gap-5 sm:grid-cols-3">
            {related.map((s) => (
              <li key={s.slug}>
                <ServiceCard service={s} />
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <CtaBanner title="Lieber direkt sprechen?" text="Rufen Sie uns an – wir beraten Sie gerne persönlich zu Ihrem Projekt." />
    </>
  );
}
