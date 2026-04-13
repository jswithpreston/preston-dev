"use client";

import Markdown from "react-markdown";

interface SystemSectionProps {
  title: string;
  content: string;
}

export function SystemSection({ title, content }: SystemSectionProps) {
  return (
    <div className="space-y-4">
      <h2 className="font-serif text-xl font-semibold tracking-tight">
        {title}
      </h2>
      <div className="prose prose-stone dark:prose-invert max-w-[68ch] prose-headings:font-serif prose-headings:tracking-tight">
        <Markdown>{content}</Markdown>
      </div>
    </div>
  );
}
