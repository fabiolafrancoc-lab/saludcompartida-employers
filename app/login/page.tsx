'use client'
import { useState } from 'react'
import { createClient } from '@/lib/auth'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClient()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleEmailLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError(error.message)
    else router.push('/dashboard')
    setLoading(false)
  }

  async function handleGoogleSSO() {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    })
  }

  async function handleMicrosoftSSO() {
    await supabase.auth.signInWithOAuth({
      provider: 'azure',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    })
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-background-tertiary)' }}>
      <div style={{ background: 'var(--color-background-primary)', border: '0.5px solid var(--color-border-tertiary)', borderRadius: '12px', padding: '2rem', width: '100%', maxWidth: '400px' }}>

        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-text-primary)', marginBottom: '2px' }}>SaludCompartida</div>
          <div style={{ fontSize: '20px', fontWeight: 500, color: 'var(--color-text-primary)', marginBottom: '4px' }}>Employer Portal</div>
          <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>Sign in to your account</div>
        </div>

        {/* SSO buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '1.25rem' }}>
          <button onClick={handleGoogleSSO} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '10px', fontSize: '13px', fontWeight: 500 }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M15.68 8.18c0-.57-.05-1.12-.14-1.64H8v3.1h4.3a3.68 3.68 0 0 1-1.6 2.42v2h2.58c1.51-1.39 2.4-3.44 2.4-5.88z" fill="#4285F4"/>
              <path d="M8 16c2.16 0 3.97-.72 5.3-1.94l-2.59-2a4.8 4.8 0 0 1-7.14-2.52H.97v2.07A8 8 0 0 0 8 16z" fill="#34A853"/>
              <path d="M3.57 9.54A4.8 4.8 0 0 1 3.32 8c0-.54.09-1.06.25-1.54V4.39H.97A8 8 0 0 0 0 8c0 1.3.31 2.52.97 3.61l2.6-2.07z" fill="#FBBC05"/>
              <path d="M8 3.16c1.22 0 2.31.42 3.17 1.24l2.37-2.37A8 8 0 0 0 .97 4.39l2.6 2.07A4.77 4.77 0 0 1 8 3.16z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>
          <button onClick={handleMicrosoftSSO} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '10px', fontSize: '13px', fontWeight: 500 }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="0" y="0" width="7.5" height="7.5" fill="#F25022"/>
              <rect x="8.5" y="0" width="7.5" height="7.5" fill="#7FBA00"/>
              <rect x="0" y="8.5" width="7.5" height="7.5" fill="#00A4EF"/>
              <rect x="8.5" y="8.5" width="7.5" height="7.5" fill="#FFB900"/>
            </svg>
            Continue with Microsoft
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem' }}>
          <div style={{ flex: 1, height: '0.5px', background: 'var(--color-border-tertiary)' }}/>
          <span style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>or email</span>
          <div style={{ flex: 1, height: '0.5px', background: 'var(--color-border-tertiary)' }}/>
        </div>

        <form onSubmit={handleEmailLogin} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '5px' }}>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="you@company.com" style={{ width: '100%' }}/>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '5px' }}>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••" style={{ width: '100%' }}/>
          </div>
          {error && <div style={{ fontSize: '12px', color: 'var(--color-text-danger)', padding: '8px 10px', background: 'var(--color-background-danger)', borderRadius: '6px' }}>{error}</div>}
          <button type="submit" disabled={loading} style={{ padding: '10px', fontSize: '13px', fontWeight: 500, marginTop: '4px' }}>
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <a href="/forgot-password" style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Forgot your password?</a>
        </div>
      </div>
    </div>
  )
}
