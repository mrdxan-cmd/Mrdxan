import type { Metadata } from "next";
import { company, fullAddress, mailHref, telHref } from "@/content/company";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Impressum",
  description: `Impressum der ${company.legalName}, ${fullAddress}.`,
  path: "/impressum",
  noIndex: true,
});

/**
 * VERIFY: compare every statement with the Impressum on the live website.
 */
export default function ImpressumPage() {
  return (
    <>
      <PageHero title="Impressum" crumbs={[{ name: "Impressum", path: "/impressum" }]} compact />
      <Section tone="paper">
        <div className="container-x max-w-3xl">
          <div className="prose-legal space-y-8 text-[15px] leading-relaxed text-ink-700">
            <section>
              <h2 className="font-display text-xl font-bold text-ink-900">Verantwortlich für den Inhalt</h2>
              <p className="mt-3">
                {company.legalName}
                <br />
                {company.address.street}
                <br />
                {company.address.postalCode} {company.address.city}
                <br />
                {company.address.countryName}
              </p>
              <p className="mt-3">
                Telefon:{" "}
                <a href={telHref} className="font-semibold text-brand-magenta">
                  {company.contact.phoneDisplay}
                </a>
                <br />
                E-Mail:{" "}
                <a href={mailHref} className="font-semibold text-brand-magenta">
                  {company.contact.email}
                </a>
              </p>
              <p className="mt-3">
                Vertretungsberechtigte Person: {company.owner.name}, {company.owner.role}
                <br />
                Unternehmens-Identifikationsnummer (UID): {company.uid}
                {company.vatNumber && (
                  <>
                    <br />
                    MWST-Nummer: {company.vatNumber}
                  </>
                )}
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-ink-900">Haftungsausschluss</h2>
              <p className="mt-3">
                Der Autor übernimmt keinerlei Gewähr hinsichtlich der inhaltlichen Richtigkeit, Genauigkeit, Aktualität, Zuverlässigkeit und
                Vollständigkeit der Informationen. Haftungsansprüche gegen den Autor wegen Schäden materieller oder immaterieller Art, welche aus
                dem Zugriff oder der Nutzung bzw. Nichtnutzung der veröffentlichten Informationen, durch Missbrauch der Verbindung oder durch
                technische Störungen entstanden sind, werden ausgeschlossen.
              </p>
              <p className="mt-3">
                Alle Angebote sind unverbindlich. Der Autor behält es sich ausdrücklich vor, Teile der Seiten oder das gesamte Angebot ohne
                gesonderte Ankündigung zu verändern, zu ergänzen, zu löschen oder die Veröffentlichung zeitweise oder endgültig einzustellen.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-ink-900">Haftung für Links</h2>
              <p className="mt-3">
                Verweise und Links auf Webseiten Dritter liegen ausserhalb unseres Verantwortungsbereichs. Es wird jegliche Verantwortung für
                solche Webseiten abgelehnt. Der Zugriff und die Nutzung solcher Webseiten erfolgen auf eigene Gefahr des Nutzers oder der
                Nutzerin.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-ink-900">Urheberrechte</h2>
              <p className="mt-3">
                Die Urheber- und alle anderen Rechte an Inhalten, Bildern, Fotos oder anderen Dateien auf dieser Website gehören ausschliesslich
                der {company.legalName} oder den speziell genannten Rechtsinhabern. Für die Reproduktion jeglicher Elemente ist die schriftliche
                Zustimmung der Urheberrechtsträger im Voraus einzuholen.
              </p>
            </section>
          </div>
        </div>
      </Section>
    </>
  );
}
