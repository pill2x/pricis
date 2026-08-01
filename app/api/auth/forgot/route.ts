import { NextResponse } from "next/server";
import { queryOne } from "@/lib/db";
import { sendEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const profile = await queryOne("SELECT id, email, full_name FROM profiles WHERE email = $1", [email]);
    if (!profile) {
      // Return 200 success to avoid email harvesting user enumeration
      return NextResponse.json({ success: true });
    }

    const userId = (profile as any).id;
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const resetUrl = `${appUrl}/reset-password?token=${userId}`;

    await sendEmail({
      to: email,
      subject: "Reset Your Pricis Password",
      html: `
        <div style="font-family: sans-serif; padding: 24px; color: #1e293b;">
          <h2>Password Reset Request</h2>
          <p>Hello ${ (profile as any).full_name || "there" },</p>
          <p>We received a request to reset your password. Click the button below to set a new password:</p>
          <a href="${resetUrl}" style="display: inline-block; background-color: #2563eb; color: #ffffff; padding: 12px 24px; border-radius: 9999px; text-decoration: none; font-weight: bold; margin: 16px 0;">Reset Password</a>
          <p>If you didn't request this, you can safely ignore this email.</p>
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
          <p style="font-size: 11px; color: #64748b;">Powered by Pricis</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Forgot password API error:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
