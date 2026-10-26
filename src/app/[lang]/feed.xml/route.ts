import { locales, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { getPosts } from "@/lib/blog";
import { absoluteUrl, localizePath } from "@/lib/utils";
import { siteConfig } from "@/config/site";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

const escape = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export async function GET(_request: Request, ctx: RouteContext<"/[lang]/feed.xml">) {
  const { lang } = await ctx.params;
  if (!isLocale(lang)) return new Response("Not found", { status: 404 });

  const dict = await getDictionary(lang);
  const posts = (await getPosts(lang)).filter((post) => !post.draft);
  const blogUrl = absoluteUrl(localizePath(lang, "/blog"));

  const items = posts
    .map((post) => {
      const url = absoluteUrl(localizePath(lang, `/blog/${post.slug}`));
      return `    <item>
      <title>${escape(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escape(post.description)}</description>
      <category>${escape(dict.postCategories[post.category])}</category>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(`${siteConfig.name} — ${dict.blog.metaTitle}`)}</title>
    <link>${blogUrl}</link>
    <description>${escape(dict.blog.metaDescription)}</description>
    <language>${lang}</language>
    <atom:link href="${absoluteUrl(`/${lang}/feed.xml`)}" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
