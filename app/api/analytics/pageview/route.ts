import { NextRequest, NextResponse } from "next/server";
import { logPageView } from "@/lib/analytics";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { page } = await req.json();
    if (!page || typeof page !== "string") {
      return NextResponse.json({ error: "Invalid page" }, { status: 400 });
    }
    await logPageView(page.slice(0, 200));
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
