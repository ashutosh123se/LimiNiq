import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { leadSchema } from "@/lib/validations";
import { calculateLeadScore, getScorePriority } from "@/lib/leadScoring";
import { rateLimit, getClientIP } from "@/lib/rateLimit";
import { sendAdminNotification, sendClientAutoReply } from "@/lib/email";

// POST /api/leads — Create new lead (public)
export async function POST(req: NextRequest) {
  // Rate limiting
  const ip = getClientIP(req);
  const rl = rateLimit(`leads:${ip}`, { maxRequests: 10, windowMs: 60 * 60 * 1000 });
  if (!rl.success) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed", issues: parsed.error.flatten() }, { status: 422 });
  }

  const data = parsed.data;

  // Honeypot check
  if (data.honeypot) {
    return NextResponse.json({ success: true }); // Silently reject bots
  }

  try {
    const score = calculateLeadScore(data);
    const priority = getScorePriority(score);

    const lead = await prisma.lead.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company,
        website: data.website,
        services: data.services,
        budget: data.budget,
        timeline: data.timeline,
        source: data.source,
        message: data.message,
        score,
        priority,
        ipAddress: ip,
        userAgent: req.headers.get("user-agent"),
        referrer: req.headers.get("referer"),
        pageUrl: data.page_url,
      },
    });

    // Add initial activity
    await prisma.activity.create({
      data: {
        leadId: lead.id,
        type: "lead_received",
        note: `Lead received from ${data.source || "Direct"} — Score: ${score}/100`,
      },
    });

    // Send emails in background (don't await to speed up response)
    Promise.all([
      sendAdminNotification({ ...lead, score }),
      sendClientAutoReply({ name: lead.name, email: lead.email, services: lead.services }),
    ]).catch((err) => console.error("[Leads API] Email error:", err));

    return NextResponse.json({ success: true, id: lead.id }, { status: 201 });
  } catch (err) {
    console.error("[Leads API] Create error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// GET /api/leads — List all leads (admin only, protected by middleware)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 25);
  const status = searchParams.get("status") as any;
  const service = searchParams.get("service");
  const priority = searchParams.get("priority") as any;
  const search = searchParams.get("search");
  const sort = searchParams.get("sort") || "createdAt";
  const order = searchParams.get("order") || "desc";

  const where: Prisma.LeadWhereInput = { status: { not: "ARCHIVED" } };
  if (status) where.status = status;
  if (priority) where.priority = priority;
  if (service) where.services = { has: service };
  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
      { company: { contains: search, mode: "insensitive" } },
    ];
  }

  try {
    const [leads, total] = await Promise.all([
      prisma.lead.findMany({
        where,
        orderBy: { [sort]: order },
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true, name: true, email: true, phone: true, company: true,
          services: true, budget: true, status: true, priority: true,
          score: true, source: true, createdAt: true, assignedTo: true,
          followUpDate: true, _count: { select: { activities: true } },
        },
      }),
      prisma.lead.count({ where }),
    ]);

    return NextResponse.json({ leads, total, page, pages: Math.ceil(total / limit) });
  } catch (err) {
    console.error("[Leads GET API] Error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
