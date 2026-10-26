import { ArrowRight } from "lucide-react";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { getFeaturedProjects } from "@/lib/projects";
import { localizePath } from "@/lib/utils";
import { SectionHeader } from "@/components/ui/section-header";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { MonoLabel } from "@/components/ui/mono-label";
import { ProjectCard } from "@/components/projects/project-card";

export function FeaturedWork({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const projects = getFeaturedProjects();
  const [lead, ...rest] = projects;

  return (
    <section aria-labelledby="featured-title" className="container-site py-20 sm:py-28">
      <SectionHeader
        id="featured-title"
        index={dict.featured.index}
        label={dict.featured.label}
        title={dict.featured.title}
        intro={dict.featured.intro}
      />

      <div className="mt-14 space-y-6">
        {lead && (
          <Reveal>
            <ProjectCard project={lead} locale={locale} dict={dict} layout="feature" index={0} />
          </Reveal>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          {rest.map((project, i) => (
            <Reveal key={project.slug} delay={0.08 * i}>
              <ProjectCard project={project} locale={locale} dict={dict} index={i + 1} />
            </Reveal>
          ))}

          {/* Keeps the grid honest while the portfolio is still small. */}
          {rest.length % 2 === 0 && (
            <Reveal className={rest.length === 0 ? "md:col-span-2" : undefined}>
              <div className="flex h-full flex-col justify-between gap-8 rounded-2xl border border-dashed border-line-strong p-6 sm:flex-row sm:items-center sm:p-8">
                <div>
                  <MonoLabel as="p">{dict.featured.moreSoon}</MonoLabel>
                  <p className="mt-3 max-w-md text-muted">{dict.featured.moreSoonText}</p>
                </div>
                <ButtonLink
                  href={localizePath(locale, "/projects")}
                  variant="secondary"
                  className="shrink-0"
                  icon={<ArrowRight className="size-4" />}
                >
                  {dict.common.allProjects}
                </ButtonLink>
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
