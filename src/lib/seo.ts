import type { Metadata } from "next";
import { locales, localeTags, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { siteConfig } from "@/config/site";
import { absoluteUrl, localizePath } from "@/lib/utils";

type PageMetadataInput = {
  locale: Locale;
  /** Locale-relative path, e.g. "/projects/steporbit". */
  path: string;
  title?: string;
  /** Title for Open Graph and X when it differs from `${title} — ROLTEK`. */
  socialTitle?: string;
  description: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  /** Locales this page exists in. Defaults to all. */
  availableLocales?: readonly Locale[];
  /** Keeps the page out of search results while links are still followed. */
  noindex?: boolean;
};

/** Canonical, hreflang alternates, Open Graph and Twitter for a page. */
export function pageMetadata({
  locale,
  path,
  title,
  socialTitle,
  description,
  type = "website",
  publishedTime,
  modifiedTime,
  availableLocales = locales,
  noindex = false,
}: PageMetadataInput): Metadata {
  const url = localizePath(locale, path);
  const languages = Object.fromEntries(
    availableLocales.map((l) => [l, localizePath(l, path)]),
  );
  const shareTitle =
    socialTitle ?? (title ? `${title} — ${siteConfig.name}` : siteConfig.name);

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: { ...languages, "x-default": localizePath("en", path) },
      types: {
        "application/rss+xml": [
          { url: `/${locale}/feed.xml`, title: `${siteConfig.name} — RSS` },
        ],
      },
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      type,
      url,
      title: shareTitle,
      description,
      siteName: siteConfig.name,
      locale: localeTags[locale],
      alternateLocale: availableLocales
        .filter((l) => l !== locale)
        .map((l) => localeTags[l]),
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description,
    },
  };
}

/*
 * Structured data is linked through stable @id values, so the Person and the
 * WebSite are described once and every other page refers to them.
 */
export const personId = `${siteConfig.url}/#person`;
const websiteId = (locale: Locale) => `${absoluteUrl(localizePath(locale))}#website`;

export const personRef = { "@id": personId };

export function personJsonLd(dict: Dictionary) {
  return {
    "@type": "Person",
    "@id": personId,
    name: siteConfig.founder,
    alternateName: siteConfig.founderFullName,
    url: siteConfig.url,
    email: `mailto:${siteConfig.email}`,
    jobTitle: dict.about.card.roleValue,
    description: dict.about.metaDescription,
    knowsAbout: dict.about.stack.flatMap((group) => group.items),
    brand: { "@type": "Brand", name: siteConfig.name },
    sameAs: siteConfig.socials.map((s) => s.href),
  };
}

/** Home page: the WebSite and the Person behind it. */
export function homeJsonLd(locale: Locale, dict: Dictionary) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId(locale),
        name: siteConfig.name,
        alternateName: new URL(siteConfig.url).host,
        url: absoluteUrl(localizePath(locale)),
        inLanguage: locale,
        description: dict.meta.description,
        publisher: personRef,
      },
      personJsonLd(dict),
    ],
  };
}

/** About page: a profile page whose main entity is the Person. */
export function profilePageJsonLd(locale: Locale, dict: Dictionary) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: absoluteUrl(localizePath(locale, "/about")),
    inLanguage: locale,
    isPartOf: { "@id": websiteId(locale) },
    mainEntity: personJsonLd(dict),
  };
}

export function websiteRef(locale: Locale) {
  return { "@id": websiteId(locale) };
}
