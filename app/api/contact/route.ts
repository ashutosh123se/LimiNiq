import { NextRequest, NextResponse } from "next/server";
import { rateLimit, getClientIP } from "@/lib/rateLimit";

/** Public contact form — forwards to leads API with client context preserved. */
export async function POST(req: NextRequest) {
  const ip = getClientIP(req);
  const rl = rateLimit(`contact:${ip}`, { maxRequests: 5, windowMs: 15 * 60 * 1000 });
  if (!rl.success) {
    return NextResponse.json(
      { error: "Too many messages sent. Please wait before trying again." },
      {
        status: 429,
        headers: {
          "Retry-After": Math.ceil((rl.resetAt - Date.now()) / 1000).toString(),
        },
      }
    );
  }

  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot check directly
  if (body.honeypot) {
    return NextResponse.json({ success: true }); // Silent drop for bots
  }

  const payload = {
    name: typeof body.name === "string" ? body.name.trim().slice(0, 100) : "",
    email: typeof body.email === "string" ? body.email.trim().slice(0, 150) : "",
    phone: typeof body.phone === "string" ? body.phone.trim().slice(0, 30) : undefined,
    company: typeof body.company === "string" ? body.company.trim().slice(0, 100) : undefined,
    website: typeof body.website === "string" ? body.website.trim().slice(0, 200) : undefined,
    message: typeof body.message === "string" ? body.message.trim().slice(0, 3000) : "",
    services: body.service
      ? [String(body.service)]
      : Array.isArray(body.services)
        ? body.services.map(String)
        : ["General Inquiry"],
    budget: typeof body.budget === "string" ? body.budget.trim() : undefined,
    timeline: typeof body.timeline === "string" ? body.timeline.trim() : undefined,
    source: body.source || "contact_page",
    honeypot: body.honeypot || "",
    page_url: typeof body.page_url === "string" ? body.page_url.slice(0, 500) : undefined,
  };

  const origin = req.nextUrl.origin;
  const res = await fetch(`${origin}/api/leads`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "CF-Connecting-IP": ip,
      "X-Forwarded-For": req.headers.get("x-forwarded-for") || ip,
      "User-Agent": req.headers.get("user-agent") || "",
      Referer: req.headers.get("referer") || "",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => ({}));
  return NextResponse.json(data, { status: res.status });
}
