"use server";

import { query, queryOne } from "@/lib/db";

// 1. Signup / Profiles
export async function insertProfile(id: string, email: string, fullName: string, businessName: string) {
  try {
    await query(
      "INSERT INTO profiles (id, email, full_name, business_name) VALUES ($1, $2, $3, $4)",
      [id, email, fullName, businessName]
    );
    return { success: true, error: null };
  } catch (error: any) {
    return { success: false, error: error.message || "Database query failed" };
  }
}

// 2. Fetch Profile
export async function fetchProfile(userId: string) {
  return await queryOne("SELECT * FROM profiles WHERE id = $1", [userId]);
}

// 3. Save Profile
export async function saveProfile(id: string, email: string, fullName: string, businessName: string) {
  return await query(
    "INSERT INTO profiles (id, email, full_name, business_name) VALUES ($1, $2, $3, $4) ON CONFLICT (id) DO UPDATE SET email = EXCLUDED.email, full_name = EXCLUDED.full_name, business_name = EXCLUDED.business_name",
    [id, email, fullName, businessName]
  );
}

// 4. Fetch Quotes
export async function fetchQuotes(userId: string) {
  return await query("SELECT * FROM quotes WHERE user_id = $1 ORDER BY created_at DESC", [userId]);
}

// 5. Delete Quote
export async function deleteQuote(quoteId: string, userId: string) {
  return await query("DELETE FROM quotes WHERE id = $1 AND user_id = $2", [quoteId, userId]);
}

// 6. Fetch Conversations
export async function fetchConversations(userId: string) {
  return await query("SELECT * FROM negotiations WHERE user_id = $1 ORDER BY created_at DESC", [userId]);
}

// 7. Fetch Messages
export async function fetchMessages(negotiationId: string) {
  return await query("SELECT * FROM negotiation_messages WHERE negotiation_id = $1 ORDER BY created_at ASC", [negotiationId]);
}

// 8. Create Negotiation
export async function createNegotiation(title: string, mode: string, context: string, userId: string) {
  return await queryOne(
    "INSERT INTO negotiations (title, mode, context, user_id) VALUES ($1, $2, $3, $4) RETURNING *",
    [title, mode, context, userId]
  );
}

// 9. Insert Message
export async function insertMessage(negotiationId: string, role: string, content: string) {
  return await query(
    "INSERT INTO negotiation_messages (negotiation_id, role, content) VALUES ($1, $2, $3)",
    [negotiationId, role, content]
  );
}

// 10. Delete Negotiation
export async function deleteNegotiation(negotiationId: string, userId: string) {
  return await query("DELETE FROM negotiations WHERE id = $1 AND user_id = $2", [negotiationId, userId]);
}

// 11. Fetch Auto Save Setting
export async function fetchAutoSaveSetting(userId: string) {
  return await queryOne("SELECT auto_save_quotes FROM profiles WHERE id = $1", [userId]);
}

// 12. Save Quote
export async function saveQuote(
  userId: string,
  industry: string,
  experienceLevel: string,
  projectDescription: string,
  projectTitle: string,
  deliverables: string[],
  timeline: string,
  revisionPolicy: string,
  outOfScope: string[],
  priceConservative: number,
  priceStandard: number,
  pricePremium: number,
  pricingRationale: string,
  selectedTier: string
) {
  return await queryOne(
    `INSERT INTO quotes (
      user_id, industry, experience_level, project_description, project_title,
      deliverables, timeline, revision_policy, out_of_scope, price_conservative,
      price_standard, price_premium, pricing_rationale, selected_tier
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14
    ) RETURNING *`,
    [
      userId, industry, experienceLevel, projectDescription, projectTitle,
      deliverables, timeline, revisionPolicy, outOfScope, priceConservative,
      priceStandard, pricePremium, pricingRationale, selectedTier
    ]
  );
}

// 13. Check Profile Exists
export async function checkProfileExists(email: string) {
  try {
    const user = await queryOne<any>("SELECT * FROM profiles WHERE email = $1", [email]);
    return { success: true, data: user, error: null };
  } catch (error: any) {
    return { success: false, data: null, error: error.message || "Database query failed" };
  }
}

