import { Link } from 'react-router-dom'
import Page from '@/components/site/Page'
import { CITY_CHATS, itemText } from '@/data/links'
import { useT } from '@/lib/i18n'

const T = {
  eyebrow: { ru: 'Ошибка 404', en: 'Error 404' },
  title: { ru: 'Такой страницы нет', en: 'This page doesn’t exist' },
  lead: { ru: 'Возможно, ссылка устарела. Вот куда можно пойти:', en: 'The link may be outdated. Here’s where you can go:' },
  home: { ru: 'На главную', en: 'Home' },
  locations: { ru: 'Все локации', en: 'All locations' },
  cities: { ru: 'Локации', en: 'Locations' },
}

export default function NotFoundView() {
  const { lang, t, to } = useT()
  return (
    <Page>
      <header className="s-jhero">
        <div>
          <p className="s-eyebrow">{t(T.eyebrow)}</p>
          <h1 className="s-jtitle">{t(T.title)}</h1>
          <p className="s-lead">{t(T.lead)}</p>
        </div>
      </header>
      <section className="s-section">
        <ul className="s-chips">
          <li>
            <Link className="s-pill s-pill-solid" to={to('/')}>{t(T.home)}</Link>
          </li>
          <li>
            <Link className="s-pill" to={to('/locations')}>{t(T.locations)}</Link>
          </li>
        </ul>
        <h2 className="s-label">{t(T.cities)}</h2>
        <ul className="s-chips">
          {CITY_CHATS.map((c) => (
            <li key={c.slug}>
              <Link className="s-chip" to={to(`/location/${c.slug}`)}>{itemText(c, lang).label}</Link>
            </li>
          ))}
        </ul>
      </section>
    </Page>
  )
}
