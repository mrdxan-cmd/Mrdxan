import Link from "next/link";
import { company, fullAddress, mailHref, mapsHref, telHref } from "@/content/company";
import { footerNavigation } from "@/content/navigation";
import { activeSocialLinks } from "@/content/social";
import { regions } from "@/content/service-areas";
import { Logo } from "./Logo";
import { MailIcon, PhoneIcon, PinIcon, SocialGlyph } from "@/components/ui/Icons";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="surface-dark border-t border-white/5">
      <div className="container-x py-14 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo tone="light" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-300">{company.shortDescription}</p>
            <ul className="mt-6 space-y-3 text-sm">
              <li>
                <a href={mapsHref} target="_blank" rel="noopener noreferrer" className="group inline-flex items-start gap-3 text-ink-200 hover:text-white">
                  <PinIcon size={18} className="mt-0.5 shrink-0 text-ember-400" />
                  <span>
                    {company.legalName}
                    <br />
                    {fullAddress}
                  </span>
                </a>
              </li>
              <li>
                <a href={telHref} className="inline-flex items-center gap-3 text-ink-200 hover:text-white">
                  <PhoneIcon size={18} className="shrink-0 text-ember-400" />
                  {company.contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={mailHref} className="inline-flex items-center gap-3 text-ink-200 hover:text-white">
                  <MailIcon size={18} className="shrink-0 text-ember-400" />
                  {company.contact.email}
                </a>
              </li>
            </ul>
            {activeSocialLinks.length > 0 && (
              <ul className="mt-6 flex gap-2">
                {activeSocialLinks.map((link) => (
                  <li key={link.platform}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-ink-200 transition-colors hover:border-ember-400 hover:text-white"
                    >
                      <SocialGlyph platform={link.platform} size={18} />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <FooterColumn title="Leistungen" links={footerNavigation.leistungen} />
          <FooterColumn title="Unternehmen" links={footerNavigation.unternehmen} />

          <div>
            <h2 className="font-display text-sm font-bold uppercase tracking-[0.16em] text-ember-300">Einzugsgebiet</h2>
            <ul className="mt-4 space-y-2 text-sm text-ink-300">
              {regions.map((r) => (
                <li key={r.name}>
                  <span className="font-semibold text-ink-100">{r.name}</span>
                  <br />
                  {r.description}
                </li>
              ))}
            </ul>
            <h2 className="mt-8 font-display text-sm font-bold uppercase tracking-[0.16em] text-ember-300">Öffnungszeiten</h2>
            <ul className="mt-4 space-y-1 text-sm text-ink-300">
              {company.openingHours.map((h) => (
                <li key={`${h.label}-${h.opens}`}>
                  {h.label}: {h.opens} – {h.closes}
                </li>
              ))}
              <li className="text-ink-400">{company.openingHoursNote}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-ink-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {company.legalName} · UID {company.uid}
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {footerNavigation.rechtliches.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h2 className="font-display text-sm font-bold uppercase tracking-[0.16em] text-ember-300">{title}</h2>
      <ul className="mt-4 space-y-2.5 text-sm">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-ink-200 transition-colors hover:text-white">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
