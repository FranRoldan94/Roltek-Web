import type { Metadata } from "next";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { LegalDocument } from "@/components/legal/legal-document";

/** Update when the notice text changes. */
const LAST_UPDATED = "2026-10-27";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const { legal } = await getDictionary(locale);
  return pageMetadata({
    locale,
    path: "/legal",
    title: legal.metaTitle,
    description: legal.metaDescription,
  });
}

export default async function LegalPage() {
  const locale = await getLocale();
  const { legal } = await getDictionary(locale);
  const { owner } = siteConfig;
  const details = [
    { label: legal.owner.name, value: owner.name },
    { label: legal.owner.taxId, value: owner.taxId },
    { label: legal.owner.address, value: owner.address },
    { label: legal.owner.email, value: siteConfig.email },
  ];

  return (
    <LegalDocument
      locale={locale}
      eyebrow={legal.eyebrow}
      title={legal.title}
      updatedLabel={legal.updated}
      lastUpdated={LAST_UPDATED}
      sections={legal.sections}
    >
      <dl className="grid gap-x-8 gap-y-3 border border-line p-6 text-sm sm:grid-cols-[auto_1fr]">
        {details.map((item) => (
          <div key={item.label} className="contents">
            <dt className="font-mono text-xs uppercase tracking-[0.12em] text-muted sm:pt-0.5">
              {item.label}
            </dt>
            <dd>{item.value}</dd>
          </div>
        ))}
      </dl>
    </LegalDocument>
  );
}
