import type { Metadata } from "next";
import { locales, localeTags, type Locale } from "@/i18n/config";
import { siteConfig } from "@/config/site";
import { absoluteUrl, localizePath } from "@/lib/utils";

type PageMetadataInput = {
  locale: Locale;
  /** Locale-relative path, e.g. "/projects/steporbit". */
  path: string;
  title?: string;
  description: string;
  type?: "website" | "article";
  publishedTime?: string;
  /** Locales this page exists in. Defaults to all. */
  availableLocales?: readonly Locale[];
};

/** Canonical, hreflang alternates, Open Graph and Twitter for a page. */
export function pageMetadata({
  locale,
  path,
  title,
  description,
  type = "website",
  publishedTime,
  availableLocales = locales,
}: PageMetadataInput): Metadata {
  const url = localizePath(locale, path);
  const languages = Object.fromEntries(
    availableLocales.map((l) => [l, localizePath(l, path)]),
  );

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
    openGraph: {
      type,
      url,
      title: title ?? siteConfig.name,
      description,
      siteName: siteConfig.name,
      locale: localeTags[locale],
      alternateLocale: availableLocales
        .filter((l) => l !== locale)
        .map((l) => localeTags[l]),
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: title ?? siteConfig.name,
      description,
    },
  };
}

export function personJsonLd(description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.founder,
    url: siteConfig.url,
    email: `mailto:${siteConfig.email}`,
    jobTitle: "Software Developer",
    description,
    brand: { "@type": "Brand", name: siteConfig.name },
    sameAs: siteConfig.socials.map((s) => s.href),
  };
}

export function websiteJsonLd(locale: Locale, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: absoluteUrl(localizePath(locale)),
    inLanguage: locale,
    description,
    author: { "@type": "Person", name: siteConfig.founder },
  };
}
