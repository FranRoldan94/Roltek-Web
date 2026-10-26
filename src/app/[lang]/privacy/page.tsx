import type { Metadata } from "next";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import { PageHeader } from "@/components/layout/page-header";

/** Update when the policy text changes. */
const LAST_UPDATED = "2026-10-26";

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
    <>
      <PageHeader eyebrow={privacy.eyebrow} title={privacy.title}>
        <p className="mt-6 font-mono text-xs uppercase tracking-[0.14em] text-muted">
          {privacy.updated}: <time dateTime={LAST_UPDATED}>{formatDate(LAST_UPDATED, locale)}</time>
        </p>
      </PageHeader>

      <div className="container-site py-16 sm:py-24">
        <div className="max-w-3xl space-y-12">
          {privacy.sections.map((section, i) => (
            <section key={section.title} className="grid gap-4 sm:grid-cols-[4rem_1fr]">
              <span className="font-mono text-xs text-accent sm:pt-2">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h2 className="text-xl font-semibold tracking-tight">{section.title}</h2>
                <div className="mt-3 space-y-3 leading-relaxed text-muted">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </section>
          ))}
          <p className="border-t border-line pt-8 font-mono text-sm">
            <a
              href={`mailto:${siteConfig.email}`}
              className="underline decoration-line-strong underline-offset-4 hover:decoration-accent"
            >
              {siteConfig.email}
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
