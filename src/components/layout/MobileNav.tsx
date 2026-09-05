"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { company, mailHref, telHref } from "@/content/company";
import { mainNavigation } from "@/content/navigation";
import { CloseIcon, MailIcon, MenuIcon, PhoneIcon } from "@/components/ui/Icons";
import { Button } from "@/components/ui/Button";
import { LogoMark } from "./Logo";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelId = useId();

  // Close when the route changes (state adjustment during render, no effect needed)
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  // Lock scroll + Escape to close
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label="Menü öffnen"
        className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink-900 transition-colors hover:bg-ink-100"
      >
        <MenuIcon size={24} />
      </button>

      {/* Rendered in a portal: the blurred sticky header would otherwise act as containing block for the fixed panel. */}
      {open &&
        typeof document !== "undefined" &&
        createPortal(
      <div
        id={panelId}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
        className="fixed inset-0 z-[60] flex flex-col bg-ink-950 text-white animate-fade-up [animation-duration:200ms]"
      >
        <div className="flex h-(--header-height) items-center justify-between px-5">
          <span className="flex items-center gap-3">
            <LogoMark className="h-9 w-9" />
            <span className="font-display text-lg font-bold">Maler Phönix</span>
          </span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Menü schliessen"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10"
          >
            <CloseIcon size={24} />
          </button>
        </div>

        <nav aria-label="Mobile Navigation" className="flex-1 overflow-y-auto px-5 pb-6 pt-2">
          <ul className="space-y-1">
            {mainNavigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "block rounded-xl px-4 py-3.5 font-display text-2xl font-bold transition-colors hover:bg-white/5",
                    pathname === item.href ? "text-ember-300" : "text-white",
                  )}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <ul className="mb-2 ml-4 border-l border-white/10 pl-2">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className={cn(
                            "block rounded-lg px-4 py-2.5 text-base transition-colors hover:bg-white/5",
                            pathname === child.href ? "text-ember-300" : "text-ink-200",
                          )}
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-3 border-t border-white/10 bg-ink-900/60 px-5 py-5">
          <Button href="/kontakt" size="lg" className="w-full">
            Offerte anfragen
          </Button>
          <div className="grid grid-cols-2 gap-3">
            <a href={telHref} className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/20 text-sm font-semibold">
              <PhoneIcon size={18} className="text-ember-300" />
              {company.contact.phoneDisplay}
            </a>
            <a href={mailHref} className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/20 text-sm font-semibold">
              <MailIcon size={18} className="text-ember-300" />
              E-Mail
            </a>
          </div>
        </div>
      </div>,
          document.body,
        )}
    </div>
  );
}
