import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  text?: ReactNode;
  crumbs: Crumb[];
  children?: ReactNode;
  compact?: boolean;
}

export function PageHero({ eyebrow, title, text, crumbs, children, compact }: PageHeroProps) {
  return (
    <section className="surface-dark relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-ember-500/20 blur-3xl" />
      <div className={cn("container-x relative", compact ? "py-10 sm:py-14" : "py-14 sm:py-20")}>
        <Breadcrumbs items={crumbs} tone="dark" className="mb-6" />
        {eyebrow && <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-ember-300">{eyebrow}</p>}
        <h1 className="max-w-3xl font-display text-4xl font-extrabold leading-[1.05] text-white sm:text-5xl lg:text-6xl">{title}</h1>
        {text && <div className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-200">{text}</div>}
        {children}
      </div>
    </section>
  );
}
