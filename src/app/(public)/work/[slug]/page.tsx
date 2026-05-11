import { notFound } from "next/navigation";
import { getPayload } from "payload";
import config from "@/payload.config";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CaseStudySection } from "@/components/work/CaseStudySection";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const payload = await getPayload({ config });
  const res = await payload.find({
    collection: "projects",
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  const project = res.docs[0];

  if (!project) return { title: "Not Found" };

  return {
    title: project.title,
    description: project.summary,
  };
}

export const dynamic = 'force-dynamic';

const sections = [
  { key: "problem" as const, title: "Problem" },
  { key: "constraints" as const, title: "Constraints" },
  { key: "architecture" as const, title: "Architecture" },
  { key: "dataModel" as const, title: "Data Model" },
  { key: "keyDecisions" as const, title: "Key Decisions" },
  { key: "failures" as const, title: "Failures & Lessons" },
  { key: "improvements" as const, title: "Improvements" },
  { key: "roadmap" as const, title: "Roadmap" },
];

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const payload = await getPayload({ config });
  const res = await payload.find({
    collection: "projects",
    where: {
      and: [
        {
          slug: {
            equals: slug,
          },
        },
        {
          published: {
            equals: true,
          },
        },
      ],
    },
  });

  const project = res.docs[0];

  if (!project) notFound();

  return (
    <article className="pb-12 pt-6">
      <header className="space-y-4">
        <h1 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
          {project.title}
        </h1>
        <p className="max-w-[60ch] text-lg text-muted-foreground">
          {project.summary}
        </p>
        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          {project.timeline && (
            <span className="font-mono">{project.timeline}</span>
          )}
          {project.role && (
            <>
              <span>&middot;</span>
              <span>{project.role}</span>
            </>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {project.stack?.map((tech: any) => (
            <Badge key={tech.item} variant="secondary" className="font-mono text-xs">
              {tech.item}
            </Badge>
          ))}
        </div>
      </header>

      <Separator className="my-8" />

      {sections.map(({ key, title }) => {
        const content = project[key] as string | undefined;
        if (!content) return null;
        return <CaseStudySection key={key} title={title} content={content} />;
      })}
    </article>
  );
}
