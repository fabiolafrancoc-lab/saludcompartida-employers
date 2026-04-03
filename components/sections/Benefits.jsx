'use client'
import { useLang } from '@/contexts/LanguageContext'
import { translations as T, t } from '@/lib/translations'

const SERVICE_ICONS = [
  'M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v4m0 0H3m6 0h12M3 7v10a2 2 0 002 2h4m-6-6h12m-6 6h6a2 2 0 002-2V7',
  'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
  'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
  'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
]
const S_COLORS = ['var(--clarity)','var(--action)','var(--growth)','var(--trust)']
const S_BGS    = ['var(--clarity-light)','var(--action-light)','var(--growth-light)','var(--trust-light)']

export default function Benefits() {
  const { lang } = useLang()
  const b = T.benefits

  return (
    <section id="beneficios" style={{ padding: '96px 5%' }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--action)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>{t(b.eyebrow, lang)}</div>
          <h2 style={{ fontSize: 42, marginBottom: 16 }}>{t(b.h2, lang)}</h2>
          <p style={{ fontSize: 17, color: 'var(--muted)', maxWidth: 560, margin: '0 auto' }}>{t(b.sub, lang)}</p>
        </div>

        {/* Services */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 72 }}>
          {b.services.map((svc, i) => (
            <div key={svc.key} style={{ background: S_BGS[i], borderRadius: 16, padding: 28, transition: 'transform .2s' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={S_COLORS[i]} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: 14 }}>
                <path d={SERVICE_ICONS[i]}/>
              </svg>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: S_COLORS[i], lineHeight: 1 }}>{svc.stat}</div>
              <div style={{ fontSize: 11, color: S_COLORS[i], opacity: 0.7, marginBottom: 12 }}>{t(svc.statLabel, lang)}</div>
              <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)', marginBottom: 8 }}>{t(svc.label, lang)}</h3>
              <p style={{ fontSize: 13, color: 'var(--body)', lineHeight: 1.6 }}>{t(svc.desc, lang)}</p>
            </div>
          ))}
        </div>

        {/* Why it matters */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--trust)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>{t(b.whyEyebrow, lang)}</div>
            <h2 style={{ fontSize: 36, marginBottom: 24, lineHeight: 1.2 }}><span style={{ color: 'var(--clarity)' }}>{t(b.whyH2, lang)}</span></h2>
            <p style={{ fontSize: 15, color: 'var(--muted)', marginBottom: 28, lineHeight: 1.75 }}>{t(b.whyP, lang)}</p>
            {b.bullets.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 12, alignItems: 'flex-start' }}>
                <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--growth-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1.5 4L3.5 6L8.5 1.5" stroke="var(--growth)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <span style={{ fontSize: 14, color: 'var(--body)', lineHeight: 1.5 }}>{t(item, lang)}</span>
              </div>
            ))}
          </div>

          {/* ROI Card */}
          <div style={{ background: 'var(--ink)', borderRadius: 20, padding: 40, color: 'white' }}>
            <div style={{ fontSize: 12, color: 'var(--clarity)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 20 }}>
              {t(b.roi.label, lang)}
            </div>
            {b.roi.rows.map((row, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', maxWidth: '65%', lineHeight: 1.4 }}>{t(row, lang)}</span>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 24, color: row.color }}>{row.val}</span>
              </div>
            ))}
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 16, lineHeight: 1.5 }}>{t(b.roi.disclaimer, lang)}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
