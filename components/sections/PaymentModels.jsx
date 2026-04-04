'use client'
import { useState } from 'react'
import { useLang } from '@/contexts/LanguageContext'
import { translations as T, t } from '@/lib/translations'

const COLORS = ['var(--navy)', 'var(--teal)', 'var(--muted)']
const BGS    = ['var(--navy-light)', 'var(--teal-light)', '#F9FAFB']
const PRICES = ['$18–22', 'X% / Y%', '$18–22']
const FEATURED = [true, false, false]

export default function PaymentModels() {
  const { lang } = useLang()
  const p = T.plans

  return (
    <div style={{ background: 'var(--white)', animation: 'fadeUp .35s ease' }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '28px 48px' }}>

        <div style={{ maxWidth: 600, marginBottom: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--teal)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12 }}>
            {t(p.eyebrow, lang)}
          </div>
          <h2 style={{ fontSize: 32, marginBottom: 10 }}>{t(p.h2, lang)}</h2>
          <p style={{ fontSize: 16, color: 'var(--muted)' }}>{t(p.sub, lang)}</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
          {p.models.map((model, i) => (
            <div key={i} style={{
              background: 'var(--white)', borderRadius: 14,
              padding: 28,
              border: FEATURED[i] ? `2px solid ${COLORS[i]}` : '1.5px solid var(--border)',
              position: 'relative',
              transition: 'transform .15s, box-shadow .15s',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.08)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}>

              {/* Top bar */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: COLORS[i], borderRadius: '14px 14px 0 0' }}/>

              {FEATURED[i] && (
                <div style={{ position: 'absolute', top: 12, right: 16, background: COLORS[i], color: 'white', fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 100, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  {lang === 'es' ? 'Recomendado' : 'Recommended'}
                </div>
              )}

              <div style={{ display: 'inline-block', background: BGS[i], color: COLORS[i], fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 100, marginBottom: 14, marginTop: FEATURED[i] ? 8 : 0 }}>
                {t(model.badge, lang)}
              </div>

              <h3 style={{ fontSize: 19, color: 'var(--ink)', marginBottom: 10, fontFamily: 'var(--font-display)' }}>{t(model.title, lang)}</h3>

              <div style={{ marginBottom: 14 }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 32, color: COLORS[i] }}>{PRICES[i]}</span>
                <span style={{ fontSize: 12, color: 'var(--muted)', marginLeft: 4 }}>{t(model.period, lang)}</span>
              </div>

              <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 18, minHeight: 60 }}>{t(model.desc, lang)}</p>

              <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16 }}>
                {model.features[lang === 'es' ? 'es' : 'en'].map((f, j) => (
                  <div key={j} style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'center' }}>
                    <div style={{ width: 16, height: 16, borderRadius: '50%', background: BGS[i], display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg width="8" height="6" viewBox="0 0 8 6" fill="none"><path d="M1 3l1.8 2L7 1" stroke={COLORS[i]} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <span style={{ fontSize: 12, color: 'var(--body)' }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Employee types + configurability */}
        <div style={{ background: 'var(--sand-light)', borderRadius: 12, padding: '24px 28px', border: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>{t(p.typesLabel, lang)}</span>
            {p.types.map(({ type, desc }) => (
              <div key={type} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--white)', borderRadius: 8, padding: '6px 12px', border: '1px solid var(--border)' }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--navy)' }}>{type}</span>
                <span style={{ fontSize: 11, color: 'var(--muted)' }}>— {t(desc, lang)}</span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 14, lineHeight: 1.6 }}>
            {lang === 'es'
              ? 'Cada empresa configura independientemente las condiciones para full-time, hourly, part-time y seasonal. Un solo contrato, múltiples arreglos.'
              : 'Each company independently configures conditions for full-time, hourly, part-time, and seasonal. One contract, multiple arrangements.'
            }
          </p>
        </div>
      </div>
    </div>
  )
}
