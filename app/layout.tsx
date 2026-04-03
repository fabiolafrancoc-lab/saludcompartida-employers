import type { Metadata } from "next"
import "./globals.css"
import { LanguageProvider } from "@/contexts/LanguageContext"

export const metadata: Metadata = {
  title: "SaludCompartida — Beneficio laboral para tu fuerza laboral latina",
  description: "Telemedicina, farmacia, terapia y AI companion para las familias en México de tus empleados. Desde $18/mes.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
