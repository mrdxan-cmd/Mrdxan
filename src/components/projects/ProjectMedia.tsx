import Image from "next/image";
import type { Project } from "@/content/projects";
import { serviceMap } from "@/content/services";
import { ServiceGlyph } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

/**
 * Cover visual of a project. Uses the real photograph when available;
 * otherwise a neutral branded graphic (never AI-generated "fake" job photos).
 */
export function ProjectMedia({ project, className, priority = false, sizes }: { project: Project; className?: string; priority?: boolean; sizes?: string }) {
  if (project.cover) {
    return (
      <Image
        src={project.cover.src}
        alt={project.cover.alt}
        width={project.cover.width}
        height={project.cover.height}
        priority={priority}
        sizes={sizes ?? "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
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
      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(135deg,rgb(244_95_20/0.5),transparent_60%)]" />
      <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(circle_at_20%_20%,white_1px,transparent_1px)] [background-size:20px_20px]" />
      <ServiceGlyph icon={primary.icon} size={64} strokeWidth={1.2} className="relative text-ember-300/90" />
      <span className="absolute bottom-3 left-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">Foto folgt</span>
    </div>
  );
}
