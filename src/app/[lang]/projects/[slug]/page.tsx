import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { getAllProjects, getNextProject, getProject } from "@/lib/projects";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl, localizePath } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { JsonLd } from "@/components/ui/json-ld";
import { MonoLabel } from "@/components/ui/mono-label";
import { TagList } from "@/components/ui/tag";
import { ButtonLink } from "@/components/ui/button";
import { CornerMarks } from "@/components/ui/corner-marks";
import { Reveal } from "@/components/ui/reveal";
import { GithubIcon } from "@/components/ui/github-icon";
import { ProjectVisual } from "@/components/projects/project-visual";
import { StatusBadge } from "@/components/projects/status-badge";
import { ContactCta } from "@/components/sections/contact-cta";

export function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const project = getProject(slug);
  if (!project) return {};
  return pageMetadata({
    locale,
    path: `/projects/${slug}`,
    title: project.title,
    description: project.description[locale],
  });
}

export default async function ProjectPage({
  params,
}: PageProps<"/[lang]/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const locale = await getLocale();
  const dict = await getDictionary(locale);
  const next = getNextProject(slug);

  const sections = [
    { id: "overview", title: dict.project.overview, items: project.summary ? [project.summary[locale]] : [project.description[locale]], prose: true },
    { id: "challenges", title: dict.project.challenges, items: project.challenges?.[locale] },
    { id: "approach", title: dict.project.solutions, items: project.solutions?.[locale] },
    { id: "outcomes", title: dict.project.outcomes, items: project.outcomes?.[locale] },
  ].filter((section) => section.items && section.items.length > 0);

  const meta = [
    { label: dict.common.year, value: String(project.year) },
    { label: dict.common.category, value: project.categories.map((c) => dict.categories[c]).join(" · ") },
    { label: dict.common.status, value: <StatusBadge status={project.status} label={dict.status[project.status]} /> },
  ];

  return (
    <article>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: project.title,
          description: project.description[locale],
          applicationCategory: project.categories.includes("mobile") ? "MobileApplication" : "WebApplication",
          url: absoluteUrl(localizePath(locale, `/projects/${slug}`)),
          author: { "@type": "Person", name: siteConfig.founder },
          ...(project.liveUrl ? { sameAs: project.liveUrl } : {}),
        }}
      />

      <header className="container-site pt-10 sm:pt-14">
        <Link
          href={localizePath(locale, "/projects")}
          className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-muted transition-colors hover:text-fg"
        >
          <ArrowLeft aria-hidden="true" className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
          {dict.common.backTo} {dict.nav.projects}
        </Link>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <MonoLabel as="p" className="animate-rise">
              {project.categories.map((c) => dict.categories[c]).join(" · ")}
            </MonoLabel>
            <h1 className="animate-rise mt-5 text-display font-semibold" style={{ "--delay": "80ms" } as React.CSSProperties}>
              {project.title}
            </h1>
            <p className="animate-rise mt-6 max-w-2xl text-xl leading-relaxed text-muted" style={{ "--delay": "160ms" } as React.CSSProperties}>
              {project.description[locale]}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
            {project.liveUrl && (
              <ButtonLink href={project.liveUrl} external externalLabel={dict.a11y.externalLink} icon={<ArrowUpRight className="size-4" />}>
                {dict.common.liveSite}
              </ButtonLink>
            )}
            {project.githubUrl && (
              <ButtonLink href={project.githubUrl} variant="secondary" external externalLabel={dict.a11y.externalLink}>
                <GithubIcon className="size-4" />
                {dict.common.sourceCode}
              </ButtonLink>
            )}
          </div>
        </div>

        <dl className="mt-12 grid grid-cols-2 border-y border-line md:grid-cols-4">
          {meta.map((item) => (
            <div key={item.label} className="border-line py-5 pr-4 [&:nth-child(n+3)]:border-t md:[&:nth-child(n+3)]:border-t-0 md:[&:not(:first-child)]:border-l md:[&:not(:first-child)]:pl-6">
              <MonoLabel as="dt">{item.label}</MonoLabel>
              <dd className="mt-2 text-sm">{item.value}</dd>
            </div>
          ))}
          <div className="col-span-2 border-t border-line py-5 md:col-span-1 md:border-l md:border-t-0 md:pl-6">
            <MonoLabel as="dt">{dict.common.stack}</MonoLabel>
            <dd className="mt-2 text-sm">{project.technologies.join(" · ")}</dd>
          </div>
        </dl>
      </header>

      <div className="container-site mt-12">
        <div className="relative">
          <CornerMarks />
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line sm:aspect-[21/9]">
            {project.coverImage ? (
              <Image
                src={project.coverImage.src}
                alt={project.coverImage.alt[locale]}
                fill
                priority
                sizes="(min-width: 1280px) 1200px, 100vw"
                className="object-cover"
              />
            ) : (
              <ProjectVisual visual={project.visual} className="h-full w-full" />
            )}
          </div>
        </div>
      </div>

      <div className="container-site grid gap-12 py-20 sm:py-28 lg:grid-cols-12 lg:gap-8">
        {sections.length > 1 && (
        <nav aria-label={dict.blog.toc} className="hidden lg:col-span-3 lg:block">
          <ol className="sticky top-28 space-y-3 border-l border-line pl-4 text-sm">
            {sections.map((section, i) => (
              <li key={section.id}>
                <a href={`#${section.id}`} className="text-muted transition-colors hover:text-fg">
                  <span className="mr-2 font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                  {section.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        )}

        <div className="space-y-20 lg:col-span-8 lg:col-start-5">
          {project.status === "in-development" && (
            <p className="flex items-start gap-3 rounded-xl border border-accent/30 bg-accent/[0.06] p-4 text-sm leading-relaxed text-fg">
              <span aria-hidden="true" className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" />
              {dict.project.inProgressNote}
            </p>
          )}

          {sections.map((section, i) => (
            <Reveal as="section" key={section.id}>
              <h2 id={section.id} className="scroll-mt-28 flex items-baseline gap-4 text-3xl font-semibold tracking-tight">
                <span className="font-mono text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
                {section.title}
              </h2>
              {section.prose ? (
                <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted">
                  {section.items!.map((text) => <p key={text}>{text}</p>)}
                </div>
              ) : (
                <ul className="mt-6 border-t border-line">
                  {section.items!.map((text) => (
                    <li key={text} className="border-b border-line py-4 leading-relaxed text-muted">
                      {text}
                    </li>
                  ))}
                </ul>
              )}
            </Reveal>
          ))}

          <section>
            <MonoLabel as="h2">{dict.common.stack}</MonoLabel>
            <div className="mt-4">
              <TagList items={project.technologies} />
            </div>
          </section>

          {project.gallery && project.gallery.length > 0 && (
            <section aria-labelledby="gallery-title">
              <h2 id="gallery-title" className="text-3xl font-semibold tracking-tight">{dict.project.gallery}</h2>
              <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                {project.gallery.map((image) => (
                  <li key={image.src} className="overflow-hidden rounded-xl border border-line">
                    <Image src={image.src} alt={image.alt[locale]} width={image.width} height={image.height} sizes="(min-width: 640px) 50vw, 100vw" className="h-auto w-full" />
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>

      {next ? (
        <div className="container-site pb-24">
          <Link
            href={localizePath(locale, `/projects/${next.slug}`)}
            className="group flex items-center justify-between gap-6 border-y border-line py-10"
          >
            <span>
              <MonoLabel as="span">{dict.project.next}</MonoLabel>
              <span className="mt-3 block text-headline font-semibold">{next.title}</span>
            </span>
            <ArrowRight aria-hidden="true" className="size-8 text-muted transition-all group-hover:translate-x-1 group-hover:text-accent" />
          </Link>
        </div>
      ) : (
        <ContactCta dict={dict} />
      )}
    </article>
  );
}
