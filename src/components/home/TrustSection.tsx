import { trustItems, visibleStats } from "@/content/trust";
import { Section, SectionHeading } from "@/components/ui/Section";
import { TrustGlyph } from "@/components/ui/Icons";

export function TrustSection() {
  return (
    <Section tone="white">
      <div className="container-x">
        <SectionHeading
          eyebrow="Warum Maler Phönix"
          title="Handwerk mit Verantwortung"
          text="Wir behandeln jedes Objekt so, als wäre es unser eigenes – mit Sorgfalt, klarer Kommunikation und Respekt vor Ihrem Zuhause."
          align="center"
        />
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {trustItems.map((item) => (
            <li key={item.title} className="flex gap-4 rounded-2xl border border-ink-100 bg-paper p-6">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ink-50 text-brand-magenta">
                <TrustGlyph icon={item.icon} size={22} />
              </span>
              <div>
                <h3 className="font-display text-lg font-bold text-ink-900">{item.title}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-ink-600">{item.text}</p>
              </div>
            </li>
          ))}
        </ul>
        {visibleStats.length > 0 && (
          <dl className="mt-12 grid gap-6 rounded-3xl bg-ink-950 px-6 py-8 text-center text-white sm:grid-cols-2 lg:grid-cols-4 lg:px-10">
            {visibleStats.map((s) => (
              <div key={s.label}>
                <dd className="font-display text-4xl font-extrabold text-gradient-brand">{s.value}</dd>
                <dt className="mt-1 text-sm text-ink-300">{s.label}</dt>
              </div>
            ))}
          </dl>
        )}
      </div>
    </Section>
  );
}
