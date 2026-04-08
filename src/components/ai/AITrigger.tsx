"use client";

import { MessageCircle } from "lucide-react";
import { useAI } from "./AIProvider";
import { Button } from "@/components/ui/button";

export function AITrigger() {
  const { setIsOpen } = useAI();

  return (
    <Button
      onClick={() => setIsOpen(true)}
      size="icon"
      className="fixed bottom-6 right-6 z-40 h-12 w-12 rounded-full shadow-lg"
      aria-label="Open AI assistant"
    >
      <MessageCircle className="h-5 w-5" />
    </Button>
  );
}
