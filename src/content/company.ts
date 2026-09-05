/**
 * Central company & contact data.
 *
 * SOURCE OF TRUTH: the live website https://www.maler-gl.ch
 *
 * Every field marked with `VERIFY` could not be cross-checked against the live
 * website from the build environment (network access to maler-gl.ch was blocked).
 * See docs/CONTENT-VERIFICATION.md for the full checklist before go-live.
 */

export const company = {
  /** Brand name used in the UI. */
  brand: "Maler Phönix",
  /** Legal entity (listed on local.ch as "Phönix Fo GmbH – Maler in Näfels"). VERIFY spelling against Impressum. */
  legalName: "Phönix FO GmbH",
  /** Swiss UID – VERIFY against Impressum / zefix.ch */
  uid: "CHE-376.925.972",
  /** VAT registration – set to the UID with " MWST" suffix if VAT registered, otherwise null. VERIFY */
  vatNumber: null as string | null,
  /** Founding year – VERIFY */
  foundedYear: null as number | null,
  /** Owner / contact person – VERIFY name & role against Impressum */
  owner: {
    name: "Firas Othman",
    role: "Geschäftsführer",
  },
  address: {
    street: "Burgstrasse 8", // VERIFY
    postalCode: "8752",
    city: "Näfels",
    region: "GL",
    regionName: "Glarus",
    country: "CH",
    countryName: "Schweiz",
  },
  /** Approximate coordinates of Näfels – VERIFY / refine with exact address geocode. */
  geo: {
    latitude: 47.0975,
    longitude: 9.0633,
  },
  contact: {
    /**
     * Display format (Swiss). VERIFY – CONFLICT:
     *   - "079 223 25 13" = employer phone of Phönix FO GmbH in the owner's own documents (used here)
     *   - "055 610 27 44" appears in the design mockup (mockup content is unverified filler)
     * Resolve against the live website / Impressum before go-live.
     */
    phoneDisplay: "079 223 25 13",
    /** E.164 for tel: links and schema.org. VERIFY (see conflict above) */
    phoneE164: "+41792232513",
    /** VERIFY – placeholder pattern based on the domain. */
    email: "info@maler-gl.ch",
    /** Optional WhatsApp number (E.164 without +). Set to null to hide the WhatsApp button. VERIFY */
    whatsapp: "41792232513" as string | null,
  },
  /**
   * Opening hours – VERIFY. The design mockup shows "Mo–Fr 07:00 – 17:00"; adopted as the
   * single documented source. Used for display and schema.org OpeningHoursSpecification.
   */
  openingHours: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], label: "Montag – Freitag", opens: "07:00", closes: "17:00" },
  ],
  /** Short hours label for compact UI (contact section, footer). */
  openingHoursShort: "Mo – Fr 07:00 – 17:00",
  openingHoursNote: "Termine ausserhalb der Bürozeiten nach Vereinbarung.",
  /** Region label used in the contact section (mockup: "Glarus & Umgebung"). */
  regionLabel: "Glarus & Umgebung",
  /** Short "about" text used on the homepage and the Über uns page. */
  shortDescription:
    "Maler Phönix ist Ihr Malergeschäft in Näfels. Wir übernehmen Malerarbeiten, Gipserarbeiten und Fassadenrenovationen für private und gewerbliche Kundschaft im Kanton Glarus und der umliegenden Region – sauber, termintreu und mit Blick fürs Detail.",
  /** Languages spoken – VERIFY */
  languages: ["Deutsch", "Englisch", "Arabisch", "Kurdisch"],
  /** Price range for schema.org (optional). */
  priceRange: "CHF",
} as const;

export type Company = typeof company;

export const fullAddress = `${company.address.street}, ${company.address.postalCode} ${company.address.city}`;

export const telHref = `tel:${company.contact.phoneE164}`;
export const mailHref = `mailto:${company.contact.email}`;
export const whatsappHref = company.contact.whatsapp
  ? `https://wa.me/${company.contact.whatsapp}?text=${encodeURIComponent("Guten Tag, ich interessiere mich für eine Offerte von Maler Phönix.")}`
  : null;

export const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${company.legalName}, ${fullAddress}`,
)}`;
