"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Markdown from "react-markdown";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}

export function MarkdownEditor({
  value,
  onChange,
  placeholder,
  rows = 8,
}: MarkdownEditorProps) {
  const [preview, setPreview] = useState(false);

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Button
          type="button"
          variant={preview ? "ghost" : "secondary"}
          size="sm"
          onClick={() => setPreview(false)}
        >
          Write
        </Button>
        <Button
          type="button"
          variant={preview ? "secondary" : "ghost"}
          size="sm"
          onClick={() => setPreview(true)}
        >
          Preview
        </Button>
      </div>
      {preview ? (
        <div className="min-h-[200px] rounded-md border border-border p-4 prose prose-stone dark:prose-invert prose-sm max-w-none">
          {value ? <Markdown>{value}</Markdown> : <p className="text-muted-foreground">Nothing to preview</p>}
        </div>
      ) : (
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
        />
      )}
    </div>
  );
}
