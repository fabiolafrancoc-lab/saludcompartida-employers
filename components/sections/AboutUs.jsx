'use client'
import { useLang } from '@/contexts/LanguageContext'
import { translations as T, t } from '@/lib/translations'

const GOVERNANCE = [
  { name: 'Thomas Hayden',      role: 'Actuaría Global A&H',        org: 'Ex-AIG · Chubb · 40 años',        initials: 'TH' },
  { name: 'Lorena Fuentealba',  role: 'Distribución LATAM',         org: '20+ años canales regionales',      initials: 'LF' },
  { name: 'Matías Ramos',       role: 'Analytics & Sistemas',       org: '15+ años gestión de datos',        initials: 'MR' },
  { name: 'Dra. Gabriela Romo', role: 'Psicología Clínica',         org: 'Colaboración con Harvard',         initials: 'GR' },
  { name: 'Irene Arias Hofman', role: 'Ex-CEO IDB Lab',             org: 'Ex-IFC World Bank · $16B cartera', initials: 'IA' },
  { name: 'Ed Clancy',          role: 'Ex-Presidente Chubb A&H',   org: '30+ años mercados globales',       initials: 'EC' },
]

export default function AboutUs() {
  const { lang } = useLang()
  const a = T.about

  return (
    <div style={{ background: 'var(--sand)', animation: 'fadeUp .35s ease' }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '72px 48px' }}>

        <div style={{ maxWidth: 600, marginBottom: 56 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--emerald)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12 }}>
            {t(a.eyebrow, lang)}
          </div>
          <h2 style={{ fontSize: 42, marginBottom: 16 }}>{t(a.h2, lang)}</h2>
          <p style={{ fontSize: 16, color: 'var(--muted)' }}>{t(a.sub, lang)}</p>
        </div>

        {/* Story + Founder */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, marginBottom: 64, alignItems: 'start' }}>
          <div>
            {/* Emotional story — human connection trigger */}
            <div style={{ borderLeft: '3px solid var(--teal)', paddingLeft: 20, marginBottom: 28 }}>
              <h3 style={{ fontSize: 22, marginBottom: 14 }}>{t(a.storyTitle, lang)}</h3>
              <p style={{ fontSize: 14, color: 'var(--body)', lineHeight: 1.8, marginBottom: 14, fontStyle: 'italic' }}>
                "{t(a.story1, lang)}"
              </p>
            </div>
            <p style={{ fontSize: 14, color: 'var(--body)', lineHeight: 1.8, marginBottom: 14 }}>
              {t(a.story2, lang)}
            </p>
            <p style={{ fontSize: 14, color: 'var(--body)', lineHeight: 1.8 }}>
              <strong>{t(a.story3, lang)}</strong>
            </p>

            {/* Human proof — emotional anchor */}
            <div style={{ background: 'var(--emerald-light)', borderRadius: 10, padding: '16px 20px', marginTop: 24, border: '1px solid rgba(5,150,105,0.15)' }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--emerald)', marginBottom: 8 }}>
                {t(a.quoteLabel, lang)}
              </div>
              <p style={{ fontSize: 13, color: 'var(--body)', lineHeight: 1.7, fontStyle: 'italic' }}>
                {t(a.quote, lang)}
              </p>
              <div style={{ fontSize: 12, color: 'var(--emerald)', marginTop: 8, fontWeight: 500 }}>— Fabiola Franco, CEO</div>
            </div>
          </div>

          {/* Founder card — authority */}
          <div>
            <div style={{ background: 'var(--white)', borderRadius: 16, padding: 32, border: '1px solid var(--border)', marginBottom: 20 }}>
              <div style={{ fontSize: 11, color: 'var(--teal)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 }}>
                {t(a.founderLabel, lang)}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
                <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 600, color: 'white', fontFamily: 'var(--font-display)', flexShrink: 0 }}>
                  FF
                </div>
                <div>
                  <div style={{ fontSize: 18, fontFamily: 'var(--font-display)', color: 'var(--ink)' }}>Fabiola Franco</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)' }}>Founder & CEO · Tech Solution Services FVR LLC</div>
                </div>
              </div>
              <p style={{ fontSize: 13, color: 'var(--body)', lineHeight: 1.75, marginBottom: 18 }}>
                {t(a.founderBio, lang)}
              </p>
              {/* Brazil proof — concrete social proof */}
              <div style={{ background: 'var(--navy-light)', borderRadius: 10, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ textAlign: 'center', flexShrink: 0 }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, color: 'var(--navy)' }}>600K</div>
                  <div style={{ fontSize: 10, color: 'var(--navy)', opacity: 0.7, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Brasil 2019</div>
                </div>
                <div style={{ borderLeft: '1px solid rgba(15,52,96,0.15)', paddingLeft: 16 }}>
                  <p style={{ fontSize: 12, color: 'var(--navy)', lineHeight: 1.5 }}>
                    {lang === 'es' ? 'Suscriptores en 6 meses con el mismo modelo — crecimiento 100% orgánico. Esta no es teoría.' : 'Subscribers in 6 months with the same model — 100% organic growth. This is not theory.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Stats 3 */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
              {a.stats3.map(({ n, label, sub }) => (
                <div key={n} style={{ background: 'var(--white)', borderRadius: 10, padding: '16px 14px', border: '1px solid var(--border)', textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, color: 'var(--navy)', lineHeight: 1, marginBottom: 6 }}>{n}</div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink)', marginBottom: 3, lineHeight: 1.3 }}>{t(label, lang)}</div>
                  <div style={{ fontSize: 10, color: 'var(--muted)' }}>{t(sub, lang)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Governance Committee — authority trigger */}
        <div>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--navy)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>
              {t(a.govEyebrow, lang)}
            </div>
            <h3 style={{ fontSize: 28 }}>{t(a.govTitle, lang)}</h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
            {GOVERNANCE.map(({ name, role, org, initials }) => (
              <div key={name} style={{ background: 'var(--white)', borderRadius: 12, padding: '18px 20px', border: '1px solid var(--border)', display: 'flex', gap: 12, alignItems: 'center', transition: 'border-color .15s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--teal)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}>
                <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 600, color: 'white', flexShrink: 0 }}>
                  {initials}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 2 }}>{name}</div>
                  <div style={{ fontSize: 11, color: 'var(--teal)', fontWeight: 500 }}>{role}</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 1 }}>{org}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
