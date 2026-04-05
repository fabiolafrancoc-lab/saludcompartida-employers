'use client'
import { useState } from 'react'
import { useLang } from '@/contexts/LanguageContext'

const NAVY      = '#0F3460'
const NAVY_CARD = '#162040'
const NAVY_IN   = '#1E2D4F'

/* ─── OBJECTION HANDLER ───────────────────────────────────────── */
const OBJECTIONS = (es) => [
  {
    q: es ? '"¿Cuánto trabajo extra le va a dar esto a mi equipo de RRHH?"'
           : '"How much extra work will this give my HR team?"',
    a: es ? 'Ninguno en el día a día. El enrollment es automático vía API con PrismHR, Rippling o ADP — el mismo sistema que usas para tu dental y visión. SaludCompartida gestiona la comunicación con empleados, el soporte a las familias en México, y la facturación. Tu equipo de RRHH recibe un reporte mensual y un solo invoice. Eso es todo.'
           : 'None day-to-day. Enrollment is automatic via API with PrismHR, Rippling, or ADP — the same system you use for your dental and vision. SaludCompartida manages employee communications, support for families in Mexico, and billing. Your HR team receives a monthly report and one invoice. That\'s it.',
    color: '#22D3EE',
  },
  {
    q: es ? '"¿Qué pasa si un empleado sale de la empresa?"'
           : '"What happens when an employee leaves the company?"',
    a: es ? 'Automático. Cuando el PEO desactiva al empleado en PrismHR o ADP, la API de SaludCompartida recibe la señal y desactiva el certificado en tiempo real. No hay trabajo manual. Si aplica COBRA, el empleado recibe automáticamente la notificación de continuación a los 30 días.'
           : 'Automatic. When the PEO deactivates the employee in PrismHR or ADP, the SaludCompartida API receives the signal and deactivates the certificate in real time. No manual work. If COBRA applies, the employee automatically receives the continuation notice within 30 days.',
    color: '#34D399',
  },
  {
    q: es ? '"¿Cómo sé que los empleados realmente lo van a usar?"'
           : '"How do I know employees will actually use it?"',
    a: es ? 'El beneficio resuelve algo que el empleado piensa todos los días — la salud de su familia en México. La tasa de activación en nuestro modelo supera el 70%. A diferencia del seguro médico americano, este beneficio lo entienden y lo necesitan inmediatamente. SaludCompartida envía recordatorios de engagement automáticos a quienes no han activado.'
           : 'The benefit solves something employees think about every day — their family\'s health in Mexico. Activation rates in our model exceed 70%. Unlike American health insurance, this benefit is immediately understood and needed. SaludCompartida sends automatic engagement reminders to employees who haven\'t activated.',
    color: '#A78BFA',
  },
  {
    q: es ? '"¿Qué pasa si hay un problema médico grave en México?"'
           : '"What happens if there\'s a serious medical issue in Mexico?"',
    a: es ? 'Nuevo Método, nuestro proveedor médico certificado en México, cubre la responsabilidad médica y de terapeutas. SaludCompartida opera como distribuidor del beneficio — no como proveedor médico directo. La estructura legal está confirmada. Tu empresa no tiene exposición de responsabilidad médica en México.'
           : 'Nuevo Método, our certified medical provider in Mexico, covers medical and therapist liability. SaludCompartida operates as benefit distributor — not as direct medical provider. Legal structure is confirmed. Your company has zero medical liability exposure in Mexico.',
    color: '#FCD34D',
  },
]

/* ─── EMPLOYEE JOURNEY: the emotional payoff ─────────────────── */
const JOURNEY = (es) => [
  {
    time:    es ? '7:02 am · Lunes' : '7:02 am · Monday',
    role:    es ? 'Carlos llega al trabajo' : 'Carlos arrives at work',
    without: es ? 'Revisa el celular por tercera vez. Su suegra en Guadalajara no durmió bien. ¿Le dio su medicamento? ¿Tendrá para la consulta esta semana? Entra al trabajo pero su cabeza está en México.'
                : 'Checks his phone for the third time. His mother-in-law in Guadalajara didn\'t sleep well. Did she take her medication? Will there be money for the appointment this week? He arrives but his mind is in Mexico.',
    with:    es ? 'Revisó el WhatsApp antes de salir. Lupita ya llamó a su suegra ayer — todo bajo control. El médico virtual la atendió a las 10pm, receta enviada, medicamento recogido en la farmacia con descuento. Carlos entra al trabajo tranquilo.'
                : 'He checked WhatsApp before leaving. Lupita already called his mother-in-law yesterday — everything under control. The virtual doctor saw her at 10pm, prescription sent, medication picked up at the pharmacy with a discount. Carlos arrives calm.',
    color:   '#22D3EE',
  },
  {
    time:    es ? '11:15 am · El mismo día' : '11:15 am · Same day',
    role:    es ? 'El supervisor nota algo' : 'The supervisor notices something',
    without: es ? 'Carlos cometió dos errores en la operación esta mañana. No es la primera vez este mes. El supervisor lo anota. Si sigue así, tendrá que hablar con RRHH.'
                : 'Carlos made two errors in the operation this morning. It\'s not the first time this month. The supervisor makes a note. If this continues, they\'ll need to talk to HR.',
    with:    es ? 'Carlos está concentrado. Terminó su turno sin incidentes. El supervisor no tiene nada que anotar. Este empleado ha mejorado desde que activó el beneficio hace 6 semanas.'
                : 'Carlos is focused. He finished his shift without incidents. The supervisor has nothing to note. This employee has improved since activating the benefit 6 weeks ago.',
    color:   '#34D399',
  },
  {
    time:    es ? 'Día 1 del mes · Tu dashboard' : 'Day 1 of month · Your dashboard',
    role:    es ? 'Tu CFO pregunta por el ROI' : 'Your CFO asks about ROI',
    without: es ? 'El beneficio no existe. Carlos lleva tres semanas en modo "apagando incendios". El costo de su distracción — errores, accidentes evitados por poco, días de licencia por emergencias familiares — no aparece en ningún reporte. Pero está ahí.'
                : 'The benefit doesn\'t exist. Carlos has been in "firefighting mode" for three weeks. The cost of his distraction — errors, near-miss accidents, emergency family leave days — doesn\'t appear in any report. But it\'s there.',
    with:    es ? 'Tu dashboard muestra: 84 empleados con beneficio activo, 127 consultas médicas ese mes, $7,812 en ahorro de farmacia para sus familias. Un solo invoice de $1,512 USD. Tu CFO ve el número y pregunta por qué no lo activaron antes.'
                : 'Your dashboard shows: 84 employees with active benefit, 127 medical consultations that month, $7,812 in pharmacy savings for their families. One invoice for $1,512 USD. Your CFO sees the number and asks why you didn\'t activate it sooner.',
    color:   '#FCD34D',
  },
]

/* ─── TIMELINE STEPS ─────────────────────────────────────────── */
const STEPS = (es) => [
  {
    n: '01', week: es ? 'Semana 1' : 'Week 1',
    title: es ? 'Firmas. Nosotros configuramos.' : 'You sign. We configure.',
    color: '#22D3EE',
    peo_label: es ? 'Tu empresa (30 min):' : 'Your company (30 min):',
    peo: es ? 'Firmas el contrato marco. Eliges la modalidad de pago. Defines qué empleados son elegibles.' : 'Sign the master agreement. Choose payment model. Define which employees are eligible.',
    sc_label:  es ? 'SaludCompartida:' : 'SaludCompartida:',
    sc:  es ? 'Configura la póliza grupal, prepara las credenciales de API para tu sistema de RRHH, y asigna tu Implementation Manager personal.' : 'Configures the group policy, prepares API credentials for your HR system, and assigns your personal Implementation Manager.',
  },
  {
    n: '02', week: es ? 'Semanas 2–3' : 'Weeks 2–3',
    title: es ? 'Tu IT conecta una sola vez.' : 'Your IT connects once.',
    color: '#A78BFA',
    peo_label: es ? 'Tu equipo IT (2–4 horas, una sola vez):' : 'Your IT team (2–4 hours, once only):',
    peo: es ? 'Activa el conector de SaludCompartida en PrismHR, Rippling o ADP. Es el mismo proceso que usaste para integrar tu dental y visión. Tu equipo ya sabe hacerlo.' : 'Activates the SaludCompartida connector in PrismHR, Rippling, or ADP. Same process used for your dental and vision integration. Your team already knows how.',
    sc_label:  es ? 'SaludCompartida:' : 'SaludCompartida:',
    sc:  es ? 'Provee documentación técnica, credenciales de sandbox, y acompaña el setup con soporte directo. Valida la integración antes de ir a producción. Tu equipo no está solo.' : 'Provides technical documentation, sandbox credentials, and accompanies setup with direct support. Validates integration before production. Your team is not alone.',
  },
  {
    n: '03', week: es ? 'Semana 4' : 'Week 4',
    title: es ? 'Tus empleados reciben el beneficio.' : 'Your employees receive the benefit.',
    color: '#34D399',
    peo_label: es ? 'Tu empresa (opcional):' : 'Your company (optional):',
    peo: es ? 'Aprueba el kit de comunicación que preparó SaludCompartida. Comparte el link de YouTube con tus empleados si quieres. Nada más.' : 'Approve the communication kit that SaludCompartida prepared. Share the YouTube link with your employees if you want. Nothing more.',
    sc_label:  es ? 'SaludCompartida (todo lo demás):' : 'SaludCompartida (everything else):',
    sc:  es ? 'Envía email personalizado a cada empleado con su Employee ID. Envía video en español por WhatsApp explicando los 4 beneficios. Activa la línea de soporte en español para empleados y sus familias en México. Lanza la campaña de activación.' : 'Sends personalized email to each employee with their Employee ID. Sends Spanish-language video via WhatsApp explaining the 4 benefits. Activates Spanish-language support line for employees and their families in Mexico. Launches activation campaign.',
  },
  {
    n: '04', week: es ? 'Mes 2 en adelante · Para siempre' : 'Month 2 onwards · Forever',
    title: es ? 'El sistema trabaja solo.' : 'The system works on its own.',
    color: '#FCD34D',
    peo_label: es ? 'Tu empresa (una vez al mes):' : 'Your company (once a month):',
    peo: es ? 'Recibes un invoice consolidado el día 1. Revisas el reporte de utilización si te interesa. Eso es todo.' : 'You receive one consolidated invoice on day 1. Review the utilization report if you\'re interested. That\'s it.',
    sc_label:  es ? 'SaludCompartida (automático):' : 'SaludCompartida (automatic):',
    sc:  es ? 'Nuevo empleado elegible → enrollment automático en minutos. Empleado que sale → baja automática del certificado. Familia en México → soporte 24/7 en español. Empleado no usa el beneficio → campaña de reactivación automática. Tu RRHH no toca nada.' : 'New eligible employee → automatic enrollment in minutes. Employee who leaves → automatic certificate termination. Family in Mexico → 24/7 support in Spanish. Employee not using benefit → automatic reactivation campaign. Your HR touches nothing.',
  },
]

export default function HowItWorks() {
  const { lang } = useLang()
  const es  = lang === 'es'
  const [activeStep, setActiveStep]       = useState(0)
  const [activeObj,  setActiveObj]        = useState(null)
  const [activeJour, setActiveJour]       = useState(0)
  const [activeTab,  setActiveTab]        = useState(0)

  const steps      = STEPS(es)
  const objections = OBJECTIONS(es)
  const journey    = JOURNEY(es)
  const step       = steps[activeStep]

  const TABS = [
    es ? 'Los 4 pasos'           : 'The 4 steps',
    es ? 'Antes y después'       : 'Before & after',
    es ? 'Preguntas frecuentes'  : 'FAQs',
  ]

  return (
    <div style={{ background: 'var(--white)', animation: 'fadeUp .35s ease' }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '36px 48px' }}>

        {/* ── HEADER ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 32, alignItems: 'start', marginBottom: 28 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--teal)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 10 }}>
              {es ? 'Proceso de enrolamiento' : 'Enrollment process'}
            </div>
            <h2 style={{ fontSize: 36, color: 'var(--ink)', fontWeight: 700, marginBottom: 12, lineHeight: 1.15 }}>
              {es ? <>De la firma al beneficio activo:<br /><span style={{ color: 'var(--teal)' }}>4 semanas. La mayoría del trabajo lo hace SaludCompartida.</span></>
                  : <>From signature to active benefit:<br /><span style={{ color: 'var(--teal)' }}>4 weeks. SaludCompartida does most of the work.</span></>}
            </h2>
            <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.7, maxWidth: 540 }}>
              {es ? 'El único trabajo real de tu equipo de RRHH es decir que sí. El resto es automático.'
                  : 'The only real work your HR team does is say yes. The rest is automatic.'}
            </p>
          </div>

          {/* Promise card */}
          <div style={{ background: NAVY_CARD, borderRadius: 14, padding: '18px 22px', textAlign: 'center', flexShrink: 0, border: '1px solid rgba(34,211,238,0.2)', minWidth: 180 }}>
            {[
              { n: '4', sub: es ? 'semanas al beneficio activo' : 'weeks to active benefit', color: '#22D3EE' },
              { n: '0', sub: es ? 'trabajo diario de RRHH'     : 'daily HR work', color: '#34D399' },
            ].map(({ n, sub, color }, i) => (
              <div key={i} style={{ marginBottom: i === 0 ? 14 : 0, paddingBottom: i === 0 ? 14 : 0, borderBottom: i === 0 ? '1px solid rgba(255,255,255,0.08)' : 'none' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 36, color, fontWeight: 700, lineHeight: 1 }}>{n}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.75)', fontWeight: 700, marginTop: 4, lineHeight: 1.4 }}>{sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── TABS ── */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 28 }}>
          {TABS.map((label, i) => (
            <button key={i} onClick={() => setActiveTab(i)} style={{
              padding: '9px 22px', borderRadius: 8,
              border: activeTab === i ? `2px solid ${NAVY}` : '2px solid var(--border)',
              background: activeTab === i ? NAVY_CARD : 'var(--white)',
              color: activeTab === i ? 'white' : 'var(--muted)',
              fontSize: 13, fontWeight: activeTab === i ? 800 : 500,
              cursor: 'pointer', transition: 'all .15s',
            }}>{label}</button>
          ))}
        </div>

        {/* ══ TAB 0: LOS 4 PASOS ══════════════════════════════════════ */}
        {activeTab === 0 && (
          <div key="t0" style={{ animation: 'fadeUp .2s ease' }}>
            {/* Step selector */}
            <div style={{ display: 'flex', gap: 10, marginBottom: 24, flexWrap: 'wrap' }}>
              {steps.map((s, i) => (
                <button key={i} onClick={() => setActiveStep(i)} style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '9px 18px', borderRadius: 100,
                  border: activeStep === i ? `2px solid ${s.color}` : '2px solid var(--border)',
                  background: activeStep === i ? NAVY_CARD : 'var(--white)',
                  cursor: 'pointer', transition: 'all .15s',
                }}>
                  <div style={{ width: 22, height: 22, borderRadius: '50%', background: activeStep === i ? s.color : 'var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontSize: 10, fontWeight: 800, color: 'white' }}>{i + 1}</span>
                  </div>
                  <span style={{ fontSize: 12, fontWeight: activeStep === i ? 800 : 500, color: activeStep === i ? 'white' : 'var(--muted)', whiteSpace: 'nowrap' }}>
                    {s.week}
                  </span>
                </button>
              ))}
            </div>

            {/* Active step detail */}
            <div key={activeStep} style={{ animation: 'fadeUp .2s ease' }}>
              {/* Title */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 52, color: `${step.color}20`, fontWeight: 700, lineHeight: 1, WebkitTextStroke: `2px ${step.color}`, userSelect: 'none' }}>
                    {step.n}
                  </div>
                  <h3 style={{ fontSize: 26, color: 'var(--ink)', fontWeight: 700, lineHeight: 1.2 }}>{step.title}</h3>
                </div>
              </div>

              {/* Two columns: PEO vs SaludCompartida */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                {/* PEO — always short */}
                <div style={{ background: '#F8FAFC', borderRadius: 14, padding: '20px 22px', border: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'var(--border)' }}/>
                  <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>
                    {step.peo_label}
                  </div>
                  <p style={{ fontSize: 14, color: 'var(--body)', lineHeight: 1.7, margin: 0 }}>{step.peo}</p>
                </div>

                {/* SaludCompartida — always longer */}
                <div style={{ background: NAVY_CARD, borderRadius: 14, padding: '20px 22px', border: `1px solid ${step.color}30`, position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: step.color }}/>
                  <div style={{ fontSize: 10, fontWeight: 800, color: step.color, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>
                    {step.sc_label}
                  </div>
                  <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.9)', fontWeight: 600, lineHeight: 1.7, margin: 0 }}>{step.sc}</p>
                </div>
              </div>

              {/* Visual asymmetry callout */}
              <div style={{ background: NAVY_IN, borderRadius: 12, padding: '14px 20px', border: `1px solid ${step.color}25`, display: 'flex', gap: 12, alignItems: 'center' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={step.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span style={{ fontSize: 13, fontWeight: 700, color: 'white' }}>
                  {activeStep === 0 && (es ? 'No necesitas cambiar tu PEO actual. SaludCompartida se integra sobre tu operación existente sin disrupciones.' : 'No need to change your current PEO. SaludCompartida integrates on top of your existing operation without disruption.')}
                  {activeStep === 1 && (es ? 'PrismHR, Rippling y ADP ya tienen este tipo de integración con proveedores de beneficios. Tu equipo de IT ya sabe cómo hacerlo.' : 'PrismHR, Rippling, and ADP already have this type of integration with benefit providers. Your IT team already knows how.')}
                  {activeStep === 2 && (es ? 'Tu equipo de RRHH no envía ni un solo email. SaludCompartida gestiona toda la comunicación en español, en el canal nativo del empleado.' : 'Your HR team doesn\'t send a single email. SaludCompartida manages all communications in Spanish, on the employee\'s native channel.')}
                  {activeStep === 3 && (es ? 'Nuevo empleado, baja de empleado, COBRA, reportes — todo automático. Tu RRHH solo abre el dashboard cuando quiere ver cómo va el beneficio.' : 'New hire, termination, COBRA, reports — all automatic. Your HR only opens the dashboard when they want to see how the benefit is performing.')}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ══ TAB 1: ANTES Y DESPUÉS ════════════════════════════════ */}
        {activeTab === 1 && (
          <div key="t1" style={{ animation: 'fadeUp .2s ease' }}>
            <div style={{ background: NAVY_CARD, borderRadius: 14, padding: '16px 22px', marginBottom: 20, border: '1px solid rgba(255,255,255,0.08)', display: 'flex', gap: 8 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22D3EE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8m13 2l-3 3-1.5-1.5"/>
              </svg>
              <p style={{ fontSize: 13, fontWeight: 700, color: 'white', margin: 0, lineHeight: 1.55 }}>
                {es ? 'Carlos Henríquez. 34 años. Operador de maquinaria en Houston. Su familia lleva 3 años usando el IMSS en Ciudad de México con esperas de 6 semanas para especialistas. Así es un día típico.'
                    : 'Carlos Henríquez. 34 years old. Machinery operator in Houston. His family has spent 3 years using IMSS in Mexico City with 6-week waits for specialists. This is a typical day.'}
              </p>
            </div>

            {/* Moment selector */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
              {journey.map((j, i) => (
                <button key={i} onClick={() => setActiveJour(i)} style={{
                  padding: '8px 16px', borderRadius: 8,
                  border: activeJour === i ? `2px solid ${j.color}` : '2px solid var(--border)',
                  background: activeJour === i ? NAVY_CARD : 'var(--white)',
                  cursor: 'pointer', transition: 'all .15s',
                }}>
                  <div style={{ fontSize: 10, fontWeight: 800, color: activeJour === i ? j.color : 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>{j.time}</div>
                  <div style={{ fontSize: 12, fontWeight: activeJour === i ? 700 : 500, color: activeJour === i ? 'white' : 'var(--muted)' }}>{j.role}</div>
                </button>
              ))}
            </div>

            {/* Before/After split */}
            <div key={activeJour} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, animation: 'fadeUp .2s ease' }}>
              <div style={{ background: '#FEF2F2', borderRadius: 14, padding: '22px 24px', border: '1px solid #FECACA', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: '#F87171' }}/>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                  <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#FEE2E2', border: '1.5px solid #F87171', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 2l6 6M8 2L2 8" stroke="#F87171" strokeWidth="1.5" strokeLinecap="round"/></svg>
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 800, color: '#DC2626', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    {es ? 'Sin SaludCompartida' : 'Without SaludCompartida'}
                  </span>
                </div>
                <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.75, margin: 0 }}>{journey[activeJour].without}</p>
              </div>

              <div style={{ background: NAVY_CARD, borderRadius: 14, padding: '22px 24px', border: `1px solid ${journey[activeJour].color}35`, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: journey[activeJour].color }}/>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                  <div style={{ width: 22, height: 22, borderRadius: '50%', background: `${journey[activeJour].color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l2.5 2.5L9 1" stroke={journey[activeJour].color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 800, color: journey[activeJour].color, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    {es ? 'Con SaludCompartida' : 'With SaludCompartida'}
                  </span>
                </div>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.9)', fontWeight: 600, lineHeight: 1.75, margin: 0 }}>{journey[activeJour].with}</p>
              </div>
            </div>

            {/* Bottom callout — employer insight */}
            <div style={{ marginTop: 16, background: '#F0FDF4', borderRadius: 12, padding: '14px 20px', border: '1px solid #BBF7D0', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
              </svg>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#065F46', margin: 0, lineHeight: 1.6 }}>
                {es ? 'Lo que el PEO no puede ver en ningún reporte: Carlos concentrado vale 40% más que Carlos preocupado. El beneficio no aparece en el seguro médico. Aparece en la productividad.'
                    : 'What the PEO can\'t see in any report: Carlos focused is worth 40% more than Carlos worried. The benefit doesn\'t show up in health insurance. It shows up in productivity.'}
              </p>
            </div>
          </div>
        )}

        {/* ══ TAB 2: PREGUNTAS FRECUENTES ════════════════════════════ */}
        {activeTab === 2 && (
          <div key="t2" style={{ animation: 'fadeUp .2s ease' }}>
            <div style={{ background: NAVY_CARD, borderRadius: 14, padding: '16px 22px', marginBottom: 20, border: '1px solid rgba(255,255,255,0.08)' }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.85)', margin: 0 }}>
                {es ? 'Las preguntas que todo PEO hace antes de firmar. Respondidas directamente.'
                    : 'The questions every PEO asks before signing. Answered directly.'}
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {objections.map((obj, i) => (
                <div key={i} style={{ border: `1px solid ${activeObj === i ? obj.color + '50' : 'var(--border)'}`, borderRadius: 14, overflow: 'hidden', transition: 'border .15s' }}>
                  {/* Question row */}
                  <button onClick={() => setActiveObj(activeObj === i ? null : i)} style={{
                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '16px 20px', background: activeObj === i ? NAVY_CARD : 'var(--white)',
                    border: 'none', cursor: 'pointer', gap: 12, textAlign: 'left',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 28, height: 28, borderRadius: 8, background: activeObj === i ? `${obj.color}20` : '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <span style={{ fontSize: 12, fontWeight: 800, color: activeObj === i ? obj.color : 'var(--muted)' }}>{i + 1}</span>
                      </div>
                      <span style={{ fontSize: 14, fontWeight: 700, color: activeObj === i ? 'white' : 'var(--ink)', lineHeight: 1.4 }}>{obj.q}</span>
                    </div>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0, transform: activeObj === i ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}>
                      <path d="M4 6l5 5 5-5" stroke={activeObj === i ? obj.color : 'var(--muted)'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>

                  {/* Answer */}
                  {activeObj === i && (
                    <div style={{ padding: '4px 20px 20px 60px', background: NAVY_CARD, borderTop: `1px solid ${obj.color}20` }}>
                      <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.9)', fontWeight: 600, lineHeight: 1.8, margin: 0 }}>{obj.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* CTA */}
            <div style={{ marginTop: 20, background: NAVY_CARD, borderRadius: 14, padding: '20px 24px', border: '1px solid rgba(52,211,153,0.2)', display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'white', fontWeight: 700, flex: 1, minWidth: 240, margin: 0, lineHeight: 1.3 }}>
                {es ? '¿Tienes una pregunta que no está aquí?' : 'Have a question that\'s not here?'}
              </p>
              <a href="mailto:hola@saludcompartida.com" style={{
                background: '#006847', color: 'white', padding: '12px 24px',
                borderRadius: 8, fontSize: 13, fontWeight: 700,
                display: 'inline-flex', alignItems: 'center', gap: 8, flexShrink: 0,
              }}>
                {es ? 'Habla con nosotros' : 'Talk to us'}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
