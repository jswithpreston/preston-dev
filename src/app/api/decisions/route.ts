import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { decisionSchema } from "@/lib/validations";

export async function GET(request: NextRequest) {
  const showAll = request.nextUrl.searchParams.get("all") === "true";

  const decisions = await prisma.decision.findMany({
    where: showAll ? {} : { published: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(decisions);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = decisionSchema.parse(body);

    const decision = await prisma.decision.create({
      data: validated,
    });

    return NextResponse.json(decision, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
