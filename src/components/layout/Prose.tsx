import { cn } from "@/lib/utils";

interface ProseProps {
  children: React.ReactNode;
  className?: string;
}

export function Prose({ children, className }: ProseProps) {
  return (
    <div
      className={cn(
        "prose prose-stone dark:prose-invert max-w-[68ch] prose-headings:font-serif prose-headings:tracking-tight",
        className
      )}
    >
      {children}
    </div>
  );
}
