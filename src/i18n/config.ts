export const locales = ["es", "en"] as const;

export type Locale = (typeof locales)[number];

/** Used when the visitor's browser language is not supported. */
export const defaultLocale: Locale = "en";

/** Remembers an explicit choice made with the language switcher. */
export const localeCookie = "NEXT_LOCALE";

export const localeNames: Record<Locale, string> = {
  es: "Español",
  en: "English",
};

/** BCP 47 tags used for Open Graph, RSS and date formatting. */
export const localeTags: Record<Locale, string> = {
  es: "es_ES",
  en: "en_US",
};

export function isLocale(value: string | undefined): value is Locale {
  return locales.includes(value as Locale);
}

/** Picks the best supported locale from an Accept-Language header. */
export function matchLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return defaultLocale;

  const ranked = acceptLanguage
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.find((p) => p.trim().startsWith("q="));
      return { tag: tag.toLowerCase(), q: q ? Number(q.trim().slice(2)) : 1 };
    })
    .filter(({ q }) => !Number.isNaN(q) && q > 0)
    .sort((a, b) => b.q - a.q);

  for (const { tag } of ranked) {
    const base = tag.split("-")[0];
    if (isLocale(base)) return base;
  }
  return defaultLocale;
}
