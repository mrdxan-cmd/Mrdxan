import Image from "next/image";
import type { Service } from "@/content/services";
import { ServiceGlyph } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

const accent: Record<Service["accent"], string> = {
  ember: "from-brand-magenta via-brand-violet to-brand-blue",
  gold: "from-ember-400 via-brand-magenta to-brand-violet",
  flame: "from-brand-violet via-brand-indigo to-brand-sky",
  ink: "from-ink-700 via-ink-800 to-ink-950",
};

/**
 * Visual for a service. Renders the real photo when one is configured in
 * src/content/services.ts, otherwise a branded graphic (no stock/AI imagery).
 * The mockup shows real project photography here – import via docs/MIGRATION.md.
 */
export function ServiceIllustration({ service, className }: { service: Service; className?: string }) {
  if (service.image) {
    return (
      <div className={cn("relative overflow-hidden rounded-3xl", className)}>
        <Image
          src={service.image.src}
          alt={service.image.alt}
          width={service.image.width}
          height={service.image.height}
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="h-full w-full object-cover"
        />
      </div>
    );
  }
  return (
    <div className={cn("relative overflow-hidden rounded-3xl bg-gradient-to-br text-white", accent[service.accent], className)} aria-hidden="true">
      <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_20%_20%,white_1px,transparent_1px)] [background-size:22px_22px]" />
      <div className="absolute -right-10 -top-10 h-56 w-56 rounded-full bg-white/15 blur-2xl" />
      <div className="relative flex h-full min-h-[10rem] items-center justify-center p-8">
        <ServiceGlyph icon={service.icon} size={96} strokeWidth={1.1} className="opacity-90 drop-shadow-lg" />
      </div>
      <div className="absolute right-4 top-3 rounded-full bg-black/25 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/80">Foto folgt</div>
    </div>
  );
}
