import { visibleProjects } from "@/content/projects";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { MountainBackdrop } from "@/components/ui/MountainBackdrop";
import Link from "next/link";

/** Mockup: dark alpine section "UNSERE PROJEKTE · Echte Ergebnisse. Echte Begeisterung." */
export function ProjectsSection() {
  const items = visibleProjects.slice(0, 3);
  return (
    <Section id="projekte" tone="dark" className="relative overflow-hidden">
      <MountainBackdrop opacity={0.5} className="h-[75%]" />
      <div className="container-x relative">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading eyebrow="Unsere Projekte" title="Echte Ergebnisse. Echte Begeisterung." tone="dark" />
          <Link href="/projekte" className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-white hover:text-brand-pink">
            Alle Projekte ansehen
            <ArrowRightIcon size={16} />
          </Link>
        </div>
        {items.length > 0 ? (
          <ul className="relative mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((p) => (
              <li key={p.slug} className="relative">
                <ProjectCard project={p} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-10 rounded-2xl border border-dashed border-white/20 p-8 text-center text-ink-300">
            Unsere Referenzprojekte werden zurzeit aktualisiert. Gerne zeigen wir Ihnen Beispiele bei der Besichtigung.
          </p>
        )}
      </div>
    </Section>
  );
}
