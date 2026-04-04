'use client'
import { useState } from 'react'
import { useLang } from '@/contexts/LanguageContext'

// Three crises — each with progressive disclosure
// Neuroscience: let the HR/Risk Manager choose their entry point.
// Autonomy increases engagement and retention.
const CRISES = {
  es: [
    {
      id: 'financial',
      color: 'var(--loss)',
      bg: '#FEF2F2',
      icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      tag: '💸',
      title: 'La crisis financiera silenciosa',
      subtitle: '$393/mes · El único salvavidas de su familia',
      data: [
        { n: '$64.7B', label: 'México recibió en remesas en 2024 — máximo histórico', source: 'Banxico 2024' },
        { n: '96.6%', label: 'provino de Estados Unidos — tus empleados lo enviaron', source: 'Banxico 2024' },
        { n: '$393', label: 'es el promedio mensual por trabajador — no es extra, es el presupuesto familiar', source: 'Banxico 2024' },
        { n: '1.1M', label: 'personas fuera de la pobreza gracias a remesas — si se corta, regresan', source: 'CONEVAL' },
      ],
      insight: 'La remesa no es un "extra". Es el flujo que paga la renta, la comida, la educación de los hijos Y la salud. Cuando hay una emergencia médica, compite directamente contra la supervivencia básica de la familia.',
      employee_impact: 'Cuando la remesa no alcanza para la medicina de mamá, tu empleado lo sabe en tiempo real por WhatsApp. Esa conversación ocurre durante su turno de trabajo. Esa distracción tiene un costo real para tu operación.',
    },
    {
      id: 'health',
      color: '#DC2626',
      bg: '#FEF2F2',
      icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
      tag: '🏥',
      title: 'La crisis de salud invisible',
      subtitle: '54% sin seguro · Gasto de bolsillo brutal',
      data: [
        { n: '54%', label: 'de familias en México sin seguro de salud efectivo', source: 'OECD Health 2023' },
        { n: '$2K–8K', label: 'cuesta una hospitalización de bolsillo en México (USD)', source: 'Análisis de mercado' },
        { n: '5–9%', label: 'de las remesas ya se destina a gasto de salud — generalmente ineficiente', source: 'IDB Research' },
        { n: '28 sem', label: 'tiempo de espera promedio en el sistema público para cirugía', source: 'OCDE' },
      ],
      insight: 'Los hogares receptores de remesas gastan más en salud que hogares similares sin remesas. Pero ese gasto es caótico: farmacias sin receta, consultorios de barrio, automedicación. El sistema público existe pero no alcanza.',
      employee_impact: 'Entre 5 y 9% de lo que tu empleado envía ya se está yendo a salud. Con SaludCompartida, ese mismo gasto se vuelve estructurado, predecible y 10 veces más eficiente. El empleado no gasta más — gasta mejor.',
    },
    {
      id: 'loneliness',
      color: 'var(--navy)',
      bg: 'var(--navy-light)',
      icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
      tag: '💙',
      title: 'La crisis que nadie ve: la soledad',
      subtitle: 'La epidemia silenciosa · El Surgeon General de EE.UU. la declaró emergencia de salud pública',
      data: [
        { n: '75%', label: 'de adultos mayores con enfermedad crónica experimentan soledad severa', source: 'National Institute on Aging' },
        { n: '15 cig', label: 'el riesgo para la salud de la soledad equivale a fumar 15 cigarrillos al día', source: 'Holt-Lunstad, APA' },
        { n: '40%', label: 'peor adherencia a medicamentos en personas aisladas', source: 'Am. J. Public Health' },
        { n: '3–5', label: 'miembros en el hogar familiar típico — con jefe de hogar de 40–79 años', source: 'INEGI / Banxico' },
      ],
      insight: 'La mamá de tu empleado tiene 65 años. Su hijo está en Houston. Ella vive con su diabetes, su artritis y el silencio. Cuando Lupita la llama a las 10am del martes, es la primera voz humana que escucha en dos días. Eso no es exageración — es la realidad de millones.',
      employee_impact: 'Cuando la mamá está acompañada, monitorizada y con acceso a salud, tu empleado trabaja diferente. No está pendiente del celular esperando malas noticias. La tranquilidad de saber que alguien cuida a su familia es el beneficio más profundo que puedes darle.',
    },
  ],
  en: [
    {
      id: 'financial',
      color: 'var(--loss)',
      bg: '#FEF2F2',
      icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      tag: '💸',
      title: 'The silent financial crisis',
      subtitle: '$393/month · The only lifeline for their family',
      data: [
        { n: '$64.7B', label: 'Mexico received in remittances in 2024 — historic maximum', source: 'Banxico 2024' },
        { n: '96.6%', label: 'came from the United States — your employees sent it', source: 'Banxico 2024' },
        { n: '$393', label: 'is the average monthly send per worker — not extra money, it\'s the family budget', source: 'Banxico 2024' },
        { n: '1.1M', label: 'people lifted out of poverty by remittances — if it stops, they go back', source: 'CONEVAL' },
      ],
      insight: 'The remittance isn\'t "extra." It\'s the flow that pays rent, food, children\'s education AND healthcare. When a medical emergency strikes, it competes directly against the family\'s basic survival.',
      employee_impact: 'When the remittance doesn\'t cover mom\'s medication, your employee knows it in real time via WhatsApp. That conversation happens during their work shift. That distraction has a real cost to your operation.',
    },
    {
      id: 'health',
      color: '#DC2626',
      bg: '#FEF2F2',
      icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
      tag: '🏥',
      title: 'The invisible healthcare crisis',
      subtitle: '54% uninsured · Brutal out-of-pocket costs',
      data: [
        { n: '54%', label: 'of families in Mexico have no effective health insurance', source: 'OECD Health 2023' },
        { n: '$2K–8K', label: 'is the out-of-pocket cost of a hospitalization in Mexico (USD)', source: 'Market analysis' },
        { n: '5–9%', label: 'of remittances already go to healthcare — usually inefficiently', source: 'IDB Research' },
        { n: '28 wks', label: 'average public system wait time for surgery', source: 'OECD' },
      ],
      insight: 'Households receiving remittances spend more on healthcare than similar households without remittances. But that spending is chaotic: pharmacies without prescriptions, neighborhood clinics, self-medication. The public system exists but doesn\'t reach everyone.',
      employee_impact: 'Between 5 and 9% of what your employee sends is already going to healthcare. With SaludCompartida, that same spending becomes structured, predictable, and 10x more efficient. The employee doesn\'t spend more — they spend better.',
    },
    {
      id: 'loneliness',
      color: 'var(--navy)',
      bg: 'var(--navy-light)',
      icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
      tag: '💙',
      title: 'The crisis nobody sees: loneliness',
      subtitle: 'The silent epidemic · The US Surgeon General declared it a public health emergency',
      data: [
        { n: '75%', label: 'of seniors with chronic illness experience severe loneliness', source: 'National Institute on Aging' },
        { n: '15 cig', label: 'loneliness carries the same health risk as smoking 15 cigarettes a day', source: 'Holt-Lunstad, APA' },
        { n: '40%', label: 'worse medication adherence in isolated individuals', source: 'Am. J. Public Health' },
        { n: '3–5', label: 'members in the typical household — head of household 40–79 years old', source: 'INEGI / Banxico' },
      ],
      insight: 'Your employee\'s mom is 65. Her son is in Houston. She lives with her diabetes, her arthritis, and the silence. When Lupita calls her at 10am on Tuesday, it\'s the first human voice she\'s heard in two days. That\'s not an exaggeration — it\'s the reality for millions.',
      employee_impact: 'When mom is accompanied, monitored, and has healthcare access, your employee works differently. They\'re not checking their phone waiting for bad news. The peace of mind from knowing someone cares for their family is the deepest benefit you can give them.',
    },
  ]
}

export default function TheProblem() {
  const { lang } = useLang()
  const es = lang === 'es'
  const [active, setActive] = useState(0)
  const crises = CRISES[lang]
  const crisis = crises[active]

  return (
    <div id="problema" style={{ background: 'var(--white)', animation: 'fadeUp .35s ease' }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '72px 48px' }}>

        {/* Header */}
        <div style={{ maxWidth: 600, marginBottom: 44 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--loss)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12 }}>
            {es ? 'El problema que nadie ve en tu empresa' : 'The problem nobody sees in your company'}
          </div>
          <h2 style={{ fontSize: 40, marginBottom: 16, lineHeight: 1.15 }}>
            {es ? 'Tres crisis reales que afectan a tu empleado hoy' : 'Three real crises affecting your employees today'}
          </h2>
          <p style={{ fontSize: 16, color: 'var(--muted)', lineHeight: 1.65 }}>
            {es
              ? 'No son problemas abstractos. Son situaciones concretas que ocurren mientras tu empleado está en su turno. Selecciona cada una para entender el impacto real.'
              : 'These aren\'t abstract problems. They\'re concrete situations happening while your employee is on their shift. Select each to understand the real impact.'
            }
          </p>
        </div>

        {/* Crisis selector tabs */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 36, flexWrap: 'wrap' }}>
          {crises.map((c, i) => (
            <button key={c.id} onClick={() => setActive(i)} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '12px 20px', borderRadius: 10,
              border: active === i ? `2px solid ${c.color}` : '2px solid var(--border)',
              background: active === i ? c.bg : 'var(--white)',
              cursor: 'pointer', transition: 'all .15s', textAlign: 'left',
            }}>
              <span style={{ fontSize: 18 }}>{c.tag}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: active === i ? 700 : 500, color: active === i ? c.color : 'var(--body)', lineHeight: 1.2 }}>
                  {c.title}
                </div>
                <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>{c.subtitle}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Crisis detail — animated */}
        <div key={active} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, animation: 'fadeUp .2s ease' }}>

          {/* Left: data */}
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
              {crisis.data.map(({ n, label, source }) => (
                <div key={n} style={{ background: crisis.bg, borderRadius: 12, padding: '18px 16px', border: `1px solid ${crisis.color}20` }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, color: crisis.color, lineHeight: 1, marginBottom: 8 }}>{n}</div>
                  <div style={{ fontSize: 12, color: 'var(--body)', lineHeight: 1.5, marginBottom: 6 }}>{label}</div>
                  <div style={{ fontSize: 10, color: crisis.color, opacity: 0.7, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{source}</div>
                </div>
              ))}
            </div>

            {/* Insight */}
            <div style={{ background: 'var(--sand)', borderRadius: 12, padding: '18px 20px', borderLeft: `3px solid ${crisis.color}` }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: crisis.color, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
                {es ? 'Lo que realmente ocurre' : 'What\'s really happening'}
              </div>
              <p style={{ fontSize: 13, color: 'var(--body)', lineHeight: 1.7 }}>{crisis.insight}</p>
            </div>
          </div>

          {/* Right: employer impact */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

            {/* Visual metaphor for the crisis */}
            <div style={{ background: 'var(--ink)', borderRadius: 16, padding: 32, flex: 1 }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: crisis.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={crisis.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d={crisis.icon}/>
                </svg>
              </div>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
                {es ? 'Impacto directo en tu empresa' : 'Direct impact on your company'}
              </div>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.85)', lineHeight: 1.75 }}>{crisis.employee_impact}</p>
            </div>

            {/* Solution teaser */}
            <div style={{ background: crisis.bg, borderRadius: 12, padding: '18px 20px', border: `1px solid ${crisis.color}30`, display: 'flex', gap: 12, alignItems: 'center' }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={crisis.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div style={{ fontSize: 13, color: crisis.color, fontWeight: 600, lineHeight: 1.4 }}>
                {es
                  ? active === 0 ? 'SaludCompartida convierte parte de la remesa en salud estructurada — no más gasto de bolsillo ineficiente'
                  : active === 1 ? 'Médico 24/7, farmacia con 75% descuento y terapia — activado en 30 segundos, sin trámites'
                  : 'Lupita llama a la familia todos los días. Detecta señales de crisis. Rompe la soledad. Tu empleado puede respirar.'
                  : active === 0 ? 'SaludCompartida turns part of the remittance into structured healthcare — no more inefficient out-of-pocket spending'
                  : active === 1 ? '24/7 doctor, 75% pharmacy discount, and therapy — activated in 30 seconds, no paperwork'
                  : 'Lupita calls the family every day. Detects crisis signals. Breaks loneliness. Your employee can breathe.'
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
