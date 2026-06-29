import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { CHAT_SYSTEM_PROMPT } from "@/lib/ai/chatSystemPrompt";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages, sessionId } = await req.json();

    if (!sessionId) {
      return NextResponse.json({ error: "Session ID is required." }, { status: 400 });
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "AI service is currently unavailable. Please contact us via email." },
        { status: 503 }
      );
    }

    const result = await streamText({
      model: openai("gpt-4o-mini"),
      messages,
      system: CHAT_SYSTEM_PROMPT,
      temperature: 0.6,
      maxTokens: 120,
      onFinish: async ({ text }) => {
        try {
          const finalMessages = [...messages, { role: "assistant", content: text }];

          await prisma.aIChatSession.upsert({
            where: { sessionId },
            update: { messages: finalMessages },
            create: { sessionId, messages: finalMessages },
          });
        } catch (e) {
          console.error("Failed to save chat session:", e);
        }
      },
    });

    return result.toAIStreamResponse();
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "An error occurred during chat processing." },
      { status: 500 }
    );
  }
}
