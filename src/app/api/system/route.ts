import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const sections = await prisma.systemContent.findMany({
    orderBy: { sortOrder: "asc" },
  });
  return NextResponse.json(sections);
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, title, content } = body;

    const section = await prisma.systemContent.update({
      where: { id },
      data: { title, content },
    });

    return NextResponse.json(section);
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
