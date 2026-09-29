import { useSyncExternalStore } from 'react'
import type { Lang } from '@/lib/i18n'

// Названия вручную, а не через Intl: сервер при сборке и браузер обязаны выдать одинаковый текст
const MONTHS: Record<Lang, string[]> = {
  ru: ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
}

// YYYY-MM-DD → «28 сентября 2026» / «September 28, 2026»
export function formatDate(iso: string, lang: Lang): string {
  const [y, m, d] = iso.split('-').map(Number)
  return lang === 'en' ? `${MONTHS.en[m - 1]} ${d}, ${y}` : `${d} ${MONTHS.ru[m - 1]} ${y}`
}

// Ближайшая суббота 19:00 по времени города; если суббота сегодня и 19:00 ещё не наступило — сегодня
function nextSaturdayUTC(timeZone: string, now: Date): Date {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-US', { timeZone, year: 'numeric', month: 'numeric', day: 'numeric', weekday: 'short', hour: 'numeric', hourCycle: 'h23' })
      .formatToParts(now)
      .map((p) => [p.type, p.value]),
  )
  const weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(parts.weekday)
  let add = (6 - weekday + 7) % 7
  if (add === 0 && Number(parts.hour) >= 19) add = 7
  return new Date(Date.UTC(Number(parts.year), Number(parts.month) - 1, Number(parts.day) + add))
}

export function nextSaturday(timeZone: string, lang: Lang, now = new Date()): string {
  const date = nextSaturdayUTC(timeZone, now)
  const d = date.getUTCDate()
  const m = date.getUTCMonth()
  return lang === 'en' ? `Saturday, ${MONTHS.en[m]} ${d}, 7 pm` : `суббота, ${d} ${MONTHS.ru[m]}, 19:00`
}

// То же в ISO 8601 со смещением пояса («2026-10-03T19:00:00+07:00») — для startDate в разметке Event
export function nextSaturdayIso(timeZone: string, now = new Date()): string {
  const day = nextSaturdayUTC(timeZone, now).toISOString().slice(0, 10)
  const name = new Intl.DateTimeFormat('en-US', { timeZone, timeZoneName: 'longOffset' }).formatToParts(now).find((p) => p.type === 'timeZoneName')?.value ?? 'GMT'
  const offset = name === 'GMT' ? '+00:00' : name.replace('GMT', '')
  return `${day}T19:00:00${offset}`
}

const noopSubscribe = () => () => {}
// false в готовом HTML и при первом проходе оживления, true — после него: для того, что зависит от браузера или текущей даты
export const useHydrated = () => useSyncExternalStore(noopSubscribe, () => true, () => false)
