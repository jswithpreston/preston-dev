import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { ProjectListItem } from "@/types";

interface ProjectCardProps {
  project: ProjectListItem;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group block rounded-lg border border-border/50 p-6 transition-colors hover:border-border"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="font-serif text-lg font-semibold tracking-tight group-hover:underline">
            {project.title}
          </h3>
          {project.timeline && (
            <p className="mt-1 font-mono text-xs text-muted-foreground">
              {project.timeline}
            </p>
          )}
        </div>
        <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
      </div>
      <p className="mt-3 text-muted-foreground">{project.summary}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <Badge key={tech} variant="secondary" className="font-mono text-xs">
            {tech}
          </Badge>
        ))}
      </div>
    </Link>
  );
}
