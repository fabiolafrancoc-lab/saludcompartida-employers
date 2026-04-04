'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useLang } from '@/contexts/LanguageContext'
import { IconTelemedicina, IconFarmacia, IconTerapia, IconLupita } from '@/components/icons/SCIcons'

const FEARS = {
  es: [
    '"¿Tendrá mamá para su medicina este mes?"',
    '"¿Y si papá necesita al médico y no tengo el dinero?"',
    '"¿Y si mi hija se enferma y no hay nada en la remesa?"',
  ],
  en: [
    '"Will mom have enough for her medicine this month?"',
    '"What if dad needs a doctor and I don\'t have the money?"',
    '"What if my daughter gets sick and there\'s nothing left?"',
  ]
}

const SERVICES = [
  { Icon: IconTelemedicina, color: '#0891B2', bg: '#E0F7FA', es: 'Médico 24/7', en: 'Doctor 24/7' },
  { Icon: IconFarmacia,     color: '#D97706', bg: '#FFFBEB', es: 'Farmacia',    en: 'Pharmacy' },
  { Icon: IconTerapia,      color: '#7C3AED', bg: '#EDE9FE', es: 'Terapia',     en: 'Therapy' },
  { Icon: IconLupita,       color: '#006847', bg: '#ECFDF5', es: 'Lupita AI',   en: 'Lupita AI' },
]

export default function Hero() {
  const { lang } = useLang()
  const es = lang === 'es'
  const [fearIdx, setFearIdx] = useState(0)
  const [imgLoaded, setImgLoaded] = useState(false)

  useEffect(() => {
    const i = setInterval(() => setFearIdx(p => (p + 1) % 3), 3600)
    return () => clearInterval(i)
  }, [])

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '44% 56%', minHeight: 'calc(100vh - 56px)', animation: 'fadeUp .4s ease' }}>

      {/* ── LEFT PANEL — Content ── */}
      <div style={{
        background: 'var(--ink)',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center',
        padding: '64px 52px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Subtle green accent top-left */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: 4, height: '100%', background: 'linear-gradient(180deg, #006847 0%, #0891B2 100%)' }} />

        {/* Eyebrow */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 28, flexWrap: 'wrap' }}>
          {['PEO', es ? 'RRHH' : 'HR', 'Risk Manager'].map(l => (
            <span key={l} style={{ fontSize: 10, fontWeight: 700, color: '#0891B2', background: 'rgba(8,145,178,0.12)', padding: '3px 10px', borderRadius: 100, letterSpacing: '0.06em' }}>
              {l}
            </span>
          ))}
        </div>

        {/* Headline */}
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 44, lineHeight: 1.1, color: 'white', marginBottom: 24, fontWeight: 400 }}>
          {es
            ? <>Tu empleado trabaja mejor<br />cuando sabe que<br /><span style={{ color: '#0891B2', fontStyle: 'italic' }}>su familia está protegida</span></>
            : <>Your employee performs better<br />when they know<br /><span style={{ color: '#0891B2', fontStyle: 'italic' }}>their family is protected</span></>
          }
        </h1>

        {/* Rotating fear */}
        <div style={{
          borderLeft: '3px solid #D97706',
          paddingLeft: 16, marginBottom: 32,
          minHeight: 52,
        }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: '#D97706', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
            {es ? 'Lo que piensa tu empleado hoy' : 'What your employee thinks today'}
          </div>
          <p key={fearIdx} style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', fontStyle: 'italic', lineHeight: 1.5, animation: 'fadeUp .3s ease' }}>
            {FEARS[lang][fearIdx]}
          </p>
        </div>

        {/* 4 service pills */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 36 }}>
          {SERVICES.map(({ Icon, color, bg, es: esLabel, en: enLabel }) => (
            <div key={esLabel} style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: 'rgba(255,255,255,0.05)',
              borderRadius: 8, padding: '10px 12px',
              border: '1px solid rgba(255,255,255,0.08)',
            }}>
              <div style={{ width: 28, height: 28, borderRadius: 7, background: `${color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={15} color={color} strokeWidth={1.6} />
              </div>
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>
                {es ? esLabel : enLabel}
              </span>
            </div>
          ))}
        </div>

        {/* NOT insurance */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 32, padding: '10px 14px', background: 'rgba(255,255,255,0.04)', borderRadius: 8, border: '1px solid rgba(255,255,255,0.08)' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0891B2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', lineHeight: 1.4 }}>
            <strong style={{ color: 'white' }}>{es ? 'NO es un seguro médico' : 'NOT health insurance'}</strong>
            {es ? ' — sin deducibles, sin copagos, sin trámites' : ' — no deductibles, no copays, no claims'}
          </span>
        </div>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 10 }}>
          <Link href="/dashboard" style={{
            background: '#006847', color: 'white',
            padding: '13px 28px', borderRadius: 8,
            fontSize: 14, fontWeight: 600,
            display: 'inline-flex', alignItems: 'center', gap: 8,
          }}>
            {es ? 'Acceder al Portal' : 'Access Portal'}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </Link>
          <a style={{ background: 'transparent', color: 'rgba(255,255,255,0.6)', padding: '13px 20px', borderRadius: 8, fontSize: 13, fontWeight: 500, border: '1px solid rgba(255,255,255,0.12)', cursor: 'pointer' }}>
            {es ? 'Ver cómo funciona' : 'See how it works'}
          </a>
        </div>

        {/* Bottom: loss aversion */}
        <div style={{ marginTop: 28, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <span style={{ fontSize: 12, color: 'rgba(220,38,38,0.85)' }}>
            {es
              ? 'Reemplazar un empleado cuesta $3,000–$8,000. SaludCompartida: $18/mes.'
              : 'Replacing an employee costs $3,000–$8,000. SaludCompartida: $18/month.'
            }
          </span>
        </div>
      </div>

      {/* ── RIGHT PANEL — Imagen niña pintada ── */}
      <div style={{ position: 'relative', overflow: 'hidden', background: '#0C1A2E' }}>
        {/* Photo — niña pintada */}
        <img
          src="/nina-pintada.jpg"
          alt="Niña pintada — SaludCompartida"
          onLoad={() => setImgLoaded(true)}
          onError={e => { e.target.style.display = 'none' }}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center',
            opacity: imgLoaded ? 1 : 0,
            transition: 'opacity .6s ease',
          }}
        />

        {/* Fallback gradient when image not yet uploaded */}
        {!imgLoaded && (
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(135deg, #0C4A6E 0%, #0891B2 35%, #06B6D4 55%, #BAE6FD 80%, #F0F9FF 100%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" style={{ marginBottom: 16, opacity: 0.4 }}>
              <rect x="8" y="16" width="48" height="36" rx="4" stroke="white" strokeWidth="2"/>
              <circle cx="24" cy="30" r="6" stroke="white" strokeWidth="2"/>
              <path d="M8 44l14-10 10 8 8-6 14 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, textAlign: 'center', maxWidth: 200, lineHeight: 1.5 }}>
              {es ? 'Sube nina-pintada.jpg a public/' : 'Upload nina-pintada.jpg to public/'}
            </p>
          </div>
        )}

        {/* Subtle left gradient bridge — cyan connects left panel to photo */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'linear-gradient(to right, rgba(8,145,178,0.25) 0%, transparent 30%)',
        }} />

        {/* Bottom caption */}
        <div style={{
          position: 'absolute', bottom: 24, left: 24, right: 24,
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
        }}>
          <div style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(12px)', borderRadius: 10, padding: '10px 14px', maxWidth: 280 }}>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.9)', lineHeight: 1.5, fontStyle: 'italic', margin: 0 }}>
              {es
                ? '"Todo lo que quiero es saber que está bien."'
                : '"All I want is to know she\'s okay."'
              }
            </p>
            <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', marginTop: 4, margin: '4px 0 0' }}>
              {es ? '— Carlos, trabajador de construcción, Houston' : '— Carlos, construction worker, Houston'}
            </p>
          </div>
          <div style={{ background: 'rgba(0,104,71,0.85)', backdropFilter: 'blur(8px)', borderRadius: 8, padding: '8px 14px' }}>
            <div style={{ fontSize: 18, fontFamily: 'var(--font-display)', color: 'white', lineHeight: 1 }}>$18</div>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>/ mes</div>
          </div>
        </div>
      </div>
    </div>
  )
}
