import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { nowBuilding } from "@/config/now";
import { localizePath } from "@/lib/utils";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";
import { MonoLabel } from "@/components/ui/mono-label";

export function NowBuilding({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  return (
    <section aria-labelledby="now-title" className="container-site py-20 sm:py-28">
      <SectionHeader
        id="now-title"
        index={dict.now.index}
        label={dict.now.label}
        title={dict.now.title}
      />

      <Reveal className="mt-14 overflow-hidden rounded-2xl border border-line bg-surface/40">
        <div className="flex items-center justify-between border-b border-line px-5 py-3">
          <div aria-hidden="true" className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-white/10" />
            <span className="size-2.5 rounded-full bg-white/10" />
            <span className="size-2.5 rounded-full bg-white/10" />
          </div>
          <MonoLabel className="normal-case tracking-normal">~/roltek/now</MonoLabel>
          <span aria-hidden="true" className="w-10" />
        </div>

        <ul>
          {nowBuilding.map((item) => (
            <li
              key={item.title}
              className="group relative grid gap-3 border-b border-line px-5 py-6 last:border-b-0 sm:px-8 md:grid-cols-12 md:items-center md:gap-8"
            >
              <div className="flex items-center gap-3 md:col-span-3">
                <span aria-hidden="true" className="font-mono text-sm text-accent">
                  ▸
                </span>
                <h3 className="text-lg font-semibold tracking-tight">
                  {item.projectSlug ? (
                    <Link
                      href={localizePath(locale, `/projects/${item.projectSlug}`)}
                      className="after:absolute after:inset-0 after:content-['']"
                    >
                      {item.title}
                    </Link>
                  ) : (
                    item.title
                  )}
                </h3>
              </div>
              <MonoLabel className="md:col-span-2">{item.kind[locale]}</MonoLabel>
              <p className="text-sm leading-relaxed text-muted md:col-span-4">
                {item.description[locale]}
              </p>
              <div className="flex items-center justify-between gap-4 md:col-span-3">
                <p className="font-mono text-xs text-muted">
                  {item.technologies.join(" · ")}
                </p>
                {item.projectSlug && (
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-4 shrink-0 text-muted transition-colors group-hover:text-accent"
                  />
                )}
              </div>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
