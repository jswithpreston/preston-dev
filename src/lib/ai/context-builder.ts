import { prisma } from "@/lib/prisma";
import type { PageContext } from "./types";

export async function buildPageContext(context: PageContext): Promise<string> {
  const parts: string[] = [];

  parts.push(`The user is currently viewing: ${context.currentPage}`);

  if (context.projectSlug) {
    const project = await prisma.project.findUnique({
      where: { slug: context.projectSlug, published: true },
      select: {
        title: true,
        summary: true,
        stack: true,
        timeline: true,
        role: true,
        problem: true,
        architecture: true,
        keyDecisions: true,
      },
    });

    if (project) {
      parts.push(`\nThey are viewing the project: "${project.title}"`);
      parts.push(`Summary: ${project.summary}`);
      parts.push(`Stack: ${project.stack.join(", ")}`);
      if (project.timeline) parts.push(`Timeline: ${project.timeline}`);
      if (project.role) parts.push(`Role: ${project.role}`);
      if (project.problem) parts.push(`Problem: ${project.problem}`);
      if (project.architecture) parts.push(`Architecture: ${project.architecture}`);
      if (project.keyDecisions) parts.push(`Key Decisions: ${project.keyDecisions}`);
    }
  }

  return parts.join("\n");
}
