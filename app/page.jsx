'use client'
import { useState, useEffect, useRef } from 'react'
import { useLang } from '@/contexts/LanguageContext'
import { translations as T, t } from '@/lib/translations'
import {
  IconInicio, IconProblema, IconComo, IconBeneficios,
  IconImpacto, IconModalidades, IconNosotros, IconFAQ,
  IconPortal, IconCarlos, SCLogoMark,
} from '@/components/icons/SCIcons'
import Hero          from '@/components/sections/Hero'
import TheProblem    from '@/components/sections/TheProblem'
import HowItWorks    from '@/components/sections/HowItWorks'
import Benefits      from '@/components/sections/Benefits'
import TheImpact     from '@/components/sections/TheImpact'
import PaymentModels from '@/components/sections/PaymentModels'
import AboutUs       from '@/components/sections/AboutUs'
import FAQ           from '@/components/sections/FAQ'
import VideoBreak    from '@/components/sections/VideoBreak'
import Carlos        from '@/components/sections/Carlos'

const SECTIONS = [
  { id: 'inicio',      Icon: IconInicio },
  { id: 'problema',    Icon: IconProblema },
  { id: 'carlos',      Icon: IconCarlos },
  { id: 'beneficios',  Icon: IconBeneficios },
  { id: 'como',        Icon: IconComo },
  { id: 'modalidades', Icon: IconModalidades },
  { id: 'impacto',     Icon: IconImpacto },
  { id: 'nosotros',    Icon: IconNosotros },
  { id: 'faq',         Icon: IconFAQ },
]

const NAV_LABELS = {
  inicio:      { es: 'Inicio',        en: 'Home' },
  problema:    { es: 'El Problema',   en: 'The Problem' },
  carlos:      { es: 'Historia de Carlos', en: 'Carlos\'s Story' },
  como:        { es: 'Cómo se enrola', en: 'How to enroll' },
  beneficios:  { es: 'Beneficios',    en: 'Benefits' },
  impacto:     { es: 'Impacto',       en: 'Impact' },
  modalidades: { es: 'Modalidades',   en: 'Plans' },
  nosotros:    { es: 'Quiénes somos', en: 'About us' },
  faq:         { es: 'FAQ',           en: 'FAQ' },
}

const NAV_ACCENTS = {
  inicio:      '#0F3460',
  problema:    '#DC2626',
  carlos:      '#D97706',
  como:        '#0891B2',
  beneficios:  '#059669',
  impacto:     '#006847',
  modalidades: '#0F3460',
  nosotros:    '#D97706',
  faq:         '#0891B2',
}

export default function HomePage() {
  const [active, setActive]       = useState('inicio')
  const [collapsed, setCollapsed] = useState(false)
  const { lang, setLang }         = useLang()
  const mainRef = useRef(null)

  // Scroll to top of content area on every section change
  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [active])

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F3F4F6' }}>

      {/* ── SIDEBAR ── */}
      <aside style={{
        width: collapsed ? 64 : 248, flexShrink: 0,
        background: 'var(--white)',
        borderRight: '1px solid var(--border)',
        display: 'flex', flexDirection: 'column',
        transition: 'width .25s ease',
        position: 'sticky', top: 0, height: '100vh',
        overflow: 'hidden',
        boxShadow: '2px 0 8px rgba(0,0,0,0.04)',
      }}>

        {/* Logo */}
        <div style={{ padding: collapsed ? '18px 14px' : '18px 18px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ flexShrink: 0 }}>
              <SCLogoMark size={36} />
            </div>
            {!collapsed && (
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, color: 'var(--ink)', lineHeight: 1.1, whiteSpace: 'nowrap' }}>
                  SaludCompartida
                </div>
                <div style={{ fontSize: 9, color: 'var(--teal)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  For Employers
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '10px 8px', display: 'flex', flexDirection: 'column', gap: 2 }}>
          {SECTIONS.map(({ id, Icon }) => {
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
                  background: isActive ? `${accent}18` : 'transparent',
                  transition: 'background .12s',
                  width: '100%', textAlign: 'left',
                }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = '#F9FAFB' }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent' }}
              >
                <Icon size={18} color={isActive ? accent : '#9CA3AF'} strokeWidth={isActive ? 2 : 1.5} />
                {!collapsed && (
                  <span style={{ fontSize: 13, fontWeight: isActive ? 600 : 400, color: isActive ? accent : 'var(--body)', whiteSpace: 'nowrap' }}>
                    {t(NAV_LABELS[id], lang)}
                  </span>
                )}
                {isActive && !collapsed && (
                  <div style={{ marginLeft: 'auto', width: 5, height: 5, borderRadius: '50%', background: accent, flexShrink: 0 }} />
                )}
              </button>
            )
          })}
        </nav>

        {/* Bottom */}
        <div style={{ padding: '10px 8px', borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {!collapsed && (
            <div style={{ display: 'flex', gap: 4 }}>
              {['es','en'].map(l => (
                <button key={l} onClick={() => setLang(l)} style={{
                  flex: 1, padding: '6px 0', borderRadius: 6,
                  border: '1px solid var(--border)', cursor: 'pointer',
                  fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase',
                  background: lang === l ? 'var(--navy)' : 'var(--white)',
                  color: lang === l ? 'white' : 'var(--muted)',
                  transition: 'all .12s',
                }}>{l.toUpperCase()}</button>
              ))}
            </div>
          )}

          {/* Portal CTA */}
          <a href="/dashboard" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
            padding: '9px 12px', background: 'var(--navy)', borderRadius: 8,
            color: 'white', fontSize: 12, fontWeight: 600,
            transition: 'background .15s',
          }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--teal)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--navy)'}
          >
            <IconPortal size={15} color="white" strokeWidth={1.5} />
            {!collapsed && <span>Portal</span>}
          </a>

          {/* Collapse */}
          <button onClick={() => setCollapsed(!collapsed)} style={{
            padding: '7px', borderRadius: 6, border: '1px solid var(--border)',
            background: 'var(--white)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--muted)',
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d={collapsed ? 'M9 18l6-6-6-6' : 'M15 18l-6-6 6-6'} />
            </svg>
          </button>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <div ref={mainRef} style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflow: 'auto' }}>

        {/* Topbar */}
        <div style={{
          background: 'var(--white)', borderBottom: '1px solid var(--border)',
          padding: '0 40px', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', height: 56, flexShrink: 0,
          position: 'sticky', top: 0, zIndex: 40,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 12, color: 'var(--muted)' }}>saludcompartida.ai</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M5 3l4 4-4 4" stroke="var(--border)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span style={{ fontSize: 13, fontWeight: 600, color: NAV_ACCENTS[active] }}>
              {t(NAV_LABELS[active], lang)}
            </span>
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
          {active === 'problema'    && <TheProblem />}
          {active === 'carlos'      && <Carlos />}
          {active === 'como'        && <HowItWorks />}
          {active === 'beneficios'  && <><Benefits /><VideoBreak variant='ninos' /></>}
          {active === 'impacto'     && <TheImpact />}
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
        @keyframes fadeUp { from { opacity:0; transform:translateY(8px) } to { opacity:1; transform:none } }
        @keyframes pulse-dot { 0%,100% { opacity:1 } 50% { opacity:.4 } }
      `}</style>
    </div>
  )
}
