'use client'
import { useLang } from '@/contexts/LanguageContext'
import { translations as T, t } from '@/lib/translations'

export default function AboutUs() {
  const { lang } = useLang()
  const es = lang === 'es'
  const a = T.about

  return (
    <div style={{ background: 'var(--sand)', animation: 'fadeUp .35s ease', color: 'white' }} className="on-green">
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '72px 48px' }}>

        {/* Header */}
        <div style={{ maxWidth: 640, marginBottom: 56 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--emerald)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12 }}>
            {t(a.eyebrow, lang)}
          </div>
          <h2 style={{ fontSize: 42, marginBottom: 16 }}>{t(a.h2, lang)}</h2>
          <p style={{ fontSize: 16, color: 'var(--muted)' }}>{t(a.sub, lang)}</p>
        </div>

        {/* Story — the human motivation */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, marginBottom: 64, alignItems: 'start' }}>

          <div>
            {/* Origin story */}
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

            {/* Human proof quote */}
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

          {/* Founder card — stripped of credentials, focused on mission */}
          <div style={{ background: 'var(--white)', borderRadius: 16, padding: 32, border: '1px solid var(--border)' }}>
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
            <p style={{ fontSize: 13, color: 'var(--body)', lineHeight: 1.75, marginBottom: 20 }}>
              {t(a.founderBio, lang)}
            </p>

            {/* What we built — focused on the product */}
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: 20 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--navy)', marginBottom: 12 }}>
                {es ? 'Lo que construimos' : 'What we built'}
              </div>
              {[
                {
                  icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
                  text: es ? '16 códigos conductuales propietarios para conectar emocionalmente con familias mexicanas' : '16 proprietary behavioral codes to emotionally connect with Mexican families',
                },
                {
                  icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
                  text: es ? 'Lupita: la primera IA de acompañamiento emocional diseñada culturalmente para el adulto mayor mexicano' : 'Lupita: the first AI emotional companion culturally designed for the Mexican senior',
                },
                {
                  icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
                  text: es ? 'Acceso a telemedicina, farmacia y terapia — activo en 30 segundos, sin trámites, sin seguros' : 'Access to telemedicine, pharmacy, and therapy — active in 30 seconds, no paperwork, no insurance',
                },
              ].map(({ icon, text }, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, marginBottom: i < 2 ? 12 : 0, alignItems: 'flex-start' }}>
                  <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--teal-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d={icon}/>
                    </svg>
                  </div>
                  <span style={{ fontSize: 12, color: 'var(--body)', lineHeight: 1.55 }}>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Why this matters — the mission */}
        <div style={{ background: 'var(--navy)', borderRadius: 20, padding: 48, textAlign: 'center', color: 'white' }} className="on-dark">
          <h3 style={{ fontSize: 28, color: 'white', marginBottom: 16, fontFamily: 'var(--font-display)' }}>
            {t(a.diffTitle, lang)}
          </h3>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.9)', fontWeight: 500, maxWidth: 680, margin: '0 auto', lineHeight: 1.8 }}>
            {t(a.diffP, lang)}
          </p>
        </div>
      </div>
    </div>
  )
}
