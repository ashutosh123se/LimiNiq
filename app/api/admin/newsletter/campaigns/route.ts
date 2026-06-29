import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/requireAdmin";
import { sendCustomEmail } from "@/lib/email";

export const dynamic = "force-dynamic";

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;

  const campaigns = await prisma.newsletterCampaign.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(campaigns);
}

export async function POST(req: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { subject, body, sendNow } = await req.json();
  if (!subject?.trim() || !body?.trim()) {
    return NextResponse.json({ error: "Subject and body are required" }, { status: 422 });
  }

  const campaign = await prisma.newsletterCampaign.create({
    data: { subject: subject.trim(), body: body.trim() },
  });

  if (!sendNow) return NextResponse.json(campaign, { status: 201 });

  const subscribers = await prisma.newsletterSubscriber.findMany({
    where: { subscribed: true },
    select: { email: true, name: true },
  });

  let sentCount = 0;
  for (const sub of subscribers.slice(0, 200)) {
    const html = `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#111">
        ${sub.name ? `<p>Hi ${sub.name},</p>` : ""}
        ${body.trim().replace(/\n/g, "<br/>")}
        <hr style="margin:2rem 0;border:none;border-top:1px solid #eee"/>
        <p style="font-size:12px;color:#666">LIMINIQ · <a href="https://www.liminiq.com">liminiq.com</a></p>
      </div>`;
    const result = await sendCustomEmail({ to: sub.email, subject: subject.trim(), html });
    if (result.success) sentCount++;
  }

  const updated = await prisma.newsletterCampaign.update({
    where: { id: campaign.id },
    data: { sentCount, sentAt: new Date() },
  });

  return NextResponse.json(updated, { status: 201 });
}
