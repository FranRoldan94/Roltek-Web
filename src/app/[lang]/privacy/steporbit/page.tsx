import type { Metadata } from "next";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { pageMetadata } from "@/lib/seo";
import { LegalDocument } from "@/components/legal/legal-document";

/** Update when the policy text changes. Linked from the App Store listing. */
const LAST_UPDATED = "2026-10-27";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const { steporbitPrivacy } = await getDictionary(locale);
  return pageMetadata({
    locale,
    path: "/privacy/steporbit",
    title: steporbitPrivacy.metaTitle,
    description: steporbitPrivacy.metaDescription,
  });
}

export default async function StepOrbitPrivacyPage() {
  const locale = await getLocale();
  const { steporbitPrivacy } = await getDictionary(locale);

  return (
    <LegalDocument
      locale={locale}
      eyebrow={steporbitPrivacy.eyebrow}
      title={steporbitPrivacy.title}
      updatedLabel={steporbitPrivacy.updated}
      lastUpdated={LAST_UPDATED}
      sections={steporbitPrivacy.sections}
    />
  );
}
