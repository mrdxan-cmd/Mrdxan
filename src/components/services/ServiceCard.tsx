import Link from "next/link";
import type { Service } from "@/content/services";
import { ArrowRightIcon, ServiceGlyph } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

const accentClasses: Record<Service["accent"], string> = {
  ember: "from-ember-500 to-flame-500",
  gold: "from-gold-400 to-ember-500",
  flame: "from-flame-500 to-ember-700",
  ink: "from-ink-700 to-ink-900",
};

export function ServiceCard({ service, tone = "light" }: { service: Service; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <Link
      href={`/leistungen/${service.slug}`}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-card sm:p-7",
        dark ? "border-white/10 bg-white/[0.04] hover:bg-white/[0.07]" : "border-ink-100 bg-white",
      )}
    >
      <span
        aria-hidden="true"
        className={cn("absolute inset-x-0 top-0 h-1 bg-gradient-to-r opacity-80 transition-opacity group-hover:opacity-100", accentClasses[service.accent])}
      />
      <span
        className={cn(
          "inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-[0_8px_20px_-8px_rgb(244_95_20/0.6)]",
          accentClasses[service.accent],
        )}
      >
        <ServiceGlyph icon={service.icon} size={24} />
      </span>
      <h3 className={cn("mt-5 font-display text-xl font-bold", dark ? "text-white" : "text-ink-900")}>{service.label}</h3>
      <p className={cn("mt-2 flex-1 text-[15px] leading-relaxed", dark ? "text-ink-300" : "text-ink-600")}>{service.teaser}</p>
      <span className={cn("mt-5 inline-flex items-center gap-2 text-sm font-semibold", dark ? "text-ember-300" : "text-ember-600")}>
        Mehr erfahren
        <ArrowRightIcon size={16} className="transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
