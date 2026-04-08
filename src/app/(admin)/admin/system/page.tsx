"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MarkdownEditor } from "@/components/admin/MarkdownEditor";
import { Save } from "lucide-react";

interface SystemSection {
  id: string;
  key: string;
  title: string;
  content: string;
  sortOrder: number;
}

export default function AdminSystemPage() {
  const [sections, setSections] = useState<SystemSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/system")
      .then((r) => r.json())
      .then(setSections)
      .finally(() => setLoading(false));
  }, []);

  function updateSection(id: string, field: keyof SystemSection, value: string) {
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  }

  async function saveSection(section: SystemSection) {
    setSaving(section.id);
    await fetch("/api/system", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: section.id,
        title: section.title,
        content: section.content,
      }),
    });
    setSaving(null);
  }

  if (loading) return <p className="text-muted-foreground">Loading...</p>;

  return (
    <div>
      <h1 className="mb-6 font-serif text-2xl font-semibold tracking-tight">System Content</h1>
      <div className="space-y-8">
        {sections.map((section) => (
          <div key={section.id} className="space-y-4 rounded-lg border border-border p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <code className="text-xs text-muted-foreground">{section.key}</code>
                <Input
                  value={section.title}
                  onChange={(e) => updateSection(section.id, "title", e.target.value)}
                  className="text-lg font-semibold"
                />
              </div>
              <Button onClick={() => saveSection(section)} disabled={saving === section.id}>
                <Save className="mr-2 h-4 w-4" />
                {saving === section.id ? "Saving..." : "Save"}
              </Button>
            </div>
            <MarkdownEditor
              value={section.content}
              onChange={(v) => updateSection(section.id, "content", v)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
