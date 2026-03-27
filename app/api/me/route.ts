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

    // Get user
    const { data: user, error } = await db
      .from("users")
      .select("id, full_name, email, charity_percentage, charity_id")
      .eq("id", session.userId)
      .single();

    if (error || !user) {
      return NextResponse.json(
        { error: error?.message || "User not found" },
        { status: 404 }
      );
    }

    // Get charity separately
    let charity = null;

    if (user.charity_id) {
      const { data: charityData } = await db
        .from("charities")
        .select("id, name, slug")
        .eq("id", user.charity_id)
        .single();

      charity = charityData || null;
    }

    return NextResponse.json({
      user: {
        ...user,
        charities: charity,
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}