export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin, validateApiKey } from '@/lib/supabase'
import type { ApiResponse, MonthlyReportRow } from '@/types/employer'

export async function GET(request: NextRequest) {
  if (!validateApiKey(request)) {
    return NextResponse.json<ApiResponse>(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    )
  }

  const { searchParams } = new URL(request.url)
  const peoId = searchParams.get('peo_id')
  const month = searchParams.get('month') // format: 2026-05

  if (!peoId || !month) {
    return NextResponse.json<ApiResponse>(
      { success: false, message: 'Required: peo_id and month (YYYY-MM)' },
      { status: 400 }
    )
  }

  const [year, monthNum] = month.split('-').map(Number)
  const startDate = new Date(year, monthNum - 1, 1).toISOString().split('T')[0]
  const endDate = new Date(year, monthNum, 0).toISOString().split('T')[0]

  // Active on the first day of the month = billable
  const { data, error } = await supabaseAdmin
    .from('employer_subscriptions')
    .select('employer_id, plan_type, unit_price')
    .eq('peo_id', peoId)
    .eq('status', 'active')
    .lte('plan_start_date', startDate)
    .or(`cobra_end_date.is.null,cobra_end_date.gte.${startDate}`)

  if (error) {
    return NextResponse.json<ApiResponse>(
      { success: false, message: 'Database error' },
      { status: 500 }
    )
  }

  // Group by employer
  const grouped: Record<string, MonthlyReportRow> = {}
  let grandTotal = 0

  for (const row of data ?? []) {
    if (!grouped[row.employer_id]) {
      grouped[row.employer_id] = {
        employer_id: row.employer_id,
        employer_name: row.employer_id, // dashboard can enrich this
        active_count: 0,
        plan_type: row.plan_type,
        unit_price: row.unit_price,
        total: 0,
      }
    }
    grouped[row.employer_id].active_count += 1
    grouped[row.employer_id].total += row.unit_price
    grandTotal += row.unit_price
  }

  return NextResponse.json({
    success: true,
    message: `Billing report for ${month}`,
    data: {
      peo_id: peoId,
      billing_month: month,
      billing_period: `${startDate} to ${endDate}`,
      employers: Object.values(grouped),
      total_active_employees: data?.length ?? 0,
      grand_total_usd: Number(grandTotal.toFixed(2)),
    }
  })
}
