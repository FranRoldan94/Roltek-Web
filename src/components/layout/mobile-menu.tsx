"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";
import { isActivePath, type NavItem } from "./nav-links";
import { LanguageSwitcher } from "./language-switcher";

type MobileMenuProps = {
  items: NavItem[];
  locale: Locale;
  labels: { open: string; close: string; nav: string; language: string };
  contact: NavItem;
};

export function MobileMenu({ items, locale, labels, contact }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className="md:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? labels.close : labels.open}
        onClick={() => setOpen((value) => !value)}
        className="relative z-50 inline-flex size-10 items-center justify-center rounded-full border border-line text-fg"
      >
        {open ? <X className="size-4" aria-hidden="true" /> : <Menu className="size-4" aria-hidden="true" />}
      </button>

      <AnimatePresence>
        {open && (
          <m.div
            id={panelId}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            // The header's backdrop-filter makes it the containing block for fixed
            // children: the panel needs an explicit height, and its own backdrop blur
            // would see nothing behind it, so the background is opaque.
            className="fixed inset-x-0 top-16 z-40 flex h-[calc(100dvh-4rem)] flex-col overflow-y-auto bg-bg"
          >
            <nav aria-label={labels.nav} className="container-site flex-1 pt-8">
              <ul className="border-t border-line">
                {[...items, contact].map((item, index) => {
                  const active = isActivePath(pathname, item.href);
                  return (
                    <m.li
                      key={item.href}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.04 * index, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="border-b border-line"
                    >
                      <Link
                        href={item.href}
                        onClick={close}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "flex items-baseline justify-between py-5 text-3xl font-semibold tracking-tight",
                          active ? "text-fg" : "text-muted",
                        )}
                      >
                        {item.label}
                        <span className="font-mono text-xs text-faint">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </Link>
                    </m.li>
                  );
                })}
              </ul>
              <LanguageSwitcher current={locale} label={labels.language} className="mt-8 w-fit" />
            </nav>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
