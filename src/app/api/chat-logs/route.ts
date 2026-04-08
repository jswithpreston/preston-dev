import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const sessions = await prisma.chatSession.findMany({
    orderBy: { updatedAt: "desc" },
    include: {
      _count: { select: { messages: true } },
    },
  });
  return NextResponse.json(sessions);
}
