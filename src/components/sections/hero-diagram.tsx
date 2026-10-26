import type { CSSProperties } from "react";

type Node = { x: number; y: number; tag: string; title: string; active?: boolean };

const W = 140;
const H = 58;

const nodes: Node[] = [
  { x: 30, y: 36, tag: "01 · client", title: "Web / watchOS" },
  { x: 190, y: 190, tag: "02 · api", title: "Gateway", active: true },
  { x: 350, y: 90, tag: "03 · domain", title: "Services" },
  { x: 350, y: 300, tag: "04 · storage", title: "Data" },
  { x: 30, y: 300, tag: "05 · async", title: "Jobs" },
];

const connectors = [
  "M100 94 V219 H190",
  "M260 190 V119 H350",
  "M260 248 V329 H350",
  "M420 148 V300",
  "M100 358 V398 H420 V358",
];

/** The route the signal follows: client → api → services → data. */
const signal = "M100 94 V219 H260 V119 H420 V300";

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

/**
 * Abstract architecture diagram. Static SVG with CSS-only motion so it adds
 * no JavaScript; the signal is hidden for reduced-motion users.
 */
export function HeroDiagram({ label }: { label: string }) {
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute -inset-8 bg-blueprint [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
      />
      <svg
        viewBox="0 0 520 440"
        role="img"
        aria-label={label}
        className="relative h-auto w-full"
      >
        {/* System boundary around the backend. */}
        <rect
          x="168"
          y="66"
          width="340"
          height="314"
          rx="14"
          fill="none"
          stroke="rgb(255 255 255 / 0.10)"
          strokeDasharray="3 5"
        />
        <text x="184" y="58" className="fill-faint font-mono text-[9px] uppercase tracking-[0.2em]">
          system boundary
        </text>

        {connectors.map((d, i) => (
          <path
            key={d}
            d={d}
            pathLength={1}
            fill="none"
            stroke="rgb(255 255 255 / 0.16)"
            strokeWidth="1"
            className="animate-draw"
            style={delay(300 + i * 120)}
          />
        ))}

        <path
          d={signal}
          pathLength={1}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="0.1 0.9"
          strokeDashoffset="1"
          opacity="0"
          className="animate-pulse-path"
          style={delay(1400)}
        />

        {nodes.map((node, i) => (
          <g key={node.tag} className="animate-rise" style={delay(150 + i * 90)}>
            <rect
              x={node.x}
              y={node.y}
              width={W}
              height={H}
              rx="8"
              fill="var(--color-surface)"
              stroke={node.active ? "rgb(59 130 246 / 0.55)" : "rgb(255 255 255 / 0.14)"}
            />
            <text
              x={node.x + 14}
              y={node.y + 22}
              className="fill-muted font-mono text-[9px] uppercase tracking-[0.16em]"
            >
              {node.tag}
            </text>
            <text x={node.x + 14} y={node.y + 42} className="fill-fg text-[13px] font-medium">
              {node.title}
            </text>
            <circle
              cx={node.x + W - 16}
              cy={node.y + 18}
              r="2.5"
              fill={node.active ? "var(--color-accent)" : "rgb(255 255 255 / 0.25)"}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}
