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

    const { data: users, error: usersError } = await db
      .from("users")
      .select("id, role, charity_percentage");

    const { data: draws, error: drawsError } = await db
      .from("draws")
      .select("id, prize_pool, rollover_amount, created_at");

    const { data: winners, error: winnersError } = await db
      .from("winners")
      .select("id, match_type, prize_amount, verification_status, payment_status");

    const { data: charities, error: charitiesError } = await db
      .from("charities")
      .select("id, is_featured");

    if (usersError || drawsError || winnersError || charitiesError) {
      return NextResponse.json(
        {
          error:
            usersError?.message ||
            drawsError?.message ||
            winnersError?.message ||
            charitiesError?.message ||
            "Failed to load reports",
        },
        { status: 500 }
      );
    }

    const totalUsers = users?.length || 0;
    const adminUsers = users?.filter((u) => u.role === "admin").length || 0;
    const subscriberUsers =
      users?.filter((u) => u.role === "subscriber").length || 0;

    const avgCharityPercentage =
      users && users.length > 0
        ? Number(
            (
              users.reduce(
                (sum, u) => sum + Number(u.charity_percentage || 0),
                0
              ) / users.length
            ).toFixed(2)
          )
        : 0;

    const totalDraws = draws?.length || 0;
    const totalPrizePool =
      draws?.reduce((sum, d) => sum + Number(d.prize_pool || 0), 0) || 0;
    const totalRollover =
      draws?.reduce((sum, d) => sum + Number(d.rollover_amount || 0), 0) || 0;

    const totalWinners = winners?.length || 0;
    const paidWinners =
      winners?.filter((w) => w.payment_status === "paid").length || 0;
    const pendingVerification =
      winners?.filter((w) => w.verification_status === "pending").length || 0;

    const tier3Winners =
      winners?.filter((w) => w.match_type === 3).length || 0;
    const tier4Winners =
      winners?.filter((w) => w.match_type === 4).length || 0;
    const tier5Winners =
      winners?.filter((w) => w.match_type === 5).length || 0;

    const totalPayout =
      winners?.reduce((sum, w) => sum + Number(w.prize_amount || 0), 0) || 0;

    const totalCharities = charities?.length || 0;
    const featuredCharities =
      charities?.filter((c) => c.is_featured).length || 0;

    return NextResponse.json({
      summary: {
        totalUsers,
        adminUsers,
        subscriberUsers,
        avgCharityPercentage,
        totalDraws,
        totalPrizePool,
        totalRollover,
        totalWinners,
        paidWinners,
        pendingVerification,
        tier3Winners,
        tier4Winners,
        tier5Winners,
        totalPayout,
        totalCharities,
        featuredCharities,
      },
    });
  } catch (err) {
    console.error("Admin reports error:", err);
    return NextResponse.json(
      { error: "Failed to load reports" },
      { status: 500 }
    );
  }
}