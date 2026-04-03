import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin, validateApiKey } from '@/lib/supabase'
import { Resend } from 'resend'
import type { EnrollmentPayload, ApiResponse } from '@/types/employer'

const resend = new Resend(process.env.RESEND_API_KEY)

const PLAN_PRICES: Record<string, number> = {
  familiar_basico: 18.00,
  familiar_premier: 22.00,
}

export async function POST(request: NextRequest) {
  // 1. Authenticate PEO request
  if (!validateApiKey(request)) {
    return NextResponse.json<ApiResponse>(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    )
  }

  // 2. Parse and validate payload
  let body: EnrollmentPayload
  try {
    body = await request.json()
  } catch {
    return NextResponse.json<ApiResponse>(
      { success: false, message: 'Invalid JSON payload' },
      { status: 400 }
    )
  }

  const required = ['peo_id','employer_id','employee_id','first_name','last_name','email','plan_start_date','plan_type']
  const missing = required.filter(f => !body[f as keyof EnrollmentPayload])
  if (missing.length > 0) {
    return NextResponse.json<ApiResponse>(
      { success: false, message: `Missing fields: ${missing.join(', ')}` },
      { status: 400 }
    )
  }

  // 3. Check for duplicate enrollment
  const { data: existing } = await supabaseAdmin
    .from('employer_subscriptions')
    .select('id')
    .eq('employee_id', body.employee_id)
    .eq('employer_id', body.employer_id)
    .eq('status', 'active')
    .single()

  if (existing) {
    return NextResponse.json<ApiResponse>(
      { success: false, message: 'Employee already enrolled' },
      { status: 409 }
    )
  }

  // 4. Create subscription in Supabase
  const { data: subscription, error } = await supabaseAdmin
    .from('employer_subscriptions')
    .insert({
      peo_id: body.peo_id,
      employer_id: body.employer_id,
      employee_id: body.employee_id,
      employee_first_name: body.first_name,
      employee_last_name: body.last_name,
      employee_email: body.email,
      plan_type: body.plan_type,
      unit_price: PLAN_PRICES[body.plan_type] ?? 18.00,
      plan_start_date: body.plan_start_date,
      status: 'active',
      enrolled_at: new Date().toISOString(),
    })
    .select()
    .single()

  if (error) {
    console.error('Supabase insert error:', error)
    return NextResponse.json<ApiResponse>(
      { success: false, message: 'Database error' },
      { status: 500 }
    )
  }

  // 5. Send welcome email to employee (in English)
  await resend.emails.send({
    from: 'SaludCompartida <noreply@saludcompartida.com>',
    to: body.email,
    subject: 'Your family benefit is now active — SaludCompartida',
    html: `
      <h2>Hi ${body.first_name},</h2>
      <p>Your employer has activated SaludCompartida for your family in Mexico.</p>
      <p>Your family can now access telemedicine, pharmacy discounts, therapy, and AI companionship.</p>
      <p><strong>To activate your family's account, forward this email to your family member in Mexico</strong> 
      and have them register at <a href="https://saludcompartida.app">saludcompartida.app</a> 
      using the code: <strong>${subscription.id}</strong></p>
      <p>Questions? Reply to this email.</p>
    `,
  })

  return NextResponse.json<ApiResponse>({
    success: true,
    message: 'Enrollment successful',
    data: { subscription_id: subscription.id }
  }, { status: 201 })
}
