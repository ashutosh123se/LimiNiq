import { prisma } from "@/lib/prisma";
import { AdminAIChatList } from "@/components/admin/AdminAIChatList";
import { Prisma } from "@prisma/client";

export const dynamic = "force-dynamic";

export default async function AdminAIChatPage() {
  const sessions = await prisma.aIChatSession.findMany({
    orderBy: { updatedAt: "desc" },
  });

  // Typecasting the Json array to our Message type
  const formattedSessions = sessions.map((s) => ({
    id: s.id,
    sessionId: s.sessionId,
    messages: (s.messages as Prisma.JsonArray).map((m: any) => ({
      role: m.role || "user",
      content: m.content || "",
    })),
    updatedAt: s.updatedAt,
  }));

  return <AdminAIChatList sessions={formattedSessions} />;
}
