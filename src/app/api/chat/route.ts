import { prisma } from "@/lib/prisma";
import { buildPageContext } from "@/lib/ai/context-builder";
import { routeIntent } from "@/lib/ai/intent-router";
import { buildLocalResponse, resolveFollowUp } from "@/lib/ai/service";
import type { ChatRequest } from "@/lib/ai/types";

export async function POST(request: Request) {
  try {
    const body: ChatRequest = await request.json();
    const { message, sessionKey, pageContext } = body;

    if (!message || !sessionKey) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Get or create session
    let session = await prisma.chatSession.findUnique({ where: { sessionKey } });
    if (!session) {
      session = await prisma.chatSession.create({
        data: { sessionKey, metadata: pageContext as unknown as Record<string, string> },
      });
    }

    // Get conversation history (last 10 messages for context)
    const history = await prisma.chatMessage.findMany({
      where: { sessionId: session.id },
      orderBy: { createdAt: "asc" },
      take: 10,
      select: { role: true, content: true },
    });

    const conversationHistory = history.map((m) => ({
      role: m.role.toLowerCase() as "user" | "assistant",
      content: m.content,
    }));

    // Save user message
    await prisma.chatMessage.create({
      data: { sessionId: session.id, role: "USER", content: message },
    });

    // Resolve follow-up pronouns ("what stack does IT use?" → "pfis what stack does it use?")
    const resolvedMessage = resolveFollowUp(message, conversationHistory);

    // Build context + retrieve knowledge using the resolved message
    await buildPageContext(pageContext);
    const { knowledge } = await routeIntent(resolvedMessage);

    // Build response locally — no external API
    const responseText = buildLocalResponse(knowledge, message, conversationHistory);

    // Stream word by word for a natural typing feel
    const encoder = new TextEncoder();
    const words = responseText.split(" ");

    const readableStream = new ReadableStream({
      async start(controller) {
        for (const word of words) {
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ content: word + " " })}\n\n`)
          );
          await new Promise((r) => setTimeout(r, 18));
        }

        // Save assistant response
        await prisma.chatMessage.create({
          data: { sessionId: session.id, role: "ASSISTANT", content: responseText },
        });

        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      },
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
