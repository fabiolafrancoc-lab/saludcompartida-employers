import { createBrowserClient } from '@supabase/ssr'

// Fallback placeholders prevent build errors when env vars aren't set yet.
// Real values required at runtime — add them in Vercel environment variables.
const SUPABASE_URL  = process.env.NEXT_PUBLIC_SUPABASE_URL  || 'https://placeholder.supabase.co'
const SUPABASE_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key'

export function createClient() {
  return createBrowserClient(SUPABASE_URL, SUPABASE_ANON)
}

export type PortalRole = 'sc_admin' | 'peo_admin' | 'employer_hr' | 'employee'

export interface PortalUser {
  auth_user_id: string
  role: PortalRole
  peo_id: string | null
  policy_id: string | null
  full_name: string | null
  email: string | null
}
