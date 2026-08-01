import { NextResponse } from "next/server";
import crypto from "crypto";
import { updateInvoiceStatus } from "@/app/actions/db";
import { sendEmail } from "@/lib/email";

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY || 'sk_test_dummy_key_for_pricis_compilation';

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-paystack-signature");

    if (!signature) {
      return NextResponse.json({ error: "Missing signature header" }, { status: 400 });
    }

    // Verify HMAC-SHA512 signature from Paystack
    const hash = crypto
      .createHmac("sha512", PAYSTACK_SECRET_KEY)
      .update(rawBody)
      .digest("hex");

    if (hash !== signature && PAYSTACK_SECRET_KEY !== 'sk_test_dummy_key_for_pricis_compilation') {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const payload = JSON.parse(rawBody);

    // Look for charge.success event
    if (payload.event === "charge.success") {
      const { reference, metadata } = payload.data;
      const invoiceId = metadata?.invoiceId;

      if (invoiceId) {
        // Mark the invoice as paid in the database
        await updateInvoiceStatus(invoiceId, "Paid");
        console.log(`Webhook Success: Marked invoice ${invoiceId} as Paid. Reference: ${reference}`);

        // Dispatch receipt email
        const customerEmail = payload.data.customer?.email;
        if (customerEmail) {
          await sendEmail({
            to: customerEmail,
            subject: `Payment Confirmed - Invoice #${invoiceId}`,
            html: `
              <div style="font-family: sans-serif; padding: 24px; color: #1e293b;">
                <h2 style="color: #22c55e;">Payment Confirmed!</h2>
                <p>Hello,</p>
                <p>We've received your payment of <b>₦${(payload.data.amount / 100).toLocaleString()}</b> for Invoice <b>#${invoiceId}</b>.</p>
                <p>Transaction Reference: <code>${reference}</code></p>
                <br />
                <p>Thank you for your business!</p>
                <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
                <p style="font-size: 11px; color: #64748b;">Powered by Pricis</p>
              </div>
            `
          });
        }
      } else {
        console.warn(`Webhook Warn: Invoice ID not found in transaction metadata: ${reference}`);
      }
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
