'use client'
import { useLang } from '@/contexts/LanguageContext'

export default function TheProblem() {
  const { lang } = useLang()
  const es = lang === 'es'

  return (
    <div style={{ background: 'var(--white)', animation: 'fadeUp .35s ease' }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '72px 48px' }}>

        {/* Section header */}
        <div style={{ maxWidth: 640, marginBottom: 56 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--loss)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12 }}>
            {es ? 'El problema que nadie ve' : 'The problem nobody sees'}
          </div>
          <h2 style={{ fontSize: 42, marginBottom: 20, lineHeight: 1.15 }}>
            {es
              ? <>Cada remesa llega con<br/><span style={{ color: 'var(--loss)', fontStyle: 'italic' }}>una ansiedad invisible</span></>
              : <>Every remittance arrives with<br/><span style={{ color: 'var(--loss)', fontStyle: 'italic' }}>invisible anxiety</span></>
            }
          </h2>
          <p style={{ fontSize: 17, color: 'var(--muted)', lineHeight: 1.75 }}>
            {es
              ? 'Para el migrante en los Estados Unidos, cada remesa llega con una pregunta que no desaparece. Y esa pregunta afecta directamente su desempeño en tu empresa.'
              : 'For the migrant in the United States, every remittance arrives with a question that never goes away. And that question directly affects their performance at your company.'
            }
          </p>
        </div>

        {/* The human story — emotional hook */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, marginBottom: 64, alignItems: 'start' }}>

          {/* The fear — in the employee's voice */}
          <div>
            <div style={{
              background: 'var(--amber-light)',
              borderLeft: '4px solid var(--amber)',
              borderRadius: '0 12px 12px 0',
              padding: '24px 28px',
              marginBottom: 28,
            }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--amber)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 }}>
                {es ? 'Lo que piensa tu empleado mientras trabaja' : 'What your employee is thinking while they work'}
              </div>
              {[
                es ? '"¿Tendrá mamá para su medicina de la diabetes este mes?"' : '"Will mom have enough for her diabetes medication this month?"',
                es ? '"¿Y si papá necesita al cardiólogo y no tengo el dinero?"' : '"What if dad needs a cardiologist and I don\'t have the money?"',
                es ? '"¿Y si mi hija se enferma y ya no queda nada en la remesa?"' : '"What if my daughter gets sick and there\'s nothing left in the remittance?"',
              ].map((quote, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, marginBottom: i < 2 ? 14 : 0, alignItems: 'flex-start' }}>
                  <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--amber)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><circle cx="5" cy="5" r="3" fill="white"/></svg>
                  </div>
                  <p style={{ fontSize: 14, color: 'var(--ink)', fontStyle: 'italic', lineHeight: 1.6 }}>{quote}</p>
                </div>
              ))}
            </div>

            <p style={{ fontSize: 15, color: 'var(--body)', lineHeight: 1.8, marginBottom: 20 }}>
              {es
                ? 'Ese miedo constante — ese riesgo financiero mensual — cuesta más que dinero. Cuesta sueño. Cuesta concentración en el trabajo. Cuesta la capacidad de construir una vida en un país nuevo mientras se cuida a seres queridos a miles de kilómetros.'
                : 'That constant fear — that monthly financial risk — costs more than money. It costs sleep. It costs focus at work. It costs the ability to build a new life while caring for loved ones thousands of miles away.'
              }
            </p>

            <p style={{ fontSize: 15, color: 'var(--body)', lineHeight: 1.8, fontWeight: 500 }}>
              {es
                ? 'Un empleado con la mente en México no puede estar con la mente en su trabajo. Y eso es un problema real para tu operación.'
                : 'An employee with their mind in Mexico cannot have their mind on their work. And that is a real problem for your operation.'
              }
            </p>
          </div>

          {/* The financial exposure — for Risk Manager */}
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--navy)', marginBottom: 20 }}>
              {es ? 'La exposición financiera real del empleado' : 'The employee\'s real financial exposure'}
            </div>

            {[
              {
                icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
                color: 'var(--loss)',
                bg: 'var(--loss-light)',
                title: es ? 'Una hospitalización lo destruye todo' : 'One hospitalization destroys everything',
                desc: es
                  ? 'Una hospitalización en México cuesta entre $2,000 y $8,000 USD de bolsillo. Para el empleado promedio, eso equivale a 1–4 meses de remesas. Si ocurre, la familia llama pidiendo dinero y el empleado entra en crisis financiera y emocional.'
                  : 'A hospitalization in Mexico costs $2,000–$8,000 USD out of pocket. For the average employee, that\'s 1–4 months of remittances. When it happens, the family calls asking for money and the employee enters financial and emotional crisis.',
                stat: '$2K–8K', statLabel: es ? 'costo promedio hospitalización' : 'avg. hospitalization cost',
              },
              {
                icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z',
                color: 'var(--amber)',
                bg: 'var(--amber-light)',
                title: es ? 'El gasto en farmacia es mensual y creciente' : 'Pharmacy spend is monthly and growing',
                desc: es
                  ? 'Las familias mexicanas gastan un promedio de $400–800 USD al año en medicamentos crónicos — diabetes, hipertensión, artritis. Sin descuento, ese dinero sale directamente de las remesas del empleado cada mes.'
                  : 'Mexican families spend an average of $400–800 USD per year on chronic medications — diabetes, hypertension, arthritis. Without discounts, that money comes directly from the employee\'s remittances every month.',
                stat: '$800', statLabel: es ? 'gasto anual promedio farmacia/familia' : 'avg. annual pharmacy spend/family',
              },
              {
                icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
                color: 'var(--emerald)',
                bg: 'var(--emerald-light)',
                title: es ? 'Sin seguro, sin red de protección' : 'No insurance, no safety net',
                desc: es
                  ? 'El 54% de las familias en México no tiene seguro de salud efectivo desde la eliminación del Seguro Popular. El empleado latino es literalmente el sistema de salud de su familia — y esa responsabilidad pesa en cada turno de trabajo.'
                  : '54% of families in Mexico have no effective health insurance since Seguro Popular was eliminated. The Latino employee is literally their family\'s healthcare system — and that responsibility weighs on every work shift.',
                stat: '54%', statLabel: es ? 'familias en México sin seguro' : 'families in Mexico without insurance',
              },
            ].map(({ icon, color, bg, title, desc, stat, statLabel }) => (
              <div key={title} style={{ background: bg, borderRadius: 12, padding: '18px 20px', marginBottom: 14, display: 'flex', gap: 14 }}>
                <div style={{ flexShrink: 0 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 6 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d={icon}/>
                    </svg>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, color, lineHeight: 1 }}>{stat}</div>
                    <div style={{ fontSize: 9, color, opacity: 0.7, lineHeight: 1.3, maxWidth: 56 }}>{statLabel}</div>
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 6 }}>{title}</div>
                  <p style={{ fontSize: 12, color: 'var(--body)', lineHeight: 1.65 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bridge to solution */}
        <div style={{ background: 'var(--navy)', borderRadius: 20, padding: '40px 48px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--teal)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>
              {es ? 'La solución' : 'The solution'}
            </div>
            <h3 style={{ fontSize: 30, color: 'white', marginBottom: 16, fontFamily: 'var(--font-display)', lineHeight: 1.2 }}>
              {es
                ? 'SaludCompartida elimina esa carga. No solo proveemos servicios de salud — proveemos certeza.'
                : 'SaludCompartida eliminates that burden. We don\'t just provide healthcare — we provide certainty.'
              }
            </h3>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)', lineHeight: 1.8 }}>
              {es
                ? 'Proveemos dignidad. Proveemos la tranquilidad de saber que tu familia tiene acceso a atención de calidad, pase lo que pase. Y cuando el empleado sabe eso — trabaja diferente.'
                : 'We provide dignity. We provide the peace of mind that comes from knowing your family has access to quality care, no matter what. And when the employee knows that — they work differently.'
              }
            </p>
          </div>

          {/* Two core benefits for the employee */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              {
                icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
                color: 'var(--teal)',
                title: es ? 'Tranquilidad emocional' : 'Emotional tranquility',
                desc: es
                  ? 'El empleado llega a trabajar sabiendo que si mamá se enferma hoy, tiene médico disponible. Esa certeza cambia su estado mental y su presencia.'
                  : 'The employee comes to work knowing that if mom gets sick today, there\'s a doctor available. That certainty changes their mental state and their presence.',
              },
              {
                icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
                color: 'var(--emerald)',
                title: es ? 'Protección financiera real' : 'Real financial protection',
                desc: es
                  ? 'Limita su exposición financiera con su familia en México. Una consulta que antes costaba $80 ahora es gratis. Un medicamento que costaba $120 al mes ahora cuesta $40. La remesa ya no se va en emergencias.'
                  : 'Limits their financial exposure with their family in Mexico. A consultation that cost $80 is now free. A medication that cost $120/month now costs $40. The remittance no longer goes to emergencies.',
              },
            ].map(({ icon, color, title, desc }) => (
              <div key={title} style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 12, padding: '18px 20px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d={icon}/>
                    </svg>
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 600, color: 'white' }}>{title}</span>
                </div>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 1.65 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
