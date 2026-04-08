import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PUT(request: Request, { params }: RouteParams) {
  const { id } = await params;
  const body = await request.json();

  const block = await prisma.aIKnowledgeBlock.update({
    where: { id },
    data: {
      type: body.type,
      title: body.title,
      summary: body.summary,
      content: body.content,
      tags: body.tags || [],
      active: body.active,
      projectId: body.projectId || null,
    },
  });

  return NextResponse.json(block);
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  const { id } = await params;
  await prisma.aIKnowledgeBlock.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
