import { getPayload } from "payload";
import config from "@/payload.config";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProjectCard } from "@/components/work/ProjectCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work",
  description: "Projects and case studies.",
};

export const dynamic = 'force-dynamic';

export default async function WorkPage() {
  const payload = await getPayload({ config });

  const projectsRes = await payload.find({
    collection: "projects",
    where: {
      published: {
        equals: true,
      },
    },
    sort: "sortOrder",
  });

  const projects = projectsRes.docs.map(doc => ({
    id: doc.id,
    slug: doc.slug,
    title: doc.title,
    summary: doc.summary,
    stack: doc.stack?.map((s: any) => s.item).filter(Boolean) as string[] || [],
    timeline: doc.timeline,
    role: doc.role,
    problem: doc.problem,
    outcome: doc.outcome,
    featured: doc.featured,
    sortOrder: doc.sortOrder,
  }));

  // Sort: featured projects first, then by sortOrder
  const sorted = [...projects].sort((a, b) => {
    if (a.featured !== b.featured) return (a.featured ? -1 : 1);
    return (a.sortOrder || 0) - (b.sortOrder || 0);
  });

  return (
    <>
      <PageHeader
        title="Work"
        description="Selected systems I've designed and built to solve real-world problems. Each project focuses on structure, scalability, and execution under constraints."
      />
      <div className="space-y-4 pb-12">
        {sorted.map((project) => (
          <ProjectCard
            key={project.id}
            project={project as any}
            featured={!!project.featured}
          />
        ))}
        {sorted.length === 0 && (
          <p className="text-muted-foreground">No projects published yet.</p>
        )}
      </div>
    </>
  );
}
