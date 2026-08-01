import { NextResponse } from "next/server";
import crypto from "crypto";
import { query, queryOne } from "@/lib/db";

function hashPassword(password: string) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json({ error: "Token and password are required" }, { status: 400 });
    }

    const profile = await queryOne("SELECT id FROM profiles WHERE id = $1", [token]);
    if (!profile) {
      return NextResponse.json({ error: "Invalid or expired reset token" }, { status: 400 });
    }

    const passwordHash = hashPassword(password);

    await query("UPDATE profiles SET password_hash = $2 WHERE id = $1", [token, passwordHash]);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Reset password API error:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
