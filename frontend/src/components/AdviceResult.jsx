// AdviceResult.jsx — renders the full AI advice response
import React from "react";
import AdviceCard from "./AdviceCard";

const MODE_LABELS = {
  soft: { label: "Soft Advice", emoji: "🌸" },
  brutal: { label: "Brutally Honest", emoji: "🔥" },
  redflag: { label: "Red Flag Check", emoji: "🚩" },
  text: { label: "What Should I Text?", emoji: "💬" }
};

export default function AdviceResult({ advice, mode }) {
  if (!advice) return null;

  const modeInfo = MODE_LABELS[mode] || { label: mode, emoji: "❤️" };

  return (
    <div style={{ marginTop: "2rem" }}>
      {/* Mode badge */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "0.4rem",
        marginBottom: "1.25rem",
        animation: "fadeUp 0.4s ease both"
      }}>
        <div style={{
          background: "var(--blush)",
          color: "var(--burgundy)",
          borderRadius: "999px",
          padding: "0.3rem 0.9rem",
          fontSize: "0.78rem",
          fontWeight: 600,
          letterSpacing: "0.04em",
          display: "flex",
          alignItems: "center",
          gap: "0.3rem"
        }}>
          {modeInfo.emoji} {modeInfo.label} Results
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
        <AdviceCard
          icon="🧠"
          title="Honest Summary"
          content={advice.honestSummary}
          delay={0.05}
        />
        <AdviceCard
          icon="⚠️"
          title="What Seems Unhealthy"
          content={advice.unhealthyPatterns}
          delay={0.1}
        />
        <AdviceCard
          icon="🪞"
          title="What I May Be Doing Wrong"
          content={advice.myRole}
          delay={0.15}
        />
        <AdviceCard
          icon="🛡️"
          title="Boundary to Set"
          content={advice.boundaryToSet}
          delay={0.2}
        />
        <AdviceCard
          icon="✉️"
          title="Suggested Message"
          content={advice.suggestedMessage}
          delay={0.25}
          copyable={true}
          accent={true}
        />
        <AdviceCard
          icon="💡"
          title="Final Advice"
          content={advice.finalAdvice}
          delay={0.3}
        />
      </div>

      {/* Disclaimer */}
      <p style={{
        textAlign: "center",
        fontSize: "0.72rem",
        color: "var(--muted)",
        marginTop: "1.5rem",
        lineHeight: 1.5,
        animation: "fadeUp 0.4s ease 0.35s both"
      }}>
        HeartCheck AI offers perspective, not professional therapy.
        If you're struggling, please consider speaking with a licensed counselor.
      </p>
    </div>
  );
}
