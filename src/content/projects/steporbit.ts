import type { Project } from "@/types/content";

export const steporbit: Project = {
  slug: "steporbit",
  title: "StepOrbit",
  description: {
    es: "Aplicación para Apple Watch orientada al seguimiento de pasos.",
    en: "An Apple Watch app focused on step tracking.",
  },
  summary: {
    es: "StepOrbit es una aplicación nativa para Apple Watch centrada en el seguimiento de pasos. Es el primer producto de ROLTEK y el punto de partida de su línea de apps nativas.",
    en: "StepOrbit is a native Apple Watch app focused on step tracking. It is ROLTEK's first product and the starting point of its line of native apps.",
  },
  categories: ["mobile"],
  technologies: ["Swift", "SwiftUI", "watchOS"],
  year: 2026,
  status: "in-development",
  visual: "orbit",
  privacyPath: "/privacy/steporbit",
  featured: true,
};
