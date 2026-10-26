"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { ProjectCategory } from "@/types/content";
import { cn } from "@/lib/utils";

type Filter = ProjectCategory | "all";

type ProjectFilterProps = {
  filters: { value: Filter; label: string }[];
  items: { slug: string; categories: ProjectCategory[]; card: ReactNode }[];
  labels: { group: string; empty: string; count: string; countOne: string };
};

export function ProjectFilter({ filters, items, labels }: ProjectFilterProps) {
  const [active, setActive] = useState<Filter>("all");

  const visible = items.filter(
    (item) => active === "all" || item.categories.includes(active),
  );
  const countFor = (value: Filter) =>
    value === "all"
      ? items.length
      : items.filter((item) => item.categories.includes(value)).length;

  return (
    <div>
      <div className="flex flex-col gap-4 border-b border-line pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div role="group" aria-label={labels.group} className="-mx-1 flex flex-wrap gap-1">
          {filters.map((filter) => {
            const selected = filter.value === active;
            return (
              <button
                key={filter.value}
                type="button"
                aria-pressed={selected}
                onClick={() => setActive(filter.value)}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm transition-colors",
                  selected ? "text-fg" : "text-muted hover:text-fg",
                )}
              >
                {selected && (
                  <motion.span
                    layoutId="project-filter"
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full border border-line-strong bg-white/[0.05]"
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  />
                )}
                <span className="relative">
                  {filter.label}
                  <span className="ml-1.5 font-mono text-[0.6875rem] text-muted">
                    {countFor(filter.value)}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
        <p aria-live="polite" className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
          {visible.length} {visible.length === 1 ? labels.countOne : labels.count}
        </p>
      </div>

      {visible.length === 0 ? (
        <p className="py-24 text-center text-muted">{labels.empty}</p>
      ) : (
        <ul className="mt-10 grid gap-6 md:grid-cols-2">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((item) => (
              <motion.li
                key={item.slug}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className={cn(visible.length === 1 && "md:col-span-2")}
              >
                {item.card}
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}
    </div>
  );
}
