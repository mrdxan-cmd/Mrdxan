import Link from "next/link";
import { company, fullAddress, mailHref, mapsHref, telHref } from "@/content/company";
import { footerNavigation } from "@/content/navigation";
import { activeSocialLinks } from "@/content/social";
import { site } from "@/content/site";
import { footerClaim, footerClaimSuffix } from "@/content/trust";
import { Logo } from "./Logo";
import { MailIcon, PhoneIcon, PinIcon, SocialGlyph } from "@/components/ui/Icons";
import { SwissFlag } from "@/components/ui/SwissFlag";

/** Mockup footer: dark, logo · page links · socials + domain · claim line. */
export function Footer() {
  const year = new Date().getFullYear();
  const domain = site.productionUrl.replace(/^https?:\/\//, "");
  return (
    <footer className="surface-dark border-t border-white/5">
      <div className="container-x py-12 sm:py-14">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm">
            <Logo tone="light" />
            <p className="mt-5 text-sm leading-relaxed text-ink-300">{company.shortDescription}</p>
          </div>

          <nav aria-label="Footer-Navigation" className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <h2 className="text-xs font-extrabold uppercase tracking-[0.16em] text-brand-pink">Seiten</h2>
              <ul className="mt-4 space-y-2.5 text-sm">
                {footerNavigation.seiten.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-ink-200 transition-colors hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xs font-extrabold uppercase tracking-[0.16em] text-brand-pink">Leistungen</h2>
              <ul className="mt-4 space-y-2.5 text-sm">
                {footerNavigation.leistungen.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-ink-200 transition-colors hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <h2 className="text-xs font-extrabold uppercase tracking-[0.16em] text-brand-pink">Kontakt</h2>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <a href={mapsHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-start gap-2.5 text-ink-200 hover:text-white">
                    <PinIcon size={17} className="mt-0.5 shrink-0 text-brand-pink" />
                    <span>
                      {company.legalName}
                      <br />
                      {fullAddress}
                    </span>
                  </a>
                </li>
                <li>
                  <a href={telHref} className="inline-flex items-center gap-2.5 text-ink-200 hover:text-white">
                    <PhoneIcon size={17} className="shrink-0 text-brand-pink" />
                    {company.contact.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a href={mailHref} className="inline-flex items-center gap-2.5 text-ink-200 hover:text-white">
                    <MailIcon size={17} className="shrink-0 text-brand-pink" />
                    {company.contact.email}
                  </a>
                </li>
                <li className="text-ink-400">{company.openingHoursShort}</li>
              </ul>
            </div>
          </nav>

          <div className="flex flex-col items-start gap-4 lg:items-end">
            {activeSocialLinks.length > 0 && (
              <ul className="flex gap-2">
                {activeSocialLinks.map((link) => (
                  <li key={link.platform}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-gradient-brand"
                    >
                      <SocialGlyph platform={link.platform} size={18} />
                    </a>
                  </li>
                ))}
              </ul>
            )}
            <p className="font-display text-lg font-extrabold text-white">{domain}</p>
            <p className="inline-flex items-center gap-2 text-xs text-ink-300">
              {site.claim}
              <SwissFlag className="h-3.5 w-3.5" />
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-ink-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {company.brand} | {domain} · {company.legalName} · UID {company.uid}
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <p className="text-ink-300">
              <span className="font-bold text-white">{footerClaim}</span>
              {footerClaimSuffix && ` ${footerClaimSuffix}`}
            </p>
            {footerNavigation.rechtliches.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-white">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
