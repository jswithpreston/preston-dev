import { DecisionForm } from "@/components/admin/DecisionForm";

export default function NewDecisionPage() {
  return (
    <div>
      <h1 className="mb-6 font-serif text-2xl font-semibold tracking-tight">New Decision</h1>
      <DecisionForm mode="create" />
    </div>
  );
}
