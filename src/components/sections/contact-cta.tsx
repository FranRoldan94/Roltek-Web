import { ArrowUpRight } from "lucide-react";
import type { Dictionary } from "@/i18n/get-dictionary";
import { siteConfig } from "@/config/site";
import { ButtonLink } from "@/components/ui/button";
import { GithubIcon } from "@/components/ui/github-icon";
import { Reveal } from "@/components/ui/reveal";

export function ContactCta({ dict }: { dict: Dictionary }) {
  const { contactCta } = dict;

  return (
    <section aria-labelledby="cta-title" className="container-site pb-24 pt-8 sm:pb-32">
      <Reveal className="relative overflow-hidden rounded-3xl border border-line bg-surface px-6 py-16 sm:px-12 sm:py-24">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-blueprint opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent)]"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-40 left-1/2 h-80 w-[720px] -translate-x-1/2 rounded-full bg-accent/15 blur-3xl"
        />

        <div className="relative">
          <h2 id="cta-title" className="text-display font-semibold">
            <span className="block text-muted">{contactCta.titleLine1}</span>
            <span className="block">{contactCta.titleLine2}</span>
          </h2>
          <p className="mt-8 max-w-lg text-lg leading-relaxed text-muted">{contactCta.text}</p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <ButtonLink
              href={`mailto:${siteConfig.email}`}
              icon={<ArrowUpRight className="size-4" />}
            >
              {contactCta.emailCta}
            </ButtonLink>
            <ButtonLink
              href={siteConfig.links.github}
              variant="secondary"
              external
              externalLabel={dict.a11y.externalLink}
            >
              <GithubIcon className="size-4" />
              GitHub
            </ButtonLink>
          </div>
          <p className="mt-6 font-mono text-sm text-muted">{siteConfig.email}</p>
        </div>
      </Reveal>
    </section>
  );
}
