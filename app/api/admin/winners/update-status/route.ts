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

    if (session.role !== "admin") {
      return NextResponse.json({ error: "Admin only" }, { status: 403 });
    }

    const body = await req.json();
    const winnerId = body.winnerId;
    const verificationStatus = body.verificationStatus;
    const paymentStatus = body.paymentStatus;

    if (!winnerId) {
      return NextResponse.json(
        { error: "winnerId is required" },
        { status: 400 }
      );
    }

    const updateData: Record<string, string> = {};

    if (verificationStatus) {
      updateData.verification_status = verificationStatus;
    }

    if (paymentStatus) {
      updateData.payment_status = paymentStatus;
    }

    const { error } = await db
      .from("winners")
      .update(updateData)
      .eq("id", winnerId);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}