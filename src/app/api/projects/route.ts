import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { projectSchema } from "@/lib/validations";

export async function GET(request: NextRequest) {
  const showAll = request.nextUrl.searchParams.get("all") === "true";

  const projects = await prisma.project.findMany({
    where: showAll ? {} : { published: true },
    orderBy: { sortOrder: "asc" },
    select: showAll
      ? { id: true, title: true, slug: true, published: true, featured: true, sortOrder: true }
      : { id: true, slug: true, title: true, summary: true, stack: true, timeline: true, role: true },
  });
  return NextResponse.json(projects);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = projectSchema.parse(body);

    const project = await prisma.project.create({
      data: validated,
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
