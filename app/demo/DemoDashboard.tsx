'use client'
import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'

/* ─── CONSTANTS ─────────────────────────────────────────────── */
const NAVY      = '#0F3460'
const NAVY_CARD = '#162040'
const NAVY_IN   = '#1E2D4F'
const GREEN     = '#006847'

/* ─── DEMO DATA ─────────────────────────────────────────────── */
const COMPANY   = 'G&A Partners'
const MONTHS    = ['Enero', 'Febrero', 'Marzo', 'Abril']
const MONTH_IDX = 3  // default to Abril

const MONTHLY_DATA = [
  { mes: 'Ene', empleados: 74, consultas: 89, ahorro: 5420 },
  { mes: 'Feb', empleados: 79, consultas: 101, ahorro: 6180 },
  { mes: 'Mar', empleados: 82, consultas: 118, ahorro: 7230 },
  { mes: 'Abr', empleados: 84, consultas: 127, ahorro: 7812 },
]

const EMPLOYEES = [
  { name: 'Carlos Henríquez',   job: 'Operador de maquinaria',  since: 'Mar 1',  last: 'Hoy 7:02am',   uses: ['med', 'farm', 'lup'], status: 'active' },
  { name: 'Rosa Martínez',      job: 'Técnica de limpieza',     since: 'Mar 1',  last: 'Ayer',         uses: ['farm', 'ter'],        status: 'active' },
  { name: 'Javier Solís',       job: 'Asistente de almacén',    since: 'Mar 15', last: 'Hace 3 días',  uses: ['med', 'lup'],         status: 'active' },
  { name: 'Miguel Ángel Pérez', job: 'Supervisor de línea',     since: 'Mar 1',  last: 'Hace 1 sem',   uses: ['med'],                status: 'active' },
  { name: 'Andrés Fuentes',     job: 'Conductor',               since: 'Abr 1',  last: 'Hace 2 sem',   uses: [],                     status: 'low' },
  { name: 'Lucía Vargas',       job: 'Recepcionista',           since: 'Mar 1',  last: 'Nunca',        uses: [],                     status: 'inactive' },
  { name: 'Omar Castillo',      job: 'Técnico electricista',    since: 'Abr 1',  last: 'Nunca',        uses: [],                     status: 'inactive' },
  { name: 'Patricia Ruiz',      job: 'Asistente administrativa', since: 'Mar 1', last: 'Hace 5 días',  uses: ['ter', 'lup'],         status: 'active' },
]

const SERVICE_STATS = [
  { id: 'med',  label: 'Videollamada con Doctor', pct: 68, uses: 57, color: '#22D3EE', path: 'M9 12h6M9 16h6M9 8h2m4 0h-1M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z' },
  { id: 'farm', label: 'Descuento en Farmacia',   pct: 84, uses: 71, color: '#FCD34D', path: 'M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2v-4M9 21H5a2 2 0 01-2-2v-4m0 0h18' },
  { id: 'ter',  label: 'Terapia',                 pct: 31, uses: 26, color: '#A78BFA', path: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
  { id: 'lup',  label: 'Lupita AI',               pct: 72, uses: 61, color: '#34D399', path: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' },
]

const STATUS_TAG = {
  active:   { label: 'Activo',         bg: 'rgba(52,211,153,0.15)',  color: '#34D399',  dot: '#34D399' },
  low:      { label: 'Baja actividad', bg: 'rgba(252,211,77,0.15)',  color: '#FCD34D',  dot: '#FCD34D' },
  inactive: { label: 'Sin activar',    bg: 'rgba(248,113,113,0.15)', color: '#F87171',  dot: '#F87171' },
}

const SVC_BADGE: Record<string, {label:string, color:string}> = {
  med:  { label: 'Médico',   color: '#22D3EE' },
  farm: { label: 'Farmacia', color: '#FCD34D' },
  ter:  { label: 'Terapia',  color: '#A78BFA' },
  lup:  { label: 'Lupita',   color: '#34D399' },
}

const axisStyle = { fontSize: 11, fill: 'rgba(255,255,255,0.6)', fontWeight: 700 }
const grid      = { stroke: 'rgba(255,255,255,0.06)' }

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

/* ─── COMPONENT ─────────────────────────────────────────────── */
export default function DemoDashboard() {
  const [monthIdx, setMonthIdx]   = useState(MONTH_IDX)
  const [activeTab, setActiveTab] = useState<'overview'|'employees'|'invoice'>('overview')
  const [searchQ, setSearchQ]     = useState('')

  const d          = MONTHLY_DATA[monthIdx]
  const invoiceAmt = (84 * 18).toFixed(2)
  const filtered   = EMPLOYEES.filter(e => e.name.toLowerCase().includes(searchQ.toLowerCase()))
  const inactive   = EMPLOYEES.filter(e => e.status === 'inactive').length

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
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>PEO · Houston, TX</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* Demo badge */}
          <div style={{ background: 'rgba(252,211,77,0.15)', border: '1px solid rgba(252,211,77,0.3)', borderRadius: 100, padding: '4px 12px', display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#FCD34D' }}/>
            <span style={{ fontSize: 10, fontWeight: 800, color: '#FCD34D', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Vista Demo</span>
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
          {/* Back link */}
          <a href="/" style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 3L5 7l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Volver al portal
          </a>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '28px 32px' }}>

        {/* ── KPI STRIP ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 24 }}>
          {[
            { n: `${d.empleados}`,         sub: 'empleados con beneficio activo',    color: '#22D3EE', src: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8m13 2l-3 3-1.5-1.5' },
            { n: `${d.consultas}`,          sub: 'servicios utilizados este mes',     color: '#34D399', src: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
            { n: `$${d.ahorro.toLocaleString()}`, sub: 'ahorro generado en farmacia', color: '#FCD34D', src: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
            { n: `$${invoiceAmt}`,          sub: 'invoice del mes · un solo pago',   color: '#A78BFA', src: 'M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z' },
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

        {/* ── ALERT if inactive employees ── */}
        {inactive > 0 && (
          <div style={{ background: 'rgba(252,211,77,0.08)', border: '1px solid rgba(252,211,77,0.25)', borderRadius: 12, padding: '12px 18px', marginBottom: 20, display: 'flex', gap: 10, alignItems: 'center' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FCD34D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
            </svg>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'white' }}>
              {inactive} empleados no han activado el beneficio todavía.
              <span style={{ color: '#FCD34D', marginLeft: 6, cursor: 'pointer' }} onClick={() => setActiveTab('employees')}>
                SaludCompartida activa una campaña de reactivación automáticamente.
              </span>
            </div>
          </div>
        )}

        {/* ── TABS ── */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 22 }}>
          {([['overview','Resumen'], ['employees','Empleados'], ['invoice','Facturación']] as const).map(([id, label]) => (
            <button key={id} onClick={() => setActiveTab(id)} style={{
              padding: '8px 20px', borderRadius: 8,
              border: activeTab === id ? '2px solid rgba(255,255,255,0.3)' : '2px solid rgba(255,255,255,0.08)',
              background: activeTab === id ? NAVY_CARD : 'transparent',
              color: activeTab === id ? 'white' : 'rgba(255,255,255,0.4)',
              fontSize: 13, fontWeight: activeTab === id ? 800 : 500,
              cursor: 'pointer', transition: 'all .15s',
            }}>{label}</button>
          ))}
        </div>

        {/* ══ OVERVIEW ══════════════════════════════════════════ */}
        {activeTab === 'overview' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, animation: 'fadeIn .2s ease' }}>

            {/* Service utilization */}
            <div style={{ background: NAVY_CARD, borderRadius: 16, padding: '22px 24px', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: 'white', marginBottom: 4 }}>Utilización por servicio</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', fontWeight: 700, marginBottom: 20 }}>% de los {d.empleados} empleados elegibles</div>
              {SERVICE_STATS.map(({ label, pct, uses, color, path }) => (
                <div key={label} style={{ marginBottom: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={path}/></svg>
                      <span style={{ fontSize: 12, color: 'white', fontWeight: 700 }}>{label}</span>
                    </div>
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                      <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>{uses} empleados</span>
                      <span style={{ fontSize: 13, color, fontWeight: 800, width: 34, textAlign: 'right' }}>{pct}%</span>
                    </div>
                  </div>
                  <div style={{ height: 7, background: 'rgba(255,255,255,0.07)', borderRadius: 4, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: 4 }}/>
                  </div>
                </div>
              ))}
            </div>

            {/* Monthly trend */}
            <div style={{ background: NAVY_CARD, borderRadius: 16, padding: '22px 24px', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: 'white', marginBottom: 4 }}>Tendencia mensual</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', fontWeight: 700, marginBottom: 16 }}>Servicios utilizados y empleados activos</div>
              <ResponsiveContainer width="100%" height={190}>
                <LineChart data={MONTHLY_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="mes" tick={axisStyle} axisLine={false} tickLine={false}/>
                  <YAxis tick={axisStyle} axisLine={false} tickLine={false}/>
                  <Tooltip content={<DarkTip/>}/>
                  <Line type="monotone" dataKey="consultas" name="Servicios" stroke="#22D3EE" strokeWidth={2.5} dot={{ fill: '#22D3EE', r: 4 }}/>
                  <Line type="monotone" dataKey="empleados" name="Empleados activos" stroke="#34D399" strokeWidth={2.5} dot={{ fill: '#34D399', r: 4 }}/>
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Savings bar chart */}
            <div style={{ background: NAVY_CARD, borderRadius: 16, padding: '22px 24px', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: 'white', marginBottom: 4 }}>Ahorro en farmacia generado</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', fontWeight: 700, marginBottom: 16 }}>USD acumulados para las familias en México</div>
              <ResponsiveContainer width="100%" height={150}>
                <BarChart data={MONTHLY_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false}/>
                  <XAxis dataKey="mes" tick={axisStyle} axisLine={false} tickLine={false}/>
                  <YAxis tick={axisStyle} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v/1000).toFixed(1)}K`}/>
                  <Tooltip content={<DarkTip/>}/>
                  <Bar dataKey="ahorro" name="Ahorro USD" fill="#FCD34D" radius={[5,5,0,0]}/>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Quick summary */}
            <div style={{ background: NAVY_CARD, borderRadius: 16, padding: '22px 24px', border: '1px solid rgba(255,255,255,0.07)', display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: 'white' }}>Resumen ejecutivo · {MONTHS[monthIdx]}</div>
              {[
                { label: 'Total empleados elegibles',  val: '84',        color: '#22D3EE' },
                { label: 'Activaron el beneficio',     val: '84 (100%)', color: '#34D399' },
                { label: 'Usaron al menos 1 servicio', val: '77 (92%)',  color: '#34D399' },
                { label: 'No han usado ningún serv.',  val: '7 (8%)',    color: '#FCD34D' },
                { label: 'Consultas médicas',          val: `${d.consultas}`, color: '#22D3EE' },
                { label: 'Ahorro en farmacia',         val: `$${d.ahorro.toLocaleString()}`, color: '#FCD34D' },
                { label: 'Costo mensual total',        val: `$${invoiceAmt}`, color: '#A78BFA' },
                { label: 'Costo por empleado/mes',     val: '$18.00',    color: '#A78BFA' },
              ].map(({ label, val, color }) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 10, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>{label}</span>
                  <span style={{ fontSize: 13, color, fontWeight: 800 }}>{val}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══ EMPLOYEES ══════════════════════════════════════════ */}
        {activeTab === 'employees' && (
          <div style={{ animation: 'fadeIn .2s ease' }}>
            {/* Search */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, background: NAVY_CARD, borderRadius: 10, padding: '10px 16px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
              </svg>
              <input
                value={searchQ} onChange={e => setSearchQ(e.target.value)}
                placeholder="Buscar empleado..."
                style={{ background: 'transparent', border: 'none', outline: 'none', color: 'white', fontSize: 13, fontWeight: 500, flex: 1 }}
              />
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontWeight: 700 }}>{filtered.length} empleados</span>
            </div>

            {/* Table */}
            <div style={{ background: NAVY_CARD, borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)' }}>
              {/* Header */}
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 1fr 1fr 1.5fr', gap: 0, padding: '10px 20px', borderBottom: '1px solid rgba(255,255,255,0.07)', background: NAVY_IN }}>
                {['Empleado', 'Puesto', 'Activo desde', 'Último uso', 'Servicios usados'].map((h) => (
                  <div key={h} style={{ fontSize: 10, fontWeight: 800, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{h}</div>
                ))}
              </div>
              {/* Rows */}
              {filtered.map((emp, i) => {
                const st = STATUS_TAG[emp.status as keyof typeof STATUS_TAG]
                return (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 1fr 1fr 1.5fr', gap: 0, padding: '14px 20px', borderBottom: i < filtered.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none', alignItems: 'center', transition: 'background .1s' }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                    {/* Name + status */}
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
                    <div style={{ fontSize: 12, color: emp.last === 'Nunca' ? '#F87171' : 'rgba(255,255,255,0.6)', fontWeight: 600 }}>{emp.last}</div>
                    {/* Service badges */}
                    <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                      {emp.uses.length === 0
                        ? <span style={{ fontSize: 10, color: '#F87171', fontWeight: 700 }}>Sin uso</span>
                        : emp.uses.map((u) => {
                            const s = SVC_BADGE[u]
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

        {/* ══ INVOICE ════════════════════════════════════════════ */}
        {activeTab === 'invoice' && (
          <div style={{ animation: 'fadeIn .2s ease' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {/* Invoice preview */}
              <div style={{ background: NAVY_CARD, borderRadius: 16, padding: '28px', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, paddingBottom: 20, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 800, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>Factura mensual</div>
                    <div style={{ fontSize: 22, fontWeight: 700, color: 'white' }}>INV-2026-0{monthIdx + 4}</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', fontWeight: 600, marginTop: 4 }}>Emitida: 1 de {MONTHS[monthIdx]}, 2026</div>
                  </div>
                  <div style={{ background: 'rgba(52,211,153,0.12)', border: '1px solid rgba(52,211,153,0.25)', borderRadius: 100, padding: '5px 14px' }}>
                    <span style={{ fontSize: 11, fontWeight: 800, color: '#34D399', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Pagada</span>
                  </div>
                </div>

                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 11, fontWeight: 800, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Facturado a</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'white' }}>{COMPANY}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>Houston, TX · EIN 45-1234567</div>
                </div>

                {/* Line items */}
                <div style={{ background: NAVY_IN, borderRadius: 10, padding: '16px 18px', marginBottom: 16 }}>
                  {[
                    { desc: 'Beneficio SaludCompartida · 84 empleados',  qty: 84, unit: 18, total: 1512 },
                  ].map(({ desc, qty, unit, total }) => (
                    <div key={desc}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 700, color: 'white', marginBottom: 3 }}>{desc}</div>
                          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>{qty} empleados × $18.00/mes</div>
                        </div>
                        <div style={{ fontFamily: 'Georgia, serif', fontSize: 22, color: '#22D3EE', fontWeight: 700 }}>${total.toLocaleString()}.00</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                {[
                  { label: 'Subtotal', val: '$1,512.00', muted: true },
                  { label: 'Impuestos (0%)', val: '$0.00', muted: true },
                ].map(({ label, val, muted }) => (
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

              {/* Billing history */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ background: NAVY_CARD, borderRadius: 16, padding: '22px 24px', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <div style={{ fontSize: 13, fontWeight: 800, color: 'white', marginBottom: 16 }}>Historial de facturación</div>
                  {MONTHLY_DATA.map((m, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: 'white' }}>{MONTHS[i]} 2026</div>
                        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>INV-2026-0{i + 4} · {m.empleados} empleados</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ fontFamily: 'Georgia, serif', fontSize: 16, color: 'white', fontWeight: 700 }}>${(m.empleados * 18).toLocaleString()}.00</span>
                        <span style={{ fontSize: 10, fontWeight: 800, color: '#34D399', background: 'rgba(52,211,153,0.12)', padding: '2px 8px', borderRadius: 100 }}>Pagada</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Cost per employee */}
                <div style={{ background: NAVY_CARD, borderRadius: 16, padding: '22px 24px', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <div style={{ fontSize: 13, fontWeight: 800, color: 'white', marginBottom: 14 }}>Costo vs valor generado · {MONTHS[monthIdx]}</div>
                  {[
                    { label: 'Costo mensual por empleado', val: '$18.00', color: '#A78BFA' },
                    { label: 'Ahorro farmacia por empleado', val: `$${(d.ahorro / d.empleados).toFixed(0)}`, color: '#FCD34D' },
                    { label: 'Consultas médicas promedio', val: `${(d.consultas / d.empleados).toFixed(1)}/emp`, color: '#22D3EE' },
                    { label: 'Retorno estimado (rotación)', val: `${(d.empleados * 0.25 * 0.15 * 5200 / 12 / (d.empleados * 18)).toFixed(1)}x`, color: '#34D399' },
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
