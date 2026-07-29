export interface EmailPayload {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail(payload: EmailPayload) {
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  
  if (!RESEND_API_KEY) {
    console.warn("Email simulation: RESEND_API_KEY is not defined. Logging email body to console.");
    console.log(`[SIMULATING EMAIL] To: ${payload.to} | Subject: ${payload.subject}`);
    console.log(`[CONTENT]:\n${payload.html}\n`);
    return { success: true, simulated: true };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Pricis <notifications@pricis.co>",
        to: [payload.to],
        subject: payload.subject,
        html: payload.html,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to send email via Resend");
    }

    return { success: true, data };
  } catch (error) {
    console.error("Email dispatch error:", error);
    return { success: false, error };
  }
}
