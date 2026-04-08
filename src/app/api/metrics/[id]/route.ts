import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { metricSchema } from "@/lib/validations";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();
    const validated = metricSchema.parse(body);

    const metric = await prisma.metric.update({
      where: { id },
      data: validated,
    });

    return NextResponse.json(metric);
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  const { id } = await params;
  await prisma.metric.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
