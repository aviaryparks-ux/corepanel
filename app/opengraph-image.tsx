// app/opengraph-image.tsx
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#111827",
          background: "linear-gradient(135deg, #111827 0%, #1f2937 100%)",
        }}
      >
        {/* Logo area */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "20px",
              background: "linear-gradient(135deg, #60a5fa 0%, #a855f7 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "32px",
              fontWeight: "bold",
              color: "white",
            }}
          >
            &lt;/&gt;
          </div>
          <span
            style={{
              fontSize: "60px",
              fontWeight: "bold",
              background: "linear-gradient(135deg, #60a5fa 0%, #a855f7 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            DevSolution
          </span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: "32px",
            color: "#9ca3af",
            marginBottom: "60px",
            textAlign: "center",
          }}
        >
          Jasa Pembuatan Aplikasi Web, Mobile & Panel Admin
        </div>

        {/* Stats badges */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            marginBottom: "40px",
          }}
        >
          {[
            { label: "100+ Project", color: "#60a5fa" },
            { label: "50+ Klien", color: "#a855f7" },
            { label: "5+ Tahun", color: "#22c55e" },
            { label: "Garansi 2x", color: "#eab308" },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                padding: "16px 32px",
                borderRadius: "30px",
                backgroundColor: "#1f2937",
                border: `2px solid ${stat.color}`,
                color: stat.color,
                fontSize: "24px",
                fontWeight: 600,
              }}
            >
              {stat.label}
            </div>
          ))}
        </div>

        {/* Contact */}
        <div
          style={{
            fontSize: "20px",
            color: "#6b7280",
          }}
        >
          devsolution.id
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
