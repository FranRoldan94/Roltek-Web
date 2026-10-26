import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Post } from "@/types/content";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { formatDate, localizePath } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";

export function PostList({
  posts,
  locale,
  dict,
}: {
  posts: Post[];
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <ol className="border-t border-line">
      {posts.map((post, i) => (
        <Reveal as="li" key={post.slug} delay={0.05 * i} className="border-b border-line">
          <article className="group relative grid gap-3 py-8 md:grid-cols-12 md:gap-8">
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted md:col-span-3 md:pt-1.5">
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, locale)}</time>
            </p>
            <div className="md:col-span-7">
              <h2 className="text-2xl font-semibold tracking-tight transition-colors group-hover:text-fg">
                <Link
                  href={localizePath(locale, `/blog/${post.slug}`)}
                  className="after:absolute after:inset-0 after:content-['']"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="mt-3 leading-relaxed text-muted">{post.description}</p>
              {post.draft && (
                <p className="mt-3 font-mono text-xs text-accent">{dict.blog.draft}</p>
              )}
            </div>
            <div className="flex items-start justify-between gap-4 font-mono text-xs uppercase tracking-[0.12em] text-muted md:col-span-2 md:flex-col md:items-end md:pt-1.5">
              <span>{dict.postCategories[post.category]}</span>
              <span>
                {post.readingTime} {dict.common.minRead}
              </span>
            </div>
            <ArrowUpRight
              aria-hidden="true"
              className="absolute right-0 top-8 hidden size-4 text-muted opacity-0 transition-opacity group-hover:opacity-100 md:block md:-right-8"
            />
          </article>
        </Reveal>
      ))}
    </ol>
  );
}
