import { getDictionary } from "@/i18n/get-dictionary";
import { ogImageMetadata, renderOgImage, resolveOgLocale } from "@/lib/og";
import { siteConfig } from "@/config/site";

type Props = { params: Promise<{ lang: string }> };

export function generateImageMetadata({ params }: Props) {
  return ogImageMetadata(params, async (locale) => {
    const dict = await getDictionary(locale);
    return `${dict.contact.metaTitle} — ${dict.meta.title}`;
  });
}

export default async function Image({ params }: Props) {
  const locale = await resolveOgLocale(params);
  const dict = await getDictionary(locale);
  return renderOgImage({
    locale,
    path: "/contact",
    eyebrow: dict.contact.eyebrow,
    title: dict.contact.title,
    description: dict.contact.intro,
    meta: [siteConfig.email],
  });
}
