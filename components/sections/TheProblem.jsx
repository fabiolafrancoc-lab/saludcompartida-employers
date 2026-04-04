'use client'
import { useLang } from '@/contexts/LanguageContext'

const STATS = [
  {
    n: '28 sem',
    label: { es: 'Tiempo de espera en sistema público', en: 'Public system wait time' },
    sub: { es: 'Clínicas privadas operan al 55% capacidad mientras familias no pueden acceder', en: 'Private clinics operate at 55% capacity while families cannot afford access' },
    source: 'OECD Health at a Glance 2023',
  },
  {
    n: '4 hrs',
    label: { es: 'Espera promedio en urgencias', en: 'Average ER wait time' },
    sub: { es: 'Productividad perdida: $18B anuales por inaccesibilidad al sistema', en: 'Lost productivity: $18B annually due to healthcare inaccessibility' },
    source: 'PubMed',
  },
  {
    n: '32%',
    label: { es: 'Aumento anual en precio de medicamentos', en: 'Annual increase in medicine prices' },
    sub: { es: 'Costo promedio subió de $25 a $33 USD entre 2021–2024 en México', en: 'Average cost rose from $25 to $33 USD between 2021–2024 in Mexico' },
    source: 'Banxico Reports',
  },
  {
    n: '0%',
    label: { es: 'Soluciones escalables para base de pirámide', en: 'Scaled solutions for base of pyramid' },
    sub: { es: 'Las aseguradoras tradicionales ignoran a esta población históricamente', en: 'Traditional insurers historically ignore this population entirely' },
    source: 'OECD Health Statistics 2023',
  },
]

const LONELINESS = [
  { n: '15', unit: { es: 'cigarrillos/día', en: 'cigarettes/day' }, label: { es: 'Riesgo equivalente de la soledad', en: 'Equivalent risk of loneliness' }, source: 'Holt-Lunstad, APA' },
  { n: '75%', unit: { es: 'mayores con enf. crónica', en: 'elderly with chronic illness' }, label: { es: 'Experimentan soledad severa', en: 'Experience severe loneliness' }, source: 'National Institute on Aging' },
  { n: '40%', unit: { es: 'peor adherencia', en: 'worse adherence' }, label: { es: 'Medicamentos no tomados por aislamiento', en: 'Medications skipped due to isolation' }, source: 'American J. Public Health' },
]

export default function TheProblem() {
  const { lang } = useLang()
  const T = {
    eyebrow:  { es: 'El problema',                en: 'The problem' },
    h2:       { es: 'La crisis de salud que nadie ve', en: 'The healthcare crisis nobody sees' },
    quote:    { es: '"Mando $500 al mes, pero cuando mi mamá se enfermó, no pude ni comprarle la medicina"', en: '"I send $500 every month, but when my mother got sick, I couldn\'t even buy her medicine"' },
    who:      { es: '— Miguel, obrero de construcción, Los Ángeles', en: '— Miguel, construction worker, Los Angeles' },
    lone_h:   { es: 'La epidemia silenciosa: la soledad', en: 'The silent epidemic: loneliness' },
    lone_p:   { es: '"Mi mamá dejó de tomar su insulina porque decía: ¿para qué, si de todos modos voy a morir sola?"', en: '"My mother stopped taking her insulin because she said: what\'s the point if I\'m going to die alone anyway?"' },
    lone_who: { es: '— Rosa, cuidadora a distancia, Miami', en: '— Rosa, caregiver from distance, Miami' },
    cta:      { es: 'El problema es real. La solución existe.', en: 'The problem is real. The solution exists.' },
  }
  const t = (o) => o[lang] ?? o.es

  return (
    <div style={{ padding: '64px 48px', maxWidth: 'var(--max-w)', margin: '0 auto' }}>

      {/* Header */}
      <div style={{ marginBottom: 48 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--amber-dim)', border: '1px solid var(--amber-border)', borderRadius: 100, padding: '5px 14px', marginBottom: 20 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--amber)' }}/>
          <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--amber)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{t(T.eyebrow)}</span>
        </div>
        <h2 style={{ fontSize: 42, marginBottom: 24, color: 'var(--text-primary)' }}>{t(T.h2)}</h2>

        {/* Hero quote */}
        <div style={{ background: 'var(--amber-dim)', border: '1px solid var(--amber-border)', borderRadius: 12, padding: '20px 24px', borderLeft: '4px solid var(--amber)' }}>
          <p style={{ fontSize: 16, fontStyle: 'italic', color: 'var(--text-primary)', lineHeight: 1.7, marginBottom: 8 }}>{t(T.quote)}</p>
          <span style={{ fontSize: 13, color: 'var(--amber)', fontWeight: 500 }}>{t(T.who)}</span>
        </div>
      </div>

      {/* Stats grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginBottom: 48 }}>
        {STATS.map((s, i) => (
          <div key={i} style={{ background: 'var(--bg-card)', borderRadius: 14, padding: '28px 24px', border: '1px solid var(--border)', transition: 'border-color .2s, background .2s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--amber-border)'; e.currentTarget.style.background = 'var(--bg-card-hover)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--bg-card)' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 40, color: 'var(--amber)', lineHeight: 1, marginBottom: 8 }}>{s.n}</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 6 }}>{t(s.label)}</div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 10 }}>{t(s.sub)}</div>
            <div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.source}</div>
          </div>
        ))}
      </div>

      {/* Loneliness section */}
      <div style={{ background: 'var(--bg-card)', borderRadius: 16, padding: '32px 28px', border: '1px solid var(--border)', marginBottom: 24 }}>
        <h3 style={{ fontSize: 22, marginBottom: 8, color: 'var(--text-primary)' }}>{t(T.lone_h)}</h3>
        <div style={{ background: 'rgba(245,158,11,0.08)', borderRadius: 10, padding: '16px 20px', borderLeft: '3px solid var(--amber)', marginBottom: 24 }}>
          <p style={{ fontSize: 14, fontStyle: 'italic', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 6 }}>{t(T.lone_p)}</p>
          <span style={{ fontSize: 12, color: 'var(--amber)', fontWeight: 500 }}>{t(T.lone_who)}</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {LONELINESS.map((l, i) => (
            <div key={i} style={{ textAlign: 'center', padding: '20px 12px', background: 'var(--bg-secondary)', borderRadius: 12, border: '1px solid var(--border)' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, color: 'var(--amber)', lineHeight: 1, marginBottom: 4 }}>{l.n}</div>
              <div style={{ fontSize: 11, color: 'var(--amber)', opacity: 0.7, marginBottom: 8 }}>{t(l.unit)}</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 6 }}>{t(l.label)}</div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{l.source}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bridge to solution */}
      <div style={{ textAlign: 'center', padding: '24px', background: 'linear-gradient(135deg, var(--amber-dim), var(--emerald-dim))', borderRadius: 12, border: '1px solid var(--border)' }}>
        <p style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)' }}>{t(T.cta)}</p>
      </div>
    </div>
  )
}
