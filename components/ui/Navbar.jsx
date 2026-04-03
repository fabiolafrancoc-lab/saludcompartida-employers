'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const NAV_LINKS = [
  { label: 'Cómo funciona', href: '#como' },
  { label: 'Beneficios',    href: '#beneficios' },
  { label: 'Modalidades',   href: '#modalidades' },
  { label: 'Quiénes somos', href: '#nosotros' },
  { label: 'FAQ',           href: '#faq' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'rgba(255,255,255,0.96)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border)',
    }}>
      <div style={{
        maxWidth: 'var(--max-w)', margin: '0 auto', padding: '0 5%',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: 70,
      }}>

        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 38, height: 38, borderRadius: 10,
            background: 'linear-gradient(135deg, var(--clarity), var(--action))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 2C7 2 4 5.2 4 8.8c0 5 6 9.2 6 9.2s6-4.2 6-9.2C16 5.2 13 2 10 2z" fill="white" opacity="0.9"/>
              <circle cx="10" cy="8.5" r="2.8" fill="white"/>
            </svg>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--ink)', lineHeight: 1.1 }}>
              SaludCompartida
            </div>
            <div style={{ fontSize: 10, color: 'var(--clarity)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              For Employers
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              style={{ fontSize: 14, color: 'var(--muted)', fontWeight: 500, transition: 'color .2s' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--clarity)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
            >
              {label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link
            href="/login"
            style={{ fontSize: 14, color: 'var(--body)', fontWeight: 500 }}
          >
            Iniciar sesión
          </Link>
          <Link
            href="/dashboard"
            style={{
              background: 'var(--trust)',
              color: 'white',
              padding: '10px 22px',
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              transition: 'background .2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--clarity)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--trust)'}
          >
            Acceder al Portal
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>
    </nav>
  )
}
