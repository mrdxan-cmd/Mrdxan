/**
 * Services offered by Maler Phönix.
 *
 * The four service pillars follow the structure of the current website
 * (Fassaden, Malerarbeiten, Gipserarbeiten, Neubau & Renovation).
 * Copy was written for the new site – VERIFY against maler-gl.ch and adjust wording
 * where the live site contains valuable SEO text worth preserving.
 */

export type ServiceIcon = "facade" | "brush" | "trowel" | "building";

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface Service {
  slug: "fassaden" | "malerarbeiten" | "gipserarbeiten" | "neubau-renovation";
  /** Short navigation label */
  label: string;
  /** H1 / card title */
  title: string;
  /** SEO title (without brand suffix) */
  seoTitle: string;
  /** Meta description (≤ 160 chars) */
  description: string;
  /** One-liner used on cards */
  teaser: string;
  /** Intro paragraph(s) on the detail page */
  intro: string[];
  icon: ServiceIcon;
  /** Feature bullets */
  features: string[];
  /** Typical work steps */
  process: { title: string; text: string }[];
  /** Optional service specific FAQ (also rendered as FAQPage schema) */
  faq: ServiceFaq[];
  /** Optional hero image (real photo from the existing website). Leave undefined to render an illustration. */
  image?: { src: string; alt: string; width: number; height: number };
  /** Accent used by the illustration */
  accent: "ember" | "gold" | "flame" | "ink";
}

export const services: Service[] = [
  {
    slug: "fassaden",
    label: "Fassaden",
    title: "Fassadenrenovation & Fassadenanstrich",
    seoTitle: "Fassadenrenovation & Fassadenanstrich in Näfels GL",
    description:
      "Fassadensanierung, Fassadenanstrich und Fassadenreinigung im Kanton Glarus. Maler Phönix schützt und verschönert Ihre Fassade – jetzt Offerte anfragen.",
    teaser: "Schutz und Schönheit für Ihr Zuhause. Wetterbeständige Anstriche und professionelle Fassadenrenovation.",
    intro: [
      "Die Fassade ist die Visitenkarte Ihres Hauses und gleichzeitig sein Wetterschutz. Sonne, Regen und Frost setzen ihr jedes Jahr zu. Eine fachgerechte Fassadenrenovation erhält die Bausubstanz und wertet Ihre Liegenschaft sichtbar auf.",
      "Wir prüfen den Untergrund, beheben Risse und Schäden im Putz und tragen ein auf Ihr Gebäude abgestimmtes Anstrichsystem auf – langlebig, farbecht und passend zum Charakter Ihres Hauses.",
    ],
    icon: "facade",
    features: [
      "Fassadenreinigung und Algenentfernung",
      "Riss- und Putzsanierung",
      "Fassadenanstrich mit Silikat-, Silikon- oder Dispersionsfarben",
      "Abdichtungen und Holzschutz an Fassadenelementen",
      "Farbberatung für ein stimmiges Gesamtbild",
      "Gerüststellung in Zusammenarbeit mit regionalen Partnern",
    ],
    process: [
      { title: "Besichtigung vor Ort", text: "Wir begutachten Zustand und Untergrund Ihrer Fassade und besprechen Ihre Wünsche." },
      { title: "Transparente Offerte", text: "Sie erhalten eine klar aufgeschlüsselte Offerte – ohne versteckte Kosten." },
      { title: "Vorbereitung", text: "Reinigen, Ausbessern, Grundieren: Ein sauberer Untergrund ist die Basis für ein dauerhaftes Resultat." },
      { title: "Anstrich & Abnahme", text: "Fachgerechter Anstrich in mehreren Schichten, anschliessend gemeinsame Abnahme." },
    ],
    faq: [
      {
        question: "Wann ist die beste Jahreszeit für einen Fassadenanstrich?",
        answer:
          "Ideal sind trockene Perioden zwischen Frühling und Herbst mit Temperaturen über 5 °C. Wir planen die Ausführung wetterabhängig und informieren Sie frühzeitig über den Terminplan.",
      },
      {
        question: "Wie lange hält ein neuer Fassadenanstrich?",
        answer:
          "Je nach Farbsystem, Exposition und Untergrund hält ein fachgerecht ausgeführter Fassadenanstrich in der Regel 10 bis 15 Jahre.",
      },
    ],
    accent: "ember",
  },
  {
    slug: "malerarbeiten",
    label: "Malerarbeiten",
    title: "Malerarbeiten innen & aussen",
    seoTitle: "Malerarbeiten innen & aussen – Maler in Näfels GL",
    description:
      "Malerarbeiten für Wohnungen, Häuser und Gewerbe im Kanton Glarus: Wände, Decken, Türen, Fenster und Holz. Sauber, termintreu, fair. Offerte anfragen.",
    teaser: "Frische Farben für ein neues Wohngefühl. Saubere Arbeit, hochwertige Materialien und perfekte Oberflächen.",
    intro: [
      "Ein frischer Anstrich verändert einen Raum sofort. Ob einzelne Zimmer, die ganze Wohnung oder das Bürogebäude: Wir bereiten die Untergründe sorgfältig vor, arbeiten sauber und streichen mit hochwertigen, emissionsarmen Farben.",
      "Wir beraten Sie bei der Farbwahl, schützen Ihre Einrichtung zuverlässig und hinterlassen die Räume besenrein – damit Sie sich sofort wieder wohlfühlen.",
    ],
    icon: "brush",
    features: [
      "Wand- und Deckenanstriche in Wohn- und Geschäftsräumen",
      "Lackierarbeiten an Türen, Fenstern, Heizkörpern und Holz",
      "Tapezierarbeiten und Wandbeläge",
      "Dekorative Techniken und Akzentwände",
      "Renovationsanstriche bei Mieterwechsel",
      "Aussenanstriche an Holz, Metall und Putz",
    ],
    process: [
      { title: "Beratung & Farbwahl", text: "Wir hören zu, zeigen Muster und empfehlen passende Farbtöne und Produkte." },
      { title: "Abdecken & Schützen", text: "Möbel, Böden und Einbauten werden sorgfältig abgedeckt." },
      { title: "Untergrund vorbereiten", text: "Spachteln, schleifen, grundieren – für ein gleichmässiges, dauerhaftes Ergebnis." },
      { title: "Anstrich & Reinigung", text: "Mehrschichtiger Anstrich, Endkontrolle und besenreine Übergabe." },
    ],
    faq: [
      {
        question: "Kann ich während der Malerarbeiten in der Wohnung bleiben?",
        answer:
          "In den meisten Fällen ja. Wir arbeiten raumweise, decken sauber ab und verwenden emissionsarme Farben, damit Sie Ihre Räume schnell wieder nutzen können.",
      },
      {
        question: "Was kostet es, eine Wohnung streichen zu lassen?",
        answer:
          "Die Kosten hängen von Fläche, Zustand des Untergrunds und den gewünschten Produkten ab. Nach einer kurzen Besichtigung erhalten Sie von uns eine verbindliche, kostenlose Offerte.",
      },
    ],
    accent: "gold",
  },
  {
    slug: "gipserarbeiten",
    label: "Gipserarbeiten",
    title: "Gipserarbeiten & Verputz",
    seoTitle: "Gipserarbeiten, Verputz & Trockenbau in Näfels GL",
    description:
      "Gipserarbeiten im Kanton Glarus: Innenputz, Aussenputz, Spachtelarbeiten, Trockenbau und Sanierung von Rissen. Maler Phönix – Offerte anfragen.",
    teaser: "Glatte Wände und saubere Kanten. Innen- und Aussenputz, Spachtelarbeiten und Trockenbau vom Fachbetrieb.",
    intro: [
      "Ein perfekter Anstrich beginnt beim Untergrund. Unsere Gipserarbeiten schaffen ebene, tragfähige Flächen – vom Grundputz über Abrieb bis zur glatt gespachtelten Wand in Qualitätsstufe Q3.",
      "Wir sanieren beschädigte Putze, schliessen Risse dauerhaft und erstellen Trockenbauwände und Decken – alles aus einer Hand, abgestimmt mit den nachfolgenden Malerarbeiten.",
    ],
    icon: "trowel",
    features: [
      "Innenputz: Grundputz, Abrieb, Weissputz und Glattspachtel",
      "Aussenputz und Putzsanierung",
      "Rissbehebung und Ausbesserungen",
      "Trockenbau: Gipskartonwände, Decken und Verkleidungen",
      "Deckenspachtelungen und Oberflächen bis Q3",
      "Vorbereitung der Untergründe für Anstrich und Tapete",
    ],
    process: [
      { title: "Analyse des Untergrunds", text: "Wir prüfen Tragfähigkeit, Feuchtigkeit und Schäden des bestehenden Putzes." },
      { title: "Offerte", text: "Klar aufgeschlüsselt nach Fläche und Ausführung." },
      { title: "Ausführung", text: "Fachgerechter Auftrag der Putz- und Spachtelschichten mit sauberen Kanten und Anschlüssen." },
      { title: "Abnahme", text: "Kontrolle der Oberflächenqualität und Übergabe – bereit für den Anstrich." },
    ],
    faq: [
      {
        question: "Was bedeutet Oberflächenqualität Q2 oder Q3?",
        answer:
          "Die Qualitätsstufen beschreiben die Ebenheit gespachtelter Flächen. Q2 ist der Standard für strukturierte Beschichtungen, Q3 die Empfehlung für glatte, matte Anstriche bei Streiflicht.",
      },
    ],
    accent: "ink",
  },
  {
    slug: "neubau-renovation",
    label: "Neubau & Renovation",
    title: "Neubau & Renovation",
    seoTitle: "Maler- und Gipserarbeiten für Neubau & Renovation in Glarus",
    description:
      "Komplette Maler- und Gipserarbeiten für Neubauten und Renovationen im Kanton Glarus. Ein Ansprechpartner, klare Termine, saubere Ausführung. Offerte anfragen.",
    teaser: "Gipserarbeiten, Verputz und Gesamtlösungen für Neubau und Renovation – alles aus einer Hand.",
    intro: [
      "Beim Neubau zählen Termintreue und Koordination: Wir arbeiten eng mit Architektinnen, Bauleitern und anderen Handwerkern zusammen und liefern Gipser- und Malerarbeiten in vereinbarter Qualität – pünktlich zur Übergabe.",
      "Bei Renovationen holen wir das Beste aus bestehenden Räumen heraus: Wir sanieren Untergründe, modernisieren Oberflächen und begleiten Sie von der ersten Idee bis zur fertigen Wohnung.",
    ],
    icon: "building",
    features: [
      "Komplettlösungen Gipser- und Malerarbeiten im Neubau",
      "Sanierung und Modernisierung von Wohnungen und Häusern",
      "Renovation bei Mieterwechsel für Verwaltungen und Eigentümer",
      "Koordination mit Architekt, Bauleitung und Handwerkern",
      "Verbindliche Terminplanung und Fixpreise nach Ausmass",
      "Beratung zu Farben, Materialien und Oberflächen",
    ],
    process: [
      { title: "Projektbesprechung", text: "Wir klären Umfang, Termine und Qualitätsanforderungen gemeinsam mit Ihnen." },
      { title: "Planung & Offerte", text: "Detaillierte Offerte und Terminplan, abgestimmt auf den Bauablauf." },
      { title: "Ausführung", text: "Gipser- und Malerarbeiten aus einer Hand, koordiniert mit den anderen Gewerken." },
      { title: "Übergabe", text: "Gemeinsame Abnahme und saubere Übergabe der fertigen Räume." },
    ],
    faq: [
      {
        question: "Arbeiten Sie auch für Verwaltungen und Generalunternehmer?",
        answer:
          "Ja. Wir betreuen Liegenschaftsverwaltungen, Architekturbüros und Generalunternehmer im Glarnerland und in der Region – mit verlässlichen Terminen und sauberer Dokumentation.",
      },
    ],
    accent: "flame",
  },
];

export const serviceMap = Object.fromEntries(services.map((s) => [s.slug, s])) as Record<Service["slug"], Service>;

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
