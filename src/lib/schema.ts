/**
 * schema.org JSON-LD builders. All data is derived from the central content files.
 */
import { company, fullAddress } from "@/content/company";
import { serviceAreas } from "@/content/service-areas";
import { activeSocialLinks } from "@/content/social";
import { ratingSummary, reviews } from "@/content/reviews";
import type { Service } from "@/content/services";
import type { FaqItem } from "@/content/faq";
import type { Project } from "@/content/projects";
import { site } from "@/content/site";
import { absoluteUrl } from "./seo";

type JsonLd = Record<string, unknown>;

export const organizationId = () => `${absoluteUrl("/")}#organization`;

export function localBusinessSchema(): JsonLd {
  const schema: JsonLd = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "HousePainter"],
    "@id": organizationId(),
    name: company.brand,
    legalName: company.legalName,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/images/brand/icon-512.png"),
    image: absoluteUrl(site.ogImage),
    description: company.shortDescription,
    telephone: company.contact.phoneE164,
    email: company.contact.email,
    priceRange: company.priceRange,
    address: {
      "@type": "PostalAddress",
      streetAddress: company.address.street,
      postalCode: company.address.postalCode,
      addressLocality: company.address.city,
      addressRegion: company.address.region,
      addressCountry: company.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: company.geo.latitude,
      longitude: company.geo.longitude,
    },
    openingHoursSpecification: company.openingHours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    areaServed: serviceAreas.map((a) => ({ "@type": "City", name: a.name })),
    knowsLanguage: company.languages,
    sameAs: activeSocialLinks.map((l) => l.url),
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`,
  };
  if (company.vatNumber) schema.vatID = company.vatNumber;
  if (company.foundedYear) schema.foundingDate = String(company.foundedYear);
  if (ratingSummary) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: ratingSummary.ratingValue,
      reviewCount: ratingSummary.reviewCount,
      bestRating: 5,
      worstRating: 1,
    };
  }
  if (reviews.length) {
    schema.review = reviews.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.author },
      reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5 },
      reviewBody: r.text,
      ...(r.date ? { datePublished: r.date } : {}),
    }));
  }
  return schema;
}

export function websiteSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${absoluteUrl("/")}#website`,
    url: absoluteUrl("/"),
    name: site.name,
    inLanguage: site.locale,
    publisher: { "@id": organizationId() },
  };
}

export function serviceSchema(service: Service): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl(`/leistungen/${service.slug}`)}#service`,
    name: service.title,
    description: service.description,
    serviceType: service.label,
    url: absoluteUrl(`/leistungen/${service.slug}`),
    provider: { "@id": organizationId() },
    areaServed: serviceAreas.map((a) => ({ "@type": "City", name: a.name })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: service.title,
      itemListElement: service.features.map((f) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: f },
      })),
    },
  };
}

export function faqSchema(items: FaqItem[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function projectSchema(project: Project): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.teaser,
    url: absoluteUrl(`/projekte/${project.slug}`),
    locationCreated: { "@type": "Place", name: project.location },
    ...(project.year ? { dateCreated: project.year } : {}),
    ...(project.cover ? { image: absoluteUrl(project.cover.src) } : {}),
    creator: { "@id": organizationId() },
  };
}

export function contactPageSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    url: absoluteUrl("/kontakt"),
    name: "Kontakt & Offerte – Maler Phönix",
    mainEntity: { "@id": organizationId() },
  };
}
