import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import type { DecisionListItem } from "@/types";

const statusColors: Record<string, string> = {
  PROPOSED: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200",
  ACCEPTED: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200",
  DEPRECATED: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200",
  SUPERSEDED: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-200",
};

interface DecisionCardProps {
  decision: DecisionListItem;
}

export function DecisionCard({ decision }: DecisionCardProps) {
  return (
    <div className="rounded-lg border border-border/50 p-6">
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-serif text-lg font-semibold tracking-tight">
          {decision.title}
        </h3>
        <span
          className={`inline-flex shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[decision.status] || ""}`}
        >
          {decision.status}
        </span>
      </div>
      <p className="mt-3 text-muted-foreground">{decision.context}</p>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {decision.tags.map((tag) => (
          <Badge key={tag} variant="outline" className="font-mono text-xs">
            {tag}
          </Badge>
        ))}
        <span className="ml-auto text-xs text-muted-foreground">
          {formatDate(decision.createdAt)}
        </span>
      </div>
    </div>
  );
}
