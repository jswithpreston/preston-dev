"use client";

import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (item: T) => React.ReactNode;
}

interface DataTableProps<T extends { id: string }> {
  data: T[];
  columns: Column<T>[];
  editHref?: (item: T) => string;
  onDelete?: (id: string) => void;
}

export function DataTable<T extends { id: string }>({
  data,
  columns,
  editHref,
  onDelete,
}: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/50">
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className="px-4 py-3 text-left font-medium text-muted-foreground"
              >
                {col.label}
              </th>
            ))}
            {(editHref || onDelete) && (
              <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-b border-border/50 last:border-0">
              {columns.map((col) => (
                <td key={String(col.key)} className="px-4 py-3">
                  {col.render
                    ? col.render(item)
                    : String((item as Record<string, unknown>)[col.key as string] ?? "")}
                </td>
              ))}
              {(editHref || onDelete) && (
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-1">
                    {editHref && (
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={editHref(item)}>
                          <Pencil className="h-4 w-4" />
                        </Link>
                      </Button>
                    )}
                    {onDelete && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(item.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td
                colSpan={columns.length + (editHref || onDelete ? 1 : 0)}
                className="px-4 py-8 text-center text-muted-foreground"
              >
                No items found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
