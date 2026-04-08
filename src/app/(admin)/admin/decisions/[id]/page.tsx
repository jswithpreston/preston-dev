import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { DecisionForm } from "@/components/admin/DecisionForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditDecisionPage({ params }: PageProps) {
  const { id } = await params;
  const decision = await prisma.decision.findUnique({ where: { id } });
  if (!decision) notFound();

  return (
    <div>
      <h1 className="mb-6 font-serif text-2xl font-semibold tracking-tight">Edit Decision</h1>
      <DecisionForm mode="edit" initialData={decision} />
    </div>
  );
}
