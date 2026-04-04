'use client'
import { useState } from 'react'
import { useLang } from '@/contexts/LanguageContext'

const NAVY_CARD  = '#162040'
const NAVY_INNER = '#1E2D4F'

export default function Capabilities() {
  const { lang } = useLang()
  const es = lang === 'es'
  const [activeTab, setActiveTab] = useState(0)

  /* ── TIMELINE: De la firma al beneficio activo ── */
  const TIMELINE = [
    {
      week: es ? 'Semana 1' : 'Week 1',
      title: es ? 'Firma del contrato' : 'Contract signing',
      who: 'PEO',
      time: es ? '30 minutos' : '30 minutes',
      color: '#22D3EE',
      peo: [es ? 'Revisa y firma el contrato marco' : 'Review and sign the master agreement'],
      sc:  [
        es ? 'Envía contrato pre-configurado según tu modalidad de pago' : 'Sends pre-configured contract per your payment model',
        es ? 'Asigna un Implementation Manager de SaludCompartida' : 'Assigns a SaludCompartida Implementation Manager',
      ],
    },
    {
      week: es ? 'Semanas 2–3' : 'Weeks 2–3',
      title: es ? 'Conexión técnica' : 'Technical connection',
      who: 'IT',
      time: es ? '2–4 horas de tu equipo IT' : '2–4 hours of your IT team',
      color: '#A78BFA',
      peo: [
        es ? 'Tu equipo IT activa el conector en PrismHR, Rippling o ADP' : 'Your IT team activates the connector in PrismHR, Rippling, or ADP',
        es ? 'Esto se hace una sola vez — después es automático para siempre' : 'This is done once — after that it\'s automatic forever',
      ],
      sc:  [
        es ? 'Provee documentación técnica y credenciales de API' : 'Provides technical documentation and API credentials',
        es ? 'Acompaña el setup con soporte técnico directo' : 'Accompanies setup with direct technical support',
        es ? 'Valida la integración en ambiente sandbox antes de producción' : 'Validates integration in sandbox before production',
      ],
    },
    {
      week: es ? 'Semana 4' : 'Week 4',
      title: es ? 'Comunicación y lanzamiento' : 'Communication & launch',
      who: 'SaludCompartida',
      time: es ? 'Cero trabajo de tu equipo' : 'Zero work from your team',
      color: '#34D399',
      peo: [
        es ? 'Aprueba el kit de comunicación (opcional — ya está listo)' : 'Approves communication kit (optional — already ready)',
      ],
      sc:  [
        es ? 'Envía email de bienvenida personalizado a cada empleado elegible' : 'Sends personalized welcome email to each eligible employee',
        es ? 'Envía video explicativo en español por WhatsApp a cada empleado' : 'Sends explanatory video in Spanish via WhatsApp to each employee',
        es ? 'Activa línea de soporte dedicada para empleados y sus familias en México' : 'Activates dedicated support line for employees and their families in Mexico',
        es ? 'Sube kit de comunicación a tu intranet (si aplica)' : 'Uploads communication kit to your intranet (if applicable)',
      ],
    },
    {
      week: es ? 'Mes 2 en adelante' : 'Month 2 onwards',
      title: es ? 'Operación continua' : 'Ongoing operations',
      who: 'SaludCompartida',
      time: es ? 'Automático — sin intervención de RRHH' : 'Automatic — no HR intervention',
      color: '#FCD34D',
      peo: [
        es ? 'Recibe un solo invoice consolidado el día 1 de cada mes' : 'Receives one consolidated invoice on day 1 of each month',
        es ? 'Revisa el reporte mensual de utilización (si lo desea)' : 'Reviews monthly utilization report (if desired)',
      ],
      sc:  [
        es ? 'Enrollment automático de nuevos empleados elegibles en tiempo real' : 'Automatic enrollment of new eligible employees in real time',
        es ? 'Baja automática cuando un empleado sale de la empresa' : 'Automatic offboarding when an employee leaves the company',
        es ? 'Soporte 24/7 para empleados y familias en México — SaludCompartida lo maneja' : 'Support 24/7 for employees and families in Mexico — SaludCompartida handles it',
        es ? 'Comunicaciones de recordatorio y engagement a empleados' : 'Reminder and engagement communications to employees',
      ],
    },
  ]

  /* ── COMMUNICATION KIT ── */
  const COMM_KIT = [
    {
      icon: '📧',
      title: es ? 'Email de bienvenida' : 'Welcome email',
      desc: es ? 'Personalizado con nombre del empleado y código de activación. En español. SaludCompartida lo envía.' : 'Personalized with employee name and activation code. In Spanish. SaludCompartida sends it.',
    },
    {
      icon: '📱',
      title: es ? 'Video por WhatsApp' : 'Video via WhatsApp',
      desc: es ? 'Video corto explicando los 4 beneficios, cómo activar y cómo usar. En español. Enviado directamente al celular del empleado.' : 'Short video explaining the 4 benefits, how to activate, and how to use. In Spanish. Sent directly to employee\'s phone.',
    },
    {
      icon: '🎬',
      title: es ? 'Videos de YouTube' : 'YouTube videos',
      desc: es ? 'Biblioteca de videos en español listos para usar: presentación del beneficio, cómo hacer una videollamada médica, cómo usar el descuento en farmacia, cómo agendar terapia.' : 'Library of ready-to-use Spanish videos: benefit presentation, how to make a medical video call, how to use the pharmacy discount, how to schedule therapy.',
    },
    {
      icon: '📋',
      title: es ? 'Kit para RRHH' : 'HR kit',
      desc: es ? 'FAQ en español e inglés, one-pager del beneficio, plantilla de presentación para el open enrollment. Todo listo. Solo distribuye.' : 'FAQ in Spanish and English, benefit one-pager, presentation template for open enrollment. All ready. Just distribute.',
    },
  ]

  /* ── UTILIZATION DASHBOARD ── */
  const DASH_WIDGETS = [
    { n: '—', label: es ? 'Empleados con beneficio activo' : 'Employees with active benefit', color: '#22D3EE', icon: '👥' },
    { n: '—', label: es ? 'Consultas médicas este mes' : 'Medical consultations this month', color: '#34D399', icon: '🩺' },
    { n: '—', label: es ? 'Ahorro farmacia generado' : 'Pharmacy savings generated', color: '#FCD34D', icon: '💊' },
    { n: '—', label: es ? 'Sesiones de terapia completadas' : 'Therapy sessions completed', color: '#A78BFA', icon: '🧠' },
  ]

  const TABS = [
    es ? 'Implementación' : 'Implementation',
    es ? 'Comunicación' : 'Communication',
    es ? 'Tu dashboard' : 'Your dashboard',
  ]

  return (
    <div style={{ background: 'var(--white)', animation: 'fadeUp .35s ease' }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '40px 48px' }}>

        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--teal)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 10 }}>
            {es ? 'Cómo funciona para tu empresa' : 'How it works for your company'}
          </div>
          <h2 style={{ fontSize: 36, color: 'var(--ink)', fontWeight: 700, marginBottom: 14, lineHeight: 1.15 }}>
            {es
              ? <>Aprueba el beneficio.<br /><span style={{ color: 'var(--teal)' }}>SaludCompartida hace todo lo demás.</span></>
              : <>Approve the benefit.<br /><span style={{ color: 'var(--teal)' }}>SaludCompartida handles everything else.</span></>
            }
          </h2>
          <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.7, maxWidth: 600 }}>
            {es
              ? 'Tu equipo de RRHH no tiene que gestionar comunicaciones, soporte, enrollment ni facturación. El beneficio se integra a tu operación existente sin disrupciones.'
              : 'Your HR team does not have to manage communications, support, enrollment, or billing. The benefit integrates into your existing operation without disruption.'
            }
          </p>
        </div>

        {/* The big promise strip */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginBottom: 32 }}>
          {[
            { val: es ? '4 semanas' : '4 weeks', desc: es ? 'De la firma al beneficio activo para todos tus empleados' : 'From signature to benefit active for all your employees', color: '#22D3EE' },
            { val: es ? '2–4 horas' : '2–4 hours', desc: es ? 'Es todo lo que necesita tu equipo IT — una sola vez, para siempre' : 'That\'s all your IT team needs — once, forever', color: '#34D399' },
            { val: es ? 'Cero' : 'Zero', desc: es ? 'Trabajo de RRHH en el día a día — enrollment, soporte y comunicaciones son automáticos' : 'Daily HR work — enrollment, support, and communications are automatic', color: '#FCD34D' },
          ].map(({ val, desc, color }) => (
            <div key={val} style={{ background: NAVY_CARD, borderRadius: 14, padding: '20px 22px', border: `1px solid ${color}30` }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 38, color, fontWeight: 700, lineHeight: 1, marginBottom: 8 }}>{val}</div>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', fontWeight: 700, lineHeight: 1.55, margin: 0 }}>{desc}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
          {TABS.map((label, i) => (
            <button key={i} onClick={() => setActiveTab(i)} style={{
              padding: '9px 22px', borderRadius: 8,
              border: activeTab === i ? '2px solid var(--navy)' : '2px solid var(--border)',
              background: activeTab === i ? NAVY_CARD : 'var(--white)',
              color: activeTab === i ? 'white' : 'var(--muted)',
              fontSize: 13, fontWeight: activeTab === i ? 800 : 500,
              cursor: 'pointer', transition: 'all .15s',
            }}>{label}</button>
          ))}
        </div>

        {/* ── TAB 0: IMPLEMENTATION TIMELINE ── */}
        {activeTab === 0 && (
          <div key="t0" style={{ animation: 'fadeUp .2s ease' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {TIMELINE.map((step, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: 0, position: 'relative' }}>
                  {/* Left: week + vertical line */}
                  <div style={{ paddingRight: 24, paddingBottom: 28, position: 'relative' }}>
                    {/* Vertical line */}
                    {i < TIMELINE.length - 1 && (
                      <div style={{ position: 'absolute', left: 19, top: 38, bottom: 0, width: 2, background: 'var(--border)' }}/>
                    )}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 38, height: 38, borderRadius: '50%', background: NAVY_CARD, border: `2px solid ${step.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <span style={{ fontSize: 13, fontWeight: 800, color: step.color }}>{i + 1}</span>
                      </div>
                      <div>
                        <div style={{ fontSize: 11, fontWeight: 800, color: step.color }}>{step.week}</div>
                        <div style={{ fontSize: 10, color: 'var(--muted)', fontWeight: 600 }}>{step.time}</div>
                      </div>
                    </div>
                  </div>

                  {/* Right: content */}
                  <div style={{ background: NAVY_CARD, borderRadius: 14, padding: '18px 22px', marginBottom: 12, border: `1px solid ${step.color}20` }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                      <h3 style={{ fontSize: 16, color: 'white', fontWeight: 800, margin: 0 }}>{step.title}</h3>
                      <span style={{ fontSize: 9, fontWeight: 800, color: step.color, background: `${step.color}20`, padding: '2px 8px', borderRadius: 100, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                        {step.who}
                      </span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                      {/* PEO does */}
                      <div>
                        <div style={{ fontSize: 10, fontWeight: 800, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
                          {es ? 'Tu empresa hace:' : 'Your company does:'}
                        </div>
                        {step.peo.map((t, j) => (
                          <div key={j} style={{ display: 'flex', gap: 7, marginBottom: 6, alignItems: 'flex-start' }}>
                            <div style={{ width: 16, height: 16, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                              <svg width="7" height="6" viewBox="0 0 7 6" fill="none"><path d="M1 3l1.5 1.5L6 1" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            </div>
                            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)', fontWeight: 600, lineHeight: 1.45 }}>{t}</span>
                          </div>
                        ))}
                      </div>
                      {/* SC does */}
                      <div>
                        <div style={{ fontSize: 10, fontWeight: 800, color: step.color, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
                          {es ? 'SaludCompartida hace:' : 'SaludCompartida does:'}
                        </div>
                        {step.sc.map((t, j) => (
                          <div key={j} style={{ display: 'flex', gap: 7, marginBottom: 6, alignItems: 'flex-start' }}>
                            <div style={{ width: 16, height: 16, borderRadius: '50%', background: `${step.color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                              <svg width="7" height="6" viewBox="0 0 7 6" fill="none"><path d="M1 3l1.5 1.5L6 1" stroke={step.color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            </div>
                            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)', fontWeight: 600, lineHeight: 1.45 }}>{t}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TAB 1: COMMUNICATION ── */}
        {activeTab === 1 && (
          <div key="t1" style={{ animation: 'fadeUp .2s ease' }}>
            {/* Header callout */}
            <div style={{ background: NAVY_CARD, borderRadius: 14, padding: '20px 24px', marginBottom: 20, border: '1px solid rgba(52,211,153,0.25)', display: 'flex', gap: 14, alignItems: 'center' }}>
              <div style={{ width: 42, height: 42, borderRadius: 10, background: 'rgba(52,211,153,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#34D399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/>
                </svg>
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 800, color: 'white', marginBottom: 4 }}>
                  {es ? 'SaludCompartida gestiona toda la comunicación con tus empleados.' : 'SaludCompartida manages all communication with your employees.'}
                </div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', fontWeight: 600 }}>
                  {es ? 'Tu equipo de RRHH no envía ni un solo email. Nosotros lo hacemos en español, en su canal preferido.' : 'Your HR team does not send a single email. We handle it in Spanish, on their preferred channel.'}
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {COMM_KIT.map(({ icon, title, desc }, i) => (
                <div key={i} style={{ background: NAVY_CARD, borderRadius: 14, padding: '20px 22px', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                    <div style={{ fontSize: 22 }}>{icon}</div>
                    <span style={{ fontSize: 14, fontWeight: 800, color: 'white' }}>{title}</span>
                  </div>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', fontWeight: 600, lineHeight: 1.65, margin: 0 }}>{desc}</p>
                </div>
              ))}
            </div>

            {/* YouTube video library callout */}
            <div style={{ background: NAVY_INNER, borderRadius: 14, padding: '18px 22px', marginTop: 14, border: '1px solid rgba(34,211,238,0.2)', display: 'flex', gap: 14, alignItems: 'center' }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(34,211,238,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 2.5l11 5.5-11 5.5V2.5z" fill="#22D3EE"/></svg>
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 800, color: 'white', marginBottom: 3 }}>
                  {es ? 'Biblioteca de videos en YouTube — listos para usar' : 'YouTube video library — ready to use'}
                </div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>
                  {es
                    ? 'Videos en español que tus empleados pueden ver en cualquier momento: cómo funciona el beneficio, cómo hacer una consulta médica, cómo obtener el descuento en farmacia, cómo agendar terapia. Tú solo compartes el link.'
                    : 'Spanish-language videos your employees can watch anytime: how the benefit works, how to get a medical consultation, how to get the pharmacy discount, how to schedule therapy. You just share the link.'
                  }
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 2: UTILIZATION DASHBOARD ── */}
        {activeTab === 2 && (
          <div key="t2" style={{ animation: 'fadeUp .2s ease' }}>
            <div style={{ background: NAVY_CARD, borderRadius: 14, padding: '20px 24px', marginBottom: 20, border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>
                {es ? 'Tu panel en saludcompartida.ai' : 'Your panel at saludcompartida.ai'}
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'white', lineHeight: 1.4 }}>
                {es
                  ? 'En tiempo real, ves cuántos empleados activaron el beneficio, qué servicios usan más y cuánto están ahorrando sus familias. Un solo número mensual para tu CFO.'
                  : 'In real time, you see how many employees activated the benefit, which services they use most, and how much their families are saving. One monthly number for your CFO.'
                }
              </div>
            </div>

            {/* Dashboard mockup */}
            <div style={{ background: NAVY_INNER, borderRadius: 16, padding: '24px', border: '1px solid rgba(255,255,255,0.08)', marginBottom: 14 }}>
              {/* Fake topbar */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, paddingBottom: 14, borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: 'white' }}>
                  {es ? 'Dashboard · G&A Partners · Abril 2026' : 'Dashboard · G&A Partners · April 2026'}
                </div>
                <div style={{ fontSize: 11, color: '#34D399', fontWeight: 700, background: 'rgba(52,211,153,0.12)', padding: '3px 10px', borderRadius: 100 }}>
                  {es ? 'Actualizado en tiempo real' : 'Updated in real time'}
                </div>
              </div>

              {/* 4 KPI widgets */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10, marginBottom: 20 }}>
                {DASH_WIDGETS.map(({ n, label, color }, i) => (
                  <div key={i} style={{ background: NAVY_CARD, borderRadius: 10, padding: '14px 16px', border: `1px solid ${color}20` }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 30, color, fontWeight: 700, lineHeight: 1 }}>—</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.75)', fontWeight: 700, marginTop: 6, lineHeight: 1.4 }}>{label}</div>
                  </div>
                ))}
              </div>

              {/* Service usage bars (decorative) */}
              <div style={{ fontSize: 11, fontWeight: 800, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
                {es ? 'Utilización por servicio (% empleados que usaron)' : 'Utilization by service (% employees who used)'}
              </div>
              {[
                { name: es ? 'Videollamada con Doctor' : 'Video call with Doctor', pct: 68, color: '#22D3EE' },
                { name: es ? 'Descuento en Farmacia'  : 'Pharmacy Discount', pct: 84, color: '#FCD34D' },
                { name: es ? 'Terapia Psicológica'    : 'Psychological Therapy', pct: 31, color: '#A78BFA' },
                { name: 'Lupita AI', pct: 72, color: '#34D399' },
              ].map(({ name, pct, color }) => (
                <div key={name} style={{ marginBottom: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 12, color: 'white', fontWeight: 700 }}>{name}</span>
                    <span style={{ fontSize: 12, color, fontWeight: 800 }}>{pct}%</span>
                  </div>
                  <div style={{ height: 6, background: 'rgba(255,255,255,0.08)', borderRadius: 3, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: 3, transition: 'width .6s ease' }}/>
                  </div>
                </div>
              ))}
            </div>

            {/* What you get in the report */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[
                { title: es ? 'Vistas por empleado' : 'Per-employee view', desc: es ? 'Quién activó el beneficio y quién no, cuándo lo usó por última vez, qué servicios utiliza.' : 'Who activated the benefit and who did not, when they last used it, which services they use.' },
                { title: es ? 'Reportes mensuales' : 'Monthly reports', desc: es ? 'Resumen automático el día 1 de cada mes. Utilización, ahorros generados y comparativo vs mes anterior.' : 'Automatic summary on day 1 of each month. Utilization, savings generated, and comparison vs previous month.' },
                { title: es ? 'Facturación automática' : 'Automatic billing', desc: es ? 'Un solo invoice consolidado a tu PEO. Desglosado por empleado si lo necesitas. Sin trabajo administrativo.' : 'One consolidated invoice to your PEO. Broken down by employee if needed. No administrative work.' },
                { title: es ? 'Alerta de baja utilización' : 'Low utilization alert', desc: es ? 'Si un grupo de empleados no está usando el beneficio, SaludCompartida activa una campaña de reactivación automáticamente.' : 'If a group of employees is not using the benefit, SaludCompartida activates a reactivation campaign automatically.' },
              ].map(({ title, desc }, i) => (
                <div key={i} style={{ background: NAVY_CARD, borderRadius: 12, padding: '16px 18px', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <div style={{ fontSize: 13, fontWeight: 800, color: 'white', marginBottom: 6 }}>{title}</div>
                  <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)', fontWeight: 600, lineHeight: 1.6, margin: 0 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
