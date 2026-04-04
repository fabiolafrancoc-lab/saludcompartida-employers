/**
 * SaludCompartida — Custom SVG Icon System
 * All icons designed specifically for each concept.
 * Style: 24×24 viewBox · stroke-based · 1.6px weight · round caps
 */

const base = { fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' }

/* ── SERVICES ─────────────────────────────────────────── */

/** Videollamada con médico: pantalla + cruz médica + persona */
export function IconTelemedicina({ size = 24, color = 'currentColor', strokeWidth = 1.6 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} stroke={color} strokeWidth={strokeWidth}>
      {/* Pantalla / monitor */}
      <rect x="2" y="4" width="15" height="11" rx="2" />
      {/* Persona en pantalla */}
      <circle cx="9.5" cy="8" r="1.8" />
      <path d="M6 14.5c0-1.9 1.6-3.3 3.5-3.3s3.5 1.4 3.5 3.3" />
      {/* Cámara lateral (videollamada) */}
      <path d="M17 8.5l3.5-2v7l-3.5-2" />
      {/* Cruz médica flotante arriba derecha */}
      <path d="M19.5 2.5v3M18 4h3" strokeWidth="1.8" />
      {/* Base pantalla */}
      <path d="M8 15v2.5M16 15v2.5M6 17.5h12" />
    </svg>
  )
}

/** Farmacia: frasco de medicamento + descuento */
export function IconFarmacia({ size = 24, color = 'currentColor', strokeWidth = 1.6 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} stroke={color} strokeWidth={strokeWidth}>
      {/* Frasco */}
      <path d="M9 3h6v3.5c1.5.8 2.5 2.3 2.5 4V19a2 2 0 01-2 2H8.5a2 2 0 01-2-2v-8.5C6.5 9.1 7.5 7.6 9 6.8V3z" />
      {/* Etiqueta del frasco */}
      <rect x="8" y="11" width="8" height="5" rx="1" />
      {/* Cruz en etiqueta */}
      <path d="M12 12.5v2M11 13.5h2" strokeWidth="1.4" />
      {/* % descuento */}
      <circle cx="19" cy="5" r="2.5" />
      <path d="M17.2 6.8l3.6-3.6" strokeWidth="1.2" />
      <circle cx="18" cy="4" r="0.4" fill={color} stroke="none" />
      <circle cx="20" cy="6" r="0.4" fill={color} stroke="none" />
    </svg>
  )
}

/** Terapia: cabeza humana + corazón + burbuja de diálogo */
export function IconTerapia({ size = 24, color = 'currentColor', strokeWidth = 1.6 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} stroke={color} strokeWidth={strokeWidth}>
      {/* Cabeza / perfil */}
      <circle cx="9" cy="8" r="3.5" />
      <path d="M4 21c0-3.3 2.2-6 5-6s5 2.7 5 6" />
      {/* Burbuja de diálogo */}
      <path d="M14 3h5.5a1.5 1.5 0 011.5 1.5v5a1.5 1.5 0 01-1.5 1.5H15l-1.5 2V11" />
      {/* Corazón dentro de burbuja */}
      <path d="M16.5 6c.4-.8 1.6-.8 2 0 .4.8-.3 1.6-1 2.1-.7-.5-1.4-1.3-1-2.1z" fill={color} stroke="none" />
    </svg>
  )
}

/** Lupita AI: teléfono + ondas de voz + corazón */
export function IconLupita({ size = 24, color = 'currentColor', strokeWidth = 1.6 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} stroke={color} strokeWidth={strokeWidth}>
      {/* Teléfono */}
      <rect x="5" y="2" width="10" height="17" rx="2" />
      <circle cx="10" cy="17" r="0.8" fill={color} stroke="none" />
      <path d="M8 4.5h4" strokeWidth="1.2" />
      {/* Ondas de voz saliendo */}
      <path d="M17 8c1 .8 1.5 2 1.5 3.2S18 13.5 17 14.4" />
      <path d="M19 6.5c1.7 1.3 2.6 3.2 2.6 5s-.9 3.7-2.6 5" />
      {/* Corazón en pantalla */}
      <path d="M8.5 10.5c.3-.7 1.3-.7 1.5 0 .3-.7 1.2-.7 1.5 0 .3.6-.2 1.2-.7 1.7l-.8.7-.8-.7c-.5-.5-1-1.1-.7-1.7z" fill={color} stroke="none" />
    </svg>
  )
}

/* ── NAVIGATION ───────────────────────────────────────── */

/** Inicio: casa con corazón en puerta */
export function IconInicio({ size = 24, color = 'currentColor', strokeWidth = 1.6 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} stroke={color} strokeWidth={strokeWidth}>
      <path d="M3 11L12 3l9 8" />
      <path d="M5 9.5V20a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1V9.5" />
      <path d="M10.8 13.5c.2-.5.9-.5 1.2 0 .2-.5.9-.5 1.2 0 .2.4-.1.8-.5 1.1l-.7.6-.7-.6c-.4-.3-.7-.7-.5-1.1z" fill={color} stroke="none" />
    </svg>
  )
}

/** El Problema: familia bajo nube de tormenta */
export function IconProblema({ size = 24, color = 'currentColor', strokeWidth = 1.6 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} stroke={color} strokeWidth={strokeWidth}>
      {/* Dos siluetas (familia) */}
      <circle cx="8" cy="14" r="2" />
      <path d="M5 21c0-1.7 1.3-3 3-3s3 1.3 3 3" />
      <circle cx="15" cy="15" r="1.5" />
      <path d="M12.5 21c0-1.4 1.1-2.5 2.5-2.5s2.5 1.1 2.5 2.5" />
      {/* Nube de tormenta encima */}
      <path d="M7 10.5c0-2.5 1.8-4.5 4-4.5 1.4 0 2.7.7 3.4 1.8.4-.2.8-.3 1.1-.3 1.4 0 2.5 1.1 2.5 2.5 0 .2 0 .3-.1.5" />
      {/* Rayo */}
      <path d="M14 6.5l-1.5 3.5h2.5l-2 4" strokeWidth="1.8" />
    </svg>
  )
}

/** Cómo funciona: tres engranajes conectados */
export function IconComo({ size = 24, color = 'currentColor', strokeWidth = 1.6 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} stroke={color} strokeWidth={strokeWidth}>
      {/* Engranaje grande izquierda */}
      <circle cx="7" cy="13" r="2.5" />
      <path d="M7 9.5v1M7 15v1M4.5 11.5l.7.7M9.8 14.8l.7.7M3.5 13H4.5M9.5 13h1M4.5 14.8l.7-.7M9.8 11.2l.7-.7" strokeWidth="1.3" />
      {/* Engranaje pequeño arriba derecha */}
      <circle cx="16" cy="7" r="2" />
      <path d="M16 4v.8M16 9.2V10M14 5.5l.6.6M17.4 8.9l.6.6M13.5 7h.8M17.7 7h.8M14 8.5l.6-.6M17.4 5.1l.6-.6" strokeWidth="1.1" />
      {/* Conexión / cadena entre engranajes */}
      <path d="M10 11.5c1-2.5 3-3.5 5-4" strokeDasharray="1.5 1.5" strokeWidth="1.2" />
    </svg>
  )
}

/** Beneficios: cuatro pétalos / nodo de servicios */
export function IconBeneficios({ size = 24, color = 'currentColor', strokeWidth = 1.6 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} stroke={color} strokeWidth={strokeWidth}>
      {/* Centro */}
      <circle cx="12" cy="12" r="2" />
      {/* 4 pétalos / servicios */}
      <path d="M12 10C12 7 9.5 5 9.5 5S8 8 10 10" />
      <path d="M14 12C17 12 19 9.5 19 9.5S16 8 14 10" />
      <path d="M12 14C12 17 14.5 19 14.5 19S16 16 14 14" />
      <path d="M10 12C7 12 5 14.5 5 14.5S8 16 10 14" />
    </svg>
  )
}

/** Impacto: gráfica de barras con flecha ascendente */
export function IconImpacto({ size = 24, color = 'currentColor', strokeWidth = 1.6 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} stroke={color} strokeWidth={strokeWidth}>
      {/* Ejes */}
      <path d="M4 19h16M4 19V5" />
      {/* Barras */}
      <rect x="6" y="13" width="3" height="6" rx="0.5" fill={color} fillOpacity="0.2" />
      <rect x="11" y="9" width="3" height="10" rx="0.5" fill={color} fillOpacity="0.3" />
      <rect x="16" y="5.5" width="3" height="13.5" rx="0.5" fill={color} fillOpacity="0.5" />
      {/* Flecha de tendencia */}
      <path d="M6.5 16l5-5 4.5 3 3-5" strokeWidth="1.8" />
      <path d="M17.5 9.5l1.5-.5-.5 1.5" />
    </svg>
  )
}

/** Modalidades: tres monedas apiladas + persona */
export function IconModalidades({ size = 24, color = 'currentColor', strokeWidth = 1.6 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} stroke={color} strokeWidth={strokeWidth}>
      {/* Persona empleado */}
      <circle cx="7" cy="7" r="2.5" />
      <path d="M3 19c0-2.8 1.8-5 4-5s4 2.2 4 5" />
      {/* Monedas / pago */}
      <ellipse cx="17" cy="9" rx="4" ry="1.5" />
      <path d="M13 9v3c0 .8 1.8 1.5 4 1.5s4-.7 4-1.5V9" />
      <path d="M13 12v3c0 .8 1.8 1.5 4 1.5s4-.7 4-1.5v-3" />
      {/* Signo $ */}
      <path d="M17 7V5.5M17 12.5V14" strokeWidth="1.3" />
    </svg>
  )
}

/** Quiénes somos: corazón con dos manos */
export function IconNosotros({ size = 24, color = 'currentColor', strokeWidth = 1.6 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} stroke={color} strokeWidth={strokeWidth}>
      {/* Corazón */}
      <path d="M12 20S4 14.5 4 8.5C4 6 6 4 8.5 4c1.5 0 2.8.8 3.5 2 .7-1.2 2-2 3.5-2C18 4 20 6 20 8.5 20 14.5 12 20 12 20z" />
      {/* Manos que sostienen abajo */}
      <path d="M8 21c-.5-1-.5-2 0-2.5l4-2 4 2c.5.5.5 1.5 0 2.5" />
    </svg>
  )
}

/** FAQ: burbuja de pregunta con puntos */
export function IconFAQ({ size = 24, color = 'currentColor', strokeWidth = 1.6 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} stroke={color} strokeWidth={strokeWidth}>
      {/* Burbuja principal */}
      <path d="M4 4h16a1 1 0 011 1v9a1 1 0 01-1 1H8l-4 4V5a1 1 0 011-1z" />
      {/* Tres puntos de pregunta */}
      <circle cx="8.5" cy="9.5" r="0.8" fill={color} stroke="none" />
      <circle cx="12" cy="9.5" r="0.8" fill={color} stroke="none" />
      <circle cx="15.5" cy="9.5" r="0.8" fill={color} stroke="none" />
    </svg>
  )
}

/** App saludcompartida.app: celular con cruz médica */
export function IconApp({ size = 24, color = 'currentColor', strokeWidth = 1.6 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} stroke={color} strokeWidth={strokeWidth}>
      {/* Teléfono */}
      <rect x="6" y="2" width="12" height="20" rx="2.5" />
      <circle cx="12" cy="19" r="0.8" fill={color} stroke="none" />
      <path d="M10 4.5h4" strokeWidth="1.2" />
      {/* Cruz médica en pantalla */}
      <path d="M12 8.5v5M9.5 11h5" strokeWidth="2" />
      <rect x="9" y="8" width="6" height="6" rx="1" />
    </svg>
  )
}

/** Portal dashboard: cuatro cuadrantes con datos */
export function IconPortal({ size = 24, color = 'currentColor', strokeWidth = 1.6 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} stroke={color} strokeWidth={strokeWidth}>
      {/* Marco */}
      <rect x="3" y="3" width="18" height="18" rx="2" />
      {/* Divisor central */}
      <path d="M12 3v18M3 12h18" strokeWidth="1.2" />
      {/* Mini gráfica arriba izquierda */}
      <path d="M5.5 9.5l2-1.5 1.5 1" strokeWidth="1.2" />
      {/* Mini pie arriba derecha */}
      <circle cx="16" cy="8" r="2" />
      <path d="M16 8l2 0" strokeWidth="1.2" />
      {/* Barras abajo izquierda */}
      <rect x="5" y="15" width="1.5" height="3" rx="0.3" fill={color} fillOpacity="0.4" stroke="none" />
      <rect x="7.5" y="14" width="1.5" height="4" rx="0.3" fill={color} fillOpacity="0.6" stroke="none" />
      {/* Check abajo derecha */}
      <path d="M13.5 16.5l1.5 1.5 3-3" strokeWidth="1.5" />
    </svg>
  )
}

/** Remesa / transferencia de dinero */
export function IconRemesa({ size = 24, color = 'currentColor', strokeWidth = 1.6 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} stroke={color} strokeWidth={strokeWidth}>
      {/* Billete */}
      <rect x="2" y="7" width="20" height="10" rx="1.5" />
      {/* Círculo de moneda central */}
      <circle cx="12" cy="12" r="2.5" />
      {/* $ */}
      <path d="M12 9.5v1M12 13.5v1" strokeWidth="1.3" />
      {/* Puntos de esquina */}
      <circle cx="5.5" cy="10" r="1" fill={color} fillOpacity="0.3" stroke="none" />
      <circle cx="18.5" cy="14" r="1" fill={color} fillOpacity="0.3" stroke="none" />
      {/* Flecha de envío */}
      <path d="M8 4l4-2 4 2" />
      <path d="M12 2v4" />
    </svg>
  )
}

/** Tranquilidad: persona con aura de paz / círculo protector */
export function IconTranquilidad({ size = 24, color = 'currentColor', strokeWidth = 1.6 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} stroke={color} strokeWidth={strokeWidth}>
      {/* Persona */}
      <circle cx="12" cy="8" r="3" />
      <path d="M7 20c0-2.8 2.2-5 5-5s5 2.2 5 5" />
      {/* Aura / escudo protector */}
      <path d="M5 9C5 5.7 8.1 3 12 3s7 2.7 7 6c0 4.5-3.5 8-7 10-3.5-2-7-5.5-7-10z" strokeDasharray="2 1.5" strokeWidth="1.2" />
      {/* Check de tranquilidad */}
      <path d="M10 8.5l1.5 1.5 2.5-3" strokeWidth="1.5" />
    </svg>
  )
}

/** Logo mark — cruz médica + corazón */
export function SCLogoMark({ size = 36, colorA = '#0891B2', colorB = '#006847' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      {/* Gota / pin de mapa = acceso al lugar */}
      <path d="M18 4C13 4 9 8.4 9 13.8c0 7.2 9 16.2 9 16.2s9-9 9-16.2C27 8.4 23 4 18 4z"
        fill={colorB} fillOpacity="0.15" stroke={colorB} strokeWidth="1.5"/>
      {/* Cruz médica centrada */}
      <path d="M18 9.5v8M14 13.5h8" stroke={colorA} strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  )
}
