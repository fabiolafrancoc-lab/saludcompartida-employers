'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLang } from '@/contexts/LanguageContext'
import { IconTelemedicina, IconFarmacia, IconTerapia, IconLupita } from '@/components/icons/SCIcons'

/*
  HERO DESIGN RATIONALE
  ─────────────────────────────────────────────────────────────────
  La foto tiene el cyan vacío exactamente en el IZQUIERDO — el
  ojo sigue naturalmente a la niña (derecha) y LUEGO lee el texto
  (izquierda). Psicología de lectura F-pattern + face attraction.

  La niña pintada = la hija del empleado en México. El HR Manager
  lo entiende visceralmente sin que nadie se lo explique.

  Color left panel = #9DCDD0 (muestreado de la foto) →
  la transición foto-panel es invisible, parece un solo universo.
  ─────────────────────────────────────────────────────────────────
*/

const FEARS = {
  es: [
    '"¿Tendrá mamá para su medicina este mes?"',
    '"¿Y si papá necesita al médico y no tenemos?"',
    '"¿Y si mi hija se enferma lejos de mí?"',
  ],
  en: [
    '"Will mom have enough for her medicine this month?"',
    '"What if dad needs a doctor and we can\'t afford it?"',
    '"What if my daughter gets sick far from me?"',
  ],
}

const SERVICES = (es) => [
  { Icon: IconTelemedicina, label: es ? 'Médico 24/7' : 'Doctor 24/7',     color: '#0891B2' },
  { Icon: IconFarmacia,     label: es ? 'Farmacia'    : 'Pharmacy',        color: '#D97706' },
  { Icon: IconTerapia,      label: es ? 'Terapia'     : 'Therapy',         color: '#7C3AED' },
  { Icon: IconLupita,       label: es ? 'Lupita AI'   : 'Lupita AI',       color: '#006847' },
]

export default function Hero() {
  const { lang } = useLang()
  const es = lang === 'es'
  const [fearIdx, setFearIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setFearIdx(p => (p + 1) % 3), 3600)
    return () => clearInterval(t)
  }, [])

  const services = SERVICES(es)

  return (
    <div style={{ position: 'relative', minHeight: 'calc(100vh - 56px)', display: 'flex', overflow: 'hidden' }}>

      {/* ── LEFT PANEL — cyan from the photo ── */}
      <div style={{
        width: '44%',
        flexShrink: 0,
        background: '#9DCDD0',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '56px 52px',
        position: 'relative',
        zIndex: 2,
      }}>

        {/* Audience badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: 'rgba(255,255,255,0.30)',
          backdropFilter: 'blur(8px)',
          borderRadius: 100, padding: '5px 14px',
          marginBottom: 28, alignSelf: 'flex-start',
          border: '1px solid rgba(255,255,255,0.4)',
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#0F3460', display: 'block', flexShrink: 0 }}/>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#0F3460', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            PEOs · HR Managers · Risk Managers
          </span>
        </div>

        {/* Headline */}
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 40,
          lineHeight: 1.15,
          color: '#0F3460',
          marginBottom: 18,
          letterSpacing: '-0.02em',
        }}>
          {es
            ? <>Tu empleado trabaja<br/>mejor cuando su familia<br/><em style={{ color: '#006847', fontStyle: 'italic' }}>está protegida</em></>
            : <>Your employee performs<br/>better when their family<br/><em style={{ color: '#006847', fontStyle: 'italic' }}>is protected</em></>
          }
        </h1>

        {/* Rotating fear — the employee's voice */}
        <div style={{
          background: 'rgba(255,255,255,0.35)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.5)',
          borderLeft: '3px solid #D97706',
          borderRadius: '0 10px 10px 0',
          padding: '12px 16px',
          marginBottom: 24,
          minHeight: 54,
        }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: '#D97706', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 5 }}>
            {es ? 'Piensa esto mientras trabaja' : 'Thinking this while working'}
          </div>
          <p key={fearIdx} style={{ fontSize: 13, fontStyle: 'italic', color: '#0F3460', lineHeight: 1.5, margin: 0, animation: 'fadeUp .3s ease' }}>
            {FEARS[lang][fearIdx]}
          </p>
        </div>

        {/* 4 services — compact pills */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 24 }}>
          {services.map(({ Icon, label, color }) => (
            <div key={label} style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: 'rgba(255,255,255,0.4)',
              backdropFilter: 'blur(6px)',
              border: '1px solid rgba(255,255,255,0.55)',
              borderRadius: 8, padding: '9px 12px',
            }}>
              <Icon size={17} color={color} strokeWidth={1.7} />
              <span style={{ fontSize: 12, fontWeight: 600, color: '#0F3460' }}>{label}</span>
            </div>
          ))}
        </div>

        {/* NOT insurance — compact */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: 'rgba(15,52,96,0.10)',
          border: '1px solid rgba(15,52,96,0.18)',
          borderRadius: 8, padding: '9px 14px',
          marginBottom: 28,
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0F3460" strokeWidth="2.5" strokeLinecap="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <span style={{ fontSize: 11, color: '#0F3460', fontWeight: 600 }}>
            {es
              ? 'NO es un seguro médico — Sin deducibles. Sin copagos. Sin trámites.'
              : 'NOT health insurance — No deductibles. No copays. No claims.'
            }
          </span>
        </div>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 10 }}>
          <Link href="/dashboard" style={{
            background: '#0F3460', color: 'white',
            padding: '13px 26px', borderRadius: 8,
            fontSize: 13, fontWeight: 700,
            display: 'inline-flex', alignItems: 'center', gap: 8,
            boxShadow: '0 4px 16px rgba(15,52,96,0.30)',
            transition: 'transform .15s, box-shadow .15s',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(15,52,96,0.40)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(15,52,96,0.30)' }}
          >
            {es ? 'Acceder al Portal' : 'Access Portal'}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </Link>
          <button
            onClick={() => document.querySelector('[data-section="problema"]')?.click()}
            style={{
              background: 'rgba(255,255,255,0.35)',
              backdropFilter: 'blur(6px)',
              border: '1px solid rgba(255,255,255,0.5)',
              color: '#0F3460', padding: '13px 22px', borderRadius: 8,
              fontSize: 13, fontWeight: 600, cursor: 'pointer',
            }}
          >
            {es ? 'Ver el problema' : 'See the problem'}
          </button>
        </div>

        {/* Loss aversion strip */}
        <div style={{ marginTop: 24, padding: '12px 0 0', borderTop: '1px solid rgba(15,52,96,0.15)' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: '#DC2626' }}>$18</span>
            <span style={{ fontSize: 12, color: '#0F3460', opacity: 0.7 }}>
              {es ? '/mes por empleado · reemplazarlo cuesta' : '/month per employee · replacing them costs'}
            </span>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: '#0F3460' }}>$5,200</span>
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL — the girl, full bleed ── */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>

        {/* Gradient blending left edge with the cyan panel */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'linear-gradient(to right, #9DCDD0 0%, rgba(157,205,208,0.4) 18%, transparent 38%)',
          pointerEvents: 'none',
        }}/>

        {/* Photo */}
        <Image
          src="/fotoninapintada.jpeg"
          alt={es ? 'Niña de familia mexicana protegida con SaludCompartida' : 'Mexican family child protected with SaludCompartida'}
          fill
          priority
          style={{ objectFit: 'cover', objectPosition: '65% center' }}
          sizes="56vw"
        />

        {/* ROI badge — floats over image bottom-left */}
        <div style={{
          position: 'absolute', bottom: 32, left: 32, zIndex: 2,
          background: 'rgba(15,52,96,0.88)',
          backdropFilter: 'blur(12px)',
          borderRadius: 14, padding: '16px 22px',
          border: '1px solid rgba(255,255,255,0.12)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.24)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 34, color: '#6EE7B7', lineHeight: 1 }}>24x</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', marginTop: 3, textTransform: 'uppercase', letterSpacing: '0.06em' }}>ROI</div>
            </div>
            <div style={{ width: 1, height: 36, background: 'rgba(255,255,255,0.12)' }}/>
            <div>
              <div style={{ fontSize: 12, color: 'white', fontWeight: 600, lineHeight: 1.3 }}>
                {es ? 'Retener 1 empleado paga' : 'Retaining 1 employee pays'}
              </div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', marginTop: 3 }}>
                {es ? '24 años de SaludCompartida' : '24 years of SaludCompartida'}
              </div>
            </div>
          </div>
        </div>

        {/* Quote badge — floats over image top-right */}
        <div style={{
          position: 'absolute', top: 32, right: 32, zIndex: 2,
          background: 'rgba(255,255,255,0.92)',
          backdropFilter: 'blur(12px)',
          borderRadius: 14, padding: '14px 20px',
          maxWidth: 220,
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
        }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#D97706', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
            {es ? '10% de cada remesa' : '10% of each remittance'}
          </div>
          <div style={{ fontSize: 13, color: '#0F3460', fontWeight: 600, lineHeight: 1.4 }}>
            {es ? 'se va en salud — médicos, exámenes y medicamentos' : 'goes to health — doctors, exams and medications'}
          </div>
          <div style={{ fontSize: 11, color: '#6B7280', marginTop: 4 }}>IDB 2024 · Banxico</div>
        </div>
      </div>
    </div>
  )
}
