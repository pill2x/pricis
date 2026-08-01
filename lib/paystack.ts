const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY || 'sk_test_dummy_key_for_pricis_compilation';

interface InitializePayload {
  email: string;
  amount: number; // in kobo (e.g., 5000 Naira = 500000 kobo)
  callback_url?: string;
  metadata?: any;
}

export async function initializePaystackTransaction(payload: InitializePayload) {
  try {
    const response = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: payload.email,
        amount: payload.amount,
        callback_url: payload.callback_url,
        metadata: payload.metadata,
      }),
    });

    const data = await response.json();
    if (!response.ok || !data.status) {
      throw new Error(data.message || 'Failed to initialize Paystack transaction');
    }

    return {
      authorization_url: data.data.authorization_url,
      access_code: data.data.access_code,
      reference: data.data.reference,
    };
  } catch (error) {
    console.error('Paystack initialization error:', error);
    throw error;
  }
}

export async function verifyPaystackTransaction(reference: string) {
  try {
    const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
      },
    });

    const data = await response.json();
    if (!response.ok || !data.status) {
      throw new Error(data.message || 'Failed to verify Paystack transaction');
    }

    return data.data; // Returns object with status: 'success' | 'failed' | 'ongoing', etc.
  } catch (error) {
    console.error('Paystack verification error:', error);
    throw error;
  }
}
