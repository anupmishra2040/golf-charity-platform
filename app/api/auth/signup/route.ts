import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { createToken, hashPassword } from "@/lib/auth";
import { signupSchema } from "@/lib/validations";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = signupSchema.safeParse({
      ...body,
      charityPercentage: Number(body.charityPercentage ?? 10),
    });

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const { fullName, email, password, charityId, charityPercentage } = parsed.data;

    const { data: existingUser } = await db.from("users").select("id").eq("email", email).maybeSingle();
    if (existingUser) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 });
    }

    const passwordHash = await hashPassword(password);

    const { data: user, error } = await db
      .from("users")
      .insert({
        full_name: fullName,
        email,
        password_hash: passwordHash,
        charity_id: charityId ?? null,
        charity_percentage: charityPercentage,
      })
      .select("id, email, role")
      .single();

    if (error || !user) {
      return NextResponse.json({ error: error?.message || "Unable to create user" }, { status: 500 });
    }

    const token = await createToken({ userId: user.id, email: user.email, role: user.role });
    const response = NextResponse.json({ success: true, user });
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
