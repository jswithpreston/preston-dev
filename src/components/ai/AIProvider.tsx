"use client";

import { createContext, useContext, useState } from "react";

interface AIContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const AIContext = createContext<AIContextType>({
  isOpen: false,
  setIsOpen: () => {},
});

export function useAI() {
  return useContext(AIContext);
}

export function AIProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AIContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </AIContext.Provider>
  );
}
