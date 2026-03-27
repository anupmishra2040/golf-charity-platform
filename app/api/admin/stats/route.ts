import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyToken } from "@/lib/auth";
export const dynamic = "force-dynamic";

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

    const { data: users, error: usersError } = await db
      .from("users")
      .select("id");

    const { data: draws, error: drawsError } = await db
      .from("draws")
      .select("id, prize_pool");

    const { data: donations, error: donationsError } = await db
      .from("donations")
      .select("id, amount");

    const { data: winners, error: winnersError } = await db
      .from("winners")
      .select("id, verification_status");

    if (usersError || drawsError || donationsError || winnersError) {
      return NextResponse.json(
        {
          error:
            usersError?.message ||
            drawsError?.message ||
            donationsError?.message ||
            winnersError?.message ||
            "Failed to load stats",
        },
        { status: 500 }
      );
    }

    const totalUsers = users?.length || 0;
    const totalPrizePool =
      draws?.reduce((sum, row) => sum + Number(row.prize_pool || 0), 0) || 0;
    const totalCharity =
      donations?.reduce((sum, row) => sum + Number(row.amount || 0), 0) || 0;
    const pendingVerifications =
      winners?.filter((w) => w.verification_status === "pending").length || 0;

    return NextResponse.json({
      users: totalUsers,
      prizePool: totalPrizePool,
      charity: totalCharity,
      pending: pendingVerifications,
    });
  } catch (err) {
    console.error("Admin stats error:", err);
    return NextResponse.json(
      { error: "Failed to load stats" },
      { status: 500 }
    );
  }
}