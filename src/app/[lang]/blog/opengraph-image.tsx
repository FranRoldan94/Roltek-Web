import { getDictionary } from "@/i18n/get-dictionary";
import { ogImageMetadata, renderOgImage, resolveOgLocale } from "@/lib/og";

type Props = { params: Promise<{ lang: string }> };

export function generateImageMetadata({ params }: Props) {
  return ogImageMetadata(params, async (locale) => {
    const dict = await getDictionary(locale);
    return `${dict.blog.metaTitle} — ${dict.meta.title}`;
  });
}

export default async function Image({ params }: Props) {
  const locale = await resolveOgLocale(params);
  const dict = await getDictionary(locale);
  return renderOgImage({
    locale,
    path: "/blog",
    eyebrow: dict.blog.eyebrow,
    title: dict.blog.title,
    description: dict.blog.intro,
  });
}
