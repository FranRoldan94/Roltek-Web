import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/layout/page-header";
import { MonoLabel } from "@/components/ui/mono-label";
import { CopyEmail } from "@/components/ui/copy-email";
import { ButtonLink } from "@/components/ui/button";
import { GithubIcon } from "@/components/ui/github-icon";
import { CornerMarks } from "@/components/ui/corner-marks";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const { contact } = await getDictionary(locale);
  return pageMetadata({
    locale,
    path: "/contact",
    title: contact.metaTitle,
    description: contact.metaDescription,
  });
}

export default async function ContactPage() {
  const locale = await getLocale();
  const dict = await getDictionary(locale);
  const { contact } = dict;

  return (
    <>
      <PageHeader eyebrow={contact.eyebrow} title={contact.title} intro={contact.intro} />

      <div className="container-site grid gap-6 py-16 sm:py-24 lg:grid-cols-12">
        <section
          aria-labelledby="email-title"
          className="relative rounded-2xl border border-line bg-surface/50 p-6 sm:p-10 lg:col-span-8"
        >
          <CornerMarks />
          <MonoLabel as="h2" className="text-muted">
            <span id="email-title">{contact.emailLabel}</span>
          </MonoLabel>
          <a
            href={`mailto:${siteConfig.email}`}
            className="mt-6 block break-all text-[clamp(1.75rem,1rem+3.5vw,3.5rem)] font-semibold leading-tight tracking-tight underline decoration-line-strong decoration-2 underline-offset-[10px] transition-colors hover:decoration-accent"
          >
            {siteConfig.email}
          </a>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href={`mailto:${siteConfig.email}`} icon={<ArrowUpRight className="size-4" />}>
              {dict.contactCta.emailCta}
            </ButtonLink>
            <CopyEmail
              email={siteConfig.email}
              label={dict.common.copyEmail}
              copiedLabel={dict.common.copied}
            />
          </div>
        </section>

        <section
          aria-labelledby="github-title"
          className="flex flex-col justify-between gap-10 rounded-2xl border border-line p-6 sm:p-10 lg:col-span-4"
        >
          <div>
            <MonoLabel as="h2">
              <span id="github-title">{contact.githubLabel}</span>
            </MonoLabel>
            <p className="mt-6 text-lg leading-relaxed text-muted">{contact.githubText}</p>
          </div>
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center justify-between border-t border-line pt-6"
          >
            <span className="flex items-center gap-3 font-mono text-sm">
              <GithubIcon className="size-5" />
              {siteConfig.links.github.replace("https://github.com/", "@")}
            </span>
            <ArrowUpRight aria-hidden="true" className="size-4 text-muted transition-colors group-hover:text-accent" />
            <span className="sr-only">({dict.a11y.externalLink})</span>
          </a>
        </section>
      </div>
    </>
  );
}
