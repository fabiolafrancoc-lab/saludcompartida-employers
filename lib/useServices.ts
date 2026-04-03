// lib/useServices.ts
// Hook universal para leer la configuración de servicios de una póliza
// Funciona en saludcompartida.app, saludcompartida-employees y saludcompartida.ai
//
// Uso:
//   const { has, services } = useServices(policyServices)
//   if (has('pharmacy')) { ... }

export type ServiceKey = 'telemedicine' | 'pharmacy' | 'therapy' | 'lupita'

export interface ServiceConfig {
  key: ServiceKey
  label_es: string
  label_en: string
  description_es: string
  route: string
  icon: string  // SVG path key
}

export const SERVICE_CATALOG: Record<ServiceKey, ServiceConfig> = {
  telemedicine: {
    key: 'telemedicine',
    label_es: 'Doctor 24/7',
    label_en: 'Telemedicine',
    description_es: 'Consulta médica por videollamada, cualquier hora',
    route: '/dashboard/telemedicina',
    icon: 'doctor',
  },
  pharmacy: {
    key: 'pharmacy',
    label_es: 'Farmacia',
    label_en: 'Pharmacy Discounts',
    description_es: 'Descuentos 40–75% en farmacias de México',
    route: '/dashboard/farmacia',
    icon: 'pill',
  },
  therapy: {
    key: 'therapy',
    label_es: 'Terapia',
    label_en: 'Therapy',
    description_es: 'Sesiones con psicólogo, agenda en línea',
    route: '/dashboard/terapia',
    icon: 'heart',
  },
  lupita: {
    key: 'lupita',
    label_es: 'Compañía',
    label_en: 'AI Companion',
    description_es: 'Lupita te llama para acompañarte',
    route: '/dashboard/compannia',
    icon: 'phone',
  },
}

export function useServices(enabledServices: ServiceKey[] | null | undefined) {
  const enabled = enabledServices ?? ['telemedicine', 'pharmacy', 'therapy', 'lupita']

  // ¿Tiene un servicio específico?
  const has = (service: ServiceKey): boolean => enabled.includes(service)

  // Lista de servicios activos con su metadata completa
  const services: ServiceConfig[] = enabled
    .map(key => SERVICE_CATALOG[key])
    .filter(Boolean)

  return { has, services, enabled }
}
