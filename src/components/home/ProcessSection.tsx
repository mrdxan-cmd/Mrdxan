import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/ui/Icons";

const steps = [
  {
    title: "Anfrage & Besichtigung",
    text: "Sie melden sich per Formular, Telefon oder E-Mail. Wir besichtigen Ihr Objekt vor Ort und beraten Sie zu Farben, Materialien und Ablauf.",
  },
  {
    title: "Kostenlose Offerte",
    text: "Sie erhalten eine transparente, verbindliche Offerte – klar aufgeschlüsselt und ohne versteckte Kosten.",
  },
  {
    title: "Saubere Ausführung",
    text: "Wir schützen Ihre Einrichtung, bereiten Untergründe fachgerecht vor und arbeiten termintreu.",
  },
  {
    title: "Abnahme & Übergabe",
    text: "Gemeinsame Endkontrolle, besenreine Übergabe – und Sie geniessen Ihr frisches Zuhause.",
  },
];

export function ProcessSection() {
  return (
    <Section tone="dark" className="relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute -left-20 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-ink-500/10 blur-3xl" />
      <div className="container-x relative">
        <SectionHeading
          eyebrow="So arbeiten wir"
          title="In vier Schritten zum Ergebnis"
          text="Ein klarer Ablauf, ein fester Ansprechpartner – damit Sie jederzeit wissen, was als Nächstes passiert."
          tone="dark"
        />
        <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li key={step.title} className="relative rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <span className="font-display text-5xl font-extrabold text-gradient-brand">0{i + 1}</span>
              <h3 className="mt-4 font-display text-xl font-bold text-white">{step.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-300">{step.text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10">
          <Button href="/kontakt#offerte" size="lg">
            Jetzt Offerte anfragen
            <ArrowRightIcon size={20} />
          </Button>
        </div>
      </div>
    </Section>
  );
}
