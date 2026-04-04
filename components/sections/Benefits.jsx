'use client'
import { useState } from 'react'
import { useLang } from '@/contexts/LanguageContext'
import { IconTelemedicina, IconFarmacia, IconTerapia, IconLupita } from '@/components/icons/SCIcons'

// Neuroscience principle: each service tells a HUMAN STORY first, then specs.
// The HR manager buys the story. The Risk Manager validates with the data.
// Lupita/loneliness gets the most emotional real estate — it's the moat.

const SERVICES = {
  es: [
    {
      id: 'medico',
      IconComp: IconTelemedicina,
      color: 'var(--teal)',
      bg: 'var(--teal-light)',
      icon: 'M15 10l4.553-2.069A1 1 0 0121 8.87V15.13a1 1 0 01-1.447.9L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z',
      tag: 'Telemedicina',
      headline: 'Médico disponible a cualquier hora',
      subline: 'Desde el celular. Sin fila. Sin traslado.',
      story: '"Son las 11pm en Guadalajara. La mamá de Carlos tiene fiebre alta y tos. Antes, Carlos hubiera pasado toda la noche en vela esperando que el IMSS abriera a las 8am. Con SaludCompartida, a las 11:01pm ya está hablando con un médico por videollamada."',
      story_who: '— Escenario real. Ocurre cada noche.',
      specs: [
        { icon: '✓', text: 'Disponible 24/7, 365 días' },
        { icon: '✓', text: 'Videollamada desde cualquier celular' },
        { icon: '✓', text: 'Receta electrónica incluida' },
        { icon: '✓', text: 'Seguimiento post-consulta' },
      ],
      employer_benefit: 'Tu empleado duerme. Mañana llega al trabajo.',
      employer_detail: 'Una noche sin dormir por angustia familiar = día improductivo, errores, riesgo de accidente en trabajo físico. Resuelto en 5 minutos con telemedicina.',
      stat: { n: '< 5 min', label: 'tiempo de espera promedio para consulta' },
    },
    {
      id: 'farmacia',
      IconComp: IconFarmacia,
      color: 'var(--amber)',
      bg: 'var(--amber-light)',
      icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
      tag: 'Farmacia',
      headline: 'Hasta 75% de descuento en medicamentos',
      subline: '1,700+ farmacias en México. La remesa rinde el doble.',
      story: '"La mamá de Rosa toma metformina, losartán y atorvastatina todos los meses. Sin SaludCompartida: $120 USD de su bolsillo. Con SaludCompartida: $28 USD. Rosa ahora puede enviar $92 más a su familia — o simplemente respirar."',
      story_who: '— Caso real. Diabetes + hipertensión + colesterol = $120/mes en México.',
      specs: [
        { icon: '✓', text: 'Hasta 75% de descuento' },
        { icon: '✓', text: '1,700+ farmacias afiliadas' },
        { icon: '✓', text: 'Medicamentos crónicos priorizados' },
        { icon: '✓', text: 'Se activa mostrando el código QR' },
      ],
      employer_benefit: 'La remesa ya no se va en medicamentos.',
      employer_detail: 'Entre 5–9% de la remesa ya se destina a salud de bolsillo (Banxico/IDB). El descuento en farmacia devuelve ese dinero al presupuesto familiar — reduciendo el estrés financiero directamente.',
      stat: { n: '$92', label: 'ahorro mensual promedio en medicamentos crónicos' },
    },
    {
      id: 'terapia',
      IconComp: IconTerapia,
      color: 'var(--emerald)',
      bg: 'var(--emerald-light)',
      icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
      tag: 'Terapia',
      headline: 'Salud mental para toda la familia',
      subline: 'Psicólogo certificado. Online. Sin estigma.',
      story: '"La hija de Javier tiene 14 años y empezó a fallar en la escuela. Llevaba meses con ansiedad desde que papá se fue a Chicago. La terapia online de SaludCompartida la vio los martes a las 4pm, desde casa, sin que nadie en la colonia lo supiera."',
      story_who: '— La separación familiar tiene un costo emocional invisible.',
      specs: [
        { icon: '✓', text: 'Psicólogos certificados disponibles' },
        { icon: '✓', text: 'Video, chat o llamada' },
        { icon: '✓', text: 'Para adultos, adolescentes y niños' },
        { icon: '✓', text: 'Agenda online en minutos' },
      ],
      employer_benefit: 'Familias estables = empleados presentes.',
      employer_detail: 'La inestabilidad emocional en la familia de México impacta directamente la estabilidad del empleado en EE.UU. Tratar la raíz del problema reduce rotación y ausentismo.',
      stat: { n: '1 de 3', label: 'mexicanos necesita atención de salud mental — menos del 10% la recibe' },
    },
    {
      id: 'lupita',
      IconComp: IconLupita,
      color: 'var(--navy)',
      bg: 'var(--navy-light)',
      icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
      tag: 'Lupita — IA',
      headline: 'La compañía que tu empleado no puede dar',
      subline: 'Proactiva. Cultural. Humana. Llama ella primero.',
      story: '"Son las 10am del martes. Doña Carmen, 71 años, no ha tomado su insulina en 3 días. No le ha dicho a su hijo porque no quiere preocuparlo. Lupita la llama — como lo hace cada martes — y en la conversación natural detecta la señal. Conecta a Carmen con el médico antes de que sea una emergencia."',
      story_who: '— Esto no es un chatbot. Es una guardiana silenciosa.',
      specs: [
        { icon: '★', text: 'Llama proactivamente — no espera que la llamen' },
        { icon: '★', text: 'Diseñada para el adulto mayor mexicano culturalmente' },
        { icon: '★', text: 'Usa "usted" o "tú" según la persona' },
        { icon: '★', text: 'Detecta señales de crisis emocional y física' },
        { icon: '★', text: 'Escala a médico o psicólogo cuando lo necesita' },
        { icon: '★', text: '16 códigos conductuales propietarios' },
      ],
      employer_benefit: 'Tu empleado puede respirar.',
      employer_detail: 'El 75% de adultos mayores con enfermedad crónica tiene soledad severa (National Institute on Aging). Lupita no reemplaza al hijo — crea la red de seguridad que permite que el empleado trabaje sin ese peso constante.',
      stat: { n: '75%', label: 'de adultos mayores con enfermedad crónica tienen soledad severa' },
      isFeature: true,
    },
  ],
  en: [
    {
      id: 'medico',
      IconComp: IconTelemedicina,
      color: 'var(--teal)',
      bg: 'var(--teal-light)',
      icon: 'M15 10l4.553-2.069A1 1 0 0121 8.87V15.13a1 1 0 01-1.447.9L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z',
      tag: 'Telemedicine',
      headline: 'Doctor available any time',
      subline: 'From their phone. No line. No travel.',
      story: '"It\'s 11pm in Guadalajara. Carlos\'s mom has a high fever and cough. Before, Carlos would have spent all night awake waiting for the clinic to open at 8am. With SaludCompartida, at 11:01pm she\'s already speaking with a doctor by video call."',
      story_who: '— Real scenario. Happens every night.',
      specs: [
        { icon: '✓', text: 'Available 24/7, 365 days' },
        { icon: '✓', text: 'Video call from any phone' },
        { icon: '✓', text: 'Electronic prescription included' },
        { icon: '✓', text: 'Post-consultation follow-up' },
      ],
      employer_benefit: 'Your employee sleeps. Tomorrow they show up.',
      employer_detail: 'One sleepless night from family anxiety = unproductive day, errors, accident risk in physical work. Resolved in 5 minutes with telemedicine.',
      stat: { n: '< 5 min', label: 'average wait time for consultation' },
    },
    {
      id: 'farmacia',
      IconComp: IconFarmacia,
      color: 'var(--amber)',
      bg: 'var(--amber-light)',
      icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
      tag: 'Pharmacy',
      headline: 'Up to 75% off medications',
      subline: '1,700+ pharmacies in Mexico. The remittance goes twice as far.',
      story: '"Rosa\'s mom takes metformin, losartan and atorvastatin every month. Without SC: $120 USD out of pocket. With SC: $28 USD. Rosa can now send $92 more to her family — or simply breathe."',
      story_who: '— Real case. Diabetes + hypertension + cholesterol = $120/month in Mexico.',
      specs: [
        { icon: '✓', text: 'Up to 75% discount' },
        { icon: '✓', text: '1,700+ affiliated pharmacies' },
        { icon: '✓', text: 'Chronic medications prioritized' },
        { icon: '✓', text: 'Activated by showing QR code' },
      ],
      employer_benefit: 'The remittance no longer goes to medications.',
      employer_detail: '5–9% of remittances already go to out-of-pocket healthcare (Banxico/IDB). The pharmacy discount returns that money to the family budget — directly reducing financial stress.',
      stat: { n: '$92', label: 'average monthly savings on chronic medications' },
    },
    {
      id: 'terapia',
      IconComp: IconTerapia,
      color: 'var(--emerald)',
      bg: 'var(--emerald-light)',
      icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
      tag: 'Therapy',
      headline: 'Mental health for the whole family',
      subline: 'Certified psychologist. Online. No stigma.',
      story: '"Javier\'s daughter is 14 and started failing in school. She\'d had anxiety for months since dad left for Chicago. SaludCompartida\'s online therapy saw her every Tuesday at 4pm, from home, without anyone in the neighborhood knowing."',
      story_who: '— Family separation has an invisible emotional cost.',
      specs: [
        { icon: '✓', text: 'Certified psychologists available' },
        { icon: '✓', text: 'Video, chat, or phone' },
        { icon: '✓', text: 'For adults, teens, and children' },
        { icon: '✓', text: 'Online scheduling in minutes' },
      ],
      employer_benefit: 'Stable families = present employees.',
      employer_detail: 'Emotional instability in the Mexico family directly impacts the employee\'s stability in the US. Treating the root cause reduces turnover and absenteeism.',
      stat: { n: '1 in 3', label: 'Mexicans need mental health care — less than 10% receive it' },
    },
    {
      id: 'lupita',
      IconComp: IconLupita,
      color: 'var(--navy)',
      bg: 'var(--navy-light)',
      icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
      tag: 'Lupita — AI',
      headline: 'The companion your employee can\'t provide',
      subline: 'Proactive. Cultural. Human. She calls first.',
      story: '"It\'s 10am on Tuesday. Doña Carmen, 71, hasn\'t taken her insulin in 3 days. She hasn\'t told her son because she doesn\'t want to worry him. Lupita calls — as she does every Tuesday — and in natural conversation detects the signal. She connects Carmen with the doctor before it becomes an emergency."',
      story_who: '— This is not a chatbot. This is a silent guardian.',
      specs: [
        { icon: '★', text: 'Calls proactively — doesn\'t wait to be called' },
        { icon: '★', text: 'Culturally designed for the Mexican senior' },
        { icon: '★', text: 'Uses formal or informal address based on the person' },
        { icon: '★', text: 'Detects emotional and physical crisis signals' },
        { icon: '★', text: 'Escalates to doctor or psychologist when needed' },
        { icon: '★', text: '16 proprietary behavioral codes' },
      ],
      employer_benefit: 'Your employee can breathe.',
      employer_detail: '75% of seniors with chronic illness have severe loneliness (National Institute on Aging). Lupita doesn\'t replace the son — she creates the safety net that lets the employee work without that constant weight.',
      stat: { n: '75%', label: 'of seniors with chronic illness have severe loneliness' },
      isFeature: true,
    },
  ]
}

export default function Benefits() {
  const { lang } = useLang()
  const es = lang === 'es'
  const [active, setActive] = useState(3) // default to Lupita — most differentiated
  const services = SERVICES[lang]
  const svc = services[active]

  return (
    <div style={{ background: 'var(--sand)', animation: 'fadeUp .35s ease', color: 'white' }} className="on-green">
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '72px 48px' }}>

        {/* Header + NOT insurance */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 40, marginBottom: 44, flexWrap: 'wrap' }}>
          <div style={{ maxWidth: 520 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12 }}>
              {es ? 'Los 4 beneficios' : 'The 4 benefits'}
            </div>
            <h2 style={{ fontSize: 40, marginBottom: 14, color: 'white' }}>
              {es ? 'Lo que recibe la familia de tu empleado' : 'What your employee\'s family receives'}
            </h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.75)', lineHeight: 1.65 }}>
              {es
                ? 'Cada beneficio resuelve una crisis real. El último — Lupita — resuelve la que nadie más está atacando.'
                : 'Each benefit solves a real crisis. The last one — Lupita — solves the one nobody else is tackling.'
              }
            </p>
          </div>
          {/* NOT insurance pill */}
          <div style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: 12, padding: '14px 18px', maxWidth: 280, flexShrink: 0 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'white', marginBottom: 6 }}>
              {es ? '⚠ Esto NO es un seguro médico' : '⚠ This is NOT health insurance'}
            </div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>
              {es
                ? 'Sin deducibles · Sin copagos · Sin trámites · Sin períodos de espera · Activo en 30 segundos'
                : 'No deductibles · No copays · No paperwork · No waiting periods · Active in 30 seconds'
              }
            </div>
          </div>
        </div>

        {/* Service tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 32, flexWrap: 'wrap' }}>
          {services.map((s, i) => (
            <button key={s.id} onClick={() => setActive(i)} style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '10px 18px', borderRadius: 100,
              border: active === i ? '2px solid white' : '2px solid rgba(255,255,255,0.2)',
              background: active === i ? 'white' : 'rgba(255,255,255,0.08)',
              cursor: 'pointer', transition: 'all .15s',
            }}>
              {s.isFeature && active !== i && (
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#FCD34D', display: 'inline-block', flexShrink: 0 }}/>
              )}
              {s.IconComp && <s.IconComp size={14} color={active === i ? s.color : 'rgba(255,255,255,0.6)'} strokeWidth={1.5} />}
              <span style={{ fontSize: 13, fontWeight: active === i ? 700 : 400, color: active === i ? s.color : 'rgba(255,255,255,0.75)', whiteSpace: 'nowrap' }}>
                {s.tag}
              </span>
            </button>
          ))}
        </div>

        {/* Detail panel */}
        <div key={active} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, animation: 'fadeUp .2s ease' }}>

          {/* Left: story + specs */}
          <div>
            {/* Badge + headline */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: svc.bg, borderRadius: 100, padding: '4px 12px', marginBottom: 16 }}>
              {svc.IconComp && <svc.IconComp size={13} color={svc.color} strokeWidth={1.8} />}
              <span style={{ fontSize: 11, fontWeight: 700, color: svc.color, textTransform: 'uppercase', letterSpacing: '0.07em' }}>{svc.tag}</span>
            </div>

            <h3 style={{ fontSize: 26, color: 'white', marginBottom: 8, lineHeight: 1.2 }}>{svc.headline}</h3>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', marginBottom: 24, fontWeight: 500 }}>{svc.subline}</p>

            {/* Human story — emotional anchor */}
            <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 12, padding: '20px 22px', marginBottom: 24, borderLeft: `3px solid ${svc.color}` }}>
              <p style={{ fontSize: 14, fontStyle: 'italic', color: 'rgba(255,255,255,0.9)', lineHeight: 1.75, marginBottom: 10 }}>
                {svc.story}
              </p>
              <span style={{ fontSize: 12, color: svc.color, fontWeight: 600 }}>{svc.story_who}</span>
            </div>

            {/* Specs */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {svc.specs.map((spec, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, background: 'rgba(255,255,255,0.06)', borderRadius: 8, padding: '10px 12px' }}>
                  <span style={{ color: svc.color, fontSize: 14, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>{spec.icon}</span>
                  <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)', lineHeight: 1.45 }}>{spec.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: employer impact + stat */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

            {/* Big stat */}
            <div style={{ background: svc.bg, borderRadius: 16, padding: 28, textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 56, color: svc.color, lineHeight: 1, marginBottom: 10 }}>
                {svc.stat.n}
              </div>
              <div style={{ fontSize: 13, color: 'var(--body)', lineHeight: 1.5, maxWidth: 220, margin: '0 auto' }}>
                {svc.stat.label}
              </div>
            </div>

            {/* Employer impact */}
            <div style={{ background: 'var(--ink)', borderRadius: 16, padding: 24, flex: 1, color: 'white' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.85)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
                {es ? 'Por qué importa a tu empresa' : 'Why it matters to your company'}
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'white', marginBottom: 12, lineHeight: 1.3 }}>
                {svc.employer_benefit}
              </div>
              <p style={{ fontSize: 13, color: 'white', fontWeight: 500, lineHeight: 1.7 }}>
                {svc.employer_detail}
              </p>
            </div>

            {/* Lupita special: loneliness epidemic callout */}
            {svc.isFeature && (
              <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 12, padding: '16px 18px', border: '1px solid rgba(255,255,255,0.15)' }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#FCD34D', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
                  {es ? 'La epidemia invisible' : 'The invisible epidemic'}
                </div>
                <div style={{ display: 'flex', gap: 20 }}>
                  {[
                    { n: '15 cig', label: es ? 'riesgo equivalente de la soledad' : 'equivalent risk of loneliness' },
                    { n: '40%', label: es ? 'peor adherencia a medicamentos' : 'worse medication adherence' },
                    { n: '0', label: es ? 'soluciones en el mercado para familias migrantes' : 'solutions in the market for migrant families' },
                  ].map(({ n, label }) => (
                    <div key={n} style={{ textAlign: 'center' }}>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: '#FCD34D', lineHeight: 1 }}>{n}</div>
                      <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', marginTop: 4, lineHeight: 1.3 }}>{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Photo: abuela mamá hija — la familia protegida */}
        <div style={{ marginTop: 48, borderRadius: 16, overflow: 'hidden', height: 280, position: 'relative' }}>
          <img src="/abuelamamahija.jpeg" alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,104,71,0.88) 0%, rgba(0,104,71,0.6) 40%, transparent 75%)' }} />
          <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: 32, maxWidth: 320 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.85)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>
              {es ? 'La familia de tu empleado' : "Your employee's family"}
            </div>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 24, color: 'white', fontWeight: 700, lineHeight: 1.3 }}>
              {es ? 'Protegida. Presente. Tranquila.' : 'Protected. Present. At peace.'}
            </p>
          </div>
        </div>

        {/* Bottom: the promise */}
        <div style={{ marginTop: 48, background: 'rgba(255,255,255,0.06)', borderRadius: 16, padding: '28px 36px', border: '1px solid rgba(255,255,255,0.12)', display: 'flex', gap: 32, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 280 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'white', marginBottom: 10, lineHeight: 1.3 }}>
              {es
                ? 'Un empleado que sabe que su familia está protegida es un empleado diferente.'
                : 'An employee who knows their family is protected is a different kind of employee.'
              }
            </div>
            <p style={{ fontSize: 14, color: 'white', fontWeight: 500, lineHeight: 1.7 }}>
              {es
                ? 'No necesita revisar el celular cada hora. No necesita pedir un adelanto para una emergencia. No necesita pedir permiso para atender una crisis que SaludCompartida ya resolvió.'
                : "They don't need to check their phone every hour. They don't need to ask for a paycheck advance for an emergency. They don't need to ask for time off for a crisis SaludCompartida already solved."
              }
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flexShrink: 0 }}>
            {[
              { icon: '↑', text: es ? 'Mayor productividad' : 'Higher productivity', color: '#6EE7B7' },
              { icon: '↓', text: es ? 'Menos rotación' : 'Less turnover', color: '#6EE7B7' },
              { icon: '↓', text: es ? 'Menos ausentismo' : 'Less absenteeism', color: '#6EE7B7' },
              { icon: '↑', text: es ? 'Mayor lealtad' : 'Greater loyalty', color: '#FCD34D' },
            ].map(({ icon, text, color }) => (
              <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 16, fontWeight: 700, color, width: 20, textAlign: 'center' }}>{icon}</span>
                <span style={{ fontSize: 13, color: 'white', fontWeight: 600 }}>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
