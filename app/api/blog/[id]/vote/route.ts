import { createHash } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { pollVoteSchema } from "@/lib/validations";
import type { PollOption } from "@/lib/data/blogEngagement";

export const dynamic = "force-dynamic";

function getVoterKey(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const ua = req.headers.get("user-agent") || "unknown";
  return createHash("sha256").update(`${ip}:${ua}`).digest("hex").slice(0, 32);
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = pollVoteSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed" }, { status: 422 });
  }

  const voterKey = getVoterKey(req);

  try {
    const post = await prisma.blogPost.findUnique({ where: { id } });
    if (!post || post.postType !== "POLL" || !post.published) {
      return NextResponse.json({ error: "Poll not found" }, { status: 404 });
    }

    if (post.pollEndsAt && new Date(post.pollEndsAt) < new Date()) {
      return NextResponse.json({ error: "Poll has ended" }, { status: 400 });
    }

    const options = (post.pollOptions as PollOption[] | null) ?? [];
    if (!options.some((o) => o.id === parsed.data.optionId)) {
      return NextResponse.json({ error: "Invalid option" }, { status: 400 });
    }

    const existing = await prisma.pollVote.findUnique({
      where: { postId_voterKey: { postId: id, voterKey } },
    });

    if (existing) {
      return NextResponse.json({ error: "Already voted", votedOptionId: existing.optionId }, { status: 409 });
    }

    const updatedOptions = options.map((o) =>
      o.id === parsed.data.optionId ? { ...o, votes: o.votes + 1 } : o
    );

    const [updated] = await prisma.$transaction([
      prisma.blogPost.update({
        where: { id },
        data: { pollOptions: updatedOptions as unknown as Prisma.InputJsonValue },
        select: { id: true, pollOptions: true, title: true },
      }),
      prisma.pollVote.create({
        data: { postId: id, optionId: parsed.data.optionId, voterKey },
      }),
    ]);

    return NextResponse.json({ success: true, pollOptions: updated.pollOptions });
  } catch {
    return NextResponse.json({ error: "Vote failed" }, { status: 500 });
  }
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const voterKey = getVoterKey(req);

  try {
    const vote = await prisma.pollVote.findUnique({
      where: { postId_voterKey: { postId: id, voterKey } },
    });
    return NextResponse.json({ votedOptionId: vote?.optionId ?? null });
  } catch {
    return NextResponse.json({ votedOptionId: null });
  }
}
