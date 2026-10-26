import type { ProjectStatus } from "@/types/content";
import { cn } from "@/lib/utils";

export function StatusBadge({
  status,
  label,
}: {
  status: ProjectStatus;
  label: string;
}) {
  const live = status === "live";
  return (
    <span className="inline-flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted">
      <span className="relative flex size-1.5">
        {status === "in-development" && (
          <span className="absolute inset-0 rounded-full bg-accent opacity-60 motion-safe:animate-ping" />
        )}
        <span
          className={cn(
            "relative size-1.5 rounded-full",
            live ? "bg-emerald-400" : status === "archived" ? "bg-faint" : "bg-accent",
          )}
        />
      </span>
      {label}
    </span>
  );
}
