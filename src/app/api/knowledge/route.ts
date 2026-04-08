import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const blocks = await prisma.aIKnowledgeBlock.findMany({
    orderBy: { createdAt: "desc" },
    include: { project: { select: { title: true } } },
  });
  return NextResponse.json(blocks);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const block = await prisma.aIKnowledgeBlock.create({
      data: {
        type: body.type,
        title: body.title,
        summary: body.summary,
        content: body.content,
        tags: body.tags || [],
        active: body.active ?? true,
        projectId: body.projectId || null,
      },
    });
    return NextResponse.json(block, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
