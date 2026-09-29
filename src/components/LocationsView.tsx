import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Page from '@/components/site/Page'
import PlacesMap from '@/components/site/PlacesMap'
import { Chips, CityChips } from '@/components/site/Chips'
import { CITY_CHATS, THEME_CHATS, STATUS_ORDER, STATUS_META, itemText } from '@/data/links'
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
  title: { ru: 'Локации', en: 'Locations' },
  lead: {
    ru: 'Локация — постоянное место: одна и та же площадка, суббота, 19:00, из раза в раз, без ведущего и регламента. Здесь просто встречаются — одни, чтобы поговорить про профессию, другие про что угодно, кроме работы, — и так складывается костяк: те, кто возвращается снова и снова, потому что здесь свои.',
    en: 'A location is a standing place: the same spot, every Saturday at 7 pm, week after week, with no host and no agenda. People just show up — some to talk shop, others about anything but work — and that’s how the core forms: the ones who keep coming back because this is their crowd.',
  },
  body: {
    ru: 'Своим становится любой, кто представится: кто ты, откуда, чем занимаешься, что вдохновляет и бесит — просто рассказывают о себе, как рассказали бы новому знакомому. Дальше это работает как среди друзей: рекламы нет, но если место или мероприятие правда понравилось — можно поручиться за него лично, своими словами. А если нужна любая помощь или информация — спрашивают здесь же, у своих.',
    en: 'You become one of them by introducing yourself: who you are, where you’re from, what you do, what excites you and what annoys you — just talking about yourself the way you would to someone new. From there it works like among friends: no ads, but if a place or an event genuinely won you over, you can vouch for it yourself, in your own words. And if you need help or information, this is where you ask — among your own.',
  },
}

export default function LocationsView() {
  const { lang, t, to } = useT()
  const c = t(JAIORA)
  const [activeCity, setActiveCity] = useState<number | null>(null)
  const navigate = useNavigate()
  const goToCity = (i: number) => navigate(to(`/location/${CITY_CHATS[i].slug}`))

  return (
    <Page>
      <header className="s-jhero">
        <div>
          <p className="s-eyebrow">Jaiora</p>
          <h1 className="s-jtitle">{t(T.title)}</h1>
          <p className="s-lead">{t(T.lead)}</p>
          <p className="s-lead">{t(T.body)}</p>
        </div>
      </header>

      <section className="s-section">
        <div className="s-bento">
          <div className="s-card s-span-12 s-card-static">
            <span className="s-card-title">{c.cityChats}</span>
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
            <PlacesMap places={CITY_PLACES} label={{ ru: 'Карта локаций с чатами Jaiora', en: 'Map of Jaiora locations' }} active={activeCity} onActive={setActiveCity} onSelect={goToCity} />
            <CityChips items={CITY_CHATS} lang={lang} active={activeCity} onActive={setActiveCity} />
          </div>
          <div className="s-card s-span-12 s-card-static">
            <span className="s-card-title">{c.themeChats}</span>
            <Chips items={THEME_CHATS} lang={lang} />
          </div>
        </div>
      </section>
    </Page>
  )
}
