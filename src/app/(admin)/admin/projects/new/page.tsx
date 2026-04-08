import { ProjectForm } from "@/components/admin/ProjectForm";

export default function NewProjectPage() {
  return (
    <div>
      <h1 className="mb-6 font-serif text-2xl font-semibold tracking-tight">
        New Project
      </h1>
      <ProjectForm mode="create" />
    </div>
  );
}
