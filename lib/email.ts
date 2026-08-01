export interface EmailPayload {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail(payload: EmailPayload) {
  const BREVO_API_KEY = process.env.BREVO_API_KEY;
  
  if (!BREVO_API_KEY) {
    console.warn("Email simulation: BREVO_API_KEY is not defined. Logging email body to console.");
    console.log(`[SIMULATING EMAIL] To: ${payload.to} | Subject: ${payload.subject}`);
    console.log(`[CONTENT]:\n${payload.html}\n`);
    return { success: true, simulated: true };
  }

  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": BREVO_API_KEY,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        sender: {
          name: "Pricis",
          email: process.env.SENDER_EMAIL || "notifications@pricis.co",
        },
        to: [
          {
            email: payload.to,
          },
        ],
        subject: payload.subject,
        htmlContent: payload.html,
      }),
    });

    const data = await response.json();
    console.log(`[BREVO API STATUS]: ${response.status}`);
    console.log(`[BREVO API RESPONSE]:`, JSON.stringify(data));

    if (!response.ok) {
      throw new Error(data.message || `Failed to send email via Brevo (Status: ${response.status})`);
    }

    return { success: true, data };
  } catch (error) {
    console.error("Email dispatch error:", error);
    return { success: false, error };
  }
}
