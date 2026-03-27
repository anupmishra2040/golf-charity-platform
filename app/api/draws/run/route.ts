import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

function generateWinningNumbers(): number[] {
  const numbers = new Set<number>();

  while (numbers.size < 5) {
    numbers.add(Math.floor(Math.random() * 45) + 1);
  }

  return Array.from(numbers).sort((a, b) => a - b);
}

function countMatches(userScores: number[], winningNumbers: number[]) {
  const winningSet = new Set(winningNumbers);
  return userScores.filter((score) => winningSet.has(score)).length;
}

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const session = await verifyToken(token);

    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    const { data: existingDraw } = await db
      .from("draws")
      .select("id, winning_numbers, month, year, status")
      .eq("month", month)
      .eq("year", year)
      .maybeSingle();

    if (existingDraw) {
      return NextResponse.json({
        message: "Draw already exists for this month",
        draw: existingDraw,
      });
    }

    const { data: activeUsers, error: activeUsersError } = await db
      .from("users")
      .select("id");

    if (activeUsersError) {
      return NextResponse.json({ error: activeUsersError.message }, { status: 500 });
    }

    const activeSubscriberCount = activeUsers?.length || 0;

    const prizeContributionPerUser = 100;
    const basePrizePool = activeSubscriberCount * prizeContributionPerUser;

    const { data: latestRollover } = await db
      .from("rollovers")
      .select("amount")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    const previousRollover = Number(latestRollover?.amount || 0);
    const totalPrizePool = basePrizePool + previousRollover;

    const fiveMatchPool = totalPrizePool * 0.4;
    const fourMatchPool = totalPrizePool * 0.35;
    const threeMatchPool = totalPrizePool * 0.25;

    const winningNumbers = generateWinningNumbers();

    const { data: createdDraw, error: drawError } = await db
      .from("draws")
      .insert({
        month,
        year,
        draw_mode: "random",
        winning_numbers: winningNumbers,
        prize_pool: totalPrizePool,
        rollover_amount: previousRollover,
        status: "published",
        published_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (drawError || !createdDraw) {
      return NextResponse.json(
        { error: drawError?.message || "Failed to create draw" },
        { status: 500 }
      );
    }

    const { data: allUsers, error: usersError } = await db.from("users").select("id");

    if (usersError) {
      return NextResponse.json({ error: usersError.message }, { status: 500 });
    }

    const winnersByTier: {
      3: string[];
      4: string[];
      5: string[];
    } = {
      3: [],
      4: [],
      5: [],
    };

    for (const user of allUsers || []) {
      const { data: scoreRows } = await db
        .from("golf_scores")
        .select("score")
        .eq("user_id", user.id)
        .order("played_on", { ascending: false })
        .order("created_at", { ascending: false })
        .limit(5);

      const userScores = (scoreRows || []).map((row) => row.score);
      const matchCount = countMatches(userScores, winningNumbers);

      let matchType: 3 | 4 | 5 | null = null;

      if (matchCount >= 5) matchType = 5;
      else if (matchCount === 4) matchType = 4;
      else if (matchCount === 3) matchType = 3;

      if (matchType) {
        winnersByTier[matchType].push(user.id);
      }
    }

    const fiveShare =
      winnersByTier[5].length > 0 ? fiveMatchPool / winnersByTier[5].length : 0;
    const fourShare =
      winnersByTier[4].length > 0 ? fourMatchPool / winnersByTier[4].length : 0;
    const threeShare =
      winnersByTier[3].length > 0 ? threeMatchPool / winnersByTier[3].length : 0;

    for (const userId of winnersByTier[5]) {
      await db.from("winners").insert({
        draw_id: createdDraw.id,
        user_id: userId,
        match_type: 5,
        prize_amount: Number(fiveShare.toFixed(2)),
        verification_status: "pending",
        payment_status: "pending",
      });
    }

    for (const userId of winnersByTier[4]) {
      await db.from("winners").insert({
        draw_id: createdDraw.id,
        user_id: userId,
        match_type: 4,
        prize_amount: Number(fourShare.toFixed(2)),
        verification_status: "pending",
        payment_status: "pending",
      });
    }

    for (const userId of winnersByTier[3]) {
      await db.from("winners").insert({
        draw_id: createdDraw.id,
        user_id: userId,
        match_type: 3,
        prize_amount: Number(threeShare.toFixed(2)),
        verification_status: "pending",
        payment_status: "pending",
      });
    }

    const newRolloverAmount = winnersByTier[5].length === 0 ? fiveMatchPool : 0;

    await db.from("rollovers").insert({
      month,
      year,
      amount: Number(newRolloverAmount.toFixed(2)),
    });

    const { data: currentUserScores } = await db
      .from("golf_scores")
      .select("score")
      .eq("user_id", session.userId)
      .order("played_on", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(5);

    const sessionScores = (currentUserScores || []).map((row) => row.score);
    const currentUserMatchCount = countMatches(sessionScores, winningNumbers);

    let currentUserMatchType: number | null = null;
    if (currentUserMatchCount >= 5) currentUserMatchType = 5;
    else if (currentUserMatchCount === 4) currentUserMatchType = 4;
    else if (currentUserMatchCount === 3) currentUserMatchType = 3;

    return NextResponse.json({
      success: true,
      draw: createdDraw,
      winningNumbers,
      totalPrizePool,
      previousRollover,
      newRolloverAmount: Number(newRolloverAmount.toFixed(2)),
      tierPools: {
        fiveMatchPool: Number(fiveMatchPool.toFixed(2)),
        fourMatchPool: Number(fourMatchPool.toFixed(2)),
        threeMatchPool: Number(threeMatchPool.toFixed(2)),
      },
      winnersByTier: {
        three: winnersByTier[3].length,
        four: winnersByTier[4].length,
        five: winnersByTier[5].length,
      },
      currentUserMatchCount,
      currentUserMatchType,
    });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}