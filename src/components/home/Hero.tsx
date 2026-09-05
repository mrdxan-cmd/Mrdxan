import Image from "next/image";
import { site } from "@/content/site";
import { visibleHighlights } from "@/content/trust";
import { Button } from "@/components/ui/Button";
import { ArrowRightIcon, HighlightGlyph, PlayIcon } from "@/components/ui/Icons";
import { MountainBackdrop } from "@/components/ui/MountainBackdrop";
import { SwissFlag } from "@/components/ui/SwissFlag";

/**
 * Homepage hero after the mockup: dark alpine backdrop, headline with gradient
 * second line, gradient + outline CTAs, trust row and the phoenix artwork with
 * handwritten notes on the right.
 */
export function Hero() {
  return (
    <section className="surface-dark relative overflow-hidden">
      <MountainBackdrop opacity={0.4} className="h-[55%] lg:h-[70%]" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60rem_30rem_at_75%_40%,rgb(124_44_245/0.25),transparent_60%)]"
      />

      <div className="container-x relative grid items-center gap-10 py-12 sm:py-16 lg:min-h-[calc(100svh-var(--header-height))] lg:grid-cols-[1fr_1.15fr] lg:gap-6 lg:py-16">
        {/* Copy */}
        <div className="animate-fade-up">
          <h1 className="font-display text-[2.75rem] font-extrabold leading-[1.02] tracking-[-0.03em] text-white sm:text-6xl lg:text-[4.6rem]">
            Maler &amp; Gipser
            <br />
            <span className="text-gradient-brand">in Glarus</span>
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-200 sm:text-xl">
            Fassaden, Innenräume, Neubau und Renovation – sauber, termintreu und persönlich betreut.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href="/kontakt#offerte" size="lg">
              Offerte anfordern
              <ArrowRightIcon size={20} />
            </Button>
            <Button href="/projekte" size="lg" variant="outline-light">
              Projekte ansehen
              <PlayIcon size={16} />
            </Button>
          </div>
          {visibleHighlights.length > 0 && (
            <ul className="mt-9 flex flex-wrap gap-x-7 gap-y-4 border-t border-white/10 pt-7 sm:max-w-lg">
              {visibleHighlights.map((h) => (
                <li key={h.label} className="flex items-center gap-3 sm:flex-1">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white">
                    <HighlightGlyph icon={h.icon} size={20} />
                  </span>
                  <span className="text-sm font-semibold leading-tight text-white">{h.label}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Artwork */}
        <div className="relative mx-auto w-full max-w-[38rem] lg:max-w-none">
          <div aria-hidden="true" className="absolute inset-[12%] rounded-full bg-brand-violet/30 blur-3xl animate-ember" />
          <Image
            src="/images/brand/phoenix.png"
            alt="Phönix mit Malerpinsel – das Markenzeichen von Maler Phönix"
            width={1427}
            height={996}
            priority
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="relative w-full drop-shadow-[0_30px_60px_rgb(124_44_245/0.45)] animate-float"
          />
          <p
            aria-hidden="true"
            className="font-hand pointer-events-none absolute right-0 top-2 hidden rotate-[-8deg] text-3xl leading-tight text-white/90 sm:block lg:right-4 lg:top-6 lg:text-4xl"
          >
            Schönere Räume.
            <br />
            Stärkere Region.
          </p>
          <p className="font-hand mt-2 flex items-end justify-end gap-2 text-2xl leading-tight text-white/90 sm:text-3xl lg:absolute lg:bottom-2 lg:right-4 lg:mt-0">
            <span className="text-right">
              Aus Glarus.
              <br />
              Für schöne Lebensräume.
            </span>
            <SwissFlag className="mb-1 h-4 w-4" />
          </p>
          <span className="sr-only">{site.claim}</span>
        </div>
      </div>
    </section>
  );
}
