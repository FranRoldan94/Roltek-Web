import type { Metadata } from "next";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { pageMetadata } from "@/lib/seo";
import { LegalDocument } from "@/components/legal/legal-document";

/** Update when the policy text changes. */
const LAST_UPDATED = "2026-10-27";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const { privacy } = await getDictionary(locale);
  return pageMetadata({
    locale,
    path: "/privacy",
    title: privacy.metaTitle,
    description: privacy.metaDescription,
  });
}

export default async function PrivacyPage() {
  const locale = await getLocale();
  const { privacy } = await getDictionary(locale);

  return (
    <LegalDocument
      locale={locale}
      eyebrow={privacy.eyebrow}
      title={privacy.title}
      updatedLabel={privacy.updated}
      lastUpdated={LAST_UPDATED}
      sections={privacy.sections}
    />
  );
}
