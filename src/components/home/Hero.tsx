import Link from "next/link";
import { ArrowRight, Code2 } from "lucide-react";

export function Hero() {
  return (
    <section className="relative flex flex-col items-start justify-center py-20 sm:py-28">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="animate-[fade-in_0.5s_ease-out]">
        <h1 className="font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
          Preston Munu
        </h1>
      </div>

      <p className="mt-4 max-w-[52ch] text-lg text-muted-foreground animate-[fade-in_0.5s_ease-out_0.1s_both]">
        Software engineer building thoughtful systems. I care about clean
        architecture, honest documentation, and shipping things that work.
      </p>

      <div className="mt-8 flex gap-4 animate-[fade-in_0.5s_ease-out_0.2s_both]">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-md hover:shadow-primary/20"
        >
          View Work
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center rounded-md border border-border px-4 py-2 text-sm font-medium transition-all hover:bg-accent hover:shadow-md"
        >
          Get in Touch
        </Link>
      </div>

      <div className="mt-12 flex items-center gap-2 text-sm text-muted-foreground animate-[fade-in_0.5s_ease-out_0.3s_both]">
        <Code2 className="h-4 w-4" />
        <span>Available for new projects</span>
      </div>
    </section>
  );
}
