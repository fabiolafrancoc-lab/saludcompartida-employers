export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { Resend } from 'resend'

function getResend() { return new Resend(process.env.RESEND_API_KEY) }


export async function POST(request: NextRequest) {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => cookieStore.getAll(), setAll: () => {} } }
  )

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const {
    category, subject, description,
    sc_employee_id, reporter_name, reporter_email, reporter_whatsapp,
    help_section_key, video_was_shown, video_was_watched,
    peo_id, policy_id,
  } = body

  // Get reporter role from portal users
  const { data: portalUser } = await supabase
    .from('employer_portal_users')
    .select('role, peo_id, policy_id')
    .eq('auth_user_id', user.id)
    .single()

  const { data: ticket, error } = await supabase
    .from('support_tickets')
    .insert({
      channel: 'employer_portal',
      reporter_role: portalUser?.role ?? 'employer_hr',
      peo_id: peo_id ?? portalUser?.peo_id,
      policy_id: policy_id ?? portalUser?.policy_id,
      sc_employee_id: sc_employee_id ?? null,
      reporter_name, reporter_email, reporter_whatsapp,
      category, subject, description,
      priority: category === 'billing' ? 'high' : 'normal',
      help_section_key: help_section_key ?? null,
      video_was_shown: video_was_shown ?? false,
      video_was_watched: video_was_watched ?? false,
      status: 'open',
    })
    .select()
    .single()

  if (error || !ticket) {
    return NextResponse.json({ error: 'Failed to create ticket' }, { status: 500 })
  }

  // Notify support team
  await getResend().emails.send({
    from: 'SaludCompartida Support <support@saludcompartida.ai>',
    to: 'soporte@saludcompartida.com',
    subject: `[${ticket.ticket_number}] ${category.toUpperCase()} — ${subject}`,
    html: `
      <p><strong>Ticket:</strong> ${ticket.ticket_number}</p>
      <p><strong>Category:</strong> ${category} | <strong>Priority:</strong> ${ticket.priority}</p>
      <p><strong>From:</strong> ${reporter_name} (${reporter_email})</p>
      ${sc_employee_id ? `<p><strong>SC Employee ID:</strong> ${sc_employee_id}</p>` : ''}
      <p><strong>Description:</strong><br>${description}</p>
      <p><strong>Video shown:</strong> ${video_was_shown ? 'Yes' : 'No'} |
         <strong>Video watched:</strong> ${video_was_watched ? 'Yes' : 'No'}</p>
    `,
  })

  // Auto-reply to reporter
  if (reporter_email) {
    await getResend().emails.send({
      from: 'SaludCompartida <support@saludcompartida.ai>',
      to: reporter_email,
      subject: `Support request received — ${ticket.ticket_number}`,
      html: `
        <p>Hi ${reporter_name},</p>
        <p>We received your support request. Our team will respond within 24 hours.</p>
        <p><strong>Your ticket number: ${ticket.ticket_number}</strong></p>
        <p>Reference this number in any follow-up communication.</p>
      `,
    })
  }

  return NextResponse.json({
    success: true,
    ticket_number: ticket.ticket_number,
  }, { status: 201 })
}
