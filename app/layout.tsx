import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "SaludCompartida — Beneficio laboral para empleados latinos",
  description: "Telemedicina, farmacia, terapia y acompañamiento AI para las familias en México de tus empleados. Desde $18/mes.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body style={{ margin:0, padding:0 }}>{children}</body>
    </html>
  )
}
