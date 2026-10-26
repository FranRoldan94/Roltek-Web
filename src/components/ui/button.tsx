import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent-strong text-white hover:bg-[#1d4ed8] shadow-[inset_0_1px_0_rgb(255_255_255/0.15)]",
  secondary:
    "border border-line-strong bg-white/[0.02] text-fg hover:border-white/25 hover:bg-white/[0.05]",
  ghost: "text-muted hover:text-fg",
};

const sizes = {
  md: "h-11 px-5",
  sm: "h-9 px-4",
};

type ButtonLinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: Variant;
  size?: keyof typeof sizes;
  className?: string;
  icon?: ReactNode;
  external?: boolean;
  externalLabel?: string;
};

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  icon,
  children,
  external,
  externalLabel,
  ...props
}: ButtonLinkProps) {
  const classes = cn(
    "group inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-[background-color,border-color,color] duration-200",
    sizes[size],
    variants[variant],
    className,
  );

  const content = (
    <>
      {children}
      {icon && (
        <span
          aria-hidden="true"
          className="transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5"
        >
          {icon}
        </span>
      )}
    </>
  );

  if (external) {
    return (
      <a
        href={String(props.href)}
        target="_blank"
        rel="noreferrer"
        className={classes}
      >
        {content}
        {externalLabel && <span className="sr-only">({externalLabel})</span>}
      </a>
    );
  }

  return (
    <Link className={classes} {...props}>
      {content}
    </Link>
  );
}
