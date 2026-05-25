// safety.js — checks for self-harm, abuse, blackmail, and threats

const CRISIS_KEYWORDS = [
  // Self-harm / suicidal
  "kill myself", "end my life", "suicide", "self-harm", "cut myself",
  "hurt myself", "don't want to live", "want to die", "take my life",
  // Abuse
  "he hits me", "she hits me", "physically abused", "beats me",
  "chokes me", "strangled", "he hurt me", "she hurt me",
  // Blackmail / coercion
  "blackmail", "threatening to expose", "revenge porn", "send nudes or",
  "post my photos", "leak my pictures",
  // Threats
  "threatened to kill", "going to hurt me", "threatened me with",
  "said he would kill", "said she would kill"
];

const CRISIS_RESOURCES = {
  selfHarm: {
    label: "Self-Harm / Suicide Support",
    resource: "iCall (India): 9152987821 | International: findahelpline.com"
  },
  abuse: {
    label: "Domestic Abuse Support",
    resource: "iCall (India): 9152987821 | National DV Hotline (US): 1-800-799-7233 | thehotline.org"
  },
  blackmail: {
    label: "Blackmail / Coercion",
    resource: "Contact local police or cybercrime.gov.in (India) | cyber.gov.au | ic3.gov (US)"
  },
  threats: {
    label: "Safety Threat",
    resource: "Call emergency services (112 in India, 911 in US) immediately if in danger."
  }
};

function detectSafetyFlags(text) {
  const lower = text.toLowerCase();
  const flags = [];

  if (
    lower.includes("kill myself") || lower.includes("suicide") ||
    lower.includes("end my life") || lower.includes("self-harm") ||
    lower.includes("hurt myself") || lower.includes("don't want to live") ||
    lower.includes("want to die") || lower.includes("take my life")
  ) {
    flags.push(CRISIS_RESOURCES.selfHarm);
  }

  if (
    lower.includes("hits me") || lower.includes("beats me") ||
    lower.includes("physically abused") || lower.includes("chokes me") ||
    lower.includes("strangled") || lower.includes("abusing me")
  ) {
    flags.push(CRISIS_RESOURCES.abuse);
  }

  if (
    lower.includes("blackmail") || lower.includes("revenge porn") ||
    lower.includes("send nudes or") || lower.includes("post my photos") ||
    lower.includes("leak my pictures") || lower.includes("threatening to expose")
  ) {
    flags.push(CRISIS_RESOURCES.blackmail);
  }

  if (
    lower.includes("threatened to kill") || lower.includes("going to hurt me") ||
    lower.includes("threatened me with") || lower.includes("said he would kill") ||
    lower.includes("said she would kill")
  ) {
    flags.push(CRISIS_RESOURCES.threats);
  }

  return flags;
}

module.exports = { detectSafetyFlags };
