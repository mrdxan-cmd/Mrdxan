import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

/** Phoenix artwork as compact logo mark (keyed PNG, intended for dark backgrounds). */
export function LogoMark({ className, priority = false }: { className?: string; priority?: boolean }) {
  return (
    <Image
      src="/images/brand/phoenix-logo.png"
      alt=""
      width={320}
      height={223}
      priority={priority}
      className={cn("h-11 w-auto", className)}
    />
  );
}

export function Logo({ tone = "light", className, priority = false }: { tone?: "dark" | "light"; className?: string; priority?: boolean }) {
  return (
    <Link href="/" className={cn("group inline-flex items-center gap-3", className)} aria-label={`${site.name} – Startseite`}>
      <LogoMark priority={priority} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
      <span className="flex flex-col leading-none">
        <span className={cn("font-display text-[1.35rem] font-extrabold tracking-tight", tone === "light" ? "text-white" : "text-ink-900")}>
          Maler <span className="text-gradient-brand">Phönix</span>
        </span>
        <span className={cn("mt-1 text-[0.62rem] font-bold uppercase tracking-[0.18em]", tone === "light" ? "text-ink-300" : "text-ink-500")}>
          {site.tagline}
        </span>
      </span>
    </Link>
  );
}
