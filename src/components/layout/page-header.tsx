import type { ReactNode } from "react";
import { MonoLabel } from "@/components/ui/mono-label";

/** Opening block shared by interior pages. */
export function PageHeader({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="relative overflow-hidden border-b border-line">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-blueprint [mask-image:linear-gradient(to_bottom,black,transparent_85%)] opacity-70"
      />
      <div className="container-site relative pb-14 pt-16 sm:pb-20 sm:pt-24">
        <p className="animate-rise flex items-center gap-3">
          <span aria-hidden="true" className="size-1.5 bg-accent" />
          <MonoLabel>{eyebrow}</MonoLabel>
        </p>
        <h1
          className="animate-rise mt-6 max-w-4xl text-headline font-semibold text-balance sm:text-[clamp(2.5rem,1.6rem+3.6vw,4.75rem)]"
          style={{ "--delay": "80ms" } as React.CSSProperties}
        >
          {title}
        </h1>
        {intro && (
          <p
            className="animate-rise mt-6 max-w-2xl text-lg leading-relaxed text-muted"
            style={{ "--delay": "160ms" } as React.CSSProperties}
          >
            {intro}
          </p>
        )}
        {children}
      </div>
    </header>
  );
}
