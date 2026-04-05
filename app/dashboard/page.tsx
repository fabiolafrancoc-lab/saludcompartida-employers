import { redirect } from 'next/navigation'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export default async function DashboardPage() {
  const supabaseUrl  = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (supabaseUrl && supabaseAnon) {
    const cookieStore = await cookies()
    const supabase = createServerClient(supabaseUrl, supabaseAnon, {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: () => {},
      },
    })
    const { data: { user } } = await supabase.auth.getUser()
    if (user) redirect('/dashboard/peo')
  }

  redirect('/login')
}
