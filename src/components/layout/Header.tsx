import Link from "next/link";
import { company, telHref } from "@/content/company";
import { mainNavigation } from "@/content/navigation";
import { Button } from "@/components/ui/Button";
import { ChevronDownIcon, PhoneIcon } from "@/components/ui/Icons";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink-100/80 bg-paper/85 backdrop-blur-md supports-[backdrop-filter]:bg-paper/70">
      <div className="container-x flex h-(--header-height) items-center justify-between gap-4">
        <Logo />

        <nav aria-label="Hauptnavigation" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNavigation.map((item) =>
              item.children ? (
                <li key={item.href} className="group relative">
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-2 text-[15px] font-semibold xl:px-4 text-ink-700 transition-colors hover:bg-ink-100 hover:text-ink-900"
                  >
                    {item.label}
                    <ChevronDownIcon size={16} className="transition-transform group-hover:rotate-180 group-focus-within:rotate-180" />
                  </Link>
                  <div className="invisible absolute left-1/2 top-full z-10 w-[26rem] -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    <ul className="grid gap-1 rounded-2xl border border-ink-100 bg-white p-2 shadow-card">
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
                  <Link
                    href={item.href}
                    className="inline-flex whitespace-nowrap rounded-full px-3 py-2 text-[15px] font-semibold xl:px-4 text-ink-700 transition-colors hover:bg-ink-100 hover:text-ink-900"
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <a
            href={telHref}
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-full px-3 py-2 text-[15px] font-semibold text-ink-800 transition-colors hover:text-ember-600"
            aria-label={`Anrufen: ${company.contact.phoneDisplay}`}
          >
            <PhoneIcon size={18} className="text-ember-500" />
            <span className="hidden xl:inline">{company.contact.phoneDisplay}</span>
          </a>
          <Button href="/kontakt#offerte" size="sm">
            Offerte anfragen
          </Button>
        </div>

        <MobileNav />
      </div>
    </header>
  );
}
