import { Fragment, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import Page from '@/components/site/Page'
import PlacesMap from '@/components/site/PlacesMap'
import { CITY_CHATS, STATUS_META, STATUS_ORDER, itemText } from '@/data/links'
import { JAIORA } from '@/data/jaiora'
import { useT } from '@/lib/i18n'
import type { Place } from '@/data/places'

const CITY_PLACES: Place[] = CITY_CHATS.map((c) => ({
  name: { ru: itemText(c, 'ru').label, en: itemText(c, 'en').label },
  lat: c.lat ?? 0,
  lon: c.lon ?? 0,
  color: c.status ? STATUS_META[c.status].color : undefined,
}))

const T = {
  back: { ru: '← Все локации', en: '← All locations' },
  eyebrow: { ru: 'Jaiora', en: 'Jaiora' },
  joinChat: { ru: 'Открыть чат в Telegram ↗', en: 'Open the Telegram chat ↗' },
  meetWhen: { ru: 'Как и в большинстве локаций Jaiora', en: 'Like in most Jaiora locations' },
  otherCities: { ru: 'Другие локации', en: 'Other locations' },
  otherFormats: { ru: 'Другие форматы', en: 'Other formats' },
  storyTitle: { ru: 'Не только суббота', en: 'Not just Saturday' },
}

export default function LocationView() {
  const { slug } = useParams<{ slug: string }>()
  const { lang, t, to } = useT()
  const c = t(JAIORA)
  const cityIndex = CITY_CHATS.findIndex((x) => x.slug === slug)
  const city = CITY_CHATS[cityIndex]
  const [activeCity, setActiveCity] = useState<number | null>(null)
  const [lightbox, setLightbox] = useState<'closed' | 'open' | 'closing'>('closed')
  const closeLightbox = () => {
    setLightbox('closing')
    setTimeout(() => setLightbox('closed'), 180)
  }
  const navigate = useNavigate()
  const goToCity = (i: number) => navigate(to(`/location/${CITY_CHATS[i].slug}`))

  if (!city) return <Navigate to={to('/')} replace />

  const name = itemText(city, lang).label
  const others = CITY_CHATS.filter((x) => x.slug !== city.slug)

  return (
    <Page>
      <header className="s-jhero">
        <img className="s-jlogo" src="/logo.svg" alt="Jaiora" width="112" height="112" />
        <div>
          <p className="s-eyebrow">{t(T.eyebrow)} · {name}</p>
          <p className="s-back">
            <Link to={to('/locations')}>{t(T.back)}</Link>
          </p>
          <h1 className="s-jtitle">{name}</h1>
          {city.status && (
            <p className="s-status-legend-item s-status-line" title={t(STATUS_META[city.status].hint)}>
              <span className="s-status-dot" style={{ background: STATUS_META[city.status].color }} />
              {t(STATUS_META[city.status].label)}
            </p>
          )}
          <p className="s-lead">{c.lead}</p>
        </div>
      </header>

      <section className={`s-meet${city.story?.photo ? ' has-photo' : ''}`}>
        <div className="s-meet-body">
          <div>
            <p className="s-meet-when">{c.meet.when}</p>
            <p className="s-meet-title">{city.story?.banner ? t(city.story.banner.title) : t(T.meetWhen)}</p>
          </div>
          <p className="s-meet-text">{city.story?.banner ? t(city.story.banner.text) : c.meet.text}</p>
          <div className="s-meet-cities">
            <a className="s-pill s-pill-solid" href={city.url} target="_blank" rel="noopener noreferrer">
              {t(T.joinChat)}
            </a>
          </div>
        </div>
        {city.story?.photo && (
          <button type="button" className="s-meet-photo-btn" onClick={() => setLightbox('open')} aria-label={t(city.story.photo.alt)}>
            <img
              className="s-meet-photo"
              src={city.story.photo.src}
              alt={t(city.story.photo.alt)}
              loading="lazy"
              style={{ aspectRatio: city.story.photo.aspect }}
            />
          </button>
        )}
      </section>

      {city.story?.photo && lightbox !== 'closed' && (
        <div className={`s-lightbox${lightbox === 'closing' ? ' is-closing' : ''}`} onClick={closeLightbox}>
          <button type="button" className="s-lightbox-close" aria-label={t({ ru: 'Закрыть', en: 'Close' })} onClick={closeLightbox}>
            ×
          </button>
          <img className="s-lightbox-img" src={city.story.photo.src} alt={t(city.story.photo.alt)} onClick={(e) => e.stopPropagation()} />
        </div>
      )}

      {city.extra && (
        <section className="s-section">
          <h2 className="s-h2">{t(city.extra.title)}</h2>
          <p className="s-lead">{t(city.extra.text)}</p>
          <h3 className="s-label">{t(T.otherFormats)}</h3>
          <div className="s-chips">
            {city.extra.formats.map((f) => (
              <span key={f.ru} className="s-chip s-chip-static">{t(f)}</span>
            ))}
          </div>
        </section>
      )}

      {city.story && (
        <section className="s-section">
          <h2 className="s-h2">{t(T.storyTitle)}</h2>
          <p className="s-lead">
            {city.story.paragraph[lang].map((part, i) =>
              part.href ? (
                <a key={i} href={part.href} target="_blank" rel="noopener noreferrer">
                  {part.text}
                </a>
              ) : (
                <Fragment key={i}>{part.text}</Fragment>
              ),
            )}
          </p>
        </section>
      )}

      <section className="s-section">
        <h2 className="s-h2">{c.cityChats}</h2>
        <div className="s-bento">
          <div className="s-card s-span-12 s-card-static">
            <span className="s-card-title">{t(T.otherCities)}</span>
            <div className="s-status-legend">
              {STATUS_ORDER.map((s) => {
                const m = STATUS_META[s]
                return (
                  <span key={s} className="s-status-legend-item" title={m.hint[lang]}>
                    <span className="s-status-dot" style={{ background: m.color }} />
                    {m.label[lang]}
                  </span>
                )
              })}
            </div>
            <PlacesMap places={CITY_PLACES} label={{ ru: 'Карта локаций с чатами Jaiora', en: 'Map of Jaiora locations' }} active={activeCity} onActive={setActiveCity} onSelect={goToCity} current={cityIndex} />
            <div className="s-chips">
              {others.map((o) => {
                const status = o.status && STATUS_META[o.status]
                return (
                  <Link key={o.slug} className="s-chip" to={to(`/location/${o.slug}`)}>
                    {itemText(o, lang).label}
                    {status && (
                      <span
                        className="s-chip-status"
                        style={{ background: status.color }}
                        title={`${status.label[lang]} — ${status.hint[lang]}`}
                      />
                    )}
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </Page>
  )
}
