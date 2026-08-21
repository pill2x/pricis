import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
      console.error("BREVO_API_KEY environment variable is missing.");
      return NextResponse.json(
        { error: "Server configuration error: Brevo API key missing." },
        { status: 500 }
      );
    }

    const response = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "content-type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        email: email.trim().toLowerCase(),
        listIds: [3],
        updateEnabled: true,
      }),
    });

    if (response.ok || response.status === 201 || response.status === 204) {
      const data = response.status !== 204 ? await response.json().catch(() => ({})) : {};
      return NextResponse.json({
        success: true,
        message: "Successfully subscribed to waitlist!",
        data,
      });
    }

    const errorData = await response.json().catch(() => ({}));
    console.error("Brevo API error response:", response.status, errorData);

    return NextResponse.json(
      {
        error: errorData.message || "Failed to add email to Brevo waitlist.",
        code: errorData.code,
      },
      { status: response.status || 500 }
    );
  } catch (error) {
    console.error("Error in /api/subscribe route:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
