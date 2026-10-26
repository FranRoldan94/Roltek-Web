import type { Metadata } from "next";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { pageMetadata, personJsonLd, websiteJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/ui/json-ld";
import { Hero } from "@/components/sections/hero";
import { FeaturedWork } from "@/components/sections/featured-work";
import { Expertise } from "@/components/sections/expertise";
import { Philosophy } from "@/components/sections/philosophy";
import { NowBuilding } from "@/components/sections/now-building";
import { ContactCta } from "@/components/sections/contact-cta";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const dict = await getDictionary(locale);
  return {
    ...pageMetadata({ locale, path: "/", description: dict.meta.description }),
    title: { absolute: dict.meta.title },
  };
}

export default async function HomePage() {
  const locale = await getLocale();
  const dict = await getDictionary(locale);

  return (
    <>
      <JsonLd data={websiteJsonLd(locale, dict.meta.description)} />
      <JsonLd data={personJsonLd(dict.about.metaDescription)} />
      <Hero dict={dict} locale={locale} />
      <FeaturedWork dict={dict} locale={locale} />
      <Expertise dict={dict} />
      <Philosophy dict={dict} />
      <NowBuilding dict={dict} locale={locale} />
      <ContactCta dict={dict} />
    </>
  );
}
