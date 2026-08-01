import { NextResponse } from "next/server";
import crypto from "crypto";
import { query, queryOne } from "@/lib/db";
import { cookies } from "next/headers";

function hashPassword(password: string) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

export async function POST(req: Request) {
  try {
    const { email, password, fullName, businessName } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    // Check if user already exists
    const existing = await queryOne("SELECT id FROM profiles WHERE email = $1", [email]);
    if (existing) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const userId = crypto.randomUUID();
    const passwordHash = hashPassword(password);

    // Insert user profile
    await query(
      "INSERT INTO profiles (id, email, password_hash, full_name, business_name) VALUES ($1, $2, $3, $4, $5)",
      [userId, email, passwordHash, fullName || "", businessName || ""]
    );

    // Set cookie session
    cookies().set("pricis_session", userId, {
      path: "/",
      httpOnly: false, // Must be false to let client components check session
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 24 * 60 * 60, // 30 days
    });

    return NextResponse.json({ success: true, userId });
  } catch (error: any) {
    console.error("Signup error:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
