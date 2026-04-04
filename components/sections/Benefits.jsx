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
      tag: 'Videollamada con Doctor',
      youtubeId: 'zjakLC1ipHc',
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
      youtubeId: '4y3zSt9m2C0',
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
      tag: 'Video Call with Doctor',
      youtubeId: 'zjakLC1ipHc',
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
      youtubeId: '4y3zSt9m2C0',
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
  const [videoPlaying, setVideoPlaying] = useState(false)
  // Reset video when switching tabs
  const handleTabChange = (i) => { setActive(i); setVideoPlaying(false) }
  const services = SERVICES[lang]
  const svc = services[active]
  // Reset video when tab changes
  const prevActive = active

  return (
    <div style={{ background: 'var(--sand)', animation: 'fadeUp .35s ease', color: 'white' }} className="on-green">
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '28px 48px 28px' }}>

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

        </div>

        {/* Service tabs */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 16, flexWrap: 'wrap' }}>
          {services.map((s, i) => (
            <button key={s.id} onClick={() => handleTabChange(i)} style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '10px 18px', borderRadius: 100,
              border: active === i ? '2px solid white' : '2px solid rgba(255,255,255,0.2)',
              background: active === i ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.06)',
              cursor: 'pointer', transition: 'all .15s',
            }}>
              {s.isFeature && active !== i && (
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#FCD34D', display: 'inline-block', flexShrink: 0 }}/>
              )}
              {s.IconComp && <s.IconComp size={14} color="white" strokeWidth={active === i ? 2 : 1.5} />}
              <span style={{ fontSize: 13, fontWeight: active === i ? 800 : 500, color: 'white', whiteSpace: 'nowrap' }}>
                {s.tag}
              </span>
            </button>
          ))}
        </div>

        {/* Detail panel */}
        <div key={active} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, animation: 'fadeUp .2s ease' }}>

          {/* Left: story + specs — navy card matching right side */}
          <div style={{ background: 'var(--navy)', borderRadius: 16, padding: '20px 22px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column' }}>
            {/* Badge + headline */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: `${svc.color}25`, borderRadius: 100, padding: '5px 14px', marginBottom: 16, alignSelf: 'flex-start', border: `1px solid ${svc.color}50` }}>
              {svc.IconComp && <svc.IconComp size={13} color={svc.color} strokeWidth={1.8} />}
              <span style={{ fontSize: 11, fontWeight: 800, color: 'white', textTransform: 'uppercase', letterSpacing: '0.07em' }}>{svc.tag}</span>
            </div>

            <h3 style={{ fontSize: 21, color: 'white', marginBottom: 6, lineHeight: 1.2 }}>{svc.headline}</h3>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', marginBottom: 14, fontWeight: 600 }}>{svc.subline}</p>

            {/* Human story — emotional anchor */}
            <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 12, padding: '14px 18px', marginBottom: 14, borderLeft: `3px solid ${svc.color}` }}>
              <p style={{ fontSize: 14, fontStyle: 'italic', color: 'rgba(255,255,255,0.9)', lineHeight: 1.75, marginBottom: 10 }}>
                {svc.story}
              </p>
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', fontWeight: 700 }}>{svc.story_who}</span>
            </div>

            {/* Specs */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
              {svc.specs.map((spec, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, background: 'rgba(255,255,255,0.06)', borderRadius: 8, padding: '7px 10px' }}>
                  <span style={{ color: svc.color, fontSize: 14, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>{spec.icon}</span>
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.85)', lineHeight: 1.4 }}>{spec.text}</span>
                </div>
              ))}
            </div>

            {/* Video embed — only for services with youtubeId */}
            {svc.youtubeId && (
              <div style={{ marginTop: 20, borderRadius: 12, overflow: 'hidden', position: 'relative', aspectRatio: '16/9', background: '#000', cursor: 'pointer' }}
                onClick={() => setVideoPlaying(v => !v)}>
                {videoPlaying ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${svc.youtubeId}?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1`}
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
                    allow="autoplay; fullscreen" allowFullScreen />
                ) : (
                  <>
                    <img
                      src={svc.id === 'medico' ? '/thumb_fiebre.jpg' : '/thumb_ninos.jpg'}
                      alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)', border: '2px solid rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M5 3.5l10 5.5-10 5.5V3.5z" fill="white"/></svg>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Right: stat (navy) + employer impact (redesigned) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* ── STAT BOX — always navy, always white bold ── */}
            <div style={{ background: 'var(--navy)', borderRadius: 16, padding: '24px 28px', border: '2px solid rgba(255,255,255,0.12)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 52, color: 'white', fontWeight: 700, lineHeight: 1, marginBottom: 6 }}>
                    {svc.stat.n}
                  </div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', fontWeight: 700, lineHeight: 1.4 }}>
                    {svc.stat.label}
                  </div>
                </div>
                <div style={{ marginLeft: 'auto', width: 48, height: 48, borderRadius: 12, background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {svc.IconComp && <svc.IconComp size={24} color="white" strokeWidth={1.6} />}
                </div>
              </div>
              {/* Service-specific extra stat */}
              {svc.id === 'medico' && (
                <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: '#5EEAD4', fontWeight: 700 }}>20+</span>
                  <span style={{ fontSize: 13, color: 'white', fontWeight: 700 }}>{es ? 'especialidades médicas disponibles 24/7' : 'medical specialties available 24/7'}</span>
                </div>
              )}
            </div>

            {/* ── EMPLOYER IMPACT — redesigned, content-dense ── */}
            <div style={{ background: 'var(--navy)', borderRadius: 16, padding: '22px 24px', flex: 1, border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                <div style={{ width: 4, height: 20, background: svc.color, borderRadius: 2 }} />
                <div style={{ fontSize: 10, fontWeight: 800, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  {es ? 'Por qué importa a tu empresa' : 'Why it matters to your company'}
                </div>
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'white', fontWeight: 700, marginBottom: 12, lineHeight: 1.25 }}>
                {svc.employer_benefit}
              </div>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', fontWeight: 600, lineHeight: 1.7, marginBottom: 14 }}>
                {svc.employer_detail}
              </p>
              {/* Service-specific bullet points */}
              {svc.id === 'medico' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {(es
                    ? ['1 noche sin dormir por angustia = día con errores y riesgo de accidente', 'Con SC: médico a las 11pm → empleado tranquilo a las 7am', 'Sin salir del trabajo, sin pedir permiso, sin adelantos de nómina']
                    : ['1 sleepless night from family worry = error-prone, accident-risk day', 'With SC: doctor at 11pm → employee calm at 7am', 'No leaving work, no asking for time off, no paycheck advances']
                  ).map((t, i) => (
                    <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                      <span style={{ color: '#5EEAD4', fontWeight: 800, flexShrink: 0, fontSize: 14 }}>→</span>
                      <span style={{ fontSize: 12, color: 'white', fontWeight: 600, lineHeight: 1.4 }}>{t}</span>
                    </div>
                  ))}
                </div>
              )}
              {svc.id === 'farmacia' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {(es
                    ? ['Familia con diabético adulto mayor ahorra hasta $92/mes en medicamentos', '5–9% de la remesa iba a medicamentos — ahora se queda en la familia', 'Empleado con menos estrés financiero = menos ausentismo por ansiedad']
                    : ['Family with elderly diabetic saves up to $92/month on medications', '5–9% of remittance went to medications — now stays with the family', 'Employee with less financial stress = less anxiety-related absenteeism']
                  ).map((t, i) => (
                    <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                      <span style={{ color: '#FCD34D', fontWeight: 800, flexShrink: 0, fontSize: 14 }}>→</span>
                      <span style={{ fontSize: 12, color: 'white', fontWeight: 600, lineHeight: 1.4 }}>{t}</span>
                    </div>
                  ))}
                </div>
              )}
              {svc.id === 'terapia' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {(es
                    ? ['La separación familiar genera ansiedad crónica en hijos y cónyuge', 'Un empleado preocupado por la salud mental de su familia pierde 40 min/día de concentración', 'Terapia semanal previene crisis — más barata que resolverlas después']
                    : ['Family separation creates chronic anxiety in children and spouses', 'An employee worried about family mental health loses 40 min/day of focus', 'Weekly therapy prevents crises — cheaper than resolving them later']
                  ).map((t, i) => (
                    <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                      <span style={{ color: '#6EE7B7', fontWeight: 800, flexShrink: 0, fontSize: 14 }}>→</span>
                      <span style={{ fontSize: 12, color: 'white', fontWeight: 600, lineHeight: 1.4 }}>{t}</span>
                    </div>
                  ))}
                </div>
              )}
              {svc.id === 'lupita' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {(es
                    ? ['Lupita llama proactivamente — no espera a que algo salga mal', 'Detecta señales de crisis antes de que lleguen al empleado', 'El empleado trabaja sin el peso de "estará bien mi mamá hoy"']
                    : ['Lupita calls proactively — does not wait for something to go wrong', 'Detects crisis signals before they reach the employee', 'Employee works without the weight of "is my mom okay today?"']
                  ).map((t, i) => (
                    <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                      <span style={{ color: '#93C5FD', fontWeight: 800, flexShrink: 0, fontSize: 14 }}>→</span>
                      <span style={{ fontSize: 12, color: 'white', fontWeight: 600, lineHeight: 1.4 }}>{t}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Lupita: loneliness epidemic — navy box, white bold */}
            {svc.isFeature && (
              <div style={{ background: 'var(--navy)', borderRadius: 12, padding: '18px 20px', border: '2px solid rgba(255,255,255,0.12)' }}>
                <div style={{ fontSize: 10, fontWeight: 800, color: 'white', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 14 }}>
                  {es ? 'La epidemia invisible' : 'The invisible epidemic'}
                </div>
                <div style={{ display: 'flex', gap: 16, justifyContent: 'space-between' }}>
                  {[
                    { n: '15 cig', label: es ? 'Riesgo equivalente de la soledad crónica' : 'Equivalent risk of chronic loneliness' },
                    { n: '40%', label: es ? 'Peor adherencia a medicamentos por aislamiento' : 'Worse medication adherence from isolation' },
                    { n: '75%', label: es ? 'Adultos mayores con enf. crónica tienen soledad severa' : 'Seniors with chronic illness have severe loneliness' },
                  ].map(({ n, label }) => (
                    <div key={n} style={{ textAlign: 'center', flex: 1 }}>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: 26, color: 'white', fontWeight: 700, lineHeight: 1 }}>{n}</div>
                      <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.85)', fontWeight: 700, marginTop: 6, lineHeight: 1.4 }}>{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
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
