import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProjectForm } from "@/components/admin/ProjectForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProjectPage({ params }: PageProps) {
  const { id } = await params;
  const project = await prisma.project.findUnique({ where: { id } });

  if (!project) notFound();

  return (
    <div>
      <h1 className="mb-6 font-serif text-2xl font-semibold tracking-tight">
        Edit Project
      </h1>
      <ProjectForm
        mode="edit"
        initialData={{
          ...project,
          timeline: project.timeline ?? "",
          role: project.role ?? "",
          problem: project.problem ?? "",
          constraints: project.constraints ?? "",
          architecture: project.architecture ?? "",
          dataModel: project.dataModel ?? "",
          keyDecisions: project.keyDecisions ?? "",
          failures: project.failures ?? "",
          improvements: project.improvements ?? "",
          roadmap: project.roadmap ?? "",
        }}
      />
    </div>
  );
}
