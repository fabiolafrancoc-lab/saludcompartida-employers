'use client'
import { useState } from 'react'

export default function VideoPlayer({ videoId, thumbnail, label, aspectRatio = '16/9' }) {
  const [playing, setPlaying] = useState(false)

  return (
    <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden',
      aspectRatio, background: '#000', cursor: 'pointer' }}
      onClick={() => setPlaying(true)}>

      {!playing ? (
        <>
          {/* Thumbnail */}
          <img
            src={thumbnail || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
            alt={label || 'Video'}
            style={{ width: '100%', height: '100%', objectFit: 'cover',
              display: 'block', transition: 'transform .4s ease', filter: 'brightness(0.85)' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          />
          {/* Dark gradient overlay */}
          <div style={{ position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)' }}/>

          {/* Play button */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 72, height: 72, borderRadius: '50%',
            background: 'rgba(255,255,255,0.95)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            transition: 'transform .2s, box-shadow .2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.08)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.4)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.3)' }}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <path d="M6 4.5l14 7.5-14 7.5V4.5z" fill="#0F3460"/>
            </svg>
          </div>

          {/* Label */}
          {label && (
            <div style={{
              position: 'absolute', bottom: 18, left: 20, right: 20,
              color: 'white', fontSize: 14, fontWeight: 600,
              fontFamily: 'var(--font-display)',
              textShadow: '0 1px 4px rgba(0,0,0,0.5)',
              lineHeight: 1.3,
            }}>
              {label}
            </div>
          )}
        </>
      ) : (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
          allow="autoplay; encrypted-media; fullscreen"
          allowFullScreen
        />
      )}
    </div>
  )
}
