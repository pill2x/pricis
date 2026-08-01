import { NextResponse } from "next/server";
import crypto from "crypto";
import { queryOne } from "@/lib/db";
import { cookies } from "next/headers";

function hashPassword(password: string) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    const profile = await queryOne("SELECT * FROM profiles WHERE email = $1", [email]);
    if (!profile) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
    }

    const passwordHash = hashPassword(password);
    if ((profile as any).password_hash !== passwordHash) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
    }

    // Set cookie session
    cookies().set("pricis_session", (profile as any).id, {
      path: "/",
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 24 * 60 * 60, // 30 days
    });

    return NextResponse.json({ success: true, userId: (profile as any).id });
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
