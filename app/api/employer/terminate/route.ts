import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin, validateApiKey } from '@/lib/supabase'
import type { TerminationPayload, ApiResponse } from '@/types/employer'

const COBRA_DAYS = 30

export async function POST(request: NextRequest) {
  if (!validateApiKey(request)) {
    return NextResponse.json<ApiResponse>(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    )
  }

  let body: TerminationPayload
  try {
    body = await request.json()
  } catch {
    return NextResponse.json<ApiResponse>(
      { success: false, message: 'Invalid JSON payload' },
      { status: 400 }
    )
  }

  const required = ['peo_id','employer_id','employee_id','termination_date']
  const missing = required.filter(f => !body[f as keyof TerminationPayload])
  if (missing.length > 0) {
    return NextResponse.json<ApiResponse>(
      { success: false, message: `Missing fields: ${missing.join(', ')}` },
      { status: 400 }
    )
  }

  // Calculate COBRA window — family keeps access 30 days after termination
  const terminationDate = new Date(body.termination_date)
  const cobraEndDate = new Date(terminationDate)
  cobraEndDate.setDate(cobraEndDate.getDate() + COBRA_DAYS)

  const { data, error } = await supabaseAdmin
    .from('employer_subscriptions')
    .update({
      status: 'terminating',
      termination_date: body.termination_date,
      cobra_end_date: cobraEndDate.toISOString().split('T')[0],
      terminated_at: new Date().toISOString(),
    })
    .eq('employee_id', body.employee_id)
    .eq('employer_id', body.employer_id)
    .eq('status', 'active')
    .select()
    .single()

  if (error || !data) {
    return NextResponse.json<ApiResponse>(
      { success: false, message: 'Subscription not found or already terminated' },
      { status: 404 }
    )
  }

  return NextResponse.json<ApiResponse>({
    success: true,
    message: `Termination processed. Family access ends ${cobraEndDate.toISOString().split('T')[0]}`,
    data: {
      employee_id: body.employee_id,
      termination_date: body.termination_date,
      cobra_end_date: cobraEndDate.toISOString().split('T')[0],
    }
  })
}
