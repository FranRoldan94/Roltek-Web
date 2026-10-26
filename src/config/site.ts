/**
 * Central brand configuration. Every URL, handle and contact detail used
 * across the site is read from here.
 */
export const siteConfig = {
  name: "ROLTEK",
  founder: "Fran Roldán",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://roltek.es",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "contacto@roltek.es",
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
  url: string;
  email: string;
  links: Record<string, string>;
  socials: readonly { label: string; href: string; icon: "github" | "mail" }[];
};

export type SocialIcon = (typeof siteConfig.socials)[number]["icon"];
