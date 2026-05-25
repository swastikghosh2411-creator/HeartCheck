// ModeSelector.jsx — advice mode picker
import React from "react";

const MODES = [
  {
    id: "soft",
    emoji: "🌸",
    label: "Soft Advice",
    description: "Gentle, compassionate guidance"
  },
  {
    id: "brutal",
    emoji: "🔥",
    label: "Brutally Honest",
    description: "Raw truth, no sugarcoating"
  },
  {
    id: "redflag",
    emoji: "🚩",
    label: "Red Flag Check",
    description: "Spot toxic patterns & warning signs"
  },
  {
    id: "text",
    emoji: "💬",
    label: "What Should I Text?",
    description: "Get the perfect message to send"
  }
];

export default function ModeSelector({ selected, onChange }) {
  return (
    <div style={{ marginBottom: "2rem" }}>
      <p style={{
        fontFamily: "DM Sans, sans-serif",
        fontSize: "0.8rem",
        fontWeight: 600,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: "var(--muted)",
        marginBottom: "0.75rem"
      }}>
        Choose your advice mode
      </p>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "0.75rem"
      }}>
        {MODES.map((mode, i) => (
          <button
            key={mode.id}
            onClick={() => onChange(mode.id)}
            style={{
              background: selected === mode.id
                ? "var(--burgundy)"
                : "var(--card-bg)",
              color: selected === mode.id ? "#fff" : "var(--ink)",
              border: selected === mode.id
                ? "2px solid var(--burgundy)"
                : "2px solid var(--border)",
              borderRadius: "12px",
              padding: "0.9rem 1rem",
              cursor: "pointer",
              textAlign: "left",
              transition: "all 0.2s ease",
              animation: `fadeUp 0.4s ease ${i * 0.07}s both`,
              transform: selected === mode.id ? "translateY(-2px)" : "none",
              boxShadow: selected === mode.id
                ? "0 6px 20px rgba(122, 38, 51, 0.25)"
                : "none"
            }}
          >
            <div style={{ fontSize: "1.4rem", marginBottom: "0.3rem" }}>
              {mode.emoji}
            </div>
            <div style={{
              fontWeight: 600,
              fontSize: "0.9rem",
              marginBottom: "0.15rem",
              fontFamily: "Playfair Display, serif"
            }}>
              {mode.label}
            </div>
            <div style={{
              fontSize: "0.75rem",
              opacity: selected === mode.id ? 0.85 : 0.55,
              lineHeight: 1.3
            }}>
              {mode.description}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
