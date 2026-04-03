const STEPS = [
  {
    n: '01',
    color: 'var(--trust)',
    bg: 'var(--trust-light)',
    title: 'Firmas la póliza grupal',
    desc: 'Tu empresa define con SaludCompartida los servicios incluidos, la modalidad de pago y los tipos de empleado elegibles. Se hace una vez, a través de tu PEO.',
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  },
  {
    n: '02',
    color: 'var(--clarity)',
    bg: 'var(--clarity-light)',
    title: 'El PEO envía los empleados',
    desc: 'Durante open enrollment, tu PEO conecta su sistema (PrismHR, Rippling, ADP) a nuestra API. Cada empleado que elige el beneficio se registra automáticamente — sin trabajo manual.',
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
  },
  {
    n: '03',
    color: 'var(--growth)',
    bg: 'var(--growth-light)',
    title: 'La familia en México se activa',
    desc: 'El empleado recibe su SC Employee ID y un enlace de activación. Con un clic, activa la cuenta de su mamá, papá o hijos en México. La familia empieza a usar los servicios ese mismo día.',
    icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
  },
  {
    n: '04',
    color: 'var(--action)',
    bg: 'var(--action-light)',
    title: 'Mides el impacto en tiempo real',
    desc: 'Tu dashboard muestra utilización, satisfacción, y ROI mensual. Una factura consolidada llega a tu PEO el día 1 de cada mes. Tú no tocas nada.',
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
  },
]

export default function HowItWorks() {
  return (
    <section id="como" style={{ background: 'var(--surface)', padding: '96px 5%' }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--clarity)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>
            Proceso simple
          </div>
          <h2 style={{ fontSize: 42, marginBottom: 16 }}>Cómo funciona</h2>
          <p style={{ fontSize: 17, color: 'var(--muted)', maxWidth: 520, margin: '0 auto' }}>
            Desde la firma hasta la familia activa — sin fricción, sin trabajo manual.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
          {STEPS.map(({ n, color, bg, title, desc, icon }) => (
            <div
              key={n}
              style={{
                background: 'white',
                borderRadius: 16,
                padding: 28,
                border: '1px solid var(--border)',
                position: 'relative',
                transition: 'transform .2s, box-shadow .2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.08)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'none'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {/* Step number */}
              <div style={{
                fontSize: 11, fontWeight: 700, color,
                letterSpacing: '0.1em', marginBottom: 18,
              }}>
                {n}
              </div>

              {/* Icon */}
              <div style={{
                width: 48, height: 48, background: bg, borderRadius: 12,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 18,
              }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d={icon}/>
                </svg>
              </div>

              <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--ink)', marginBottom: 10 }}>
                {title}
              </h3>
              <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.65 }}>
                {desc}
              </p>

              {/* Connector line */}
              {n !== '04' && (
                <div style={{
                  position: 'absolute', top: 52, right: -12, width: 24, height: 2,
                  background: 'var(--border)', zIndex: 1,
                }}/>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
