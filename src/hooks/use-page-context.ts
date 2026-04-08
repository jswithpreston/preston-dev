"use client";

import { usePathname } from "next/navigation";
import type { PageContext } from "@/lib/ai/types";

export function usePageContext(): PageContext {
  const pathname = usePathname();

  const pageMap: Record<string, string> = {
    "/": "Home page",
    "/work": "Work / Projects page",
    "/decisions": "Architecture Decisions page",
    "/system": "System / How this site works page",
    "/contact": "Contact page",
  };

  // Check for project slug
  const projectMatch = pathname.match(/^\/work\/(.+)$/);
  if (projectMatch) {
    return {
      currentPage: `Project case study: ${projectMatch[1]}`,
      projectSlug: projectMatch[1],
    };
  }

  return {
    currentPage: pageMap[pathname] || `Page: ${pathname}`,
  };
}
