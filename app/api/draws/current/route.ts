import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

function countMatches(userScores: number[], winningNumbers: number[]) {
  const winningSet = new Set(winningNumbers);
  return userScores.filter((score) => winningSet.has(score)).length;
}

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const session = await verifyToken(token);

    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    const { data: draw, error: drawError } = await db
      .from("draws")
      .select("*")
      .eq("month", month)
      .eq("year", year)
      .maybeSingle();

    if (drawError) {
      return NextResponse.json({ error: drawError.message }, { status: 500 });
    }

    if (!draw) {
      return NextResponse.json({ draw: null });
    }

    const { data: scoreRows, error: scoreError } = await db
      .from("golf_scores")
      .select("score")
      .eq("user_id", session.userId)
      .order("played_on", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(5);

    if (scoreError) {
      return NextResponse.json({ error: scoreError.message }, { status: 500 });
    }

    const { data: myWinner } = await db
      .from("winners")
      .select("match_type, prize_amount, verification_status, payment_status")
      .eq("draw_id", draw.id)
      .eq("user_id", session.userId)
      .maybeSingle();

    const userScores = (scoreRows || []).map((row) => row.score);
    const winningNumbers = draw.winning_numbers || [];
    const matchCount = countMatches(userScores, winningNumbers);

    let matchType: number | null = null;
    if (matchCount >= 5) matchType = 5;
    else if (matchCount === 4) matchType = 4;
    else if (matchCount === 3) matchType = 3;

    return NextResponse.json({
      draw,
      userScores,
      winningNumbers,
      matchCount,
      matchType,
      winner: myWinner || null,
    });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}