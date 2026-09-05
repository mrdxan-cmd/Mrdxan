import { regions, serviceAreas } from "@/content/service-areas";
import { company } from "@/content/company";
import { Section, SectionHeading } from "@/components/ui/Section";
import { MapIconWrapper } from "./MapIconWrapper";

export function ServiceAreasSection() {
  const primary = serviceAreas.filter((a) => a.primary);
  const secondary = serviceAreas.filter((a) => !a.primary);
  return (
    <Section tone="tint">
      <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
        <div>
          <SectionHeading
            eyebrow="Einzugsgebiet"
            title="Ihr Maler im Kanton Glarus und in der Region"
            text={`Von ${company.address.city} aus sind wir schnell bei Ihnen – im ganzen Glarnerland, im Linthgebiet und in der March.`}
          />
          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {regions.map((r) => (
              <li key={r.name} className="rounded-2xl border border-ink-100 bg-white p-4">
                <p className="font-display font-bold text-ink-900">{r.name}</p>
                <p className="mt-1 text-sm text-ink-500">{r.description}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-ink-100 bg-white p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <MapIconWrapper />
            <p className="font-display text-lg font-bold text-ink-900">Wir sind unter anderem tätig in</p>
          </div>
          <ul className="mt-5 flex flex-wrap gap-2">
            {primary.map((a) => (
              <li key={a.name} className="rounded-full bg-ink-900 px-3.5 py-1.5 text-sm font-semibold text-white">
                {a.name} <span className="text-ink-400">{a.canton}</span>
              </li>
            ))}
            {secondary.map((a) => (
              <li key={a.name} className="rounded-full border border-ink-200 px-3.5 py-1.5 text-sm font-medium text-ink-700">
                {a.name} <span className="text-ink-400">{a.canton}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm text-ink-500">Ihr Ort ist nicht dabei? Fragen Sie uns – für grössere Projekte kommen wir auch weiter.</p>
        </div>
      </div>
    </Section>
  );
}
