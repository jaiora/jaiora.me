import type { L } from '@/lib/i18n'

export interface Place {
  name: L
  lat: number
  lon: number
  key?: boolean
  // Цвет точки на карте — по статусу локации (см. STATUS_META в data/links); нет статуса — цвет по умолчанию
  color?: string
}
