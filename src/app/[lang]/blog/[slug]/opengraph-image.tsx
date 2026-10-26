import { getDictionary } from "@/i18n/get-dictionary";
import { getPost } from "@/lib/blog";
import { ogImageMetadata, renderOgImage, resolveOgLocale } from "@/lib/og";
import { formatDate } from "@/lib/utils";

type Props = { params: Promise<{ lang: string; slug: string }> };

export function generateImageMetadata({ params }: Props) {
  return ogImageMetadata(params, async (locale) => {
    const { slug } = await params;
    const post = await getPost(slug, locale);
    return post ? post.title : (await getDictionary(locale)).meta.title;
  });
}

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const locale = await resolveOgLocale(params);
  const dict = await getDictionary(locale);
  const post = await getPost(slug, locale);

  if (!post) {
    return renderOgImage({
      locale,
      path: "/blog",
      eyebrow: dict.blog.eyebrow,
      title: dict.blog.title,
      description: dict.blog.intro,
    });
  }

  return renderOgImage({
    locale,
    path: `/blog/${post.slug}`,
    eyebrow: `${dict.blog.eyebrow} · ${dict.postCategories[post.category]}`,
    title: post.title,
    description: post.description,
    meta: [formatDate(post.publishedAt, locale), `${post.readingTime} ${dict.common.minRead}`],
  });
}
