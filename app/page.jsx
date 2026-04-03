import Navbar       from '@/components/ui/Navbar'
import Hero         from '@/components/sections/Hero'
import HowItWorks   from '@/components/sections/HowItWorks'
import Benefits     from '@/components/sections/Benefits'
import PaymentModels from '@/components/sections/PaymentModels'
import AboutUs      from '@/components/sections/AboutUs'
import FAQ          from '@/components/sections/FAQ'
import Footer       from '@/components/ui/Footer'

export const metadata = {
  title: 'SaludCompartida — Beneficio laboral para tu fuerza laboral latina',
  description: 'Telemedicina, farmacia, terapia y acompañamiento AI para las familias en México de tus empleados. Desde $18/mes por empleado.',
}

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <Benefits />
        <PaymentModels />
        <AboutUs />
        <FAQ />
      </main>
      <Footer />
    </>
  )
}
