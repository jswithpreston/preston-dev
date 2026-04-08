import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { decisionSchema } from "@/lib/validations";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: RouteParams) {
  const { id } = await params;
  const decision = await prisma.decision.findUnique({ where: { id } });
  if (!decision) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(decision);
}

export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();
    const validated = decisionSchema.parse(body);

    const decision = await prisma.decision.update({
      where: { id },
      data: validated,
    });

    return NextResponse.json(decision);
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  const { id } = await params;
  await prisma.decision.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
