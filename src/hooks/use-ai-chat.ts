"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import type { PageContext } from "@/lib/ai/types";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const STORAGE_KEY = "ai-chat-messages";
const SESSION_KEY = "ai-session-key";
const MAX_STORED = 60;

function loadMessages(): ChatMessage[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveMessages(messages: ChatMessage[]) {
  try {
    // Keep only the last MAX_STORED messages to avoid bloating storage
    const trimmed = messages.slice(-MAX_STORED);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
  } catch {
    // Storage quota exceeded — fail silently
  }
}

function getOrCreateSessionKey(): string {
  const stored = sessionStorage.getItem(SESSION_KEY);
  if (stored) return stored;
  const key = `session_${Date.now()}_${Math.random().toString(36).slice(2)}`;
  sessionStorage.setItem(SESSION_KEY, key);
  return key;
}

export function useAIChat(pageContext: PageContext) {
  const [messages, setMessages] = useState<ChatMessage[]>(loadMessages);
  const [isStreaming, setIsStreaming] = useState(false);
  const sessionKeyRef = useRef<string>("");

  useEffect(() => {
    sessionKeyRef.current = getOrCreateSessionKey();
  }, []);

  // Persist messages to localStorage whenever they change
  useEffect(() => {
    saveMessages(messages);
  }, [messages]);

  const clearMessages = useCallback(() => {
    setMessages([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || isStreaming) return;

      const userMessage: ChatMessage = {
        id: `user_${Date.now()}`,
        role: "user",
        content: content.trim(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsStreaming(true);

      const assistantId = `assistant_${Date.now()}`;
      setMessages((prev) => [
        ...prev,
        { id: assistantId, role: "assistant", content: "" },
      ]);

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: content.trim(),
            sessionKey: sessionKeyRef.current,
            pageContext,
          }),
        });

        if (!response.ok) throw new Error("Chat request failed");

        const reader = response.body?.getReader();
        if (!reader) throw new Error("No response body");

        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6);
              if (data === "[DONE]") break;
              try {
                const parsed = JSON.parse(data);
                if (parsed.content) {
                  setMessages((prev) =>
                    prev.map((m) =>
                      m.id === assistantId
                        ? { ...m, content: m.content + parsed.content }
                        : m
                    )
                  );
                }
              } catch {
                // Skip malformed chunks
              }
            }
          }
        }
      } catch {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? { ...m, content: "Sorry, something went wrong. Please try again." }
              : m
          )
        );
      } finally {
        setIsStreaming(false);
      }
    },
    [isStreaming, pageContext]
  );

  return { messages, sendMessage, isStreaming, clearMessages };
}
