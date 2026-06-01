import { NextRequest, NextResponse } from "next/server";
import { getOverviewStats, getLeadsByStatus, getLeadsOverTime } from "@/lib/analytics";

export async function GET(_req: NextRequest) {
  try {
    const [overview, byStatus, overTime] = await Promise.all([
      getOverviewStats(),
      getLeadsByStatus(),
      getLeadsOverTime(30),
    ]);
    return NextResponse.json({ overview, byStatus, overTime });
  } catch (err) {
    console.error("[Analytics Overview]", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
