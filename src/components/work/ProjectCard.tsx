import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { ProjectListItem } from "@/types";

interface ProjectCardProps {
  project: ProjectListItem;
  featured?: boolean;
}

export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className={`group block rounded-lg border border-border/50 p-6 transition-colors hover:border-border ${featured ? "md:p-8 md:ring-1 md:ring-primary/10" : ""}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            {featured && (
              <span className="rounded bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                Featured
              </span>
            )}
            <h3 className="font-serif text-lg font-semibold tracking-tight group-hover:underline">
              {project.title}
            </h3>
          </div>
          {project.timeline && (
            <p className="mt-1 font-mono text-xs text-muted-foreground">
              {project.timeline}
            </p>
          )}
          {project.role && (
            <p className="mt-1 text-xs text-muted-foreground">
              Role: {project.role}
            </p>
          )}
        </div>
        <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
      </div>
      <p className="mt-3 text-muted-foreground">{project.summary}</p>
      {project.problem && (
        <div className="mt-4 rounded-md bg-muted/50 p-3">
          <p className="text-sm">
            <span className="font-medium">Problem:</span>{" "}
            {project.problem}
          </p>
          {project.outcome && (
            <p className="mt-2 text-sm">
              <span className="font-medium">Outcome:</span> {project.outcome}
            </p>
          )}
        </div>
      )}
      <div className="mt-4 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <Badge key={tech} variant="secondary" className="font-mono text-xs">
            {tech}
          </Badge>
        ))}
      </div>
      <p className="mt-4 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
        View Case Study <span className="ml-1">→</span>
      </p>
    </Link>
  );
}
