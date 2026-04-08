import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000),
});

export const projectSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  slug: z.string().min(1).max(200),
  summary: z.string().min(1, "Summary is required").max(500),
  stack: z.array(z.string()).default([]),
  timeline: z.string().nullable().optional(),
  role: z.string().nullable().optional(),
  featured: z.boolean().default(false),
  published: z.boolean().default(false),
  sortOrder: z.number().int().default(0),
  problem: z.string().nullable().optional(),
  constraints: z.string().nullable().optional(),
  architecture: z.string().nullable().optional(),
  dataModel: z.string().nullable().optional(),
  keyDecisions: z.string().nullable().optional(),
  failures: z.string().nullable().optional(),
  improvements: z.string().nullable().optional(),
  roadmap: z.string().nullable().optional(),
});

export const decisionSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  context: z.string().min(1, "Context is required"),
  decision: z.string().min(1, "Decision is required"),
  consequences: z.string().min(1, "Consequences are required"),
  status: z.enum(["PROPOSED", "ACCEPTED", "DEPRECATED", "SUPERSEDED"]).default("PROPOSED"),
  tags: z.array(z.string()).default([]),
  published: z.boolean().default(false),
});

export const metricSchema = z.object({
  label: z.string().min(1, "Label is required").max(100),
  value: z.string().min(1, "Value is required").max(50),
  suffix: z.string().nullable().optional(),
  sortOrder: z.number().int().default(0),
  visible: z.boolean().default(true),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ProjectInput = z.infer<typeof projectSchema>;
export type DecisionInput = z.infer<typeof decisionSchema>;
export type MetricInput = z.infer<typeof metricSchema>;
