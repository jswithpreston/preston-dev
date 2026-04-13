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
  // Show first 150 chars of context for preview
  const contextPreview =
    decision.context.length > 150
      ? decision.context.slice(0, 150) + "..."
      : decision.context;

  return (
    <div className="rounded-lg border border-border/50 p-6 transition-colors hover:border-border">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="font-serif text-lg font-semibold tracking-tight">
            {decision.title}
          </h3>
          {decision.decision && (
            <p className="mt-2 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Decision:</span>{" "}
              {decision.decision.length > 120
                ? decision.decision.slice(0, 120) + "..."
                : decision.decision}
            </p>
          )}
        </div>
        <span
          className={`inline-flex shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[decision.status] || ""}`}
        >
          {decision.status}
        </span>
      </div>
      <p className="mt-3 text-muted-foreground">{contextPreview}</p>
      {decision.consequences && (
        <p className="mt-3 text-sm">
          <span className="font-medium">Impact:</span>{" "}
          {decision.consequences.length > 120
            ? decision.consequences.slice(0, 120) + "..."
            : decision.consequences}
        </p>
      )}
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
