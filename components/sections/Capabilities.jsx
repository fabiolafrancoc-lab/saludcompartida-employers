'use client'
import { useState } from 'react'
import { useLang } from '@/contexts/LanguageContext'
import {
  IconTelemedicina, IconFarmacia, IconTerapia, IconLupita,
  IconApp, IconPortal, IconRemesa, IconTranquilidad,
} from '@/components/icons/SCIcons'

const NAVY_CARD  = '#162040'
const NAVY_INNER = '#1E2D4F'

// What's LIVE today vs what's coming — honesty builds trust
const STACK_LAYERS = (es) => [
  {
    layer: es ? 'Entrega de servicios' : 'Service Delivery',
    color: '#22D3EE',
    items: [
      {
        name: es ? 'Telemedicina 24/7' : 'Telemedicine 24/7',
        detail: es ? 'Integración directa con Nuevo Método — 20+ especialidades, receta electrónica, seguimiento post-consulta. Activo en México hoy.' : 'Direct integration with Nuevo Método — 20+ specialties, digital prescription, post-consultation follow-up. Live in Mexico today.',
        status: 'live',
      },
      {
        name: es ? 'Red farmacéutica' : 'Pharmacy network',
        detail: es ? '1,700+ farmacias afiliadas en México. Código QR generado desde saludcompartida.app. Descuento aplicado en tiempo real en el punto de venta.' : '1,700+ affiliated pharmacies in Mexico. QR code generated from saludcompartida.app. Discount applied in real time at point of sale.',
        status: 'live',
      },
      {
        name: es ? 'Terapia psicológica online' : 'Online therapy',
        detail: es ? 'Psicólogos certificados en México. Sesiones por video, chat o llamada. Agenda en minutos desde saludcompartida.app.' : 'Certified psychologists in Mexico. Sessions via video, chat, or call. Schedule in minutes from saludcompartida.app.',
        status: 'live',
      },
      {
        name: 'Lupita AI',
        detail: es ? 'Sistema de IA conversacional con ElevenLabs (síntesis de voz), Telnyx (número México), y 16 códigos conductuales propietarios. Llama proactivamente. Detecta crisis.' : 'Conversational AI system with ElevenLabs (voice synthesis), Telnyx (Mexico number), and 16 proprietary behavioral codes. Calls proactively. Detects crises.',
        status: 'live',
      },
    ],
  },
  {
    layer: es ? 'Plataforma e integraciones' : 'Platform & integrations',
    color: '#A78BFA',
    items: [
      {
        name: es ? 'App del empleado' : 'Employee app',
        detail: es ? 'saludcompartida.app — videollamadas 24/7, terapia, código QR de farmacia, acompañamiento Lupita. Mobile-first. Activo.' : 'saludcompartida.app — 24/7 video calls, therapy, pharmacy QR code, Lupita companionship. Mobile-first. Live.',
        status: 'live',
      },
      {
        name: es ? 'Portal del empleador' : 'Employer portal',
        detail: es ? 'saludcompartida.ai — gestión de pólizas, certificados por empleado, reportes de utilización, facturación automática mensual. Operando hoy.' : 'saludcompartida.ai — policy management, per-employee certificates, utilization reports, automatic monthly billing. Operating today.',
        status: 'live',
      },
      {
        name: es ? 'Enrollment API' : 'Enrollment API',
        detail: es ? 'Integración via API con PrismHR, Rippling y ADP. Setup: 2–4 semanas. Después: enrollment automático en tiempo real cada vez que un empleado selecciona el beneficio.' : 'API integration with PrismHR, Rippling, and ADP. Setup: 2–4 weeks. After: automatic real-time enrollment every time an employee selects the benefit.',
        status: 'live',
      },
      {
        name: es ? 'WhatsApp Business' : 'WhatsApp Business',
        detail: es ? 'WATI — notificaciones automáticas de activación, recordatorios de citas, comunicación con la familia en México en su canal nativo.' : 'WATI — automatic activation notifications, appointment reminders, communication with the family in Mexico on their native channel.',
        status: 'live',
      },
    ],
  },
  {
    layer: es ? 'Infraestructura y seguridad' : 'Infrastructure & security',
    color: '#34D399',
    items: [
      {
        name: es ? 'Arquitectura de datos 3 capas' : '3-layer data architecture',
        detail: es ? 'AWS S3 Glacier (cumplimiento legal, inmutable), Weaviate (insights globales anónimos, ML), Supabase (personalización individual). Row-Level Security en todas las tablas.' : 'AWS S3 Glacier (legal compliance, immutable), Weaviate (anonymous global insights, ML), Supabase (individual personalization). Row-Level Security on all tables.',
        status: 'live',
      },
      {
        name: es ? 'Facturación automática' : 'Automatic billing',
        detail: es ? 'Vercel Cron genera facturas consolidadas el día 1 de cada mes. Un solo invoice al PEO. Registro de utilización por empleado. Integración con Shopify B2B.' : 'Vercel Cron generates consolidated invoices on day 1 of each month. Single invoice to PEO. Per-employee utilization record. Shopify B2B integration.',
        status: 'live',
      },
      {
        name: es ? 'Monitoreo 24/7' : '24/7 monitoring',
        detail: es ? 'Sentry para debugging y alertas en tiempo real. Uptime monitoring activo. Logs estructurados por servicio. SLA: 99.5% uptime mensual garantizado.' : 'Sentry for debugging and real-time alerts. Active uptime monitoring. Structured logs per service. SLA: 99.5% monthly uptime guaranteed.',
        status: 'live',
      },
      {
        name: es ? 'Responsabilidad médica' : 'Medical liability',
        detail: es ? 'Nuevo Método cubre la responsabilidad médica y de terapeutas. SaludCompartida opera como distribuidor del beneficio — no como proveedor médico. Estructura legal confirmada.' : 'Nuevo Método covers medical and therapist liability. SaludCompartida operates as benefit distributor — not as medical provider. Legal structure confirmed.',
        status: 'live',
      },
    ],
  },
]

const PROOF_POINTS = (es) => [
  { n: '24', label: es ? 'suscriptores pagados activos hoy' : 'paying subscribers active today', color: '#22D3EE' },
  { n: '4', label: es ? 'servicios operando en paralelo' : 'services operating in parallel', color: '#34D399' },
  { n: '3', label: es ? 'capas de arquitectura de datos' : 'data architecture layers', color: '#A78BFA' },
  { n: '99.5%', label: es ? 'uptime mensual garantizado' : 'monthly uptime guaranteed', color: '#FCD34D' },
]

export default function Capabilities() {
  const { lang } = useLang()
  const es = lang === 'es'
  const [activeLayer, setActiveLayer] = useState(0)
  const layers = STACK_LAYERS(es)

  return (
    <div style={{ background: 'var(--white)', animation: 'fadeUp .35s ease' }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '40px 48px' }}>

        {/* Header */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 40, alignItems: 'start', marginBottom: 36 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--teal)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 10 }}>
              {es ? 'Capacidades operativas' : 'Operational capabilities'}
            </div>
            <h2 style={{ fontSize: 36, marginBottom: 14, color: 'var(--ink)', lineHeight: 1.15 }}>
              {es
                ? <>SaludCompartida no está<br /><span style={{ color: 'var(--teal)' }}>prometiendo. Está operando.</span></>
                : <>SaludCompartida is not<br /><span style={{ color: 'var(--teal)' }}>promising. It's operating.</span></>
              }
            </h2>
            <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.7, maxWidth: 560 }}>
              {es
                ? 'Cada servicio que ofrecemos tiene infraestructura técnica funcionando hoy. No estás contratando una promesa — estás conectando a tu fuerza laboral con una plataforma activa.'
                : 'Every service we offer has technical infrastructure running today. You are not contracting a promise — you are connecting your workforce to an active platform.'
              }
            </p>
          </div>

          {/* Live badge */}
          <div style={{ background: NAVY_CARD, borderRadius: 14, padding: '20px 24px', textAlign: 'center', flexShrink: 0, border: '1px solid rgba(52,211,153,0.3)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, justifyContent: 'center' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#34D399', display: 'inline-block', animation: 'pulse-dot 2s infinite' }}/>
              <span style={{ fontSize: 11, fontWeight: 800, color: '#34D399', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                {es ? 'Operando en producción' : 'Live in production'}
              </span>
            </div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>saludcompartida.app</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>saludcompartida.ai</div>
          </div>
        </div>

        {/* Proof strip */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 36 }}>
          {PROOF_POINTS(es).map(({ n, label, color }) => (
            <div key={n} style={{ background: NAVY_CARD, borderRadius: 12, padding: '16px 18px', border: `1px solid ${color}30` }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 36, color, fontWeight: 700, lineHeight: 1 }}>{n}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)', fontWeight: 700, marginTop: 6, lineHeight: 1.4 }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Layer tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          {layers.map((layer, i) => (
            <button key={i} onClick={() => setActiveLayer(i)} style={{
              padding: '9px 20px', borderRadius: 8,
              border: activeLayer === i ? `2px solid ${layer.color}` : '2px solid var(--border)',
              background: activeLayer === i ? NAVY_CARD : 'var(--white)',
              color: activeLayer === i ? 'white' : 'var(--muted)',
              fontSize: 13, fontWeight: activeLayer === i ? 800 : 500,
              cursor: 'pointer', transition: 'all .15s',
            }}>
              {activeLayer === i && <span style={{ display: 'inline-block', width: 7, height: 7, borderRadius: '50%', background: layer.color, marginRight: 7, verticalAlign: 'middle' }}/>}
              {layer.layer}
            </button>
          ))}
        </div>

        {/* Capability cards grid */}
        <div key={activeLayer} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, animation: 'fadeUp .2s ease', marginBottom: 28 }}>
          {layers[activeLayer].items.map((item, i) => (
            <div key={i} style={{
              background: NAVY_CARD, borderRadius: 14, padding: '20px 22px',
              border: `1px solid ${layers[activeLayer].color}25`,
              display: 'flex', gap: 14,
            }}>
              {/* Status dot */}
              <div style={{ paddingTop: 4, flexShrink: 0 }}>
                <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#34D399', boxShadow: '0 0 6px #34D39980' }}/>
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <span style={{ fontSize: 13, fontWeight: 800, color: 'white' }}>{item.name}</span>
                  <span style={{ fontSize: 9, fontWeight: 800, color: '#34D399', background: 'rgba(52,211,153,0.12)', padding: '2px 7px', borderRadius: 100, textTransform: 'uppercase', letterSpacing: '0.06em', flexShrink: 0 }}>
                    {es ? 'activo' : 'live'}
                  </span>
                </div>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)', fontWeight: 600, lineHeight: 1.65, margin: 0 }}>
                  {item.detail}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Integration logos strip */}
        <div style={{ background: NAVY_CARD, borderRadius: 14, padding: '20px 28px', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ fontSize: 10, fontWeight: 800, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 14 }}>
            {es ? 'Integrado con los sistemas de RRHH que ya usas' : 'Integrated with the HR systems you already use'}
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            {['PrismHR', 'Rippling', 'ADP', 'Shopify B2B', 'WhatsApp Business', 'Nuevo Método', 'ElevenLabs', 'Weaviate', 'AWS'].map(name => (
              <div key={name} style={{ background: NAVY_INNER, borderRadius: 7, padding: '7px 14px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.85)' }}>{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
