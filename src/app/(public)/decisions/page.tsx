import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/layout/PageHeader";
import { DecisionCard } from "@/components/decisions/DecisionCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Decisions",
  description: "Architecture Decision Records documenting the why behind technical choices.",
};

export const dynamic = 'force-dynamic';

export default async function DecisionsPage() {
  const decisions = await prisma.decision.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      context: true,
      decision: true,
      consequences: true,
      status: true,
      tags: true,
      createdAt: true,
    },
  });

  return (
    <>
      <PageHeader
        title="Decisions"
        description="Architecture Decision Records. The context, tradeoffs, and reasoning behind technical choices — documented before I forget why."
      />
      <div className="space-y-4 pb-12">
        {decisions.map((decision) => (
          <DecisionCard key={decision.id} decision={decision} />
        ))}
        {decisions.length === 0 && (
          <p className="text-muted-foreground">No decisions documented yet.</p>
        )}
      </div>
    </>
  );
}
