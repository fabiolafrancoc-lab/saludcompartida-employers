'use client'
import { useLang } from '@/contexts/LanguageContext'
import { translations as T, t } from '@/lib/translations'

const NAVY_CARD = '#162040'

export default function AboutUs() {
  const { lang } = useLang()
  const es = lang === 'es'

  return (
    <div style={{ background: 'var(--sand)', animation: 'fadeUp .35s ease', color: 'white' }} className="on-green">
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '40px 48px' }}>

        {/* Header */}
        <div style={{ maxWidth: 640, marginBottom: 36 }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12 }}>
            {es ? 'Nuestra misión' : 'Our mission'}
          </div>
          <h2 style={{ fontSize: 36, color: 'white', fontWeight: 700, marginBottom: 16, lineHeight: 1.2 }}>
            {es
              ? <>El migrante cuida a su familia.<br /><span style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.85)' }}>SaludCompartida cuida al migrante.</span></>
              : <>The migrant cares for their family.<br /><span style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.85)' }}>SaludCompartida cares for the migrant.</span></>
            }
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.85)', fontWeight: 600, lineHeight: 1.75 }}>
            {es
              ? 'Existe una brecha fundamental entre lo que el trabajador migrante necesita y lo que el mercado le ofrece. Esa brecha tiene un costo enorme — para las familias y para las empresas que los contratan.'
              : 'There is a fundamental gap between what the migrant worker needs and what the market offers. That gap has an enormous cost — for families and for the companies that hire them.'
            }
          </p>
        </div>

        {/* The origin moment — Thaisa's story */}
        <div style={{ background: NAVY_CARD, borderRadius: 20, padding: '32px 40px', marginBottom: 24, border: '1px solid rgba(255,255,255,0.1)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 4, background: 'linear-gradient(180deg, #22D3EE, #006847)' }}/>
          <div style={{ fontSize: 11, fontWeight: 800, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 14 }}>
            {es ? 'El momento que lo cambió todo' : 'The moment that changed everything'}
          </div>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'white', fontWeight: 700, lineHeight: 1.4, marginBottom: 16, fontStyle: 'italic' }}>
            {es
              ? '"Thaisa Mamede esperó 8 meses en el sistema público para una colecistectomía. Cuando finalmente pudo operarse, entendí por qué estábamos haciendo esto."'
              : '"Thaisa Mamede waited 8 months in the public system for a cholecystectomy. When she could finally get the surgery, I understood why we were doing this."'
            }
          </p>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>
            — Fabiola Franco, Founder & CEO · {es ? 'Brasil, 2019' : 'Brazil, 2019'}
          </div>
        </div>

        {/* What we know — track record without startup language */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
          <div style={{ background: NAVY_CARD, borderRadius: 16, padding: '24px 26px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#22D3EE', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 }}>
              {es ? 'Lo que entendemos de este mercado' : 'What we understand about this market'}
            </div>
            {[
              {
                bold: es ? '25 años en seguros de salud en LATAM' : '25 years in LATAM health insurance',
                text: es ? '— sabemos exactamente cómo funcionan los sistemas de salud en México, qué falla, y qué necesita la base de la pirámide.' : '— we know exactly how healthcare systems work in Mexico, what fails, and what the base of the pyramid needs.',
              },
              {
                bold: es ? 'Probado a escala: 600,000 suscriptores en Brasil (2019)' : 'Proven at scale: 600,000 subscribers in Brazil (2019)',
                text: es ? '— con el mismo modelo de acceso a salud para trabajadores de bajos ingresos. No es teoría.' : '— with the same healthcare access model for low-income workers. This is not theory.',
              },
              {
                bold: es ? '8 países, 30+ socios de distribución' : '8 countries, 30+ distribution partners',
                text: es ? '— entendemos cómo construir y operar partnerships con PEOs, aseguradoras y canales de distribución masiva.' : '— we understand how to build and operate partnerships with PEOs, insurers, and mass distribution channels.',
              },
            ].map(({ bold, text }, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, marginBottom: i < 2 ? 14 : 0, alignItems: 'flex-start' }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22D3EE', flexShrink: 0, marginTop: 6 }}/>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', fontWeight: 600, lineHeight: 1.65, margin: 0 }}>
                  <strong style={{ color: 'white', fontWeight: 800 }}>{bold}</strong>{text}
                </p>
              </div>
            ))}
          </div>

          <div style={{ background: NAVY_CARD, borderRadius: 16, padding: '24px 26px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#34D399', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 }}>
              {es ? 'Por qué SaludCompartida puede entregar esto' : 'Why SaludCompartida can deliver this'}
            </div>
            {[
              {
                bold: es ? 'Infraestructura técnica propia construida' : 'Own technical infrastructure built',
                text: es ? '— plataforma activa hoy, no en construcción. saludcompartida.app y saludcompartida.ai operando en producción.' : '— platform active today, not under construction. saludcompartida.app and saludcompartida.ai operating in production.',
              },
              {
                bold: es ? 'Proveedor médico con responsabilidad cubierta' : 'Medical provider with covered liability',
                text: es ? '— Nuevo Método cubre la responsabilidad médica y de terapeutas. La estructura legal está confirmada.' : '— Nuevo Método covers medical and therapist liability. Legal structure is confirmed.',
              },
              {
                bold: es ? '16 códigos conductuales propietarios' : '16 proprietary behavioral codes',
                text: es ? '— desarrollados con sociólogos mexicanos, validados en campo. La IA de Lupita conecta culturalmente con el adulto mayor mexicano.' : '— developed with Mexican sociologists, validated in the field. Lupita\'s AI connects culturally with the Mexican senior.',
              },
            ].map(({ bold, text }, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, marginBottom: i < 2 ? 14 : 0, alignItems: 'flex-start' }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#34D399', flexShrink: 0, marginTop: 6 }}/>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', fontWeight: 600, lineHeight: 1.65, margin: 0 }}>
                  <strong style={{ color: 'white', fontWeight: 800 }}>{bold}</strong>{text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom: the commitment */}
        <div style={{ background: NAVY_CARD, borderRadius: 14, padding: '22px 28px', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'white', fontWeight: 700, lineHeight: 1.35, flex: 1, minWidth: 280, margin: 0 }}>
            {es
              ? 'No le pedimos a tu empresa que confíe en una promesa. Le pedimos que evalúe lo que ya está funcionando.'
              : 'We are not asking your company to trust a promise. We are asking you to evaluate what is already working.'
            }
          </p>
          <a href="/dashboard/demo" style={{
            background: '#006847', color: 'white',
            padding: '12px 28px', borderRadius: 8,
            fontSize: 14, fontWeight: 700,
            display: 'inline-flex', alignItems: 'center', gap: 8, flexShrink: 0,
          }}>
            {es ? 'Solicitar acceso' : 'Request access'}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
        </div>
      </div>
    </div>
  )
}
