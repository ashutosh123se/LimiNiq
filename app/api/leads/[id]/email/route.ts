import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendCustomEmail, sendFollowUp } from "@/lib/email";
import { z } from "zod";

const sendEmailSchema = z.object({
  subject: z.string().min(1),
  body: z.string().min(1),
  type: z.enum(["AUTO_REPLY", "ADMIN_NOTIFICATION", "FOLLOW_UP", "PROPOSAL", "CUSTOM"]),
  calendlyLink: z.string().optional(),
});

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lead = await prisma.lead.findUnique({ where: { id } });
  if (!lead) return NextResponse.json({ error: "Lead not found" }, { status: 404 });

  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }

  const parsed = sendEmailSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Validation failed" }, { status: 422 });

  let result;
  if (parsed.data.type === "FOLLOW_UP") {
    result = await sendFollowUp({
      to: lead.email,
      name: lead.name,
      service: lead.services[0] || "your project",
      calendlyLink: parsed.data.calendlyLink,
    });
  } else {
    result = await sendCustomEmail({
      to: lead.email,
      subject: parsed.data.subject,
      html: parsed.data.body,
    });
  }

  if (result.success) {
    // Log email in DB
    await prisma.email.create({
      data: {
        leadId: id,
        subject: parsed.data.subject,
        body: parsed.data.body,
        type: parsed.data.type,
        status: "sent",
      },
    });
    await prisma.activity.create({
      data: { leadId: id, type: "email_sent", note: `Email sent: ${parsed.data.subject}` },
    });
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
}
