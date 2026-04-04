'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useLang } from '@/contexts/LanguageContext'

const EMPLOYEE_FEARS = {
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

export default function Hero() {
  const { lang } = useLang()
  const es = lang === 'es'
  const [fearIdx, setFearIdx] = useState(0)

  useEffect(() => {
    const i = setInterval(() => setFearIdx(p => (p + 1) % 3), 3400)
    return () => clearInterval(i)
  }, [])

  return (
    <div style={{ background: 'var(--white)', animation: 'fadeUp .35s ease' }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '72px 48px 80px' }}>

        <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 64, alignItems: 'start' }}>

          {/* ── LEFT: Core message ── */}
          <div>

            {/* Audience badge */}
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--teal)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 16 }}>
              {es ? 'Para PEOs · HR Managers · Risk Managers' : 'For PEOs · HR Managers · Risk Managers'}
            </div>

            <h1 style={{ fontSize: 48, lineHeight: 1.1, marginBottom: 24, color: 'var(--ink)' }}>
              {es
                ? <>Un empleado con la<br/>mente en México<br/><span style={{ color: 'var(--teal)', fontStyle: 'italic' }}>no rinde al 100%</span></>
                : <>An employee with their<br/>mind in Mexico<br/><span style={{ color: 'var(--teal)', fontStyle: 'italic' }}>can't perform at 100%</span></>
              }
            </h1>

            {/* Rotating fear — the employee's voice */}
            <div style={{
              background: 'var(--amber-light)',
              borderLeft: '4px solid var(--amber)',
              borderRadius: '0 10px 10px 0',
              padding: '16px 20px',
              marginBottom: 24,
              minHeight: 58,
              display: 'flex', alignItems: 'center',
            }}>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--amber)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
                  {es ? 'Lo que piensa tu empleado mientras trabaja hoy' : 'What your employee is thinking while working today'}
                </div>
                <p key={fearIdx} style={{ fontSize: 14, fontStyle: 'italic', color: 'var(--ink)', lineHeight: 1.5, animation: 'fadeUp .3s ease' }}>
                  {EMPLOYEE_FEARS[lang][fearIdx]}
                </p>
              </div>
            </div>

            <p style={{ fontSize: 15, color: 'var(--body)', lineHeight: 1.8, marginBottom: 12 }}>
              {es
                ? 'El 78% de tu fuerza laboral latina manda remesas a México cada mes. Cuando su familia no tiene acceso a salud, el estrés financiero y emocional los sigue a cada turno de trabajo.'
                : '78% of your Latino workforce sends remittances to Mexico every month. When their family has no access to healthcare, financial and emotional stress follows them to every shift.'
              }
            </p>

            <p style={{ fontSize: 15, color: 'var(--body)', lineHeight: 1.8, marginBottom: 32, fontWeight: 500 }}>
              {es
                ? 'SaludCompartida resuelve ese problema. Y cuando ese problema se resuelve, tu empleado llega tranquilo, se queda más tiempo y trabaja mejor.'
                : 'SaludCompartida solves that problem. And when that problem is solved, your employee shows up calmer, stays longer, and performs better.'
              }
            </p>

            {/* Loss aversion */}
            <div style={{
              background: 'var(--loss-light)',
              border: '1px solid rgba(220,38,38,0.15)',
              borderLeft: '3px solid var(--loss)',
              borderRadius: '0 8px 8px 0',
              padding: '12px 16px', marginBottom: 32,
            }}>
              <span style={{ fontSize: 13, color: 'var(--loss)', fontWeight: 600 }}>
                {es
                  ? 'Reemplazar un empleado cuesta entre $3,000 y $8,000. SaludCompartida cuesta $18/mes por empleado.'
                  : 'Replacing an employee costs $3,000–$8,000. SaludCompartida costs $18/month per employee.'
                }
              </span>
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <Link href="/dashboard" style={{
                background: 'var(--navy)', color: 'white',
                padding: '13px 28px', borderRadius: 8,
                fontSize: 14, fontWeight: 600,
                display: 'inline-flex', alignItems: 'center', gap: 8,
              }}>
                {es ? 'Acceder al Portal' : 'Access Portal'}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
              <a href="#beneficios" style={{
                background: 'var(--white)', color: 'var(--navy)',
                padding: '13px 24px', borderRadius: 8,
                fontSize: 14, fontWeight: 500,
                border: '1px solid var(--border)',
              }}>
                {es ? 'Ver beneficios' : 'See benefits'}
              </a>
            </div>
          </div>

          {/* ── RIGHT: What the employee gets + NOT insurance ── */}
          <div>

            {/* NOT insurance — clear and prominent */}
            <div style={{
              background: 'var(--navy)',
              borderRadius: '12px 12px 0 0',
              padding: '16px 22px',
              display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'white', letterSpacing: '0.04em' }}>
                  {es ? 'IMPORTANTE: Esto NO es un seguro médico' : 'IMPORTANT: This is NOT health insurance'}
                </div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.65)', marginTop: 2, lineHeight: 1.4 }}>
                  {es
                    ? 'Es un beneficio de acceso a salud. Sin deducibles, sin copagos, sin trámites. Activa en 30 segundos.'
                    : "It's a healthcare access benefit. No deductibles, no copays, no paperwork. Activates in 30 seconds."
                  }
                </div>
              </div>
            </div>

            {/* 4 employee benefits */}
            <div style={{ border: '1px solid var(--border)', borderTop: 'none', borderRadius: '0 0 12px 12px', overflow: 'hidden' }}>
              {[
                {
                  icon: 'M15 10l4.553-2.069A1 1 0 0121 8.87V15.13a1 1 0 01-1.447.9L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z',
                  color: 'var(--teal)',
                  bg: 'var(--teal-light)',
                  title: es ? 'Médico 24/7 por videollamada' : '24/7 Doctor by video call',
                  desc: es ? 'Su familia en México consulta a un médico a cualquier hora, desde su celular. Sin fila, sin traslado, sin espera.' : 'Their family in Mexico consults a doctor any time, from their phone. No line, no travel, no wait.',
                  tag: es ? 'Telemedicina' : 'Telemedicine',
                },
                {
                  icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
                  color: 'var(--amber)',
                  bg: 'var(--amber-light)',
                  title: es ? 'Descuentos en farmacias de México' : 'Discounts at Mexican pharmacies',
                  desc: es ? 'Hasta 75% de descuento en 1,700+ farmacias. La remesa ya no se va en medicamentos crónicos.' : 'Up to 75% discount at 1,700+ pharmacies. Remittances no longer go to chronic medications.',
                  tag: es ? 'Farmacia' : 'Pharmacy',
                },
                {
                  icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
                  color: 'var(--emerald)',
                  bg: 'var(--emerald-light)',
                  title: es ? 'Terapia psicológica online' : 'Online psychological therapy',
                  desc: es ? 'Sesiones con psicólogo certificado para la familia. Salud mental para adultos mayores, padres, hijos.' : 'Sessions with certified psychologist for the family. Mental health for seniors, parents, children.',
                  tag: es ? 'Terapia' : 'Therapy',
                },
                {
                  icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
                  color: 'var(--navy)',
                  bg: 'var(--navy-light)',
                  title: es ? 'Acompañamiento emocional AI' : 'AI emotional companionship',
                  desc: es ? 'Lupita llama proactivamente a adultos mayores. Detecta crisis de salud antes de que se conviertan en emergencias.' : 'Lupita proactively calls seniors. Detects health crises before they become emergencies.',
                  tag: es ? 'Lupita AI' : 'Lupita AI',
                },
              ].map(({ icon, color, bg, title, desc, tag }, i) => (
                <div key={i} style={{ display: 'flex', gap: 14, padding: '16px 20px', borderTop: i > 0 ? '1px solid var(--border)' : 'none', background: 'var(--white)' }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d={icon}/>
                    </svg>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>{title}</span>
                      <span style={{ fontSize: 9, fontWeight: 700, color, background: bg, padding: '2px 6px', borderRadius: 100, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{tag}</span>
                    </div>
                    <p style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.55 }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* ROI quick number */}
            <div style={{
              display: 'flex', gap: 10, marginTop: 14,
              background: 'var(--loss-light)', borderRadius: 8, padding: '10px 14px',
              alignItems: 'center',
            }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--loss)', lineHeight: 1, flexShrink: 0 }}>24x</div>
              <div style={{ fontSize: 12, color: 'var(--body)', lineHeight: 1.5 }}>
                {es
                  ? 'ROI mínimo reteniendo un solo empleado que hubiera costado $5,200 reemplazar vs $216/año de SaludCompartida'
                  : 'Minimum ROI retaining just one employee who would have cost $5,200 to replace vs $216/year of SaludCompartida'
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
