import { classifyIntent } from "./service";
import { retrieveKnowledge } from "./knowledge";
import type { IntentCategory, KnowledgeContext } from "./types";

export async function routeIntent(
  message: string
): Promise<{ intent: IntentCategory; knowledge: KnowledgeContext[] }> {
  const intent = classifyIntent(message);
  const knowledge = await retrieveKnowledge(intent, message);

  return { intent, knowledge };
}
