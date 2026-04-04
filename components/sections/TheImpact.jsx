'use client'
import { useState } from 'react'
import { useLang } from '@/contexts/LanguageContext'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, AreaChart, Area, Cell, ReferenceLine,
} from 'recharts'

// ── Custom tooltip shared style
const TooltipBox = ({ active, payload, label, prefix = '', suffix = '' }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: 8, padding: '10px 14px', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
      <div style={{ fontSize: 11, color: '#6B7280', marginBottom: 4 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ fontSize: 14, fontWeight: 600, color: p.color || '#0F3460' }}>
          {prefix}{typeof p.value === 'number' ? p.value.toLocaleString() : p.value}{suffix}
        </div>
      ))}
    </div>
  )
}

export default function TheImpact() {
  const { lang } = useLang()
  const es = lang === 'es'

  // ── CHART 1: ROI Calculator — slider controls employees
  const [employees, setEmployees] = useState(100)
  const turnoverRate = 0.25
  const replaceCost = 5200
  const annualCost = employees * 18 * 12
  const retentionGain = Math.round(employees * turnoverRate * 0.15) // 15% retention improvement
  const savedCost = retentionGain * replaceCost
  const roi = Math.round((savedCost - annualCost) / annualCost * 100)

  const roiData = [50, 100, 200, 500, 1000].map(n => ({
    n: n.toLocaleString(),
    [es ? 'Costo SC/año' : 'SC cost/year']: n * 18 * 12,
    [es ? 'Ahorro retención' : 'Retention savings']: Math.round(n * turnoverRate * 0.15 * replaceCost),
  }))

  // ── CHART 2: Absenteeism — before/after monthly
  const absentData = [
    { mes: es ? 'Ene' : 'Jan', antes: 4.2, despues: 2.8 },
    { mes: es ? 'Feb' : 'Feb', antes: 3.8, despues: 2.5 },
    { mes: es ? 'Mar' : 'Mar', antes: 4.5, despues: 2.9 },
    { mes: es ? 'Abr' : 'Apr', antes: 4.1, despues: 2.6 },
    { mes: es ? 'May' : 'May', antes: 3.9, despues: 2.4 },
    { mes: es ? 'Jun' : 'Jun', antes: 4.3, despues: 2.7 },
    { mes: es ? 'Jul' : 'Jul', antes: 4.6, despues: 2.8 },
    { mes: es ? 'Ago' : 'Aug', antes: 4.0, despues: 2.5 },
    { mes: es ? 'Sep' : 'Sep', antes: 4.2, despues: 2.6 },
    { mes: es ? 'Oct' : 'Oct', antes: 3.7, despues: 2.3 },
    { mes: es ? 'Nov' : 'Nov', antes: 4.4, despues: 2.7 },
    { mes: es ? 'Dic' : 'Dec', antes: 4.1, despues: 2.5 },
  ]

  // ── CHART 3: Financial exposure — what family pays vs with SC
  const expenseData = [
    { category: es ? 'Médico general' : 'General doctor', sinSC: 80, conSC: 0 },
    { category: es ? 'Farmacia/mes' : 'Pharmacy/mo', sinSC: 120, conSC: 35 },
    { category: es ? 'Terapia' : 'Therapy', sinSC: 90, conSC: 0 },
    { category: es ? 'Especialista' : 'Specialist', sinSC: 150, conSC: 40 },
    { category: es ? 'Urgencia menor' : 'Minor ER', sinSC: 200, conSC: 0 },
  ]

  // ── Active chart tab
  const [activeChart, setActiveChart] = useState(0)

  const CHARTS = [
    { id: 0, label: es ? 'ROI por empresa' : 'ROI by company' },
    { id: 1, label: es ? 'Reducción ausentismo' : 'Absenteeism reduction' },
    { id: 2, label: es ? 'Ahorro por familia' : 'Savings per family' },
  ]

  return (
    <div style={{ background: 'var(--sand)', animation: 'fadeUp .35s ease' }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '72px 48px' }}>

        {/* Header */}
        <div style={{ maxWidth: 560, marginBottom: 44 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--emerald)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12 }}>
            {es ? 'Datos concretos' : 'Concrete data'}
          </div>
          <h2 style={{ fontSize: 42, marginBottom: 14 }}>
            {es ? 'El impacto en números' : 'The impact in numbers'}
          </h2>
          <p style={{ fontSize: 16, color: 'var(--muted)', lineHeight: 1.65 }}>
            {es
              ? 'Tres perspectivas de datos para que tu equipo tome la decisión correcta.'
              : 'Three data perspectives to help your team make the right decision.'
            }
          </p>
        </div>

        {/* Chart tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 32 }}>
          {CHARTS.map(c => (
            <button key={c.id} onClick={() => setActiveChart(c.id)} style={{
              padding: '9px 20px', borderRadius: 8,
              border: activeChart === c.id ? '2px solid var(--navy)' : '2px solid var(--border)',
              background: activeChart === c.id ? 'var(--navy)' : 'var(--white)',
              color: activeChart === c.id ? 'white' : 'var(--muted)',
              fontSize: 13, fontWeight: activeChart === c.id ? 600 : 400,
              cursor: 'pointer', transition: 'all .15s',
            }}>
              {c.label}
            </button>
          ))}
        </div>

        {/* ── CHART 1: ROI Calculator ── */}
        {activeChart === 0 && (
          <div key="roi" style={{ animation: 'fadeUp .2s ease' }}>
            {/* Slider */}
            <div style={{ background: 'white', borderRadius: 16, padding: 32, border: '1px solid var(--border)', marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--body)' }}>
                  {es ? 'Empleados latinos en tu empresa' : 'Latino employees in your company'}
                </span>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 32, color: 'var(--navy)' }}>{employees}</span>
              </div>
              <input type="range" min={10} max={500} step={10} value={employees}
                onChange={e => setEmployees(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--navy)', height: 6, marginBottom: 24 }}
              />
              {/* KPIs */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
                {[
                  { label: es ? 'Costo SC/año' : 'SC cost/year', val: `$${(annualCost).toLocaleString()}`, color: 'var(--teal)', bg: 'var(--teal-light)' },
                  { label: es ? 'Empleados retenidos' : 'Employees retained', val: `+${retentionGain}`, color: 'var(--emerald)', bg: 'var(--emerald-light)' },
                  { label: es ? 'Ahorro rotación' : 'Turnover savings', val: `$${savedCost.toLocaleString()}`, color: 'var(--navy)', bg: 'var(--navy-light)' },
                  { label: 'ROI', val: `${roi}%`, color: roi > 0 ? 'var(--emerald)' : 'var(--loss)', bg: roi > 0 ? 'var(--emerald-light)' : 'var(--loss-light)' },
                ].map(({ label, val, color, bg }) => (
                  <div key={label} style={{ background: bg, borderRadius: 10, padding: '14px 16px', textAlign: 'center' }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 26, color, lineHeight: 1 }}>{val}</div>
                    <div style={{ fontSize: 11, color, opacity: 0.8, marginTop: 6, lineHeight: 1.3 }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bar chart */}
            <div style={{ background: 'white', borderRadius: 16, padding: '28px 28px 16px', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 20 }}>
                {es ? 'Costo SC vs ahorro en retención por tamaño de empresa' : 'SC cost vs retention savings by company size'}
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={roiData} barGap={4}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false}/>
                  <XAxis dataKey="n" tick={{ fontSize: 11, fill: '#6B7280' }} axisLine={false} tickLine={false}
                    label={{ value: es ? 'empleados' : 'employees', position: 'insideBottom', offset: -2, fontSize: 11, fill: '#9CA3AF' }}/>
                  <YAxis tick={{ fontSize: 11, fill: '#6B7280' }} axisLine={false} tickLine={false}
                    tickFormatter={v => `$${(v/1000).toFixed(0)}K`}/>
                  <Tooltip content={<TooltipBox prefix="$" />}/>
                  <Bar dataKey={es ? 'Costo SC/año' : 'SC cost/year'} fill="#0891B2" radius={[4,4,0,0]}/>
                  <Bar dataKey={es ? 'Ahorro retención' : 'Retention savings'} fill="#059669" radius={[4,4,0,0]}/>
                </BarChart>
              </ResponsiveContainer>
              <div style={{ display: 'flex', gap: 20, justifyContent: 'center', marginTop: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--muted)' }}>
                  <div style={{ width: 10, height: 10, borderRadius: 2, background: '#0891B2' }}/>
                  {es ? 'Costo SC/año' : 'SC cost/year'}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--muted)' }}>
                  <div style={{ width: 10, height: 10, borderRadius: 2, background: '#059669' }}/>
                  {es ? 'Ahorro en retención' : 'Retention savings'}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── CHART 2: Absenteeism ── */}
        {activeChart === 1 && (
          <div key="absent" style={{ animation: 'fadeUp .2s ease' }}>
            {/* KPIs */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 24 }}>
              {[
                { label: es ? 'Días ausentes promedio (sin SC)' : 'Avg absent days (without SC)', val: '4.2', unit: es ? 'días/mes' : 'days/mo', color: 'var(--loss)', bg: 'var(--loss-light)' },
                { label: es ? 'Días ausentes promedio (con SC)' : 'Avg absent days (with SC)', val: '2.6', unit: es ? 'días/mes' : 'days/mo', color: 'var(--emerald)', bg: 'var(--emerald-light)' },
                { label: es ? 'Reducción de ausentismo' : 'Absenteeism reduction', val: '38%', unit: es ? 'menos ausencias' : 'fewer absences', color: 'var(--navy)', bg: 'var(--navy-light)' },
              ].map(({ label, val, unit, color, bg }) => (
                <div key={label} style={{ background: bg, borderRadius: 12, padding: '20px 22px' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 38, color, lineHeight: 1 }}>{val}</div>
                  <div style={{ fontSize: 11, color, opacity: 0.8, margin: '4px 0 6px' }}>{unit}</div>
                  <div style={{ fontSize: 12, color: 'var(--body)', lineHeight: 1.4 }}>{label}</div>
                </div>
              ))}
            </div>

            {/* Area chart */}
            <div style={{ background: 'white', borderRadius: 16, padding: '28px 28px 16px', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 20 }}>
                {es ? 'Días de ausentismo mensual — antes y después de implementar SaludCompartida' : 'Monthly absenteeism days — before and after implementing SaludCompartida'}
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={absentData}>
                  <defs>
                    <linearGradient id="gradBefore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#DC2626" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="#DC2626" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="gradAfter" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#059669" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="#059669" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false}/>
                  <XAxis dataKey="mes" tick={{ fontSize: 11, fill: '#6B7280' }} axisLine={false} tickLine={false}/>
                  <YAxis tick={{ fontSize: 11, fill: '#6B7280' }} axisLine={false} tickLine={false}
                    domain={[0, 6]} tickFormatter={v => `${v}d`}/>
                  <Tooltip content={({ active, payload, label }) => {
                    if (!active || !payload?.length) return null
                    return (
                      <div style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: 8, padding: '10px 14px' }}>
                        <div style={{ fontSize: 11, color: '#6B7280', marginBottom: 6 }}>{label}</div>
                        {payload.map((p, i) => (
                          <div key={i} style={{ fontSize: 13, fontWeight: 600, color: p.color, marginBottom: 2 }}>
                            {p.name}: {p.value}d
                          </div>
                        ))}
                      </div>
                    )
                  }}/>
                  <Area type="monotone" dataKey="antes" name={es ? 'Sin SC' : 'Without SC'}
                    stroke="#DC2626" strokeWidth={2} fill="url(#gradBefore)" strokeDasharray="4 2"/>
                  <Area type="monotone" dataKey="despues" name={es ? 'Con SC' : 'With SC'}
                    stroke="#059669" strokeWidth={2.5} fill="url(#gradAfter)"/>
                </AreaChart>
              </ResponsiveContainer>
              <div style={{ display: 'flex', gap: 20, justifyContent: 'center', marginTop: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--muted)' }}>
                  <div style={{ width: 18, height: 2, background: '#DC2626', borderRadius: 2 }}/>
                  {es ? 'Sin SaludCompartida' : 'Without SaludCompartida'}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--muted)' }}>
                  <div style={{ width: 18, height: 2, background: '#059669', borderRadius: 2 }}/>
                  {es ? 'Con SaludCompartida' : 'With SaludCompartida'}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── CHART 3: Family savings ── */}
        {activeChart === 2 && (
          <div key="savings" style={{ animation: 'fadeUp .2s ease' }}>
            {/* KPI strip */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 24 }}>
              {[
                { label: es ? 'Gasto familia sin SC/mes' : 'Family spend without SC/mo', val: '$640', color: 'var(--loss)', bg: 'var(--loss-light)' },
                { label: es ? 'Gasto familia con SC/mes' : 'Family spend with SC/mo', val: '$75', color: 'var(--emerald)', bg: 'var(--emerald-light)' },
                { label: es ? 'Ahorro mensual para el empleado' : 'Monthly savings for employee', val: '$565', color: 'var(--navy)', bg: 'var(--navy-light)' },
              ].map(({ label, val, color, bg }) => (
                <div key={label} style={{ background: bg, borderRadius: 12, padding: '20px 22px' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 38, color, lineHeight: 1 }}>{val}</div>
                  <div style={{ fontSize: 12, color: 'var(--body)', lineHeight: 1.4, marginTop: 8 }}>{label}</div>
                </div>
              ))}
            </div>

            {/* Bar chart comparison */}
            <div style={{ background: 'white', borderRadius: 16, padding: '28px 28px 16px', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 20 }}>
                {es ? 'Gasto de bolsillo de la familia en México — sin vs con SaludCompartida (USD)' : 'Out-of-pocket family spend in Mexico — without vs with SaludCompartida (USD)'}
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={expenseData} layout="vertical" barGap={4} margin={{ left: 20, right: 30 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" horizontal={false}/>
                  <XAxis type="number" tick={{ fontSize: 11, fill: '#6B7280' }} axisLine={false} tickLine={false}
                    tickFormatter={v => `$${v}`}/>
                  <YAxis type="category" dataKey="category" tick={{ fontSize: 12, fill: '#374151' }} axisLine={false} tickLine={false} width={90}/>
                  <Tooltip content={<TooltipBox prefix="$" />}/>
                  <Bar dataKey="sinSC" name={es ? 'Sin SC' : 'Without SC'} fill="#FCA5A5" radius={[0,4,4,0]}>
                    {expenseData.map((_, i) => <Cell key={i} fill="#FCA5A5"/>)}
                  </Bar>
                  <Bar dataKey="conSC" name={es ? 'Con SC' : 'With SC'} fill="#6EE7B7" radius={[0,4,4,0]}>
                    {expenseData.map((entry, i) => <Cell key={i} fill={entry.conSC === 0 ? '#A7F3D0' : '#059669'}/>)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div style={{ display: 'flex', gap: 20, justifyContent: 'center', marginTop: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--muted)' }}>
                  <div style={{ width: 10, height: 10, borderRadius: 2, background: '#FCA5A5' }}/>
                  {es ? 'Sin SaludCompartida' : 'Without SaludCompartida'}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--muted)' }}>
                  <div style={{ width: 10, height: 10, borderRadius: 2, background: '#059669' }}/>
                  {es ? 'Con SaludCompartida' : 'With SaludCompartida'}
                </div>
              </div>
            </div>

            <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 12, textAlign: 'center', lineHeight: 1.5 }}>
              {es
                ? '* Estimaciones basadas en promedios del mercado mexicano. Los valores reales dependen de la frecuencia de uso y la región.'
                : '* Estimates based on Mexican market averages. Actual values depend on usage frequency and region.'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
