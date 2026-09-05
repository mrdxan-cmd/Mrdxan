import { services } from "@/content/services";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ServiceCard } from "@/components/services/ServiceCard";
import { Button } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/ui/Icons";

export function ServicesSection() {
  return (
    <Section id="leistungen" tone="paper">
      <div className="container-x">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Unsere Leistungen"
            title="Alles aus einer Hand – innen wie aussen"
            text="Von der Fassade bis zur fertig gestrichenen Wohnung: Wir verbinden Gipser- und Malerarbeiten zu einem sauberen Gesamtergebnis."
          />
          <Button href="/leistungen" variant="ghost" className="shrink-0 self-start sm:self-auto">
            Alle Leistungen
            <ArrowRightIcon size={18} />
          </Button>
        </div>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
