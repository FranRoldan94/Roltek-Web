import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types/content";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { cn, localizePath } from "@/lib/utils";
import { Spotlight } from "@/components/ui/spotlight";
import { TagList } from "@/components/ui/tag";
import { MonoLabel } from "@/components/ui/mono-label";
import { ProjectVisual } from "./project-visual";
import { StatusBadge } from "./status-badge";

type ProjectCardProps = {
  project: Project;
  locale: Locale;
  dict: Dictionary;
  /** "feature" spans the full width with the visual beside the text. */
  layout?: "feature" | "compact";
  index?: number;
  headingLevel?: "h2" | "h3";
};

export function ProjectCard({
  project,
  locale,
  dict,
  layout = "compact",
  index,
  headingLevel: Heading = "h3",
}: ProjectCardProps) {
  const href = localizePath(locale, `/projects/${project.slug}`);
  const feature = layout === "feature";
  const categories = project.categories.map((c) => dict.categories[c]).join(" · ");

  return (
    <Spotlight className="rounded-2xl border border-line bg-surface/40 transition-colors duration-300 hover:border-line-strong has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-accent">
      <article className={cn("grid", feature && "lg:grid-cols-12")}>
        <div
          className={cn(
            "relative overflow-hidden border-line",
            feature
              ? "aspect-[4/3] border-b sm:aspect-[16/10] lg:col-span-7 lg:aspect-auto lg:min-h-[460px] lg:border-b-0 lg:border-r"
              : "aspect-[16/10] border-b",
          )}
        >
          {project.coverImage ? (
            <Image
              src={project.coverImage.src}
              alt={project.coverImage.alt[locale]}
              fill
              sizes={feature ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 768px) 50vw, 100vw"}
              className="object-cover transition-transform duration-700 ease-out-expo group-hover/spot:scale-[1.02]"
            />
          ) : (
            <ProjectVisual
              visual={project.visual}
              className="h-full w-full transition-transform duration-700 ease-out-expo group-hover/spot:scale-[1.02]"
            />
          )}
        </div>

        <div
          className={cn(
            "flex flex-col p-6 sm:p-8",
            feature && "lg:col-span-5 lg:p-10",
          )}
        >
          <div className="flex items-center justify-between gap-4">
            <MonoLabel>
              {index !== undefined && (
                <span className="mr-3 text-accent">{String(index + 1).padStart(2, "0")}</span>
              )}
              {categories}
            </MonoLabel>
            <MonoLabel>{project.year}</MonoLabel>
          </div>

          <Heading
            className={cn(
              "mt-6 font-semibold tracking-tight",
              feature ? "text-4xl sm:text-5xl" : "text-2xl",
            )}
          >
            <Link
              href={href}
              className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
            >
              {project.title}
            </Link>
          </Heading>

          <p className="mt-4 max-w-md leading-relaxed text-muted">
            {(feature && project.summary?.[locale]) || project.description[locale]}
          </p>

          <div className={cn("mt-8 space-y-6", feature && "lg:mt-auto lg:pt-10")}>
            <TagList items={project.technologies} label={dict.common.stack} />
            <div className="flex items-center justify-between border-t border-line pt-5">
              <StatusBadge status={project.status} label={dict.status[project.status]} />
              <span className="inline-flex items-center gap-1.5 text-sm text-fg">
                {dict.common.viewProject}
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-4 text-muted transition-transform duration-300 ease-out-expo group-hover/spot:-translate-y-0.5 group-hover/spot:translate-x-0.5 group-hover/spot:text-accent"
                />
              </span>
            </div>
          </div>
        </div>
      </article>
    </Spotlight>
  );
}
