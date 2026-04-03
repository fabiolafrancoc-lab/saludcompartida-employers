# SaludCompartida — PEO Integration API Specification
**Version:** 1.0 | **Date:** 2026 | **Contact:** integrations@saludcompartida.com

---

## Overview

SaludCompartida provides healthcare benefits for the Mexico-based families of your Latino employees. This document specifies the API integration required to activate and manage employee enrollments.

**Base URL:** `https://employers.saludcompartida.com`
**Authentication:** Bearer token (provided by SaludCompartida after contract signing)

---

## What SaludCompartida needs from you

When an employee enrolls in SaludCompartida during open enrollment or at any time during the plan year, your system sends a POST request to our enrollment endpoint. We handle everything after that — account creation, welcome email, family activation.

---

## Credentials SaludCompartida provides to you

| Item | Description |
|---|---|
| `API_KEY` | Bearer token for all API calls |
| `peo_code` | Your unique PEO identifier (e.g., `SC-PEO-001`) |
| `policy_code` | One per employer you manage (e.g., `GA-2026-001`) |

---

## Endpoint 1 — Enroll an employee

**POST** `/api/employer/enroll`

### Request headers
```
Authorization: Bearer {API_KEY}
Content-Type: application/json
```

### Request body

```json
{
  "peo_code": "SC-PEO-001",
  "policy_code": "GA-2026-001",

  // Employee in the US — REQUIRED
  "employee_id_external": "EMP-98234",
  "first_name": "Carlos",
  "last_name": "Mendoza",
  "date_of_birth": "1985-03-12",
  "email": "carlos.mendoza@email.com",
  "whatsapp": "+17135550123",
  "plan_type": "familiar_basico",

  // Family member in Mexico — OPTIONAL at enrollment, can be added later
  "beneficiary": {
    "first_name": "María",
    "last_name": "Mendoza",
    "phone": "+525512345678",
    "email": "maria@email.com"
  }
}
```

### Field reference

| Field | Type | Required | Description |
|---|---|---|---|
| `peo_code` | string | ✅ | Your PEO code assigned by SaludCompartida |
| `policy_code` | string | ✅ | Employer's group policy code |
| `employee_id_external` | string | ✅ | Employee ID in your system. Must be unique within the policy. |
| `first_name` | string | ✅ | Employee's first name |
| `last_name` | string | ✅ | Employee's paternal last name |
| `date_of_birth` | string | ⬜ | ISO format: YYYY-MM-DD |
| `email` | string | ✅ | Employee's email — receives welcome message and support ID |
| `whatsapp` | string | ⬜ | Employee's US WhatsApp number with country code |
| `plan_type` | string | ⬜ | `familiar_basico` ($18/mo) or `familiar_premier` ($22/mo). Default: `familiar_basico` |
| `beneficiary.first_name` | string | ⬜ | Family member's first name in Mexico |
| `beneficiary.last_name` | string | ⬜ | Family member's paternal last name |
| `beneficiary.phone` | string | ⬜✅ | Mexico mobile number. Required if beneficiary block is sent. |
| `beneficiary.email` | string | ⬜ | Family member's email (optional) |

### Successful response (201)

```json
{
  "success": true,
  "message": "Enrollment successful",
  "data": {
    "sc_employee_id": "SC-202605-01000",
    "certificate_number": "GA-2026-001-0001",
    "enrollment_date": "2026-05-01",
    "free_period_end": "2026-05-31",
    "expiration_date": "2027-04-30",
    "plan_type": "familiar_basico"
  }
}
```

**Important:** Store `sc_employee_id` in your system. This is the ID the employee uses when contacting SaludCompartida support.

### Error responses

| Code | Meaning |
|---|---|
| 401 | Invalid or missing API key |
| 400 | Missing required fields — `message` lists which ones |
| 403 | PEO or policy is not active |
| 404 | `peo_code` or `policy_code` not found |
| 409 | Employee already enrolled — returns existing `sc_employee_id` |
| 500 | Internal error — contact integrations@saludcompartida.com |

---

## Endpoint 2 — Terminate an employee

Send this when an employee leaves the company. The employee's family in Mexico retains access for 30 days (COBRA window).

**POST** `/api/employer/terminate`

```json
{
  "peo_code": "SC-PEO-001",
  "policy_code": "GA-2026-001",
  "employee_id_external": "EMP-98234",
  "termination_date": "2026-06-15"
}
```

### Response (200)
```json
{
  "success": true,
  "message": "Termination processed. Family access ends 2026-07-15",
  "data": {
    "employee_id_external": "EMP-98234",
    "sc_employee_id": "SC-202605-01000",
    "termination_date": "2026-06-15",
    "cobra_end_date": "2026-07-15"
  }
}
```

---

## Endpoint 3 — Monthly billing report

Run this on the 1st of each month to see the invoice breakdown. SaludCompartida will also send a Shopify B2B invoice automatically.

**GET** `/api/employer/report?peo_code=SC-PEO-001&month=2026-05`

### Response (200)
```json
{
  "success": true,
  "data": {
    "peo_code": "SC-PEO-001",
    "billing_month": "2026-05",
    "policies": [
      {
        "policy_code": "GA-2026-001",
        "employer_name": "Marriott Houston",
        "active_employees": 87,
        "grace_employees": 12,
        "billable_employees": 75,
        "total_amount": 1350.00
      }
    ],
    "total_billable_employees": 75,
    "total_amount_usd": 1350.00,
    "commission_due": 162.00,
    "net_to_peo": 162.00
  }
}
```

---

## Timing requirements

| Event | When to send |
|---|---|
| New hire enrollment | Same day as open enrollment selection or new hire date |
| Voluntary termination | Within 24 hours of last day |
| Involuntary termination | Same day |
| Plan change (basic → premier) | Effective date of change |

---

## Testing

SaludCompartida provides a sandbox environment for integration testing:
- **Sandbox base URL:** `https://employers-staging.saludcompartida.com`
- **Test API key:** Provided separately
- **Test peo_code:** `SC-TEST-001`
- **Test policy_code:** `TEST-2026-001`

All sandbox data is reset weekly. No real emails are sent in sandbox mode.

---

## Support

- **Technical integration:** integrations@saludcompartida.com
- **Account management:** accounts@saludcompartida.com
- **Emergency (production issues):** +1-xxx-xxx-xxxx
