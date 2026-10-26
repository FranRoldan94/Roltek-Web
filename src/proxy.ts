import { NextResponse, type NextRequest } from "next/server";
import { isLocale, localeCookie, locales, matchLocale, type Locale } from "@/i18n/config";
import { projects } from "@/content/projects";

const projectSlugs = new Set(projects.map((project) => project.slug));

/** "locale/slug" of every published article, computed in next.config.ts. */
const publishedPosts = new Set<string>(JSON.parse(process.env.PUBLISHED_POSTS ?? "[]"));

/**
 * Detail pages are prerendered with a streamed shell, so an unknown slug would
 * answer 200 with the not-found UI (a soft 404). Checking the slug here keeps
 * the status a real 404. Drafts and new articles are only checked in production.
 */
function isMissingDetail(locale: Locale, pathname: string) {
  const match = pathname.match(/^\/[^/]+\/(projects|blog)\/([^/]+)$/);
  if (!match) return false;
  const [, section, slug] = match;
  if (section === "projects") return !projectSlugs.has(slug);
  if (process.env.NODE_ENV === "development") return false;
  return !publishedPosts.has(`${locale}/${slug}`);
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const current = locales.find(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (current) {
    if (isMissingDetail(current, pathname)) {
      // No route matches this path, so Next renders the global 404 with a 404 status.
      return NextResponse.rewrite(new URL(`/${current}/_missing${pathname}`, request.url));
    }
    return;
  }

  const saved = request.cookies.get(localeCookie)?.value;
  const locale = isLocale(saved)
    ? saved
    : matchLocale(request.headers.get("accept-language"));

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  const response = NextResponse.redirect(url);
  response.headers.set("Vary", "Accept-Language, Cookie");
  return response;
}

export const config = {
  // Skip Next internals, metadata routes and any file with an extension.
  matcher: ["/((?!_next|api|sitemap.xml|robots.txt|apple-icon|.*\\..*).*)"],
};
