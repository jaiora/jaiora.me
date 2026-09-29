import type { L } from '@/lib/i18n'

export interface NavItem {
  to: string
  label: L
}

export const NAV_ITEMS: NavItem[] = [
  { to: '/locations', label: { ru: 'Локации', en: 'Locations' } },
  { to: '/blog', label: { ru: 'Блог', en: 'Blog' } },
  { to: '/team', label: { ru: 'Команда', en: 'Team' } },
]
