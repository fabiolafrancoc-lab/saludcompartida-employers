'use client'
import { useState } from 'react'
import { createClient } from '@/lib/auth'

export default function ForgotPasswordPage() {
  const supabase = createClient()
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })
    setSent(true)
    setLoading(false)
  }

  if (sent) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-background-tertiary)' }}>
        <div style={{ background: 'var(--color-background-primary)', border: '0.5px solid var(--color-border-tertiary)', borderRadius: '12px', padding: '2rem', maxWidth: '400px', width: '100%', textAlign: 'center' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--color-background-success)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 9l4.5 4.5 7.5-9" stroke="var(--color-text-success)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div style={{ fontSize: '16px', fontWeight: 500, marginBottom: '8px', color: 'var(--color-text-primary)' }}>Check your email</div>
          <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
            We sent a password reset link to <strong>{email}</strong>.<br/>The link expires in 1 hour.
          </div>
          <a href="/login" style={{ display: 'block', marginTop: '1.5rem', fontSize: '12px', color: 'var(--color-text-secondary)' }}>Back to sign in</a>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-background-tertiary)' }}>
      <div style={{ background: 'var(--color-background-primary)', border: '0.5px solid var(--color-border-tertiary)', borderRadius: '12px', padding: '2rem', maxWidth: '400px', width: '100%' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '20px', fontWeight: 500, color: 'var(--color-text-primary)', marginBottom: '4px' }}>Reset password</div>
          <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>Enter your email and we'll send you a reset link.</div>
        </div>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '5px' }}>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="you@company.com" style={{ width: '100%' }}/>
          </div>
          <button type="submit" disabled={loading} style={{ padding: '10px', fontSize: '13px', fontWeight: 500 }}>
            {loading ? 'Sending...' : 'Send reset link'}
          </button>
        </form>
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <a href="/login" style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Back to sign in</a>
        </div>
      </div>
    </div>
  )
}
