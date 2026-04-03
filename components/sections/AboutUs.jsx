const GOVERNANCE = [
  { name: 'Thomas Hayden',      role: 'Actuaría Global A&H', org: 'Ex-AIG · Chubb · 40 años' },
  { name: 'Lorena Fuentealba',  role: 'Distribución LATAM',  org: '20+ años canales regionales' },
  { name: 'Matías Ramos',       role: 'Analytics & Sistemas', org: '15+ años gestión de datos' },
  { name: 'Dra. Gabriela Romo', role: 'Psicología Clínica',  org: 'Colaboración con Harvard' },
  { name: 'Irene Arias Hofman', role: 'Ex-CEO IDB Lab',      org: 'Ex-IFC World Bank · $16B cartera' },
  { name: 'Ed Clancy',          role: 'Ex-Presidente Chubb A&H', org: '30+ años mercados globales' },
]

export default function AboutUs() {
  return (
    <section id="nosotros" style={{ padding: '96px 5%' }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>

        {/* Section title */}
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--growth)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>
            Quiénes somos
          </div>
          <h2 style={{ fontSize: 42, marginBottom: 16 }}>La historia detrás de SaludCompartida</h2>
          <p style={{ fontSize: 17, color: 'var(--muted)', maxWidth: 620, margin: '0 auto' }}>
            No somos una startup tecnológica que descubrió un mercado. Somos el resultado de 25 años viendo de cerca el problema que queremos resolver.
          </p>
        </div>

        {/* Story grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, marginBottom: 72, alignItems: 'start' }}>

          {/* Origin story */}
          <div>
            <div style={{ width: 52, height: 52, background: 'var(--trust-light)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--trust)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2C8.5 2 5 5 5 8.8c0 5 7 11.2 7 11.2s7-6.2 7-11.2C19 5 15.5 2 12 2z"/>
                <circle cx="12" cy="8.5" r="3"/>
              </svg>
            </div>
            <h3 style={{ fontSize: 24, marginBottom: 16, color: 'var(--ink)' }}>La motivación que nadie ve</h3>
            <p style={{ fontSize: 15, color: 'var(--body)', lineHeight: 1.8, marginBottom: 16 }}>
              Para el migrante en los Estados Unidos, cada remesa llega con una ansiedad invisible: <em>"¿Tendrá mamá para su medicina este mes? ¿Y si papá necesita al cardiólogo? ¿Y si mi hija se enferma y ya no queda dinero?"</em>
            </p>
            <p style={{ fontSize: 15, color: 'var(--body)', lineHeight: 1.8, marginBottom: 16 }}>
              Ese miedo constante — ese riesgo financiero mensual — cuesta más que dinero. Cuesta sueño. Cuesta concentración en el trabajo. Cuesta la capacidad de construir una vida en un país nuevo mientras se cuida a seres queridos a miles de kilómetros.
            </p>
            <p style={{ fontSize: 15, color: 'var(--body)', lineHeight: 1.8 }}>
              <strong>SaludCompartida elimina una gran parte de esa carga.</strong> No solo proveemos servicios de salud — proveemos certeza. Proveemos dignidad. Proveemos la tranquilidad de saber que tu familia tiene acceso a atención de calidad, pase lo que pase.
            </p>
          </div>

          {/* Founder + Brazil proof */}
          <div>
            <div style={{ background: 'var(--ink)', borderRadius: 20, padding: 36, color: 'white', marginBottom: 24 }}>
              <div style={{ fontSize: 11, color: 'var(--clarity)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>
                Fundadora & CEO
              </div>
              <h3 style={{ fontSize: 22, color: 'white', marginBottom: 14, fontFamily: 'var(--font-display)' }}>Fabiola Franco</h3>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.75, marginBottom: 20 }}>
                25 años en la industria de seguros de salud en LATAM — Citibank, ALICO, ACE, Chubb, AIG. VP en AIG con P&amp;L propio, distribución en 8 países, 30+ socios estratégicos.
              </p>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.75, marginBottom: 20 }}>
                En 2019 demostró que el modelo funciona: <strong style={{ color: 'var(--clarity)' }}>600,000 suscriptores en 6 meses en Brasil</strong>. No fue suerte — fue la validación de una tesis de 25 años.
              </p>
              <div style={{ background: 'rgba(6,182,212,0.15)', borderRadius: 10, padding: '14px 16px', border: '1px solid rgba(6,182,212,0.3)' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--clarity)', marginBottom: 4 }}>600K</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>suscriptores en 6 meses · Brasil 2019 · crecimiento orgánico</div>
              </div>
            </div>

            <div style={{ background: 'var(--growth-light)', borderRadius: 16, padding: 24, border: '1px solid rgba(5,150,105,0.2)' }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--growth)', marginBottom: 8 }}>La prueba humana que importa</div>
              <p style={{ fontSize: 13, color: 'var(--body)', lineHeight: 1.7, fontStyle: 'italic' }}>
                "Thaisa Mamede está recibiendo su colecistectomía 4 días después de esperar 8 meses en el sistema público. Eso no es un estudio de caso — ese es el momento en que mi misión se cristalizó."
              </p>
              <div style={{ fontSize: 12, color: 'var(--growth)', marginTop: 8, fontWeight: 500 }}>— Fabiola Franco, CEO</div>
            </div>
          </div>
        </div>

        {/* What we believe */}
        <div style={{ background: 'var(--surface)', borderRadius: 20, padding: 48, marginBottom: 64, textAlign: 'center' }}>
          <h3 style={{ fontSize: 28, marginBottom: 16, color: 'var(--ink)' }}>Lo que nos diferencia</h3>
          <p style={{ fontSize: 16, color: 'var(--body)', maxWidth: 680, margin: '0 auto 32px', lineHeight: 1.8 }}>
            La mayoría de las soluciones de salud para migrantes fallan porque están diseñadas por personas que nunca han sentido lo que significa mandar una remesa con miedo. Nosotros construimos SaludCompartida desde adentro del problema — con neurociencia, experiencia en seguros y tecnología de clase mundial.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              { n: '16', label: 'Códigos conductuales propietarios', sub: 'Desarrollados con sociólogos mexicanos' },
              { n: '25+', label: 'Años de experiencia en seguros LATAM', sub: 'P&L owner, 8 países, 30+ socios' },
              { n: '10', label: 'Países en la hoja de ruta', sub: 'México primero, luego LATAM e India' },
            ].map(({ n, label, sub }) => (
              <div key={n} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 44, color: 'var(--trust)', lineHeight: 1, marginBottom: 8 }}>{n}</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)', marginBottom: 4 }}>{label}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)' }}>{sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Governance committee */}
        <div>
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--trust)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>
              Comité de Gobierno
            </div>
            <h3 style={{ fontSize: 28 }}>Las personas detrás del producto</h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {GOVERNANCE.map(({ name, role, org }) => (
              <div key={name} style={{ background: 'white', borderRadius: 12, padding: '20px 22px', border: '1px solid var(--border)', display: 'flex', gap: 14, alignItems: 'center' }}>
                <div style={{
                  width: 44, height: 44, borderRadius: '50%',
                  background: 'var(--trust-light)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 14, fontWeight: 600, color: 'var(--trust)',
                  flexShrink: 0,
                }}>
                  {name.split(' ').map(w => w[0]).slice(0, 2).join('')}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)', marginBottom: 2 }}>{name}</div>
                  <div style={{ fontSize: 12, color: 'var(--clarity)', fontWeight: 500 }}>{role}</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 1 }}>{org}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
