'use client'
import { useState } from 'react'

const FAQS = [
  {
    q: '¿Necesito cambiar mi PEO actual para ofrecer este beneficio?',
    a: 'No. SaludCompartida se integra con tu PEO existente vía API. G&A Partners, Paychex, ADP, Rippling y otros PEOs pueden conectar el beneficio sin cambiar nada en tu operación actual. El tiempo de integración típico es de 2 a 4 semanas.',
  },
  {
    q: '¿Los empleados usan los servicios directamente en EE.UU.?',
    a: 'No. El empleado en EE.UU. activa la suscripción para su familia en México. La familia es quien consulta al médico, descuenta en farmacias y habla con Lupita. El empleado recibe el beneficio como "salud para mi familia" — que es lo que más valora.',
  },
  {
    q: '¿Puedo ofrecer condiciones diferentes según el tipo de empleado?',
    a: 'Sí, completamente. El sistema de tiers permite configurar condiciones distintas para full-time, hourly, part-time y seasonal dentro de la misma póliza. Cada tier tiene su precio, modalidad de pago, servicios incluidos y período de carencia independientes.',
  },
  {
    q: '¿Cómo funciona la facturación mensual?',
    a: 'SaludCompartida genera automáticamente un invoice consolidado el día 1 de cada mes a tu PEO con todos los empleados activos. El PEO maneja los descuentos de nómina de los empleados que apliquen. Tú recibes un solo reporte de utilización — sin trabajo administrativo.',
  },
  {
    q: '¿Puedo ver si los empleados están usando el beneficio?',
    a: 'Sí. El dashboard de saludcompartida.ai muestra en tiempo real: consultas de telemedicina, transacciones en farmacia, sesiones de terapia y llamadas de Lupita. Todo filtrable por empresa, tipo de empleado y período.',
  },
  {
    q: '¿Qué pasa si un empleado deja de trabajar en mi empresa?',
    a: 'El certificado entra en un período de terminación de 30 días (ventana COBRA). La familia mantiene acceso a los servicios durante ese período. Al vencerse, el empleado puede continuar con una suscripción D2C directa si lo desea.',
  },
  {
    q: '¿Qué datos de los empleados necesitan para el enrollment?',
    a: 'El nombre, apellido, email y tipo de empleado — datos que tu PEO ya tiene. El enrollment via API toma milisegundos por empleado. Para el modelo CSV, usamos una plantilla de 5 columnas que el responsable de benefits llena en menos de 30 minutos.',
  },
]

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(null)

  return (
    <section id="faq" style={{ background: 'var(--surface)', padding: '96px 5%' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--clarity)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>
            Preguntas frecuentes
          </div>
          <h2 style={{ fontSize: 42 }}>¿Tienes dudas?</h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {FAQS.map(({ q, a }, i) => (
            <div
              key={i}
              style={{
                background: 'white',
                borderRadius: 12,
                border: openIdx === i ? '1px solid var(--clarity)' : '1px solid var(--border)',
                overflow: 'hidden',
                transition: 'border-color .2s',
              }}
            >
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '18px 22px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  gap: 16,
                }}
              >
                <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.4 }}>{q}</span>
                <div style={{
                  width: 24, height: 24, borderRadius: '50%',
                  background: openIdx === i ? 'var(--clarity)' : 'var(--surface)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, transition: 'background .2s',
                }}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                    style={{ transform: openIdx === i ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}>
                    <path d="M2 4l4 4 4-4" stroke={openIdx === i ? 'white' : 'var(--muted)'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </button>
              {openIdx === i && (
                <div style={{ padding: '0 22px 18px', borderTop: '1px solid var(--border)' }}>
                  <p style={{ fontSize: 14, color: 'var(--body)', lineHeight: 1.75, marginTop: 14 }}>{a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA below FAQ */}
        <div style={{ textAlign: 'center', marginTop: 56 }}>
          <p style={{ fontSize: 16, color: 'var(--muted)', marginBottom: 20 }}>
            ¿Listo para ofrecer este beneficio a tu equipo?
          </p>
          <a
            href="/dashboard"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'var(--trust)', color: 'white',
              padding: '14px 32px', borderRadius: 10,
              fontSize: 15, fontWeight: 600,
              transition: 'background .2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--clarity)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--trust)'}
          >
            Acceder al Portal
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
