'use client'
import Link from 'next/link'
import { useLang } from '@/contexts/LanguageContext'
import { translations as T, t } from '@/lib/translations'

export default function Hero() {
  const { lang } = useLang()
  const h = T.hero

  return (
    <section style={{ padding: '88px 5% 80px', maxWidth: 'var(--max-w)', margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 72, alignItems: 'center' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--trust-light)', border: '1px solid var(--clarity)', borderRadius: 100, padding: '5px 14px', marginBottom: 28 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--clarity)' }}/>
            <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--trust)', textTransform: 'uppercase', letterSpacing: '0.09em' }}>
              {t(h.badge, lang)}
            </span>
          </div>
          <h1 style={{ fontSize: 54, marginBottom: 24 }}>
            {t(h.h1a, lang)}<br/>
            {t(h.h1b, lang)}<br/>
            <span style={{ color: 'var(--clarity)' }}>{t(h.h1c, lang)}</span>
          </h1>
          <p style={{ fontSize: 17, color: 'var(--body)', marginBottom: 16, maxWidth: 500 }}>{t(h.p1, lang)}</p>
          <p style={{ fontSize: 15, color: 'var(--muted)', marginBottom: 40, maxWidth: 480 }}>{t(h.p2, lang)}</p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 48 }}>
            <Link href="/dashboard" style={{ background: 'var(--trust)', color: 'white', padding: '14px 28px', borderRadius: 10, fontSize: 15, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 8, transition: 'background .2s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--clarity)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--trust)'}>
              {t(h.ctaPrimary, lang)}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
            <a href="#como" style={{ background: 'var(--surface)', color: 'var(--ink)', padding: '14px 28px', borderRadius: 10, fontSize: 15, fontWeight: 600, border: '1px solid var(--border)' }}>
              {t(h.ctaSecondary, lang)}
            </a>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          {h.stats.map(({ val, ...stat }) => (
            <div key={val} style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 16, padding: '24px 20px', transition: 'border-color .2s, box-shadow .2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--clarity)'; e.currentTarget.style.boxShadow = '0 4px 24px rgba(6,182,212,0.1)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 38, color: 'var(--clarity)', lineHeight: 1, marginBottom: 10 }}>{val}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.5 }}>{t(stat, lang)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
