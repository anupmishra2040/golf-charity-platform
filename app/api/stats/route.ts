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

    if (session.role !== "admin") {
      return NextResponse.json({ error: "Admin only" }, { status: 403 });
    }

    // USERS
    const { data: users } = await db.from("users").select("id");

    // SCORES → use this as activity indicator
    const { data: scores } = await db.from("scores").select("id");

    // WINNERS
    const { data: winners } = await db
      .from("winners")
      .select("id, prize_amount, verification_status");

    // 👉 Calculate prize pool from winners
    const totalPrizePool =
      winners?.reduce((sum, w) => sum + Number(w.prize_amount || 0), 0) || 0;

    // 👉 Pending verifications
    const pending =
      winners?.filter((w) => w.verification_status === "pending").length || 0;

    // 👉 Fake charity (until donation system ready)
    const totalCharity = Math.floor(totalPrizePool * 0.2);

    return NextResponse.json({
      users: users?.length || 0,
      prizePool: totalPrizePool,
      charity: totalCharity,
      pending,
      activity: scores?.length || 0,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to load stats" },
      { status: 500 }
    );
  }
}