import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { isLocale, type Locale } from "@/i18n/config";
import type { ProjectVisual } from "@/types/content";
import { siteConfig } from "@/config/site";
import { localizePath } from "@/lib/utils";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const FONT_DIR = path.join(process.cwd(), "src/assets/fonts");

// Fonts don't depend on the request, so they are read once per module.
const fonts = Promise.all([
  readFile(path.join(FONT_DIR, "Geist-Regular.ttf")),
  readFile(path.join(FONT_DIR, "Geist-SemiBold.ttf")),
  readFile(path.join(FONT_DIR, "GeistMono-Regular.ttf")),
  readFile(path.join(FONT_DIR, "GeistMono-Medium.ttf")),
]);

const color = {
  bg: "#09090b",
  surface: "#111115",
  fg: "#fafafa",
  muted: "#a1a1aa",
  faint: "#71717a",
  accent: "#3b82f6",
  line: "rgba(255,255,255,0.08)",
  lineStrong: "rgba(255,255,255,0.16)",
};

const PADDING = 64;
const MONO = "Geist Mono";

/** Image metadata for a localized route: one image with a translated alt. */
export async function ogImageMetadata(
  params: Promise<{ lang: string }> | { lang: string },
  alt: (locale: Locale) => string | Promise<string>,
) {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : "en";
  return [
    {
      id: "og",
      alt: await alt(locale),
      size: ogSize,
      contentType: ogContentType,
    },
  ];
}

export async function resolveOgLocale(params: Promise<{ lang: string }>) {
  const { lang } = await params;
  return isLocale(lang) ? lang : "en";
}

type OgImageInput = {
  locale: Locale;
  /** Locale-relative path, printed as the page address. */
  path: string;
  eyebrow: string;
  title: string;
  /** Second title line, rendered muted (used by the home hero). */
  titleMuted?: string;
  description?: string;
  /** Short facts printed in the footer row, e.g. status, year, stack. */
  meta?: string[];
  art?: "diagram" | ProjectVisual;
};

/** The shared ROLTEK Open Graph card: blueprint grid, wordmark, title. */
export async function renderOgImage({
  locale,
  path: pagePath,
  eyebrow,
  title,
  titleMuted,
  description,
  meta = [],
  art,
}: OgImageInput) {
  const [regular, semibold, mono, monoMedium] = await fonts;
  const host = new URL(siteConfig.url).host;
  const address = `${host}${localizePath(locale, pagePath)}`;
  const hasArt = art !== undefined;
  const titleSize = titleFontSize([title, titleMuted ?? ""], hasArt);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: color.bg,
          color: color.fg,
          fontFamily: "Geist",
        }}
      >
        <Blueprint />

        {hasArt ? (
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              width: 470,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {art === "diagram" ? <Diagram /> : art === "orbit" ? <Orbit /> : <GridArt />}
          </div>
        ) : null}

        <div
          style={{
            position: "absolute",
            top: PADDING,
            right: PADDING,
            bottom: PADDING,
            left: PADDING,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                fontFamily: MONO,
                fontWeight: 500,
                fontSize: 26,
                letterSpacing: 7,
              }}
            >
              ROLTEK
              <div style={{ width: 10, height: 10, background: color.accent }} />
            </div>
            <div style={{ display: "flex", fontFamily: MONO, fontSize: 20, color: color.faint }}>
              {address}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: hasArt ? 640 : 1000,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                fontFamily: MONO,
                fontSize: 18,
                letterSpacing: 2.5,
                textTransform: "uppercase",
                color: color.muted,
              }}
            >
              <div style={{ width: 28, height: 1, background: color.accent }} />
              {eyebrow}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: 26,
                fontSize: titleSize,
                fontWeight: 600,
                letterSpacing: -titleSize * 0.035,
                lineHeight: 1.04,
              }}
            >
              <span>{title}</span>
              {titleMuted ? <span style={{ color: color.muted }}>{titleMuted}</span> : null}
            </div>
            {description ? (
              <div
                style={{
                  marginTop: 26,
                  fontSize: 26,
                  lineHeight: 1.45,
                  color: color.muted,
                }}
              >
                {description}
              </div>
            ) : null}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingTop: 24,
              borderTop: `1px solid ${color.line}`,
              fontFamily: MONO,
              fontSize: 19,
              color: color.muted,
            }}
          >
            <span>{siteConfig.founder}</span>
            <div style={{ display: "flex", gap: 10 }}>
              {meta.map((item) => (
                <div
                  key={item}
                  style={{
                    display: "flex",
                    padding: "6px 14px",
                    border: `1px solid ${color.lineStrong}`,
                    borderRadius: 999,
                    color: color.fg,
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        <CornerMarks />
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Geist", data: regular, weight: 400, style: "normal" },
        { name: "Geist", data: semibold, weight: 600, style: "normal" },
        { name: MONO, data: mono, weight: 400, style: "normal" },
        { name: MONO, data: monoMedium, weight: 500, style: "normal" },
      ],
    },
  );
}

/** Long titles step down so they stay within three lines. */
function titleFontSize(lines: string[], narrow: boolean) {
  const length = Math.max(...lines.map((line) => line.length));
  if (narrow) {
    if (length <= 12) return 76;
    if (length <= 22) return 64;
    if (length <= 40) return 54;
    return 46;
  }
  if (length <= 30) return 84;
  if (length <= 60) return 68;
  if (length <= 90) return 56;
  return 46;
}

function Blueprint() {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        display: "flex",
        backgroundImage: [
          "radial-gradient(circle at 82% 46%, rgba(59,130,246,0.16), transparent 42%)",
          `linear-gradient(to right, ${color.line} 1px, transparent 1px)`,
          `linear-gradient(to bottom, ${color.line} 1px, transparent 1px)`,
        ].join(", "),
        backgroundSize: "100% 100%, 48px 48px, 48px 48px",
      }}
    />
  );
}

function CornerMarks() {
  // Satori ignores right/bottom here, so positions are absolute coordinates.
  const near = PADDING / 2 - 7;
  const farX = ogSize.width - PADDING / 2 - 7;
  const farY = ogSize.height - PADDING / 2 - 7;
  const corners = [
    { top: near, left: near },
    { top: near, left: farX },
    { top: farY, left: near },
    { top: farY, left: farX },
  ];
  return (
    <>
      {corners.map((position, i) => (
        <div
          key={i}
          style={{ position: "absolute", display: "flex", width: 14, height: 14, ...position }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14">
            <path d="M7 0V14M0 7H14" stroke={color.faint} strokeWidth="1" />
          </svg>
        </div>
      ))}
    </>
  );
}

function Orbit() {
  return (
    <svg width="380" height="380" viewBox="0 0 320 320">
      {[150, 118, 86].map((r, i) => (
        <circle
          key={r}
          cx="160"
          cy="160"
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.12)"
          strokeDasharray={i === 0 ? "2 6" : undefined}
        />
      ))}
      <rect x="112" y="100" width="96" height="120" rx="28" fill="#0c0c10" stroke="rgba(255,255,255,0.24)" />
      <rect x="208" y="136" width="5" height="22" rx="2.5" fill="rgba(255,255,255,0.24)" />
      <circle cx="160" cy="160" r="30" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
      {/* 68% of the ring: an arc from 12 o'clock, clockwise. */}
      <path
        d={arcPath(160, 160, 30, 0.68)}
        fill="none"
        stroke={color.accent}
        strokeWidth="6"
        strokeLinecap="round"
      />
      <circle cx="263" cy="58" r="10" fill="rgba(59,130,246,0.18)" />
      <circle cx="263" cy="58" r="4" fill={color.accent} />
    </svg>
  );
}

function GridArt() {
  return (
    <svg width="380" height="240" viewBox="0 0 320 200">
      {Array.from({ length: 4 }).map((_, row) =>
        Array.from({ length: 6 }).map((_, col) => {
          const active = row === 1 && col === 3;
          return (
            <rect
              key={`${row}-${col}`}
              x={20 + col * 48}
              y={20 + row * 42}
              width="36"
              height="30"
              rx="5"
              fill={active ? "rgba(59,130,246,0.18)" : color.surface}
              stroke={active ? color.accent : "rgba(255,255,255,0.14)"}
            />
          );
        }),
      )}
    </svg>
  );
}

/** A compact version of the hero architecture diagram. */
function Diagram() {
  const nodes = [
    { x: 20, y: 30, tag: "client" },
    { x: 150, y: 150, tag: "api", active: true },
    { x: 280, y: 60, tag: "domain" },
    { x: 280, y: 240, tag: "storage" },
  ];
  return (
    <svg width="420" height="340" viewBox="0 0 400 320">
      <rect
        x="134"
        y="40"
        width="256"
        height="270"
        rx="12"
        fill="none"
        stroke="rgba(255,255,255,0.12)"
        strokeDasharray="3 5"
      />
      {["M70 76 V173 H150", "M250 173 H265 V83 H280", "M250 173 H265 V263 H280"].map((d) => (
        <path key={d} d={d} fill="none" stroke="rgba(255,255,255,0.2)" />
      ))}
      <path d="M70 76 V173 H250" fill="none" stroke={color.accent} strokeWidth="2" />
      {nodes.map((node) => (
        <g key={node.tag}>
          <rect
            x={node.x}
            y={node.y}
            width="100"
            height="46"
            rx="8"
            fill={color.surface}
            stroke={node.active ? "rgba(59,130,246,0.6)" : "rgba(255,255,255,0.16)"}
          />
          <rect x={node.x + 14} y={node.y + 14} width="44" height="5" rx="2.5" fill="rgba(255,255,255,0.28)" />
          <rect x={node.x + 14} y={node.y + 27} width="62" height="5" rx="2.5" fill="rgba(255,255,255,0.12)" />
          <circle
            cx={node.x + 86}
            cy={node.y + 16}
            r="3"
            fill={node.active ? color.accent : "rgba(255,255,255,0.3)"}
          />
        </g>
      ))}
    </svg>
  );
}

function arcPath(cx: number, cy: number, r: number, fraction: number) {
  const angle = fraction * 2 * Math.PI;
  const x = cx + r * Math.sin(angle);
  const y = cy - r * Math.cos(angle);
  const largeArc = fraction > 0.5 ? 1 : 0;
  return `M${cx} ${cy - r} A${r} ${r} 0 ${largeArc} 1 ${x.toFixed(2)} ${y.toFixed(2)}`;
}
