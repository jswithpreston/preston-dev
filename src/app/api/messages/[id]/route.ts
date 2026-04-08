import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PUT(request: Request, { params }: RouteParams) {
  const { id } = await params;
  const body = await request.json();

  const message = await prisma.contactSubmission.update({
    where: { id },
    data: { read: body.read },
  });

  return NextResponse.json(message);
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  const { id } = await params;
  await prisma.contactSubmission.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
