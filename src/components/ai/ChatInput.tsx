"use client";

import { useState, useRef } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function handleSubmit() {
    if (!value.trim() || disabled) return;
    onSend(value);
    setValue("");
    textareaRef.current?.focus();
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }

  return (
    <div className="flex gap-2 border-t border-border p-4">
      <Textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask about my work..."
        disabled={disabled}
        rows={1}
        className="min-h-[40px] max-h-[120px] resize-none"
      />
      <Button
        size="icon"
        onClick={handleSubmit}
        disabled={disabled || !value.trim()}
      >
        <Send className="h-4 w-4" />
      </Button>
    </div>
  );
}
