import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, visibleProjects } from "@/content/projects";
import { serviceMap } from "@/content/services";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { ProjectMedia } from "@/components/projects/ProjectMedia";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { CtaBanner } from "@/components/home/CtaBanner";
import { JsonLd } from "@/components/seo/JsonLd";
import { CheckIcon, PinIcon } from "@/components/ui/Icons";
import { projectSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return visibleProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projekte/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return pageMetadata({
    title: `${project.title} – ${project.location}`,
    description: project.teaser,
    path: `/projekte/${project.slug}`,
    noIndex: project.placeholder,
    image: project.cover?.src,
  });
}

export default async function ProjektPage({ params }: PageProps<"/projekte/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const more = visibleProjects.filter((p) => p.slug !== project.slug).slice(0, 3);

  return (
    <>
      {!project.placeholder && <JsonLd data={projectSchema(project)} />}
      <PageHero
        eyebrow={project.placeholder ? "Beispielprojekt" : "Referenz"}
        title={project.title}
        text={
          <span className="inline-flex items-center gap-2">
            <PinIcon size={18} className="text-ember-300" />
            {project.location}
            {project.year && ` · ${project.year}`}
          </span>
        }
        crumbs={[
          { name: "Projekte", path: "/projekte" },
          { name: project.title, path: `/projekte/${project.slug}` },
        ]}
        compact
      />

      <Section tone="paper">
        <div className="container-x">
          <div className="overflow-hidden rounded-3xl border border-ink-100 bg-white">
            <div className="aspect-[16/9]">
              <ProjectMedia project={project} priority sizes="(min-width: 1280px) 1200px, 100vw" />
            </div>
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div>
              {project.placeholder && (
                <p className="mb-6 rounded-xl border border-gold-400/50 bg-gold-300/20 px-4 py-3 text-sm text-ink-800">
                  <strong>Beispielprojekt:</strong> Dieser Eintrag zeigt die Struktur einer Referenz und wird vor dem Go-live durch ein reales Projekt ersetzt.
                </p>
              )}
              {project.description.map((p) => (
                <p key={p} className="mb-5 text-lg leading-relaxed text-ink-700">
                  {p}
                </p>
              ))}
              {project.gallery && project.gallery.length > 0 && (
                <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                  {project.gallery.map((img) => (
                    <li key={img.src} className="overflow-hidden rounded-2xl border border-ink-100">
                      <Image src={img.src} alt={img.alt} width={img.width} height={img.height} sizes="(min-width: 1024px) 40vw, 100vw" className="h-full w-full object-cover" />
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-2xl border border-ink-100 bg-white p-6">
                <h2 className="font-display text-lg font-bold text-ink-900">Ausgeführte Arbeiten</h2>
                <ul className="mt-4 space-y-2.5">
                  {project.scope.map((s) => (
                    <li key={s} className="flex items-start gap-2.5 text-[15px] text-ink-700">
                      <CheckIcon size={18} strokeWidth={2.4} className="mt-0.5 shrink-0 text-ember-500" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-ink-100 bg-white p-6">
                <h2 className="font-display text-lg font-bold text-ink-900">Leistungen</h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {project.services.map((s) => (
                    <li key={s}>
                      <Link href={`/leistungen/${s}`} className="inline-flex rounded-full bg-ember-50 px-3 py-1.5 text-sm font-semibold text-ember-700 hover:bg-ember-100">
                        {serviceMap[s].label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </Section>

      {more.length > 0 && (
        <Section tone="white" padding="tight">
          <div className="container-x">
            <h2 className="font-display text-2xl font-bold text-ink-900">Weitere Projekte</h2>
            <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {more.map((p) => (
                <li key={p.slug}>
                  <ProjectCard project={p} />
                </li>
              ))}
            </ul>
          </div>
        </Section>
      )}

      <CtaBanner title="Ähnliches Projekt geplant?" />
    </>
  );
}
