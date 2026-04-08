"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Plus, Save, Trash2 } from "lucide-react";

interface Metric {
  id: string;
  label: string;
  value: string;
  suffix: string | null;
  sortOrder: number;
  visible: boolean;
}

export default function AdminMetricsPage() {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/metrics?all=true")
      .then((r) => r.json())
      .then(setMetrics)
      .finally(() => setLoading(false));
  }, []);

  function updateMetric(id: string, field: keyof Metric, value: string | number | boolean) {
    setMetrics((prev) =>
      prev.map((m) => (m.id === id ? { ...m, [field]: value } : m))
    );
  }

  async function saveMetric(metric: Metric) {
    setSaving(metric.id);
    await fetch(`/api/metrics/${metric.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        label: metric.label,
        value: metric.value,
        suffix: metric.suffix,
        sortOrder: metric.sortOrder,
        visible: metric.visible,
      }),
    });
    setSaving(null);
  }

  async function addMetric() {
    const res = await fetch("/api/metrics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ label: "New Metric", value: "0", sortOrder: metrics.length }),
    });
    const newMetric = await res.json();
    setMetrics((prev) => [...prev, newMetric]);
  }

  async function deleteMetric(id: string) {
    if (!confirm("Delete this metric?")) return;
    await fetch(`/api/metrics/${id}`, { method: "DELETE" });
    setMetrics((prev) => prev.filter((m) => m.id !== id));
  }

  if (loading) return <p className="text-muted-foreground">Loading...</p>;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-serif text-2xl font-semibold tracking-tight">Metrics</h1>
        <Button onClick={addMetric}>
          <Plus className="mr-2 h-4 w-4" />
          Add Metric
        </Button>
      </div>
      <div className="space-y-3">
        {metrics.map((metric) => (
          <div key={metric.id} className="flex items-center gap-3 rounded-lg border border-border p-4">
            <Input
              value={metric.label}
              onChange={(e) => updateMetric(metric.id, "label", e.target.value)}
              className="flex-1"
              placeholder="Label"
            />
            <Input
              value={metric.value}
              onChange={(e) => updateMetric(metric.id, "value", e.target.value)}
              className="w-24"
              placeholder="Value"
            />
            <Input
              value={metric.suffix ?? ""}
              onChange={(e) => updateMetric(metric.id, "suffix", e.target.value)}
              className="w-16"
              placeholder="Suffix"
            />
            <Input
              type="number"
              value={metric.sortOrder}
              onChange={(e) => updateMetric(metric.id, "sortOrder", parseInt(e.target.value) || 0)}
              className="w-16"
            />
            <div className="flex items-center gap-1">
              <Switch
                checked={metric.visible}
                onCheckedChange={(v) => updateMetric(metric.id, "visible", v)}
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => saveMetric(metric)}
              disabled={saving === metric.id}
            >
              <Save className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => deleteMetric(metric.id)}>
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
