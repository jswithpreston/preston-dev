import Markdown from "react-markdown";

interface CaseStudySectionProps {
  title: string;
  content: string;
}

export function CaseStudySection({ title, content }: CaseStudySectionProps) {
  return (
    <section className="py-6">
      <h2 className="mb-4 font-serif text-xl font-semibold tracking-tight">
        {title}
      </h2>
      <div className="prose prose-stone dark:prose-invert max-w-[68ch] prose-headings:font-serif prose-headings:tracking-tight">
        <Markdown>{content}</Markdown>
      </div>
    </section>
  );
}
