"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeCookie, locales, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

function swapLocale(pathname: string, target: Locale) {
  const [, , ...rest] = pathname.split("/");
  return `/${[target, ...rest].join("/")}`.replace(/\/$/, "");
}

/** Persists an explicit choice so the proxy stops using Accept-Language. */
function remember(locale: Locale) {
  document.cookie = `${localeCookie}=${locale}; path=/; max-age=31536000; samesite=lax`;
}

export function LanguageSwitcher({
  current,
  label,
  className,
}: {
  current: Locale;
  label: string;
  className?: string;
}) {
  const pathname = usePathname();

  return (
    <div
      role="group"
      aria-label={label}
      className={cn(
        "flex items-center rounded-full border border-line p-0.5 font-mono text-[0.6875rem] uppercase",
        className,
      )}
    >
      {locales.map((locale) => {
        const active = locale === current;
        return (
          <Link
            key={locale}
            href={swapLocale(pathname, locale)}
            hrefLang={locale}
            lang={locale}
            onClick={() => remember(locale)}
            aria-current={active ? "true" : undefined}
            className={cn(
              "rounded-full px-2.5 py-1 tracking-[0.12em] transition-colors",
              active ? "bg-white/[0.08] text-fg" : "text-muted hover:text-fg",
            )}
          >
            {locale}
          </Link>
        );
      })}
    </div>
  );
}
