import type { MetadataRoute } from "next";
import { locales, type Locale } from "@/i18n/config";
import { getAllProjects } from "@/lib/projects";
import { getPosts } from "@/lib/blog";
import { absoluteUrl, localizePath } from "@/lib/utils";

const staticPaths = ["/", "/about", "/projects", "/contact", "/privacy"];

function entry(
  path: string,
  available: readonly Locale[] = locales,
  lastModified?: string,
): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    available.map((l) => [l, absoluteUrl(localizePath(l, path))]),
  );
  return available.map((locale) => ({
    url: absoluteUrl(localizePath(locale, path)),
    ...(lastModified ? { lastModified } : {}),
    alternates: { languages },
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const postsByLocale = await Promise.all(locales.map((l) => getPosts(l)));
  const slugs = new Set(postsByLocale.flat().filter((p) => !p.draft).map((p) => p.slug));

  const posts = [...slugs].flatMap((slug) => {
    const available = locales.filter((_, i) => postsByLocale[i].some((p) => p.slug === slug));
    const post = postsByLocale.flat().find((p) => p.slug === slug)!;
    return entry(`/blog/${slug}`, available, post.updatedAt ?? post.publishedAt);
  });

  // The blog index is noindex while it has no articles (see blog/page.tsx).
  const blogIndex = slugs.size > 0 ? entry("/blog") : [];

  return [
    ...staticPaths.flatMap((path) => entry(path)),
    ...blogIndex,
    ...getAllProjects().flatMap((project) => entry(`/projects/${project.slug}`)),
    ...posts,
  ];
}
