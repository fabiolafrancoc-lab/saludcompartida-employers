'use client'
import { useState } from 'react'
import { useLang } from '@/contexts/LanguageContext'
import { translations as T, t } from '@/lib/translations'

const STEP_DETAIL = {
  es: [
    {
      who: 'Tu empresa + SaludCompartida',
      duration: 'Una vez · 1 semana',
      visual: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
      color: 'var(--navy)',
      bg: 'var(--navy-light)',
      what: 'Defines qué servicios incluye el beneficio (telemedicina, farmacia, terapia, Lupita), la modalidad de pago y qué tipos de empleado son elegibles.',
      result: 'Contrato firmado con tu PEO. Póliza grupal activa.',
      callout: {
        icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
        text: 'No requiere cambiar tu PEO actual. Se configura sobre tu operación existente.',
      },
    },
    {
      who: 'Tu PEO',
      duration: '2–4 semanas de setup · luego automático',
      visual: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
      color: 'var(--teal)',
      bg: 'var(--teal-light)',
      what: 'El sistema de RRHH del PEO (PrismHR, Rippling, ADP) se conecta a la API de SaludCompartida. Cada empleado que elige el beneficio en el open enrollment queda registrado automáticamente.',
      result: 'Enrollment automático en tiempo real. Cero trabajo manual.',
      callout: {
        icon: 'M13 10V3L4 14h7v7l9-11h-7z',
        text: 'PrismHR, Rippling y ADP ya hacen integraciones como esta con otros proveedores de beneficios. Tu equipo técnico lo configura una sola vez.',
      },
    },
    {
      who: 'El empleado + su familia en México',
      duration: '30 segundos',
      visual: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
      color: 'var(--emerald)',
      bg: 'var(--emerald-light)',
      what: 'El empleado recibe un email con su SaludCompartida Employee ID y un enlace de activación. Con un clic activa la cuenta de su mamá, papá o hijos en México. Ellos reciben un WhatsApp y el beneficio queda activo inmediatamente.',
      result: 'La familia accede a médico 24/7, farmacia y terapia desde ese momento.',
      callout: {
        icon: 'M12 18h.01M8 21h8a2 2 0 002-2v-2H6v2a2 2 0 002 2zM10 7L8.5 2H4l2 5H10zm4 0h3.5l2-5h-4.5L14 7zm-4 0v11m4-11v11',
        text: 'Sin aplicación que descargar para la familia. Todo desde WhatsApp o el navegador del celular.',
      },
    },
    {
      who: 'Tu dashboard · día 1 de cada mes',
      duration: 'Automático · mensual',
      visual: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
      color: 'var(--amber)',
      bg: 'var(--amber-light)',
      what: 'Tu dashboard muestra en tiempo real cuántos empleados usaron el beneficio, qué servicios usaron y el ahorro generado. El día 1 de cada mes tu PEO recibe una factura consolidada automáticamente. Tú no tocas nada.',
      result: 'Un solo invoice mensual a tu PEO. Datos para demostrar el ROI a tu CFO.',
      callout: {
        icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
        text: 'Si un empleado sale de la empresa, el certificado entra en ventana COBRA de 30 días automáticamente.',
      },
    },
  ],
  en: [
    {
      who: 'Your company + SaludCompartida',
      duration: 'Once · 1 week',
      visual: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
      color: 'var(--navy)',
      bg: 'var(--navy-light)',
      what: 'You define which services the benefit includes (telemedicine, pharmacy, therapy, Lupita), the payment model, and which employee types are eligible.',
      result: 'Signed contract with your PEO. Group policy active.',
      callout: {
        icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
        text: 'No need to change your current PEO. Configured on top of your existing operation.',
      },
    },
    {
      who: 'Your PEO',
      duration: '2–4 week setup · then automatic',
      visual: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
      color: 'var(--teal)',
      bg: 'var(--teal-light)',
      what: 'The PEO HR system (PrismHR, Rippling, ADP) connects to the SaludCompartida API. Every employee who selects the benefit during open enrollment is automatically registered.',
      result: 'Real-time automatic enrollment. Zero manual work.',
      callout: {
        icon: 'M13 10V3L4 14h7v7l9-11h-7z',
        text: 'PrismHR, Rippling, and ADP already do integrations like this with other benefit providers. Your tech team sets it up once.',
      },
    },
    {
      who: 'The employee + their family in Mexico',
      duration: '30 seconds',
      visual: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
      color: 'var(--emerald)',
      bg: 'var(--emerald-light)',
      what: 'The employee receives an email with their SaludCompartida Employee ID and an activation link. One click activates their mom\'s, dad\'s, or children\'s account in Mexico. They receive a WhatsApp message and the benefit is active immediately.',
      result: 'The family accesses 24/7 doctor, pharmacy, and therapy from that moment.',
      callout: {
        icon: 'M12 18h.01M8 21h8a2 2 0 002-2v-2H6v2a2 2 0 002 2zM10 7L8.5 2H4l2 5H10zm4 0h3.5l2-5h-4.5L14 7zm-4 0v11m4-11v11',
        text: 'No app to download for the family. Everything via WhatsApp or the phone browser.',
      },
    },
    {
      who: 'Your dashboard · day 1 each month',
      duration: 'Automatic · monthly',
      visual: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
      color: 'var(--amber)',
      bg: 'var(--amber-light)',
      what: 'Your dashboard shows in real time how many employees used the benefit, which services they used, and the savings generated. On day 1 of each month your PEO automatically receives a consolidated invoice. You touch nothing.',
      result: 'One monthly invoice to your PEO. Data to prove ROI to your CFO.',
      callout: {
        icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
        text: 'When an employee leaves the company, their certificate automatically enters a 30-day COBRA window.',
      },
    },
  ]
}

const STEP_LABELS = {
  es: ['Firmas la póliza', 'PEO envía empleados', 'Familia se activa', 'Mides el impacto'],
  en: ['Sign the policy', 'PEO sends employees', 'Family activates', 'Measure impact'],
}

export default function HowItWorks() {
  const { lang } = useLang()
  const es = lang === 'es'
  const [active, setActive] = useState(0)
  const h = T.how
  const steps = STEP_DETAIL[lang]
  const step = steps[active]
  const labels = STEP_LABELS[lang]

  return (
    <div style={{ background: 'var(--white)', animation: 'fadeUp .35s ease' }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '28px 48px' }}>

        {/* Header */}
        <div style={{ maxWidth: 560, marginBottom: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--teal)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12 }}>
            {lang === 'es' ? 'Proceso de enrolamiento' : 'Enrollment process'}
          </div>
          <h2 style={{ fontSize: 32, marginBottom: 10 }}>{lang === 'es' ? 'Cómo se enrola a SaludCompartida' : 'How to enroll in SaludCompartida'}</h2>
          <p style={{ fontSize: 16, color: 'var(--muted)', lineHeight: 1.65 }}>{lang === 'es' ? 'Cuatro pasos. La mayoría automatizados. Tu equipo de RRHH configura una vez y el sistema trabaja solo.' : 'Four steps. Most automated. Your HR team configures once and the system runs itself.'}</p>
        </div>

        {/* Step pills */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 40, flexWrap: 'wrap' }}>
          {labels.map((label, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '10px 18px',
                borderRadius: 100,
                border: active === i ? `2px solid ${steps[i].color}` : '2px solid var(--border)',
                background: active === i ? steps[i].bg : 'var(--white)',
                cursor: 'pointer',
                transition: 'all .15s',
              }}
            >
              {/* Step number */}
              <div style={{
                width: 22, height: 22, borderRadius: '50%',
                background: active === i ? steps[i].color : 'var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, transition: 'background .15s',
              }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: 'white' }}>{i + 1}</span>
              </div>
              <span style={{
                fontSize: 13, fontWeight: active === i ? 600 : 400,
                color: active === i ? steps[i].color : 'var(--muted)',
                whiteSpace: 'nowrap',
              }}>
                {label}
              </span>
            </button>
          ))}
        </div>

        {/* Step detail panel */}
        <div key={active} style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40,
          animation: 'fadeUp .2s ease',
        }}>

          {/* Left: main info */}
          <div>
            {/* Who + duration */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
              <div style={{ width: 52, height: 52, borderRadius: 14, background: step.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={step.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d={step.visual}/>
                </svg>
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>{step.who}</div>
                <div style={{ fontSize: 11, color: step.color, fontWeight: 500, marginTop: 2 }}>{step.duration}</div>
              </div>
            </div>

            {/* Step number large */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 16 }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 64, color: step.bg, lineHeight: 1, userSelect: 'none',
                WebkitTextStroke: `2px ${step.color}` }}>
                0{active + 1}
              </span>
              <h3 style={{ fontSize: 22, color: 'var(--ink)', lineHeight: 1.2 }}>{labels[active]}</h3>
            </div>

            <p style={{ fontSize: 15, color: 'var(--body)', lineHeight: 1.8, marginBottom: 24 }}>
              {step.what}
            </p>

            {/* Result */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              background: step.bg, borderRadius: 10, padding: '12px 16px',
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={step.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span style={{ fontSize: 13, fontWeight: 600, color: step.color }}>{step.result}</span>
            </div>
          </div>

          {/* Right: visual + callout */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

            {/* Visual timeline showing position */}
            <div style={{ background: 'var(--sand-light)', borderRadius: 16, padding: 28, flex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 20 }}>
                {es ? 'Flujo completo' : 'Full flow'}
              </div>
              {steps.map((s, i) => (
                <div
                  key={i}
                  onClick={() => setActive(i)}
                  style={{ display: 'flex', gap: 12, marginBottom: i < 3 ? 0 : 0, cursor: 'pointer', position: 'relative' }}
                >
                  {/* Vertical line */}
                  {i < 3 && (
                    <div style={{
                      position: 'absolute', left: 11, top: 22, width: 2, height: 36,
                      background: i < active ? s.color : 'var(--border)',
                    }}/>
                  )}
                  <div style={{
                    width: 24, height: 24, borderRadius: '50%', flexShrink: 0,
                    background: i <= active ? s.color : 'var(--border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'background .2s', marginBottom: i < 3 ? 24 : 0,
                  }}>
                    {i < active
                      ? <svg width="12" height="10" viewBox="0 0 12 10" fill="none"><path d="M1.5 5L4.5 8L10.5 1.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      : <span style={{ fontSize: 10, fontWeight: 700, color: i === active ? 'white' : 'var(--muted)' }}>{i + 1}</span>
                    }
                  </div>
                  <div style={{ paddingBottom: i < 3 ? 24 : 0 }}>
                    <div style={{ fontSize: 13, fontWeight: i === active ? 600 : 400, color: i === active ? s.color : 'var(--muted)', lineHeight: 1.2 }}>
                      {labels[i]}
                    </div>
                    {i === active && (
                      <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 3 }}>{s.who}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Callout */}
            <div style={{
              background: 'var(--white)',
              border: `1px solid ${step.color}40`,
              borderLeft: `3px solid ${step.color}`,
              borderRadius: '0 10px 10px 0',
              padding: '14px 18px',
              display: 'flex', gap: 12, alignItems: 'flex-start',
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={step.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
                <path d={step.callout.icon}/>
              </svg>
              <span style={{ fontSize: 13, color: 'var(--body)', lineHeight: 1.55 }}>{step.callout.text}</span>
            </div>
          </div>
        </div>

        {/* Navigation arrows */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 36, paddingTop: 24, borderTop: '1px solid var(--border)' }}>
          <button
            onClick={() => setActive(a => Math.max(0, a - 1))}
            disabled={active === 0}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '10px 20px', borderRadius: 8,
              border: '1px solid var(--border)',
              background: active === 0 ? 'var(--surface)' : 'var(--white)',
              color: active === 0 ? 'var(--muted)' : 'var(--navy)',
              cursor: active === 0 ? 'default' : 'pointer',
              fontSize: 13, fontWeight: 500,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 4l-4 4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            {es ? 'Anterior' : 'Previous'}
          </button>

          {/* Dot indicators */}
          <div style={{ display: 'flex', gap: 8 }}>
            {steps.map((s, i) => (
              <div
                key={i}
                onClick={() => setActive(i)}
                style={{
                  width: active === i ? 24 : 8,
                  height: 8, borderRadius: 4,
                  background: active === i ? s.color : 'var(--border)',
                  cursor: 'pointer',
                  transition: 'all .2s',
                }}
              />
            ))}
          </div>

          <button
            onClick={() => setActive(a => Math.min(3, a + 1))}
            disabled={active === 3}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '10px 20px', borderRadius: 8,
              border: '1px solid var(--border)',
              background: active === 3 ? 'var(--surface)' : step.color,
              color: active === 3 ? 'var(--muted)' : 'white',
              cursor: active === 3 ? 'default' : 'pointer',
              fontSize: 13, fontWeight: 600,
            }}
          >
            {active === 3 ? (es ? 'Completado' : 'Completed') : (es ? 'Siguiente' : 'Next')}
            {active < 3 && <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
          </button>
        </div>
      </div>
    </div>
  )
}
