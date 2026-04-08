import Markdown from "react-markdown";
import { cn } from "@/lib/utils";
import type { ChatMessage as ChatMessageType } from "@/hooks/use-ai-chat";

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div className={cn("flex flex-col gap-1", isUser ? "items-end" : "items-start")}>
      <span className="px-1 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
        {isUser ? "You" : "Assistant"}
      </span>
      <div
        className={cn(
          "max-w-[88%] rounded-2xl px-4 py-3 text-sm",
          isUser
            ? "rounded-tr-sm bg-primary text-primary-foreground"
            : "rounded-tl-sm bg-muted text-foreground"
        )}
      >
        {isUser ? (
          <p className="leading-relaxed">{message.content}</p>
        ) : message.content ? (
          <div className={cn(
            "prose prose-sm max-w-none dark:prose-invert",
            "prose-p:my-1.5 prose-p:leading-relaxed",
            "prose-headings:mb-1 prose-headings:mt-3 prose-headings:font-semibold prose-headings:first:mt-0",
            "prose-ul:my-1.5 prose-ul:space-y-0.5 prose-ul:pl-4",
            "prose-ol:my-1.5 prose-ol:space-y-0.5 prose-ol:pl-4",
            "prose-li:my-0",
            "prose-strong:font-semibold",
            "prose-code:rounded prose-code:bg-background/60 prose-code:px-1 prose-code:py-0.5 prose-code:text-xs",
            "prose-stone dark:prose-invert"
          )}>
            <Markdown>{message.content}</Markdown>
          </div>
        ) : (
          // Typing indicator while streaming
          <div className="flex items-center gap-1 py-0.5">
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-foreground/40 [animation-delay:0ms]" />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-foreground/40 [animation-delay:150ms]" />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-foreground/40 [animation-delay:300ms]" />
          </div>
        )}
      </div>
    </div>
  );
}
