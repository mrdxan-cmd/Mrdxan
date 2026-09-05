import { reviews, ratingSummary } from "@/content/reviews";
import { googleReviewUrl } from "@/content/social";
import { Section, SectionHeading } from "@/components/ui/Section";
import { StarIcon } from "@/components/ui/Icons";
import { Button } from "@/components/ui/Button";

function Stars({ rating, size = 18 }: { rating: number; size?: number }) {
  return (
    <span className="inline-flex gap-0.5 text-gold-500" aria-label={`${rating} von 5 Sternen`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon key={i} size={size} filled={i < Math.round(rating)} />
      ))}
    </span>
  );
}

/**
 * Mockup: "DAS SAGEN UNSERE KUNDEN · Vertrauen, das bleibt." with the rating summary
 * on the right and three quote cards. Only REAL reviews/ratings are rendered
 * (src/content/reviews.ts); until then a review call-to-action is shown.
 */
export function ReviewsSection() {
  return (
    <Section tone="white" className="relative overflow-hidden">
      <div aria-hidden="true" className="splash-brand pointer-events-none absolute -right-10 top-10 h-40 w-64 opacity-60" />
      <div className="container-x relative">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow="Das sagen unsere Kunden" title="Vertrauen, das bleibt." />
          {ratingSummary && (
            <div className="lg:text-right">
              <p className="flex items-center gap-2 lg:justify-end">
                <Stars rating={ratingSummary.ratingValue} size={24} />
                <span className="font-display text-xl font-extrabold text-ink-900">{ratingSummary.ratingValue.toFixed(1)} / 5</span>
              </p>
              <p className="mt-1 text-sm text-ink-500">
                Basierend auf {ratingSummary.reviewCount} Bewertungen auf {ratingSummary.source}
              </p>
            </div>
          )}
        </div>

        {reviews.length > 0 ? (
          <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((r) => (
              <li key={`${r.author}-${r.date ?? ""}`} className="flex flex-col rounded-2xl border border-ink-100 bg-white p-6 shadow-card">
                <Stars rating={r.rating} />
                <p className="mt-4 flex-1 text-[15px] leading-relaxed text-ink-700">“{r.text}”</p>
                <div className="mt-5">
                  <p className="font-bold text-ink-900">{r.author}</p>
                  <p className="text-xs text-ink-500">{r.source}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-[1.2fr_1fr] md:items-center">
            <div className="rounded-2xl border border-ink-100 bg-paper p-6 sm:p-8">
              <Stars rating={5} size={22} />
              <p className="mt-4 font-display text-xl font-extrabold text-ink-900">Waren Sie mit unserer Arbeit zufrieden?</p>
              <p className="mt-2 text-ink-600">
                Ihre Bewertung hilft anderen Bauherrinnen und Bauherren in der Region Glarus, den richtigen Maler zu finden. Echte Kundenstimmen
                erscheinen hier, sobald sie freigegeben sind.
              </p>
              <div className="mt-6">
                {googleReviewUrl ? (
                  <Button href={googleReviewUrl} target="_blank" rel="noopener noreferrer">
                    Bewertung auf Google schreiben
                  </Button>
                ) : (
                  <Button href="/kontakt" variant="secondary">
                    Feedback senden
                  </Button>
                )}
              </div>
            </div>
            <p className="font-hand text-4xl leading-tight text-ink-800 md:text-5xl">
              Gemeinsam
              <br />
              <span className="text-gradient-brand">schöner wohnen.</span>
            </p>
          </div>
        )}
      </div>
    </Section>
  );
}
