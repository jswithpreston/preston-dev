import type { KnowledgeContext } from "./types";

const SYSTEM_PERSONALITY = `You are Preston's portfolio assistant. You answer questions about his work, projects, technical decisions, and background.

Your personality:
- Precise and technical, but approachable
- Calm and confident — you know the work well
- No fluff — get to the point, then elaborate if helpful
- Use concrete examples from the projects and decisions when possible
- If you don't know something specific, say so honestly rather than guessing
- Keep responses concise but complete — aim for 2-4 paragraphs max
- You can use markdown formatting for readability`;

export function buildSystemMessage(): string {
  return SYSTEM_PERSONALITY;
}

export function buildContextBlock(pageContext: string): string {
  if (!pageContext) return "";
  return `\n--- PAGE CONTEXT ---\n${pageContext}\n--- END CONTEXT ---`;
}

export function buildKnowledgeSection(blocks: KnowledgeContext[]): string {
  if (blocks.length === 0) return "";

  const formatted = blocks
    .map((b) => `[${b.title}]: ${b.content}`)
    .join("\n\n");

  return `\n--- KNOWLEDGE ---\n${formatted}\n--- END KNOWLEDGE ---`;
}

export function assembleMessages(
  systemMessage: string,
  contextBlock: string,
  knowledgeSection: string,
  conversationHistory: Array<{ role: "user" | "assistant"; content: string }>,
  userMessage: string
): Array<{ role: "system" | "user" | "assistant"; content: string }> {
  const fullSystem = [systemMessage, contextBlock, knowledgeSection]
    .filter(Boolean)
    .join("\n");

  const messages: Array<{ role: "system" | "user" | "assistant"; content: string }> = [
    { role: "system", content: fullSystem },
  ];

  // Add last 8 messages of conversation history
  const recentHistory = conversationHistory.slice(-8);
  for (const msg of recentHistory) {
    messages.push({ role: msg.role, content: msg.content });
  }

  messages.push({ role: "user", content: userMessage });

  return messages;
}
