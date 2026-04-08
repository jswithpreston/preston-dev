import type { MetricDisplay } from "@/types";

interface MetricsGridProps {
  metrics: MetricDisplay[];
}

export function MetricsGrid({ metrics }: MetricsGridProps) {
  if (metrics.length === 0) return null;

  return (
    <section className="py-12">
      <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
        {metrics.map((metric) => (
          <div key={metric.id} className="space-y-1">
            <p className="font-mono text-2xl font-semibold tracking-tight">
              {metric.value}
              {metric.suffix && (
                <span className="text-muted-foreground">{metric.suffix}</span>
              )}
            </p>
            <p className="text-sm text-muted-foreground">{metric.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
