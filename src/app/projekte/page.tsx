import type { Metadata } from "next";
import { visibleProjects } from "@/content/projects";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { CtaBanner } from "@/components/home/CtaBanner";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Projekte & Referenzen",
  description:
    "Referenzprojekte von Maler Phönix: Fassadenrenovationen, Malerarbeiten, Gipserarbeiten und Renovationen im Kanton Glarus und in der Region.",
  path: "/projekte",
});

export default function ProjektePage() {
  const hasPlaceholders = visibleProjects.some((p) => p.placeholder);
  return (
    <>
      <PageHero
        eyebrow="Projekte"
        title="Referenzen aus dem Glarnerland"
        text="Jedes Projekt ist anders – gemeinsam ist ihnen die saubere Ausführung. Eine Auswahl unserer Arbeiten."
        crumbs={[{ name: "Projekte", path: "/projekte" }]}
      />
      <Section tone="paper">
        <div className="container-x">
          {hasPlaceholders && (
            <p className="mb-8 rounded-xl border border-gold-400/50 bg-gold-300/20 px-4 py-3 text-sm text-ink-800">
              <strong>Hinweis (nur Vorschau):</strong> Mit «Beispiel» markierte Einträge sind Struktur-Platzhalter. Sie werden vor dem Go-live
              durch echte Referenzen mit Originalfotos der bestehenden Website ersetzt und sind in der Produktion ausgeblendet.
            </p>
          )}
          {visibleProjects.length > 0 ? (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visibleProjects.map((p) => (
                <li key={p.slug}>
                  <ProjectCard project={p} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="rounded-3xl border border-dashed border-ink-200 p-10 text-center">
              <p className="font-display text-xl font-bold text-ink-900">Referenzen werden aktualisiert</p>
              <p className="mt-2 text-ink-600">Gerne zeigen wir Ihnen Beispiele unserer Arbeit bei der Besichtigung vor Ort.</p>
            </div>
          )}
        </div>
      </Section>
      <CtaBanner title="Ihr Projekt könnte das nächste sein." />
    </>
  );
}
