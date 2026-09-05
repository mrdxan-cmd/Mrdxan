import Link from "next/link";
import { company, telHref } from "@/content/company";
import { mainNavigation } from "@/content/navigation";
import { Button } from "@/components/ui/Button";
import { ArrowRightIcon, ChevronDownIcon, PhoneIcon } from "@/components/ui/Icons";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";
import { NavLink } from "./NavLink";

/** Dark sticky header like the mockup: logo · nav · phone pill · gradient CTA. */
export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-ink-950/85 text-white backdrop-blur-md">
      <div className="container-x flex h-(--header-height) items-center justify-between gap-4">
        <Logo priority />

        <nav aria-label="Hauptnavigation" className="hidden lg:block">
          <ul className="flex items-center gap-0.5 xl:gap-1">
            {mainNavigation.map((item) =>
              item.children ? (
                <li key={item.href} className="group relative">
                  <NavLink href={item.href} className="gap-1">
                    {item.label}
                    <ChevronDownIcon size={15} className="transition-transform group-hover:rotate-180 group-focus-within:rotate-180" />
                  </NavLink>
                  <div className="invisible absolute left-1/2 top-full z-10 w-[26rem] -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    <ul className="grid gap-1 rounded-2xl border border-ink-100 bg-white p-2 text-ink-900 shadow-card">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link href={child.href} className="block rounded-xl px-4 py-3 transition-colors hover:bg-ink-50">
                            <span className="block font-semibold text-ink-900">{child.label}</span>
                            {child.description && <span className="mt-0.5 block text-sm text-ink-500">{child.description}</span>}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ) : (
                <li key={item.href}>
                  <NavLink href={item.href}>{item.label}</NavLink>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="hidden items-center gap-2.5 lg:flex">
          <Button href={telHref} variant="outline-light" size="sm" aria-label={`Anrufen: ${company.contact.phoneDisplay}`}>
            <PhoneIcon size={16} />
            <span className="hidden xl:inline">{company.contact.phoneDisplay}</span>
          </Button>
          <Button href="/kontakt#offerte" size="sm">
            Kostenlose Offerte
            <ArrowRightIcon size={16} />
          </Button>
        </div>

        <MobileNav />
      </div>
    </header>
  );
}
