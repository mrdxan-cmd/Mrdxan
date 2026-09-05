import Link from "next/link";
import type { Project } from "@/content/projects";
import { serviceMap } from "@/content/services";
import { ArrowRightIcon, PinIcon } from "@/components/ui/Icons";
import { ProjectMedia } from "./ProjectMedia";
import { cn } from "@/lib/utils";

/** Mockup card: media with before/after, dark caption with title and location pin. */
export function ProjectCard({ project, tone = "dark" }: { project: Project; tone?: "dark" | "light" }) {
  const dark = tone === "dark";
  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1",
        dark ? "border-white/10 bg-ink-900/80 shadow-[0_20px_50px_-20px_rgb(0_0_0/0.7)]" : "border-ink-100 bg-white shadow-card",
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <ProjectMedia project={project} />
        {project.placeholder && (
          <span className="absolute bottom-3 right-3 rounded-full bg-gold-400 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-ink-900">
            Beispiel
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <ul className="flex flex-wrap gap-1.5">
          {project.services.map((s) => (
            <li key={s} className={cn("rounded-full px-2.5 py-0.5 text-[11px] font-bold", dark ? "bg-white/10 text-ink-100" : "bg-ink-50 text-brand-violet")}>
              {serviceMap[s].label}
            </li>
          ))}
        </ul>
        <h3 className={cn("mt-3 font-display text-lg font-extrabold", dark ? "text-white" : "text-ink-900")}>
          <Link href={`/projekte/${project.slug}`} className="after:absolute after:inset-0">
            {project.title}
          </Link>
        </h3>
        <p className={cn("mt-1 inline-flex items-center gap-1.5 text-sm", dark ? "text-ink-300" : "text-ink-500")}>
          <PinIcon size={15} />
          {project.location}
          {project.year && <span aria-hidden="true">·</span>}
          {project.year}
        </p>
        <span className={cn("mt-4 inline-flex items-center gap-2 text-sm font-bold", dark ? "text-brand-pink" : "text-brand-magenta")}>
          Projekt ansehen
          <ArrowRightIcon size={16} className="transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </article>
  );
}
