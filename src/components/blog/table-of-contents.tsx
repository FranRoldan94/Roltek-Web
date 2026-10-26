"use client";

import { useEffect, useState } from "react";
import type { Post } from "@/types/content";
import { cn } from "@/lib/utils";

/** Article outline that highlights the heading currently in view. */
export function TableOfContents({
  headings,
  label,
}: {
  headings: Post["headings"];
  label: string;
}) {
  const [active, setActive] = useState<string>();

  useEffect(() => {
    const elements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((el): el is HTMLElement => !!el);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label={label}>
      <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted">{label}</p>
      <ol className="mt-4 space-y-2.5 border-l border-line text-sm">
        {headings.map((heading) => (
          <li key={heading.id} className={cn(heading.level === 3 && "pl-3")}>
            <a
              href={`#${heading.id}`}
              aria-current={active === heading.id ? "location" : undefined}
              className={cn(
                "-ml-px block border-l py-0.5 pl-4 transition-colors",
                active === heading.id
                  ? "border-accent text-fg"
                  : "border-transparent text-muted hover:text-fg",
              )}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
