"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { MarkdownEditor } from "./MarkdownEditor";
import { slugify } from "@/lib/utils";
import { X } from "lucide-react";

interface ProjectFormData {
  id?: string;
  title: string;
  slug: string;
  summary: string;
  stack: string[];
  timeline: string;
  role: string;
  featured: boolean;
  published: boolean;
  sortOrder: number;
  problem: string;
  constraints: string;
  architecture: string;
  dataModel: string;
  keyDecisions: string;
  failures: string;
  improvements: string;
  roadmap: string;
}

interface ProjectFormProps {
  initialData?: Partial<ProjectFormData>;
  mode: "create" | "edit";
}

export function ProjectForm({ initialData, mode }: ProjectFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [tagInput, setTagInput] = useState("");

  const [form, setForm] = useState<ProjectFormData>({
    title: initialData?.title ?? "",
    slug: initialData?.slug ?? "",
    summary: initialData?.summary ?? "",
    stack: initialData?.stack ?? [],
    timeline: initialData?.timeline ?? "",
    role: initialData?.role ?? "",
    featured: initialData?.featured ?? false,
    published: initialData?.published ?? false,
    sortOrder: initialData?.sortOrder ?? 0,
    problem: initialData?.problem ?? "",
    constraints: initialData?.constraints ?? "",
    architecture: initialData?.architecture ?? "",
    dataModel: initialData?.dataModel ?? "",
    keyDecisions: initialData?.keyDecisions ?? "",
    failures: initialData?.failures ?? "",
    improvements: initialData?.improvements ?? "",
    roadmap: initialData?.roadmap ?? "",
  });

  function updateField<K extends keyof ProjectFormData>(key: K, value: ProjectFormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function addTag() {
    const tag = tagInput.trim();
    if (tag && !form.stack.includes(tag)) {
      updateField("stack", [...form.stack, tag]);
    }
    setTagInput("");
  }

  function removeTag(tag: string) {
    updateField("stack", form.stack.filter((t) => t !== tag));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      ...form,
      timeline: form.timeline || null,
      role: form.role || null,
      problem: form.problem || null,
      constraints: form.constraints || null,
      architecture: form.architecture || null,
      dataModel: form.dataModel || null,
      keyDecisions: form.keyDecisions || null,
      failures: form.failures || null,
      improvements: form.improvements || null,
      roadmap: form.roadmap || null,
    };

    try {
      const url = mode === "create" ? "/api/projects" : `/api/projects/${initialData?.id}`;
      const method = mode === "create" ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to save");
      router.push("/admin/projects");
      router.refresh();
    } catch {
      setError("Failed to save project");
      setSaving(false);
    }
  }

  const sections = [
    { key: "problem" as const, label: "Problem" },
    { key: "constraints" as const, label: "Constraints" },
    { key: "architecture" as const, label: "Architecture" },
    { key: "dataModel" as const, label: "Data Model" },
    { key: "keyDecisions" as const, label: "Key Decisions" },
    { key: "failures" as const, label: "Failures & Lessons" },
    { key: "improvements" as const, label: "Improvements" },
    { key: "roadmap" as const, label: "Roadmap" },
  ];

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Title</label>
          <Input
            value={form.title}
            onChange={(e) => {
              updateField("title", e.target.value);
              if (mode === "create") updateField("slug", slugify(e.target.value));
            }}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Slug</label>
          <Input
            value={form.slug}
            onChange={(e) => updateField("slug", e.target.value)}
            required
            className="font-mono"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Summary</label>
          <Input
            value={form.summary}
            onChange={(e) => updateField("summary", e.target.value)}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Timeline</label>
            <Input
              value={form.timeline}
              onChange={(e) => updateField("timeline", e.target.value)}
              placeholder="2024 - Present"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Role</label>
            <Input
              value={form.role}
              onChange={(e) => updateField("role", e.target.value)}
              placeholder="Full Stack Engineer"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Stack</label>
          <div className="flex gap-2">
            <Input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addTag();
                }
              }}
              placeholder="Add technology..."
            />
            <Button type="button" variant="secondary" onClick={addTag}>
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {form.stack.map((tag) => (
              <Badge key={tag} variant="secondary" className="gap-1">
                {tag}
                <button type="button" onClick={() => removeTag(tag)}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Switch
              checked={form.published}
              onCheckedChange={(v) => updateField("published", v)}
            />
            <label className="text-sm font-medium">Published</label>
          </div>
          <div className="flex items-center gap-2">
            <Switch
              checked={form.featured}
              onCheckedChange={(v) => updateField("featured", v)}
            />
            <label className="text-sm font-medium">Featured</label>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Sort Order</label>
            <Input
              type="number"
              value={form.sortOrder}
              onChange={(e) => updateField("sortOrder", parseInt(e.target.value) || 0)}
              className="w-20"
            />
          </div>
        </div>
      </div>

      <div className="space-y-6 border-t border-border pt-6">
        <h3 className="font-serif text-lg font-semibold">Case Study Sections</h3>
        {sections.map(({ key, label }) => (
          <div key={key} className="space-y-2">
            <label className="text-sm font-medium">{label}</label>
            <MarkdownEditor
              value={form[key]}
              onChange={(v) => updateField(key, v)}
              placeholder={`${label} section (markdown supported)...`}
              rows={5}
            />
          </div>
        ))}
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}
      <div className="flex gap-3">
        <Button type="submit" disabled={saving}>
          {saving ? "Saving..." : mode === "create" ? "Create Project" : "Update Project"}
        </Button>
        <Button type="button" variant="ghost" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
