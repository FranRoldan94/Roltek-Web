"use client";

import type { PointerEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Card surface with a soft light that follows the pointer.
 * Pure CSS variables: no re-renders on move.
 */
export function Spotlight({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  function handleMove(event: PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--y", `${event.clientY - rect.top}px`);
  }

  return (
    <div
      onPointerMove={handleMove}
      className={cn(
        "group/spot relative isolate overflow-hidden",
        "before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:opacity-0 before:transition-opacity before:duration-500",
        "before:bg-[radial-gradient(420px_circle_at_var(--x,50%)_var(--y,50%),rgb(59_130_246/0.10),transparent_60%)]",
        "hover:before:opacity-100",
        className,
      )}
    >
      {children}
    </div>
  );
}
