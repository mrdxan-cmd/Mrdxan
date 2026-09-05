import Image from "next/image";
import { company, telHref } from "@/content/company";
import { Button } from "@/components/ui/Button";
import { ArrowRightIcon, CheckIcon, PhoneIcon } from "@/components/ui/Icons";

const highlights = ["Kostenlose Offerte", "Termintreu & sauber", "Regional aus Näfels"];

export function Hero() {
  return (
    <section className="surface-dark relative overflow-hidden">
      {/* decorative grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgb(255_255_255/0.6)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.6)_1px,transparent_1px)] [background-size:56px_56px]"
      />
      <div className="container-x relative grid items-center gap-10 py-14 sm:py-20 lg:min-h-[calc(100svh-var(--header-height))] lg:grid-cols-[1.1fr_1fr] lg:gap-8 lg:py-16">
        <div className="animate-fade-up">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-ember-200">
            <span className="h-1.5 w-1.5 rounded-full bg-ember-400 animate-ember" />
            Malergeschäft in Näfels GL
          </p>
          <h1 className="font-display text-[2.6rem] font-extrabold leading-[1.02] text-white sm:text-6xl lg:text-[4.4rem]">
            Farbe, die bleibt.
            <br />
            <span className="text-gradient-ember">Handwerk, das überzeugt.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-200 sm:text-xl">
            Malerarbeiten, Gipserarbeiten und Fassadenrenovationen im Kanton Glarus und Umgebung – sauber ausgeführt,
            termintreu und mit fairen Offerten.
          </p>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-ink-100">
            {highlights.map((h) => (
              <li key={h} className="inline-flex items-center gap-2">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-ember-500/20 text-ember-300">
                  <CheckIcon size={13} strokeWidth={2.6} />
                </span>
                {h}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href="/kontakt#offerte" size="lg">
              Offerte anfragen
              <ArrowRightIcon size={20} />
            </Button>
            <Button href={telHref} size="lg" variant="outline-light">
              <PhoneIcon size={20} className="text-ember-300" />
              {company.contact.phoneDisplay}
            </Button>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[34rem] lg:max-w-none">
          <div aria-hidden="true" className="absolute inset-[10%] rounded-full bg-ember-500/25 blur-3xl animate-ember" />
          <Image
            src="/images/brand/phoenix.svg"
            alt="Phönix – Symbol von Maler Phönix für Erneuerung und Qualität"
            width={800}
            height={800}
            priority
            className="relative mx-auto w-[85%] drop-shadow-[0_30px_60px_rgb(244_95_20/0.35)] animate-float sm:w-[80%] lg:w-full"
          />
        </div>
      </div>
    </section>
  );
}
