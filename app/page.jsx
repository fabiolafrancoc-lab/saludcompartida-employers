'use client'
import { useState } from 'react'
import { useLang } from '@/contexts/LanguageContext'
import { translations as T, t } from '@/lib/translations'
import Hero          from '@/components/sections/Hero'
import TheProblem    from '@/components/sections/TheProblem'
import HowItWorks    from '@/components/sections/HowItWorks'
import Benefits      from '@/components/sections/Benefits'
import PaymentModels from '@/components/sections/PaymentModels'
import AboutUs       from '@/components/sections/AboutUs'
import FAQ           from '@/components/sections/FAQ'
import Carlos        from '@/components/sections/Carlos'
import TheImpact     from '@/components/sections/TheImpact'

const SECTIONS = [
  { id: 'inicio',      icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { id: 'carlos',      icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
  { id: 'problema',    icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' },
  { id: 'como',        icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
  { id: 'beneficios',  icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
  { id: 'impacto',      icon: 'M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { id: 'modalidades', icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' },
  { id: 'nosotros',    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
  { id: 'faq',         icon: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
]

const NAV_LABELS = {
  inicio:      { es: 'Inicio',        en: 'Home' },
  carlos:      { es: 'Carlos',        en: 'Carlos' },
  problema:    { es: 'El Problema',   en: 'The Problem' },
  como:        { es: 'Cómo funciona', en: 'How it works' },
  beneficios:  { es: 'Beneficios',    en: 'Benefits' },
  impacto:      { es: 'Impacto',       en: 'Impact' },
  modalidades: { es: 'Modalidades',   en: 'Plans' },
  nosotros:    { es: 'Quiénes somos', en: 'About us' },
  faq:         { es: 'FAQ',           en: 'FAQ' },
}

// Accent colors per section for visual differentiation
const NAV_ACCENTS = {
  inicio:      'var(--navy)',
  carlos:      'var(--teal)',
  problema:    'var(--loss)',
  como:        'var(--teal)',
  beneficios:  'var(--emerald)',
  impacto:      'var(--emerald)',
  modalidades: 'var(--navy)',
  nosotros:    'var(--amber)',
  faq:         'var(--teal)',
}

export default function HomePage() {
  const [active, setActive]       = useState('inicio')
  const [collapsed, setCollapsed] = useState(false)
  const { lang, setLang }         = useLang()

  const sidebarW = collapsed ? 64 : 248

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F3F4F6' }}>

      {/* ── SIDEBAR ── */}
      <aside style={{
        width: sidebarW, flexShrink: 0,
        background: 'var(--white)',
        borderRight: '1px solid var(--border)',
        display: 'flex', flexDirection: 'column',
        transition: 'width .25s ease',
        position: 'sticky', top: 0, height: '100vh',
        overflow: 'hidden',
        boxShadow: '2px 0 8px rgba(0,0,0,0.04)',
      }}>

        {/* Logo */}
        <div style={{ padding: collapsed ? '20px 12px' : '20px 18px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, var(--navy), var(--teal))', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <path d="M10 2C7 2 4 5.2 4 8.8c0 5 6 9.2 6 9.2s6-4.2 6-9.2C16 5.2 13 2 10 2z" fill="white" opacity="0.9"/>
                <circle cx="10" cy="8.5" r="2.8" fill="white"/>
              </svg>
            </div>
            {!collapsed && (
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, color: 'var(--ink)', lineHeight: 1.1, whiteSpace: 'nowrap' }}>SaludCompartida</div>
                <div style={{ fontSize: 9, color: 'var(--teal)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>For Employers</div>
              </div>
            )}
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '12px 8px', display: 'flex', flexDirection: 'column', gap: 2 }}>
          {SECTIONS.map(({ id, icon }) => {
            const isActive = active === id
            const accent = NAV_ACCENTS[id]
            return (
              <button key={id} onClick={() => setActive(id)}
                title={collapsed ? t(NAV_LABELS[id], lang) : undefined}
                style={{
                  display: 'flex', alignItems: 'center',
                  gap: collapsed ? 0 : 10,
                  justifyContent: collapsed ? 'center' : 'flex-start',
                  padding: collapsed ? '10px 0' : '9px 12px',
                  borderRadius: 8, border: 'none', cursor: 'pointer',
                  background: isActive ? `${accent}15` : 'transparent',
                  transition: 'background .12s',
                  width: '100%', textAlign: 'left',
                }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = '#F9FAFB' }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent' }}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
                  stroke={isActive ? accent : 'var(--muted)'}
                  strokeWidth={isActive ? '2' : '1.5'}
                  strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <path d={icon}/>
                </svg>
                {!collapsed && (
                  <span style={{ fontSize: 13, fontWeight: isActive ? 600 : 400, color: isActive ? accent : 'var(--body)', whiteSpace: 'nowrap' }}>
                    {t(NAV_LABELS[id], lang)}
                  </span>
                )}
                {isActive && !collapsed && (
                  <div style={{ marginLeft: 'auto', width: 5, height: 5, borderRadius: '50%', background: accent, flexShrink: 0 }}/>
                )}
              </button>
            )
          })}
        </nav>

        {/* Bottom controls */}
        <div style={{ padding: '12px 8px', borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {!collapsed && (
            <div style={{ display: 'flex', gap: 4 }}>
              {['es','en'].map(l => (
                <button key={l} onClick={() => setLang(l)} style={{
                  flex: 1, padding: '6px 0', borderRadius: 6, border: '1px solid var(--border)',
                  cursor: 'pointer', fontSize: 11, fontWeight: 600,
                  letterSpacing: '0.06em', textTransform: 'uppercase',
                  background: lang === l ? 'var(--navy)' : 'var(--white)',
                  color: lang === l ? 'white' : 'var(--muted)',
                  transition: 'all .12s',
                }}>
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          )}
          <a href="/dashboard" style={{
            display: 'flex', alignItems: 'center',
            justifyContent: 'center',
            gap: 6, padding: '9px 12px',
            background: 'var(--navy)', borderRadius: 8,
            color: 'white', fontSize: 12, fontWeight: 600,
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
              <rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/>
            </svg>
            {!collapsed && <span>Portal</span>}
          </a>
          <button onClick={() => setCollapsed(!collapsed)} style={{
            padding: '7px', borderRadius: 6, border: '1px solid var(--border)',
            background: 'var(--white)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--muted)',
          }} title={collapsed ? 'Expand' : 'Collapse'}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d={collapsed ? 'M9 18l6-6-6-6' : 'M15 18l-6-6 6-6'}/>
            </svg>
          </button>
        </div>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflow: 'auto' }}>

        {/* Top bar */}
        <div style={{
          background: 'var(--white)', borderBottom: '1px solid var(--border)',
          padding: '0 40px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          height: 56, flexShrink: 0,
          position: 'sticky', top: 0, zIndex: 40,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 12, color: 'var(--muted)' }}>saludcompartida.ai</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 3l4 4-4 4" stroke="var(--border)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span style={{ fontSize: 13, fontWeight: 600, color: NAV_ACCENTS[active] }}>{t(NAV_LABELS[active], lang)}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ display: 'flex', gap: 6 }}>
              {['PEO', lang === 'es' ? 'RRHH' : 'HR', 'Risk'].map(label => (
                <span key={label} style={{ fontSize: 10, fontWeight: 600, color: 'var(--teal)', background: 'var(--teal-light)', padding: '2px 8px', borderRadius: 100 }}>
                  {label}
                </span>
              ))}
            </div>
            <a href="/login" style={{ fontSize: 13, color: 'var(--muted)', fontWeight: 500 }}>
              {lang === 'es' ? 'Iniciar sesión' : 'Sign in'}
            </a>
          </div>
        </div>

        {/* Section */}
        <div key={active} style={{ flex: 1, animation: 'fadeUp .25s ease' }}>
          {active === 'inicio'      && <Hero />}
          {active === 'carlos'      && <Carlos />}
          {active === 'problema'    && <TheProblem />}
          {active === 'como'        && <HowItWorks />}
          {active === 'beneficios'  && <Benefits />}
          {active === 'impacto'      && <TheImpact />}
          {active === 'modalidades' && <PaymentModels />}
          {active === 'nosotros'    && <AboutUs />}
          {active === 'faq'         && <FAQ />}
        </div>

        <footer style={{ background: 'var(--ink)', color: 'rgba(255,255,255,0.5)', padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, flexShrink: 0 }}>
          <span>© 2026 Tech Solution Services FVR LLC · Florida</span>
          <div style={{ display: 'flex', gap: 20 }}>
            {['saludcompartida.com','saludcompartida.app'].map(d => (
              <a key={d} href={`https://${d}`} style={{ color: 'rgba(255,255,255,0.4)' }}>{d}</a>
            ))}
          </div>
        </footer>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  )
}
