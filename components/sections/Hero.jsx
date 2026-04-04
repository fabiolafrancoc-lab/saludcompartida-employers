'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useLang } from '@/contexts/LanguageContext'
import { translations as T, t } from '@/lib/translations'

// Rotating proof points — social proof + authority triggers
const PROOF_POINTS = {
  es: [
    'G&A Partners · 130,000 worksite employees en pipeline',
    '600,000 suscriptores en Brasil — mismo modelo, probado',
    'Governance Committee: ex-CEO IDB Lab · ex-Presidente Chubb A&H',
  ],
  en: [
    'G&A Partners · 130,000 worksite employees in pipeline',
    '600,000 subscribers in Brazil — same model, proven',
    'Governance Committee: ex-CEO IDB Lab · ex-President Chubb A&H',
  ]
}

export default function Hero() {
  const { lang } = useLang()
  const h = T.hero
  const [proofIdx, setProofIdx] = useState(0)

  useEffect(() => {
    const i = setInterval(() => setProofIdx(p => (p + 1) % 3), 3200)
    return () => clearInterval(i)
  }, [])

  return (
    <div style={{ background: 'var(--white)', animation: 'fadeUp .35s ease' }}>

      {/* Hero section */}
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '72px 48px 64px' }}>

        {/* Live proof ticker — social proof + authority */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          background: 'var(--navy-light)', borderRadius: 100,
          padding: '6px 16px', marginBottom: 32,
        }}>
          <span style={{
            width: 7, height: 7, borderRadius: '50%',
            background: 'var(--emerald)',
            display: 'inline-block',
            animation: 'pulse-dot 2s infinite',
          }}/>
          <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--navy)' }}>
            {PROOF_POINTS[lang][proofIdx]}
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 64, alignItems: 'center' }}>

          {/* Left: Main copy */}
          <div>
            {/* Pre-headline — audience targeting (pattern interrupt) */}
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--teal)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 14 }}>
              {lang === 'es' ? 'Para PEOs · HR Managers · Risk Managers' : 'For PEOs · HR Managers · Risk Managers'}
            </div>

            <h1 style={{ fontSize: 50, lineHeight: 1.1, marginBottom: 24, color: 'var(--ink)' }}>
              {lang === 'es'
                ? <>Tu empleado latino<br/>trabaja mejor cuando<br/><span style={{ color: 'var(--teal)', fontStyle: 'italic' }}>su familia está protegida</span></>
                : <>Your Latino employee<br/>performs better when<br/><span style={{ color: 'var(--teal)', fontStyle: 'italic' }}>their family is covered</span></>
              }
            </h1>

            <p style={{ fontSize: 16, color: 'var(--body)', marginBottom: 12, maxWidth: 480, lineHeight: 1.75 }}>
              {lang === 'es'
                ? 'El 78% de tu fuerza laboral latina manda remesas a México cada mes. Cuando ese dinero va a pagar médicos, el estrés destruye productividad, aumenta el ausentismo y acelera la rotación.'
                : '78% of your Latino workforce sends remittances to Mexico every month. When that money goes to pay doctors, stress destroys productivity, increases absenteeism, and accelerates turnover.'
              }
            </p>

            {/* Loss aversion frame — Kahneman principle */}
            <div style={{
              background: 'var(--loss-light)',
              border: '1px solid rgba(220,38,38,0.15)',
              borderLeft: '3px solid var(--loss)',
              borderRadius: '0 8px 8px 0',
              padding: '12px 16px',
              marginBottom: 32,
            }}>
              <span style={{ fontSize: 14, color: 'var(--loss)', fontWeight: 600 }}>
                {lang === 'es'
                  ? 'Reemplazar un empleado cuesta entre $3,000 y $8,000. SaludCompartida cuesta $18/mes.'
                  : 'Replacing an employee costs $3,000–$8,000. SaludCompartida costs $18/month.'
                }
              </span>
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <Link href="/dashboard" style={{
                background: 'var(--navy)', color: 'white',
                padding: '13px 28px', borderRadius: 8,
                fontSize: 14, fontWeight: 600,
                display: 'inline-flex', alignItems: 'center', gap: 8,
                transition: 'background .2s, transform .15s',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--teal)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'var(--navy)'; e.currentTarget.style.transform = 'none' }}>
                {lang === 'es' ? 'Acceder al Portal' : 'Access Portal'}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
              <a href="#como" style={{
                background: 'var(--white)', color: 'var(--navy)',
                padding: '13px 24px', borderRadius: 8,
                fontSize: 14, fontWeight: 500,
                border: '1px solid var(--border)',
              }}>
                {lang === 'es' ? 'Cómo funciona' : 'How it works'}
              </a>
            </div>
          </div>

          {/* Right: ROI snapshot — anchoring for Risk Manager */}
          <div>
            <div style={{
              background: 'var(--sand)',
              borderRadius: 16,
              padding: 32,
              border: '1px solid var(--border)',
              position: 'relative',
              overflow: 'hidden',
            }}>
              {/* Decorative accent */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, var(--navy), var(--teal))' }}/>

              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--teal)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 20 }}>
                {lang === 'es' ? 'Calculadora de ROI rápida' : 'Quick ROI Calculator'}
              </div>

              {/* Cost comparison — anchoring */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
                {[
                  { label: lang === 'es' ? 'Costo de reemplazar 1 empleado' : 'Cost to replace 1 employee', val: '$5,200', color: 'var(--loss)', bg: 'var(--loss-light)' },
                  { label: lang === 'es' ? 'SaludCompartida por empleado/año' : 'SaludCompartida per employee/year', val: '$216', color: 'var(--emerald)', bg: 'var(--emerald-light)' },
                  { label: lang === 'es' ? 'ROI reteniendo solo 1 empleado' : 'ROI retaining just 1 employee', val: '24x', color: 'var(--navy)', bg: 'var(--navy-light)' },
                ].map(({ label, val, color, bg }) => (
                  <div key={val} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: bg, borderRadius: 8, padding: '10px 14px' }}>
                    <span style={{ fontSize: 13, color: 'var(--body)', lineHeight: 1.3 }}>{label}</span>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: 22, color, fontWeight: 400, flexShrink: 0, marginLeft: 12 }}>{val}</span>
                  </div>
                ))}
              </div>

              {/* 4 stats grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {[
                  { val: '78%', label: lang === 'es' ? 'empleados envían remesas mensualmente' : 'employees send monthly remittances' },
                  { val: '30%', label: lang === 'es' ? 'menos ausentismo con beneficios familiares' : 'less absenteeism with family benefits' },
                  { val: '$18', label: lang === 'es' ? 'por empleado por mes' : 'per employee per month' },
                  { val: '4', label: lang === 'es' ? 'servicios en un solo beneficio' : 'services in one benefit' },
                ].map(({ val, label }) => (
                  <div key={val} style={{ background: 'white', borderRadius: 8, padding: '12px 14px', border: '1px solid var(--border)' }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--navy)' }}>{val}</div>
                    <div style={{ fontSize: 11, color: 'var(--muted)', lineHeight: 1.4, marginTop: 2 }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social proof bar */}
      <div style={{
        background: 'var(--navy)',
        padding: '16px 48px',
        display: 'flex', justifyContent: 'center', gap: 48, alignItems: 'center',
        flexWrap: 'wrap',
      }}>
        {[
          { val: lang === 'es' ? '600K suscriptores' : '600K subscribers', sub: lang === 'es' ? 'Brasil 2019 — mismo modelo' : 'Brazil 2019 — same model' },
          { val: '130,000', sub: lang === 'es' ? 'worksite employees en pipeline' : 'worksite employees in pipeline' },
          { val: '25+', sub: lang === 'es' ? 'años experiencia seguros LATAM' : 'years LATAM insurance experience' },
          { val: '6', sub: lang === 'es' ? 'miembros Governance Committee' : 'Governance Committee members' },
        ].map(({ val, sub }) => (
          <div key={val} style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, color: 'white' }}>{val}</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>{sub}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
