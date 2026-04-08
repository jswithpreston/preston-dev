"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface DecisionFormData {
  id?: string;
  title: string;
  context: string;
  decision: string;
  consequences: string;
  status: string;
  tags: string[];
  published: boolean;
}

interface DecisionFormProps {
  initialData?: Partial<DecisionFormData>;
  mode: "create" | "edit";
}

export function DecisionForm({ initialData, mode }: DecisionFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [tagInput, setTagInput] = useState("");

  const [form, setForm] = useState<DecisionFormData>({
    title: initialData?.title ?? "",
    context: initialData?.context ?? "",
    decision: initialData?.decision ?? "",
    consequences: initialData?.consequences ?? "",
    status: initialData?.status ?? "PROPOSED",
    tags: initialData?.tags ?? [],
    published: initialData?.published ?? false,
  });

  function updateField<K extends keyof DecisionFormData>(key: K, value: DecisionFormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function addTag() {
    const tag = tagInput.trim();
    if (tag && !form.tags.includes(tag)) {
      updateField("tags", [...form.tags, tag]);
    }
    setTagInput("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const url = mode === "create" ? "/api/decisions" : `/api/decisions/${initialData?.id}`;
      const method = mode === "create" ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to save");
      router.push("/admin/decisions");
      router.refresh();
    } catch {
      setError("Failed to save decision");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Title</label>
        <Input value={form.title} onChange={(e) => updateField("title", e.target.value)} required />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Context</label>
        <Textarea value={form.context} onChange={(e) => updateField("context", e.target.value)} required rows={4} />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Decision</label>
        <Textarea value={form.decision} onChange={(e) => updateField("decision", e.target.value)} required rows={4} />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Consequences</label>
        <Textarea value={form.consequences} onChange={(e) => updateField("consequences", e.target.value)} required rows={4} />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Status</label>
        <select
          value={form.status}
          onChange={(e) => updateField("status", e.target.value)}
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm"
        >
          <option value="PROPOSED">Proposed</option>
          <option value="ACCEPTED">Accepted</option>
          <option value="DEPRECATED">Deprecated</option>
          <option value="SUPERSEDED">Superseded</option>
        </select>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Tags</label>
        <div className="flex gap-2">
          <Input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }}
            placeholder="Add tag..."
          />
          <Button type="button" variant="secondary" onClick={addTag}>Add</Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {form.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="gap-1">
              {tag}
              <button type="button" onClick={() => updateField("tags", form.tags.filter((t) => t !== tag))}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Switch checked={form.published} onCheckedChange={(v) => updateField("published", v)} />
        <label className="text-sm font-medium">Published</label>
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
      <div className="flex gap-3">
        <Button type="submit" disabled={saving}>
          {saving ? "Saving..." : mode === "create" ? "Create Decision" : "Update Decision"}
        </Button>
        <Button type="button" variant="ghost" onClick={() => router.back()}>Cancel</Button>
      </div>
    </form>
  );
}
