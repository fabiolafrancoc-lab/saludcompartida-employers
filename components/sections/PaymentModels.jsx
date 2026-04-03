'use client'
import { useLang } from '@/contexts/LanguageContext'
import { translations as T, t } from '@/lib/translations'

const COLORS = ['var(--trust)','var(--clarity)','var(--muted)']
const BGS    = ['var(--trust-light)','var(--clarity-light)','var(--surface)']
const PRICES = ['$18–22','X% / Y%','$18–22']
const FEATURED = [true, false, false]

export default function PaymentModels() {
  const { lang } = useLang()
  const p = T.plans

  return (
    <section id="modalidades" style={{ background: 'var(--surface)', padding: '96px 5%' }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--clarity)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>{t(p.eyebrow, lang)}</div>
          <h2 style={{ fontSize: 42, marginBottom: 16 }}>{t(p.h2, lang)}</h2>
          <p style={{ fontSize: 17, color: 'var(--muted)', maxWidth: 560, margin: '0 auto' }}>{t(p.sub, lang)}</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginBottom: 56 }}>
          {p.models.map((model, i) => (
            <div key={i} style={{ background: 'white', borderRadius: 16, padding: 32, border: FEATURED[i] ? `2px solid ${COLORS[i]}` : '1px solid var(--border)', position: 'relative', transition: 'transform .2s, box-shadow .2s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.08)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: COLORS[i], borderRadius: '16px 16px 0 0' }}/>
              <div style={{ display: 'inline-block', background: BGS[i], color: COLORS[i], fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 100, marginBottom: 16, marginTop: 8 }}>{t(model.badge, lang)}</div>
              <h3 style={{ fontSize: 20, color: 'var(--ink)', marginBottom: 12 }}>{t(model.title, lang)}</h3>
              <div style={{ marginBottom: 16 }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 34, color: COLORS[i] }}>{PRICES[i]}</span>
                <span style={{ fontSize: 13, color: 'var(--muted)', marginLeft: 4 }}>{t(model.period, lang)}</span>
              </div>
              <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.65, marginBottom: 20 }}>{t(model.desc, lang)}</p>
              {model.features[lang === 'es' ? 'es' : 'en'].map((f, j) => (
                <div key={j} style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'center' }}>
                  <div style={{ width: 16, height: 16, borderRadius: '50%', background: BGS[i], display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="8" height="6" viewBox="0 0 8 6" fill="none"><path d="M1 3l1.8 2L7 1" stroke={COLORS[i]} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <span style={{ fontSize: 13, color: 'var(--body)' }}>{f}</span>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Employee types */}
        <div style={{ background: 'white', borderRadius: 16, padding: '24px 32px', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginRight: 8 }}>{t(p.typesLabel, lang)}</span>
          {p.types.map(({ type, desc }) => (
            <div key={type} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--surface)', borderRadius: 8, padding: '6px 12px', border: '1px solid var(--border)' }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink)' }}>{type}</span>
              <span style={{ fontSize: 11, color: 'var(--muted)' }}>— {t(desc, lang)}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
