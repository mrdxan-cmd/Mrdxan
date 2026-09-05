import Link from "next/link";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={cn("h-10 w-10", className)} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="logo-g" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#b8281a" />
          <stop offset="0.5" stopColor="#f45f14" />
          <stop offset="1" stopColor="#ffd98a" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill="#16150f" />
      <path
        fill="url(#logo-g)"
        d="M32 12c-2 8-8 12-16 14 6 0 10 2 13 6-6 2-10 6-12 12 5-4 10-5 15-4-1 5 0 9 2 12 2-3 3-7 2-12 5-1 10 0 15 4-2-6-6-10-12-12 3-4 7-6 13-6-8-2-14-6-16-14z"
      />
      <path fill="#ffd98a" opacity="0.9" d="M32 20c-1 4-3 6-6 8 3 0 5 2 6 5 1-3 3-5 6-5-3-2-5-4-6-8z" />
    </svg>
  );
}

export function Logo({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <Link href="/" className={cn("group inline-flex items-center gap-3", className)} aria-label={`${site.name} – Startseite`}>
      <LogoMark className="transition-transform duration-300 group-hover:-rotate-6" />
      <span className="flex flex-col leading-none">
        <span className={cn("font-display text-[1.05rem] font-bold tracking-tight", tone === "light" ? "text-white" : "text-ink-900")}>
          Maler Phönix
        </span>
        <span className={cn("mt-1 text-[0.68rem] font-semibold uppercase tracking-[0.2em]", tone === "light" ? "text-ember-300" : "text-ember-600")}>
          Näfels · Glarus
        </span>
      </span>
    </Link>
  );
}
