import Link from "next/link";
import type { Service } from "@/content/services";
import { ArrowRightIcon, ServiceGlyph } from "@/components/ui/Icons";
import { ServiceIllustration } from "./ServiceIllustration";
import { cn } from "@/lib/utils";

/**
 * Mockup card: image on top, white circular badge with magenta icon overlapping
 * the image edge, bold title, short text, magenta "Mehr erfahren →" link.
 */
export function ServiceCard({ service, compact = false }: { service: Service; compact?: boolean }) {
  return (
    <Link
      href={`/leistungen/${service.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-glow"
    >
      <div className="relative m-3 mb-0">
        <ServiceIllustration service={service} className={cn("aspect-[16/10] rounded-xl", compact && "aspect-[16/9]")} />
        <span className="absolute -bottom-6 left-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-white text-brand-magenta shadow-card ring-4 ring-white">
          <ServiceGlyph icon={service.icon} size={26} strokeWidth={2} />
        </span>
      </div>
      <div className="flex flex-1 flex-col px-6 pb-6 pt-10">
        <h3 className="font-display text-xl font-extrabold text-ink-900">{service.label}</h3>
        <p className="mt-2 flex-1 text-[15px] leading-relaxed text-ink-600">{service.teaser}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand-magenta">
          Mehr erfahren
          <ArrowRightIcon size={16} className="transition-transform group-hover:translate-x-1" />
          <span aria-hidden="true" className="absolute" />
        </span>
        <span aria-hidden="true" className="mt-1 h-0.5 w-24 rounded-full bg-gradient-brand opacity-70 transition-all group-hover:w-32" />
      </div>
    </Link>
  );
}
