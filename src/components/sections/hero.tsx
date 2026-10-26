import type { CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { localizePath } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/button";
import { MonoLabel } from "@/components/ui/mono-label";
import { HeroDiagram } from "./hero-diagram";

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

export function Hero({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const { hero } = dict;

  const facts = [
    { label: dict.expertise.label, value: "Web · Mobile · APIs" },
    { label: dict.common.stack, value: "React · TypeScript · Java · Swift" },
    { label: dict.now.label, value: "StepOrbit — watchOS" },
  ];

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-40 h-[480px] bg-[radial-gradient(ellipse_at_top,rgb(59_130_246/0.12),transparent_60%)]"
      />

      <div className="container-site relative grid items-center gap-14 pb-16 pt-16 sm:pt-24 lg:grid-cols-12 lg:gap-8 lg:pb-24 lg:pt-28">
        <div className="lg:col-span-7">
          <p className="animate-rise flex items-center gap-3" style={delay(0)}>
            <span aria-hidden="true" className="size-1.5 bg-accent" />
            <MonoLabel>{hero.eyebrow}</MonoLabel>
          </p>

          <h1
            id="hero-title"
            className="mt-8 text-display font-semibold lg:text-[clamp(3.25rem,4.85vw,4.375rem)]"
          >
            <span className="animate-rise block" style={delay(80)}>
              {hero.titleLine1}
            </span>
            <span className="animate-rise block text-muted" style={delay(180)}>
              {hero.titleLine2}
            </span>
          </h1>

          <p
            className="animate-rise mt-8 max-w-xl text-lg leading-relaxed text-muted"
            style={delay(280)}
          >
            {hero.subtitle}
          </p>

          <div className="animate-rise mt-10 flex flex-wrap gap-3" style={delay(360)}>
            <ButtonLink
              href={localizePath(locale, "/projects")}
              icon={<ArrowRight className="size-4" />}
            >
              {hero.primaryCta}
            </ButtonLink>
            <ButtonLink href={localizePath(locale, "/about")} variant="secondary">
              {hero.secondaryCta}
            </ButtonLink>
          </div>
        </div>

        <div className="mx-auto w-full max-w-md sm:max-w-lg lg:col-span-5 lg:max-w-none">
          <HeroDiagram label={hero.diagramLabel} />
        </div>
      </div>

      <div className="container-site relative">
        <dl className="grid border-y border-line sm:grid-cols-3">
          {facts.map((fact, i) => (
            <div
              key={fact.label}
              className="animate-rise border-line py-5 sm:px-6 sm:first:pl-0 [&:not(:first-child)]:border-t sm:[&:not(:first-child)]:border-l sm:[&:not(:first-child)]:border-t-0"
              style={delay(500 + i * 80)}
            >
              <MonoLabel as="dt">{fact.label}</MonoLabel>
              <dd className="mt-2 text-sm text-fg">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
