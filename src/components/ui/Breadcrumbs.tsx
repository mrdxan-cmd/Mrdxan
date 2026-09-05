import Link from "next/link";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { cn } from "@/lib/utils";

export interface Crumb {
  name: string;
  path: string;
}

export function Breadcrumbs({ items, tone = "light", className }: { items: Crumb[]; tone?: "light" | "dark"; className?: string }) {
  const all: Crumb[] = [{ name: "Startseite", path: "/" }, ...items];
  const dark = tone === "dark";
  return (
    <nav aria-label="Brotkrumen" className={cn("text-sm", className)}>
      <JsonLd data={breadcrumbSchema(all)} />
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {all.map((item, i) => {
          const last = i === all.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className={dark ? "text-white/90" : "text-ink-800"}>
                  {item.name}
                </span>
              ) : (
                <Link href={item.path} className={cn("transition-colors", dark ? "text-ink-300 hover:text-white" : "text-ink-500 hover:text-ink-900")}>
                  {item.name}
                </Link>
              )}
              {!last && <span aria-hidden="true" className={dark ? "text-white/30" : "text-ink-300"}>/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
