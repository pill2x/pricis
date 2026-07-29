import { createBrowserClient } from '@supabase/auth-helpers-nextjs'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dummy-supabase-url.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'dummy-supabase-anon-key'

export const supabaseAuth = createBrowserClient(supabaseUrl, supabaseKey)
