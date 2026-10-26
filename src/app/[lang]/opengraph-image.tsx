import { getDictionary } from "@/i18n/get-dictionary";
import { ogImageMetadata, renderOgImage, resolveOgLocale } from "@/lib/og";

type Props = { params: Promise<{ lang: string }> };

export function generateImageMetadata({ params }: Props) {
  return ogImageMetadata(params, async (locale) => (await getDictionary(locale)).meta.title);
}

export default async function Image({ params }: Props) {
  const locale = await resolveOgLocale(params);
  const dict = await getDictionary(locale);
  return renderOgImage({
    locale,
    path: "/",
    eyebrow: dict.hero.eyebrow,
    title: dict.hero.titleLine1,
    titleMuted: dict.hero.titleLine2,
    art: "diagram",
  });
}
