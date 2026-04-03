export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

type BillingRow = {
  policy_id: string
  policy_code: string
  employer_name: string
  payment_model: string
  company_pct: number
  employee_pct: number
  peo_code: string
  peo_name: string
  commission_rate: number
  active_employees: number
  total_plan_value: number
  company_invoice_amount: number
  employee_payroll_deduction: number
  peo_commission: number
}

// Se ejecuta el día 1 de cada mes vía Vercel Cron
// Vercel Cron config en vercel.json:
// { "crons": [{ "path": "/api/billing/generate", "schedule": "0 8 1 * *" }] }
// (día 1 de cada mes a las 8am UTC)

export async function POST(request: NextRequest) {

  // Verificar que viene del cron de Vercel (no una llamada externa)
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const now = new Date()
  const billingMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`

  // 1. Obtener el reporte de facturación desde la vista de Supabase
  const { data: billingRows, error } = await supabaseAdmin
    .from('v_monthly_billing_detail')
    .select('*')

  if (error || !billingRows?.length) {
    console.error('Billing query error:', error)
    return NextResponse.json({ error: 'No billing data' }, { status: 500 })
  }

  const rows = billingRows as BillingRow[]

  // 2. Agrupar por PEO — un invoice por PEO
  const byPeo: Record<string, BillingRow[]> = {}
  for (const row of rows) {
    if (!byPeo[row.peo_code]) byPeo[row.peo_code] = []
    byPeo[row.peo_code].push(row)
  }

  const results = []

  for (const [peoCode, rows] of Object.entries(byPeo)) {

    const totalAmount = rows.reduce((sum, r) => sum + Number(r.company_invoice_amount), 0)
    const totalEmployees = rows.reduce((sum, r) => sum + Number(r.active_employees), 0)
    const totalCommission = rows.reduce((sum, r) => sum + Number(r.peo_commission), 0)

    // 3. Crear invoice en Shopify B2B via Admin API
    const shopifyInvoice = await createShopifyInvoice({
      peoCode,
      billingMonth,
      rows,
      totalAmount,
    })

    // 4. Guardar en Supabase — una fila por empresa dentro del PEO
    for (const row of rows) {
      await supabaseAdmin
        .from('monthly_invoices')
        .upsert({
          policy_id:                row.policy_id,
          peo_id:                   row.policy_id,  // join needed — simplified
          billing_month:            billingMonth,
          active_employees:         row.active_employees,
          total_amount:             row.total_plan_value,
          commission_amount:        row.peo_commission,
          net_amount:               row.company_invoice_amount,
          payment_status:           'invoiced',
          shopify_invoice_id:       shopifyInvoice?.id ?? null,
          invoice_date:             now.toISOString().split('T')[0],
        }, { onConflict: 'policy_id,billing_month' })
    }

    results.push({
      peo_code:         peoCode,
      billing_month:    billingMonth,
      total_employees:  totalEmployees,
      total_amount:     totalAmount,
      commission:       totalCommission,
      shopify_id:       shopifyInvoice?.id,
    })
  }

  return NextResponse.json({
    success: true,
    billing_month: billingMonth,
    invoices_generated: results.length,
    results,
  })
}

async function createShopifyInvoice({
  peoCode,
  billingMonth,
  rows,
  totalAmount,
}: {
  peoCode: string
  billingMonth: string
  rows: any[]
  totalAmount: number
}) {
  const shopifyUrl = `https://${process.env.SHOPIFY_STORE_URL}/admin/api/2024-01/draft_orders.json`

  // Líneas del invoice — una por empresa cliente
  const lineItems = rows.map(row => ({
    title: `SaludCompartida — ${row.employer_name}`,
    quantity: row.active_employees,
    price: (row.company_invoice_amount / row.active_employees).toFixed(2),
    properties: [
      { name: 'Período',  value: billingMonth },
      { name: 'Póliza',   value: row.policy_code },
      { name: 'Empleados activos', value: row.active_employees.toString() },
    ],
  }))

  const body = {
    draft_order: {
      line_items: lineItems,
      note: `Factura mensual SaludCompartida · PEO: ${peoCode} · Período: ${billingMonth}`,
      tags: `peo-invoice,${peoCode},${billingMonth}`,
      payment_terms: {
        payment_terms_name: 'Net 30',
        payment_terms_type: 'NET',
        due_in_days: 30,
      },
    }
  }

  try {
    const res = await fetch(shopifyUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': process.env.SHOPIFY_ADMIN_API_TOKEN!,
      },
      body: JSON.stringify(body),
    })
    const data = await res.json()
    return data.draft_order
  } catch (err) {
    console.error('Shopify invoice creation failed:', err)
    return null
  }
}
