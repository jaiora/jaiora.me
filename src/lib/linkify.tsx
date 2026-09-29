import { Fragment, type ReactNode } from 'react'

// Телеграм-ники (@name), ссылки t.me/… и голые домены (list.am, sxodim.com/…) в обычном тексте → ссылки
const PATTERN =
  /(?<![\w.@/])(@[A-Za-z][A-Za-z0-9_]{3,31})\b|(?<![\w./])((?:https?:\/\/)?t\.me\/[A-Za-z0-9_/]+)|(?<![\w.@/-])((?:[a-z0-9][a-z0-9-]*\.)+(?:com|me|ge|am|kz|ru|io|org|net|tr|dev|app)(?:\/[^\s,;)»"]*)?)/g

export function linkify(text: string): ReactNode[] {
  const out: ReactNode[] = []
  let last = 0
  for (const m of text.matchAll(PATTERN)) {
    const [raw, handle, tme, domain] = m
    // Точка в конце предложения к адресу не относится
    const label = raw.replace(/[.]+$/, '')
    const href = handle ? `https://t.me/${handle.slice(1)}` : tme ? (tme.startsWith('http') ? tme : `https://${tme}`).replace(/[.]+$/, '') : `https://${domain.replace(/[.]+$/, '')}`
    out.push(<Fragment key={`t${last}`}>{text.slice(last, m.index)}</Fragment>)
    out.push(
      <a key={`a${m.index}`} href={href} target="_blank" rel="noopener noreferrer">
        {label}
      </a>,
    )
    last = m.index + label.length
  }
  out.push(<Fragment key={`t${last}`}>{text.slice(last)}</Fragment>)
  return out
}
