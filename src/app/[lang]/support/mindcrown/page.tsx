import type { Metadata } from "next";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { pageMetadata } from "@/lib/seo";
import { LegalDocument } from "@/components/legal/legal-document";

/** Update when the help text changes. Linked from the App Store listing as the support URL. */
const LAST_UPDATED = "2026-11-14";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const { mindcrownSupport } = await getDictionary(locale);
  return pageMetadata({
    locale,
    path: "/support/mindcrown",
    title: mindcrownSupport.metaTitle,
    description: mindcrownSupport.metaDescription,
  });
}

export default async function MindcrownSupportPage() {
  const locale = await getLocale();
  const { mindcrownSupport } = await getDictionary(locale);

  return (
    <LegalDocument
      locale={locale}
      eyebrow={mindcrownSupport.eyebrow}
      title={mindcrownSupport.title}
      updatedLabel={mindcrownSupport.updated}
      lastUpdated={LAST_UPDATED}
      sections={mindcrownSupport.sections}
    />
  );
}
