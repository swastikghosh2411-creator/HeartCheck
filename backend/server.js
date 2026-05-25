// server.js — HeartCheck AI backend
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { detectSafetyFlags } = require("./safety");
const { buildPrompt } = require("./prompts");

const app = express();
const PORT = process.env.PORT || 3001;

// ─── Middleware ────────────────────────────────────────────────────────────────
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// ─── Gemini Setup ──────────────────────────────────────────────────────────────
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({ status: "HeartCheck AI backend is running ❤️" });
});

// ─── Main Advice Route ─────────────────────────────────────────────────────────
app.post("/api/advice", async (req, res) => {
  const { situation, mode } = req.body;

  // 1. Validate inputs
  if (!situation || typeof situation !== "string" || situation.trim().length < 10) {
    return res.status(400).json({
      error: "Please describe your situation in at least a few words."
    });
  }

  if (!["soft", "brutal", "redflag", "text"].includes(mode)) {
    return res.status(400).json({ error: "Invalid advice mode selected." });
  }

  // 2. Safety check
  const safetyFlags = detectSafetyFlags(situation);

  // 3. Build prompt
  const prompt = buildPrompt(situation.trim(), mode);

  // 4. Call Gemini
  try {
    const result = await model.generateContent(prompt);
    const rawText = result.response.text();

    // 5. Parse JSON from Gemini response
    let advice;
    try {
      // Strip any accidental markdown fences
      const cleaned = rawText.replace(/```json|```/gi, "").trim();
      advice = JSON.parse(cleaned);
    } catch (parseErr) {
      console.error("JSON parse error:", parseErr.message);
      console.error("Raw Gemini response:", rawText);
      return res.status(500).json({
        error: "The AI returned an unexpected format. Please try again."
      });
    }

    // 6. Return advice + any safety resources
    return res.json({
      advice,
      safetyFlags: safetyFlags.length > 0 ? safetyFlags : null,
      mode
    });

  } catch (err) {
    console.error("Gemini API error:", err.message);

    if (err.message?.includes("API_KEY")) {
      return res.status(500).json({
        error: "Invalid or missing Gemini API key. Check your .env file."
      });
    }

    return res.status(500).json({
      error: "Something went wrong while talking to the AI. Please try again."
    });
  }
});

// ─── Start Server ──────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n❤️  HeartCheck AI backend running at http://localhost:${PORT}`);
  console.log(`   Gemini key loaded: ${process.env.GEMINI_API_KEY ? "✅ Yes" : "❌ No — add it to .env"}\n`);
});
