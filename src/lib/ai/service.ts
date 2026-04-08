import type { IntentCategory, KnowledgeContext } from "./types";

// ── Intent classification via keyword matching ───────────────────────────────

const intentKeywords: Record<IntentCategory, string[]> = {
  project_specific: [
    "project", "built", "build", "portfolio", "resultflow", "result flow",
    "pfis", "personal finance", "finance", "financial", "axiom", "study",
    "renderboundary", "render boundary", "blog", "codesphere", "app", "system",
    "platform", "website", "what have you", "what did you", "show me", "tell me about",
    "mobile money", "mtn", "airtel", "spaced repetition", "exam", "retention",
    "result checking", "academic",
  ],
  architecture_decision: [
    "architecture", "decision", "why", "chose", "choice", "trade-off",
    "tradeoff", "approach", "design", "structure", "adr", "how did you decide",
    "reason", "pattern", "how does it work", "how is it built",
  ],
  tech_stack: [
    "stack", "technology", "tech", "framework", "language", "tool",
    "next.js", "nextjs", "react", "typescript", "javascript", "postgres",
    "prisma", "tailwind", "node", "express", "react native", "mobile",
    "what do you use", "what technologies",
  ],
  career: [
    "experience", "background", "who are you", "about you", "about preston",
    "hire", "available", "availability", "freelance", "contract", "job",
    "role", "kakebe", "codesphere", "education", "degree", "certificate",
    "looking for", "work with you", "working", "founder", "what do you do",
    "contact", "reach", "get in touch", "phone", "location", "kampala",
    "uganda", "timezone",
  ],
  off_topic: [],
};

export function classifyIntent(message: string): IntentCategory {
  const lower = message.toLowerCase();
  let bestMatch: IntentCategory = "off_topic";
  let bestScore = 0;

  for (const [intent, keywords] of Object.entries(intentKeywords) as [IntentCategory, string[]][]) {
    const score = keywords.filter((kw) => lower.includes(kw)).length;
    if (score > bestScore) {
      bestScore = score;
      bestMatch = intent;
    }
  }

  return bestMatch;
}

// ── Follow-up context resolution ─────────────────────────────────────────────
// When someone asks "what stack does it use?" the bot needs to know what "it" is.

const TOPIC_HINTS: Array<{ topic: string; keywords: string[] }> = [
  { topic: "pfis", keywords: ["pfis", "personal finance", "finance intelligence", "auditor", "strategist", "mobile money"] },
  { topic: "axiom", keywords: ["axiom", "study os", "spaced repetition", "study system", "retention engine"] },
  { topic: "resultflow", keywords: ["resultflow", "result flow", "result checking", "academic results"] },
  { topic: "renderboundary", keywords: ["renderboundary", "render boundary", "engineering blog"] },
  { topic: "portfolio", keywords: ["portfolio", "this site", "this website"] },
  { topic: "kakebe", keywords: ["kakebe"] },
  { topic: "codesphere", keywords: ["codesphere"] },
];

const FOLLOW_UP_PATTERN = /\b(it|that|this|its|the project|the system|the app|the platform|the tool|the engine|the blog)\b/i;

export function resolveFollowUp(
  message: string,
  history: Array<{ role: "user" | "assistant"; content: string }>
): string {
  if (!FOLLOW_UP_PATTERN.test(message)) return message;

  // Walk history backwards to find the last mentioned topic
  for (let i = history.length - 1; i >= 0; i--) {
    const msgLower = history[i].content.toLowerCase();
    for (const { topic, keywords } of TOPIC_HINTS) {
      if (keywords.some((kw) => msgLower.includes(kw))) {
        return `${topic} ${message}`;
      }
    }
  }

  return message;
}

// ── Response builder ─────────────────────────────────────────────────────────

const GREETINGS = /^(hi|hello|hey|howdy|sup|what'?s up|yo)\b/i;
const THANKS = /^(thanks|thank you|thx|ty|cheers)\b/i;
const CAPABILITY = /(what can you|what do you know|help me|how do you work)/i;
const OFF_TOPIC_CHECK = /\b(weather|sports|news|politics|movie|music|game|cook|recipe|joke|covid|stock|crypto|bitcoin)\b/i;

const FALLBACK =
  "I'm only able to answer questions about Preston — his projects, background, tech stack, and how to reach him. Try one of the suggestions below.";

// Framing intro lines based on how the question is phrased
function getIntro(question: string, blockTitle: string): string {
  const lower = question.toLowerCase();
  if (/^what is\b|^what'?s\b/.test(lower)) return `**${blockTitle}**\n\n`;
  if (/^tell me about|^describe|^explain/.test(lower)) return `**${blockTitle}**\n\n`;
  if (/^how (does|did|is|was)/.test(lower)) return "";
  if (/^who/.test(lower)) return "";
  if (/^why/.test(lower)) return "";
  return `**${blockTitle}**\n\n`;
}

export function buildLocalResponse(
  knowledge: KnowledgeContext[],
  userMessage: string,
  history: Array<{ role: "user" | "assistant"; content: string }>
): string {
  const lower = userMessage.trim();

  if (GREETINGS.test(lower)) {
    return "Hi! Ask me about Preston's projects, background, tech stack, or how to work with him.";
  }

  if (THANKS.test(lower)) {
    return "You're welcome! Feel free to ask anything else about Preston.";
  }

  if (CAPABILITY.test(lower)) {
    return (
      "I can answer questions about:\n\n" +
      "- **Background & experience** — who Preston is, where he works\n" +
      "- **Projects** — PFIS, Axiom, ResultFlow, RenderBoundary\n" +
      "- **Tech stack** — tools and frameworks he uses\n" +
      "- **Engineering approach** — how he thinks about software\n" +
      "- **Availability** — freelance/contract work, how to reach him"
    );
  }

  if (OFF_TOPIC_CHECK.test(lower)) {
    return FALLBACK;
  }

  const relevant = knowledge.filter((k) => k.relevanceScore > 0);

  if (relevant.length === 0) {
    if (knowledge.length > 0) {
      const block = knowledge[0];
      return `${getIntro(lower, block.title)}${block.content}`;
    }
    return FALLBACK;
  }

  const primary = relevant[0];
  const intro = getIntro(lower, primary.title);
  let response = `${intro}${primary.content}`;

  // Append a second block if meaningfully relevant and non-duplicate
  const secondary = relevant[1];
  if (secondary && secondary.relevanceScore >= 2 && secondary.title !== primary.title) {
    response += `\n\n---\n\n**${secondary.title}**\n\n${secondary.content}`;
  }

  return response;
}
