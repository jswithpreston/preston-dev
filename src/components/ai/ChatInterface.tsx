"use client";

import { useEffect, useRef } from "react";
import { Trash2 } from "lucide-react";
import { useAIChat } from "@/hooks/use-ai-chat";
import { usePageContext } from "@/hooks/use-page-context";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { Button } from "@/components/ui/button";

const SUGGESTIONS = [
  "Who is Preston?",
  "Tell me about PFIS",
  "What is Axiom?",
  "Tell me about ResultFlow",
  "What's your tech stack?",
  "Are you available for hire?",
];

export function ChatInterface() {
  const pageContext = usePageContext();
  const { messages, sendMessage, isStreaming, clearMessages } = useAIChat(pageContext);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="flex h-full flex-col">
      {/* Messages area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col justify-center gap-6 px-2 py-6">
            {/* Welcome message */}
            <div className="rounded-2xl rounded-tl-sm bg-muted px-4 py-4">
              <p className="text-sm font-medium leading-snug">
                Hey — I&apos;m Preston&apos;s assistant.
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                I can tell you about his projects, tech stack, engineering approach,
                and how to get in touch. What would you like to know?
              </p>
            </div>

            {/* Suggestion bubbles */}
            <div className="flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  disabled={isStreaming}
                  aria-label={`Ask: ${s}`}
                  className="rounded-full border border-border bg-background px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-foreground/40 hover:bg-muted hover:text-foreground disabled:opacity-50"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}
          </div>
        )}
      </div>

      {/* Input + clear */}
      <div className="border-t border-border">
        {messages.length > 0 && (
          <div className="flex justify-end px-4 pt-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={clearMessages}
              disabled={isStreaming}
              className="h-7 gap-1.5 text-xs text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="h-3 w-3" />
              Clear chat
            </Button>
          </div>
        )}
        <ChatInput onSend={sendMessage} disabled={isStreaming} />
      </div>
    </div>
  );
}
