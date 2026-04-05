'use client'
import { useState } from 'react'
import { useLang } from '@/contexts/LanguageContext'
import { translations as T, t } from '@/lib/translations'

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(0)
  const { lang } = useLang()
  const f = T.faq

  return (
    <div style={{ background: 'var(--white)', animation: 'fadeUp .35s ease' }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '28px 48px' }}>

        <div style={{ display: 'grid', gridTemplateColumns: '0.8fr 1.2fr', gap: 36, alignItems: 'start' }}>

          {/* Left: header + CTA */}
          <div style={{ position: 'sticky', top: 80 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--teal)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12 }}>
              {t(f.eyebrow, lang)}
            </div>
            <h2 style={{ fontSize: 30, marginBottom: 10 }}>{t(f.h2, lang)}</h2>
            <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.75, marginBottom: 32 }}>
              {lang === 'es'
                ? 'Respondemos las preguntas que tu equipo de RRHH y Risk Management va a hacer antes de aprobar el beneficio.'
                : 'We answer the questions your HR and Risk Management team will ask before approving the benefit.'
              }
            </p>

            {/* CTA block */}
            <div style={{ background: 'var(--navy)', borderRadius: 14, padding: 28, color: 'white' }} className="on-dark">
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>
                {t(f.ctaText, lang)}
              </div>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginBottom: 20, lineHeight: 1.6 }}>
                {lang === 'es'
                  ? 'Accede al portal para ver la configuración, los reportes de utilización y la facturación.'
                  : 'Access the portal to see configuration, utilization reports, and billing.'
                }
              </p>
              <a href="/login" style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                background: 'var(--teal)', color: 'white',
                padding: '12px 20px', borderRadius: 8,
                fontSize: 13, fontWeight: 600,
              }}>
                {t(f.cta, lang)}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
            </div>
          </div>

          {/* Right: FAQ accordion */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {f.items.map(({ q, a }, i) => (
              <div key={i} style={{
                borderRadius: 10,
                border: openIdx === i ? '1.5px solid var(--teal)' : '1.5px solid var(--border)',
                overflow: 'hidden',
                transition: 'border-color .15s',
              }}>
                <button onClick={() => setOpenIdx(openIdx === i ? null : i)}
                  style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', background: openIdx === i ? 'var(--teal-light)' : 'var(--white)', border: 'none', cursor: 'pointer', textAlign: 'left', gap: 14, transition: 'background .15s' }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.4 }}>{t(q, lang)}</span>
                  <div style={{ width: 22, height: 22, borderRadius: '50%', background: openIdx === i ? 'var(--teal)' : 'var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background .15s' }}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ transform: openIdx === i ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}>
                      <path d="M2 3.5l3 3 3-3" stroke={openIdx === i ? 'white' : 'var(--muted)'} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </button>
                {openIdx === i && (
                  <div style={{ padding: '0 20px 16px', borderTop: '1px solid var(--border)', background: 'var(--white)' }}>
                    <p style={{ fontSize: 13, color: 'var(--body)', lineHeight: 1.75, marginTop: 14 }}>{t(a, lang)}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
