'use client'
import Link from 'next/link'
import { useLang } from '@/contexts/LanguageContext'
import { translations as T, t } from '@/lib/translations'

export default function Footer() {
  const { lang } = useLang()
  const f = T.footer

  return (
    <footer style={{ background: 'var(--ink)', color: 'rgba(255,255,255,0.7)', padding: '64px 5% 32px' }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, marginBottom: 48 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, var(--clarity), var(--action))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M10 2C7 2 4 5.2 4 8.8c0 5 6 9.2 6 9.2s6-4.2 6-9.2C16 5.2 13 2 10 2z" fill="white" opacity="0.9"/><circle cx="10" cy="8.5" r="2.8" fill="white"/></svg>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, color: 'white' }}>SaludCompartida</div>
                <div style={{ fontSize: 10, color: 'var(--clarity)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>For Employers</div>
              </div>
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.7, marginBottom: 20, maxWidth: 280 }}>{t(f.tagline, lang)}</p>
            <div style={{ fontSize: 13 }}>
              <div>ffranco@saludcompartida.com</div>
              <div style={{ marginTop: 4 }}>+1 305 522 7150</div>
              <div style={{ marginTop: 4, color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>Tech Solution Services FVR LLC · Florida</div>
            </div>
          </div>
          {[
            { label: f.sections.portal, links: f.portalLinks },
            { label: f.sections.company, links: f.companyLinks },
            { label: f.sections.legal, links: f.legalLinks },
          ].map(({ label, links }) => (
            <div key={label.es}>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'white', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>{t(label, lang)}</div>
              {links.map((link) => (
                <div key={link.href} style={{ marginBottom: 10 }}>
                  <a href={link.href} style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', transition: 'color .2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'white'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}>
                    {t(link, lang)}
                  </a>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>{t(f.copy, lang)}</div>
          <div style={{ display: 'flex', gap: 16 }}>
            {['saludcompartida.com','saludcompartida.app'].map(domain => (
              <a key={domain} href={`https://${domain}`} style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', transition: 'color .2s' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--clarity)'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.3)'}>
                {domain}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
