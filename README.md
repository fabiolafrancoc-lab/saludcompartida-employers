This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## Payment models

Each `group_policy` has a `payment_model` that determines how the benefit is funded:

| Model | Who pays | Use case |
|---|---|---|
| `company_100` | Employer covers 100% | Premium benefit — most attractive for employees |
| `split` | Employer X%, employee Y% via payroll deduction | Common in mid-size companies (e.g. 80/20) |
| `employee_100` | Employee pays 100% via payroll deduction | Voluntary benefit — no employer subsidy |

The `company_pct` + `employee_pct` columns always sum to 100%.
Invoice to PEO = `company_invoice_amount` only.
Payroll deduction = `employee_payroll_deduction` (PEO handles this internally).
