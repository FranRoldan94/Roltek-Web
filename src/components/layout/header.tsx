import { ArrowUpRight } from "lucide-react";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { mainNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { localizePath } from "@/lib/utils";
import { GithubIcon } from "@/components/ui/github-icon";
import { ButtonLink } from "@/components/ui/button";
import { Logo } from "./logo";
import { NavLinks } from "./nav-links";
import { MobileMenu } from "./mobile-menu";
import { LanguageSwitcher } from "./language-switcher";

export async function Header() {
  const locale = await getLocale();
  const dict = await getDictionary(locale);

  const items = mainNav.map((item) => ({
    href: localizePath(locale, item.href),
    label: dict.nav[item.key],
  }));
  const contact = { href: localizePath(locale, "/contact"), label: dict.nav.contact };

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/75 backdrop-blur-xl supports-[backdrop-filter]:bg-bg/60">
      <div className="container-site flex h-16 items-center justify-between gap-6">
        <Logo href={localizePath(locale)} label={dict.a11y.home} />

        <NavLinks items={items} label={dict.a11y.mainNav} />

        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <LanguageSwitcher current={locale} label={dict.a11y.language} />
          </div>
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className="hidden size-9 items-center justify-center rounded-full text-muted transition-colors hover:text-fg md:inline-flex"
          >
            <GithubIcon className="size-[18px]" />
            <span className="sr-only">GitHub ({dict.a11y.externalLink})</span>
          </a>
          <div className="hidden md:block">
            <ButtonLink
              href={contact.href}
              variant="secondary"
              size="sm"
              icon={<ArrowUpRight className="size-3.5" />}
            >
              {dict.common.contactCta}
            </ButtonLink>
          </div>
          <MobileMenu
            items={items}
            contact={contact}
            locale={locale}
            labels={{
              open: dict.a11y.openMenu,
              close: dict.a11y.closeMenu,
              nav: dict.a11y.mainNav,
              language: dict.a11y.language,
            }}
          />
        </div>
      </div>
    </header>
  );
}
