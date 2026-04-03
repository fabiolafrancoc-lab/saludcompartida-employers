'use client'
import { useLang } from '@/contexts/LanguageContext'
import { translations as T, t } from '@/lib/translations'

const ICONS = [
  'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
  'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
  'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
]
const COLORS = ['var(--trust)','var(--clarity)','var(--growth)','var(--action)']
const BGS    = ['var(--trust-light)','var(--clarity-light)','var(--growth-light)','var(--action-light)']

export default function HowItWorks() {
  const { lang } = useLang()
  const h = T.how

  return (
    <section id="como" style={{ background: 'var(--surface)', padding: '96px 5%' }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--clarity)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>{t(h.eyebrow, lang)}</div>
          <h2 style={{ fontSize: 42, marginBottom: 16 }}>{t(h.h2, lang)}</h2>
          <p style={{ fontSize: 17, color: 'var(--muted)', maxWidth: 520, margin: '0 auto' }}>{t(h.sub, lang)}</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
          {h.steps.map((step, i) => (
            <div key={step.n} style={{ background: 'white', borderRadius: 16, padding: 28, border: '1px solid var(--border)', position: 'relative', transition: 'transform .2s, box-shadow .2s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.08)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: COLORS[i], letterSpacing: '0.1em', marginBottom: 18 }}>{step.n}</div>
              <div style={{ width: 48, height: 48, background: BGS[i], borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={COLORS[i]} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d={ICONS[i]}/>
                </svg>
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--ink)', marginBottom: 10 }}>{t(step.title, lang)}</h3>
              <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.65 }}>{t(step.desc, lang)}</p>
              {i < 3 && <div style={{ position: 'absolute', top: 52, right: -12, width: 24, height: 2, background: 'var(--border)', zIndex: 1 }}/>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
