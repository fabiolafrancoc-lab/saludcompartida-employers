import { createClient } from '@supabase/supabase-js'

// Lazy initialization — only creates client when first called, not at module load
// This prevents build errors when env vars are not available during static analysis
let _supabaseAdmin: ReturnType<typeof createClient> | null = null

export function getSupabaseAdmin() {
  if (_supabaseAdmin) return _supabaseAdmin
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) throw new Error('Missing Supabase environment variables')
  _supabaseAdmin = createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false }
  })
  return _supabaseAdmin
}

// Keep backward compat — proxy to lazy getter
export const supabaseAdmin = new Proxy({} as ReturnType<typeof createClient>, {
  get(_target, prop) {
    return (getSupabaseAdmin() as any)[prop]
  }
})

export function validateApiKey(request: Request): boolean {
  const authHeader = request.headers.get('authorization')
  if (!authHeader) return false
  const token = authHeader.replace('Bearer ', '').trim()
  return token === process.env.EMPLOYER_API_SECRET
}
