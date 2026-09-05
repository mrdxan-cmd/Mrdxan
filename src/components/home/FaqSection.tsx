import { faq } from "@/content/faq";
import { Section, SectionHeading } from "@/components/ui/Section";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { Button } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/ui/Icons";

export function FaqSection() {
  return (
    <Section tone="paper">
      <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <SectionHeading
            eyebrow="Häufige Fragen"
            title="Gut zu wissen, bevor es losgeht"
            text="Antworten auf die Fragen, die uns am häufigsten gestellt werden."
          />
          <Button href="/faq" variant="ghost" className="mt-6">
            Alle Fragen ansehen
            <ArrowRightIcon size={18} />
          </Button>
        </div>
        <FaqAccordion items={faq.slice(0, 4)} />
      </div>
    </Section>
  );
}
