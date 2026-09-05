import { reviews, ratingSummary } from "@/content/reviews";
import { googleReviewUrl } from "@/content/social";
import { Section, SectionHeading } from "@/components/ui/Section";
import { QuoteIcon, StarIcon } from "@/components/ui/Icons";
import { Button } from "@/components/ui/Button";

function Stars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex gap-0.5 text-gold-500" aria-label={`${rating} von 5 Sternen`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon key={i} size={16} filled={i < Math.round(rating)} />
      ))}
    </span>
  );
}

export function ReviewsSection() {
  return (
    <Section tone="white">
      <div className="container-x">
        <SectionHeading
          eyebrow="Kundenstimmen"
          title="Das sagen unsere Kundinnen und Kunden"
          text={
            ratingSummary
              ? `${ratingSummary.ratingValue.toFixed(1)} von 5 Sternen aus ${ratingSummary.reviewCount} Bewertungen auf ${ratingSummary.source}.`
              : "Zufriedene Kundschaft ist unsere beste Referenz – im Glarnerland und in der Region."
          }
          align="center"
        />
        {reviews.length > 0 ? (
          <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((r) => (
              <li key={`${r.author}-${r.date ?? ""}`} className="relative flex flex-col rounded-2xl border border-ink-100 bg-paper p-6">
                <QuoteIcon size={28} className="text-ember-200" />
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-ink-700">„{r.text}“</p>
                <div className="mt-5 flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-ink-900">{r.author}</p>
                    <p className="text-xs text-ink-500">{r.source}</p>
                  </div>
                  <Stars rating={r.rating} />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mx-auto mt-10 max-w-2xl rounded-3xl border border-ink-100 bg-paper p-8 text-center sm:p-10">
            <p className="inline-flex gap-1 text-gold-500" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon key={i} size={22} />
              ))}
            </p>
            <p className="mt-4 text-lg font-semibold text-ink-900">Waren Sie mit unserer Arbeit zufrieden?</p>
            <p className="mt-2 text-ink-600">
              Ihre Bewertung hilft anderen Bauherrinnen und Bauherren im Glarnerland, den richtigen Maler zu finden.
            </p>
            <div className="mt-6">
              {googleReviewUrl ? (
                <Button href={googleReviewUrl} variant="secondary" target="_blank" rel="noopener noreferrer">
                  Bewertung auf Google schreiben
                </Button>
              ) : (
                <Button href="/kontakt" variant="secondary">
                  Feedback senden
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </Section>
  );
}
