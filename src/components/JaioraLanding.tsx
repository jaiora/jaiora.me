import { Fragment, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Page from '@/components/site/Page'
import { CityChips } from '@/components/site/Chips'
import { CITY_CHATS, STATUS_META, STATUS_ORDER, itemText } from '@/data/links'
import { JAIORA, NETWORK, type Story, type Tile } from '@/data/jaiora'
import { useT } from '@/lib/i18n'
import type { Place } from '@/data/places'
import PlacesMap from '@/components/site/PlacesMap'
import Faq from '@/components/site/Faq'
import { FAQ_TITLE, homeFaq } from '@/data/faq'
import { useHydrated } from '@/lib/dates'

// Города чатов на карте: названия и порядок — из списка чатов
const CITY_PLACES: Place[] = CITY_CHATS.map((c) => ({
  name: { ru: itemText(c, 'ru').label, en: itemText(c, 'en').label },
  lat: c.lat ?? 0,
  lon: c.lon ?? 0,
  color: c.status ? STATUS_META[c.status].color : undefined,
}))

// Карта первого экрана: точки загораются с востока на запад, все одним фирменным цветом — статусы на карте ниже
const HERO_PLACES: Place[] = [...CITY_PLACES].sort((a, b) => b.lon - a.lon).map((p) => ({ ...p, color: undefined }))

const PHASE_CLASS = ['ph-me', 'ph-together', 'ph-people', 'ph-jaiora']

// Вся анимация первого экрана — 2 секунды: точки за 1,6 с (+0,4 с на проявление последней), счётчики за то же время
const HERO_MS = 2000
const HERO_STEP_MS = 1600 / HERO_PLACES.length

const HERO_T = {
  locations: { ru: 'локаций', en: 'locations' },
  people: { ru: 'человек в сообществе', en: 'people in the community' },
  goal: { ru: 'цель', en: 'goal' },
}

const reducedMotion = () => typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches

// Число бежит от 0 до target к моменту startedAt + HERO_MS (с замедлением к концу).
// В готовом HTML и при первом проходе оживления — сразу target, чтобы разметка совпала и роботы видели итог
function useCountUp(target: number, run: boolean, startedAt: number) {
  const [value, setValue] = useState<number | null>(null)
  const animate = run && !reducedMotion()
  useEffect(() => {
    if (!animate) return
    let raf = 0
    const duration = Math.max(600, startedAt + HERO_MS - performance.now())
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      setValue(Math.round(target * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, animate, startedAt])
  return value ?? (animate ? 0 : target)
}

// fromLoad — первый показ при загрузке страницы: точки уже анимирует CSS с начала загрузки, счётчики догоняют их к 2 с;
// при повторном показе (клик по «Jaiora») отсчёт идёт от момента пересоздания карты
function HeroMap({ fromLoad }: { fromLoad: boolean }) {
  const { t, lang } = useT()
  const [startedAt] = useState(() => (fromLoad || typeof performance === 'undefined' ? 0 : performance.now()))
  const hydrated = useHydrated()
  const cities = useCountUp(HERO_PLACES.length, hydrated, startedAt)
  const people = useCountUp(NETWORK.people, hydrated, startedAt)
  const fmt = (n: number) => n.toLocaleString(lang === 'ru' ? 'ru-RU' : 'en-US')
  return (
    <div className={`s-hero-map${hydrated ? ' is-live' : ''}`}>
      <PlacesMap
        places={HERO_PLACES}
        label={{ ru: 'Локации Jaiora на карте мира', en: 'Jaiora locations on the world map' }}
        active={null}
        onActive={() => {}}
        sequential
        sequentialStepMs={HERO_STEP_MS}
      />
      <div className="s-hero-stats">
        <p className="s-hero-stat">
          <span className="s-hero-num">{cities}</span> {t(HERO_T.locations)}
        </p>
        <div className="s-hero-people">
          <p className="s-hero-stat">
            <span className="s-hero-num">{fmt(people)}</span> {t(HERO_T.people)}
          </p>
          <div className="s-hero-bar" aria-hidden="true">
            <div className="s-hero-bar-fill" style={{ width: `${(people / NETWORK.goalPeople) * 100}%` }} />
          </div>
          <p className="s-hero-goal">
            {t(HERO_T.goal)} {NETWORK.goalYear} · {fmt(NETWORK.goalPeople)}
          </p>
        </div>
      </div>
    </div>
  )
}

function Tiles({ items }: { items: Tile[] }) {
  return (
    <div className="s-bento">
      {items.map((t) => (
        <div key={t.title} className={`s-card ${items.length === 2 ? 's-span-6' : 's-span-4'} s-card-static`}>
          <span className="s-card-title">{t.title}</span>
          <span className="s-card-text">{t.text}</span>
        </div>
      ))}
    </div>
  )
}

// Одно слово в тексте шага хроники можно сделать ссылкой (например, GetMentor)
function withLink(s: Story) {
  if (!s.link) return s.text
  const [before, ...rest] = s.text.split(s.link.word)
  if (!rest.length) return s.text
  return (
    <>
      {before}
      <a href={s.link.href} target="_blank" rel="noopener noreferrer">{s.link.word}</a>
      {rest.join(s.link.word)}
    </>
  )
}

export default function JaioraLanding() {
  const { lang, t, to } = useT()
  const navigate = useNavigate()
  const goToCity = (i: number) => navigate(to(`/location/${CITY_CHATS[i].slug}`))
  const c = t(JAIORA)
  const [activeCity, setActiveCity] = useState<number | null>(null)
  // Клик по «Jaiora» в шапке — новый переход: карта пересоздаётся и анимация играет заново
  const location = useLocation()

  const storyPhase = c.story.reduce<number[]>((acc, item, i) => {
    acc.push(item.phase ? (i === 0 ? 0 : acc[i - 1] + 1) : (acc[i - 1] ?? 0))
    return acc
  }, [])

  return (
    <>
      <Page>
      <header className="s-jhero has-map">
        <img className="s-jlogo" src="/logo.svg" alt="Jaiora" width="112" height="112" />
        <div>
          <p className="s-eyebrow">{c.eyebrow}</p>
          <h1 className="s-jtitle">{c.title}</h1>
          <p className="s-lead">{c.lead}</p>
        </div>
        <HeroMap key={location.key} fromLoad={location.key === 'default'} />
      </header>

      <section className="s-meet">
        <div>
          <p className="s-meet-when">{c.meet.when}</p>
          <h2 className="s-meet-title">{c.meet.title}</h2>
        </div>
        <p className="s-meet-text">{c.meet.text}</p>
        <div className="s-meet-cities">
          <button
            className="s-pill s-pill-solid"
            onClick={() => document.getElementById('cities')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
          >
            {c.meet.button}
          </button>
        </div>
      </section>

      <section className="s-section">
        <h2 className="s-h2">{c.rulesTitle}</h2>
        <p className="s-lead">{c.rulesLead}</p>
        <div className="s-bento">
          {c.rules.map((r) => (
            <div key={r.title} className="s-card s-span-6 s-card-static s-feature">
              <span className="s-card-title">{r.title}</span>
              <span className="s-card-text">{r.text}</span>
            </div>
          ))}
        </div>
        <Tiles items={c.values} />
      </section>

      <section className="s-section">
        <h2 className="s-h2">{c.findTitle}</h2>
        <Tiles items={c.find} />
      </section>

      <section className="s-section">
        <h2 className="s-h2">{c.storyTitle}</h2>
        <p className="s-lead">
          {c.storyBy.lead}
          <a href={c.storyBy.href} target="_blank" rel="noopener noreferrer">{c.storyBy.name}</a>
          {c.storyBy.tail}
        </p>
        <ol className="s-timeline">
          {c.story.map((s, i) => (
            <Fragment key={s.title}>
              {s.group && (
                <li className={`s-group ${PHASE_CLASS[storyPhase[i]]}`} aria-hidden="true">
                  {s.group}
                </li>
              )}
              {s.phase && (
                <li className={`s-phase ${PHASE_CLASS[storyPhase[i]]}`} aria-hidden="true">
                  {s.phase}
                </li>
              )}
              <li className={`s-step ${PHASE_CLASS[storyPhase[i]]}${s.pre ? ' s-step-pre' : ''}${s.year === '2026' ? ' s-step-now' : ''}${s.goal ? ' s-step-goal' : ''}`}>
                <span className="s-step-name">
                  {s.title}
                  {s.year && <span className="s-step-year">{s.year}</span>}
                </span>
                <span className="s-step-text">{withLink(s)}</span>
              </li>
            </Fragment>
          ))}
        </ol>
      </section>

      <section className="s-section">
        <h2 className="s-h2">{c.haveTitle}</h2>
        <div className="s-bento">
          <div id="cities" className="s-card s-span-12 s-card-static s-anchor">
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
            <PlacesMap places={CITY_PLACES} label={{ ru: 'Карта городов с чатами Jaiora', en: 'Map of Jaiora city chats' }} active={activeCity} onActive={setActiveCity} onSelect={goToCity} />
            <CityChips items={CITY_CHATS} lang={lang} active={activeCity} onActive={setActiveCity} />
          </div>
        </div>
      </section>

      <Faq title={t(FAQ_TITLE)} items={homeFaq(lang)} />
      </Page>
    </>
  )
}
