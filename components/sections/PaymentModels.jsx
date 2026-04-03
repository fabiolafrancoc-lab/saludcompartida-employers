const MODELS = [
  {
    color: 'var(--trust)',
    bg: 'var(--trust-light)',
    badge: 'Mayor impacto',
    title: 'Empresa paga 100%',
    price: '$18–22',
    period: '/empleado/mes',
    desc: 'La empresa cubre el costo total. El empleado recibe el beneficio sin descuento de nómina. Máximo valor percibido — ideal para reclutamiento y retención.',
    features: ['Cero impacto en el cheque del empleado', 'Máximo valor percibido', 'Deducible como gasto de nómina', 'Net 30 vía PEO'],
    featured: true,
  },
  {
    color: 'var(--clarity)',
    bg: 'var(--clarity-light)',
    badge: 'Más común',
    title: 'Pago compartido',
    price: 'X% / Y%',
    period: 'empresa / empleado',
    desc: 'Empresa subsidia un porcentaje, el resto se descuenta de nómina. Configurable por tipo de empleado: full-time, hourly, part-time, seasonal.',
    features: ['Configurable por tier de empleado', 'Pre-tax o after-tax', 'Biweekly o monthly', 'Flexibilidad total de porcentajes'],
    featured: false,
  },
  {
    color: 'var(--muted)',
    bg: 'var(--surface)',
    badge: 'Beneficio voluntario',
    title: 'Empleado paga',
    price: '$18–22',
    period: '/mes via nómina',
    desc: 'El empleado elige el beneficio y se descuenta de su nómina. La empresa actúa como administrador sin costo directo.',
    features: ['Cero costo para la empresa', 'Empleado elige voluntariamente', 'Descuento automático de nómina', 'Buen punto de entrada para pilotos'],
    featured: false,
  },
]

const EMPLOYEE_TYPES = [
  { type: 'Full-time',   icon: '◆', desc: 'Empresa paga 100%' },
  { type: 'Part-time',   icon: '◈', desc: 'Split configurable' },
  { type: 'Hourly',      icon: '◇', desc: 'Split + mín. horas' },
  { type: 'Seasonal',    icon: '◉', desc: 'Configurable' },
  { type: 'Temporary',   icon: '○', desc: 'Por duración' },
]

export default function PaymentModels() {
  return (
    <section id="modalidades" style={{ background: 'var(--surface)', padding: '96px 5%' }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--clarity)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>
            Flexible para cada empresa
          </div>
          <h2 style={{ fontSize: 42, marginBottom: 16 }}>Modalidades de pago</h2>
          <p style={{ fontSize: 17, color: 'var(--muted)', maxWidth: 560, margin: '0 auto' }}>
            Cada empresa configura quién paga, cuánto, cómo y con qué frecuencia — por tipo de empleado.
          </p>
        </div>

        {/* Plans */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginBottom: 56 }}>
          {MODELS.map(({ color, bg, badge, title, price, period, desc, features, featured }) => (
            <div
              key={title}
              style={{
                background: 'white',
                borderRadius: 16,
                padding: 32,
                border: featured ? `2px solid ${color}` : '1px solid var(--border)',
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
              {/* Top accent */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: color, borderRadius: '16px 16px 0 0' }}/>

              <div style={{
                display: 'inline-block',
                background: bg, color,
                fontSize: 11, fontWeight: 600,
                padding: '3px 10px', borderRadius: 100,
                marginBottom: 16, marginTop: 8,
              }}>
                {badge}
              </div>

              <h3 style={{ fontSize: 20, color: 'var(--ink)', marginBottom: 12 }}>{title}</h3>

              <div style={{ marginBottom: 16 }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 34, color }}>{price}</span>
                <span style={{ fontSize: 13, color: 'var(--muted)', marginLeft: 4 }}>{period}</span>
              </div>

              <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.65, marginBottom: 20 }}>{desc}</p>

              {features.map(f => (
                <div key={f} style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'center' }}>
                  <div style={{ width: 16, height: 16, borderRadius: '50%', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                      <path d="M1 3l1.8 2L7 1" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span style={{ fontSize: 13, color: 'var(--body)' }}>{f}</span>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Employee types strip */}
        <div style={{ background: 'white', borderRadius: 16, padding: '24px 32px', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginRight: 8 }}>Tipos de empleado:</span>
          {EMPLOYEE_TYPES.map(({ type, icon, desc }) => (
            <div key={type} style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: 'var(--surface)', borderRadius: 8,
              padding: '6px 12px', border: '1px solid var(--border)',
            }}>
              <span style={{ fontSize: 12, color: 'var(--clarity)' }}>{icon}</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink)' }}>{type}</span>
              <span style={{ fontSize: 11, color: 'var(--muted)' }}>— {desc}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
