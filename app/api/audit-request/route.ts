import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auditRequestSchema } from "@/lib/validations";
import { rateLimit, getClientIP } from "@/lib/rateLimit";
import { sendAdminNotification, sendClientAutoReply } from "@/lib/email";
import { calculateLeadScore, getScorePriority } from "@/lib/leadScoring";

export const dynamic = 'force-dynamic';


export async function POST(req: NextRequest) {
  const ip = getClientIP(req);
  const rl = rateLimit(`audit:${ip}`, { maxRequests: 5 });
  if (!rl.success) return NextResponse.json({ error: "Too many requests" }, { status: 429 });

  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }

  const parsed = auditRequestSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid data" }, { status: 422 });

  try {
    const leadData = {
      email: parsed.data.email,
      name: parsed.data.name || "Audit Request",
      website: parsed.data.website,
      services: ["Website Audit"],
      source: "Audit Tool",
    };
    const score = calculateLeadScore(leadData);
    const priority = getScorePriority(score);

    const lead = await prisma.lead.create({
      data: { ...leadData, score, priority, ipAddress: ip, status: "NEW" },
    });

    Promise.all([
      sendAdminNotification({ ...lead, score }),
      sendClientAutoReply({ name: lead.name, email: lead.email, services: lead.services }),
    ]).catch(console.error);
    
    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
