import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabaseUrl  = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Skip auth check during build or when env vars are missing
  if (supabaseUrl && supabaseAnon) {
    const cookieStore = await cookies()
    const supabase = createServerClient(supabaseUrl, supabaseAnon, {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: () => {},
      },
    })
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) redirect('/login')
  }

  return <>{children}</>
}
