import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { requireAdmin } from "@/lib/requireAdmin";

export const dynamic = 'force-dynamic';


export async function GET(req: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status") as any;
  const service = searchParams.get("service");

  const where: Prisma.LeadWhereInput = {};
  if (status) where.status = status;
  if (service) where.services = { has: service };

  const leads = await prisma.lead.findMany({
    where,
    select: {
      id: true, name: true, email: true, phone: true, company: true,
      services: true, budget: true, timeline: true, status: true,
      priority: true, score: true, source: true, message: true,
      createdAt: true, assignedTo: true,
    },
    orderBy: { createdAt: "desc" },
  });

  // Build CSV
  const headers = [
    "ID", "Name", "Email", "Phone", "Company", "Services",
    "Budget", "Timeline", "Status", "Priority", "Score", "Source", "Message", "Date",
  ];

  const rows = leads.map((l) => [
    l.id,
    `"${l.name.replace(/"/g, '""')}"`,
    l.email,
    l.phone || "",
    `"${(l.company || "").replace(/"/g, '""')}"`,
    `"${l.services.join("; ")}"`,
    l.budget || "",
    l.timeline || "",
    l.status,
    l.priority,
    l.score,
    l.source || "",
    `"${(l.message || "").replace(/"/g, '""').replace(/\n/g, " ")}"`,
    l.createdAt.toISOString(),
  ]);

  const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="liminiq-leads-${new Date().toISOString().split("T")[0]}.csv"`,
    },
  });
}
