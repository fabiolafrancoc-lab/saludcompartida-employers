'use client'
import Image from 'next/image'
import { useLang } from '@/contexts/LanguageContext'

export default function TheProblem() {
  const { lang } = useLang()
  const es = lang === 'es'

  return (
    <div style={{ background: 'var(--white)', animation: 'fadeUp .35s ease' }}>

      {/* ── HERO VISUAL: La familia que se queda ── */}
      <div style={{ position: 'relative', height: 260, overflow: 'hidden', flexShrink: 0 }}>
        <Image
          src="/abuelanietas.jpeg"
          alt={es ? 'Abuela, mamá e hija — la familia en México que se queda' : 'Grandmother, mother and daughter — the family left behind in Mexico'}
          fill
          style={{ objectFit: 'cover', objectPosition: 'center 30%' }}
          sizes="100vw"
          priority
        />
        {/* Dark gradient bottom */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(15,52,96,0.85) 100%)',
        }}/>
        {/* Content over photo */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: '40px 48px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
          maxWidth: 'var(--max-w)', margin: '0 auto',
        }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 10 }}>
              {es ? 'El problema que nadie ve' : 'The problem nobody sees'}
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 46, color: 'white', lineHeight: 1.1, margin: 0, maxWidth: 560 }}>
              {es
                ? <>Ellas se quedaron.<br/><em style={{ fontStyle: 'italic', color: '#9DCDD0' }}>¿Quién las cuida?</em></>
                : <>They stayed behind.<br/><em style={{ fontStyle: 'italic', color: '#9DCDD0' }}>Who takes care of them?</em></>
              }
            </h2>
          </div>
          {/* Stat pill */}
          <div style={{
            background: 'rgba(255,255,255,0.12)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: 14, padding: '16px 22px',
            textAlign: 'right', flexShrink: 0,
          }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 36, color: '#9DCDD0', lineHeight: 1 }}>54%</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 4, lineHeight: 1.4 }}>
              {es ? 'familias en México\nsin seguro médico' : 'families in Mexico\nwithout health insurance'}
            </div>
          </div>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '24px 48px 32px' }}>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'start' }}>

          {/* LEFT — the employee's voice */}
          <div>
            <div style={{
              background: 'var(--amber-light)',
              borderLeft: '4px solid var(--amber)',
              borderRadius: '0 12px 12px 0',
              padding: '22px 24px', marginBottom: 28,
            }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--amber)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
                {es ? 'Lo que piensa tu empleado en cada turno' : 'What your employee thinks every shift'}
              </div>
              {[
                es ? '"¿Tendrá mamá para su medicina de la diabetes este mes?"' : '"Will mom have enough for her diabetes medication this month?"',
                es ? '"¿Y si papá necesita al cardiólogo y no tenemos el dinero?"' : '"What if dad needs a cardiologist and we don\'t have the money?"',
                es ? '"¿Y si mi hija se enferma y ya no queda nada en la remesa?"' : '"What if my daughter gets sick and there\'s nothing left in the remittance?"',
              ].map((q, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, marginBottom: i < 2 ? 12 : 0, alignItems: 'flex-start' }}>
                  <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--amber)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                    <span style={{ fontSize: 10, color: 'white', fontWeight: 700 }}>{i+1}</span>
                  </div>
                  <p style={{ fontSize: 14, color: 'var(--ink)', fontStyle: 'italic', lineHeight: 1.6, margin: 0 }}>{q}</p>
                </div>
              ))}
            </div>

            <p style={{ fontSize: 15, color: 'var(--body)', lineHeight: 1.8, marginBottom: 16 }}>
              {es
                ? 'Ese miedo constante viaja con él en cada turno. No lo puede dejar en casa porque no tiene a nadie que lo resuelva. La remesa puede cubrir la emergencia — pero primero tiene que ocurrir la emergencia.'
                : 'That constant fear travels with them every shift. They can\'t leave it at home because there\'s no one to solve it. The remittance can cover the emergency — but first the emergency has to happen.'
              }
            </p>

            <p style={{ fontSize: 15, color: 'var(--body)', lineHeight: 1.8, fontWeight: 600 }}>
              {es
                ? 'Un empleado que carga ese peso no puede estar presente. Y esa ausencia mental sí tiene un costo para tu empresa.'
                : 'An employee carrying that weight cannot be present. And that mental absence does have a cost for your company.'
              }
            </p>
          </div>

          {/* RIGHT — financial exposure */}
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--navy)', marginBottom: 20 }}>
              {es ? 'La exposición financiera real de su familia' : 'Their family\'s real financial exposure'}
            </div>

            {[
              {
                icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
                color: 'var(--loss)', bg: 'var(--loss-light)',
                stat: '$2K–8K',
                title: es ? 'Una hospitalización lo destruye todo' : 'One hospitalization destroys everything',
                desc: es ? 'El costo de una hospitalización en México de bolsillo. Para el empleado promedio, es 1 a 4 meses de remesas enviadas de una sola vez.' : 'Out-of-pocket hospitalization cost in Mexico. For the average employee, that\'s 1 to 4 months of remittances sent all at once.',
              },
              {
                icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
                color: 'var(--amber)', bg: 'var(--amber-light)',
                stat: '+44%',
                title: es ? 'Gastan 44% más en salud que otras familias' : 'They spend 44% more on health than other families',
                desc: es ? 'Las familias que reciben remesas usan medicina privada porque el sistema público presenta horas de espera. Ese 44% sale directamente de la remesa.' : 'Remittance-receiving families use private medicine because the public system has hours-long waits. That 44% comes directly from the remittance.',
              },
              {
                icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
                color: 'var(--navy)', bg: 'var(--navy-light)',
                stat: '75%',
                title: es ? 'Adultos mayores solos experimentan soledad severa' : 'Seniors alone experience severe loneliness',
                desc: es ? 'La persona que se queda — los padres, la esposa — necesita más que medicina. La soledad mata tanto como 15 cigarrillos al día (Holt-Lunstad, APA).' : 'The person who stays behind — the parents, the wife — needs more than medicine. Loneliness kills as much as 15 cigarettes a day (Holt-Lunstad, APA).',
              },
            ].map(({ icon, color, bg, stat, title, desc }) => (
              <div key={stat} style={{ background: bg, borderRadius: 12, padding: '16px 18px', marginBottom: 12, display: 'flex', gap: 14 }}>
                <div style={{ flexShrink: 0, textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, color, lineHeight: 1 }}>{stat}</div>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '6px auto 0' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d={icon}/>
                    </svg>
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 5 }}>{title}</div>
                  <p style={{ fontSize: 12, color: 'var(--body)', lineHeight: 1.6, margin: 0 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bridge */}
        <div style={{ marginTop: 48, background: 'var(--navy)', borderRadius: 20, padding: '40px 48px', color: 'white', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }} className="on-dark">
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--teal)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>
              {es ? 'La solución' : 'The solution'}
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'white', marginBottom: 14, lineHeight: 1.2 }}>
              {es ? 'SaludCompartida les da certeza. No solo cobertura.' : 'SaludCompartida gives them certainty. Not just coverage.'}
            </h3>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 1.8 }}>
              {es
                ? 'Cuando el empleado sabe que su mamá tiene médico, que los medicamentos tienen descuento, que Lupita la llama cada mañana — llega a trabajar distinto. Más presente. Más leal.'
                : 'When the employee knows their mom has a doctor, medications have discounts, Lupita calls every morning — they come to work differently. More present. More loyal.'
              }
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { color: '#9DCDD0', text: es ? 'Tranquilidad emocional — sabe que su familia tiene a alguien' : 'Emotional peace — knowing their family has someone' },
              { color: '#6EE7B7', text: es ? 'Protección financiera — la remesa ya no se va en emergencias' : 'Financial protection — remittances no longer go to emergencies' },
              { color: '#FCD34D', text: es ? 'Presencia en el trabajo — sin la mente en México' : 'Presence at work — mind no longer in Mexico' },
            ].map(({ color, text }) => (
              <div key={text} style={{ display: 'flex', gap: 10, alignItems: 'center', background: 'rgba(255,255,255,0.06)', borderRadius: 10, padding: '12px 16px' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: color, flexShrink: 0 }}/>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', lineHeight: 1.5 }}>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
