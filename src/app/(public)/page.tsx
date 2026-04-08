import { prisma } from "@/lib/prisma";
import { Hero } from "@/components/home/Hero";
import { MetricsGrid } from "@/components/home/MetricsGrid";
import { FeaturedProject } from "@/components/home/FeaturedProject";

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [metrics, featuredProject] = await Promise.all([
    prisma.metric.findMany({
      where: { visible: true },
      orderBy: { sortOrder: "asc" },
      select: { id: true, label: true, value: true, suffix: true },
    }),
    prisma.project.findFirst({
      where: { featured: true, published: true },
      select: {
        id: true,
        slug: true,
        title: true,
        summary: true,
        stack: true,
        timeline: true,
        role: true,
      },
    }),
  ]);

  return (
    <>
      <Hero />
      <MetricsGrid metrics={metrics} />
      {featuredProject && <FeaturedProject project={featuredProject} />}
    </>
  );
}
