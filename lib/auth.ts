import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

export type PortalRole = 'sc_admin' | 'peo_admin' | 'employer_hr'

export interface PortalUser {
  auth_user_id: string
  role: PortalRole
  peo_id: string | null
  policy_id: string | null
  full_name: string | null
  email: string | null
}
