"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/admin/DataTable";
import { Plus } from "lucide-react";

interface Project {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  featured: boolean;
  sortOrder: number;
}

export default function AdminProjectsPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/projects?all=true")
      .then((r) => r.json())
      .then(setProjects)
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Delete this project?")) return;
    await fetch(`/api/projects/${id}`, { method: "DELETE" });
    setProjects((prev) => prev.filter((p) => p.id !== id));
  }

  if (loading) return <p className="text-muted-foreground">Loading...</p>;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-serif text-2xl font-semibold tracking-tight">
          Projects
        </h1>
        <Button asChild>
          <Link href="/admin/projects/new">
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Link>
        </Button>
      </div>
      <DataTable
        data={projects}
        columns={[
          { key: "title", label: "Title" },
          { key: "slug", label: "Slug", render: (p) => <code className="text-xs">{p.slug}</code> },
          {
            key: "published",
            label: "Status",
            render: (p) => (
              <div className="flex gap-2">
                {p.published ? (
                  <Badge variant="default">Published</Badge>
                ) : (
                  <Badge variant="secondary">Draft</Badge>
                )}
                {p.featured && <Badge variant="outline">Featured</Badge>}
              </div>
            ),
          },
        ]}
        editHref={(p) => `/admin/projects/${p.id}`}
        onDelete={handleDelete}
      />
    </div>
  );
}
