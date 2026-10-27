import type { ReactNode } from "react";
import { siteConfig } from "@/config/site";
import type { Locale } from "@/i18n/config";
import { formatDate } from "@/lib/utils";
import { PageHeader } from "@/components/layout/page-header";

type Section = { title: string; body: readonly string[] };

const placeholders: Record<string, string> = {
  name: siteConfig.owner.name,
  taxId: siteConfig.owner.taxId,
  address: siteConfig.owner.address,
  email: siteConfig.email,
  domain: new URL(siteConfig.url).host,
};

/** Fills {name}, {taxId}, {address}, {email} and {domain} in the dictionary text. */
function fill(text: string) {
  return text.replace(/\{(\w+)\}/g, (match, key: string) => placeholders[key] ?? match);
}

/** Numbered sections shared by the privacy policy and the legal notice. */
export function LegalDocument({
  locale,
  eyebrow,
  title,
  updatedLabel,
  lastUpdated,
  sections,
  children,
}: {
  locale: Locale;
  eyebrow: string;
  title: string;
  updatedLabel: string;
  lastUpdated: string;
  sections: readonly Section[];
  children?: ReactNode;
}) {
  return (
    <>
      <PageHeader eyebrow={eyebrow} title={title}>
        <p className="mt-6 font-mono text-xs uppercase tracking-[0.14em] text-muted">
          {updatedLabel}: <time dateTime={lastUpdated}>{formatDate(lastUpdated, locale)}</time>
        </p>
      </PageHeader>

      <div className="container-site py-16 sm:py-24">
        <div className="max-w-3xl space-y-12">
          {children}
          {sections.map((section, i) => (
            <section key={section.title} className="grid gap-4 sm:grid-cols-[4rem_1fr]">
              <span className="font-mono text-xs text-accent sm:pt-2">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h2 className="text-xl font-semibold tracking-tight">{section.title}</h2>
                <div className="mt-3 space-y-3 leading-relaxed text-muted">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{fill(paragraph)}</p>
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
