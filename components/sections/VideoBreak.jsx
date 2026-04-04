'use client'
import { useState, useRef } from 'react'
import { useLang } from '@/contexts/LanguageContext'

/**
 * Full-bleed video/image break between sections.
 * Designed for maximum emotional impact at B2B decision-making moments.
 */
export default function VideoBreak({ variant = 'ninos' }) {
  const { lang } = useLang()
  const es = lang === 'es'
  const [playing, setPlaying] = useState(false)
  const iframeRef = useRef(null)

  const CONTENT = {
    ninos: {
      youtubeId: '4y3zSt9m2C0',
      thumb: '/thumb_ninos.jpg',
      eyebrow: { es: 'El resultado', en: 'The result' },
      headline: {
        es: <>Cuando la familia está protegida,<br /><em>el empleado llega libre</em></>,
        en: <>When the family is protected,<br /><em>the employee shows up free</em></>,
      },
      sub: {
        es: 'Libre de preocupaciones. Libre de emergencias inesperadas. Libre para dar lo mejor de sí.',
        en: 'Free from worry. Free from unexpected emergencies. Free to give their best.',
      },
      overlayFrom: 'rgba(0,104,71,0.72)',
      overlayTo: 'rgba(0,104,71,0)',
      textColor: 'white',
      align: 'left',
    },
    fiebre: {
      youtubeId: 'zjakLC1ipHc',
      thumb: '/thumb_fiebre.jpg',
      eyebrow: { es: 'La realidad de hoy', en: 'Today\'s reality' },
      headline: {
        es: <>Sola, a las 2am,<br /><em>sin saber a quién llamar</em></>,
        en: <>Alone, at 2am,<br /><em>not knowing who to call</em></>,
      },
      sub: {
        es: 'La esposa de tu empleado busca un médico online mientras sostiene a su hija con fiebre. Sin SaludCompartida, ese momento se convierte en pánico y en una llamada a Estados Unidos.',
        en: 'Your employee\'s wife searches for a doctor online while holding her feverish daughter. Without SaludCompartida, that moment becomes panic and a call to the United States.',
      },
      overlayFrom: 'rgba(15,52,96,0.78)',
      overlayTo: 'rgba(15,52,96,0.1)',
      textColor: 'white',
      align: 'right',
    },
  }

  const c = CONTENT[variant]
  const isRight = c.align === 'right'

  return (
    <div style={{ position: 'relative', height: '70vh', minHeight: 480, overflow: 'hidden', cursor: 'pointer' }}
      onClick={() => setPlaying(true)}>

      {/* Thumbnail / background */}
      {!playing && (
        <img src={c.thumb} alt=""
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
      )}

      {/* YouTube iframe (shown after click) */}
      {playing && (
        <iframe ref={iframeRef}
          src={`https://www.youtube.com/embed/${c.youtubeId}?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1`}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
          allow="autoplay; fullscreen" allowFullScreen />
      )}

      {/* Gradient overlay — fades from one side */}
      {!playing && (
        <div style={{
          position: 'absolute', inset: 0,
          background: isRight
            ? `linear-gradient(to left, ${c.overlayFrom} 0%, ${c.overlayFrom} 38%, ${c.overlayTo} 100%)`
            : `linear-gradient(to right, ${c.overlayFrom} 0%, ${c.overlayFrom} 38%, ${c.overlayTo} 100%)`,
        }} />
      )}

      {/* Content */}
      {!playing && (
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center',
          justifyContent: isRight ? 'flex-end' : 'flex-start',
          padding: '0 64px',
        }}>
          <div style={{ maxWidth: 480 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 16 }}>
              {c.eyebrow[lang] || c.eyebrow.es}
            </div>

            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 42, lineHeight: 1.15, color: 'white',
              marginBottom: 16, fontWeight: 400,
            }}>
              {c.headline[lang] || c.headline.es}
            </h2>

            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.82)', lineHeight: 1.75, marginBottom: 32 }}>
              {c.sub[lang] || c.sub.es}
            </p>

            {/* Play button */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{
                width: 56, height: 56, borderRadius: '50%',
                background: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(8px)',
                border: '2px solid rgba(255,255,255,0.4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all .2s',
                flexShrink: 0,
              }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.25)'; e.currentTarget.style.transform = 'scale(1.08)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; e.currentTarget.style.transform = 'scale(1)' }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M5 3.5l10 5.5-10 5.5V3.5z" fill="white"/>
                </svg>
              </div>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>
                {es ? 'Ver historia' : 'Watch story'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Close button when playing */}
      {playing && (
        <button onClick={e => { e.stopPropagation(); setPlaying(false) }}
          style={{
            position: 'absolute', top: 16, right: 16,
            width: 36, height: 36, borderRadius: '50%',
            background: 'rgba(0,0,0,0.5)', border: 'none',
            color: 'white', cursor: 'pointer', zIndex: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1l12 12M13 1L1 13" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      )}
    </div>
  )
}
