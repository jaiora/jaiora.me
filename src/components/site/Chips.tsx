import { Link } from 'react-router-dom'
import { itemText, STATUS_META, type CityChat, type LinkItem } from '@/data/links'
import { useT, type Lang } from '@/lib/i18n'

// Внешние ссылки (тематические чаты и т.п.) — обычные <a>, active/onActive подсвечивает тег в паре с картой
export function Chips({ items, lang, active, onActive }: { items: LinkItem[]; lang: Lang; active?: number | null; onActive?: (i: number | null) => void }) {
  return (
    <ul className="s-chips">
      {items.map((c, i) => {
        const cls = `s-chip${active === i ? ' is-active' : ''}`
        const hover = onActive && {
          onMouseEnter: () => onActive(i),
          onMouseLeave: () => onActive(null),
          onFocus: () => onActive(i),
          onBlur: () => onActive(null),
        }
        return (
          <li key={c.label}>
            <a className={cls} href={c.url} target="_blank" rel="noopener noreferrer" {...hover}>
              {itemText(c, lang).label}
            </a>
          </li>
        )
      })}
    </ul>
  )
}

// Чаты по локациям ведут на внутреннюю страницу локации, а не сразу в Telegram
export function CityChips({ items, lang, active, onActive }: { items: CityChat[]; lang: Lang; active?: number | null; onActive?: (i: number | null) => void }) {
  const { to } = useT()
  return (
    <ul className="s-chips">
      {items.map((c, i) => {
        const cls = `s-chip${active === i ? ' is-active' : ''}`
        const status = c.status && STATUS_META[c.status]
        return (
          <li key={c.slug}>
          <Link
            className={cls}
            to={to(`/location/${c.slug}`)}
            onMouseEnter={() => onActive?.(i)}
            onMouseLeave={() => onActive?.(null)}
            onFocus={() => onActive?.(i)}
            onBlur={() => onActive?.(null)}
          >
            {itemText(c, lang).label}
            {status && (
              <span
                className="s-chip-status"
                role="img"
                aria-label={status.label[lang]}
                style={{ background: status.color }}
                title={`${status.label[lang]} — ${status.hint[lang]}`}
              />
            )}
          </Link>
          </li>
        )
      })}
    </ul>
  )
}
