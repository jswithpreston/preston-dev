import { getPayload } from "payload";
import config from "@/payload.config";
import { Hero } from "@/components/home/Hero";
import { MetricsGrid } from "@/components/home/MetricsGrid";
import { FeaturedProject } from "@/components/home/FeaturedProject";

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const payload = await getPayload({ config });

  const [metricsRes, featuredProjectRes] = await Promise.all([
    payload.find({
      collection: "metrics",
      where: {
        visible: {
          equals: true,
        },
      },
      sort: "sortOrder",
    }),
    payload.find({
      collection: "projects",
      where: {
        and: [
          {
            featured: {
              equals: true,
            },
          },
          {
            published: {
              equals: true,
            },
          },
        ],
      },
      limit: 1,
    }),
  ]);

  const metrics = metricsRes.docs.map(m => ({
    id: String(m.id),
    label: m.label,
    value: m.value,
    suffix: m.suffix || "",
  }));

  const featuredProjectDoc = featuredProjectRes.docs[0];
  const featuredProject = featuredProjectDoc ? {
    id: String(featuredProjectDoc.id),
    slug: featuredProjectDoc.slug,
    title: featuredProjectDoc.title,
    summary: featuredProjectDoc.summary,
    stack: featuredProjectDoc.stack?.map((s: any) => s.item).filter(Boolean) as string[] || [],
    timeline: featuredProjectDoc.timeline,
    role: featuredProjectDoc.role,
    problem: featuredProjectDoc.problem,
    outcome: featuredProjectDoc.outcome,
    featured: featuredProjectDoc.featured,
    sortOrder: featuredProjectDoc.sortOrder,
  } : null;

  return (
    <>
      <Hero />
      <MetricsGrid metrics={metrics} />
      {featuredProject && <FeaturedProject project={featuredProject as any} />}
    </>
  );
}
