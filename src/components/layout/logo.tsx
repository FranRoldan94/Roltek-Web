import Link from "next/link";
import { cn } from "@/lib/utils";

/** Typographic wordmark: ROLTEK followed by an accent "node". */
export function Logo({
  href,
  label,
  className,
}: {
  href: string;
  label: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className={cn(
        "group inline-flex items-center gap-1.5 font-mono text-sm font-semibold tracking-[0.28em] text-fg",
        className,
      )}
    >
      ROLTEK
      <span
        aria-hidden="true"
        className="size-1.5 bg-accent transition-transform duration-500 ease-out-expo group-hover:rotate-45"
      />
    </Link>
  );
}
