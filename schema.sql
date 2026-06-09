-- Pricis Schema for Neon

-- Profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  business_name TEXT,
  auto_save_quotes BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Quotes table
CREATE TABLE IF NOT EXISTS quotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  industry TEXT,
  experience_level TEXT,
  project_description TEXT,
  project_title TEXT,
  deliverables TEXT,
  timeline TEXT,
  revision_policy TEXT,
  out_of_scope TEXT,
  price_conservative TEXT,
  price_standard TEXT,
  price_premium TEXT,
  pricing_rationale TEXT,
  selected_tier TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Negotiations table
CREATE TABLE IF NOT EXISTS negotiations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT,
  mode TEXT,
  context TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Negotiation messages table
CREATE TABLE IF NOT EXISTS negotiation_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  negotiation_id UUID NOT NULL REFERENCES negotiations(id) ON DELETE CASCADE,
  role TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_quotes_user_id ON quotes(user_id);
CREATE INDEX IF NOT EXISTS idx_negotiations_user_id ON negotiations(user_id);
CREATE INDEX IF NOT EXISTS idx_negotiation_messages_negotiation_id ON negotiation_messages(negotiation_id);
