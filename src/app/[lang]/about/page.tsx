import type { Metadata } from "next";
import { ArrowUpRight, Mail } from "lucide-react";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { siteConfig } from "@/config/site";
import { pageMetadata, personJsonLd } from "@/lib/seo";
import { PageHeader } from "@/components/layout/page-header";
import { JsonLd } from "@/components/ui/json-ld";
import { MonoLabel } from "@/components/ui/mono-label";
import { Reveal } from "@/components/ui/reveal";
import { GithubIcon } from "@/components/ui/github-icon";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const { about } = await getDictionary(locale);
  return pageMetadata({
    locale,
    path: "/about",
    title: about.metaTitle,
    description: about.metaDescription,
  });
}

export default async function AboutPage() {
  const locale = await getLocale();
  const dict = await getDictionary(locale);
  const { about } = dict;

  return (
    <>
      <JsonLd data={personJsonLd(about.metaDescription)} />
      <PageHeader eyebrow={about.eyebrow} title={about.title} />

      <div className="container-site grid gap-16 py-20 sm:py-28 lg:grid-cols-12 lg:gap-8">
        {/* Identity card */}
        <aside className="lg:col-span-4">
          <div className="sticky top-28 rounded-2xl border border-line bg-surface/50 p-6">
            <div
              aria-hidden="true"
              className="flex aspect-square items-center justify-center rounded-xl border border-line bg-bg bg-blueprint"
            >
              <span className="font-mono text-5xl font-semibold tracking-tight">
                FR<span className="text-accent">.</span>
              </span>
            </div>
            <dl className="mt-6 space-y-4 text-sm">
              <div>
                <MonoLabel as="dt">{about.card.name}</MonoLabel>
                <dd className="mt-1">{siteConfig.founder}</dd>
              </div>
              <div>
                <MonoLabel as="dt">{about.card.role}</MonoLabel>
                <dd className="mt-1">{about.card.roleValue}</dd>
              </div>
              <div>
                <MonoLabel as="dt">{about.card.brand}</MonoLabel>
                <dd className="mt-1">{siteConfig.name}</dd>
              </div>
            </dl>
          </div>
        </aside>

        <div className="space-y-24 lg:col-span-7 lg:col-start-6">
          <section className="space-y-6 text-lg leading-relaxed text-muted [&>p:first-child]:text-2xl [&>p:first-child]:leading-snug [&>p:first-child]:text-fg">
            {about.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>

          <Reveal as="section">
            <h2 className="text-2xl font-semibold tracking-tight">{about.roltekTitle}</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">{about.roltekText}</p>
          </Reveal>

          <section aria-labelledby="how-title">
            <h2 id="how-title" className="text-2xl font-semibold tracking-tight">
              {about.philosophyTitle}
            </h2>
            <ol className="mt-8 border-t border-line">
              {about.philosophy.map((item, i) => (
                <Reveal
                  as="li"
                  key={item.title}
                  delay={0.06 * i}
                  className="grid gap-2 border-b border-line py-6 sm:grid-cols-[3rem_1fr]"
                >
                  <span className="font-mono text-xs text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="mt-2 leading-relaxed text-muted">{item.text}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </section>

          <section aria-labelledby="stack-title">
            <h2 id="stack-title" className="text-2xl font-semibold tracking-tight">
              {about.stackTitle}
            </h2>
            <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
              {about.stack.map((group) => (
                <div key={group.group} className="bg-bg p-6">
                  <MonoLabel as="p">{group.group}</MonoLabel>
                  <ul className="mt-4 space-y-2">
                    {group.items.map((item) => (
                      <li key={item} className="text-fg">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section aria-labelledby="links-title">
            <h2 id="links-title" className="text-2xl font-semibold tracking-tight">
              {about.linksTitle}
            </h2>
            <ul className="mt-8 border-t border-line">
              {[
                ...siteConfig.socials.map((s) => ({
                  label: s.label,
                  href: s.href,
                  detail: s.href.replace("https://", ""),
                  external: true,
                })),
                {
                  label: "Email",
                  href: `mailto:${siteConfig.email}`,
                  detail: siteConfig.email,
                  external: false,
                },
              ].map((link) => (
                <li key={link.href} className="border-b border-line">
                  <a
                    href={link.href}
                    {...(link.external ? { target: "_blank", rel: "noreferrer" } : {})}
                    className="group flex items-center justify-between gap-4 py-5"
                  >
                    <span className="flex items-center gap-3">
                      {link.external ? (
                        <GithubIcon className="size-4 text-muted" />
                      ) : (
                        <Mail aria-hidden="true" className="size-4 text-muted" />
                      )}
                      <span className="font-medium">{link.label}</span>
                      {link.external && (
                        <span className="sr-only">({dict.a11y.externalLink})</span>
                      )}
                    </span>
                    <span className="flex items-center gap-2 font-mono text-sm text-muted transition-colors group-hover:text-fg">
                      <span className="hidden sm:inline">{link.detail}</span>
                      <ArrowUpRight aria-hidden="true" className="size-4 group-hover:text-accent" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}
