import type { Localized } from "@/types/content";

export type NowItem = {
  title: string;
  kind: Localized<string>;
  description: Localized<string>;
  technologies: string[];
  /** Optional link to a project case study (slug) inside the site. */
  projectSlug?: string;
};

/**
 * "Currently building" section on the homepage.
 * Edit this list to keep the section up to date.
 */
export const nowBuilding: NowItem[] = [
  {
    title: "StepOrbit",
    kind: { es: "Producto", en: "Product" },
    description: {
      es: "Aplicación para Apple Watch orientada al seguimiento de pasos.",
      en: "An Apple Watch app focused on step tracking.",
    },
    technologies: ["Swift", "SwiftUI", "watchOS"],
    projectSlug: "steporbit",
  },
  {
    title: "Native mobile",
    kind: { es: "Especialización", en: "Focus" },
    description: {
      es: "Profundizando en desarrollo nativo para iOS y Android.",
      en: "Going deeper into native development for iOS and Android.",
    },
    technologies: ["SwiftUI", "Kotlin"],
  },
  {
    title: "roltek.es",
    kind: { es: "Plataforma", en: "Platform" },
    description: {
      es: "Esta web: el hogar de ROLTEK y de sus futuros productos.",
      en: "This site: the home of ROLTEK and its future products.",
    },
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
];
