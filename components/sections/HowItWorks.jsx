'use client'
import { useLang } from '@/contexts/LanguageContext'
import { translations as T, t } from '@/lib/translations'

const ICONS = [
  'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
  'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
  'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
]

export default function HowItWorks() {
  const { lang } = useLang()
  const h = T.how
  const steps = h.steps

  return (
    <div style={{ background: 'var(--white)', animation: 'fadeUp .35s ease' }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '72px 48px' }}>

        <div style={{ maxWidth: 600, marginBottom: 52 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--teal)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12 }}>
            {t(h.eyebrow, lang)}
          </div>
          <h2 style={{ fontSize: 42, marginBottom: 16 }}>{t(h.h2, lang)}</h2>
          <p style={{ fontSize: 16, color: 'var(--muted)' }}>{t(h.sub, lang)}</p>
        </div>

        {/* Steps — horizontal flow */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, position: 'relative', marginBottom: 56 }}>
          {/* Connecting line */}
          <div style={{ position: 'absolute', top: 36, left: '12.5%', right: '12.5%', height: 1, background: 'var(--border)', zIndex: 0 }}/>

          {steps.map((step, i) => (
            <div key={step.n} style={{ padding: '0 16px', position: 'relative', zIndex: 1 }}>
              {/* Number circle */}
              <div style={{
                width: 72, height: 72,
                borderRadius: '50%',
                background: i === 0 ? 'var(--navy)' : 'var(--white)',
                border: `2px solid ${i === 0 ? 'var(--navy)' : 'var(--border)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 20,
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                  stroke={i === 0 ? 'white' : 'var(--teal)'}
                  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d={ICONS[i]}/>
                </svg>
              </div>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--teal)', letterSpacing: '0.1em', marginBottom: 8 }}>{step.n}</div>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--ink)', marginBottom: 8, lineHeight: 1.3 }}>{t(step.title, lang)}</h3>
              <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.65 }}>{t(step.desc, lang)}</p>
            </div>
          ))}
        </div>

        {/* Key insight callout — cognitive ease */}
        <div style={{
          background: 'var(--navy-light)',
          borderRadius: 12, padding: '20px 28px',
          display: 'flex', alignItems: 'center', gap: 16,
        }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
            </svg>
          </div>
          <p style={{ fontSize: 14, color: 'var(--navy)', fontWeight: 500, lineHeight: 1.5 }}>
            {lang === 'es'
              ? 'PrismHR, Rippling y ADP ya saben conectar beneficios externos vía API. Tu equipo técnico lo configura en 2–4 semanas. Después, el enrollment es completamente automático.'
              : 'PrismHR, Rippling, and ADP already know how to connect external benefits via API. Your tech team sets it up in 2–4 weeks. After that, enrollment is fully automatic.'
            }
          </p>
        </div>
      </div>
    </div>
  )
}
