"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, X } from "lucide-react";

interface KnowledgeBlock {
  id: string;
  type: string;
  title: string;
  summary: string;
  content: string;
  tags: string[];
  active: boolean;
  projectId: string | null;
  project?: { title: string } | null;
}

const TYPES = ["PROJECT", "ARCHITECTURE", "PHILOSOPHY", "CAREER", "STACK", "GENERAL"];

export default function AdminKnowledgePage() {
  const [blocks, setBlocks] = useState<KnowledgeBlock[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<KnowledgeBlock | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    fetch("/api/knowledge")
      .then((r) => r.json())
      .then(setBlocks)
      .finally(() => setLoading(false));
  }, []);

  function openNew() {
    setEditing({
      id: "",
      type: "GENERAL",
      title: "",
      summary: "",
      content: "",
      tags: [],
      active: true,
      projectId: null,
    });
    setIsNew(true);
  }

  function openEdit(block: KnowledgeBlock) {
    setEditing({ ...block });
    setIsNew(false);
  }

  async function save() {
    if (!editing) return;
    const url = isNew ? "/api/knowledge" : `/api/knowledge/${editing.id}`;
    const method = isNew ? "POST" : "PUT";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing),
    });
    const saved = await res.json();

    if (isNew) {
      setBlocks((prev) => [saved, ...prev]);
    } else {
      setBlocks((prev) => prev.map((b) => (b.id === saved.id ? saved : b)));
    }
    setEditing(null);
  }

  async function deleteBlock(id: string) {
    if (!confirm("Delete this knowledge block?")) return;
    await fetch(`/api/knowledge/${id}`, { method: "DELETE" });
    setBlocks((prev) => prev.filter((b) => b.id !== id));
  }

  if (loading) return <p className="text-muted-foreground">Loading...</p>;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-serif text-2xl font-semibold tracking-tight">AI Knowledge</h1>
        <Button onClick={openNew}>
          <Plus className="mr-2 h-4 w-4" />
          New Block
        </Button>
      </div>

      <div className="space-y-3">
        {blocks.map((block) => (
          <div key={block.id} className="flex items-start justify-between gap-4 rounded-lg border border-border p-4">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <Badge variant="outline">{block.type}</Badge>
                <h3 className="font-medium">{block.title}</h3>
                {!block.active && <Badge variant="secondary">Inactive</Badge>}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{block.summary}</p>
              <div className="mt-2 flex flex-wrap gap-1">
                {block.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                ))}
              </div>
            </div>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" onClick={() => openEdit(block)}>
                <Pencil className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => deleteBlock(block.id)}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={!!editing} onOpenChange={() => setEditing(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{isNew ? "New Knowledge Block" : "Edit Knowledge Block"}</DialogTitle>
          </DialogHeader>
          {editing && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Type</label>
                <select
                  value={editing.type}
                  onChange={(e) => setEditing({ ...editing, type: e.target.value })}
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm"
                >
                  {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <Input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Summary</label>
                <Input value={editing.summary} onChange={(e) => setEditing({ ...editing, summary: e.target.value })} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Content</label>
                <Textarea value={editing.content} onChange={(e) => setEditing({ ...editing, content: e.target.value })} rows={5} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Tags</label>
                <div className="flex gap-2">
                  <Input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        const tag = tagInput.trim();
                        if (tag && !editing.tags.includes(tag)) {
                          setEditing({ ...editing, tags: [...editing.tags, tag] });
                        }
                        setTagInput("");
                      }
                    }}
                    placeholder="Add tag..."
                  />
                </div>
                <div className="flex flex-wrap gap-1">
                  {editing.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="gap-1">
                      {tag}
                      <button onClick={() => setEditing({ ...editing, tags: editing.tags.filter((t) => t !== tag) })}>
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={editing.active} onCheckedChange={(v) => setEditing({ ...editing, active: v })} />
                <label className="text-sm font-medium">Active</label>
              </div>
              <div className="flex gap-3">
                <Button onClick={save}>Save</Button>
                <Button variant="ghost" onClick={() => setEditing(null)}>Cancel</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
