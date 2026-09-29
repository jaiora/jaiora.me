import { Fragment, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Page from '@/components/site/Page'
import PlacesMap from '@/components/site/PlacesMap'
import { CityChips } from '@/components/site/Chips'
import Faq from '@/components/site/Faq'
import NotFoundView from '@/components/NotFoundView'
import { CITY_CHATS, CITY_TZ, STATUS_META, STATUS_ORDER, itemText } from '@/data/links'
import { FAQ_TITLE, locationFaq } from '@/data/faq'
import { formatDate, nextSaturday, useHydrated } from '@/lib/dates'
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
  joinChat: { ru: 'Открыть чат в Telegram ↗', en: 'Open the Telegram chat ↗' },
  meetWhen: { ru: 'Как и в большинстве локаций Jaiora', en: 'Like in most Jaiora locations' },
  otherCities: { ru: 'Другие локации', en: 'Other locations' },
  otherFormats: { ru: 'Другие форматы', en: 'Other formats' },
  storyTitle: { ru: 'Не только суббота', en: 'Not just Saturday' },
  helpedTitle: { ru: 'Помогли людям', en: 'Helped people' },
  next: { ru: 'Ближайшая встреча', en: 'Next meetup' },
  updated: { ru: 'Обновлено', en: 'Updated' },
  joinShort: { ru: 'Открыть чат ↗', en: 'Open chat ↗' },
}

// Мобильная кнопка чата внизу экрана: появляется, когда главная кнопка баннера ушла из вида
function useStickyCta() {
  const ref = useRef<HTMLAnchorElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(([e]) => setVisible(!e.isIntersecting && e.boundingClientRect.top < 0))
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return [ref, visible] as const
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
  const hydrated = useHydrated()
  const [ctaRef, ctaVisible] = useStickyCta()

  if (!city) return <NotFoundView />

  const name = itemText(city, lang).label
  const others = CITY_CHATS.filter((x) => x.slug !== city.slug)
  const faq = locationFaq(city.slug, lang)
  // Дата ближайшей встречи — только там, где встречи идут сами, и только в браузере: в готовом HTML она бы устарела
  const tz = CITY_TZ[city.slug]
  const when = city.status === 'autonomous' && hydrated && tz ? `${t(T.next)} — ${nextSaturday(tz, lang)}` : c.meet.when

  return (
    <Page>
      <header className="s-jhero">
        <div>
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
            <p className="s-meet-when">{when}</p>
            <h2 className="s-meet-title">{city.story?.banner ? t(city.story.banner.title) : t(T.meetWhen)}</h2>
          </div>
          <p className="s-meet-text">{city.story?.banner ? t(city.story.banner.text) : c.meet.text}</p>
          <div className="s-meet-cities">
            <a ref={ctaRef} className="s-pill s-pill-solid" href={city.url} target="_blank" rel="noopener noreferrer">
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
          {city.story.updated && (
            <p className="s-updated">
              {t(T.updated)}: <time dateTime={city.story.updated}>{formatDate(city.story.updated, lang)}</time>
            </p>
          )}
        </section>
      )}

      {city.helped && (
        <section className="s-section">
          <h2 className="s-h2">{t(T.helpedTitle)}</h2>
          <div className="s-bento">
            {city.helped.map((h) => (
              <div key={h.year + h.title.ru} className="s-card s-span-12 s-card-static s-feature">
                <span className="s-card-title">
                  {t(h.title)}
                  <span className="s-step-year">{h.year}</span>
                </span>
                <span className="s-card-text">{t(h.text)}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {faq.length > 0 && <Faq title={t(FAQ_TITLE)} items={faq} />}

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
            <CityChips items={others} lang={lang} />
          </div>
        </div>
      </section>

      <div className={`s-sticky-cta${ctaVisible ? ' is-visible' : ''}`} aria-hidden={!ctaVisible}>
        <a className="s-pill s-pill-solid" href={city.url} target="_blank" rel="noopener noreferrer" tabIndex={ctaVisible ? 0 : -1}>
          {name} · {t(T.joinShort)}
        </a>
      </div>
    </Page>
  )
}
