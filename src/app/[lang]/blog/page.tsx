import type { Metadata } from "next";
import { Rss } from "lucide-react";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { getPosts } from "@/lib/blog";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/layout/page-header";
import { PostList } from "@/components/blog/post-list";
import { ButtonLink } from "@/components/ui/button";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const { blog } = await getDictionary(locale);
  const posts = await getPosts(locale);
  return pageMetadata({
    locale,
    path: "/blog",
    title: blog.metaTitle,
    description: blog.metaDescription,
    // An index without articles is thin content: keep it out of results until the first post.
    noindex: posts.length === 0,
  });
}

export default async function BlogPage() {
  const locale = await getLocale();
  const dict = await getDictionary(locale);
  const posts = await getPosts(locale);

  return (
    <>
      <PageHeader eyebrow={dict.blog.eyebrow} title={dict.blog.title} intro={dict.blog.intro} />
      <div className="container-site py-16 sm:py-20">
        {posts.length > 0 ? (
          <PostList posts={posts} locale={locale} dict={dict} />
        ) : (
          <div className="flex flex-col items-start gap-6 rounded-2xl border border-dashed border-line-strong p-8 sm:flex-row sm:items-center sm:justify-between sm:p-12">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">{dict.blog.emptyTitle}</h2>
              <p className="mt-3 max-w-md text-muted">{dict.blog.emptyText}</p>
            </div>
            <ButtonLink
              href={`/${locale}/feed.xml`}
              variant="secondary"
              prefetch={false}
              icon={<Rss className="size-4" />}
            >
              RSS
            </ButtonLink>
          </div>
        )}
      </div>
    </>
  );
}
