export type PlanType = 'familiar_basico' | 'familiar_premier'

export interface EnrollmentPayload {
  event: 'enrollment'
  peo_id: string
  employer_id: string
  employee_id: string
  first_name: string
  last_name: string
  email: string
  plan_start_date: string // ISO: 2026-05-01
  plan_type: PlanType
}

export interface TerminationPayload {
  event: 'termination'
  peo_id: string
  employer_id: string
  employee_id: string
  termination_date: string // ISO
}

export interface MonthlyReportRow {
  employer_id: string
  employer_name: string
  active_count: number
  plan_type: PlanType
  unit_price: number
  total: number
}

export interface ApiResponse {
  success: boolean
  message: string
  data?: Record<string, unknown>
}
