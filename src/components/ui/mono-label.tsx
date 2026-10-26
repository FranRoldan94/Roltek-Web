import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Monospaced uppercase label for technical metadata. */
export function MonoLabel({
  children,
  className,
  as: Tag = "span",
}: {
  children: ReactNode;
  className?: string;
  as?: "span" | "p" | "dt" | "dd" | "div" | "h2" | "h3";
}) {
  return (
    <Tag
      className={cn(
        "font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
