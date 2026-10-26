import type { CSSProperties, ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Seconds to wait once the element enters the viewport. */
  delay?: number;
  as?: "div" | "li" | "section" | "article";
};

/**
 * Fades content in once it enters the viewport. Rendered on the server and
 * visible by default: only <RevealObserver /> hides it, after hydration and
 * below the fold, so crawlers, no-JS visitors and the LCP never wait for it.
 */
export function Reveal({ children, className, delay = 0, as: Component = "div" }: RevealProps) {
  return (
    <Component
      data-reveal=""
      className={className}
      style={delay ? ({ "--reveal-delay": `${delay}s` } as CSSProperties) : undefined}
    >
      {children}
    </Component>
  );
}
