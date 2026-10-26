import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Home-screen icon for iOS: the favicon mark on an opaque square (iOS rounds it). */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#09090b",
        }}
      >
        <svg width="132" height="132" viewBox="8 8 48 48">
          <path
            d="M20 46V18h13.5a8.5 8.5 0 0 1 0 17H20m13.5 0L44 46"
            fill="none"
            stroke="#fafafa"
            strokeWidth="4.5"
            strokeLinecap="square"
          />
          <rect x="40" y="16" width="7" height="7" fill="#3b82f6" />
        </svg>
      </div>
    ),
    size,
  );
}
