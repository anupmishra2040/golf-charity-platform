import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const session = await verifyToken(token);

    const { data, error } = await db
      .from("golf_scores")
      .select("id, score, played_on, created_at")
      .eq("user_id", session.userId)
      .order("played_on", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(5);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ scores: data || [] });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const session = await verifyToken(token);
    const body = await req.json();

    const score = Number(body.score);
    const playedOn = body.playedOn;

    if (!Number.isInteger(score) || score < 1 || score > 45) {
      return NextResponse.json(
        { error: "Score must be an integer between 1 and 45" },
        { status: 400 }
      );
    }

    if (!playedOn) {
      return NextResponse.json({ error: "Date is required" }, { status: 400 });
    }

    const { error: insertError } = await db.from("golf_scores").insert({
      user_id: session.userId,
      score,
      played_on: playedOn,
    });

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    const { data: scores, error: fetchError } = await db
      .from("golf_scores")
      .select("id, played_on, created_at")
      .eq("user_id", session.userId)
      .order("played_on", { ascending: false })
      .order("created_at", { ascending: false });

    if (fetchError) {
      return NextResponse.json({ error: fetchError.message }, { status: 500 });
    }

    if (scores && scores.length > 5) {
      const idsToDelete = scores.slice(5).map((s) => s.id);

      const { error: deleteError } = await db
        .from("golf_scores")
        .delete()
        .in("id", idsToDelete);

      if (deleteError) {
        return NextResponse.json({ error: deleteError.message }, { status: 500 });
      }
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}