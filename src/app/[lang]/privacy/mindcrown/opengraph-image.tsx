import { getDictionary } from "@/i18n/get-dictionary";
import { ogImageMetadata, renderOgImage, resolveOgLocale } from "@/lib/og";

type Props = { params: Promise<{ lang: string }> };

export function generateImageMetadata({ params }: Props) {
  return ogImageMetadata(params, async (locale) => {
    const dict = await getDictionary(locale);
    return `${dict.mindcrownPrivacy.metaTitle} — ${dict.meta.title}`;
  });
}

export default async function Image({ params }: Props) {
  const locale = await resolveOgLocale(params);
  const dict = await getDictionary(locale);
  return renderOgImage({
    locale,
    path: "/privacy/mindcrown",
    eyebrow: dict.mindcrownPrivacy.eyebrow,
    title: dict.mindcrownPrivacy.title,
    description: dict.mindcrownPrivacy.metaDescription,
  });
}
