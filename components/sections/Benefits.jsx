'use client'
import { useState } from 'react'
import { useLang } from '@/contexts/LanguageContext'
import { translations as T, t } from '@/lib/translations'

const SERVICE_ICONS = [
  'M15 10l4.553-2.069A1 1 0 0121 8.87V15.13a1 1 0 01-1.447.9L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z',
  'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
  'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
  'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
]

const S_COLORS = ['var(--teal)', 'var(--amber)', 'var(--emerald)', 'var(--navy)']
const S_BGS    = ['var(--teal-light)', 'var(--amber-light)', 'var(--emerald-light)', 'var(--navy-light)']

// Business impact per service — for Risk Manager audience
const BUSINESS_IMPACT = {
  es: [
    'Reduce emergencias no atendidas que resultan en días perdidos de trabajo',
    'Ahorra hasta $400/año al empleado — reduce estrés financiero de forma directa',
    'Previene burnout y absenteeism emocional antes de que afecte el trabajo',
    'Detecta crisis de bienestar antes de que se conviertan en ausencias',
  ],
  en: [
    'Reduces untreated emergencies that result in lost workdays',
    'Saves up to $400/year per employee — directly reduces financial stress',
    'Prevents burnout and emotional absenteeism before it impacts work',
    'Detects wellbeing crises before they become absences',
  ]
}

export default function Benefits() {
  const { lang } = useLang()
  const b = T.benefits
  const [activeService, setActiveService] = useState(0)
  const svc = b.services[activeService]

  return (
    <div style={{ background: 'var(--sand)', animation: 'fadeUp .35s ease' }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '72px 48px' }}>

        <div style={{ maxWidth: 600, marginBottom: 52 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--amber)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12 }}>
            {t(b.eyebrow, lang)}
          </div>
          <h2 style={{ fontSize: 42, marginBottom: 16 }}>{t(b.h2, lang)}</h2>
          <p style={{ fontSize: 16, color: 'var(--muted)' }}>{t(b.sub, lang)}</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 48, marginBottom: 64, alignItems: 'start' }}>

          {/* Service tabs — left */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {b.services.map((svc, i) => (
              <button
                key={svc.key}
                onClick={() => setActiveService(i)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '16px 18px', borderRadius: 10,
                  border: activeService === i ? `1.5px solid ${S_COLORS[i]}` : '1.5px solid var(--border)',
                  background: activeService === i ? S_BGS[i] : 'var(--white)',
                  cursor: 'pointer', textAlign: 'left',
                  transition: 'all .15s',
                }}
              >
                <div style={{ width: 42, height: 42, borderRadius: 10, background: activeService === i ? S_COLORS[i] : 'var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background .15s' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d={SERVICE_ICONS[i]}/>
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: activeService === i ? 'var(--ink)' : 'var(--body)' }}>{t(svc.label, lang)}</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>{svc.stat} {t(svc.statLabel, lang)}</div>
                </div>
              </button>
            ))}
          </div>

          {/* Service detail — right */}
          <div key={activeService} style={{
            background: 'var(--white)', borderRadius: 16, padding: 32,
            border: '1px solid var(--border)',
            animation: 'fadeUp .2s ease',
          }}>
            <div style={{ width: 52, height: 52, borderRadius: 12, background: S_BGS[activeService], display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={S_COLORS[activeService]} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d={SERVICE_ICONS[activeService]}/>
              </svg>
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 40, color: S_COLORS[activeService], lineHeight: 1, marginBottom: 4 }}>{svc.stat}</div>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 16 }}>{t(svc.statLabel, lang)}</div>
            <h3 style={{ fontSize: 22, color: 'var(--ink)', marginBottom: 12 }}>{t(svc.label, lang)}</h3>
            <p style={{ fontSize: 14, color: 'var(--body)', lineHeight: 1.75, marginBottom: 20 }}>{t(svc.desc, lang)}</p>

            {/* Business impact — for HR/Risk Manager */}
            <div style={{ background: S_BGS[activeService], borderRadius: 8, padding: '14px 16px' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: S_COLORS[activeService], textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
                {lang === 'es' ? 'Impacto en tu empresa' : 'Business impact'}
              </div>
              <p style={{ fontSize: 13, color: 'var(--body)', lineHeight: 1.6 }}>
                {BUSINESS_IMPACT[lang][activeService]}
              </p>
            </div>
          </div>
        </div>

        {/* Business case — Why it matters */}
        <div style={{ background: 'var(--navy)', borderRadius: 20, padding: 40, color: 'white' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>
                {t(b.whyEyebrow, lang)}
              </div>
              <h3 style={{ fontSize: 30, color: 'white', marginBottom: 16, fontFamily: 'var(--font-display)' }}>
                {t(b.whyH2, lang)}
              </h3>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)', lineHeight: 1.75, marginBottom: 24 }}>
                {t(b.whyP, lang)}
              </p>
              {b.bullets.map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'flex-start' }}>
                  <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'var(--teal)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                    <svg width="9" height="7" viewBox="0 0 9 7" fill="none"><path d="M1 3.5L3 5.5L8 1" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', lineHeight: 1.5 }}>{t(item, lang)}</span>
                </div>
              ))}
            </div>
            {/* ROI rows */}
            <div>
              <div style={{ fontSize: 12, color: 'var(--teal)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>
                {t(b.roi.label, lang)}
              </div>
              {b.roi.rows.map((row, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', maxWidth: '65%', lineHeight: 1.4 }}>{t(row, lang)}</span>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 26, color: row.color }}>{row.val}</span>
                </div>
              ))}
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 14 }}>{t(b.roi.disclaimer, lang)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
