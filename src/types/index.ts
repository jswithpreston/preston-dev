import type { Project, Decision, Metric, SystemContent } from "@prisma/client";

export type ProjectListItem = Pick<
  Project,
  "id" | "slug" | "title" | "summary" | "stack" | "timeline" | "role" | "problem" | "outcome" | "featured" | "sortOrder"
>;

export type ProjectDetail = Project;

export type DecisionListItem = Pick<
  Decision,
  "id" | "title" | "context" | "decision" | "consequences" | "status" | "tags" | "createdAt"
>;

export type MetricDisplay = Pick<Metric, "id" | "label" | "value" | "suffix">;

export type SystemSection = Pick<
  SystemContent,
  "id" | "key" | "title" | "content"
>;
