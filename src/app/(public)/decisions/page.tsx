import { getPayload } from "payload";
import config from "@/payload.config";
import { PageHeader } from "@/components/layout/PageHeader";
import { DecisionCard } from "@/components/decisions/DecisionCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Decisions",
  description: "Architecture Decision Records documenting the why behind technical choices.",
};

export const dynamic = 'force-dynamic';

export default async function DecisionsPage() {
  const payload = await getPayload({ config });

  const res = await payload.find({
    collection: "decisions",
    where: {
      published: {
        equals: true,
      },
    },
    sort: "-createdAt",
  });

  const decisions = res.docs.map(doc => ({
    id: doc.id,
    title: doc.title,
    context: doc.context,
    decision: doc.decision,
    consequences: doc.consequences,
    status: doc.status as any,
    tags: doc.tags?.map((t: any) => t.tag).filter(Boolean) as string[] || [],
    createdAt: doc.createdAt,
  }));

  return (
    <>
      <PageHeader
        title="Decisions"
        description="Architecture Decision Records. The context, tradeoffs, and reasoning behind technical choices — documented before I forget why."
      />
      <div className="space-y-4 pb-12">
        {decisions.map((decision) => (
          <DecisionCard key={decision.id} decision={decision as any} />
        ))}
        {decisions.length === 0 && (
          <p className="text-muted-foreground">No decisions documented yet.</p>
        )}
      </div>
    </>
  );
}
