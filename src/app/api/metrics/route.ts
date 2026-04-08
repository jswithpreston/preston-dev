import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { metricSchema } from "@/lib/validations";

export async function GET(request: NextRequest) {
  const showAll = request.nextUrl.searchParams.get("all") === "true";

  const metrics = await prisma.metric.findMany({
    where: showAll ? {} : { visible: true },
    orderBy: { sortOrder: "asc" },
  });
  return NextResponse.json(metrics);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = metricSchema.parse(body);

    const metric = await prisma.metric.create({
      data: validated,
    });

    return NextResponse.json(metric, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
