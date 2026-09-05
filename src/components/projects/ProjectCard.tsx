import Link from "next/link";
import type { Project } from "@/content/projects";
import { serviceMap } from "@/content/services";
import { ArrowRightIcon, PinIcon } from "@/components/ui/Icons";
import { ProjectMedia } from "./ProjectMedia";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projekte/${project.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink-100 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <ProjectMedia project={project} className="transition-transform duration-500 group-hover:scale-[1.03]" />
        {project.placeholder && (
          <span className="absolute left-3 top-3 rounded-full bg-gold-400 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-ink-900">
            Beispiel
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <ul className="flex flex-wrap gap-1.5">
          {project.services.map((s) => (
            <li key={s} className="rounded-full bg-ember-50 px-2.5 py-0.5 text-xs font-semibold text-ember-700">
              {serviceMap[s].label}
            </li>
          ))}
        </ul>
        <h3 className="mt-3 font-display text-xl font-bold text-ink-900">{project.title}</h3>
        <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-ink-500">
          <PinIcon size={15} />
          {project.location}
          {project.year && <span aria-hidden="true">·</span>}
          {project.year}
        </p>
        <p className="mt-3 flex-1 text-[15px] leading-relaxed text-ink-600">{project.teaser}</p>
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-ember-600">
          Projekt ansehen
          <ArrowRightIcon size={16} className="transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
