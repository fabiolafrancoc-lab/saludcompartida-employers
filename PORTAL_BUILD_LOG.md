# SaludCompartida Employer Portal — Build Log
**saludcompartida.ai · Sesión: 4 de abril 2026**

---

## Stack
- **Framework**: Next.js 16 + Turbopack
- **Deploy**: Vercel `prj_UACDdd6YJES2Cyooq9D2U6fMfhhg` / `team_KP5oshEC0JVxaEvwTY3kuvS2`
- **Repo**: `fabiolafrancoc-lab/saludcompartida-employers` (PUBLIC)
- **Supabase**: `dpxjnanhmkgfjphdgojk`
- **Charts**: Recharts
- **Domain**: saludcompartida.ai

---

## Arquitectura — Sidebar (9 secciones)
| ID | Label | Icono | Acento |
|---|---|---|---|
| inicio | Inicio | IconInicio | navy |
| problema | El Problema | IconProblema | rojo |
| carlos | Historia de Carlos | IconCarlos | amber |
| beneficios | Beneficios | IconBeneficios | emerald |
| como | Cómo se enrola | IconComo | teal |
| modalidades | Modalidades | IconModalidades | navy |
| impacto | Impacto | IconImpacto | emerald |
| nosotros | Quiénes somos | IconNosotros | amber |
| faq | FAQ | IconFAQ | teal |

---

## Media Assets (`/public/`)
| Archivo | Sección | Uso |
|---|---|---|
| `fotoninapintada.jpeg` | Hero | Full-bleed background. Izq: cyan limpio → panel content. Der: niña pintada visible |
| `abuelanietas.jpeg` | El Problema | Hero full-bleed con caption navy bottom |
| `abuelamamahija.jpeg` | Beneficios | Photo break "Protegida. Presente. Tranquila." |
| `familiagrande.jpeg` | Historia de Carlos | Intro photo de la familia de Carlos |
| `thumb_fiebre.jpg` | Beneficios/Videollamada | Thumbnail video YouTube zjakLC1ipHc |
| `thumb_ninos.jpg` | Beneficios/Terapia | Thumbnail video YouTube 4y3zSt9m2C0 |

## Videos YouTube
- **Niña con fiebre**: `https://youtu.be/zjakLC1ipHc` → Videollamada con Doctor tab
- **Niños corriendo**: `https://youtu.be/4y3zSt9m2C0` → Terapia tab

---

## Design System
- **Verde bandera**: `#006847` (--sand) → secciones principales
- **Navy**: `#0F3460` → cards, stat boxes
- **Navy card**: `#162040` → chart cards
- **Navy inner**: `#1E2D4F` → callouts dentro de cards
- **Cyan**: `#0891B2` (--teal)
- **Emerald**: `#059669`
- **Amber**: `#D97706`
- **Loss/Red**: `#DC2626`
- **Fonts**: Instrument Serif (display) + Inter (body)

### Chart colors (sobre fondo navy oscuro)
- Cyan: `#22D3EE`
- Emerald: `#34D399`
- Amber: `#FCD34D`
- Rose: `#F87171`
- Violet: `#A78BFA`
- Slate: `#475569`

---

## Componentes clave

### `components/icons/SCIcons.jsx`
14 iconos SVG custom diseñados específicamente:
`IconTelemedicina`, `IconFarmacia`, `IconTerapia`, `IconLupita`,
`IconInicio`, `IconProblema`, `IconComo`, `IconBeneficios`,
`IconImpacto`, `IconModalidades`, `IconNosotros`, `IconFAQ`,
`IconPortal`, `IconCarlos`, `SCLogoMark`

### `components/sections/`
- `Hero.jsx` — Split layout: fotoninapintada full-bg, content izquierda con rotating fear quotes
- `TheProblem.jsx` — abuelanietas hero photo + exposición financiera 3 columnas
- `Carlos.jsx` — familiagrande photo (380px) + profile card + stepper 4 momentos antes/después
- `Benefits.jsx` — 4 service tabs (Videollamada/Farmacia/Terapia/Lupita), ambos paneles navy
- `HowItWorks.jsx` — stepper 4 pasos enrollment con timeline interactivo
- `PaymentModels.jsx` — 3 modalidades de pago
- `TheImpact.jsx` — 3 charts recharts: donuts (remesa), barras (costo sin/con SC), slider empleados
- `AboutUs.jsx` — historia + founder card + misión
- `FAQ.jsx` — accordion + CTA navy
- `VideoBreak.jsx` — full-bleed YouTube embed con thumbnail

---

## Principios de neurociencia aplicados
- **Loss aversion (Kahneman)**: "$3K-8K reemplazar vs $18/mes" en rojo
- **Anchoring**: ROI calculator arriba del fold
- **Social proof**: rotating proof ticker
- **Pattern interrupt**: badge "Para PEOs · HR Managers · Risk Managers"
- **Emotional activation before rational**: fotos/videos primero, datos después
- **Cultural connection**: verde bandera mexicana como color primario de sección

---

## Target Audience
- **PEO executives** → diferenciación portafolio, revenue
- **HR Managers** → reducir rotación, ser héroe interno
- **Risk Managers** → ROI cuantificable, reducir liability

---

## Últimas correcciones (Apr 4, 2026)
1. Hero: `fotoninapintada.jpeg` (filename correcto)
2. Benefits: ambos paneles navy cuando tab activa
3. TheImpact: rediseño completo tema navy oscuro
4. Carlos photo: `objectPosition: center 12%` (cabeza del hombre visible)
5. Scroll to top en cada sección (useRef + useEffect)
6. Responsive CSS: `clamp()` para headings, `min()` para max-w
7. Sidebar: texto siempre blanco bold, activo con fondo navy
8. Texto en fondos oscuros: `.on-green` y `.on-dark` con `!important`
9. Videos YouTube embebidos inline en Beneficios (click to play)
10. Orden sidebar: Problema→Carlos→Beneficios→Cómo se enrola→Modalidades→Impacto
