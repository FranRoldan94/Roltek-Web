import { projects } from "@/content/projects";
import type { ProjectCategory } from "@/types/content";

export const projectCategories: ProjectCategory[] = [
  "web",
  "mobile",
  "backend",
  "open-source",
];

export function getAllProjects() {
  return [...projects].sort((a, b) => b.year - a.year);
}

export function getFeaturedProjects() {
  return getAllProjects().filter((p) => p.featured);
}

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getNextProject(slug: string) {
  const all = getAllProjects();
  if (all.length < 2) return undefined;
  const index = all.findIndex((p) => p.slug === slug);
  return all[(index + 1) % all.length];
}
