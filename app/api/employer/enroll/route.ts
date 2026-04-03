import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin, validateApiKey } from '@/lib/supabase'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

interface EnrollPayload {
  peo_code: string
  policy_code: string
  employee_id_external: string
  first_name: string
  last_name: string
  date_of_birth?: string
  email: string
  whatsapp?: string
  plan_type?: 'familiar_basico' | 'familiar_premier'
  beneficiary?: {
    first_name: string
    last_name: string
    phone: string
    email?: string
  }
}

export async function POST(request: NextRequest) {
  if (!validateApiKey(request)) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
  }

  let body: EnrollPayload
  try { body = await request.json() }
  catch { return NextResponse.json({ success: false, message: 'Invalid JSON' }, { status: 400 }) }

  const required = ['peo_code','policy_code','employee_id_external','first_name','last_name','email']
  const missing = required.filter(f => !body[f as keyof EnrollPayload])
  if (missing.length > 0) {
    return NextResponse.json({ success: false, message: `Missing: ${missing.join(', ')}` }, { status: 400 })
  }

  const { data: peo } = await supabaseAdmin.from('peos').select('id,name,status').eq('peo_code', body.peo_code).single()
  if (!peo) return NextResponse.json({ success: false, message: `PEO not found: ${body.peo_code}` }, { status: 404 })
  if (peo.status !== 'active') return NextResponse.json({ success: false, message: `PEO is ${peo.status}` }, { status: 403 })

  const { data: policy } = await supabaseAdmin.from('group_policies')
    .select('id,policy_code,employer_name,expiration_date,free_period_days,status')
    .eq('policy_code', body.policy_code).eq('peo_id', peo.id).single()
  if (!policy) return NextResponse.json({ success: false, message: `Policy not found: ${body.policy_code}` }, { status: 404 })
  if (policy.status !== 'active') return NextResponse.json({ success: false, message: `Policy is ${policy.status}` }, { status: 403 })

  const { data: existing } = await supabaseAdmin.from('employee_certificates')
    .select('sc_employee_id').eq('employee_id_external', body.employee_id_external)
    .eq('policy_id', policy.id).neq('status', 'terminated').single()
  if (existing) {
    return NextResponse.json({ success: false, message: 'Already enrolled', data: { sc_employee_id: existing.sc_employee_id } }, { status: 409 })
  }

  const today = new Date()
  const enrollmentDate = today.toISOString().split('T')[0]
  const freePeriodEnd = new Date(today)
  freePeriodEnd.setDate(freePeriodEnd.getDate() + (policy.free_period_days ?? 30))

  const { count } = await supabaseAdmin.from('employee_certificates')
    .select('*', { count: 'exact', head: true }).eq('policy_id', policy.id)
  const certificateNumber = `${policy.policy_code}-${String((count ?? 0) + 1).padStart(4, '0')}`

  const { data: cert, error: certErr } = await supabaseAdmin.from('employee_certificates').insert({
    certificate_number: certificateNumber,
    policy_id: policy.id,
    peo_id: peo.id,
    employee_id_external: body.employee_id_external,
    first_name: body.first_name,
    last_name: body.last_name,
    date_of_birth: body.date_of_birth ?? null,
    email: body.email,
    whatsapp: body.whatsapp ?? null,
    plan_type: body.plan_type ?? 'familiar_basico',
    enrollment_date: enrollmentDate,
    free_period_end: freePeriodEnd.toISOString().split('T')[0],
    effective_date: enrollmentDate,
    expiration_date: policy.expiration_date,
    status: 'grace',
  }).select().single()

  if (certErr || !cert) {
    console.error(certErr)
    return NextResponse.json({ success: false, message: 'Database error' }, { status: 500 })
  }

  if (body.beneficiary) {
    await supabaseAdmin.from('mexico_beneficiaries').insert({
      certificate_id: cert.id,
      first_name: body.beneficiary.first_name,
      last_name: body.beneficiary.last_name,
      email: body.beneficiary.email ?? null,
      phone: body.beneficiary.phone,
      status: 'pending',
    })
  }

  await resend.emails.send({
    from: 'SaludCompartida <noreply@saludcompartida.com>',
    to: body.email,
    subject: `Your family benefit is active — ID: ${cert.sc_employee_id}`,
    html: `<h2>Hi ${body.first_name},</h2>
<p><strong>${policy.employer_name}</strong> has activated SaludCompartida for your family in Mexico.</p>
<p><strong>Your support ID: ${cert.sc_employee_id}</strong> — save this for any support requests.</p>
<p>Certificate: ${certificateNumber} | 30-day free period ends: ${freePeriodEnd.toISOString().split('T')[0]}</p>
<p>Share this link with your family in Mexico to activate their account:<br>
<a href="https://saludcompartida.app/activate?code=${cert.id}">saludcompartida.app/activate</a></p>`,
  })

  return NextResponse.json({
    success: true,
    message: 'Enrollment successful',
    data: {
      sc_employee_id: cert.sc_employee_id,
      certificate_number: certificateNumber,
      enrollment_date: enrollmentDate,
      free_period_end: freePeriodEnd.toISOString().split('T')[0],
      expiration_date: policy.expiration_date,
      plan_type: body.plan_type ?? 'familiar_basico',
    }
  }, { status: 201 })
}
