import { getDictionary } from "@/i18n/get-dictionary";
import { getAllProjects, getProject } from "@/lib/projects";
import { ogImageMetadata, renderOgImage, resolveOgLocale } from "@/lib/og";

type Props = { params: Promise<{ lang: string; slug: string }> };

export function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }));
}

export function generateImageMetadata({ params }: Props) {
  return ogImageMetadata(params, async (locale) => {
    const { slug } = await params;
    const project = getProject(slug);
    const dict = await getDictionary(locale);
    return project ? `${project.title} — ${project.description[locale]}` : dict.meta.title;
  });
}

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const locale = await resolveOgLocale(params);
  const dict = await getDictionary(locale);
  const project = getProject(slug);

  if (!project) {
    return renderOgImage({
      locale,
      path: "/projects",
      eyebrow: dict.projects.eyebrow,
      title: dict.projects.title,
      art: "grid",
    });
  }

  return renderOgImage({
    locale,
    path: `/projects/${project.slug}`,
    eyebrow: project.categories.map((c) => dict.categories[c]).join(" · "),
    title: project.title,
    description: project.description[locale],
    meta: [dict.status[project.status], String(project.year), ...project.technologies.slice(0, 2)],
    art: project.visual ?? "grid",
  });
}
