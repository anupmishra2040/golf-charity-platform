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

    const charityId = body.charityId || null;
    const charityPercentage = Number(body.charityPercentage);

    // Validate percentage
    if (
      !Number.isFinite(charityPercentage) ||
      charityPercentage < 10 ||
      charityPercentage > 100
    ) {
      return NextResponse.json(
        { error: "Charity percentage must be between 10 and 100" },
        { status: 400 }
      );
    }

    // Check charity exists
    if (charityId) {
      const { data: charityExists, error: charityError } = await db
        .from("charities")
        .select("id")
        .eq("id", charityId)
        .single();

      if (charityError || !charityExists) {
        return NextResponse.json(
          { error: "Selected charity not found" },
          { status: 400 }
        );
      }
    }

    // Update user
    const { error } = await db
      .from("users")
      .update({
        charity_id: charityId,
        charity_percentage: charityPercentage,
      })
      .eq("id", session.userId);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}