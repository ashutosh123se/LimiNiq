import { AuditTool } from "@/components/sections/AuditTool";

/** Thin wrapper so the /tools registry can embed the existing homepage audit widget as-is. */
export function WebsiteAuditTool() {
  return <AuditTool />;
}
