import type { Metadata } from "next";
import { company, fullAddress, mailHref } from "@/content/company";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Datenschutzerklärung",
  description: `Datenschutzerklärung der ${company.legalName} – Informationen zur Bearbeitung von Personendaten auf dieser Website.`,
  path: "/datenschutz",
  noIndex: true,
});

/**
 * Datenschutzerklärung nach revidiertem Schweizer Datenschutzgesetz (revDSG).
 * VERIFY: compare with the current live version; adjust hosting provider (Vercel) and
 * e-mail provider once the final infrastructure is chosen.
 */
export default function DatenschutzPage() {
  const sections: { title: string; paragraphs: React.ReactNode[] }[] = [
    {
      title: "1. Verantwortliche Stelle",
      paragraphs: [
        <>
          Verantwortlich für die Datenbearbeitung auf dieser Website ist die {company.legalName}, {fullAddress}, E-Mail:{" "}
          <a href={mailHref} className="font-semibold text-brand-magenta">
            {company.contact.email}
          </a>
          .
        </>,
      ],
    },
    {
      title: "2. Welche Daten wir bearbeiten",
      paragraphs: [
        "Beim Besuch dieser Website werden automatisch technische Daten erfasst (z. B. IP-Adresse, Datum und Uhrzeit des Zugriffs, aufgerufene Seiten, Browsertyp, Betriebssystem). Diese Daten werden vom Hosting-Anbieter in Server-Logfiles gespeichert und dienen der Sicherheit und Stabilität der Website.",
        "Wenn Sie unser Offert- bzw. Kontaktformular nutzen, bearbeiten wir die von Ihnen eingegebenen Angaben (Name, Telefonnummer, E-Mail-Adresse, Ort des Objekts, gewünschte Leistung, Nachricht) ausschliesslich zur Bearbeitung Ihrer Anfrage und zur Erstellung einer Offerte.",
      ],
    },
    {
      title: "3. Zweck und Rechtsgrundlage",
      paragraphs: [
        "Wir bearbeiten Personendaten zur Erfüllung unserer vertraglichen und vorvertraglichen Pflichten (Beratung, Offerte, Auftragsabwicklung), aufgrund unseres berechtigten Interesses an einem sicheren und funktionierenden Webauftritt sowie – wo erforderlich – aufgrund Ihrer Einwilligung.",
      ],
    },
    {
      title: "4. Hosting und Weitergabe an Dritte",
      paragraphs: [
        "Diese Website wird bei einem spezialisierten Hosting-Anbieter betrieben. Dabei können Personendaten (insbesondere Server-Logfiles) auf Servern im Ausland, u. a. in der EU und in den USA, bearbeitet werden. Der Anbieter ist vertraglich zur Einhaltung eines angemessenen Datenschutzniveaus verpflichtet.",
        "Anfragen über das Offertformular werden per E-Mail an uns übermittelt. Dafür kann ein technischer E-Mail-Dienstleister eingesetzt werden. Eine Weitergabe Ihrer Daten an weitere Dritte erfolgt nur, wenn dies zur Auftragsabwicklung notwendig ist oder wir gesetzlich dazu verpflichtet sind.",
      ],
    },
    {
      title: "5. Google Maps",
      paragraphs: [
        "Auf der Kontaktseite binden wir eine Karte von Google Maps (Google Ireland Limited) ein. Beim Laden der Karte werden Daten wie Ihre IP-Adresse an Google übermittelt. Weitere Informationen finden Sie in der Datenschutzerklärung von Google unter policies.google.com/privacy.",
      ],
    },
    {
      title: "6. Cookies und Webanalyse",
      paragraphs: [
        "Diese Website setzt keine Tracking-Cookies und keine Webanalyse-Dienste ein. Technisch notwendige Speicherungen im Browser erfolgen ausschliesslich zur Funktion der Website.",
      ],
    },
    {
      title: "7. Aufbewahrung",
      paragraphs: [
        "Anfragen bewahren wir so lange auf, wie es für die Bearbeitung und eine allfällige Auftragsabwicklung notwendig ist, bzw. so lange gesetzliche Aufbewahrungspflichten bestehen. Server-Logfiles werden in der Regel nach kurzer Zeit automatisch gelöscht.",
      ],
    },
    {
      title: "8. Ihre Rechte",
      paragraphs: [
        <>
          Sie haben das Recht auf Auskunft über die zu Ihrer Person bearbeiteten Daten, auf Berichtigung, Löschung oder Einschränkung der
          Bearbeitung sowie auf Datenherausgabe. Wenden Sie sich dafür an{" "}
          <a href={mailHref} className="font-semibold text-brand-magenta">
            {company.contact.email}
          </a>
          . Zudem haben Sie das Recht, sich beim Eidgenössischen Datenschutz- und Öffentlichkeitsbeauftragten (EDÖB) zu beschweren.
        </>,
      ],
    },
    {
      title: "9. Änderungen",
      paragraphs: [
        "Wir können diese Datenschutzerklärung jederzeit anpassen. Es gilt die jeweils auf dieser Website veröffentlichte Fassung.",
      ],
    },
  ];

  return (
    <>
      <PageHero title="Datenschutzerklärung" crumbs={[{ name: "Datenschutz", path: "/datenschutz" }]} compact />
      <Section tone="paper">
        <div className="container-x max-w-3xl space-y-8 text-[15px] leading-relaxed text-ink-700">
          <p>
            Der Schutz Ihrer Personendaten ist uns wichtig. Nachfolgend informieren wir Sie gemäss dem Schweizer Datenschutzgesetz (DSG) darüber,
            welche Daten wir beim Besuch dieser Website und bei Anfragen bearbeiten.
          </p>
          {sections.map((s) => (
            <section key={s.title}>
              <h2 className="font-display text-xl font-bold text-ink-900">{s.title}</h2>
              {s.paragraphs.map((p, i) => (
                <p key={i} className="mt-3">
                  {p}
                </p>
              ))}
            </section>
          ))}
          <p className="text-sm text-ink-500">Stand: September 2026</p>
        </div>
      </Section>
    </>
  );
}
