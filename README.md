# ❤️ HeartCheck AI

A relationship advice app powered by Google Gemini AI. Share your situation, pick an advice mode, and get structured, honest clarity.

---

## 📁 Project Structure

```
heartcheck-ai/
├── backend/
│   ├── server.js        ← Express API server
│   ├── prompts.js       ← Builds Gemini prompts per mode
│   ├── safety.js        ← Detects crisis keywords
│   ├── package.json
│   └── .env.example     ← Copy this to .env and add your key
│
└── frontend/
    ├── index.html
    ├── vite.config.js
    ├── package.json
    └── src/
        ├── main.jsx
        ├── App.jsx              ← Main app UI
        ├── index.css            ← Global styles
        └── components/
            ├── ModeSelector.jsx ← 4 advice mode buttons
            ├── AdviceCard.jsx   ← Single advice section card
            ├── AdviceResult.jsx ← Full result renderer
            └── SafetyBanner.jsx ← Crisis resource display
```

---

## 🚀 Setup (5 minutes)

### 1. Get a free Gemini API key
Go to → https://aistudio.google.com/app/apikey  
Click **"Get API Key"** and copy it.

### 2. Set up the backend

```bash
cd heartcheck-ai/backend
cp .env.example .env
# Open .env and paste your Gemini key:
# GEMINI_API_KEY=your_key_here

npm install
npm run dev
```

Backend runs at: **http://localhost:3001**

### 3. Set up the frontend (new terminal)

```bash
cd heartcheck-ai/frontend
npm install
npm run dev
```

Frontend runs at: **http://localhost:5173**

---

## 🎯 Features

| Feature | Details |
|---|---|
| **4 Advice Modes** | Soft, Brutal, Red Flag Check, What Should I Text? |
| **6-Part Structured Response** | Summary, Unhealthy Patterns, My Role, Boundary, Message, Final Advice |
| **Safety Check** | Detects self-harm, abuse, blackmail, threats — shows crisis resources |
| **Copy Message** | One-click copy for the suggested text message |
| **No login / No database** | Stateless — nothing is stored |

---

## 🔧 API Reference

**POST** `/api/advice`

Request body:
```json
{
  "situation": "My partner...",
  "mode": "soft" | "brutal" | "redflag" | "text"
}
```

Response:
```json
{
  "advice": {
    "honestSummary": "...",
    "unhealthyPatterns": "...",
    "myRole": "...",
    "boundaryToSet": "...",
    "suggestedMessage": "...",
    "finalAdvice": "..."
  },
  "safetyFlags": null | [ { "label": "...", "resource": "..." } ],
  "mode": "soft"
}
```

---

## ⚠️ Disclaimer

HeartCheck AI is for perspective and entertainment only. It is **not** a substitute for professional therapy or counseling. If you're in crisis, please reach out to a mental health professional.
