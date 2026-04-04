'use client'
import { useState } from 'react'
import { useLang } from '@/contexts/LanguageContext'
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Sector,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from 'recharts'

/* ── PALETTE: bright colors that pop on navy dark background ──
   Cyan:    #22D3EE  — primary accent
   Emerald: #34D399  — positive/green
   Amber:   #FCD34D  — warning/attention  
   Rose:    #F87171  — loss/negative
   Violet:  #A78BFA  — secondary
   Slate:   #94A3B8  — muted on dark
*/

const NAVY = '#0F3460'
const NAVY_CARD = '#162040'  // slightly lighter navy for cards
const NAVY_INNER = '#1E2D4F' // innermost card bg

const REMESA_TOTAL = 393

const REMESA_SLICES = (es) => [
  { name: es ? 'Renta y alimentación' : 'Rent & food',  pct: 68, color: '#3B82F6' },
  { name: es ? 'Educación'            : 'Education',    pct: 12, color: '#818CF8' },
  { name: es ? 'Salud'                : 'Healthcare',   pct: 10, color: '#22D3EE' },
  { name: es ? 'Ahorro'               : 'Savings',      pct:  6, color: '#FCD34D' },
  { name: es ? 'Otros'                : 'Other',        pct:  4, color: '#6B7280' },
]
const SALUD_SLICES = (es) => [
  { name: es ? 'Visitas al médico'     : 'Doctor visits',    pct: 28, color: '#22D3EE' },
  { name: es ? 'Exámenes ambulatorios' : 'Outpatient exams', pct: 21, color: '#A78BFA' },
  { name: es ? 'Medicamentos'          : 'Medications',      pct: 17, color: '#34D399' },
  { name: es ? 'Otros gastos salud'    : 'Other health',     pct: 34, color: '#6B7280' },
]
const GASTO_DATA = (es) => [
  { cat: es ? 'Médico'      : 'Doctor',    sinRemesa: 25,  conRemesa: 80,  conSC: 0   },
  { cat: es ? 'Especialista': 'Specialist',sinRemesa: 40,  conRemesa: 150, conSC: 40  },
  { cat: es ? 'Exámenes'    : 'Lab tests', sinRemesa: 30,  conRemesa: 90,  conSC: 20  },
  { cat: es ? 'Farmacia/mes': 'Pharmacy',  sinRemesa: 35,  conRemesa: 120, conSC: 35  },
  { cat: es ? 'Terapia'     : 'Therapy',   sinRemesa: 0,   conRemesa: 90,  conSC: 0   },
]

/* Active donut shape — expands on hover */
const ActiveShape = (props) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, value } = props
  return (
    <g>
      <Sector cx={cx} cy={cy} innerRadius={innerRadius - 2} outerRadius={outerRadius + 8}
        startAngle={startAngle} endAngle={endAngle} fill={fill}
        stroke="rgba(255,255,255,0.2)" strokeWidth={1} />
      <text x={cx} y={cy - 10} textAnchor="middle" fill="white"
        style={{ fontSize: 24, fontFamily: 'Instrument Serif, Georgia, serif', fontWeight: 700 }}>
        {value}%
      </text>
      <text x={cx} y={cy + 14} textAnchor="middle" fill="rgba(255,255,255,0.75)"
        style={{ fontSize: 11, fontWeight: 700 }}>
        ${Math.round(REMESA_TOTAL * value / 100)}/mes
      </text>
    </g>
  )
}

/* Static center label when no active shape */
const CenterLabel = ({ cx, cy, label, sub }) => (
  <g>
    <text x={cx} y={cy - 8} textAnchor="middle" fill="white"
      style={{ fontSize: 18, fontFamily: 'Instrument Serif, Georgia, serif', fontWeight: 700 }}>
      {label}
    </text>
    {sub && <text x={cx} y={cy + 12} textAnchor="middle" fill="rgba(255,255,255,0.6)"
      style={{ fontSize: 10, fontWeight: 700 }}>
      {sub}
    </text>}
  </g>
)

/* Dark tooltip */
const DarkTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: '#1E2D4F', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8, padding: '10px 14px' }}>
      <div style={{ fontWeight: 700, color: 'white', fontSize: 13, marginBottom: 4 }}>
        {payload[0]?.payload?.cat || payload[0]?.name}
      </div>
      {payload.map((p, i) => (
        <div key={i} style={{ fontSize: 12, color: p.color || '#22D3EE', fontWeight: 600 }}>
          {p.name}: <strong>${p.value}</strong>
        </div>
      ))}
    </div>
  )
}

export default function TheImpact() {
  const { lang } = useLang()
  const es = lang === 'es'
  const [tab, setTab] = useState(0)
  const [activeRemesa, setActiveRemesa] = useState(2)
  const [employees, setEmployees] = useState(100)

  const remesaSlices = REMESA_SLICES(es)
  const saludSlices  = SALUD_SLICES(es)
  const gastoData    = GASTO_DATA(es)
  const annualSC     = employees * 18 * 12
  const retained     = Math.round(employees * 0.25 * 0.15)
  const savedTurnover= retained * 5200

  const roiData = [50,100,200,500,1000].map(n => ({
    n: n >= 1000 ? '1K' : String(n),
    [es ? 'Costo SaludCompartida' : 'SaludCompartida cost']: n * 18 * 12,
    [es ? 'Ahorro rotación' : 'Turnover savings']: Math.round(n * 0.25 * 0.15 * 5200),
  }))

  const TABS = [
    es ? 'La remesa y la salud'   : 'Remittance & health',
    es ? 'Costo sin vs con SaludCompartida'    : 'Cost without vs with SaludCompartida',
    es ? 'Tus empleados y la remesa' : 'Your employees & the remittance',
  ]

  /* Shared axis style for dark bg */
  const axisStyle = { fontSize: 11, fill: 'rgba(255,255,255,0.75)', fontWeight: 700 }
  const gridStyle = { stroke: 'rgba(255,255,255,0.07)' }

  return (
    <div style={{ background: 'var(--sand)', animation: 'fadeUp .35s ease', color: 'white' }} className="on-green">
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '28px 48px 28px' }}>

        {/* Header */}
        <div style={{ maxWidth: 580, marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12 }}>
            {es ? 'Datos concretos' : 'Concrete data'}
          </div>
          <h2 style={{ fontSize: 32, color: 'white', fontWeight: 700, marginBottom: 10 }}>
            {es ? 'El impacto en números reales' : 'The impact in real numbers'}
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.85)', fontWeight: 600, lineHeight: 1.65 }}>
            {es
              ? 'El 10% de cada remesa se va en salud. El 66% de ese gasto es médicos, exámenes y medicamentos — exactamente lo que SaludCompartida cubre.'
              : '10% of every remittance goes to healthcare. 66% of that spend is doctors, exams, and medications — exactly what SaludCompartida covers.'
            }
          </p>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 20, flexWrap: 'wrap' }}>
          {TABS.map((label, i) => (
            <button key={i} onClick={() => setTab(i)} style={{
              padding: '10px 22px', borderRadius: 8,
              border: tab === i ? '2px solid white' : '2px solid rgba(255,255,255,0.2)',
              background: tab === i ? '#0F3460' : 'rgba(255,255,255,0.06)',
              color: 'white',
              fontSize: 13, fontWeight: tab === i ? 800 : 600,
              cursor: 'pointer', transition: 'all .15s',
            }}>{label}</button>
          ))}
        </div>

        {/* ── TAB 0: La remesa y la salud ── */}
        {tab === 0 && (
          <div key="t0" style={{ animation: 'fadeUp .2s ease' }}>
            {/* KPI row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 28 }}>
              {[
                { val: '$393', desc: es ? 'Promedio mensual de remesa por trabajador' : 'Average monthly remittance per worker', src: 'Banxico 2024' },
                { val: '10%',  desc: es ? 'De cada remesa se destina a salud' : 'Of each remittance goes to healthcare', src: 'IDB 2024' },
                { val: '44%',  desc: es ? 'Más gasto en salud vs familias sin remesas — usan medicina privada' : 'More health spend vs families without remittances — use private medicine', src: 'Banxico / OCDE' },
              ].map(({ val, desc, src }) => (
                <div key={val} style={{ background: NAVY_CARD, borderRadius: 12, padding: '14px 18px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 36, color: 'white', fontWeight: 700, lineHeight: 1 }}>{val}</div>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', fontWeight: 700, lineHeight: 1.55, margin: '10px 0 8px' }}>{desc}</p>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{src}</div>
                </div>
              ))}
            </div>

            {/* Two donuts */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              {/* Donut 1 */}
              <div style={{ background: NAVY_CARD, borderRadius: 14, padding: '18px 18px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: 'white', marginBottom: 4 }}>
                  {es ? '¿Adónde va la remesa?' : 'Where does the remittance go?'}
                </div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', fontWeight: 700, marginBottom: 20 }}>
                  {es ? 'Promedio $393/mes · click para explorar' : 'Average $393/mo · click to explore'}
                </div>
                <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
                  <ResponsiveContainer width={160} height={160}>
                    <PieChart>
                      <Pie data={remesaSlices.map(s => ({ ...s, value: s.pct }))}
                        cx="50%" cy="50%" innerRadius={48} outerRadius={74}
                        dataKey="value" activeIndex={activeRemesa}
                        activeShape={<ActiveShape />}
                        stroke="rgba(22,32,64,0.8)" strokeWidth={2}
                        onMouseEnter={(_, i) => setActiveRemesa(i)}>
                        {remesaSlices.map((s, i) => <Cell key={i} fill={s.color} />)}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div style={{ flex: 1 }}>
                    {remesaSlices.map((s, i) => (
                      <div key={i} onClick={() => setActiveRemesa(i)} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, cursor: 'pointer', opacity: activeRemesa === i ? 1 : 0.6, transition: 'opacity .15s' }}>
                        <div style={{ width: 10, height: 10, borderRadius: 2, background: s.color, flexShrink: 0 }} />
                        <span style={{ fontSize: 12, color: 'white', fontWeight: activeRemesa === i ? 800 : 600, flex: 1 }}>{s.name}</span>
                        <span style={{ fontSize: 12, fontWeight: 800, color: 'white' }}>{s.pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ marginTop: 16, background: NAVY_INNER, borderRadius: 8, padding: '10px 14px', borderLeft: '3px solid #22D3EE' }}>
                  <span style={{ fontSize: 12, color: 'white', fontWeight: 700 }}>
                    {es ? '→ Del 10% de salud ($39/mes), el 66% se va en médicos, exámenes y medicamentos.' : '→ Of the 10% for health ($39/mo), 66% goes to doctors, exams, and medications.'}
                  </span>
                </div>
              </div>

              {/* Donut 2 */}
              <div style={{ background: NAVY_CARD, borderRadius: 14, padding: '18px 18px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: 'white', marginBottom: 4 }}>
                  {es ? '¿En qué se gasta el 10% de salud?' : 'How is the 10% for health spent?'}
                </div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', fontWeight: 700, marginBottom: 20 }}>
                  {es ? '$39/mes promedio · 66% en atención directa' : '$39/mo average · 66% on direct care'}
                </div>
                <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
                  <ResponsiveContainer width={160} height={160}>
                    <PieChart>
                      <Pie data={saludSlices.map(s => ({ ...s, value: s.pct }))}
                        cx="50%" cy="50%" innerRadius={48} outerRadius={74}
                        dataKey="value" startAngle={90} endAngle={-270}
                        stroke="rgba(22,32,64,0.8)" strokeWidth={2}>
                        {saludSlices.map((s, i) => <Cell key={i} fill={s.color} />)}
                      </Pie>
                      <Tooltip content={({ active, payload }) => {
                        if (!active || !payload?.length) return null
                        const d = payload[0].payload
                        return (
                          <div style={{ background: NAVY_INNER, border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8, padding: '8px 12px' }}>
                            <div style={{ fontWeight: 800, color: 'white', fontSize: 13 }}>{d.name}</div>
                            <div style={{ color: d.color, fontWeight: 700, fontSize: 12 }}>{d.pct}% · ${Math.round(REMESA_TOTAL * 0.10 * d.pct / 100)}/mes</div>
                          </div>
                        )
                      }} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div style={{ flex: 1 }}>
                    {saludSlices.map((s, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                        <div style={{ width: 10, height: 10, borderRadius: 2, background: s.color, flexShrink: 0 }} />
                        <span style={{ fontSize: 12, color: 'white', fontWeight: 600, flex: 1 }}>{s.name}</span>
                        <span style={{ fontSize: 12, fontWeight: 800, color: 'white' }}>{s.pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ marginTop: 16, background: NAVY_INNER, borderRadius: 8, padding: '10px 14px', borderLeft: '3px solid #A78BFA' }}>
                  <span style={{ fontSize: 12, color: 'white', fontWeight: 700 }}>
                    {es ? '→ Médicos + exámenes + medicamentos = exactamente lo que SaludCompartida cubre.' : '→ Doctors + exams + medications = exactly what SaludCompartida covers.'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 1: Costo sin vs con SaludCompartida ── */}
        {tab === 1 && (
          <div key="t1" style={{ animation: 'fadeUp .2s ease' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 28 }}>
              {[
                { val: '+44%', desc: es ? 'Gasto extra en salud — usan medicina privada (esperas largas en sistema público)' : 'Extra health spend — use private medicine (long waits in public system)', color: '#F87171', border: 'rgba(248,113,113,0.3)' },
                { val: '$640', desc: es ? 'Gasto mensual de bolsillo sin SaludCompartida' : 'Monthly out-of-pocket without SaludCompartida', color: '#FCD34D', border: 'rgba(252,211,77,0.3)' },
                { val: '$75',  desc: es ? 'Gasto mensual estimado con SaludCompartida' : 'Estimated monthly spend with SaludCompartida', color: '#34D399', border: 'rgba(52,211,153,0.3)' },
              ].map(({ val, desc, color, border }) => (
                <div key={val} style={{ background: NAVY_CARD, borderRadius: 12, padding: '14px 18px', border: `1px solid ${border}` }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 36, color, fontWeight: 700, lineHeight: 1 }}>{val}</div>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', fontWeight: 700, lineHeight: 1.55, marginTop: 10 }}>{desc}</p>
                </div>
              ))}
            </div>

            <div style={{ background: NAVY_CARD, borderRadius: 14, padding: '18px 18px 14px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: 'white', marginBottom: 4 }}>
                {es ? 'Gasto de bolsillo por servicio (USD/visita)' : 'Out-of-pocket cost per service (USD/visit)'}
              </div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', fontWeight: 700, marginBottom: 24 }}>
                {es ? 'Sin remesa (público) vs con remesa (privado +44%) vs con SaludCompartida' : 'No remittance (public) vs with remittance (private +44%) vs with SaludCompartida'}
              </div>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={gastoData} barGap={3} barCategoryGap="25%">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.07)" vertical={false} />
                  <XAxis dataKey="cat" tick={axisStyle} axisLine={false} tickLine={false} />
                  <YAxis tick={axisStyle} axisLine={false} tickLine={false} tickFormatter={v => `$${v}`} />
                  <Tooltip content={<DarkTooltip />} />
                  <Bar dataKey="sinRemesa" name={es ? 'Sin remesa (público)' : 'No remittance (public)'} fill="#475569" radius={[4,4,0,0]} />
                  <Bar dataKey="conRemesa" name={es ? 'Con remesa (privado)'  : 'With remittance (private)'} fill="#F87171" radius={[4,4,0,0]} />
                  <Bar dataKey="conSC"     name={es ? 'Con SaludCompartida'   : 'With SaludCompartida'} fill="#34D399" radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
              <div style={{ display: 'flex', gap: 20, justifyContent: 'center', marginTop: 12, flexWrap: 'wrap' }}>
                {[
                  { color: '#475569', label: es ? 'Sin remesa (público)' : 'No remittance (public)' },
                  { color: '#F87171', label: es ? 'Con remesa (privado +44%)' : 'With remittance (private +44%)' },
                  { color: '#34D399', label: es ? 'Con SaludCompartida' : 'With SaludCompartida' },
                ].map(({ color, label }) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: 10, height: 10, borderRadius: 2, background: color }} />
                    <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)', fontWeight: 700 }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 2: Tus empleados y la remesa ── */}
        {tab === 2 && (
          <div key="t2" style={{ animation: 'fadeUp .2s ease' }}>
            {/* Slider */}
            <div style={{ background: NAVY_CARD, borderRadius: 16, padding: '28px 32px', marginBottom: 20, border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 8 }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 800, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
                    {es ? 'Total de empleados en tu empresa' : 'Total employees in your company'}
                  </div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 48, color: 'white', fontWeight: 700, lineHeight: 1 }}>{employees}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', fontWeight: 700, marginBottom: 4 }}>
                    {es ? 'envían remesas a México' : 'send remittances to Mexico'}
                  </div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 48, color: '#22D3EE', fontWeight: 700, lineHeight: 1 }}>
                    {Math.round(employees * 0.78)}
                  </div>
                </div>
              </div>
              <input type="range" min={10} max={1000} step={10} value={employees}
                onChange={e => setEmployees(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#22D3EE', margin: '12px 0 6px' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'rgba(255,255,255,0.4)', fontWeight: 700 }}>
                <span>10</span><span>1,000</span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
              {/* Hoy sin SaludCompartida */}
              <div style={{ background: NAVY_CARD, borderRadius: 16, padding: 28, border: '1px solid rgba(248,113,113,0.2)' }}>
                <div style={{ fontSize: 12, fontWeight: 800, color: '#F87171', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 20 }}>
                  {es ? 'Hoy — sin SaludCompartida' : 'Today — without SaludCompartida'}
                </div>
                {[
                  { num: Math.round(employees * 0.78), unit: es ? 'empleados envían remesas' : 'employees send remittances', sub: es ? `78% de tus ${employees} empleados` : `78% of your ${employees} employees`, color: '#60A5FA', arrow: true },
                  { num: `$${Math.round(employees * 0.78 * 393 * 0.10).toLocaleString()}`, unit: es ? 'van a salud cada mes' : 'go to healthcare per month', sub: es ? '10% de cada remesa · medicina privada' : '10% of each remittance · private medicine', color: '#FCD34D', arrow: true },
                  { num: `$${Math.round(employees * 0.78 * 393 * 0.10 * 0.66).toLocaleString()}`, unit: es ? 'en médicos, exámenes y medicamentos' : 'on doctors, exams and medications', sub: es ? '66% del gasto en salud — lo que SaludCompartida cubre' : '66% of health spend — what SaludCompartida covers', color: '#F87171', arrow: false },
                ].map(({ num, unit, sub, color, arrow }, i) => (
                  <div key={i}>
                    <div style={{ background: NAVY_INNER, borderRadius: 10, padding: '14px 16px', border: `1px solid ${color}30` }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
                        <span style={{ fontFamily: 'var(--font-display)', fontSize: 28, color, fontWeight: 700, lineHeight: 1 }}>{num}</span>
                        <span style={{ fontSize: 12, color: 'white', fontWeight: 700 }}>{unit}</span>
                      </div>
                      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', fontWeight: 700 }}>{sub}</div>
                    </div>
                    {arrow && <div style={{ display: 'flex', justifyContent: 'center', padding: '5px 0' }}>
                      <svg width="16" height="18" viewBox="0 0 16 18" fill="none">
                        <path d="M8 0v14M2 9l6 8 6-8" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>}
                  </div>
                ))}
                <div style={{ marginTop: 14, background: 'rgba(248,113,113,0.1)', borderRadius: 10, padding: '12px 14px', borderLeft: '3px solid #F87171', display: 'flex', gap: 8 }}>
                  <span style={{ fontSize: 12, color: '#F87171', fontWeight: 700, lineHeight: 1.55 }}>
                    {es ? 'Emergencia → familia llama al empleado → estrés → distracción → ausentismo.' : 'Emergency → family calls employee → stress → distraction → absenteeism.'}
                  </span>
                </div>
              </div>

              {/* Con SaludCompartida */}
              <div style={{ background: NAVY_CARD, borderRadius: 16, padding: 28, border: '1px solid rgba(52,211,153,0.2)' }}>
                <div style={{ fontSize: 12, fontWeight: 800, color: '#34D399', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 20 }}>
                  {es ? 'Con SaludCompartida' : 'With SaludCompartida'}
                </div>
                {[
                  { icon: '🎥', before: es ? 'Consulta privada: $80 USD' : 'Private consult: $80 USD', after: es ? '$0 — videollamada 24/7 incluida' : '$0 — 24/7 video call included', color: '#22D3EE' },
                  { icon: '💊', before: es ? 'Medicamentos: $120/mes' : 'Medications: $120/mo', after: es ? 'Hasta 75% descuento en farmacia' : 'Up to 75% pharmacy discount', color: '#FCD34D' },
                  { icon: '🧠', before: es ? 'Terapia: $90/sesión' : 'Therapy: $90/session', after: es ? 'Terapia semanal incluida' : 'Weekly therapy included', color: '#A78BFA' },
                  { icon: '📞', before: es ? 'Adulto mayor: solo en casa' : 'Senior: alone at home', after: es ? 'Lupita llama proactivamente' : 'Lupita calls proactively', color: '#60A5FA' },
                ].map(({ before, after, color }, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 12, alignItems: 'flex-start' }}>
                    <div style={{ width: 28, height: 28, borderRadius: 7, background: `${color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: color }} />
                    </div>
                    <div>
                      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontWeight: 600, textDecoration: 'line-through', marginBottom: 2 }}>{before}</div>
                      <div style={{ fontSize: 12, fontWeight: 800, color: '#34D399' }}>✓ {after}</div>
                    </div>
                  </div>
                ))}
                <div style={{ marginTop: 8, background: 'rgba(52,211,153,0.1)', borderRadius: 10, padding: '14px 16px', borderLeft: '3px solid #34D399' }}>
                  <div style={{ fontSize: 12, fontWeight: 800, color: '#34D399', marginBottom: 6 }}>
                    {es ? 'El resultado: tranquilidad real' : 'The result: real peace of mind'}
                  </div>
                  <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)', fontWeight: 700, lineHeight: 1.6, margin: 0 }}>
                    {es
                      ? `${Math.round(employees * 0.78)} empleados llegan a trabajar sabiendo que si hay una emergencia hoy en México, ya está cubierta.`
                      : `${Math.round(employees * 0.78)} employees arrive knowing that if there's an emergency in Mexico today, it's already covered.`
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* Cost strip */}
            <div style={{ background: NAVY_CARD, borderRadius: 12, padding: '18px 24px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
              <div style={{ fontSize: 14, color: 'white', fontWeight: 700 }}>
                {es
                  ? `Cubrir a los ${Math.round(employees * 0.78)} empleados que envían remesas:`
                  : `Covering the ${Math.round(employees * 0.78)} employees who send remittances:`
                }
              </div>
              <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, color: 'white', fontWeight: 700, lineHeight: 1 }}>
                    ${(Math.round(employees * 0.78) * 18).toLocaleString()}
                  </div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', fontWeight: 700, marginTop: 3 }}>{es ? 'por mes' : 'per month'}</div>
                </div>
                <div style={{ width: 1, height: 40, background: 'rgba(255,255,255,0.15)' }} />
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, color: '#34D399', fontWeight: 700, lineHeight: 1 }}>
                    ${(Math.round(employees * 0.78) * 18 * 12).toLocaleString()}
                  </div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', fontWeight: 700, marginTop: 3 }}>{es ? 'por año' : 'per year'}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
