import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/layout/PageHeader";
import { Separator } from "@/components/ui/separator";
import Markdown from "react-markdown";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "System",
  description: "How this site works — stack, philosophy, infrastructure, and AI architecture.",
};

export const dynamic = 'force-dynamic';

export default async function SystemPage() {
  const sections = await prisma.systemContent.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return (
    <>
      <PageHeader
        title="System"
        description="How this site works. The stack, the philosophy, the infrastructure."
      />
      <div className="space-y-8 pb-12">
        {sections.map((section, idx) => (
          <div key={section.id}>
            {idx > 0 && <Separator className="mb-8" />}
            <h2 className="mb-4 font-serif text-xl font-semibold tracking-tight">
              {section.title}
            </h2>
            <div className="prose prose-stone dark:prose-invert max-w-[68ch] prose-headings:font-serif prose-headings:tracking-tight">
              <Markdown>{section.content}</Markdown>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
