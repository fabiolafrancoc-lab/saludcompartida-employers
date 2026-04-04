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
    { label: es ? 'ROI para tu empresa'     : 'ROI for your company' },
  ]

  return (
    <div style={{ background: 'var(--sand)', animation: 'fadeUp .35s ease', color: 'white' }} className="on-green">
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '72px 48px' }}>

        {/* Header */}
        <div style={{ maxWidth: 580, marginBottom: 44 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12 }}>
            {es ? 'Datos que importan' : 'Data that matters'}
          </div>
          <h2 style={{ fontSize: 42, color: 'white', marginBottom: 14 }}>
            {es ? 'El impacto en números reales' : 'The impact in real numbers'}
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.75)', lineHeight: 1.65 }}>
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
              color: tab === i ? 'var(--sand)' : 'rgba(255,255,255,0.8)',
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
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', lineHeight: 1.55, margin: '10px 0 8px' }}>{label}</p>
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

        {/* ── CHART 3: ROI para la empresa ── */}
        {tab === 2 && (
          <div key="tab2" style={{ animation: 'fadeUp .2s ease' }}>
            {/* Slider */}
            <div style={{ background: 'white', borderRadius: 16, padding: 32, marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 500, color: '#374151' }}>
                  {es ? 'Empleados latinos en tu empresa' : 'Latino employees in your company'}
                </span>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 36, color: '#0F3460' }}>{employees}</span>
              </div>
              <input type="range" min={10} max={500} step={10} value={employees}
                onChange={e => setEmployees(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#006847', marginBottom: 28 }}/>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
                {[
                  { label: es ? 'Costo SC / año' : 'SC cost / year', val: `$${annualSC.toLocaleString()}`, color: '#0891B2', bg: '#E0F7FA' },
                  { label: es ? 'Empleados retenidos est.' : 'Est. employees retained', val: `+${retained}`, color: '#059669', bg: '#ECFDF5' },
                  { label: es ? 'Ahorro en rotación' : 'Turnover savings', val: `$${savedTurnover.toLocaleString()}`, color: '#0F3460', bg: '#EEF2FF' },
                  { label: 'ROI', val: `${roi}%`, color: roi >= 0 ? '#059669' : '#DC2626', bg: roi >= 0 ? '#ECFDF5' : '#FEF2F2' },
                ].map(({ label, val, color, bg }) => (
                  <div key={label} style={{ background: bg, borderRadius: 10, padding: '16px 14px', textAlign: 'center' }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, color, lineHeight: 1 }}>{val}</div>
                    <div style={{ fontSize: 11, color, opacity: 0.8, marginTop: 6, lineHeight: 1.3 }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Area chart */}
            <div style={{ background: 'white', borderRadius: 16, padding: '28px 28px 16px' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#0F3460', marginBottom: 4 }}>
                {es ? 'Costo SC vs ahorro en retención por tamaño de empresa' : 'SC cost vs retention savings by company size'}
              </div>
              <div style={{ fontSize: 11, color: '#6B7280', marginBottom: 20 }}>
                {es ? 'El ahorro supera el costo a partir de ~25 empleados' : 'Savings exceed cost starting at ~25 employees'}
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={roiData} barGap={4}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false}/>
                  <XAxis dataKey="n" tick={{ fontSize: 11, fill: '#6B7280' }} axisLine={false} tickLine={false}
                    label={{ value: es ? 'empleados' : 'employees', position: 'insideBottom', offset: -2, fontSize: 10, fill: '#9CA3AF' }}/>
                  <YAxis tick={{ fontSize: 11, fill: '#6B7280' }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}K`}/>
                  <Tooltip content={<CustomTooltip/>}/>
                  <Bar dataKey={es ? 'Costo SC' : 'SC cost'} fill="#0891B2" radius={[4,4,0,0]}/>
                  <Bar dataKey={es ? 'Ahorro rotación' : 'Turnover savings'} fill="#059669" radius={[4,4,0,0]}/>
                </BarChart>
              </ResponsiveContainer>
              <div style={{ display: 'flex', gap: 20, justifyContent: 'center', marginTop: 10 }}>
                {[{ color: '#0891B2', label: es ? 'Costo SC/año' : 'SC cost/year' }, { color: '#059669', label: es ? 'Ahorro en retención' : 'Retention savings' }].map(({ color, label }) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#6B7280' }}>
                    <div style={{ width: 10, height: 10, borderRadius: 2, background: color }}/>{label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
