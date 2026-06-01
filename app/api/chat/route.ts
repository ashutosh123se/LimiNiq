import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const systemPrompt = `
You are a friendly, professional AI representative for LimiNiq.
LimiNiq is a digital agency that specializes in:
1. Web Development (Custom Web Applications, Corporate Websites, E-Commerce Stores, Landing Pages & Sales Funnels)
2. SEO & Digital Marketing (On-Page Optimisation, Technical SEO, Link Building & Authority, Content Marketing Strategy)
3. Social Media Management (Email Marketing, Conversion Rate Optimisation)

Your goal is to answer basic questions about our services, be very welcoming, and encourage users to book a free consultation or contact us.
- Keep your answers concise, helpful, and friendly.
- Do not make up prices. If asked about pricing, mention that we offer tailored solutions and they should book a call for an accurate quote.
- Contact email: contact@liminiq.com
- You are chatting with a potential client on our website.
`;

export async function POST(req: Request) {
  try {
    const { messages, sessionId } = await req.json();

    if (!sessionId) {
      return NextResponse.json({ error: "Session ID is required." }, { status: 400 });
    }

    // Check if the API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "AI service is currently unavailable. Please contact us via email." },
        { status: 503 }
      );
    }

    const result = await streamText({
      model: openai("gpt-4o-mini"),
      messages,
      system: systemPrompt,
      onFinish: async ({ text, finishReason }) => {
        try {
          const finalMessages = [
            ...messages,
            { role: "assistant", content: text },
          ];

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
