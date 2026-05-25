// AdviceCard.jsx — renders one section of the AI advice
import React, { useState } from "react";

export default function AdviceCard({ icon, title, content, delay = 0, accent = false, copyable = false }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div style={{
      background: accent ? "linear-gradient(135deg, #7a2633 0%, #c25c45 100%)" : "var(--card-bg)",
      color: accent ? "#fff" : "var(--ink)",
      border: accent ? "none" : "1px solid var(--border)",
      borderRadius: "14px",
      padding: "1.25rem 1.4rem",
      animation: `fadeUp 0.5s ease ${delay}s both`,
      boxShadow: accent ? "0 8px 32px rgba(122, 38, 51, 0.25)" : "var(--shadow)"
    }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "0.6rem"
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem"
        }}>
          <span style={{ fontSize: "1.1rem" }}>{icon}</span>
          <span style={{
            fontFamily: "Playfair Display, serif",
            fontWeight: 700,
            fontSize: "0.95rem",
            opacity: accent ? 0.95 : 1
          }}>
            {title}
          </span>
        </div>

        {copyable && (
          <button
            onClick={handleCopy}
            title="Copy message"
            style={{
              background: "rgba(255,255,255,0.2)",
              border: "1px solid rgba(255,255,255,0.3)",
              borderRadius: "6px",
              color: "#fff",
              padding: "0.25rem 0.6rem",
              fontSize: "0.72rem",
              cursor: "pointer",
              fontFamily: "DM Sans, sans-serif",
              transition: "all 0.15s ease"
            }}
          >
            {copied ? "✓ Copied!" : "Copy"}
          </button>
        )}
      </div>

      <p style={{
        fontSize: "0.9rem",
        lineHeight: 1.65,
        opacity: accent ? 0.92 : 0.85,
        fontStyle: copyable ? "italic" : "normal"
      }}>
        {content}
      </p>
    </div>
  );
}
