/**
 * General FAQ (rendered on /faq and as FAQPage schema.org data).
 * VERIFY: adjust answers to actual business practice (Offerte, Einzugsgebiet, Garantie ...).
 */
export interface FaqItem {
  question: string;
  answer: string;
}

export const faq: FaqItem[] = [
  {
    question: "Ist die Offerte kostenlos und unverbindlich?",
    answer:
      "Ja. Wir besichtigen Ihr Objekt vor Ort, besprechen Ihre Wünsche und erstellen Ihnen eine kostenlose, unverbindliche Offerte mit transparent aufgeschlüsselten Positionen.",
  },
  {
    question: "In welcher Region ist Maler Phönix tätig?",
    answer:
      "Unser Einzugsgebiet ist der Kanton Glarus – insbesondere Glarus Nord mit Näfels, Mollis, Niederurnen und Oberurnen – sowie das angrenzende Linthgebiet und die March. Für grössere Projekte sind wir auch darüber hinaus für Sie da.",
  },
  {
    question: "Wie schnell kann ein Auftrag ausgeführt werden?",
    answer:
      "Kleinere Malerarbeiten können wir meist innert weniger Wochen einplanen. Bei Fassaden und Renovationen hängt der Termin von Umfang und Wetter ab. Sagen Sie uns Ihren Wunschtermin – wir finden eine Lösung.",
  },
  {
    question: "Welche Farben und Materialien verwenden Sie?",
    answer:
      "Wir arbeiten mit hochwertigen Produkten führender Hersteller und setzen im Innenbereich bevorzugt emissionsarme, wohngesunde Farben ein. Bei Fassaden wählen wir das Anstrichsystem passend zum Untergrund und zur Wetterexposition.",
  },
  {
    question: "Übernehmen Sie auch kleine Aufträge?",
    answer:
      "Selbstverständlich. Ob ein einzelnes Zimmer, eine Tür oder eine kleine Ausbesserung am Verputz – jeder Auftrag wird mit derselben Sorgfalt ausgeführt.",
  },
  {
    question: "Muss ich die Räume vor den Malerarbeiten ausräumen?",
    answer:
      "Nein, das ist nicht nötig. Wir rücken Möbel zusammen, decken alles sorgfältig ab und schützen Böden und Einbauten. Kleinere Gegenstände und Wertsachen bringen Sie am besten vorher in Sicherheit.",
  },
  {
    question: "Arbeiten Sie auch für Liegenschaftsverwaltungen und Firmen?",
    answer:
      "Ja. Wir betreuen Verwaltungen, Eigentümer, Architekturbüros und Gewerbebetriebe – zuverlässig, mit klaren Terminen und einem festen Ansprechpartner.",
  },
  {
    question: "Wie kann ich eine Offerte anfragen?",
    answer:
      "Am einfachsten über unser Offertformular auf der Kontaktseite, telefonisch oder per E-Mail. Wir melden uns in der Regel innert eines Arbeitstages bei Ihnen.",
  },
];
