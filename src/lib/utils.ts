import type { Locale } from "@/i18n/config";
import { localeTags } from "@/i18n/config";
import { siteConfig } from "@/config/site";

/** Joins class names, skipping falsy values. */
export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

/** Prefixes a locale-relative path ("/projects") with the locale. */
export function localizePath(locale: Locale, path = "/") {
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}

export function formatDate(date: string, locale: Locale) {
  return new Intl.DateTimeFormat(localeTags[locale].replace("_", "-"), {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
}
