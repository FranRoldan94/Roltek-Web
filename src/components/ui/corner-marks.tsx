import { cn } from "@/lib/utils";

/** Registration marks drawn at the corners of a framed element. */
export function CornerMarks({ className }: { className?: string }) {
  const mark =
    "pointer-events-none absolute size-2.5 text-faint before:absolute before:left-1/2 before:top-0 before:h-full before:w-px before:-translate-x-1/2 before:bg-current after:absolute after:left-0 after:top-1/2 after:h-px after:w-full after:-translate-y-1/2 after:bg-current";
  return (
    <span aria-hidden="true" className={cn("contents", className)}>
      <span className={cn(mark, "-left-[5px] -top-[5px]")} />
      <span className={cn(mark, "-right-[5px] -top-[5px]")} />
      <span className={cn(mark, "-bottom-[5px] -left-[5px]")} />
      <span className={cn(mark, "-bottom-[5px] -right-[5px]")} />
    </span>
  );
}
