'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useLang } from '@/contexts/LanguageContext'

const FEARS = {
  es: [
    { quote: '"¿Tendrá mamá para su medicina este mes?"', who: 'Carlos · Construcción · Houston' },
    { quote: '"Si mi hija se enferma no sé cómo pagar al médico."', who: 'Miguel · Manufactura · Dallas' },
    { quote: '"Mi esposa lleva la casa sola y yo no puedo hacer nada desde aquí."', who: 'Javier · Agricultura · California' },
    { quote: '"Papá tiene diabetes y cada mes es una sorpresa cuánto va a costar."', who: 'Rosa · Limpieza · Chicago' },
    { quote: '"Mi mamá vive sola. Le da miedo enfermar y quedarse sin ayuda."', who: 'Andrés · Restaurante · Miami' },
  ],
  en: [
    { quote: '"Will mom have enough for her medicine this month?"', who: 'Carlos · Construction · Houston' },
    { quote: '"If my daughter gets sick I don\'t know how to pay the doctor."', who: 'Miguel · Manufacturing · Dallas' },
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
    <div style={{ position: 'relative', minHeight: 'calc(100vh - 56px)', display: 'flex', overflow: 'hidden' }}>

      {/* ── BACKGROUND: niña pintada full bleed ── */}
      <img
        src="/fotoninapintada.jpeg"
        alt="niña pintada"
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          objectPosition: 'center center',
          display: 'block',
        }}
      />

      {/* ── GRADIENT: izquierda muy oscuro → derecha transparente ── */}
      {/* La niña queda visible en el lado derecho.                   */}
      {/* El área celeste izquierda queda cubierta por el panel oscuro */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to right, rgba(5,8,18,0.97) 0%, rgba(5,8,18,0.94) 28%, rgba(5,8,18,0.75) 46%, rgba(5,8,18,0.25) 62%, transparent 78%)',
        pointerEvents: 'none',
      }} />

      {/* ── CONTENT: izquierda sobre zona celeste ── */}
      <div style={{
        position: 'relative', zIndex: 2,
        width: '50%', minWidth: 460,
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center',
        padding: '56px 56px 56px 48px',
      }}>

        {/* Accent strip */}
        <div style={{
          position: 'absolute', left: 0, top: '8%', bottom: '8%', width: 3,
          background: 'linear-gradient(180deg, transparent, #0891B2 20%, #006847 80%, transparent)',
        }} />

        {/* Audience tags */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 24, flexWrap: 'wrap' }}>
          {['PEO', es ? 'RRHH' : 'HR', 'Risk Manager', 'CFO'].map(l => (
            <span key={l} style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', color: '#5EEAD4', background: 'rgba(94,234,212,0.12)', padding: '3px 10px', borderRadius: 100 }}>
              {l}
            </span>
          ))}
        </div>

        {/* Headline */}
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 46, lineHeight: 1.1, color: 'white', fontWeight: 700, marginBottom: 18 }}>
          {es
            ? <>Tu empleado trabaja mejor<br />cuando sabe que<br /><span style={{ color: '#5EEAD4', fontStyle: 'italic', fontWeight: 700 }}>su familia está protegida</span></>
            : <>Your employee performs better<br />when they know<br /><span style={{ color: '#5EEAD4', fontStyle: 'italic', fontWeight: 700 }}>their family is protected</span></>
          }
        </h1>

        <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.85)', fontWeight: 600, marginBottom: 32, lineHeight: 1.7, maxWidth: 420 }}>
          {es
            ? 'El 78% de tu fuerza laboral latina manda remesas a México cada mes. Mientras trabajan, piensan en esto:'
            : '78% of your Latino workforce sends remittances to Mexico every month. While working, they think about this:'
          }
        </p>

        {/* ── ROTATING FEAR CARD ── */}
        <div style={{
          background: 'rgba(0,0,0,0.55)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderLeft: '4px solid #F59E0B',
          borderRadius: '0 14px 14px 0',
          padding: '22px 24px',
          marginBottom: 32,
          minHeight: 96,
        }}>
          <p key={idx} style={{
            fontSize: 18, fontStyle: 'italic', fontWeight: 700,
            color: 'white', lineHeight: 1.55,
            marginBottom: 12, display: 'block',
            animation: 'fadeUp .35s ease',
          }}>
            {fears[idx].quote}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ display: 'flex', gap: 5 }}>
              {fears.map((_, i) => (
                <div key={i} onClick={() => setIdx(i)} style={{
                  width: i === idx ? 18 : 5, height: 5, borderRadius: 3,
                  background: i === idx ? '#F59E0B' : 'rgba(255,255,255,0.25)',
                  cursor: 'pointer', transition: 'all .25s',
                }} />
              ))}
            </div>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', fontWeight: 600, marginLeft: 4 }}>
              {fears[idx].who}
            </span>
          </div>
        </div>

        {/* NOT insurance badge */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 9,
          marginBottom: 28, padding: '9px 14px',
          background: 'rgba(8,145,178,0.15)',
          border: '1px solid rgba(8,145,178,0.3)',
          borderRadius: 8,
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" style={{ flexShrink: 0 }}>
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <span style={{ fontSize: 12, fontWeight: 700, color: 'white' }}>
            {es ? 'NO es un seguro médico' : 'NOT health insurance'}
            <span style={{ fontWeight: 600, color: 'rgba(255,255,255,0.8)' }}>
              {es ? ' · sin deducibles · sin copagos · activa en 30s' : ' · no deductibles · no copays · activates in 30s'}
            </span>
          </span>
        </div>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 32 }}>
          <Link href="/login" style={{
            background: '#006847', color: 'white',
            padding: '13px 32px', borderRadius: 8,
            fontSize: 14, fontWeight: 700,
            display: 'inline-flex', alignItems: 'center', gap: 8,
            letterSpacing: '0.02em', border: '2px solid #006847',
          }}>
            {es ? 'Solicitar acceso' : 'Request access'}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <a style={{
            background: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(8px)',
            color: 'white', fontWeight: 600,
            padding: '13px 22px', borderRadius: 8,
            fontSize: 13, border: '1px solid rgba(255,255,255,0.2)',
            cursor: 'pointer',
          }}>
            {es ? 'Ver cómo funciona' : 'See how it works'}
          </a>
        </div>

        {/* Bottom stats */}
        <div style={{ display: 'flex', gap: 32, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          {[
            { n: '$18', sub: es ? '/ mes por empleado' : '/ month per employee' },
            { n: '4', sub: es ? 'servicios para la familia' : 'family services' },
            { n: '30s', sub: es ? 'para activar' : 'to activate' },
          ].map(({ n, sub }) => (
            <div key={n}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'white', fontWeight: 700, lineHeight: 1 }}>{n}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.65)', fontWeight: 600, marginTop: 4 }}>{sub}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
