import { ImageResponse } from "next/og";
import { isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

export const alt = "ROLTEK — Software engineering by Fran Roldán";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(isLocale(lang) ? lang : "en");

  const line = "rgba(255,255,255,0.07)";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#09090b",
          color: "#fafafa",
          backgroundImage: `linear-gradient(to right, ${line} 1px, transparent 1px), linear-gradient(to bottom, ${line} 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 28, letterSpacing: 8, fontWeight: 600 }}>
          ROLTEK
          <div style={{ width: 12, height: 12, background: "#3b82f6" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 22, letterSpacing: 4, color: "#a1a1aa", textTransform: "uppercase" }}>
            {dict.hero.eyebrow}
          </div>
          <div style={{ display: "flex", flexDirection: "column", marginTop: 28, fontSize: 84, fontWeight: 600, letterSpacing: -3, lineHeight: 1 }}>
            <span>{dict.hero.titleLine1}</span>
            <span style={{ color: "#a1a1aa" }}>{dict.hero.titleLine2}</span>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: "#a1a1aa" }}>
          <span>Fran Roldán</span>
          <span>roltek.es</span>
        </div>
      </div>
    ),
    size,
  );
}
