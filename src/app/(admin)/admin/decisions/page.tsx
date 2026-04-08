"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/admin/DataTable";
import { Plus } from "lucide-react";

interface Decision {
  id: string;
  title: string;
  status: string;
  published: boolean;
  tags: string[];
}

export default function AdminDecisionsPage() {
  const [decisions, setDecisions] = useState<Decision[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/decisions?all=true")
      .then((r) => r.json())
      .then(setDecisions)
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Delete this decision?")) return;
    await fetch(`/api/decisions/${id}`, { method: "DELETE" });
    setDecisions((prev) => prev.filter((d) => d.id !== id));
  }

  if (loading) return <p className="text-muted-foreground">Loading...</p>;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-serif text-2xl font-semibold tracking-tight">Decisions</h1>
        <Button asChild>
          <Link href="/admin/decisions/new">
            <Plus className="mr-2 h-4 w-4" />
            New Decision
          </Link>
        </Button>
      </div>
      <DataTable
        data={decisions}
        columns={[
          { key: "title", label: "Title" },
          {
            key: "status",
            label: "Status",
            render: (d) => <Badge variant="outline">{d.status}</Badge>,
          },
          {
            key: "published",
            label: "Published",
            render: (d) => d.published ? <Badge>Published</Badge> : <Badge variant="secondary">Draft</Badge>,
          },
        ]}
        editHref={(d) => `/admin/decisions/${d.id}`}
        onDelete={handleDelete}
      />
    </div>
  );
}
