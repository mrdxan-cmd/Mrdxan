/**
 * Customer reviews.
 *
 * NO reviews are fabricated. Add only real reviews (e.g. copied from the Google
 * Business Profile with the customer's consent) – the section shows a
 * "Bewertung schreiben" call-to-action while the list is empty.
 *
 * `ratingSummary` feeds schema.org AggregateRating and must match the real
 * Google rating; leave it null until verified.
 */
export interface Review {
  author: string;
  /** 1–5 */
  rating: number;
  text: string;
  /** e.g. "Google", "local.ch" */
  source: string;
  /** ISO date, optional */
  date?: string;
}

export const reviews: Review[] = [];

export const ratingSummary: { ratingValue: number; reviewCount: number; source: string } | null = null;
