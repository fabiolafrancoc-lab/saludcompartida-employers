'use client'
import { useState } from 'react'
import { useLang } from '@/contexts/LanguageContext'

// Carlos Henriquez — the face of the benefit
// Construction worker, Houston TX, 34 years old
// Wife in Mexico City, mother-in-law diabetic, two kids

const MOMENTS = {
  es: [
    {
      time: '6:47 am',
      icon: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z',
      color: 'var(--amber)',
      bg: '#FEF3C7',
      title: 'Antes de entrar a trabajar',
      before: 'Revisa el teléfono. Su suegra no se sentía bien anoche. ¿Habrá ido al médico? ¿Tuvo para el pasaje? ¿Cuánto le va a costar?',
      after: 'Revisa el WhatsApp. Lupita ya le avisó a su esposa que la llevara a la consulta virtual a las 9am. El médico ya la atendió. Todo bajo control.',
      withSC: true,
    },
    {
      time: '12:15 pm',
      icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
      color: 'var(--loss)',
      bg: '#FEE2E2',
      title: 'La llamada que cambia el día',
      before: 'Su esposa llama llorando. Su mamá necesita insulina. $2,400 pesos — casi $120 dólares. Carlos no tiene eso ahora. Llega distraído al trabajo de la tarde.',
      after: 'Su esposa manda foto de la receta por WhatsApp al código de farmacia. 72% de descuento. Paga $34 dólares en vez de $120. Carlos lo sabe. Sigue trabajando tranquilo.',
      withSC: true,
    },
    {
      time: '8:30 pm',
      icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
      color: 'var(--emerald)',
      bg: '#D1FAE5',
      title: 'La noche en casa',
      before: 'No puede dormir pensando en qué pasaría si su mamá tiene una complicación. ¿Hay suficiente en la cuenta? ¿Y si hay que hospitalizarla?',
      after: 'Lupita llamó a su suegra a las 7pm. Platicaron 20 minutos. Le recordó tomar su medicina. Carlos sabe que alguien está velando por ella cuando él no puede.',
      withSC: true,
    },
    {
      time: 'Viernes · quincena',
      icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      color: 'var(--navy)',
      bg: '#EEF2FF',
      title: 'El día de la remesa',
      before: 'Manda $500 dólares. Sabe que $150 se irán en médico y medicina para su mamá. Cada quincena, lo mismo. Un hueco que no cierra.',
      after: 'Manda $500 dólares. El médico ya está pagado. La medicina con descuento ya está lista. Esos $150 se quedan en México para comida y renta. Por primera vez, alcanza.',
      withSC: true,
    },
  ],
  en: [
    {
      time: '6:47 am',
      icon: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z',
      color: 'var(--amber)',
      bg: '#FEF3C7',
      title: 'Before the work shift',
      before: 'Checks his phone. His mother-in-law wasn\'t feeling well last night. Did she go to the doctor? Did she have money for the bus? How much will it cost?',
      after: 'Checks WhatsApp. Lupita already told his wife to bring her to the 9am virtual consultation. The doctor already saw her. Everything under control.',
      withSC: true,
    },
    {
      time: '12:15 pm',
      icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
      color: 'var(--loss)',
      bg: '#FEE2E2',
      title: 'The call that changes the day',
      before: 'His wife calls crying. Her mom needs insulin. $120 dollars. Carlos doesn\'t have it right now. He arrives distracted to the afternoon shift.',
      after: 'His wife sends a photo of the prescription via WhatsApp to the pharmacy code. 72% discount. Pays $34 instead of $120. Carlos knows. Keeps working calmly.',
      withSC: true,
    },
    {
      time: '8:30 pm',
      icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
      color: 'var(--emerald)',
      bg: '#D1FAE5',
      title: 'The evening at home',
      before: 'Can\'t sleep thinking about what would happen if his mother-in-law has a complication. Is there enough in the account? What if she needs to be hospitalized?',
      after: 'Lupita called his mother-in-law at 7pm. They talked for 20 minutes. She reminded her to take her medicine. Carlos knows someone is watching over her when he can\'t.',
      withSC: true,
    },
    {
      time: 'Friday · payday',
      icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      color: 'var(--navy)',
      bg: '#EEF2FF',
      title: 'Remittance day',
      before: 'Sends $500. Knows that $150 will go to doctor and medicine for his mom. Every two weeks, the same. A gap that never closes.',
      after: 'Sends $500. The doctor is already covered. The discounted medicine is ready. Those $150 stay in Mexico for food and rent. For the first time, it\'s enough.',
      withSC: true,
    },
  ]
}

export default function Carlos() {
  const { lang } = useLang()
  const es = lang === 'es'
  const [activeM, setActiveM] = useState(0)
  const moments = MOMENTS[lang]
  const m = moments[activeM]

  return (
    <div style={{ background: 'var(--white)', animation: 'fadeUp .35s ease' }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '28px 48px 28px' }}>

        {/* Header */}
        <div style={{ maxWidth: 580, marginBottom: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--teal)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12 }}>
            {es ? 'El empleado detrás del beneficio' : 'The employee behind the benefit'}
          </div>
          <h2 style={{ fontSize: 34, marginBottom: 12, lineHeight: 1.1 }}>
            {es ? 'Un día en la vida de Carlos Henríquez' : 'A day in the life of Carlos Henríquez'}
          </h2>
          <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.6 }}>
            {es
              ? 'Operador de maquinaria en Houston. 34 años. 8 años en los Estados Unidos. Su suegra es diabética en Ciudad de México. Su esposa y dos hijos dependen de lo que él manda cada quincena.'
              : 'Machinery operator in Houston. 34 years old. 8 years in the United States. His mother-in-law is diabetic in Mexico City. His wife and two kids depend on what he sends every two weeks.'
            }
          </p>
        </div>

        {/* Familia de Carlos — visual anchor */}
        <div style={{ marginBottom: 20, borderRadius: 16, overflow: 'hidden', position: 'relative', height: 220 }}>
          <img src="/familiagrande.jpeg" alt="La familia de Carlos"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 12%', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(5,8,18,0.95) 0%, rgba(5,8,18,0.55) 45%, rgba(5,8,18,0.05) 75%, transparent 100%)' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '28px 32px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
              <div>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 26, color: 'white', fontWeight: 700, lineHeight: 1.2, marginBottom: 8 }}>
                  {es ? 'Esta es la familia de Carlos.' : "This is Carlos's family."}
                </p>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.9)', fontWeight: 600, lineHeight: 1.55, maxWidth: 520 }}>
                  {es
                    ? 'Su esposa, sus hijos, su suegra, sus padres — en Ciudad de México. Él trabaja en Houston para darles una vida mejor. Cada quincena manda $500. Cada mes reza para que alcance.'
                    : "His wife, his children, his mother-in-law, his parents — in Mexico City. He works in Houston to give them a better life. Every two weeks he sends $500. Every month he prays it's enough."
                  }
                </p>
              </div>
              <div style={{ background: 'rgba(0,104,71,0.92)', backdropFilter: 'blur(8px)', borderRadius: 10, padding: '12px 20px', flexShrink: 0, textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, color: 'white', fontWeight: 700, lineHeight: 1 }}>$500</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.85)', fontWeight: 600, marginTop: 4 }}>{es ? 'remesa quincenal' : 'biweekly remittance'}</div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '0.85fr 1.15fr', gap: 40, alignItems: 'start' }}>

          {/* Left: Carlos profile + family */}
          <div>
            {/* Profile card */}
            <div style={{ background: 'var(--navy)', borderRadius: 16, padding: 28, marginBottom: 20, position: 'relative', overflow: 'hidden', color: 'white' }} className="on-dark">
              {/* Background pattern */}
              <div style={{ position: 'absolute', top: -20, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }}/>
              <div style={{ position: 'absolute', bottom: -30, right: 20, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }}/>

              {/* Avatar */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20, position: 'relative' }}>
                <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'linear-gradient(135deg, #0891B2, #059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '2px solid rgba(255,255,255,0.2)' }}>
                  {/* Male silhouette SVG */}
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <circle cx="16" cy="11" r="6" fill="white" opacity="0.9"/>
                    <path d="M4 28c0-6.627 5.373-12 12-12s12 5.373 12 12" fill="white" opacity="0.7"/>
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: 'white', fontFamily: 'var(--font-display)' }}>Carlos Henríquez</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 2 }}>
                    {es ? 'Operador de maquinaria · Houston, TX' : 'Machinery operator · Houston, TX'}
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {[
                  { val: '8', label: es ? 'años en EE.UU.' : 'years in the US' },
                  { val: '$500', label: es ? 'remesa cada 15 días' : 'remittance every 2 weeks' },
                  { val: '4', label: es ? 'personas dependen de él' : 'people depend on him' },
                  { val: '$150', label: es ? 'iban a salud cada mes' : 'went to health every month' },
                ].map(({ val, label }) => (
                  <div key={val} style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 8, padding: '10px 12px' }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'white', lineHeight: 1 }}>{val}</div>
                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.55)', marginTop: 4, lineHeight: 1.3 }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Family in Mexico */}
            <div style={{ background: '#F9FAFB', borderRadius: 12, padding: 20, border: '1px solid var(--border)' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 }}>
                {es ? 'Su familia en México' : 'His family in Mexico'}
              </div>
              {[
                { initials: 'MH', name: es ? 'María (suegra)' : 'María (mother-in-law)', detail: es ? 'Diabética · 64 años · CDMX' : 'Diabetic · 64 years old · CDMX', color: '#DC2626' },
                { initials: 'LH', name: es ? 'Lupita (esposa)' : 'Lupita (wife)', detail: es ? 'Ama de casa · cuida a doña María' : 'Homemaker · cares for doña María', color: '#059669' },
                { initials: 'JH', name: es ? 'Jorge (hijo, 10)' : 'Jorge (son, 10)', detail: es ? 'Primaria · Iztapalapa' : 'Elementary school · Iztapalapa', color: '#0891B2' },
                { initials: 'AH', name: es ? 'Ana (hija, 7)' : 'Ana (daughter, 7)', detail: es ? 'Primaria · Iztapalapa' : 'Elementary school · Iztapalapa', color: '#D97706' },
              ].map(({ initials, name, detail, color }) => (
                <div key={initials} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: 'white', flexShrink: 0 }}>
                    {initials}
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink)' }}>{name}</div>
                    <div style={{ fontSize: 11, color: 'var(--muted)' }}>{detail}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Carlos quote */}
            <div style={{ background: 'var(--teal-light)', borderRadius: 12, padding: 20, marginTop: 16, borderLeft: '3px solid var(--teal)' }}>
              <p style={{ fontSize: 13, color: 'var(--navy)', lineHeight: 1.7, fontStyle: 'italic' }}>
                {es
                  ? '"Antes mandaba el dinero con miedo. Ahora lo mando sabiendo que ya tienen médico, que ya tienen medicina. Eso no tiene precio."'
                  : '"Before I sent money with fear. Now I send it knowing they already have a doctor, they already have medicine. That\'s priceless."'
                }
              </p>
              <div style={{ fontSize: 12, color: 'var(--teal)', fontWeight: 600, marginTop: 10 }}>— Carlos Henríquez</div>
            </div>
          </div>

          {/* Right: Day-in-the-life interactive timeline */}
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 16 }}>
              {es ? 'Su día — antes y después de SaludCompartida' : 'His day — before and after SaludCompartida'}
            </div>

            {/* Moment selector */}
            <div style={{ display: 'flex', gap: 6, marginBottom: 24, flexWrap: 'wrap' }}>
              {moments.map((mom, i) => (
                <button key={i} onClick={() => setActiveM(i)} style={{
                  padding: '7px 14px', borderRadius: 100,
                  border: activeM === i ? '2px solid var(--navy)' : '2px solid var(--border)',
                  background: activeM === i ? 'var(--navy)' : 'var(--white)',
                  color: activeM === i ? 'white' : 'var(--muted)',
                  fontSize: 12, fontWeight: activeM === i ? 600 : 400,
                  cursor: 'pointer', transition: 'all .15s',
                }}>
                  {mom.time}
                </button>
              ))}
            </div>

            {/* Moment detail */}
            <div key={activeM} style={{ animation: 'fadeUp .2s ease' }}>
              {/* Title */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: m.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={m.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d={m.icon}/>
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: m.color, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{m.time}</div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--ink)' }}>{m.title}</div>
                </div>
              </div>

              {/* Before / After */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 20 }}>
                {/* Before */}
                <div style={{ background: '#FEF2F2', borderRadius: 12, padding: '16px 18px', border: '1px solid rgba(220,38,38,0.12)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                    <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'var(--loss)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1 1l6 6M7 1L1 7" stroke="white" strokeWidth="1.3" strokeLinecap="round"/></svg>
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--loss)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                      {es ? 'Sin SC' : 'Without SC'}
                    </span>
                  </div>
                  <p style={{ fontSize: 13, color: '#7F1D1D', lineHeight: 1.65 }}>{m.before}</p>
                </div>

                {/* After */}
                <div style={{ background: '#ECFDF5', borderRadius: 12, padding: '16px 18px', border: '1px solid rgba(5,150,105,0.15)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                    <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'var(--emerald)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="9" height="7" viewBox="0 0 9 7" fill="none"><path d="M1 3.5L3 5.5L8 1" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--emerald)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                      {es ? 'Con SC' : 'With SC'}
                    </span>
                  </div>
                  <p style={{ fontSize: 13, color: '#064E3B', lineHeight: 1.65 }}>{m.after}</p>
                </div>
              </div>

              {/* What this means for the employer */}
              <div style={{ background: 'var(--navy-light)', borderRadius: 10, padding: '14px 18px', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--navy)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
                  <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                </svg>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--navy)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 4 }}>
                    {es ? 'Lo que esto significa para tu empresa' : 'What this means for your company'}
                  </div>
                  <p style={{ fontSize: 12, color: 'var(--navy)', lineHeight: 1.6, opacity: 0.85 }}>
                    {activeM === 0 && (es ? 'Carlos llega al turno de mañana con la mente en el trabajo, no en México. Menos errores. Menos accidentes. Más productividad desde la primera hora.' : 'Carlos arrives for the morning shift with his mind on work, not Mexico. Fewer mistakes. Fewer accidents. More productivity from the first hour.')}
                    {activeM === 1 && (es ? 'Carlos no pierde concentración en el turno de la tarde. El estrés financiero agudo es la principal causa de distracción laboral en esta población.' : 'Carlos doesn\'t lose concentration in the afternoon shift. Acute financial stress is the main cause of workplace distraction in this population.')}
                    {activeM === 2 && (es ? 'Carlos duerme. Un empleado que duerme bien rinde mejor, comete menos errores y tiene menor riesgo de accidente. Especialmente crítico en operaciones con maquinaria.' : 'Carlos sleeps. An employee who sleeps well performs better, makes fewer mistakes, and has lower accident risk. Especially critical in machinery operations.')}
                    {activeM === 3 && (es ? 'Carlos no está considerando buscar otro trabajo para ganar $50 más y mandar $50 más. La ecuación económica de quedarse contigo mejoró — sin que le subieras el sueldo.' : 'Carlos is not considering looking for another job to earn $50 more and send $50 more. The economic equation of staying with you improved — without giving him a raise.')}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--border)' }}>
              <button onClick={() => setActiveM(a => Math.max(0, a - 1))} disabled={activeM === 0}
                style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 8, border: '1px solid var(--border)', background: activeM === 0 ? '#F9FAFB' : 'var(--white)', color: activeM === 0 ? 'var(--muted)' : 'var(--navy)', cursor: activeM === 0 ? 'default' : 'pointer', fontSize: 13 }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 3L5 7l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                {es ? 'Anterior' : 'Previous'}
              </button>
              <div style={{ display: 'flex', gap: 6 }}>
                {moments.map((_, i) => (
                  <div key={i} onClick={() => setActiveM(i)} style={{ width: activeM === i ? 20 : 6, height: 6, borderRadius: 3, background: activeM === i ? 'var(--navy)' : 'var(--border)', cursor: 'pointer', transition: 'all .2s' }}/>
                ))}
              </div>
              <button onClick={() => setActiveM(a => Math.min(3, a + 1))} disabled={activeM === 3}
                style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 8, border: '1px solid var(--border)', background: activeM === 3 ? '#F9FAFB' : 'var(--navy)', color: activeM === 3 ? 'var(--muted)' : 'white', cursor: activeM === 3 ? 'default' : 'pointer', fontSize: 13, fontWeight: 600 }}>
                {activeM === 3 ? (es ? 'Fin del día' : 'End of day') : (es ? 'Siguiente' : 'Next')}
                {activeM < 3 && <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 3l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
