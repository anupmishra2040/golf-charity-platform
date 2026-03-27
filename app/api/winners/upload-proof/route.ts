import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const session = await verifyToken(token);
    const body = await req.json();

    const winnerId = body.winnerId;
    const proofUrl = body.proofUrl;

    if (!winnerId || !proofUrl) {
      return NextResponse.json(
        { error: "winnerId and proofUrl are required" },
        { status: 400 }
      );
    }

    const { data: winner, error: winnerError } = await db
      .from("winners")
      .select("id, user_id")
      .eq("id", winnerId)
      .single();

    if (winnerError || !winner) {
      return NextResponse.json({ error: "Winner not found" }, { status: 404 });
    }

    if (winner.user_id !== session.userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { error } = await db
      .from("winners")
      .update({
        proof_url: proofUrl,
        verification_status: "pending",
      })
      .eq("id", winnerId);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}