import Image from "next/image";
import type { Service } from "@/content/services";
import { ServiceGlyph } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

const accent: Record<Service["accent"], string> = {
  ember: "from-ember-500 via-ember-600 to-flame-600",
  gold: "from-gold-400 via-ember-500 to-ember-700",
  flame: "from-flame-500 via-ember-600 to-ink-900",
  ink: "from-ink-700 via-ink-800 to-ink-950",
};

/**
 * Visual for a service. Renders the real photo when one is configured in
 * src/content/services.ts, otherwise a branded graphic (no stock/AI imagery).
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
      <div className="absolute -right-10 -top-10 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
      <div className="relative flex h-full min-h-[16rem] items-center justify-center p-10">
        <ServiceGlyph icon={service.icon} size={120} strokeWidth={1.1} className="opacity-90 drop-shadow-lg" />
      </div>
      <div className="absolute bottom-5 left-6 text-xs font-bold uppercase tracking-[0.2em] text-white/80">{service.label}</div>
    </div>
  );
}
