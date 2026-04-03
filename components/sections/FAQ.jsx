'use client'
import { useState } from 'react'
import { useLang } from '@/contexts/LanguageContext'
import { translations as T, t } from '@/lib/translations'

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(null)
  const { lang } = useLang()
  const f = T.faq

  return (
    <section id="faq" style={{ background: 'var(--surface)', padding: '96px 5%' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--clarity)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>{t(f.eyebrow, lang)}</div>
          <h2 style={{ fontSize: 42 }}>{t(f.h2, lang)}</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {f.items.map(({ q, a }, i) => (
            <div key={i} style={{ background: 'white', borderRadius: 12, border: openIdx === i ? '1px solid var(--clarity)' : '1px solid var(--border)', overflow: 'hidden', transition: 'border-color .2s' }}>
              <button onClick={() => setOpenIdx(openIdx === i ? null : i)}
                style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 22px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', gap: 16 }}>
                <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.4 }}>{t(q, lang)}</span>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: openIdx === i ? 'var(--clarity)' : 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background .2s' }}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transform: openIdx === i ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}>
                    <path d="M2 4l4 4 4-4" stroke={openIdx === i ? 'white' : 'var(--muted)'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </button>
              {openIdx === i && (
                <div style={{ padding: '0 22px 18px', borderTop: '1px solid var(--border)' }}>
                  <p style={{ fontSize: 14, color: 'var(--body)', lineHeight: 1.75, marginTop: 14 }}>{t(a, lang)}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 56 }}>
          <p style={{ fontSize: 16, color: 'var(--muted)', marginBottom: 20 }}>{t(f.ctaText, lang)}</p>
          <a href="/dashboard" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--trust)', color: 'white', padding: '14px 32px', borderRadius: 10, fontSize: 15, fontWeight: 600, transition: 'background .2s' }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--clarity)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--trust)'}>
            {t(f.cta, lang)}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
        </div>
      </div>
    </section>
  )
}
