import { NextRequest, NextResponse } from "next/server";

/** Public contact form — proxies to leads API for CMS compatibility. */
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const payload = {
    name: body.name,
    email: body.email,
    phone: body.phone || undefined,
    company: body.company || undefined,
    website: body.website || undefined,
    message: body.message || body.notes || "",
    services: body.service
      ? [body.service]
      : Array.isArray(body.services)
        ? body.services
        : ["General Inquiry"],
    budget: body.budget || undefined,
    timeline: body.timeline || undefined,
    source: body.source || "contact",
    honeypot: body.honeypot || "",
    page_url: body.page_url || undefined,
  };

  const origin = req.nextUrl.origin;
  const res = await fetch(`${origin}/api/leads`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => ({}));
  return NextResponse.json(data, { status: res.status });
}
