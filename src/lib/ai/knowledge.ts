import { prisma } from "@/lib/prisma";
import type { IntentCategory, KnowledgeContext } from "./types";
import type { KnowledgeBlockType } from "@prisma/client";

const intentToTypes: Record<IntentCategory, KnowledgeBlockType[]> = {
  project_specific: ["PROJECT", "ARCHITECTURE"],
  architecture_decision: ["ARCHITECTURE", "PHILOSOPHY", "STACK"],
  tech_stack: ["STACK", "ARCHITECTURE", "GENERAL"],
  career: ["CAREER", "GENERAL", "PHILOSOPHY"],
  // Search everything when intent is unclear — scoring will pick the best match
  off_topic: ["PROJECT", "CAREER", "STACK", "ARCHITECTURE", "PHILOSOPHY", "GENERAL"],
};

export async function retrieveKnowledge(
  intent: IntentCategory,
  userMessage: string
): Promise<KnowledgeContext[]> {
  const types = intentToTypes[intent];

  const blocks = await prisma.aIKnowledgeBlock.findMany({
    where: { active: true, type: { in: types } },
    select: { title: true, summary: true, content: true, tags: true },
  });

  const lowerMessage = userMessage.toLowerCase();
  const messageWords = lowerMessage.split(/\s+/).filter((w) => w.length > 1);

  const scored = blocks.map((block) => {
    let score = 0;

    for (const tag of block.tags) {
      const lowerTag = tag.toLowerCase();
      if (lowerTag.includes(" ")) {
        // Multi-word tag: check full message contains it
        if (lowerMessage.includes(lowerTag)) score += 3;
      } else {
        // Single-word tag: must be an exact word match, not a substring
        if (messageWords.includes(lowerTag)) score += 2;
      }
    }

    // Boost by title / summary word overlap (words > 3 chars only)
    for (const word of messageWords) {
      if (word.length > 3) {
        if (block.title.toLowerCase().includes(word)) score += 1.5;
        if (block.summary.toLowerCase().includes(word)) score += 0.5;
      }
    }

    return {
      title: block.title,
      summary: block.summary,
      content: block.content,
      relevanceScore: score,
    };
  });

  return scored.sort((a, b) => b.relevanceScore - a.relevanceScore).slice(0, 5);
}
