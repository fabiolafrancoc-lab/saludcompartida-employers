'use client'
import { useState } from 'react'
import { createClient } from '@/lib/auth'
import { useRouter } from 'next/navigation'

export default function ResetPasswordPage() {
  const supabase = createClient()
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (password !== confirm) { setError('Passwords do not match'); return }
    if (password.length < 8) { setError('Password must be at least 8 characters'); return }
    setLoading(true)
    const { error } = await supabase.auth.updateUser({ password })
    if (error) setError(error.message)
    else router.push('/dashboard?reset=success')
    setLoading(false)
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-background-tertiary)' }}>
      <div style={{ background: 'var(--color-background-primary)', border: '0.5px solid var(--color-border-tertiary)', borderRadius: '12px', padding: '2rem', maxWidth: '400px', width: '100%' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '20px', fontWeight: 500, color: 'var(--color-text-primary)', marginBottom: '4px' }}>Set new password</div>
          <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>Choose a strong password of at least 8 characters.</div>
        </div>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '5px' }}>New password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={8} placeholder="Min. 8 characters" style={{ width: '100%' }}/>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '5px' }}>Confirm password</label>
            <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} required placeholder="Repeat password" style={{ width: '100%' }}/>
          </div>
          {error && <div style={{ fontSize: '12px', color: 'var(--color-text-danger)', padding: '8px 10px', background: 'var(--color-background-danger)', borderRadius: '6px' }}>{error}</div>}
          <button type="submit" disabled={loading} style={{ padding: '10px', fontSize: '13px', fontWeight: 500 }}>
            {loading ? 'Updating...' : 'Update password'}
          </button>
        </form>
      </div>
    </div>
  )
}
