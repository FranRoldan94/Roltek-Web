import type { Dictionary } from "@/i18n/get-dictionary";
import { Reveal } from "@/components/ui/reveal";
import { MonoLabel } from "@/components/ui/mono-label";
import { CornerMarks } from "@/components/ui/corner-marks";

export function Philosophy({ dict }: { dict: Dictionary }) {
  const { philosophy } = dict;

  return (
    <section
      aria-labelledby="philosophy-title"
      className="relative border-y border-line bg-surface/50"
    >
      <div className="container-site grid gap-16 py-20 sm:py-28 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <p className="flex items-center gap-3 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted">
            <span className="text-accent">{philosophy.index}</span>
            <span aria-hidden="true" className="h-px w-6 bg-line-strong" />
            {philosophy.label}
          </p>
          <Reveal>
            <h2 id="philosophy-title" className="mt-8 text-headline font-semibold text-balance">
              {philosophy.title}
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">{philosophy.lead}</p>
          </Reveal>
        </div>

        <div className="relative lg:col-span-6 lg:col-start-7">
          <CornerMarks />
          <ul className="grid border border-line sm:grid-cols-2">
            {philosophy.principles.map((principle, i) => (
              <Reveal
                as="li"
                key={principle.title}
                delay={0.08 * i}
                className="border-line p-6 sm:p-8 [&:nth-child(n+2)]:border-t sm:[&:nth-child(2)]:border-t-0 sm:[&:nth-child(even)]:border-l"
              >
                <MonoLabel as="p" className="text-accent">
                  {String(i + 1).padStart(2, "0")}
                </MonoLabel>
                <h3 className="mt-6 text-lg font-semibold tracking-tight">{principle.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{principle.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
