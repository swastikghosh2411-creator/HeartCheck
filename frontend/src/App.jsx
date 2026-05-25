// App.jsx — HeartCheck AI main application
import React, { useState } from "react";
import ModeSelector from "./components/ModeSelector";
import AdviceResult from "./components/AdviceResult";
import SafetyBanner from "./components/SafetyBanner";

export default function App() {
  const [situation, setSituation] = useState("");
  const [mode, setMode] = useState("soft");
  const [result, setResult] = useState(null);
  const [safetyFlags, setSafetyFlags] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const charLimit = 1000;

  const handleSubmit = async () => {
    if (situation.trim().length < 10) {
      setError("Please share a bit more about your situation (at least 10 characters).");
      return;
    }

    setError("");
    setResult(null);
    setSafetyFlags(null);
    setLoading(true);

    try {
      const res = await fetch("/api/advice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ situation: situation.trim(), mode })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }

      setResult(data.advice);
      if (data.safetyFlags) setSafetyFlags(data.safetyFlags);

      // Scroll to results
      setTimeout(() => {
        document.getElementById("results-section")?.scrollIntoView({
          behavior: "smooth", block: "start"
        });
      }, 100);

    } catch (err) {
      setError("Could not reach the server. Make sure the backend is running on port 3001.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSituation("");
    setResult(null);
    setSafetyFlags(null);
    setError("");
    setMode("soft");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--cream)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "0 1rem 4rem"
    }}>
      {/* ── Header ── */}
      <header style={{
        textAlign: "center",
        padding: "3rem 1rem 1.5rem",
        maxWidth: "560px",
        width: "100%",
        animation: "fadeUp 0.6s ease both"
      }}>
        <div style={{
          display: "inline-block",
          animation: "pulse-heart 2s ease-in-out infinite",
          fontSize: "2.5rem",
          marginBottom: "0.75rem"
        }}>
          ❤️
        </div>
        <h1 style={{
          fontFamily: "Playfair Display, serif",
          fontSize: "clamp(2rem, 6vw, 2.8rem)",
          color: "var(--burgundy)",
          marginBottom: "0.5rem",
          letterSpacing: "-0.02em"
        }}>
          HeartCheck AI
        </h1>
        <p style={{
          color: "var(--ink-light)",
          fontSize: "1rem",
          fontWeight: 300,
          maxWidth: "380px",
          margin: "0 auto"
        }}>
          Share your relationship situation. Get honest, structured clarity — no judgment.
        </p>
      </header>

      {/* ── Main Card ── */}
      <main style={{
        width: "100%",
        maxWidth: "560px",
        background: "var(--card-bg)",
        borderRadius: "20px",
        padding: "2rem",
        boxShadow: "var(--shadow)",
        border: "1px solid var(--border)",
        animation: "fadeUp 0.6s ease 0.1s both"
      }}>

        {/* Situation textarea */}
        <div style={{ marginBottom: "1.75rem" }}>
          <label style={{
            display: "block",
            fontSize: "0.8rem",
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--muted)",
            marginBottom: "0.5rem"
          }}>
            What's going on?
          </label>

          <textarea
            value={situation}
            onChange={(e) => {
              if (e.target.value.length <= charLimit) setSituation(e.target.value);
            }}
            placeholder="e.g. My partner never texts me back for hours but is always active on Instagram. When I bring it up, they say I'm overreacting. I don't know what to think..."
            rows={6}
            style={{
              width: "100%",
              borderRadius: "12px",
              border: "2px solid var(--border)",
              padding: "1rem",
              fontFamily: "DM Sans, sans-serif",
              fontSize: "0.9rem",
              color: "var(--ink)",
              background: "var(--warm-white)",
              resize: "vertical",
              outline: "none",
              transition: "border-color 0.2s ease",
              lineHeight: 1.6
            }}
            onFocus={(e) => e.target.style.borderColor = "var(--rose)"}
            onBlur={(e) => e.target.style.borderColor = "var(--border)"}
          />

          <div style={{
            textAlign: "right",
            fontSize: "0.72rem",
            color: situation.length > charLimit * 0.9 ? "var(--deep-rose)" : "var(--muted)",
            marginTop: "0.3rem"
          }}>
            {situation.length}/{charLimit}
          </div>
        </div>

        {/* Mode selector */}
        <ModeSelector selected={mode} onChange={setMode} />

        {/* Error */}
        {error && (
          <div style={{
            background: "#fff0ed",
            border: "1px solid var(--blush)",
            borderRadius: "10px",
            padding: "0.75rem 1rem",
            color: "var(--deep-rose)",
            fontSize: "0.85rem",
            marginBottom: "1rem",
            animation: "fadeUp 0.3s ease both"
          }}>
            ⚠️ {error}
          </div>
        )}

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          disabled={loading || situation.trim().length < 10}
          style={{
            width: "100%",
            padding: "1rem",
            background: loading
              ? "var(--muted)"
              : "linear-gradient(135deg, var(--burgundy), var(--deep-rose))",
            color: "#fff",
            border: "none",
            borderRadius: "12px",
            fontSize: "1rem",
            fontWeight: 600,
            fontFamily: "DM Sans, sans-serif",
            cursor: loading || situation.trim().length < 10 ? "not-allowed" : "pointer",
            transition: "all 0.25s ease",
            boxShadow: loading ? "none" : "0 6px 20px rgba(122, 38, 51, 0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            letterSpacing: "0.02em"
          }}
        >
          {loading ? (
            <>
              <span style={{
                width: "18px", height: "18px",
                border: "2px solid rgba(255,255,255,0.3)",
                borderTopColor: "#fff",
                borderRadius: "50%",
                display: "inline-block",
                animation: "spin 0.8s linear infinite"
              }} />
              Thinking...
            </>
          ) : (
            <>❤️ Get My Heart Check</>
          )}
        </button>
      </main>

      {/* ── Results Section ── */}
      <div
        id="results-section"
        style={{ width: "100%", maxWidth: "560px", paddingTop: "1rem" }}
      >
        {safetyFlags && <SafetyBanner flags={safetyFlags} />}

        {result && (
          <>
            <AdviceResult advice={result} mode={mode} />

            <button
              onClick={handleReset}
              style={{
                display: "block",
                margin: "2rem auto 0",
                background: "transparent",
                border: "2px solid var(--border)",
                borderRadius: "10px",
                padding: "0.65rem 1.5rem",
                color: "var(--muted)",
                fontFamily: "DM Sans, sans-serif",
                fontSize: "0.85rem",
                cursor: "pointer",
                transition: "all 0.2s ease",
                animation: "fadeUp 0.4s ease 0.4s both"
              }}
              onMouseOver={(e) => {
                e.target.style.borderColor = "var(--rose)";
                e.target.style.color = "var(--deep-rose)";
              }}
              onMouseOut={(e) => {
                e.target.style.borderColor = "var(--border)";
                e.target.style.color = "var(--muted)";
              }}
            >
              ↩ Check Another Situation
            </button>
          </>
        )}
      </div>

      {/* ── Footer ── */}
      <footer style={{
        marginTop: "3rem",
        color: "var(--muted)",
        fontSize: "0.75rem",
        textAlign: "center"
      }}>
        HeartCheck AI · Built with ❤️ · Not a substitute for therapy
      </footer>
    </div>
  );
}
