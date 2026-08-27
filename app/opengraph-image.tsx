import { ImageResponse } from "next/og";

export const alt = "Medicare in Bend by Health Insurance Options";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(135deg, #163f75 0%, #2563a9 58%, #0f766e 100%)",
        color: "white",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 430,
          height: 430,
          borderRadius: 999,
          right: -90,
          top: -140,
          background: "rgba(255,255,255,0.09)",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 520,
          height: 220,
          borderRadius: 999,
          right: -110,
          bottom: -95,
          background: "rgba(255,255,255,0.08)",
        }}
      />
      <div style={{ display: "flex", flexDirection: "column", padding: "76px 84px", width: "100%" }}>
        <div style={{ display: "flex", fontSize: 25, letterSpacing: 2.8, textTransform: "uppercase", color: "#dbeafe" }}>
          Health Insurance Options LLC
        </div>
        <div style={{ display: "flex", marginTop: 54, fontSize: 78, fontWeight: 800, lineHeight: 1.02 }}>
          Medicare in Bend
        </div>
        <div style={{ display: "flex", marginTop: 25, maxWidth: 810, fontSize: 36, lineHeight: 1.25, color: "#e0f2fe" }}>
          Local guidance for Bend and Central Oregon
        </div>
        <div style={{ display: "flex", marginTop: "auto", alignItems: "center", gap: 18, fontSize: 25 }}>
          <div style={{ display: "flex", width: 14, height: 14, borderRadius: 99, background: "#fbbf24" }} />
          Licensed independent insurance agency
        </div>
      </div>
    </div>,
    size,
  );
}
