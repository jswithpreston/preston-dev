import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProjectCard } from "@/components/work/ProjectCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work",
  description: "Projects and case studies.",
};

export const dynamic = 'force-dynamic';

export default async function WorkPage() {
  const projects = await prisma.project.findMany({
    where: { published: true },
    orderBy: { sortOrder: "asc" },
    select: {
      id: true,
      slug: true,
      title: true,
      summary: true,
      stack: true,
      timeline: true,
      role: true,
      problem: true,
      outcome: true,
      featured: true,
      sortOrder: true,
    },
  });

  // Sort: featured projects first, then by sortOrder
  const sorted = [...projects].sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return a.sortOrder - b.sortOrder;
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
            project={project}
            featured={project.featured}
          />
        ))}
        {sorted.length === 0 && (
          <p className="text-muted-foreground">No projects published yet.</p>
        )}
      </div>
    </>
  );
}
