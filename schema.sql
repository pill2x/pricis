-- Upgraded Pricis Schema for Neon DB

-- Profiles & Preferences table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  business_name TEXT,
  phone_number TEXT,
  country TEXT,
  timezone TEXT,
  avatar_url TEXT,
  
  -- Branding Settings (Pro feature)
  brand_logo_url TEXT,
  brand_name TEXT,
  primary_color TEXT DEFAULT '#2563EB',
  secondary_color TEXT DEFAULT '#1E40AF',
  brand_font TEXT DEFAULT 'Inter',
  footer_note TEXT,
  
  -- Account Preferences
  default_currency TEXT DEFAULT 'NGN - Nigerian Naira (₦)',
  default_payment_terms TEXT DEFAULT '50% upfront, 50% on completion',
  default_revision_limit TEXT DEFAULT '2 revisions',
  default_timeline TEXT DEFAULT '4 weeks',
  default_project_start TEXT DEFAULT 'Upon payment',
  default_validity TEXT DEFAULT 'Default validity',
  two_factor_enabled BOOLEAN DEFAULT false,
  
  auto_save_quotes BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Clients directory table
CREATE TABLE IF NOT EXISTS clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  country TEXT,
  relationship TEXT DEFAULT 'New Client',
  business_size TEXT DEFAULT 'Startup',
  urgency TEXT DEFAULT 'Normal',
  comm_style TEXT DEFAULT 'Friendly',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Quotes / Scopes table
CREATE TABLE IF NOT EXISTS quotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
  industry TEXT,
  experience_level TEXT,
  project_description TEXT,
  project_title TEXT,
  deliverables TEXT, -- JSON array stored as text
  timeline TEXT,
  revision_policy TEXT,
  out_of_scope TEXT, -- JSON array stored as text
  price_conservative TEXT,
  price_standard TEXT,
  price_premium TEXT,
  pricing_rationale TEXT,
  selected_tier TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'In Progress', -- 'In Progress', 'Under Review', 'Pending Client', 'Completed', 'Overdue'
  budget NUMERIC(15, 2),
  currency TEXT DEFAULT 'NGN',
  start_date DATE,
  due_date DATE,
  template_used TEXT,
  visibility TEXT DEFAULT 'Private',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Project Tasks table
CREATE TABLE IF NOT EXISTS project_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'Not Started', -- 'Not Started', 'In Progress', 'Under Review', 'Completed', 'Overdue'
  priority TEXT DEFAULT 'Medium', -- 'Low', 'Medium', 'High'
  due_date DATE,
  assignee_name TEXT,
  assignee_avatar TEXT,
  checklist TEXT, -- JSON array of checklist items
  attachments TEXT, -- JSON array of file objects
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Project Milestones table
CREATE TABLE IF NOT EXISTS project_milestones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  status TEXT DEFAULT 'Not Started', -- 'Not Started', 'In Progress', 'Completed'
  due_date DATE,
  progress_percent INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Proposals table
CREATE TABLE IF NOT EXISTS proposals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  scope_id UUID REFERENCES quotes(id) ON DELETE SET NULL,
  client_name TEXT NOT NULL,
  project_title TEXT NOT NULL,
  amount NUMERIC(15, 2),
  status TEXT DEFAULT 'Sent', -- 'Opened', 'Reviewing', 'Signed', 'Sent', 'Expired'
  open_count INT DEFAULT 0,
  time_spent TEXT DEFAULT '0s',
  avg_time TEXT DEFAULT '0s',
  timeline TEXT,
  valid_until DATE,
  intro_message TEXT,
  payment_terms TEXT,
  attachments TEXT, -- JSON array of file objects
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Invoices table
CREATE TABLE IF NOT EXISTS invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
  invoice_number TEXT NOT NULL,
  amount NUMERIC(15, 2) NOT NULL,
  status TEXT DEFAULT 'Draft', -- 'Paid', 'Sent', 'Viewed', 'Overdue', 'Draft'
  issue_date DATE NOT NULL,
  due_date DATE NOT NULL,
  line_items TEXT NOT NULL, -- JSON string of line items
  payment_instructions TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Custom Scope Templates table
CREATE TABLE IF NOT EXISTS templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  visibility TEXT DEFAULT 'private', -- 'private', 'public'
  price_type TEXT DEFAULT 'free', -- 'free', 'pro'
  outline_content TEXT, -- JSON structure of scope outline sections
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Negotiations strategy table
CREATE TABLE IF NOT EXISTS negotiations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT,
  mode TEXT, -- 'coach', 'analyze', 'draft', 'roleplay'
  context TEXT,
  status TEXT DEFAULT 'Active', -- 'Active', 'Resolved', 'Practice'
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Negotiation messages table
CREATE TABLE IF NOT EXISTS negotiation_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  negotiation_id UUID NOT NULL REFERENCES negotiations(id) ON DELETE CASCADE,
  role TEXT NOT NULL, -- 'user', 'kova'
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes for performance optimization
CREATE INDEX IF NOT EXISTS idx_clients_user_id ON clients(user_id);
CREATE INDEX IF NOT EXISTS idx_quotes_user_id ON quotes(user_id);
CREATE INDEX IF NOT EXISTS idx_projects_user_id ON projects(user_id);
CREATE INDEX IF NOT EXISTS idx_project_tasks_project_id ON project_tasks(project_id);
CREATE INDEX IF NOT EXISTS idx_project_milestones_project_id ON project_milestones(project_id);
CREATE INDEX IF NOT EXISTS idx_proposals_user_id ON proposals(user_id);
CREATE INDEX IF NOT EXISTS idx_invoices_user_id ON invoices(user_id);
CREATE INDEX IF NOT EXISTS idx_templates_user_id ON templates(user_id);
CREATE INDEX IF NOT EXISTS idx_negotiations_user_id ON negotiations(user_id);
CREATE INDEX IF NOT EXISTS idx_negotiation_messages_negotiation_id ON negotiation_messages(negotiation_id);

-- Waitlist submissions table
CREATE TABLE IF NOT EXISTS waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  role TEXT DEFAULT 'Freelancer',
  referral_code TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);

