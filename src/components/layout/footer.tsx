import Link from "next/link";
import { Mail } from "lucide-react";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { footerNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { localizePath } from "@/lib/utils";
import { GithubIcon } from "@/components/ui/github-icon";
import { MonoLabel } from "@/components/ui/mono-label";
import { Logo } from "./logo";
import { CurrentYear } from "./current-year";

export async function Footer() {
  const locale = await getLocale();
  const dict = await getDictionary(locale);
  const labels = { ...dict.nav, privacy: dict.footer.privacy, legal: dict.footer.legal };

  return (
    <footer className="mt-auto border-t border-line">
      <div className="container-site grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo href={localizePath(locale)} label={dict.a11y.home} />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            {dict.footer.tagline}
          </p>
          <a
            href={`mailto:${siteConfig.email}`}
            className="mt-6 inline-block font-mono text-sm text-fg underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-accent"
          >
            {siteConfig.email}
          </a>
        </div>

        <nav aria-label={dict.footer.navigation} className="md:col-span-4">
          <MonoLabel as="p">{dict.footer.navigation}</MonoLabel>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm">
            {footerNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={localizePath(locale, item.href)}
                  className="text-muted transition-colors hover:text-fg"
                >
                  {labels[item.key]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          <MonoLabel as="p">{dict.footer.elsewhere}</MonoLabel>
          <ul className="mt-4 space-y-2.5 text-sm">
            {siteConfig.socials.map((social) => (
              <li key={social.href}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-muted transition-colors hover:text-fg"
                >
                  {social.icon === "github" ? (
                    <GithubIcon className="size-4" />
                  ) : (
                    <Mail aria-hidden="true" className="size-4" />
                  )}
                  {social.label}
                  <span className="sr-only">({dict.a11y.externalLink})</span>
                </a>
              </li>
            ))}
            <li>
              <a
                href={`/${locale}/feed.xml`}
                className="text-muted transition-colors hover:text-fg"
              >
                {dict.footer.rss}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-site flex flex-col gap-2 py-6 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CurrentYear /> {siteConfig.name} · {siteConfig.founder}. {dict.footer.rights}
          </p>
          <p>roltek.es</p>
        </div>
      </div>
    </footer>
  );
}
