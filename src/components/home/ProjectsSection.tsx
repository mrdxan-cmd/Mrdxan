import { visibleProjects } from "@/content/projects";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Button } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/ui/Icons";

export function ProjectsSection() {
  const items = visibleProjects.slice(0, 3);
  return (
    <Section tone="paper">
      <div className="container-x">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Referenzen"
            title="Projekte aus dem Glarnerland"
            text="Ein Einblick in unsere Arbeit – von der Fassadenrenovation bis zur kompletten Wohnungsrenovation."
          />
          <Button href="/projekte" variant="ghost" className="shrink-0 self-start sm:self-auto">
            Alle Projekte
            <ArrowRightIcon size={18} />
          </Button>
        </div>
        {items.length > 0 ? (
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((p) => (
              <li key={p.slug}>
                <ProjectCard project={p} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-10 rounded-2xl border border-dashed border-ink-200 p-8 text-center text-ink-500">
            Unsere Referenzprojekte werden zurzeit aktualisiert. Gerne zeigen wir Ihnen Beispiele bei der Besichtigung.
          </p>
        )}
      </div>
    </Section>
  );
}
