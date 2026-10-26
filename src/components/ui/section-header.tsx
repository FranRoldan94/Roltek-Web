import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  index?: string;
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  id?: string;
  className?: string;
};

/**
 * Editorial section opener: an index rail on the left
 * ("01 — Selected work") and the headline on the right.
 */
export function SectionHeader({
  index,
  label,
  title,
  intro,
  id,
  className,
}: SectionHeaderProps) {
  return (
    <header
      className={cn(
        "grid gap-6 border-t border-line pt-6 md:grid-cols-12 md:gap-8",
        className,
      )}
    >
      <p className="flex items-center gap-3 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted md:col-span-3">
        {index && <span className="text-accent">{index}</span>}
        {index && <span aria-hidden="true" className="h-px w-6 bg-line-strong" />}
        <span>{label}</span>
      </p>
      <div className="md:col-span-9">
        <h2
          id={id}
          className="max-w-3xl text-headline font-semibold text-balance"
        >
          {title}
        </h2>
        {intro && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
            {intro}
          </p>
        )}
      </div>
    </header>
  );
}
