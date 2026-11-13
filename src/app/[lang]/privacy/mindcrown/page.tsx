import type { Metadata } from "next";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { pageMetadata } from "@/lib/seo";
import { LegalDocument } from "@/components/legal/legal-document";

/** Update when the policy text changes. Linked from the App Store listing. */
const LAST_UPDATED = "2026-11-14";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const { mindcrownPrivacy } = await getDictionary(locale);
  return pageMetadata({
    locale,
    path: "/privacy/mindcrown",
    title: mindcrownPrivacy.metaTitle,
    description: mindcrownPrivacy.metaDescription,
  });
}

export default async function MindcrownPrivacyPage() {
  const locale = await getLocale();
  const { mindcrownPrivacy } = await getDictionary(locale);

  return (
    <LegalDocument
      locale={locale}
      eyebrow={mindcrownPrivacy.eyebrow}
      title={mindcrownPrivacy.title}
      updatedLabel={mindcrownPrivacy.updated}
      lastUpdated={LAST_UPDATED}
      sections={mindcrownPrivacy.sections}
    />
  );
}
