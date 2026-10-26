import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { lang } from "next/root-params";
import { ArrowLeft } from "lucide-react";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { isLocale, locales } from "@/i18n/config";
import { getPost, getPostContent, getPosts } from "@/lib/blog";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl, formatDate, localizePath } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { JsonLd } from "@/components/ui/json-ld";
import { MonoLabel } from "@/components/ui/mono-label";
import { TableOfContents } from "@/components/blog/table-of-contents";

/** Cache Components requires at least one param; it renders the 404 shell. */
const EMPTY_BLOG_PLACEHOLDER = "_";

export async function generateStaticParams() {
  const locale = await lang();
  const posts = isLocale(locale) ? await getPosts(locale) : [];
  if (posts.length === 0) return [{ slug: EMPTY_BLOG_PLACEHOLDER }];
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const post = await getPost(slug, locale);
  if (!post) return {};

  const available = (
    await Promise.all(locales.map(async (l) => ((await getPost(slug, l)) ? l : null)))
  ).filter((l) => l !== null);

  return pageMetadata({
    locale,
    path: `/blog/${slug}`,
    title: post.title,
    description: post.description,
    type: "article",
    publishedTime: post.publishedAt,
    availableLocales: available,
  });
}

export default async function PostPage({ params }: PageProps<"/[lang]/blog/[slug]">) {
  const { slug } = await params;
  const locale = await getLocale();
  const post = await getPost(slug, locale);
  if (!post) notFound();

  const dict = await getDictionary(locale);
  const Content = await getPostContent(slug, locale);

  return (
    <article className="container-site pb-24 pt-10 sm:pt-14">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.description,
          datePublished: post.publishedAt,
          dateModified: post.updatedAt ?? post.publishedAt,
          inLanguage: locale,
          url: absoluteUrl(localizePath(locale, `/blog/${slug}`)),
          author: { "@type": "Person", name: siteConfig.founder, url: siteConfig.url },
        }}
      />

      <Link
        href={localizePath(locale, "/blog")}
        className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-muted transition-colors hover:text-fg"
      >
        <ArrowLeft aria-hidden="true" className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
        {dict.common.backTo} {dict.nav.blog}
      </Link>

      <header className="mt-12 max-w-3xl">
        <MonoLabel as="p" className="flex flex-wrap gap-x-3 gap-y-1">
          <span className="text-accent">{dict.postCategories[post.category]}</span>
          <span aria-hidden="true">/</span>
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, locale)}</time>
          <span aria-hidden="true">/</span>
          <span>
            {post.readingTime} {dict.common.minRead}
          </span>
        </MonoLabel>
        <h1 className="mt-6 text-headline font-semibold text-balance">{post.title}</h1>
        <p className="mt-6 text-xl leading-relaxed text-muted">{post.description}</p>
        {post.draft && <p className="mt-4 font-mono text-xs text-accent">{dict.blog.draft}</p>}
      </header>

      <div className="mt-14 grid gap-12 border-t border-line pt-14 lg:grid-cols-12 lg:gap-8">
        <div className="prose-roltek min-w-0 lg:col-span-8">
          <Content />
        </div>
        <aside className="hidden lg:col-span-3 lg:col-start-10 lg:block">
          <div className="sticky top-28">
            <TableOfContents headings={post.headings} label={dict.blog.toc} />
          </div>
        </aside>
      </div>
    </article>
  );
}
