import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { ProjectListItem } from "@/types";

interface FeaturedProjectProps {
  project: ProjectListItem;
}

export function FeaturedProject({ project }: FeaturedProjectProps) {
  return (
    <section className="py-12">
      <p className="mb-4 text-sm font-medium uppercase tracking-wider text-muted-foreground">
        Featured Project
      </p>
      <Link
        href={`/work/${project.slug}`}
        className="group block rounded-lg border border-border/50 p-6 transition-colors hover:border-border"
      >
        <h3 className="font-serif text-xl font-semibold tracking-tight group-hover:underline">
          {project.title}
        </h3>
        <p className="mt-2 max-w-[60ch] text-muted-foreground">
          {project.summary}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <Badge key={tech} variant="secondary" className="font-mono text-xs">
              {tech}
            </Badge>
          ))}
        </div>
        <p className="mt-4 inline-flex items-center gap-1 text-sm font-medium">
          Read case study
          <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
        </p>
      </Link>
    </section>
  );
}
