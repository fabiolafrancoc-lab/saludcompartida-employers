'use client'
import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'

const NAVY      = '#0F3460'
const NAVY_CARD = '#162040'
const NAVY_IN   = '#1E2D4F'
const GREEN     = '#006847'

const COMPANY = 'PEO Ejemplo'

/* ─── BILINGUAL DATA ─────────────────────────────────────────── */
const MONTHS_ES = ['Enero', 'Febrero', 'Marzo', 'Abril']
const MONTHS_EN = ['January', 'February', 'March', 'April']

const MONTHLY_DATA_ES = [
  { mes: 'Ene', empleados: 74, consultas: 89, ahorro: 5420 },
  { mes: 'Feb', empleados: 79, consultas: 101, ahorro: 6180 },
  { mes: 'Mar', empleados: 82, consultas: 118, ahorro: 7230 },
  { mes: 'Abr', empleados: 84, consultas: 127, ahorro: 7812 },
]
const MONTHLY_DATA_EN = [
  { mes: 'Jan', empleados: 74, consultas: 89, ahorro: 5420 },
  { mes: 'Feb', empleados: 79, consultas: 101, ahorro: 6180 },
  { mes: 'Mar', empleados: 82, consultas: 118, ahorro: 7230 },
  { mes: 'Apr', empleados: 84, consultas: 127, ahorro: 7812 },
]

const EMPLOYEES_ES = [
  { name: 'Carlos Henríquez',   job: 'Operador de maquinaria',    since: 'Mar 1',  last: 'Hoy 7:02am',   uses: ['med', 'farm', 'lup'], status: 'active' },
  { name: 'Rosa Martínez',      job: 'Técnica de limpieza',       since: 'Mar 1',  last: 'Ayer',         uses: ['farm', 'ter'],        status: 'active' },
  { name: 'Javier Solís',       job: 'Asistente de almacén',      since: 'Mar 15', last: 'Hace 3 días',  uses: ['med', 'lup'],         status: 'active' },
  { name: 'Miguel Ángel Pérez', job: 'Supervisor de línea',       since: 'Mar 1',  last: 'Hace 1 sem',   uses: ['med'],                status: 'active' },
  { name: 'Andrés Fuentes',     job: 'Conductor',                 since: 'Abr 1',  last: 'Hace 2 sem',   uses: [],                     status: 'low' },
  { name: 'Lucía Vargas',       job: 'Recepcionista',             since: 'Mar 1',  last: 'Nunca',        uses: [],                     status: 'inactive' },
  { name: 'Omar Castillo',      job: 'Técnico electricista',      since: 'Abr 1',  last: 'Nunca',        uses: [],                     status: 'inactive' },
  { name: 'Patricia Ruiz',      job: 'Asistente administrativa',  since: 'Mar 1',  last: 'Hace 5 días',  uses: ['ter', 'lup'],         status: 'active' },
]
const EMPLOYEES_EN = [
  { name: 'Carlos Henríquez',   job: 'Machinery Operator',        since: 'Mar 1',  last: 'Today 7:02am', uses: ['med', 'farm', 'lup'], status: 'active' },
  { name: 'Rosa Martínez',      job: 'Cleaning Technician',       since: 'Mar 1',  last: 'Yesterday',    uses: ['farm', 'ter'],        status: 'active' },
  { name: 'Javier Solís',       job: 'Warehouse Assistant',       since: 'Mar 15', last: '3 days ago',   uses: ['med', 'lup'],         status: 'active' },
  { name: 'Miguel Ángel Pérez', job: 'Line Supervisor',           since: 'Mar 1',  last: '1 week ago',   uses: ['med'],                status: 'active' },
  { name: 'Andrés Fuentes',     job: 'Driver',                    since: 'Apr 1',  last: '2 weeks ago',  uses: [],                     status: 'low' },
  { name: 'Lucía Vargas',       job: 'Receptionist',              since: 'Mar 1',  last: 'Never',        uses: [],                     status: 'inactive' },
  { name: 'Omar Castillo',      job: 'Electrical Technician',     since: 'Apr 1',  last: 'Never',        uses: [],                     status: 'inactive' },
  { name: 'Patricia Ruiz',      job: 'Administrative Assistant',  since: 'Mar 1',  last: '5 days ago',   uses: ['ter', 'lup'],         status: 'active' },
]

const SERVICE_STATS = (es: boolean) => [
  { id: 'med',  label: es ? 'Videollamada con Doctor' : 'Video Call with Doctor', pct: 68, uses: 57, color: '#22D3EE', path: 'M9 12h6M9 16h6M9 8h2m4 0h-1M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z' },
  { id: 'farm', label: es ? 'Descuento en Farmacia'  : 'Pharmacy Discount',      pct: 84, uses: 71, color: '#FCD34D', path: 'M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2v-4M9 21H5a2 2 0 01-2-2v-4m0 0h18' },
  { id: 'ter',  label: es ? 'Terapia'                : 'Therapy',                pct: 31, uses: 26, color: '#A78BFA', path: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
  { id: 'lup',  label: 'Lupita AI',                                               pct: 72, uses: 61, color: '#34D399', path: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' },
]

const STATUS_TAG = (es: boolean) => ({
  active:   { label: es ? 'Activo'          : 'Active',       bg: 'rgba(52,211,153,0.15)',  color: '#34D399', dot: '#34D399' },
  low:      { label: es ? 'Baja actividad'  : 'Low activity', bg: 'rgba(252,211,77,0.15)',  color: '#FCD34D', dot: '#FCD34D' },
  inactive: { label: es ? 'Sin activar'     : 'Not activated',bg: 'rgba(248,113,113,0.15)', color: '#F87171', dot: '#F87171' },
})

const SVC_BADGE = (es: boolean): Record<string, {label:string, color:string}> => ({
  med:  { label: es ? 'Médico'   : 'Doctor',   color: '#22D3EE' },
  farm: { label: es ? 'Farmacia' : 'Pharmacy', color: '#FCD34D' },
  ter:  { label: es ? 'Terapia'  : 'Therapy',  color: '#A78BFA' },
  lup:  { label: 'Lupita',                     color: '#34D399' },
})

const axisStyle = { fontSize: 11, fill: 'rgba(255,255,255,0.6)', fontWeight: 700 }

const DarkTip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: NAVY_IN, border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8, padding: '8px 14px' }}>
      {payload.map((p: any, i: number) => (
        <div key={i} style={{ fontSize: 12, color: p.color, fontWeight: 700 }}>{p.name}: <strong>{p.value}</strong></div>
      ))}
    </div>
  )
}

export default function DemoDashboard() {
  const [lang, setLang] = useState<'es'|'en'>('es')

  // Persist language choice — survives re-renders
  useEffect(() => {
    const saved = localStorage.getItem('demo-lang') as 'es'|'en' | null
    if (saved === 'en') setLang('en')
  }, [])

  const handleLangChange = (l: 'es'|'en') => {
    setLang(l)
    localStorage.setItem('demo-lang', l)
  }
  const [monthIdx, setMonthIdx]   = useState(3)
  const [activeTab, setActiveTab] = useState<'overview'|'employees'|'invoice'>('overview')
  const [searchQ, setSearchQ]     = useState('')

  const es         = lang === 'es'
  const MONTHS     = es ? MONTHS_ES     : MONTHS_EN
  const MONTHLY    = es ? MONTHLY_DATA_ES : MONTHLY_DATA_EN
  const EMPLOYEES  = es ? EMPLOYEES_ES  : EMPLOYEES_EN
  const svcStats   = SERVICE_STATS(es)
  const statusTag  = STATUS_TAG(es)
  const svcBadge   = SVC_BADGE(es)

  const d          = MONTHLY[monthIdx]
  const invoiceAmt = (84 * 18).toFixed(2)
  const filtered   = EMPLOYEES.filter(e => e.name.toLowerCase().includes(searchQ.toLowerCase()))
  const inactive   = EMPLOYEES.filter(e => e.status === 'inactive').length

  const t = (esText: string, enText: string) => es ? esText : enText

  return (
    <div style={{ minHeight: '100vh', background: '#0A0F1E', fontFamily: 'var(--font-body, Inter, sans-serif)', color: 'white' }}>

      {/* ── TOP BAR ── */}
      <div style={{ background: NAVY_CARD, borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '0 32px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: 7, background: GREEN, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
              </svg>
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 800, color: 'white', lineHeight: 1 }}>SaludCompartida</div>
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>for employers</div>
            </div>
          </div>
          <div style={{ width: 1, height: 28, background: 'rgba(255,255,255,0.1)' }}/>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'white' }}>{COMPANY}</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>PEO · United States</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* Demo badge */}
          <div style={{ background: 'rgba(252,211,77,0.15)', border: '1px solid rgba(252,211,77,0.3)', borderRadius: 100, padding: '4px 12px', display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#FCD34D' }}/>
            <span style={{ fontSize: 10, fontWeight: 800, color: '#FCD34D', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {t('Vista Demo', 'Demo View')}
            </span>
          </div>

          {/* Month selector */}
          <div style={{ display: 'flex', gap: 4 }}>
            {MONTHS.map((m, i) => (
              <button key={i} onClick={() => setMonthIdx(i)} style={{
                padding: '5px 12px', borderRadius: 6, border: 'none',
                background: monthIdx === i ? 'rgba(34,211,238,0.2)' : 'transparent',
                color: monthIdx === i ? '#22D3EE' : 'rgba(255,255,255,0.4)',
                fontSize: 11, fontWeight: monthIdx === i ? 800 : 600, cursor: 'pointer',
              }}>{m}</button>
            ))}
          </div>

          {/* Language toggle */}
          <div style={{ display: 'flex', gap: 2, background: 'rgba(255,255,255,0.06)', borderRadius: 8, padding: 3 }}>
            {(['es','en'] as const).map(l => (
              <button key={l} onClick={() => handleLangChange(l)} style={{
                padding: '4px 12px', borderRadius: 6, border: 'none',
                background: lang === l ? 'rgba(255,255,255,0.15)' : 'transparent',
                color: lang === l ? 'white' : 'rgba(255,255,255,0.4)',
                fontSize: 11, fontWeight: lang === l ? 800 : 600, cursor: 'pointer',
                textTransform: 'uppercase',
              }}>{l}</button>
            ))}
          </div>

          {/* Back link */}
          <a href="/" style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 3L5 7l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            {t('Volver al portal', 'Back to portal')}
          </a>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '28px 32px' }}>

        {/* ── KPI STRIP ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 24 }}>
          {[
            { n: `${d.empleados}`,              sub: t('empleados con beneficio activo', 'employees with active benefit'), color: '#22D3EE', src: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8m13 2l-3 3-1.5-1.5' },
            { n: `${d.consultas}`,               sub: t('servicios utilizados este mes', 'services used this month'),      color: '#34D399', src: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
            { n: `$${d.ahorro.toLocaleString()}`, sub: t('ahorro generado en farmacia',   'pharmacy savings generated'),     color: '#FCD34D', src: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
            { n: `$${invoiceAmt}`,               sub: t('invoice del mes · un solo pago', 'monthly invoice · one payment'),  color: '#A78BFA', src: 'M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z' },
          ].map(({ n, sub, color, src }) => (
            <div key={n} style={{ background: NAVY_CARD, borderRadius: 14, padding: '18px 20px', border: `1px solid ${color}20` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <div style={{ fontFamily: 'Georgia, serif', fontSize: 36, color, fontWeight: 700, lineHeight: 1 }}>{n}</div>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={src}/></svg>
                </div>
              </div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', fontWeight: 700, lineHeight: 1.4 }}>{sub}</div>
            </div>
          ))}
        </div>

        {/* ── ALERT ── */}
        {inactive > 0 && (
          <div style={{ background: 'rgba(252,211,77,0.08)', border: '1px solid rgba(252,211,77,0.25)', borderRadius: 12, padding: '12px 18px', marginBottom: 20, display: 'flex', gap: 10, alignItems: 'center' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FCD34D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
            </svg>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'white' }}>
              {inactive} {t('empleados no han activado el beneficio todavía.', 'employees have not activated the benefit yet.')}
              <span style={{ color: '#FCD34D', marginLeft: 6, cursor: 'pointer' }} onClick={() => setActiveTab('employees')}>
                {t('SaludCompartida activa una campaña de reactivación automáticamente.', 'SaludCompartida activates a reactivation campaign automatically.')}
              </span>
            </div>
          </div>
        )}

        {/* ── TABS ── */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 22 }}>
          {([
            ['overview',  t('Resumen',     'Overview')],
            ['employees', t('Empleados',   'Employees')],
            ['invoice',   t('Facturación', 'Billing')],
          ] as const).map(([id, label]) => (
            <button key={id} onClick={() => setActiveTab(id)} style={{
              padding: '8px 20px', borderRadius: 8,
              border: activeTab === id ? '2px solid rgba(255,255,255,0.3)' : '2px solid rgba(255,255,255,0.08)',
              background: activeTab === id ? NAVY_CARD : 'transparent',
              color: activeTab === id ? 'white' : 'rgba(255,255,255,0.4)',
              fontSize: 13, fontWeight: activeTab === id ? 800 : 500, cursor: 'pointer', transition: 'all .15s',
            }}>{label}</button>
          ))}
        </div>

        {/* ══ OVERVIEW ══ */}
        {activeTab === 'overview' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, animation: 'fadeIn .2s ease' }}>

            <div style={{ background: NAVY_CARD, borderRadius: 16, padding: '22px 24px', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: 'white', marginBottom: 4 }}>{t('Utilización por servicio', 'Utilization by service')}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', fontWeight: 700, marginBottom: 20 }}>
                {t(`% de los ${d.empleados} empleados elegibles`, `% of ${d.empleados} eligible employees`)}
              </div>
              {svcStats.map(({ label, pct, uses, color, path }) => (
                <div key={label} style={{ marginBottom: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={path}/></svg>
                      <span style={{ fontSize: 12, color: 'white', fontWeight: 700 }}>{label}</span>
                    </div>
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                      <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>{uses} {t('empleados', 'employees')}</span>
                      <span style={{ fontSize: 13, color, fontWeight: 800, width: 34, textAlign: 'right' }}>{pct}%</span>
                    </div>
                  </div>
                  <div style={{ height: 7, background: 'rgba(255,255,255,0.07)', borderRadius: 4, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: 4 }}/>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: NAVY_CARD, borderRadius: 16, padding: '22px 24px', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: 'white', marginBottom: 4 }}>{t('Tendencia mensual', 'Monthly trend')}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', fontWeight: 700, marginBottom: 16 }}>
                {t('Servicios utilizados y empleados activos', 'Services used and active employees')}
              </div>
              <ResponsiveContainer width="100%" height={190}>
                <LineChart data={MONTHLY}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="mes" tick={axisStyle} axisLine={false} tickLine={false}/>
                  <YAxis tick={axisStyle} axisLine={false} tickLine={false}/>
                  <Tooltip content={<DarkTip/>}/>
                  <Line type="monotone" dataKey="consultas" name={t('Servicios', 'Services')} stroke="#22D3EE" strokeWidth={2.5} dot={{ fill: '#22D3EE', r: 4 }}/>
                  <Line type="monotone" dataKey="empleados" name={t('Empleados activos', 'Active employees')} stroke="#34D399" strokeWidth={2.5} dot={{ fill: '#34D399', r: 4 }}/>
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div style={{ background: NAVY_CARD, borderRadius: 16, padding: '22px 24px', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: 'white', marginBottom: 4 }}>{t('Ahorro en farmacia generado', 'Pharmacy savings generated')}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', fontWeight: 700, marginBottom: 16 }}>
                {t('USD acumulados para las familias en México', 'USD accumulated for families in Mexico')}
              </div>
              <ResponsiveContainer width="100%" height={150}>
                <BarChart data={MONTHLY}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false}/>
                  <XAxis dataKey="mes" tick={axisStyle} axisLine={false} tickLine={false}/>
                  <YAxis tick={axisStyle} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v/1000).toFixed(1)}K`}/>
                  <Tooltip content={<DarkTip/>}/>
                  <Bar dataKey="ahorro" name={t('Ahorro USD', 'Savings USD')} fill="#FCD34D" radius={[5,5,0,0]}/>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div style={{ background: NAVY_CARD, borderRadius: 16, padding: '22px 24px', border: '1px solid rgba(255,255,255,0.07)', display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: 'white' }}>
                {t('Resumen ejecutivo', 'Executive summary')} · {MONTHS[monthIdx]}
              </div>
              {[
                { label: t('Total empleados elegibles',   'Total eligible employees'),      val: '84',         color: '#22D3EE' },
                { label: t('Activaron el beneficio',      'Activated the benefit'),          val: '84 (100%)',  color: '#34D399' },
                { label: t('Usaron al menos 1 servicio',  'Used at least 1 service'),        val: '77 (92%)',   color: '#34D399' },
                { label: t('No han usado ningún serv.',   'Have not used any service'),      val: '7 (8%)',     color: '#FCD34D' },
                { label: t('Consultas médicas',           'Medical consultations'),          val: `${d.consultas}`, color: '#22D3EE' },
                { label: t('Ahorro en farmacia',          'Pharmacy savings'),               val: `$${d.ahorro.toLocaleString()}`, color: '#FCD34D' },
                { label: t('Costo mensual total',         'Total monthly cost'),             val: `$${invoiceAmt}`, color: '#A78BFA' },
                { label: t('Costo por empleado/mes',      'Cost per employee/month'),        val: '$18.00',     color: '#A78BFA' },
              ].map(({ label, val, color }) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 10, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>{label}</span>
                  <span style={{ fontSize: 13, color, fontWeight: 800 }}>{val}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══ EMPLOYEES ══ */}
        {activeTab === 'employees' && (
          <div style={{ animation: 'fadeIn .2s ease' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, background: NAVY_CARD, borderRadius: 10, padding: '10px 16px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
              </svg>
              <input value={searchQ} onChange={e => setSearchQ(e.target.value)}
                placeholder={t('Buscar empleado...', 'Search employee...')}
                style={{ background: 'transparent', border: 'none', outline: 'none', color: 'white', fontSize: 13, fontWeight: 500, flex: 1 }}/>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontWeight: 700 }}>{filtered.length} {t('empleados', 'employees')}</span>
            </div>

            <div style={{ background: NAVY_CARD, borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 1fr 1fr 1.5fr', padding: '10px 20px', borderBottom: '1px solid rgba(255,255,255,0.07)', background: NAVY_IN }}>
                {[
                  t('Empleado','Employee'), t('Puesto','Position'),
                  t('Activo desde','Active since'), t('Último uso','Last use'),
                  t('Servicios usados','Services used')
                ].map(h => (
                  <div key={h} style={{ fontSize: 10, fontWeight: 800, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{h}</div>
                ))}
              </div>
              {filtered.map((emp, i) => {
                const st = statusTag[emp.status as keyof typeof statusTag]
                return (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 1fr 1fr 1.5fr', padding: '14px 20px', borderBottom: i < filtered.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none', alignItems: 'center' }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 32, height: 32, borderRadius: '50%', background: `${st.dot}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <span style={{ fontSize: 12, fontWeight: 800, color: st.dot }}>{emp.name.charAt(0)}</span>
                      </div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: 'white', lineHeight: 1.2 }}>{emp.name}</div>
                        <div style={{ fontSize: 10, background: st.bg, color: st.color, fontWeight: 700, padding: '1px 7px', borderRadius: 100, display: 'inline-block', marginTop: 3 }}>{st.label}</div>
                      </div>
                    </div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>{emp.job}</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>{emp.since}</div>
                    <div style={{ fontSize: 12, color: (emp.last === 'Nunca' || emp.last === 'Never') ? '#F87171' : 'rgba(255,255,255,0.6)', fontWeight: 600 }}>{emp.last}</div>
                    <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                      {emp.uses.length === 0
                        ? <span style={{ fontSize: 10, color: '#F87171', fontWeight: 700 }}>{t('Sin uso', 'No use')}</span>
                        : emp.uses.map(u => {
                            const s = svcBadge[u]
                            return <span key={u} style={{ fontSize: 10, fontWeight: 700, color: s.color, background: `${s.color}15`, padding: '2px 8px', borderRadius: 100 }}>{s.label}</span>
                          })
                      }
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* ══ INVOICE ══ */}
        {activeTab === 'invoice' && (
          <div style={{ animation: 'fadeIn .2s ease' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div style={{ background: NAVY_CARD, borderRadius: 16, padding: '28px', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, paddingBottom: 20, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 800, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>
                      {t('Factura mensual', 'Monthly invoice')}
                    </div>
                    <div style={{ fontSize: 22, fontWeight: 700, color: 'white' }}>INV-2026-0{monthIdx + 4}</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', fontWeight: 600, marginTop: 4 }}>
                      {t(`Emitida: 1 de ${MONTHS[monthIdx]}, 2026`, `Issued: ${MONTHS[monthIdx]} 1, 2026`)}
                    </div>
                  </div>
                  <div style={{ background: 'rgba(52,211,153,0.12)', border: '1px solid rgba(52,211,153,0.25)', borderRadius: 100, padding: '5px 14px' }}>
                    <span style={{ fontSize: 11, fontWeight: 800, color: '#34D399', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                      {t('Pagada', 'Paid')}
                    </span>
                  </div>
                </div>

                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 11, fontWeight: 800, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
                    {t('Facturado a', 'Billed to')}
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'white' }}>{COMPANY}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>Houston, TX · EIN 45-1234567</div>
                </div>

                <div style={{ background: NAVY_IN, borderRadius: 10, padding: '16px 18px', marginBottom: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: 'white', marginBottom: 3 }}>
                        {t('Beneficio SaludCompartida · 84 empleados', 'SaludCompartida Benefit · 84 employees')}
                      </div>
                      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>
                        {t('84 empleados × $18.00/mes', '84 employees × $18.00/month')}
                      </div>
                    </div>
                    <div style={{ fontFamily: 'Georgia, serif', fontSize: 22, color: '#22D3EE', fontWeight: 700 }}>$1,512.00</div>
                  </div>
                </div>

                {[
                  { label: t('Subtotal', 'Subtotal'), val: '$1,512.00' },
                  { label: t('Impuestos (0%)', 'Taxes (0%)'), val: '$0.00' },
                ].map(({ label, val }) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>{label}</span>
                    <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>{val}</span>
                  </div>
                ))}
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0 0' }}>
                  <span style={{ fontSize: 15, color: 'white', fontWeight: 800 }}>Total</span>
                  <span style={{ fontFamily: 'Georgia, serif', fontSize: 28, color: '#22D3EE', fontWeight: 700 }}>$1,512.00</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ background: NAVY_CARD, borderRadius: 16, padding: '22px 24px', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <div style={{ fontSize: 13, fontWeight: 800, color: 'white', marginBottom: 16 }}>
                    {t('Historial de facturación', 'Billing history')}
                  </div>
                  {MONTHLY.map((m, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: 'white' }}>{MONTHS[i]} 2026</div>
                        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>INV-2026-0{i + 4} · {m.empleados} {t('empleados', 'employees')}</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ fontFamily: 'Georgia, serif', fontSize: 16, color: 'white', fontWeight: 700 }}>${(m.empleados * 18).toLocaleString()}.00</span>
                        <span style={{ fontSize: 10, fontWeight: 800, color: '#34D399', background: 'rgba(52,211,153,0.12)', padding: '2px 8px', borderRadius: 100 }}>{t('Pagada', 'Paid')}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ background: NAVY_CARD, borderRadius: 16, padding: '22px 24px', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <div style={{ fontSize: 13, fontWeight: 800, color: 'white', marginBottom: 14 }}>
                    {t('Costo vs valor generado', 'Cost vs value generated')} · {MONTHS[monthIdx]}
                  </div>
                  {[
                    { label: t('Costo mensual por empleado',     'Monthly cost per employee'),     val: '$18.00',   color: '#A78BFA' },
                    { label: t('Ahorro farmacia por empleado',   'Pharmacy savings per employee'), val: `$${(d.ahorro / d.empleados).toFixed(0)}`, color: '#FCD34D' },
                    { label: t('Consultas médicas promedio',     'Average medical consultations'), val: `${(d.consultas / d.empleados).toFixed(1)}/${t('emp','emp')}`, color: '#22D3EE' },
                    { label: t('Retorno estimado (rotación)',    'Estimated ROI (turnover)'),       val: `${(d.empleados * 0.25 * 0.15 * 5200 / 12 / (d.empleados * 18)).toFixed(1)}x`, color: '#34D399' },
                  ].map(({ label, val, color }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>{label}</span>
                      <span style={{ fontSize: 14, color, fontWeight: 800 }}>{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity:0; transform:translateY(6px) } to { opacity:1; transform:translateY(0) } }
      `}</style>
    </div>
  )
}
