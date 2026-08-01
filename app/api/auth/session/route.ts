import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { queryOne } from "@/lib/db";

export async function GET() {
  const sessionCookie = cookies().get("pricis_session");
  if (!sessionCookie || !sessionCookie.value) {
    return NextResponse.json({ session: null });
  }

  try {
    const profile = await queryOne("SELECT id, email, full_name, business_name FROM profiles WHERE id = $1", [sessionCookie.value]);
    if (!profile) {
      return NextResponse.json({ session: null });
    }

    return NextResponse.json({
      session: {
        user: {
          id: (profile as any).id,
          email: (profile as any).email,
          user_metadata: {
            full_name: (profile as any).full_name,
            business_name: (profile as any).business_name,
          }
        }
      }
    });
  } catch (error) {
    return NextResponse.json({ session: null });
  }
}
