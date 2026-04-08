import { PageHeader } from "@/components/layout/PageHeader";
import { ContactForm } from "@/components/contact/ContactForm";
import { Mail, MapPin, Clock, Github, X, Linkedin } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact"
        description="Have a question or want to work together? Send me a message."
      />
      <div className="grid gap-12 lg:grid-cols-[1fr,1.5fr] pb-12">
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Get in touch</h2>
            <p className="text-sm text-muted-foreground">
              I'm always interested in hearing about new projects and
              opportunities. Whether you have a question or just want to say hi,
              feel free to reach out.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Mail className="mt-0.5 h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Email</p>
                <a
                  href="mailto:munuprestoncapital@gmail.com"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  munuprestoncapital@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Location</p>
                <p className="text-sm text-muted-foreground">
                  Remote / Worldwide
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="mt-0.5 h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Response time</p>
                <p className="text-sm text-muted-foreground">
                  Usually within 24-48 hours
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Connect elsewhere</h3>
            <div className="flex gap-2">
              <a
                href="https://github.com/prestonmunu"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md border border-border p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://x.com/prestonmunu"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md border border-border p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                aria-label="X (Twitter)"
              >
                <X className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com/in/prestonmunu"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md border border-border p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-lg">
          <ContactForm />
        </div>
      </div>
    </>
  );
}
