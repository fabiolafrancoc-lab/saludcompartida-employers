'use client'

export const dynamic = 'force-dynamic'


import { useState } from 'react'
import { createClient } from '@/lib/auth'

export default function ChangePasswordPage() {
  const supabase = createClient()
  const [current, setCurrent] = useState('')
  const [newPwd, setNewPwd] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSuccess(false)
    if (newPwd !== confirm) { setError('New passwords do not match'); return }
    if (newPwd.length < 8) { setError('Password must be at least 8 characters'); return }
    setLoading(true)

    // Re-authenticate with current password first
    const { data: { user } } = await supabase.auth.getUser()
    if (!user?.email) { setError('Session expired. Please sign in again.'); setLoading(false); return }

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: current,
    })
    if (signInError) { setError('Current password is incorrect'); setLoading(false); return }

    // Update to new password
    const { error: updateError } = await supabase.auth.updateUser({ password: newPwd })
    if (updateError) setError(updateError.message)
    else { setSuccess(true); setCurrent(''); setNewPwd(''); setConfirm('') }
    setLoading(false)
  }

  return (
    <div style={{ maxWidth: '440px' }}>
      <div style={{ fontSize: '16px', fontWeight: 500, color: 'var(--color-text-primary)', marginBottom: '4px' }}>Change password</div>
      <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>
        Update your password. You'll stay logged in on this device.
      </div>

      {success && (
        <div style={{ fontSize: '13px', color: 'var(--color-text-success)', padding: '10px 12px', background: 'var(--color-background-success)', borderRadius: '8px', marginBottom: '1rem' }}>
          Password updated successfully.
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '5px' }}>Current password</label>
          <input type="password" value={current} onChange={e => setCurrent(e.target.value)} required placeholder="Your current password" style={{ width: '100%' }}/>
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '5px' }}>New password</label>
          <input type="password" value={newPwd} onChange={e => setNewPwd(e.target.value)} required minLength={8} placeholder="Min. 8 characters" style={{ width: '100%' }}/>
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '5px' }}>Confirm new password</label>
          <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} required placeholder="Repeat new password" style={{ width: '100%' }}/>
        </div>
        {error && <div style={{ fontSize: '12px', color: 'var(--color-text-danger)', padding: '8px 10px', background: 'var(--color-background-danger)', borderRadius: '6px' }}>{error}</div>}
        <button type="submit" disabled={loading} style={{ padding: '10px', fontSize: '13px', fontWeight: 500 }}>
          {loading ? 'Updating...' : 'Update password'}
        </button>
      </form>
    </div>
  )
}
