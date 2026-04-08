export interface PageContext {
  currentPage: string;
  projectSlug?: string;
}

export type IntentCategory =
  | "project_specific"
  | "architecture_decision"
  | "tech_stack"
  | "career"
  | "off_topic";

export interface ClassifiedIntent {
  category: IntentCategory;
  confidence: number;
}

export interface KnowledgeContext {
  title: string;
  summary: string;
  content: string;
  relevanceScore: number;
}

export interface ChatRequest {
  message: string;
  sessionKey: string;
  pageContext: PageContext;
}

export interface AssembledPrompt {
  systemMessage: string;
  contextBlock: string;
  knowledgeBlocks: string[];
  conversationHistory: Array<{ role: "user" | "assistant"; content: string }>;
  userMessage: string;
}
