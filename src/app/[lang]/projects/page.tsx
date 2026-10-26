import type { Metadata } from "next";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { getAllProjects, projectCategories } from "@/lib/projects";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/layout/page-header";
import { ProjectCard } from "@/components/projects/project-card";
import { ProjectFilter } from "@/components/projects/project-filter";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const { projects } = await getDictionary(locale);
  return pageMetadata({
    locale,
    path: "/projects",
    title: projects.metaTitle,
    description: projects.metaDescription,
  });
}

export default async function ProjectsPage() {
  const locale = await getLocale();
  const dict = await getDictionary(locale);
  const projects = getAllProjects();

  return (
    <>
      <PageHeader
        eyebrow={dict.projects.eyebrow}
        title={dict.projects.title}
        intro={dict.projects.intro}
      />
      <div className="container-site py-16 sm:py-20">
        <ProjectFilter
          filters={[
            { value: "all", label: dict.categories.all },
            ...projectCategories.map((value) => ({
              value,
              label: dict.categories[value],
            })),
          ]}
          items={projects.map((project, index) => ({
            slug: project.slug,
            categories: project.categories,
            card: (
              <ProjectCard
                project={project}
                locale={locale}
                dict={dict}
                index={index}
                headingLevel="h2"
                layout={projects.length === 1 ? "feature" : "compact"}
              />
            ),
          }))}
          labels={{
            group: dict.projects.filterLabel,
            empty: dict.projects.empty,
            count: dict.projects.count,
            countOne: dict.projects.countOne,
          }}
        />
      </div>
    </>
  );
}
