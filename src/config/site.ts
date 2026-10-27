/**
 * Central brand configuration. Every URL, handle and contact detail used
 * across the site is read from here.
 */
export const siteConfig = {
  name: "ROLTEK",
  founder: "Fran Roldán",
  /** Full name, published as Person.alternateName for name searches. */
  founderFullName: "Francisco Roldán",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://roltek.es",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "contacto@roltek.es",
  /** Site owner as required by art. 10 LSSI, shown in the legal notice and privacy policy. */
  owner: {
    name: "Francisco Roldán Moreno",
    taxId: "31005568G",
    address: "C/ El Rosario, nº 6",
  },
  links: {
    github: "https://github.com/FranRoldan94",
  },
  /** Profiles rendered in the footer and About page. Add LinkedIn, X, etc. here. */
  socials: [
    { label: "GitHub", href: "https://github.com/FranRoldan94", icon: "github" },
  ],
} as const satisfies {
  name: string;
  founder: string;
  founderFullName: string;
  url: string;
  email: string;
  owner: { name: string; taxId: string; address: string };
  links: Record<string, string>;
  socials: readonly { label: string; href: string; icon: "github" | "mail" }[];
};

export type SocialIcon = (typeof siteConfig.socials)[number]["icon"];
