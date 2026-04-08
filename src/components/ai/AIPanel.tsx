"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useAI } from "./AIProvider";
import { ChatInterface } from "./ChatInterface";

export function AIPanel() {
  const { isOpen, setIsOpen } = useAI();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="flex w-full flex-col p-0 sm:max-w-[440px]">
        <SheetHeader className="border-b border-border px-4 py-3">
          <SheetTitle className="font-serif text-base">AI Assistant</SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-hidden">
          <ChatInterface />
        </div>
      </SheetContent>
    </Sheet>
  );
}
