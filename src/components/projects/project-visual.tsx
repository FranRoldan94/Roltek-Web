import type { ProjectVisual as Visual } from "@/types/content";
import { cn } from "@/lib/utils";

/**
 * Illustrative artwork used until a project has real screenshots.
 * It is decorative and hidden from assistive technology.
 */
export function ProjectVisual({
  visual = "grid",
  className,
}: {
  visual?: Visual;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative flex items-center justify-center overflow-hidden bg-surface",
        className,
      )}
    >
      <div className="absolute inset-0 bg-blueprint opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,rgb(59_130_246/0.14),transparent_55%)]" />
      {visual === "orbit" ? <Orbit /> : <GridArt />}
    </div>
  );
}

function Orbit() {
  return (
    <svg viewBox="0 0 320 320" className="relative w-[62%] max-w-[300px]">
      {[150, 118, 86].map((r, i) => (
        <circle
          key={r}
          cx="160"
          cy="160"
          r={r}
          fill="none"
          stroke="rgb(255 255 255 / 0.10)"
          strokeDasharray={i === 0 ? "2 6" : undefined}
        />
      ))}
      {/* Watch body */}
      <rect x="112" y="100" width="96" height="120" rx="28" fill="#0c0c10" stroke="rgb(255 255 255 / 0.22)" />
      <rect x="208" y="136" width="5" height="22" rx="2.5" fill="rgb(255 255 255 / 0.22)" />
      {/* Step ring */}
      <circle cx="160" cy="160" r="30" fill="none" stroke="rgb(255 255 255 / 0.08)" strokeWidth="6" />
      <circle
        cx="160"
        cy="160"
        r="30"
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="6"
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray="0.68 1"
        transform="rotate(-90 160 160)"
      />
      {/* Orbiting satellite */}
      <g className="origin-center motion-safe:animate-[spin_24s_linear_infinite]" style={{ transformBox: "view-box" }}>
        <circle cx="160" cy="42" r="4" fill="var(--color-accent)" />
        <circle cx="160" cy="42" r="10" fill="rgb(59 130 246 / 0.15)" />
      </g>
    </svg>
  );
}

function GridArt() {
  return (
    <svg viewBox="0 0 320 200" className="relative w-[70%]">
      {Array.from({ length: 4 }).map((_, row) =>
        Array.from({ length: 6 }).map((_, col) => (
          <rect
            key={`${row}-${col}`}
            x={20 + col * 48}
            y={20 + row * 42}
            width="36"
            height="30"
            rx="4"
            fill={row === 1 && col === 3 ? "rgb(59 130 246 / 0.5)" : "rgb(255 255 255 / 0.05)"}
            stroke="rgb(255 255 255 / 0.1)"
          />
        )),
      )}
    </svg>
  );
}
