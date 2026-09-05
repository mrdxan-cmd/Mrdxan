import type { FaqItem } from "@/content/faq";
import { ChevronDownIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

/**
 * Accessible accordion built on native <details>/<summary> – works without JS.
 */
export function FaqAccordion({ items, className }: { items: FaqItem[]; className?: string }) {
  return (
    <div className={cn("divide-y divide-ink-100 rounded-2xl border border-ink-100 bg-white", className)}>
      {items.map((item, i) => (
        <details key={item.question} className="group px-5 sm:px-6" open={i === 0}>
          <summary className="flex items-center justify-between gap-4 py-5 text-left font-display text-lg font-bold text-ink-900">
            <span>{item.question}</span>
            <ChevronDownIcon size={20} className="faq-chevron shrink-0 text-brand-magenta transition-transform duration-200" />
          </summary>
          <div className="pb-5 pr-8 text-[15px] leading-relaxed text-ink-600">{item.answer}</div>
        </details>
      ))}
    </div>
  );
}
