import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { CHAT_SYSTEM_PROMPT } from "@/lib/ai/chatSystemPrompt";
import {
  extractContactFromMessages,
  hasCompleteContact,
  trimChatMessages,
} from "@/lib/chatLead";

export const maxDuration = 30;

type ChatMessage = { role: string; content: string };

async function upsertChatLead(
  sessionId: string,
  contact: { name: string; phone: string; email: string; summary: string | null },
  messages: ChatMessage[]
) {
  const existing = await prisma.aIChatSession.findUnique({ where: { sessionId } });
  if (existing?.leadId) return existing.leadId;

  const lead = await prisma.lead.create({
    data: {
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      services: ["AI Chat Inquiry"],
      message: contact.summary ?? "Lead captured via website AI chat assistant.",
      source: "AI Chat",
      pageUrl: "/",
    },
  });

  await prisma.aIChatSession.update({
    where: { sessionId },
    data: { leadId: lead.id },
  });

  return lead.id;
}

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
          const finalMessages = trimChatMessages([
            ...messages,
            { role: "assistant", content: text },
          ] as ChatMessage[]);

          const contact = extractContactFromMessages(finalMessages);
          let leadId: string | undefined;

          if (hasCompleteContact(contact)) {
            leadId =
              (await upsertChatLead(
                sessionId,
                contact as { name: string; phone: string; email: string; summary: string | null },
                finalMessages
              )) ?? undefined;
          }

          await prisma.aIChatSession.upsert({
            where: { sessionId },
            update: {
              messages: finalMessages,
              visitorName: contact.name,
              visitorPhone: contact.phone,
              visitorEmail: contact.email,
              summary: contact.summary,
              messageCount: finalMessages.length,
              ...(leadId ? { leadId } : {}),
            },
            create: {
              sessionId,
              messages: finalMessages,
              visitorName: contact.name,
              visitorPhone: contact.phone,
              visitorEmail: contact.email,
              summary: contact.summary,
              messageCount: finalMessages.length,
              ...(leadId ? { leadId } : {}),
            },
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
