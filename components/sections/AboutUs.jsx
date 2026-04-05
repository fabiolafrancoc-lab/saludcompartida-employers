'use client'
import React from 'react'
import { useLang } from '@/contexts/LanguageContext'
import { translations as T, t } from '@/lib/translations'

const NAVY_CARD = '#162040'


/* ── LIVE TICKER: real service moments in Mexican Spanish ── */
const TICKER_ES = [
  { iconPath: 'M9 12h6M9 16h6M9 8h2m4 0h-1M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z', cat: 'Médico General',       msg: '"Buenas noches, necesito ver a un doctor — mi mamá tiene fiebre alta." Consultada a las 11:03pm. Receta lista en 12 minutos.' },
  { iconPath: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z', cat: 'Farmacia',              msg: '"Le bajó un 68% al medicamento de papá. Ya no se nos va la remesa en pastillas." — Rosa, Houston.' },
  { iconPath: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z', cat: 'Terapia semanal',       msg: '"Mi terapeuta ya sabe cómo me siento cuando extraño a mis hijos. Cada semana es más fácil." — Andrés, Dallas.' },
  { iconPath: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z', cat: 'Cardiólogo',            msg: 'Doña Carmen, 67 años. Videollamada con cardiólogo. Ajuste de medicamento sin salir de casa. Sin fila. Sin costo extra.' },
  { iconPath: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8', cat: 'Médico General',        msg: '"Pensé que iba a tener que esperar hasta mi vacación para llevar a mi hijo al doctor. Lo atendieron en 8 minutos." — Miguel, Chicago.' },
  { iconPath: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8', cat: 'Pediatra',              msg: 'La niña de Javier tenía 39.2°C a medianoche. Pediatra en videollamada, diagnóstico, receta electrónica. Todo en 15 minutos.' },
  { iconPath: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z', cat: 'Terapia semanal',       msg: '"Mi mamá dejó de llorar sola los domingos. Ahora tiene su sesión de terapia. Eso vale más que cualquier cosa." — Patricia, Miami.' },
  { iconPath: 'M9 3v11.5A3.5 3.5 0 0012.5 18v0A3.5 3.5 0 0016 14.5V3M9 3h7M9 3H7M16 3h2', cat: 'Médico General',        msg: 'Don Ernesto, 71 años. No había visto a un médico en 4 años. Primera consulta por videollamada. "No sabía que era tan fácil."' },
  { iconPath: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z', cat: 'Médico Internista',     msg: '"Le detectaron presión alta a mi suegra. El doctor la está siguiendo cada semana. Ya no me preocupo igual." — Carlos, Houston.' },
  { iconPath: 'M9 3v11.5A3.5 3.5 0 0012.5 18v0A3.5 3.5 0 0016 14.5V3M9 3h7M9 3H7M16 3h2', cat: 'Médico General',        msg: 'Consulta solicitada: 6:47am. Médico conectado: 6:52am. Diagnóstico: infección urinaria. Receta enviada a farmacia afiliada a 3 cuadras.' },
  { iconPath: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z', cat: 'Terapia semanal',       msg: '"Hablar con alguien que te entiende, sin juzgarte, en tu idioma — mi esposa dice que es lo mejor que le he dado." — Omar, Atlanta.' },
  { iconPath: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z', cat: 'Oftalmólogo',           msg: 'Doña Lupita llevaba 2 años con el ojo irritado. Oftalmólogo en videollamada. Diagnóstico en 10 minutos. Tratamiento iniciado ese día.' },
]

const TICKER_EN = [
  { iconPath: 'M9 12h6M9 16h6M9 8h2m4 0h-1M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z', cat: 'General Doctor',        msg: '"Good evening, my mom has a high fever and I need to see a doctor." Seen at 11:03pm. Prescription ready in 12 minutes.' },
  { iconPath: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z', cat: 'Pharmacy',              msg: '"Dad\u2019s medication dropped 68% in cost. The remittance isn\u2019t going to pills anymore." — Rosa, Houston.' },
  { iconPath: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z', cat: 'Weekly Therapy',        msg: '"My therapist already knows how I feel when I miss my kids. Every week gets easier." — Andrés, Dallas.' },
  { iconPath: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z', cat: 'Cardiologist',          msg: 'Doña Carmen, 67. Video call with cardiologist. Medication adjusted from home. No waiting room. No extra cost.' },
  { iconPath: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8', cat: 'General Doctor',        msg: '"I thought I\u2019d have to wait until my vacation to take my son to the doctor. They saw him in 8 minutes." — Miguel, Chicago.' },
  { iconPath: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8', cat: 'Pediatrician',          msg: 'Javier\u2019s daughter had 39.2°C at midnight. Video pediatrician, diagnosis, digital prescription. All in 15 minutes.' },
  { iconPath: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z', cat: 'Weekly Therapy',        msg: '"My mom stopped crying alone on Sundays. Now she has her therapy session. That\u2019s worth more than anything." — Patricia, Miami.' },
  { iconPath: 'M9 3v11.5A3.5 3.5 0 0012.5 18v0A3.5 3.5 0 0016 14.5V3M9 3h7M9 3H7M16 3h2', cat: 'General Doctor',        msg: 'Don Ernesto, 71. Hadn’t seen a doctor in 4 years. First video consultation. "I didn\u2019t know it was this easy."' },
  { iconPath: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z', cat: 'Internist',             msg: '"They detected high blood pressure in my mother-in-law. The doctor checks in every week. I don’t worry the same." — Carlos, Houston.' },
  { iconPath: 'M9 3v11.5A3.5 3.5 0 0012.5 18v0A3.5 3.5 0 0016 14.5V3M9 3h7M9 3H7M16 3h2', cat: 'General Doctor',        msg: 'Consultation requested: 6:47am. Doctor connected: 6:52am. Diagnosis: urinary infection. Prescription sent to pharmacy 3 blocks away.' },
  { iconPath: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z', cat: 'Weekly Therapy',        msg: '"Talking to someone who understands you, without judgment, in your language — my wife says it’s the best thing I’ve ever given her." — Omar, Atlanta.' },
  { iconPath: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z', cat: 'Ophthalmologist',       msg: 'Doña Lupita had an irritated eye for 2 years. Ophthalmologist on video. Diagnosed in 10 minutes. Treatment started that day.' },
]

const CAT_COLORS = {
  'Médico General': '#22D3EE',   'General Doctor': '#22D3EE',
  'Farmacia': '#FCD34D',          'Pharmacy': '#FCD34D',
  'Terapia semanal': '#A78BFA',   'Weekly Therapy': '#A78BFA',
  'Cardiólogo': '#F87171',        'Cardiologist': '#F87171',
  'Pediatra': '#34D399',          'Pediatrician': '#34D399',
  'Oftalmólogo': '#60A5FA',       'Ophthalmologist': '#60A5FA',
  'Médico Internista': '#F87171', 'Internist': '#F87171',
}

function LiveTicker({ es }) {
  const items = es ? TICKER_ES : TICKER_EN
  const [cur, setCur] = React.useState(0)
  const [visible, setVisible] = React.useState(true)

  React.useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setCur(p => (p + 1) % items.length)
        setVisible(true)
      }, 400)
    }, 3200)
    return () => clearInterval(interval)
  }, [items.length])

  const item = items[cur]
  const color = CAT_COLORS[item.cat] || '#22D3EE'

  return (
    <div style={{ background: NAVY_CARD, borderRadius: 16, padding: '20px 28px', marginBottom: 24, border: '1px solid rgba(255,255,255,0.08)', position: 'relative', overflow: 'hidden', minHeight: 96 }}>
      {/* Left accent bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 4, background: color, transition: 'background .4s' }}/>
      {/* Dot progress */}
      <div style={{ position: 'absolute', top: 14, right: 20, display: 'flex', gap: 4 }}>
        {items.map((_, i) => (
          <div key={i} onClick={() => { setVisible(false); setTimeout(() => { setCur(i); setVisible(true) }, 200) }}
            style={{ width: i === cur ? 16 : 5, height: 5, borderRadius: 3, background: i === cur ? color : 'rgba(255,255,255,0.12)', cursor: 'pointer', transition: 'all .3s' }}/>
        ))}
      </div>
      {/* Content */}
      <div style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(8px)', transition: 'opacity .35s ease, transform .35s ease' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <div style={{ width: 22, height: 22, borderRadius: 6, background: `${color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d={item.iconPath}/>
            </svg>
          </div>
          <span style={{ fontSize: 11, fontWeight: 800, color, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            {item.cat}
          </span>
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', fontWeight: 600 }}>·</span>
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', fontWeight: 600 }}>
            {es ? 'ahora mismo' : 'right now'}
          </span>
          {/* Pulse dot */}
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: color, display: 'inline-block', marginLeft: 2, boxShadow: `0 0 6px ${color}` }}/>
        </div>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.9)', fontWeight: 600, lineHeight: 1.65, margin: 0, maxWidth: 680 }}>
          {item.msg}
        </p>
      </div>
    </div>
  )
}

export default function AboutUs() {
  const { lang } = useLang()
  const es = lang === 'es'

  return (
    <div style={{ background: 'var(--sand)', animation: 'fadeUp .35s ease', color: 'white' }} className="on-green">
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '40px 48px' }}>

        {/* Header */}
        <div style={{ maxWidth: 640, marginBottom: 36 }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12 }}>
            {es ? 'Nuestra misión' : 'Our mission'}
          </div>
          <h2 style={{ fontSize: 36, color: 'white', fontWeight: 700, marginBottom: 16, lineHeight: 1.2 }}>
            {es
              ? <>El migrante cuida a su familia.<br /><span style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.85)' }}>SaludCompartida cuida al migrante.</span></>
              : <>The migrant cares for their family.<br /><span style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.85)' }}>SaludCompartida cares for the migrant.</span></>
            }
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.85)', fontWeight: 600, lineHeight: 1.75 }}>
            {es
              ? 'Existe una brecha fundamental entre lo que el trabajador migrante necesita y lo que el mercado le ofrece. Esa brecha tiene un costo enorme — para las familias y para las empresas que los contratan.'
              : 'There is a fundamental gap between what the migrant worker needs and what the market offers. That gap has an enormous cost — for families and for the companies that hire them.'
            }
          </p>
        </div>

        {/* Live ticker — real patient voices from Mexico */}
        <LiveTicker es={es} />

        {/* The human cost — the real reason we exist */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
          <div style={{ background: NAVY_CARD, borderRadius: 16, padding: '28px 30px', border: '1px solid rgba(255,255,255,0.08)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #22D3EE, #A78BFA)' }}/>
            {es ? (
              <>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'white', fontWeight: 700, lineHeight: 1.55, marginBottom: 18, fontStyle: 'italic' }}>
                  &ldquo;Para el migrante en los Estados Unidos, cada remesa viene acompañada de una ansiedad invisible.&rdquo;
                </p>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.85)', fontWeight: 600, lineHeight: 1.75, marginBottom: 16 }}>
                  &ldquo;¿Tendrá mamá para su medicamento de diabetes este mes? ¿Y si papá necesita ver a un cardiólogo? ¿Y si mi hija se enferma y no queda dinero?&rdquo;
                </p>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.85)', fontWeight: 600, lineHeight: 1.75, marginBottom: 16 }}>
                  Ese miedo constante — ese riesgo financiero mensual — cuesta más que dinero. Cuesta el sueño. Cuesta la concentración en el trabajo. Cuesta la capacidad de construir una vida en un nuevo país mientras se cuida a los seres queridos a miles de kilómetros de distancia.
                </p>
                <p style={{ fontSize: 15, color: 'white', fontWeight: 800, lineHeight: 1.65 }}>
                  SaludCompartida elimina una gran parte de esa carga. No solo ofrecemos servicios de salud — ofrecemos certeza. Ofrecemos dignidad. Ofrecemos la tranquilidad que viene de saber que tu familia tiene acceso a atención de calidad, pase lo que pase.
                </p>
              </>
            ) : (
              <>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'white', fontWeight: 700, lineHeight: 1.55, marginBottom: 18, fontStyle: 'italic' }}>
                  &ldquo;For migrants in the United States, every remittance comes with invisible anxiety.&rdquo;
                </p>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.85)', fontWeight: 600, lineHeight: 1.75, marginBottom: 16 }}>
                  &ldquo;Will Mom be able to afford her diabetes medication this month? What if Dad needs to see a cardiologist? What if my daughter gets sick and there&rsquo;s no money left?&rdquo;
                </p>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.85)', fontWeight: 600, lineHeight: 1.75, marginBottom: 16 }}>
                  That constant fear — that monthly financial risk — costs more than money. It costs sleep. It costs focus on work. It costs the ability to build a life in a new country while caring for loved ones thousands of miles away.
                </p>
                <p style={{ fontSize: 15, color: 'white', fontWeight: 800, lineHeight: 1.65 }}>
                  SaludCompartida eliminates a large portion of that burden. We don&rsquo;t just provide healthcare services — we provide certainty. We provide dignity. We provide the peace of mind that comes from knowing your family has access to quality care, regardless of what happens.
                </p>
              </>
            )}
          </div>

          <div style={{ background: NAVY_CARD, borderRadius: 16, padding: '24px 26px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#34D399', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 }}>
              {es ? 'SaludCompartida Capabilities' : 'SaludCompartida Capabilities'}
            </div>
            {[
              {
                bold: es ? 'Infraestructura técnica propia construida' : 'Own technical infrastructure built',
                text: es ? '— plataforma activa hoy, no en construcción. saludcompartida.app y saludcompartida.ai operando en producción.' : '— platform active today, not under construction. saludcompartida.app and saludcompartida.ai operating in production.',
              },
              {
                bold: es ? 'Proveedor médico con responsabilidad cubierta' : 'Medical provider with covered liability',
                text: es ? '— Nuevo Método cubre la responsabilidad médica y de terapeutas. La estructura legal está confirmada.' : '— Nuevo Método covers medical and therapist liability. Legal structure is confirmed.',
              },
              {
                bold: es ? '16 códigos conductuales propietarios' : '16 proprietary behavioral codes',
                text: es ? '— desarrollados con sociólogos mexicanos, validados en campo. La IA de Lupita conecta culturalmente con el adulto mayor mexicano.' : '— developed with Mexican sociologists, validated in the field. Lupita\'s AI connects culturally with the Mexican senior.',
              },
            ].map(({ bold, text }, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, marginBottom: i < 2 ? 14 : 0, alignItems: 'flex-start' }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#34D399', flexShrink: 0, marginTop: 6 }}/>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', fontWeight: 600, lineHeight: 1.65, margin: 0 }}>
                  <strong style={{ color: 'white', fontWeight: 800 }}>{bold}</strong>{text}
                </p>
              </div>
            ))}
          </div>
        </div>


      </div>
    </div>
  )
}
