'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useLang } from '@/contexts/LanguageContext'

// Rotating employee fears — the ONLY dynamic content needed
// The image tells the benefit story. The text tells the human cost.
const FEARS = {
  es: [
    { quote: '"¿Tendrá mamá para su medicina este mes?"', who: 'Carlos · Construcción · Houston' },
    { quote: '"Si mi hija se enferma no sé cómo pagar el médico."', who: 'Miguel · Manufactura · Dallas' },
    { quote: '"Mi esposa lleva la casa sola y yo no puedo hacer nada desde aquí."', who: 'Javier · Agricultura · California' },
    { quote: '"Papá tiene diabetes y cada mes es una sorpresa cuánto va a costar."', who: 'Rosa · Limpieza · Chicago' },
    { quote: '"Mi mamá vive sola. Le da miedo enfermar y quedarse sin ayuda."', who: 'Andrés · Restaurante · Miami' },
  ],
  en: [
    { quote: '"Will mom have enough for her medicine this month?"', who: 'Carlos · Construction · Houston' },
    { quote: '"If my daughter gets sick I don\'t know how to pay for the doctor."', who: 'Miguel · Manufacturing · Dallas' },
    { quote: '"My wife runs the household alone and I can\'t do anything from here."', who: 'Javier · Agriculture · California' },
    { quote: '"Dad has diabetes and every month is a surprise how much it\'ll cost."', who: 'Rosa · Cleaning · Chicago' },
    { quote: '"My mom lives alone. She\'s afraid of getting sick with no one to help."', who: 'Andrés · Restaurant · Miami' },
  ]
}

export default function Hero() {
  const { lang } = useLang()
  const es = lang === 'es'
  const [idx, setIdx] = useState(0)
  const fears = FEARS[lang]

  useEffect(() => {
    const t = setInterval(() => setIdx(p => (p + 1) % fears.length), 4000)
    return () => clearInterval(t)
  }, [lang])

  return (
    <div style={{
      position: 'relative',
      minHeight: 'calc(100vh - 56px)',
      display: 'flex',
      overflow: 'hidden',
    }}>

      {/* ── FULL BACKGROUND: niña pintada ── */}
      <img
        src="/nina-pintada.jpg"
        alt=""
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          objectPosition: 'right center',
        }}
      />

      {/* Gradient: left dark (readable) → right transparent (girl visible) */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(100deg, rgba(10,15,30,0.95) 0%, rgba(10,15,30,0.88) 30%, rgba(10,15,30,0.55) 55%, rgba(10,15,30,0.1) 72%, transparent 85%)',
        pointerEvents: 'none',
      }} />

      {/* ── LEFT CONTENT — sits over the cyan area of the image ── */}
      <div style={{
        position: 'relative', zIndex: 2,
        width: '48%', minWidth: 480,
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center',
        padding: '64px 56px 64px 52px',
      }}>

        {/* Thin cyan/green vertical accent */}
        <div style={{
          position: 'absolute', left: 0, top: '10%', bottom: '10%', width: 3,
          background: 'linear-gradient(180deg, transparent, #0891B2 20%, #006847 80%, transparent)',
          borderRadius: 2,
        }} />

        {/* Audience tags */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 28 }}>
          {['PEO', es ? 'RRHH' : 'HR', 'Risk Manager', 'CFO'].map(l => (
            <span key={l} style={{
              fontSize: 9, fontWeight: 700, letterSpacing: '0.08em',
              color: '#0891B2', background: 'rgba(8,145,178,0.14)',
              padding: '3px 9px', borderRadius: 100,
            }}>{l}</span>
          ))}
        </div>

        {/* Main headline */}
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 46, lineHeight: 1.1,
          color: 'white', fontWeight: 400,
          marginBottom: 16,
        }}>
          {es
            ? <>Tu empleado trabaja mejor<br />cuando sabe que<br /><span style={{ color: '#0891B2', fontStyle: 'italic' }}>su familia está protegida</span></>
            : <>Your employee performs better<br />when they know<br /><span style={{ color: '#0891B2', fontStyle: 'italic' }}>their family is protected</span></>
          }
        </h1>

        <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.65)', marginBottom: 36, lineHeight: 1.7, maxWidth: 420 }}>
          {es
            ? 'El 78% de tu fuerza laboral latina manda remesas a México cada mes. Mientras trabajan, piensan en esto:'
            : '78% of your Latino workforce sends remittances to Mexico every month. While they work, they\'re thinking about this:'
          }
        </p>

        {/* ── ROTATING FEAR QUOTE CARD — the only dynamic element ── */}
        <div style={{
          background: 'rgba(255,255,255,0.06)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderLeft: '3px solid #D97706',
          borderRadius: '0 12px 12px 0',
          padding: '22px 24px',
          marginBottom: 36,
          minHeight: 90,
          transition: 'all .3s ease',
        }}>
          <p key={idx} style={{
            fontSize: 17, fontStyle: 'italic',
            color: 'rgba(255,255,255,0.92)',
            lineHeight: 1.6, marginBottom: 10,
            animation: 'fadeUp .35s ease',
          }}>
            {fears[idx].quote}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {/* Dot indicators */}
            <div style={{ display: 'flex', gap: 4 }}>
              {fears.map((_, i) => (
                <div key={i} onClick={() => setIdx(i)} style={{
                  width: i === idx ? 16 : 5, height: 5, borderRadius: 3,
                  background: i === idx ? '#D97706' : 'rgba(255,255,255,0.2)',
                  cursor: 'pointer', transition: 'all .25s',
                }} />
              ))}
            </div>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginLeft: 4 }}>
              {fears[idx].who}
            </span>
          </div>
        </div>

        {/* NOT insurance — compact */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          marginBottom: 28,
          padding: '8px 12px',
          background: 'rgba(8,145,178,0.1)',
          border: '1px solid rgba(8,145,178,0.2)',
          borderRadius: 8,
        }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0891B2" strokeWidth="2.5" strokeLinecap="round">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>
            <strong style={{ color: 'white', fontWeight: 600 }}>
              {es ? 'NO es un seguro médico' : 'NOT health insurance'}
            </strong>
            {es ? ' · sin deducibles · sin copagos · activa en 30 segundos' : ' · no deductibles · no copays · activates in 30 seconds'}
          </span>
        </div>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 10 }}>
          <Link href="/dashboard" style={{
            background: '#006847', color: 'white',
            padding: '13px 32px', borderRadius: 8,
            fontSize: 14, fontWeight: 700,
            display: 'inline-flex', alignItems: 'center', gap: 8,
            letterSpacing: '0.02em',
          }}>
            {es ? 'Acceder al Portal' : 'Access Portal'}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <a style={{
            background: 'rgba(255,255,255,0.08)',
            backdropFilter: 'blur(8px)',
            color: 'rgba(255,255,255,0.75)',
            padding: '13px 22px', borderRadius: 8,
            fontSize: 13, fontWeight: 500,
            border: '1px solid rgba(255,255,255,0.12)',
            cursor: 'pointer',
          }}>
            {es ? 'Ver cómo funciona' : 'See how it works'}
          </a>
        </div>

        {/* Bottom stat strip */}
        <div style={{ display: 'flex', gap: 28, marginTop: 36, paddingTop: 28, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          {[
            { n: '$18', sub: es ? '/ mes por empleado' : '/ month per employee' },
            { n: '4', sub: es ? 'servicios para la familia' : 'family services' },
            { n: '30s', sub: es ? 'para activar el beneficio' : 'to activate the benefit' },
          ].map(({ n, sub }) => (
            <div key={n}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 26, color: 'white', lineHeight: 1 }}>{n}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 3 }}>{sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Fallback gradient when image missing */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
