'use client'
import { useState } from 'react'
import { useLang } from '@/contexts/LanguageContext'
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Sector,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  AreaChart, Area,
} from 'recharts'

/* ─────────────────────────────────────────────
   CHART 1 — ¿Adónde va la remesa?
   $393/mes promedio. 10% va a salud.
   Del 10% de salud: 66% = médicos + exámenes + medicamentos
───────────────────────────────────────────── */
const REMESA_TOTAL = 393

const REMESA_SLICES = (es) => [
  { name: es ? 'Renta y alimentación' : 'Rent & food',      pct: 68, color: '#94A3B8' },
  { name: es ? 'Educación'            : 'Education',        pct: 12, color: '#60A5FA' },
  { name: es ? 'Salud'                : 'Healthcare',       pct: 10, color: '#006847' },
  { name: es ? 'Ahorro'               : 'Savings',          pct:  6, color: '#FCD34D' },
  { name: es ? 'Otros'                : 'Other',            pct:  4, color: '#E2E8F0' },
]

const SALUD_SLICES = (es) => [
  { name: es ? 'Visitas al médico'     : 'Doctor visits',     pct: 28, color: '#0891B2' },
  { name: es ? 'Exámenes ambulatorios' : 'Outpatient exams',  pct: 21, color: '#7C3AED' },
  { name: es ? 'Medicamentos'          : 'Medications',       pct: 17, color: '#059669' },
  { name: es ? 'Otros gastos salud'    : 'Other health',      pct: 34, color: '#D1FAE5' },
]

/* ─────────────────────────────────────────────
   CHART 2 — Gasto en salud: con vs sin SC
   Familias con remesas gastan 44% más en salud (medicina privada)
   SaludCompartida convierte ese gasto privado en $0 o reducido
───────────────────────────────────────────── */
const GASTO_DATA = (es) => [
  { cat: es ? 'Médico general'     : 'General doctor',   sinRemesa: 25,  conRemesa: 80,  conSC: 0   },
  { cat: es ? 'Especialista'       : 'Specialist',       sinRemesa: 40,  conRemesa: 150, conSC: 40  },
  { cat: es ? 'Exámenes'           : 'Lab tests',        sinRemesa: 30,  conRemesa: 90,  conSC: 20  },
  { cat: es ? 'Medicamentos/mes'   : 'Meds/month',       sinRemesa: 35,  conRemesa: 120, conSC: 35  },
  { cat: es ? 'Terapia psicológica': 'Therapy',          sinRemesa: 0,   conRemesa: 90,  conSC: 0   },
]

/* ─────────────────────────────────────────────
   CHART 3 — ROI por empresa (slider)
───────────────────────────────────────────── */

/* Active shape for donut hover */
const renderActiveShape = (props) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, value } = props
  return (
    <g>
      <Sector cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius + 8}
        startAngle={startAngle} endAngle={endAngle} fill={fill} />
      <text x={cx} y={cy - 10} textAnchor="middle" fill="#0F3460"
        style={{ fontSize: 20, fontFamily: 'Instrument Serif, Georgia, serif', fontWeight: 400 }}>
        {value}%
      </text>
      <text x={cx} y={cy + 14} textAnchor="middle" fill="#6B7280" style={{ fontSize: 11 }}>
        ${Math.round(REMESA_TOTAL * value / 100)}/mes
      </text>
    </g>
  )
}

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null
  const d = payload[0]
  return (
    <div style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: 8, padding: '10px 14px', boxShadow: '0 4px 16px rgba(0,0,0,0.08)', fontSize: 13 }}>
      <div style={{ fontWeight: 600, color: '#0F3460', marginBottom: 4 }}>{d.payload?.cat || d.name}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color || p.fill, fontWeight: 500 }}>
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

  // Chart 1 state
  const [activeRemesa, setActiveRemesa] = useState(2) // salud highlighted by default
  const remesaSlices = REMESA_SLICES(es)
  const saludSlices  = SALUD_SLICES(es)

  // Chart 2 state
  const gastoData = GASTO_DATA(es)

  // Chart 3 state
  const [employees, setEmployees] = useState(100)
  const annualSC     = employees * 18 * 12
  const retained     = Math.round(employees * 0.25 * 0.15)
  const savedTurnover= retained * 5200
  const roi          = Math.round((savedTurnover - annualSC) / annualSC * 100)
  const roiData      = [50,100,200,500,1000].map(n => ({
    n: n >= 1000 ? '1K' : String(n),
    [es ? 'Costo SC' : 'SC cost']: n * 18 * 12,
    [es ? 'Ahorro rotación' : 'Turnover savings']: Math.round(n * 0.25 * 0.15 * 5200),
  }))

  const TABS = [
    { label: es ? 'La remesa y la salud'    : 'Remittance & health' },
    { label: es ? 'Costo sin vs con SC'     : 'Cost without vs with SC' },
    { label: es ? 'Tus empleados y la remesa' : 'Your employees & the remittance' },
  ]

  return (
    <div style={{ background: 'var(--sand)', animation: 'fadeUp .35s ease', color: 'white' }} className="on-green">
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '72px 48px' }}>

        {/* Header */}
        <div style={{ maxWidth: 580, marginBottom: 44 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12 }}>
            {es ? 'Datos que importan' : 'Data that matters'}
          </div>
          <h2 style={{ fontSize: 42, color: 'white', fontWeight: 700, marginBottom: 14 }}>
            {es ? 'El impacto en números reales' : 'The impact in real numbers'}
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.9)', fontWeight: 600, lineHeight: 1.65 }}>
            {es
              ? 'El 10% de cada remesa se va en salud. El 66% de ese gasto es médicos, exámenes y medicamentos — exactamente lo que SaludCompartida cubre.'
              : '10% of every remittance goes to healthcare. 66% of that spend is doctors, exams, and medications — exactly what SaludCompartida covers.'
            }
          </p>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 36, flexWrap: 'wrap' }}>
          {TABS.map((t, i) => (
            <button key={i} onClick={() => setTab(i)} style={{
              padding: '9px 20px', borderRadius: 8,
              border: tab === i ? '2px solid white' : '2px solid rgba(255,255,255,0.2)',
              background: tab === i ? 'white' : 'rgba(255,255,255,0.08)',
              color: tab === i ? 'var(--sand)' : 'rgba(255,255,255,0.9)', fontWeight: tab === i ? 700 : 600,
              fontSize: 13, fontWeight: tab === i ? 700 : 400,
              cursor: 'pointer', transition: 'all .15s',
            }}>{t.label}</button>
          ))}
        </div>

        {/* ── CHART 1: La remesa y la salud ── */}
        {tab === 0 && (
          <div key="tab0" style={{ animation: 'fadeUp .2s ease' }}>

            {/* Stat callouts */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
              {[
                { val: '$393', label: es ? 'Promedio mensual de remesa por trabajador' : 'Average monthly remittance per worker', src: 'Banxico 2024' },
                { val: '10%', label: es ? 'De cada remesa se destina a salud' : 'Of each remittance goes to healthcare', src: 'IDB 2024' },
                { val: '44%', label: es ? 'Más gasto en salud vs familias sin remesas — usan medicina privada' : 'More healthcare spending vs families without remittances — they use private medicine', src: 'Banxico / OCDE' },
              ].map(({ val, label, src }) => (
                <div key={val} style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 14, padding: '22px 24px', border: '1px solid rgba(255,255,255,0.15)' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 44, color: 'white', lineHeight: 1 }}>{val}</div>
                  <p style={{ fontSize: 13, color: 'white', fontWeight: 600, lineHeight: 1.55, margin: '10px 0 8px' }}>{label}</p>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{src}</div>
                </div>
              ))}
            </div>

            {/* Two donuts side by side */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>

              {/* Donut 1: Distribución de la remesa */}
              <div style={{ background: 'white', borderRadius: 16, padding: '28px 24px' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#0F3460', marginBottom: 4 }}>
                  {es ? '¿Adónde va la remesa?' : 'Where does the remittance go?'}
                </div>
                <div style={{ fontSize: 11, color: '#6B7280', marginBottom: 20 }}>
                  {es ? 'Promedio $393/mes por trabajador' : 'Average $393/month per worker'}
                </div>
                <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
                  <ResponsiveContainer width={180} height={180}>
                    <PieChart>
                      <Pie data={remesaSlices.map(s => ({ ...s, value: s.pct }))}
                        cx="50%" cy="50%"
                        innerRadius={52} outerRadius={76}
                        dataKey="value"
                        activeIndex={activeRemesa}
                        activeShape={renderActiveShape}
                        onMouseEnter={(_, i) => setActiveRemesa(i)}>
                        {remesaSlices.map((s, i) => <Cell key={i} fill={s.color}/>)}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div style={{ flex: 1 }}>
                    {remesaSlices.map((s, i) => (
                      <div key={i} onClick={() => setActiveRemesa(i)}
                        style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, cursor: 'pointer',
                          opacity: activeRemesa === i ? 1 : 0.55, transition: 'opacity .15s' }}>
                        <div style={{ width: 10, height: 10, borderRadius: 2, background: s.color, flexShrink: 0 }}/>
                        <span style={{ fontSize: 12, color: '#374151', flex: 1 }}>{s.name}</span>
                        <span style={{ fontSize: 12, fontWeight: 700, color: '#0F3460' }}>{s.pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ marginTop: 14, background: '#E8F5EE', borderRadius: 8, padding: '10px 14px',
                  borderLeft: '3px solid #006847', fontSize: 12, color: '#006847', lineHeight: 1.5 }}>
                  {es
                    ? '→ Del 10% de salud ($39/mes), el 66% se va en médicos, exámenes y medicamentos.'
                    : '→ Of the 10% for health ($39/mo), 66% goes to doctors, exams, and medications.'
                  }
                </div>
              </div>

              {/* Donut 2: Desglose del gasto en salud */}
              <div style={{ background: 'white', borderRadius: 16, padding: '28px 24px' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#0F3460', marginBottom: 4 }}>
                  {es ? '¿En qué se gasta el 10% de salud?' : 'How is the 10% for health spent?'}
                </div>
                <div style={{ fontSize: 11, color: '#6B7280', marginBottom: 20 }}>
                  {es ? '$39/mes promedio · 66% en atención directa' : '$39/mo average · 66% on direct care'}
                </div>
                <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
                  <ResponsiveContainer width={180} height={180}>
                    <PieChart>
                      <Pie data={saludSlices.map(s => ({ ...s, value: s.pct }))}
                        cx="50%" cy="50%"
                        innerRadius={52} outerRadius={76}
                        dataKey="value"
                        startAngle={90} endAngle={-270}>
                        {saludSlices.map((s, i) => <Cell key={i} fill={s.color}/>)}
                        <Sector/>
                      </Pie>
                      <Tooltip content={({ active, payload }) => {
                        if (!active || !payload?.length) return null
                        const d = payload[0].payload
                        return (
                          <div style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: 8, padding: '8px 12px', fontSize: 12 }}>
                            <div style={{ fontWeight: 600, color: '#0F3460' }}>{d.name}</div>
                            <div style={{ color: d.color }}>{d.pct}% · ${Math.round(REMESA_TOTAL * 0.10 * d.pct / 100)}/mes</div>
                          </div>
                        )
                      }}/>
                    </PieChart>
                  </ResponsiveContainer>
                  <div style={{ flex: 1 }}>
                    {saludSlices.map((s, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                        <div style={{ width: 10, height: 10, borderRadius: 2, background: s.color, flexShrink: 0 }}/>
                        <span style={{ fontSize: 12, color: '#374151', flex: 1 }}>{s.name}</span>
                        <span style={{ fontSize: 12, fontWeight: 700, color: '#0F3460' }}>{s.pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ marginTop: 14, background: '#EDE9FE', borderRadius: 8, padding: '10px 14px',
                  borderLeft: '3px solid #7C3AED', fontSize: 12, color: '#7C3AED', lineHeight: 1.5 }}>
                  {es
                    ? '→ Médicos + exámenes + medicamentos = exactamente lo que SaludCompartida cubre.'
                    : '→ Doctors + exams + medications = exactly what SaludCompartida covers.'
                  }
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── CHART 2: Costo sin vs con SC ── */}
        {tab === 1 && (
          <div key="tab1" style={{ animation: 'fadeUp .2s ease' }}>

            {/* KPI strip */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 28 }}>
              {[
                { val: '+44%', desc: es ? 'Gasto extra en salud porque usan medicina privada (esperas largas en sistema público)' : 'Extra health spend because they use private medicine (long public system waits)', color: '#DC2626', bg: 'rgba(220,38,38,0.15)' },
                { val: '$640', desc: es ? 'Gasto mensual de bolsillo de la familia en salud sin SaludCompartida' : 'Monthly out-of-pocket family health spend without SaludCompartida', color: '#F97316', bg: 'rgba(249,115,22,0.12)' },
                { val: '$75',  desc: es ? 'Gasto mensual estimado de la familia en salud con SaludCompartida' : 'Estimated monthly family health spend with SaludCompartida', color: '#34D399', bg: 'rgba(52,211,153,0.15)' },
              ].map(({ val, desc, color, bg }) => (
                <div key={val} style={{ background: bg, borderRadius: 14, padding: '22px 22px', border: `1px solid ${color}30` }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 44, color, lineHeight: 1 }}>{val}</div>
                  <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)', lineHeight: 1.55, marginTop: 10 }}>{desc}</p>
                </div>
              ))}
            </div>

            {/* Grouped bar chart */}
            <div style={{ background: 'white', borderRadius: 16, padding: '28px 28px 20px' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#0F3460', marginBottom: 6 }}>
                {es ? 'Gasto de bolsillo por servicio (USD/visita)' : 'Out-of-pocket cost per service (USD/visit)'}
              </div>
              <div style={{ fontSize: 11, color: '#6B7280', marginBottom: 20 }}>
                {es ? 'Familia sin remesas vs familia con remesas (medicina privada) vs con SaludCompartida' : 'Family without remittances vs with remittances (private medicine) vs with SaludCompartida'}
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={gastoData} barGap={3} barCategoryGap="25%">
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false}/>
                  <XAxis dataKey="cat" tick={{ fontSize: 11, fill: '#6B7280' }} axisLine={false} tickLine={false}/>
                  <YAxis tick={{ fontSize: 11, fill: '#6B7280' }} axisLine={false} tickLine={false} tickFormatter={v => `$${v}`}/>
                  <Tooltip content={<CustomTooltip/>}/>
                  <Bar dataKey="sinRemesa" name={es ? 'Sin remesa (público)' : 'No remittance (public)'} fill="#94A3B8" radius={[4,4,0,0]}/>
                  <Bar dataKey="conRemesa" name={es ? 'Con remesa (privado)' : 'With remittance (private)'} fill="#FCA5A5" radius={[4,4,0,0]}/>
                  <Bar dataKey="conSC"     name={es ? 'Con SaludCompartida'  : 'With SaludCompartida'} fill="#059669" radius={[4,4,0,0]}/>
                </BarChart>
              </ResponsiveContainer>
              <div style={{ display: 'flex', gap: 20, justifyContent: 'center', marginTop: 12, flexWrap: 'wrap' }}>
                {[
                  { color: '#94A3B8', label: es ? 'Sin remesa (sistema público)' : 'No remittance (public system)' },
                  { color: '#FCA5A5', label: es ? 'Con remesa (medicina privada, +44%)' : 'With remittance (private medicine, +44%)' },
                  { color: '#059669', label: es ? 'Con SaludCompartida' : 'With SaludCompartida' },
                ].map(({ color, label }) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#6B7280' }}>
                    <div style={{ width: 10, height: 10, borderRadius: 2, background: color }}/>
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}


        {/* ── CHART 3: Tus empleados y la remesa ── */}
        {tab === 2 && (
          <div key="tab2" style={{ animation: 'fadeUp .2s ease' }}>

            {/* Slider */}
            <div style={{ background: 'white', borderRadius: 16, padding: '28px 32px', marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 6 }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
                    {es ? 'Total de empleados en tu empresa' : 'Total employees in your company'}
                  </div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 48, color: '#0F3460', lineHeight: 1 }}>{employees}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 11, color: '#6B7280', marginBottom: 4 }}>{es ? 'envían remesas a México' : 'send remittances to Mexico'}</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 48, color: '#006847', lineHeight: 1 }}>
                    {Math.round(employees * 0.78)}
                  </div>
                </div>
              </div>
              <input type="range" min={10} max={1000} step={10} value={employees}
                onChange={e => setEmployees(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#006847', margin: '12px 0 8px' }}/>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#9CA3AF' }}>
                <span>10</span><span>1,000</span>
              </div>
            </div>

            {/* Cascade: de la remesa al problema */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>

              {/* LEFT: La realidad hoy — el dinero que sale en salud */}
              <div style={{ background: 'white', borderRadius: 16, padding: 28 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#DC2626', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 20 }}>
                  {es ? 'Hoy — sin SaludCompartida' : 'Today — without SaludCompartida'}
                </div>

                {/* Flow cascade */}
                {[
                  {
                    num: Math.round(employees * 0.78),
                    unit: es ? 'empleados envían remesas' : 'employees send remittances',
                    sub: es ? `78% de tus ${employees} empleados` : `78% of your ${employees} employees`,
                    color: '#0F3460', bg: '#EEF2FF',
                    arrow: true,
                  },
                  {
                    num: `$${Math.round(employees * 0.78 * 393 * 0.10).toLocaleString()}`,
                    unit: es ? 'van a salud cada mes' : 'go to healthcare per month',
                    sub: es ? '10% de cada remesa · sistema público saturado → medicina privada' : '10% of each remittance · public system saturated → private medicine',
                    color: '#D97706', bg: '#FFFBEB',
                    arrow: true,
                  },
                  {
                    num: `$${Math.round(employees * 0.78 * 393 * 0.10 * 0.66).toLocaleString()}`,
                    unit: es ? 'en médicos, exámenes y medicamentos' : 'on doctors, exams and medications',
                    sub: es ? '66% del gasto en salud — exactamente lo que SC cubre' : '66% of health spend — exactly what SC covers',
                    color: '#DC2626', bg: '#FEF2F2',
                    arrow: false,
                  },
                ].map(({ num, unit, sub, color, bg, arrow }, i) => (
                  <div key={i}>
                    <div style={{ background: bg, borderRadius: 10, padding: '14px 16px', border: `1px solid ${color}20` }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
                        <span style={{ fontFamily: 'var(--font-display)', fontSize: 28, color, lineHeight: 1 }}>{num}</span>
                        <span style={{ fontSize: 12, color, fontWeight: 600 }}>{unit}</span>
                      </div>
                      <div style={{ fontSize: 11, color: '#6B7280', lineHeight: 1.4 }}>{sub}</div>
                    </div>
                    {arrow && (
                      <div style={{ display: 'flex', justifyContent: 'center', padding: '6px 0' }}>
                        <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
                          <path d="M8 0v16M2 10l6 8 6-8" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    )}
                  </div>
                ))}

                {/* Consequence */}
                <div style={{ marginTop: 14, background: '#FEF2F2', borderRadius: 10, padding: '14px 16px',
                  borderLeft: '3px solid #DC2626', display: 'flex', gap: 10 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
                    <path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
                  </svg>
                  <div style={{ fontSize: 12, color: '#DC2626', lineHeight: 1.55 }}>
                    {es
                      ? 'Cuando hay una emergencia, la familia llama al empleado en horario de trabajo. Estrés, distracción, ausentismo.'
                      : "When there's an emergency, the family calls the employee during work hours. Stress, distraction, absenteeism."
                    }
                  </div>
                </div>
              </div>

              {/* RIGHT: Con SaludCompartida — la tranquilidad */}
              <div style={{ background: 'white', borderRadius: 16, padding: 28, display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#006847', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 20 }}>
                  {es ? 'Con SaludCompartida' : 'With SaludCompartida'}
                </div>

                {/* What changes per family */}
                {[
                  {
                    icon: 'M15 10l4.553-2.069A1 1 0 0121 8.87V15.13a1 1 0 01-1.447.9L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z',
                    color: '#0891B2',
                    before: es ? 'Consulta privada: $80 USD' : 'Private consult: $80 USD',
                    after: es ? '$0 — videollamada 24/7 incluida' : '$0 — 24/7 video call included',
                  },
                  {
                    icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
                    color: '#D97706',
                    before: es ? 'Medicamentos: $120/mes' : 'Medications: $120/mo',
                    after: es ? 'Hasta 75% descuento en farmacia' : 'Up to 75% pharmacy discount',
                  },
                  {
                    icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
                    color: '#7C3AED',
                    before: es ? 'Terapia: $90/sesión (si la pagan)' : 'Therapy: $90/session (if they pay)',
                    after: es ? 'Terapia semanal incluida' : 'Weekly therapy included',
                  },
                  {
                    icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
                    color: '#0F3460',
                    before: es ? 'Adulto mayor: solo en casa' : 'Senior: alone at home',
                    after: es ? 'Lupita llama proactivamente cada día' : 'Lupita calls proactively every day',
                  },
                ].map(({ icon, color, before, after }, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 12, alignItems: 'flex-start' }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: `${color}15`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d={icon}/>
                      </svg>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 11, color: '#9CA3AF', textDecoration: 'line-through', marginBottom: 2 }}>{before}</div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: '#059669' }}>✓ {after}</div>
                    </div>
                  </div>
                ))}

                {/* The tranquilidad result */}
                <div style={{ marginTop: 'auto', background: '#ECFDF5', borderRadius: 10, padding: '16px 18px',
                  borderLeft: '3px solid #059669' }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#059669', marginBottom: 6 }}>
                    {es ? 'El resultado: tranquilidad real' : 'The result: real peace of mind'}
                  </div>
                  <p style={{ fontSize: 12, color: '#374151', lineHeight: 1.6, margin: 0 }}>
                    {es
                      ? `${Math.round(employees * 0.78)} empleados llegan a trabajar sabiendo que si hoy hay una emergencia en México, ya está cubierta. No necesitan llamar al banco. No necesitan pedir adelanto. No necesitan pensar en eso mientras trabajan.`
                      : `${Math.round(employees * 0.78)} employees come to work knowing that if there's an emergency in Mexico today, it's already covered. They don't need to call the bank. They don't need to ask for an advance. They don't need to think about it while working.`
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* Cost callout — simple, not ROI */}
            <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 12, padding: '18px 24px',
              border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
              <div style={{ fontSize: 14, color: 'white', fontWeight: 600 }}>
                {es
                  ? `Cubrir a los ${Math.round(employees * 0.78)} empleados que envían remesas:`
                  : `Covering the ${Math.round(employees * 0.78)} employees who send remittances:`
                }
              </div>
              <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, color: 'white', lineHeight: 1 }}>
                    ${(Math.round(employees * 0.78) * 18).toLocaleString()}
                  </div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)', fontWeight: 600, marginTop: 3 }}>
                    {es ? 'por mes' : 'per month'}
                  </div>
                </div>
                <div style={{ width: 1, height: 40, background: 'rgba(255,255,255,0.15)' }}/>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, color: '#6EE7B7', lineHeight: 1 }}>
                    ${(Math.round(employees * 0.78) * 18 * 12).toLocaleString()}
                  </div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)', fontWeight: 600, marginTop: 3 }}>
                    {es ? 'por año' : 'per year'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}


      </div>
    </div>
  )
}