import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} | ${site.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 80,
        background: "#0a0a0a",
        color: "#ededed",
      }}
    >
      <div
        style={{
          width: 96,
          height: 8,
          background: "#2dd4bf",
          marginBottom: 40,
        }}
      />
      <div style={{ fontSize: 88, fontWeight: 700, letterSpacing: -2 }}>
        {site.name}
      </div>
      <div style={{ fontSize: 40, marginTop: 20, color: "#a3a3a3" }}>
        {site.title}
      </div>
    </div>,
    { ...size },
  );
}
