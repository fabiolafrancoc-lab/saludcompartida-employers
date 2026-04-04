'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useLang } from '@/contexts/LanguageContext'
import { IconTelemedicina, IconFarmacia, IconTerapia, IconLupita, IconApp } from '@/components/icons/SCIcons'

// The employee's actual 3am thought — emotional pattern interrupt
// Neuroscience: starts with THEIR voice, not ours. Mirror neurons fire.
const FEARS = {
  es: [
    { text: '"¿Tendrá mamá para su insulina este mes?"',        who: 'Carlos M., Houston — housekeeper, Marriott' },
    { text: '"El doctor dijo que papá necesita cirugía. No tengo."', who: 'Rosa G., Los Ángeles — line cook' },
    { text: '"Mi mamá no contesta. Creo que está sola y mal."',  who: 'Javier L., Chicago — construction worker' },
  ],
  en: [
    { text: '"Does mom have enough for her insulin this month?"',     who: 'Carlos M., Houston — housekeeper, Marriott' },
    { text: '"The doctor said dad needs surgery. I don\'t have it.", ',  who: 'Rosa G., Los Angeles — line cook' },
    { text: '"Mom isn\'t answering. I think she\'s alone and sick."',  who: 'Javier L., Chicago — construction worker' },
  ]
}

export default function Hero() {
  const { lang } = useLang()
  const es = lang === 'es'
  const [fearIdx, setFearIdx] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setFearIdx(p => (p + 1) % 3)
        setVisible(true)
      }, 400)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{ background: 'var(--white)' }}>

      {/* ── PATTERN INTERRUPT: Employee's voice first ── */}
      {/* Neuroscience: before any pitch, activate empathy. Mirror neurons. */}
      <div style={{ background: 'var(--ink)', padding: '20px 48px' }}>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ flexShrink: 0 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>
              {es ? 'Lo que piensa tu empleado mientras trabaja hoy' : 'What your employee is thinking while working today'}
            </div>
            <div style={{
              fontSize: 15, fontStyle: 'italic', color: 'white', lineHeight: 1.4,
              transition: 'opacity 0.4s ease',
              opacity: visible ? 1 : 0,
              minHeight: 24,
            }}>
              {FEARS[lang][fearIdx].text}
            </div>
          </div>
          <div style={{ borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: 20, flexShrink: 0 }}>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontStyle: 'italic', opacity: visible ? 1 : 0, transition: 'opacity 0.4s ease' }}>
              {FEARS[lang][fearIdx].who}
            </div>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 6, flexShrink: 0 }}>
            {[0,1,2].map(i => (
              <div key={i} onClick={() => { setFearIdx(i); setVisible(true) }} style={{
                width: fearIdx === i ? 20 : 6, height: 6, borderRadius: 3,
                background: fearIdx === i ? 'white' : 'rgba(255,255,255,0.2)',
                cursor: 'pointer', transition: 'all .3s',
              }}/>
            ))}
          </div>
        </div>
      </div>

      {/* ── MAIN HERO ── */}
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '64px 48px 72px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 64, alignItems: 'center' }}>

          {/* Left */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--teal)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 16 }}>
              {es ? 'Para PEOs · HR Managers · Risk Managers' : 'For PEOs · HR Managers · Risk Managers'}
            </div>

            <h1 style={{ fontSize: 46, lineHeight: 1.1, marginBottom: 20, color: 'var(--ink)' }}>
              {es ? <>Un empleado con el<br/>corazón en México<br/><span style={{ color: 'var(--teal)', fontStyle: 'italic' }}>no está contigo al 100%</span></> : <>An employee with their<br/>heart in Mexico<br/><span style={{ color: 'var(--teal)', fontStyle: 'italic' }}>isn't fully present</span></>}
            </h1>

            <p style={{ fontSize: 15, color: 'var(--body)', lineHeight: 1.8, marginBottom: 12, maxWidth: 500 }}>
              {es
                ? 'Tus empleados latinos envían en promedio $393 al mes a sus familias en México. Esa remesa es el único sistema de salud, educación y supervivencia de sus seres queridos.'
                : 'Your Latino employees send an average of $393/month to their families in Mexico. That remittance is their loved ones\' only healthcare, education, and survival system.'
              }
            </p>
            <p style={{ fontSize: 15, color: 'var(--body)', lineHeight: 1.8, marginBottom: 28, maxWidth: 500, fontWeight: 500 }}>
              {es
                ? 'Cuando esa familia no tiene acceso a salud, el empleado lo sabe. Y ese peso se sienta en cada turno de trabajo contigo.'
                : 'When that family has no healthcare access, your employee knows it. And that weight sits with them on every shift.'
              }
            </p>

            {/* NOT insurance — absolute clarity */}
            <div style={{ background: '#EFF6FF', border: '1.5px solid var(--navy)', borderRadius: 10, padding: '14px 18px', marginBottom: 28, display: 'flex', gap: 12, alignItems: 'center' }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <div style={{ fontSize: 13, color: 'var(--navy)', lineHeight: 1.5 }}>
                <strong>{es ? 'Esto NO es un seguro médico.' : 'This is NOT health insurance.'}</strong>
                {es ? ' Es acceso inmediato a salud para su familia en México. Sin deducibles. Sin trámites. Activo en 30 segundos.' : ' It\'s immediate healthcare access for their family in Mexico. No deductibles. No paperwork. Active in 30 seconds.'}
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <Link href="/dashboard" style={{ background: 'var(--navy)', color: 'white', padding: '13px 28px', borderRadius: 8, fontSize: 14, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                {es ? 'Acceder al Portal' : 'Access Portal'}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
              <a href="#problema" style={{ background: 'var(--white)', color: 'var(--navy)', padding: '13px 22px', borderRadius: 8, fontSize: 14, fontWeight: 500, border: '1px solid var(--border)' }}>
                {es ? 'Ver el problema' : 'See the problem'}
              </a>
            </div>
          </div>

          {/* Right — 4 services + NOT insurance */}
          <div>
            <div style={{ background: 'var(--ink)', borderRadius: '12px 12px 0 0', padding: '14px 20px', display: 'flex', gap: 10, alignItems: 'center' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'white' }}>{es ? 'Beneficio de acceso a salud — NO seguro médico' : 'Healthcare access benefit — NOT health insurance'}</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', marginTop: 1 }}>{es ? 'Sin deducibles · Sin copagos · Sin períodos de espera · Activo en 30s' : 'No deductibles · No copays · No waiting periods · Active in 30s'}</div>
              </div>
            </div>
            <div style={{ border: '1px solid var(--border)', borderTop: 'none', borderRadius: '0 0 12px 12px', overflow: 'hidden' }}>
              {[
                { icon: 'M15 10l4.553-2.069A1 1 0 0121 8.87V15.13a1 1 0 01-1.447.9L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z', color: 'var(--teal)', bg: 'var(--teal-light)', title: es ? 'Médico 24/7 por videollamada' : '24/7 Doctor by video call', detail: es ? 'Consulta desde el celular. Sin fila. Sin traslado. Cualquier hora.' : 'Consult from their phone. No line. No travel. Any time.', tag: es ? 'Gratis para la familia' : 'Free for the family' },
                { icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z', color: 'var(--amber)', bg: 'var(--amber-light)', title: es ? 'Descuentos farmacia México' : 'Mexico pharmacy discounts', detail: es ? 'Hasta 75% en 1,700+ farmacias. La remesa ya no se va en medicamentos.' : 'Up to 75% at 1,700+ pharmacies. The remittance no longer goes to meds.', tag: es ? 'Hasta 75% descuento' : 'Up to 75% off' },
                { icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z', color: 'var(--emerald)', bg: 'var(--emerald-light)', title: es ? 'Terapia psicológica online' : 'Online psychological therapy', detail: es ? 'Psicólogo certificado para padres, hijos y adultos mayores.' : 'Certified psychologist for parents, children, and seniors.', tag: es ? 'Agenda en línea' : 'Online scheduling' },
                { icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z', color: 'var(--navy)', bg: 'var(--navy-light)', title: es ? 'Lupita — Compañía AI proactiva' : 'Lupita — Proactive AI companion', detail: es ? 'Llama a la familia. Detecta crisis antes de que ocurran. Rompe la soledad.' : 'Calls the family. Detects crises before they happen. Breaks loneliness.', tag: es ? 'Proactiva · Cultural' : 'Proactive · Cultural' },
              ].map(({ icon, color, bg, title, detail, tag }, i) => (
                <div key={i} style={{ display: 'flex', gap: 14, padding: '14px 18px', borderTop: i > 0 ? '1px solid var(--border)' : 'none', background: 'white' }}>
                  <div style={{ width: 34, height: 34, borderRadius: 8, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={icon}/></svg>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>{title}</span>
                      <span style={{ fontSize: 9, fontWeight: 700, color, background: bg, padding: '2px 6px', borderRadius: 100, textTransform: 'uppercase', letterSpacing: '0.05em', flexShrink: 0 }}>{tag}</span>
                    </div>
                    <p style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.5 }}>{detail}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12, padding: '10px 14px', background: 'var(--loss-light)', borderRadius: 8 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--loss)', flexShrink: 0 }}>24x</div>
              <div style={{ fontSize: 12, color: 'var(--body)', lineHeight: 1.4 }}>
                {es ? 'ROI mínimo. Retener 1 empleado ($5,200) vs costo SC anual ($216).' : 'Minimum ROI. Retaining 1 employee ($5,200) vs annual SC cost ($216).'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
