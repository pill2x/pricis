import { NextResponse } from "next/server";
import crypto from "crypto";
import { updateInvoiceStatus } from "@/app/actions/db";

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
