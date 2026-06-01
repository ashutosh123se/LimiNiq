import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { newsletterSchema } from "@/lib/validations";
import { sendNewsletterWelcome } from "@/lib/email";
import { rateLimit, getClientIP } from "@/lib/rateLimit";
import { auth } from "@/auth";

export const dynamic = 'force-dynamic';


export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const subscribers = await prisma.newsletterSubscriber.findMany({
      orderBy: { createdAt: "desc" }
    });
    return NextResponse.json(subscribers);
  } catch {
    return NextResponse.json({ error: "Failed to fetch subscribers" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const ip = getClientIP(req);
  const rl = rateLimit(`newsletter:${ip}`, { maxRequests: 5 });
  if (!rl.success) return NextResponse.json({ error: "Too many requests" }, { status: 429 });

  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }

  const parsed = newsletterSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid email" }, { status: 422 });

  try {
    await prisma.newsletterSubscriber.upsert({
      where: { email: parsed.data.email },
      update: { subscribed: true, name: parsed.data.name },
      create: { email: parsed.data.email, name: parsed.data.name },
    });
    sendNewsletterWelcome({ to: parsed.data.email, name: parsed.data.name }).catch(console.error);
    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
