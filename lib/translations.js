export const translations = {

  // ── NAVBAR ──────────────────────────────────────────
  nav: {
    tagline:  { es: 'For Employers', en: 'For Employers' },
    links: {
      how:     { es: 'Cómo funciona',  en: 'How it works' },
      benefits:{ es: 'Beneficios',     en: 'Benefits' },
      plans:   { es: 'Modalidades',    en: 'Plans' },
      about:   { es: 'Quiénes somos',  en: 'About us' },
      faq:     { es: 'FAQ',            en: 'FAQ' },
    },
    login:     { es: 'Iniciar sesión', en: 'Sign in' },
    cta:       { es: 'Acceder al Portal', en: 'Access Portal' },
  },

  // ── HERO ────────────────────────────────────────────
  hero: {
    badge:   { es: 'Beneficio laboral para tu fuerza laboral latina', en: 'Employee benefit for your Latino workforce' },
    h1a:     { es: 'Tu empleado trabaja', en: 'Your employee works' },
    h1b:     { es: 'tranquilo cuando su', en: 'with peace of mind when' },
    h1c:     { es: 'familia está protegida', en: 'their family is covered' },
    p1:      { es: 'SaludCompartida convierte el beneficio laboral más valorado por tu empleado latino en una ventaja competitiva real para tu empresa.', en: 'SaludCompartida turns the most valued employee benefit for your Latino workforce into a real competitive advantage for your company.' },
    p2:      { es: 'Telemedicina 24/7, descuentos en farmacia, terapia y acompañamiento AI para su familia en México — desde $18/mes por empleado.', en: 'Telemedicine 24/7, pharmacy discounts, therapy, and Acompañante Personalizado for their family in Mexico — from $18/month per employee.' },
    ctaPrimary:   { es: 'Acceder al Portal',  en: 'Access Portal' },
    ctaSecondary: { es: 'Cómo funciona',       en: 'How it works' },
    stats: [
      { val: '78%',   es: 'empleados latinos envían remesas a México mensualmente',         en: 'of Latino employees send remittances to Mexico monthly' },
      { val: '30%',   es: 'reducción de ausentismo reportada con beneficios familiares',    en: 'reduction in absenteeism reported with family benefits' },
      { val: '$18',   es: 'por empleado por mes — menos que una pizza para su familia',     en: 'per employee per month — less than a pizza for their family' },
      { val: '130K+', es: 'worksite employees ya en proceso de acceso vía G&A Partners',   en: 'worksite employees already in pipeline via G&A Partners' },
    ],
  },

  // ── HOW IT WORKS ────────────────────────────────────
  how: {
    eyebrow: { es: 'Proceso simple',         en: 'Simple process' },
    h2:      { es: 'Cómo funciona',          en: 'How it works' },
    sub:     { es: 'Desde la firma hasta la familia activa — sin fricción, sin trabajo manual.', en: 'From signing to active family — no friction, no manual work.' },
    steps: [
      {
        n: '01',
        title: { es: 'Firmas la póliza grupal',    en: 'Sign the group policy' },
        desc:  { es: 'Tu empresa define con SaludCompartida los servicios incluidos, la modalidad de pago y los tipos de empleado elegibles. Se hace una vez, a través de tu PEO.', en: 'Your company defines with SaludCompartida the included services, payment model, and eligible employee types. Done once, through your PEO.' },
      },
      {
        n: '02',
        title: { es: 'El PEO envía los empleados',  en: 'PEO sends employee data' },
        desc:  { es: 'Durante open enrollment, tu PEO conecta su sistema a nuestra API. Cada empleado que elige el beneficio se registra automáticamente — sin trabajo manual.', en: 'During open enrollment, your PEO connects their system (PrismHR, Rippling, ADP) to our API. Each employee who selects the benefit is automatically enrolled — no manual work.' },
      },
      {
        n: '03',
        title: { es: 'La familia en México se activa', en: 'Family in Mexico activates' },
        desc:  { es: 'El empleado recibe su SaludCompartida Employee ID y un enlace de activación. Con un clic, activa la cuenta de su familia en México.', en: 'The employee receives their SaludCompartida Employee ID and an activation link. With one click, they activate their family\'s account in Mexico.' },
      },
      {
        n: '04',
        title: { es: 'Mides el impacto semana a semana', en: 'Measure impact week by week' },
        desc:  { es: 'Tu dashboard muestra utilización, satisfacción y ROI mensual. Una factura consolidada llega a tu PEO el día 1 de cada mes.', en: 'Your dashboard shows utilization, satisfaction, and monthly ROI. A consolidated invoice reaches your PEO on day 1 of each month.' },
      },
    ],
  },

  // ── BENEFITS ────────────────────────────────────────
  benefits: {
    eyebrow:    { es: 'Los cuatro servicios',          en: 'The four services' },
    h2:         { es: 'Qué recibe la familia en México', en: 'What the family in Mexico receives' },
    sub:        { es: 'Cada servicio es configurable por póliza. Tu empresa elige qué incluir según el tipo de empleado.', en: 'Each service is configurable per policy. Your company chooses what to include based on employee type.' },
    services: [
      { key: 'tele',     label: { es: 'Telemedicina 24/7',      en: '24/7 Telemedicine' },     desc: { es: 'Consulta médica por videollamada a cualquier hora, desde cualquier lugar en México. Sin filas, sin traslados.', en: 'Video medical consultation any time, from anywhere in Mexico. No lines, no travel.' },     stat: '24/7', statLabel: { es: 'disponibilidad', en: 'availability' } },
      { key: 'pharma',   label: { es: 'Descuentos Farmacia',     en: 'Pharmacy Discounts' },    desc: { es: 'Hasta 75% de descuento en más de 1,700 farmacias en México. Medicamentos crónicos, pediátricos y más.', en: 'Up to 75% discount at over 1,700 pharmacies in Mexico. Chronic, pediatric medications and more.' },    stat: '75%',  statLabel: { es: 'descuento máx.', en: 'max discount' } },
      { key: 'therapy',  label: { es: 'Terapia Psicológica',     en: 'Psychological Therapy' }, desc: { es: 'Sesiones con psicólogo certificado, agenda online. Salud mental para adultos mayores, padres e hijos.', en: 'Sessions with certified psychologist, online scheduling. Mental health for seniors, parents, and children.' }, stat: '100%', statLabel: { es: 'online', en: 'online' } },
      { key: 'lupita',   label: { es: 'Lupita — Acompañante Personalizado',   en: 'Lupita — Acompañante Personalizado' }, desc: { es: 'Llamadas proactivas de acompañamiento emocional para adultos mayores. Basado en 16 códigos conductuales propietarios.', en: 'Proactive emotional support calls for seniors. Based on 16 proprietary behavioral codes.' }, stat: 'AI',   statLabel: { es: 'proactivo', en: 'proactive' } },
    ],
    whyEyebrow: { es: 'Por qué importa para tu empresa', en: 'Why it matters for your company' },
    whyH2:      { es: 'El beneficio que reduce rotación de verdad', en: 'The benefit that truly reduces turnover' },
    whyP:       { es: 'El 78% de tus empleados latinos envía dinero a México todos los meses. Cuando ese dinero va a pagar médicos, el estrés afecta directamente su productividad.', en: '78% of your Latino employees send money to Mexico every month. When that money goes to pay doctors, the stress directly impacts their productivity.' },
    bullets: [
      { es: 'Reduces el estrés financiero que causa ausentismo y errores',          en: 'Reduce the financial stress that causes absenteeism and mistakes' },
      { es: 'Diferenciador real frente a competidores en reclutamiento',             en: 'Real differentiator vs. competitors in recruitment' },
      { es: 'Reemplazar un empleado cuesta $3,000–8,000. SaludCompartida: $18/mes', en: 'Replacing an employee costs $3,000–8,000. SaludCompartida: $18/month' },
      { es: 'Datos de utilización para demostrar ROI a tu CFO',                     en: 'Utilization data to prove ROI to your CFO' },
      { es: 'Un solo invoice mensual — sin trabajo administrativo',                 en: 'One monthly invoice — no administrative work' },
      { es: 'Configurable por tipo de empleado: full-time, hourly, seasonal',       en: 'Configurable by employee type: full-time, hourly, seasonal' },
    ],
    roi: {
      label:   { es: 'Cálculo de ROI — ejemplo real', en: 'ROI Calculation — real example' },
      rows: [
        { es: 'Costo de reemplazar 1 empleado',             en: 'Cost to replace 1 employee',          val: '$5,200', color: '#EF4444' },
        { es: 'Costo SaludCompartida por empleado/año',     en: 'SaludCompartida cost per employee/yr', val: '$216',   color: 'var(--clarity)' },
        { es: 'Solo necesitas retener 1 empleado',          en: 'You only need to retain 1 employee',   val: '24x ROI',color: 'var(--growth)' },
      ],
      disclaimer: { es: 'Cálculo conservador. La retención real varía según industria y tamaño.', en: 'Conservative estimate. Actual retention varies by industry and size.' },
    },
  },

  // ── PAYMENT MODELS ──────────────────────────────────
  plans: {
    eyebrow: { es: 'Flexible para cada empresa', en: 'Flexible for every company' },
    h2:      { es: 'Modalidades de pago',        en: 'Payment models' },
    sub:     { es: 'Cada empresa configura quién paga, cuánto, cómo y con qué frecuencia — por tipo de empleado.', en: 'Each company configures who pays, how much, how, and how often — by employee type.' },
    models: [
      {
        badge:   { es: 'Mayor impacto',      en: 'Highest impact' },
        title:   { es: 'Empresa paga 100%',  en: 'Company pays 100%' },
        period:  { es: '/empleado/mes',       en: '/employee/month' },
        desc:    { es: 'La empresa cubre el costo total. El empleado recibe el beneficio sin descuento de nómina. Máximo valor percibido.', en: 'The company covers the total cost. The employee receives the benefit with no payroll deduction. Maximum perceived value.' },
        features:{ es: ['Cero impacto en el cheque del empleado','Máximo valor percibido','Deducible como gasto de nómina','Net 30 vía PEO'], en: ['Zero impact on employee paycheck','Maximum perceived value','Deductible as payroll expense','Net 30 via PEO'] },
      },
      {
        badge:   { es: 'Más común',          en: 'Most common' },
        title:   { es: 'Pago compartido',    en: 'Shared payment' },
        period:  { es: 'empresa / empleado', en: 'company / employee' },
        desc:    { es: 'Empresa subsidia un porcentaje, el resto se descuenta de nómina. Configurable por tipo de empleado.', en: 'Company subsidizes a percentage, the rest is deducted from payroll. Configurable by employee type.' },
        features:{ es: ['Configurable por tier de empleado','Pre-tax o after-tax','Biweekly o monthly','Flexibilidad total de porcentajes'], en: ['Configurable by employee tier','Pre-tax or after-tax','Biweekly or monthly','Full percentage flexibility'] },
      },
      {
        badge:   { es: 'Beneficio voluntario', en: 'Voluntary benefit' },
        title:   { es: 'Empleado paga',        en: 'Employee pays' },
        period:  { es: '/mes via nómina',       en: '/month via payroll' },
        desc:    { es: 'El empleado elige el beneficio y se descuenta de su nómina. La empresa actúa como administrador sin costo directo.', en: 'The employee selects the benefit and it\'s deducted from their payroll. The company acts as administrator at no direct cost.' },
        features:{ es: ['Cero costo para la empresa','Empleado elige voluntariamente','Descuento automático de nómina','Buen punto de entrada para pilotos'], en: ['Zero cost to the company','Employee chooses voluntarily','Automatic payroll deduction','Great entry point for pilots'] },
      },
    ],
    typesLabel: { es: 'Tipos de empleado:', en: 'Employee types:' },
    types: [
      { type: 'Full-time', desc: { es: 'Empresa 100%',          en: 'Company 100%' } },
      { type: 'Part-time', desc: { es: 'Split configurable',     en: 'Configurable split' } },
      { type: 'Hourly',    desc: { es: 'Split + mín. horas',    en: 'Split + min. hours' } },
      { type: 'Seasonal',  desc: { es: 'Configurable',           en: 'Configurable' } },
      { type: 'Temporary', desc: { es: 'Por duración',           en: 'By duration' } },
    ],
  },

  // ── ABOUT US ────────────────────────────────────────
  about: {
    eyebrow: { es: 'Quiénes somos',                       en: 'About us' },
    h2:      { es: 'La historia detrás de SaludCompartida', en: 'The story behind SaludCompartida' },
    sub:     { es: 'No somos una startup tecnológica que descubrió un mercado. Somos el resultado de 25 años viendo de cerca el problema que queremos resolver.', en: 'We are not a tech startup that discovered a market. We are the result of 25 years of closely witnessing the problem we want to solve.' },
    storyTitle: { es: 'La motivación que nadie ve',      en: 'The motivation nobody sees' },
    story1:     { es: 'Para el migrante en los Estados Unidos, cada remesa llega con una ansiedad invisible: "¿Tendrá mamá para su medicina este mes? ¿Y si papá necesita al cardiólogo? ¿Y si mi hija se enferma y ya no queda dinero?"', en: 'For the migrant in the United States, every remittance arrives with invisible anxiety: "Will mom have enough for her medicine this month? What if dad needs a cardiologist? What if my daughter gets sick and there\'s no money left?"' },
    story2:     { es: 'Ese miedo constante — ese riesgo financiero mensual — cuesta más que dinero. Cuesta sueño. Cuesta concentración en el trabajo. Cuesta la capacidad de construir una vida en un país nuevo mientras se cuida a seres queridos a miles de kilómetros.', en: 'That constant fear — that monthly financial risk — costs more than money. It costs sleep. It costs focus at work. It costs the ability to build a new life while caring for loved ones thousands of miles away.' },
    story3:     { es: 'SaludCompartida elimina una gran parte de esa carga. No solo proveemos servicios de salud — proveemos certeza. Proveemos dignidad.', en: 'SaludCompartida eliminates a large part of that burden. We don\'t just provide healthcare services — we provide certainty. We provide dignity.' },
    founderLabel: { es: 'Fundadora & CEO',     en: 'Founder & CEO' },
    founderBio:   { es: '25 años en la industria de seguros de salud en LATAM — Citibank, ALICO, ACE, Chubb, AIG. VP en AIG con P&L propio, distribución en 8 países, 30+ socios estratégicos.', en: '25 years in the LATAM health insurance industry — Citibank, ALICO, ACE, Chubb, AIG. VP at AIG with own P&L, distribution in 8 countries, 30+ strategic partners.' },
    founderProof: { es: 'En 2019 demostró que el modelo funciona:', en: 'In 2019, she proved the model works:' },
    brazil:       { es: 'suscriptores en 6 meses · Brasil 2019 · crecimiento orgánico', en: 'subscribers in 6 months · Brazil 2019 · organic growth' },
    quoteLabel:   { es: 'La prueba humana que importa', en: 'The human proof that matters' },
    quote:        { es: '"Thaisa Mamede está recibiendo su colecistectomía 4 días después de esperar 8 meses en el sistema público. Eso no es un estudio de caso — ese es el momento en que mi misión se cristalizó."', en: '"Thaisa Mamede is getting her cholecystectomy 4 days after waiting 8 months in the public system. That\'s not a case study — that\'s the moment my mission crystallized."' },
    diffTitle: { es: 'Lo que nos diferencia', en: 'What sets us apart' },
    diffP:     { es: 'La mayoría de las soluciones de salud para migrantes fallan porque están diseñadas por personas que nunca han sentido lo que significa mandar una remesa con miedo. Nosotros construimos SaludCompartida desde adentro del problema.', en: 'Most health solutions for migrants fail because they are designed by people who have never felt what it means to send a remittance with fear. We built SaludCompartida from inside the problem.' },
    stats3: [
      { n: '16',  label: { es: 'Códigos conductuales propietarios', en: 'Proprietary behavioral codes' }, sub: { es: 'Desarrollados con sociólogos mexicanos', en: 'Developed with Mexican sociologists' } },
      { n: '25+', label: { es: 'Años de experiencia en seguros LATAM', en: 'Years of LATAM insurance experience' }, sub: { es: 'P&L owner, 8 países, 30+ socios', en: 'P&L owner, 8 countries, 30+ partners' } },
      { n: '10',  label: { es: 'Países en la hoja de ruta', en: 'Countries in the roadmap' }, sub: { es: 'México primero, luego LATAM e India', en: 'Mexico first, then LATAM and India' } },
    ],
  },

  // ── FAQ ─────────────────────────────────────────────
  faq: {
    eyebrow: { es: 'Preguntas frecuentes', en: 'Frequently asked questions' },
    h2:      { es: '¿Tienes dudas?',       en: 'Have questions?' },
    ctaText: { es: '¿Listo para ofrecer este beneficio a tu equipo?', en: 'Ready to offer this benefit to your team?' },
    cta:     { es: 'Acceder al Portal',    en: 'Access Portal' },
    items: [
      {
        q: { es: '¿Necesito cambiar mi PEO actual para ofrecer este beneficio?',                        en: 'Do I need to change my current PEO to offer this benefit?' },
        a: { es: 'No. SaludCompartida se integra con tu PEO existente vía API. G&A Partners, Paychex, ADP y otros PEOs pueden conectar el beneficio sin cambiar nada en tu operación actual. El tiempo de integración típico es de 2 a 4 semanas.',                                              en: 'No. SaludCompartida integrates with your existing PEO via API. G&A Partners, Paychex, ADP, and other PEOs can connect the benefit without changing anything in your current operation. Typical integration time is 2 to 4 weeks.' },
      },
      {
        q: { es: '¿Los empleados usan los servicios directamente en EE.UU.?',                           en: 'Do employees use the services directly in the US?' },
        a: { es: 'No. El empleado en EE.UU. activa la suscripción para su familia en México. La familia es quien consulta al médico, descuenta en farmacias y habla con Lupita.',                                                                                                              en: 'No. The US-based employee activates the subscription for their family in Mexico. The family is the one who consults the doctor, uses pharmacy discounts, and talks to Lupita.' },
      },
      {
        q: { es: '¿Puedo ofrecer condiciones diferentes según el tipo de empleado?',                    en: 'Can I offer different conditions by employee type?' },
        a: { es: 'Sí, completamente. El sistema de tiers permite configurar condiciones distintas para full-time, hourly, part-time y seasonal dentro de la misma póliza.',                                                                                                                     en: 'Yes, completely. The tier system allows configuring different conditions for full-time, hourly, part-time, and seasonal within the same policy.' },
      },
      {
        q: { es: '¿Cómo funciona la facturación mensual?',                                              en: 'How does monthly billing work?' },
        a: { es: 'SaludCompartida genera automáticamente un invoice consolidado el día 1 de cada mes a tu PEO con todos los empleados activos. El PEO maneja los descuentos de nómina.',                                                                                                       en: 'SaludCompartida automatically generates a consolidated invoice on the 1st of each month to your PEO with all active employees. The PEO handles payroll deductions.' },
      },
      {
        q: { es: '¿Puedo ver si los empleados están usando el beneficio?',                              en: 'Can I see if employees are using the benefit?' },
        a: { es: 'Sí. El dashboard de saludcompartida.ai se actualiza semanalmente con: consultas de telemedicina, transacciones en farmacia, sesiones de terapia y llamadas de Lupita.',                                                                                                            en: 'Yes. The saludcompartida.ai dashboard is updated weekly with: telemedicine consultations, pharmacy transactions, therapy sessions, and Lupita calls.' },
      },
      {
        q: { es: '¿Qué pasa si un empleado deja de trabajar en mi empresa?',                           en: 'What happens if an employee leaves the company?' },
        a: { es: 'El certificado entra en un período de terminación de 30 días (ventana COBRA). La familia mantiene acceso a los servicios durante ese período.',                                                                                                                              en: 'The certificate enters a 30-day termination period (COBRA window). The family retains access to services during that period.' },
      },
      {
        q: { es: '¿Qué datos de los empleados necesitan para el enrollment?',                          en: 'What employee data do you need for enrollment?' },
        a: { es: 'El nombre, apellido, email y tipo de empleado — datos que tu PEO ya tiene. El enrollment via API toma milisegundos por empleado.',                                                                                                                                          en: 'First name, last name, email, and employee type — data your PEO already has. API enrollment takes milliseconds per employee.' },
      },
    ],
  },

  // ── FOOTER ──────────────────────────────────────────
  footer: {
    tagline:  { es: 'El primer beneficio laboral diseñado específicamente para la fuerza laboral latina en EE.UU.', en: 'The first employee benefit designed specifically for the Latino workforce in the US.' },
    sections: {
      portal:  { es: 'Portal',   en: 'Portal' },
      company: { es: 'Empresa',  en: 'Company' },
      legal:   { es: 'Legal',    en: 'Legal' },
    },
    portalLinks:  [
      { es: 'Dashboard',      en: 'Dashboard',     href: '/dashboard' },
      { es: 'Iniciar sesión', en: 'Sign in',        href: '/login' },
      { es: 'Soporte',        en: 'Support',        href: '/help' },
    ],
    companyLinks: [
      { es: 'Quiénes somos',  en: 'About us',           href: '#nosotros' },
      { es: 'Cómo funciona',  en: 'How it works',       href: '#como' },
      { es: 'Corporativo',    en: 'Corporate',           href: 'https://saludcompartida.com' },
      { es: 'App para familias', en: 'Family app',      href: 'https://saludcompartida.app' },
    ],
    legalLinks: [
      { es: 'Privacidad', en: 'Privacy', href: '/privacy' },
      { es: 'Términos',   en: 'Terms',   href: '/terms' },
      { es: 'HIPAA',      en: 'HIPAA',   href: '/hipaa' },
    ],
    copy: { es: '© 2026 Tech Solution Services FVR LLC. Todos los derechos reservados.', en: '© 2026 Tech Solution Services FVR LLC. All rights reserved.' },
  },
}

export function t(obj, lang) {
  if (!obj) return ''
  return obj[lang] ?? obj['es'] ?? ''
}
