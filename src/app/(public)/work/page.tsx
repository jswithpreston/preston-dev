import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProjectCard } from "@/components/work/ProjectCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work",
  description: "Projects and case studies.",
};

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
    },
  });

  return (
    <>
      <PageHeader
        title="Work"
        description="Projects I've built. Each one taught me something worth documenting."
      />
      <div className="space-y-4 pb-12">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
        {projects.length === 0 && (
          <p className="text-muted-foreground">No projects published yet.</p>
        )}
      </div>
    </>
  );
}
