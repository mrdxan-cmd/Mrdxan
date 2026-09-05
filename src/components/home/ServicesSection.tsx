import { services } from "@/content/services";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ServiceCard } from "@/components/services/ServiceCard";

/** Mockup: "UNSERE LEISTUNGEN · Qualität für heute. Werte für morgen." with intro text right-aligned. */
export function ServicesSection() {
  return (
    <Section id="leistungen" tone="white">
      <div className="container-x">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow="Unsere Leistungen" title="Qualität für heute. Werte für morgen." />
          <p className="max-w-md text-[15px] leading-relaxed text-ink-600 lg:text-right">
            Wir bringen Farbe, Struktur und Schutz in Ihre Immobilie. Kompetent, sauber und mit Leidenschaft – in der ganzen Region Glarus.
          </p>
        </div>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => (
            <li key={service.slug}>
              <ServiceCard service={service} />
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
