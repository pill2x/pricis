import { NextResponse } from "next/server";
import crypto from "crypto";
import { query, queryOne } from "@/lib/db";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const email = "google_user@pricis.co";
    const profile = await queryOne("SELECT * FROM profiles WHERE email = $1", [email]);

    let userId;
    if (!profile) {
      userId = crypto.randomUUID();
      await query(
        "INSERT INTO profiles (id, email, password_hash, full_name, business_name) VALUES ($1, $2, $3, $4, $5)",
        [userId, email, "google-oauth-placeholder", "Google Tester", "Google Studio"]
      );
    } else {
      userId = (profile as any).id;
    }

    // Set cookie session
    cookies().set("pricis_session", userId, {
      path: "/",
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 24 * 60 * 60, // 30 days
    });

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    return NextResponse.redirect(new URL("/dashboard", appUrl));
  } catch (error) {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    return NextResponse.redirect(new URL("/login?error=Google auth failed", appUrl));
  }
}
