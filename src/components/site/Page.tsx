import type { ReactNode } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { NAV_ITEMS } from '@/data/nav'
import { otherLang, stripLang, useT, withLang } from '@/lib/i18n'

export default function Page({ children }: { children: ReactNode }) {
  const { lang, t, to } = useT()
  const { pathname } = useLocation()
  const other = otherLang(lang)
  const switchTo = withLang(stripLang(pathname), other)
  return (
    <div className="site site-jaiora">
      <div className="s-wrap">
        <header className="s-nav">
          <Link to={to('/')} className="s-nav-home">
            <img className="s-nav-mark" src="/logo.svg?v=2" alt="" width="30" height="25" />
            Jaiora
          </Link>
          <nav aria-label={t({ ru: 'Разделы', en: 'Sections' })}>
            {NAV_ITEMS.map((i) => (
              <NavLink key={i.to} to={to(i.to)} className={({ isActive }) => `s-nav-link${isActive ? ' is-active' : ''}`}>
                {t(i.label)}
              </NavLink>
            ))}
            <Link className="s-nav-lang" to={switchTo} hrefLang={other} lang={other} title={other === 'en' ? 'English' : 'Русский'}>
              {other.toUpperCase()}
            </Link>
          </nav>
        </header>
        <main className="s-main">{children}</main>
        <footer className="s-foot">
          <small>© {new Date().getFullYear()} Jaiora</small>
        </footer>
      </div>
    </div>
  )
}
