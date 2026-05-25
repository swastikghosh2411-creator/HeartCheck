// SafetyBanner.jsx — shows crisis resources when safety flags are detected
import React from "react";

export default function SafetyBanner({ flags }) {
  if (!flags || flags.length === 0) return null;

  return (
    <div style={{
      background: "linear-gradient(135deg, #7a2633, #c25c45)",
      color: "#fff",
      borderRadius: "14px",
      padding: "1.25rem 1.5rem",
      marginBottom: "1.5rem",
      animation: "fadeUp 0.4s ease both",
      boxShadow: "0 6px 24px rgba(122, 38, 51, 0.3)"
    }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        marginBottom: "0.75rem"
      }}>
        <span style={{ fontSize: "1.3rem" }}>🆘</span>
        <strong style={{
          fontFamily: "Playfair Display, serif",
          fontSize: "1rem"
        }}>
          You are not alone — help is available
        </strong>
      </div>

      <p style={{
        fontSize: "0.82rem",
        opacity: 0.9,
        marginBottom: "0.75rem",
        lineHeight: 1.5
      }}>
        Something in your message suggests you may be in a difficult or unsafe
        situation. Please know that support exists — you deserve safety and care.
      </p>

      {flags.map((flag, i) => (
        <div key={i} style={{
          background: "rgba(255,255,255,0.15)",
          borderRadius: "8px",
          padding: "0.6rem 0.9rem",
          marginTop: "0.5rem"
        }}>
          <div style={{
            fontWeight: 600,
            fontSize: "0.8rem",
            marginBottom: "0.2rem",
            textTransform: "uppercase",
            letterSpacing: "0.05em"
          }}>
            {flag.label}
          </div>
          <div style={{ fontSize: "0.8rem", opacity: 0.9 }}>
            📞 {flag.resource}
          </div>
        </div>
      ))}
    </div>
  );
}
