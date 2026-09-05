import Image from "next/image";
import type { Project } from "@/content/projects";
import { serviceMap } from "@/content/services";
import { ServiceGlyph } from "@/components/ui/Icons";
import { BeforeAfterSlider } from "./BeforeAfterSlider";
import { cn } from "@/lib/utils";

/**
 * Cover visual of a project: before/after slider when a pair exists, the real
 * photograph when available, otherwise a neutral branded graphic (never
 * AI-generated "fake" job photos).
 */
export function ProjectMedia({ project, className, priority = false, sizes }: { project: Project; className?: string; priority?: boolean; sizes?: string }) {
  const s = sizes ?? "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw";
  if (project.beforeAfter) {
    return <BeforeAfterSlider before={project.beforeAfter.before} after={project.beforeAfter.after} sizes={s} />;
  }
  if (project.cover) {
    return (
      <Image
        src={project.cover.src}
        alt={project.cover.alt}
        width={project.cover.width}
        height={project.cover.height}
        priority={priority}
        sizes={s}
        className={cn("h-full w-full object-cover", className)}
      />
    );
  }
  const primary = serviceMap[project.services[0]];
  return (
    <div
      className={cn("relative flex h-full w-full items-center justify-center bg-ink-900 text-white", className)}
      role="img"
      aria-label={`${project.title} – Projektfoto folgt`}
    >
      <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(135deg,rgb(255_31_143/0.45),rgb(124_44_245/0.25)_50%,transparent_80%)]" />
      <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(circle_at_20%_20%,white_1px,transparent_1px)] [background-size:20px_20px]" />
      <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-black/50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white/80">Vorher</span>
      <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-black/50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white/80">Nachher</span>
      <ServiceGlyph icon={primary.icon} size={56} strokeWidth={1.2} className="relative text-white/80" />
      <span className="absolute bottom-3 left-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">Foto folgt</span>
    </div>
  );
}
