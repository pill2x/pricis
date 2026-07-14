"use server";

import { query, queryOne } from "@/lib/db";

// 1. Signup / Profiles
export async function insertProfile(id: string, email: string, fullName: string, businessName: string) {
  return await query(
    "INSERT INTO profiles (id, email, full_name, business_name) VALUES ($1, $2, $3, $4)",
    [id, email, fullName, businessName]
  );
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

// 4. Update Profile Branding (Pro features)
export async function updateBrandingSettings(
  userId: string, 
  brandName: string, 
  logoUrl: string, 
  primaryColor: string, 
  secondaryColor: string, 
  brandFont: string, 
  footerNote: string
) {
  return await query(
    `UPDATE profiles SET 
      brand_name = $2, brand_logo_url = $3, primary_color = $4, 
      secondary_color = $5, brand_font = $6, footer_note = $7 
     WHERE id = $1`,
    [userId, brandName, logoUrl, primaryColor, secondaryColor, brandFont, footerNote]
  );
}

// 5. Update Profile Preferences
export async function updatePreferenceSettings(
  userId: string,
  currency: string,
  paymentTerms: string,
  revisionLimit: string,
  timeline: string,
  projectStart: string,
  validity: string
) {
  return await query(
    `UPDATE profiles SET 
      default_currency = $2, default_payment_terms = $3, default_revision_limit = $4, 
      default_timeline = $5, default_project_start = $6, default_validity = $7 
     WHERE id = $1`,
    [userId, currency, paymentTerms, revisionLimit, timeline, projectStart, validity]
  );
}

// 6. Update Profile Two-Factor setting
export async function updateTwoFactor(userId: string, enabled: boolean) {
  return await query(
    "UPDATE profiles SET two_factor_enabled = $2 WHERE id = $1",
    [userId, enabled]
  );
}

// 7. Fetch Quotes
export async function fetchQuotes(userId: string) {
  return await query("SELECT * FROM quotes WHERE user_id = $1 ORDER BY created_at DESC", [userId]);
}

// 8. Delete Quote
export async function deleteQuote(quoteId: string, userId: string) {
  return await query("DELETE FROM quotes WHERE id = $1 AND user_id = $2", [quoteId, userId]);
}

// 9. Save Quote
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
      JSON.stringify(deliverables), timeline, revisionPolicy, JSON.stringify(outOfScope), priceConservative,
      priceStandard, pricePremium, pricingRationale, selectedTier
    ]
  );
}

// 10. Fetch Conversations
export async function fetchConversations(userId: string) {
  return await query("SELECT * FROM negotiations WHERE user_id = $1 ORDER BY created_at DESC", [userId]);
}

// 11. Fetch Messages
export async function fetchMessages(negotiationId: string) {
  return await query("SELECT * FROM negotiation_messages WHERE negotiation_id = $1 ORDER BY created_at ASC", [negotiationId]);
}

// 12. Create Negotiation
export async function createNegotiation(title: string, mode: string, context: string, userId: string) {
  return await queryOne(
    "INSERT INTO negotiations (title, mode, context, user_id) VALUES ($1, $2, $3, $4) RETURNING *",
    [title, mode, context, userId]
  );
}

// 13. Insert Message
export async function insertMessage(negotiationId: string, role: string, content: string) {
  return await query(
    "INSERT INTO negotiation_messages (negotiation_id, role, content) VALUES ($1, $2, $3)",
    [negotiationId, role, content]
  );
}

// 14. Delete Negotiation
export async function deleteNegotiation(negotiationId: string, userId: string) {
  return await query("DELETE FROM negotiations WHERE id = $1 AND user_id = $2", [negotiationId, userId]);
}

// 15. Fetch Auto Save Setting
export async function fetchAutoSaveSetting(userId: string) {
  return await queryOne("SELECT auto_save_quotes FROM profiles WHERE id = $1", [userId]);
}


// --- NEW SCREEN ENTITIES SERVER ACTIONS ---

// 16. Clients Actions
export async function createClient(userId: string, name: string, email: string, phone?: string, country?: string, relationship?: string, businessSize?: string, urgency?: string, commStyle?: string) {
  return await queryOne(
    `INSERT INTO clients (user_id, name, email, phone, country, relationship, business_size, urgency, comm_style) 
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
    [userId, name, email, phone || null, country || null, relationship || 'New Client', businessSize || 'Startup', urgency || 'Normal', commStyle || 'Friendly']
  );
}

export async function fetchClients(userId: string) {
  return await query("SELECT * FROM clients WHERE user_id = $1 ORDER BY created_at DESC", [userId]);
}

export async function deleteClient(clientId: string, userId: string) {
  return await query("DELETE FROM clients WHERE id = $1 AND user_id = $2", [clientId, userId]);
}

// 17. Projects Actions
export async function createProject(userId: string, clientId: string | null, title: string, description: string, budget: number, currency: string, startDate: string, dueDate: string, templateUsed?: string, visibility?: string) {
  return await queryOne(
    `INSERT INTO projects (user_id, client_id, title, description, budget, currency, start_date, due_date, template_used, visibility) 
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
    [userId, clientId, title, description, budget, currency, startDate, dueDate, templateUsed || null, visibility || 'Private']
  );
}

export async function fetchProjects(userId: string) {
  return await query("SELECT * FROM projects WHERE user_id = $1 ORDER BY created_at DESC", [userId]);
}

export async function deleteProject(projectId: string, userId: string) {
  return await query("DELETE FROM projects WHERE id = $1 AND user_id = $2", [projectId, userId]);
}

export async function updateProjectStatus(projectId: string, status: string) {
  return await query("UPDATE projects SET status = $2 WHERE id = $1", [projectId, status]);
}

// 18. Project Tasks Actions
export async function createTask(projectId: string, name: string, description: string, priority: string, dueDate: string, assigneeName?: string, assigneeAvatar?: string, checklist?: string[], attachments?: string[]) {
  return await queryOne(
    `INSERT INTO project_tasks (project_id, name, description, priority, due_date, assignee_name, assignee_avatar, checklist, attachments) 
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
    [projectId, name, description, priority, dueDate, assigneeName || null, assigneeAvatar || null, JSON.stringify(checklist || []), JSON.stringify(attachments || [])]
  );
}

export async function fetchTasks(projectId: string) {
  return await query("SELECT * FROM project_tasks WHERE project_id = $1 ORDER BY created_at DESC", [projectId]);
}

export async function updateTaskStatus(taskId: string, status: string) {
  return await query("UPDATE project_tasks SET status = $2 WHERE id = $1", [taskId, status]);
}

// 19. Project Milestones Actions
export async function createMilestone(projectId: string, title: string, dueDate: string, progressPercent: number) {
  return await queryOne(
    `INSERT INTO project_milestones (project_id, title, due_date, progress_percent) 
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [projectId, title, dueDate, progressPercent]
  );
}

export async function fetchMilestones(projectId: string) {
  return await query("SELECT * FROM project_milestones WHERE project_id = $1 ORDER BY due_date ASC", [projectId]);
}

export async function updateMilestoneStatus(milestoneId: string, status: string, progressPercent: number) {
  return await query("UPDATE project_milestones SET status = $2, progress_percent = $3 WHERE id = $1", [milestoneId, status, progressPercent]);
}

// 20. Proposals Actions
export async function createProposal(userId: string, scopeId: string | null, clientName: string, projectTitle: string, amount: number, timeline: string, validUntil: string, introMessage: string, paymentTerms: string, attachments?: string[]) {
  return await queryOne(
    `INSERT INTO proposals (user_id, scope_id, client_name, project_title, amount, timeline, valid_until, intro_message, payment_terms, attachments) 
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
    [userId, scopeId, clientName, projectTitle, amount, timeline, validUntil, introMessage, paymentTerms, JSON.stringify(attachments || [])]
  );
}

export async function fetchProposals(userId: string) {
  return await query("SELECT * FROM proposals WHERE user_id = $1 ORDER BY created_at DESC", [userId]);
}

export async function updateProposalStatus(proposalId: string, status: string) {
  return await query("UPDATE proposals SET status = $2 WHERE id = $1", [proposalId, status]);
}

// 21. Invoices Actions
export async function createInvoice(userId: string, clientId: string | null, invoiceNumber: string, amount: number, issueDate: string, dueDate: string, lineItems: string, paymentInstructions?: string) {
  return await queryOne(
    `INSERT INTO invoices (user_id, client_id, invoice_number, amount, issue_date, due_date, line_items, payment_instructions) 
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
    [userId, clientId, invoiceNumber, amount, issueDate, dueDate, lineItems, paymentInstructions || null]
  );
}

export async function fetchInvoices(userId: string) {
  return await query("SELECT * FROM invoices WHERE user_id = $1 ORDER BY created_at DESC", [userId]);
}

export async function updateInvoiceStatus(invoiceId: string, status: string) {
  return await query("UPDATE invoices SET status = $2 WHERE id = $1", [invoiceId, status]);
}

// 22. Templates Actions
export async function createTemplate(userId: string, title: string, category: string, description: string, visibility: string, priceType: string, outlineContent: string) {
  return await queryOne(
    `INSERT INTO templates (user_id, title, category, description, visibility, price_type, outline_content) 
     VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    [userId, title, category, description, visibility, priceType, outlineContent]
  );
}

export async function fetchTemplates(userId: string) {
  return await query("SELECT * FROM templates WHERE user_id = $1 ORDER BY created_at DESC", [userId]);
}

export async function deleteTemplate(templateId: string, userId: string) {
  return await query("DELETE FROM templates WHERE id = $1 AND user_id = $2", [templateId, userId]);
}
