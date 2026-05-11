import { getPayload } from "payload";
import config from "@/payload.config";
import { PageHeader } from "@/components/layout/PageHeader";
import { Separator } from "@/components/ui/separator";
import { SystemSection } from "@/components/system/SystemSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "System",
  description: "How this site works — stack, philosophy, infrastructure, and AI architecture.",
};

export const dynamic = 'force-dynamic';

export default async function SystemPage() {
  const payload = await getPayload({ config });

  const res = await payload.find({
    collection: "system-contents",
    sort: "sortOrder",
  });

  const sections = res.docs;

  return (
    <>
      <PageHeader
        title="System"
        description="The architecture behind this portfolio. How I build, why I choose certain tools, and what I've learned about designing systems that hold under pressure."
      />
      <div className="space-y-8 pb-12">
        {sections.map((section, idx) => (
          <div key={section.id}>
            {idx > 0 && <Separator className="mb-8" />}
            <SystemSection
              title={section.title}
              content={section.content}
            />
          </div>
        ))}
      </div>
    </>
  );
}
