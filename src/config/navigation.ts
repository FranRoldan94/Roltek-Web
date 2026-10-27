import type { Dictionary } from "@/i18n/dictionaries/en";

export type NavKey = keyof Dictionary["nav"];

/** Paths are locale-relative; `localizePath` adds the prefix. */
export const mainNav: { key: Exclude<NavKey, "contact">; href: string }[] = [
  { key: "projects", href: "/projects" },
  { key: "about", href: "/about" },
  { key: "blog", href: "/blog" },
];

export const footerNav: { key: NavKey | "privacy" | "legal"; href: string }[] = [
  { key: "home", href: "/" },
  { key: "projects", href: "/projects" },
  { key: "about", href: "/about" },
  { key: "blog", href: "/blog" },
  { key: "contact", href: "/contact" },
  { key: "privacy", href: "/privacy" },
  { key: "legal", href: "/legal" },
];
