import { company, telHref, whatsappHref } from "@/content/company";
import { ArrowRightIcon, PhoneIcon, WhatsAppIcon } from "@/components/ui/Icons";
import Link from "next/link";

/**
 * Mobile-only quick action bar (call / WhatsApp / quote).
 * Rendered as real links so it works without JavaScript.
 */
export function StickyContactBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink-100 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden print:hidden">
      <div className="grid grid-cols-3 divide-x divide-ink-100 text-xs font-semibold">
        <a href={telHref} className="flex h-14 flex-col items-center justify-center gap-1 text-ink-800" aria-label={`Anrufen: ${company.contact.phoneDisplay}`}>
          <PhoneIcon size={20} className="text-brand-magenta" />
          Anrufen
        </a>
        {whatsappHref ? (
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="flex h-14 flex-col items-center justify-center gap-1 text-ink-800">
            <WhatsAppIcon size={20} className="text-[#25D366]" />
            WhatsApp
          </a>
        ) : (
          <Link href="/kontakt#kontaktdaten" className="flex h-14 flex-col items-center justify-center gap-1 text-ink-800">
            <PhoneIcon size={20} className="text-brand-magenta" />
            Kontakt
          </Link>
        )}
        <Link href="/kontakt#offerte" className="flex h-14 flex-col items-center justify-center gap-1 bg-gradient-brand text-white">
          <ArrowRightIcon size={18} />
          Offerte
        </Link>
      </div>
    </div>
  );
}
