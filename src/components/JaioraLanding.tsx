import { Fragment, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Page from '@/components/site/Page'
import { CityChips } from '@/components/site/Chips'
import { CITY_CHATS, STATUS_META, STATUS_ORDER, itemText } from '@/data/links'
import { JAIORA, NETWORK, type Tile } from '@/data/jaiora'
import { useT } from '@/lib/i18n'
import type { Place } from '@/data/places'
import PlacesMap from '@/components/site/PlacesMap'

// Города чатов на карте: названия и порядок — из списка чатов
const CITY_PLACES: Place[] = CITY_CHATS.map((c) => ({
  name: { ru: itemText(c, 'ru').label, en: itemText(c, 'en').label },
  lat: c.lat ?? 0,
  lon: c.lon ?? 0,
  color: c.status ? STATUS_META[c.status].color : undefined,
}))

// В заставке точки загораются с востока на запад
const INTRO_PLACES: Place[] = [...CITY_PLACES].sort((a, b) => b.lon - a.lon)

const PHASE_CLASS = ['ph-me', 'ph-together', 'ph-people', 'ph-jaiora']

// Анимация точек на карте показываем только первому визиту — дальше не повторяем
const INTRO_KEY = 'jaiora-intro-seen'
const INTRO_STEP_MS = 900

const INTRO_T = {
  title: { ru: 'Свои люди в каждом городе', en: 'Your people in every city' },
  count: { ru: 'локаций', en: 'locations' },
  when: { ru: 'встречи каждую субботу · 19:00', en: 'meetups every Saturday · 7 pm' },
  close: { ru: 'Закрыть', en: 'Close' },
  people: { ru: 'человек в сообществе', en: 'people in the community' },
  goal: { ru: 'цель', en: 'goal' },
}

// Число плавно бежит от 0 до target за durationMs (с замедлением к концу)
function useCountUp(target: number, durationMs: number) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - start) / durationMs, 1)
      setValue(Math.round(target * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, durationMs])
  return value
}

function IntroOverlay({ onDone }: { onDone: () => void }) {
  const { t, lang } = useT()
  const [leaving, setLeaving] = useState(false)
  const people = useCountUp(NETWORK.people, INTRO_PLACES.length * INTRO_STEP_MS)
  const fmt = (n: number) => n.toLocaleString(lang === 'ru' ? 'ru-RU' : 'en-US')
  // step: сколько городов уже зажглось; лишний шаг в конце снимает подпись с последнего города
  const [step, setStep] = useState(0)
  const total = INTRO_PLACES.length
  const lit = Math.min(step, total)
  const current = step >= 1 && step <= total ? step - 1 : null

  useEffect(() => {
    if (step > total) return
    const timer = setTimeout(() => setStep((n) => n + 1), step === 0 ? 400 : INTRO_STEP_MS)
    return () => clearTimeout(timer)
  }, [step, total])

  useEffect(() => {
    if (!leaving) return
    const t = setTimeout(onDone, 300)
    return () => clearTimeout(t)
  }, [leaving, onDone])

  return (
    <div className={`s-intro site site-jaiora${leaving ? ' is-leaving' : ''}`}>
      <button type="button" className="s-intro-close" aria-label={t(INTRO_T.close)} onClick={() => setLeaving(true)}>
        ×
      </button>
      <div className="s-intro-head">
        <p className="s-eyebrow">Jaiora</p>
        <p className="s-intro-title">{t(INTRO_T.title)}</p>
        <p className="s-intro-stat">
          <span className="s-intro-count">{lit}</span> {t(INTRO_T.count)} · {t(INTRO_T.when)}
        </p>
      </div>
      <PlacesMap
        places={INTRO_PLACES.slice(0, lit)}
        label={{ ru: 'Локации Jaiora', en: 'Jaiora locations' }}
        active={current}
        onActive={() => {}}
        sequential
        sequentialStepMs={0}
      />
      <div className="s-intro-people">
        <p className="s-intro-people-num">
          <span>{fmt(people)}</span> {t(INTRO_T.people)}
        </p>
        <div className="s-intro-bar" aria-hidden="true">
          <div className="s-intro-bar-fill" style={{ width: `${(people / NETWORK.goalPeople) * 100}%` }} />
        </div>
        <p className="s-intro-goal">
          {t(INTRO_T.goal)} {NETWORK.goalYear} · {fmt(NETWORK.goalPeople)}
        </p>
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

export default function JaioraLanding() {
  const { lang, t, to } = useT()
  const navigate = useNavigate()
  const goToCity = (i: number) => navigate(to(`/location/${CITY_CHATS[i].slug}`))
  const c = t(JAIORA)
  const [activeCity, setActiveCity] = useState<number | null>(null)
  const [showIntro, setShowIntro] = useState(() => {
    try {
      return !localStorage.getItem(INTRO_KEY)
    } catch {
      return false
    }
  })
  // Клик по «Jaiora» в шапке передаёт state.intro — каждый такой переход запускает заставку заново
  const location = useLocation()
  const replayKey = (location.state as { intro?: boolean } | null)?.intro ? location.key : null
  const introVisible = showIntro || replayKey !== null

  const storyPhase = c.story.reduce<number[]>((acc, item, i) => {
    acc.push(item.phase ? (i === 0 ? 0 : acc[i - 1] + 1) : (acc[i - 1] ?? 0))
    return acc
  }, [])

  return (
    <>
      {introVisible && (
        <IntroOverlay
          key={replayKey ?? 'first'}
          onDone={() => {
            try {
              localStorage.setItem(INTRO_KEY, '1')
            } catch {
              /* приватный режим — просто не повторяем в рамках вкладки */
            }
            setShowIntro(false)
            // Снимаем флаг из истории, чтобы перезагрузка страницы не проигрывала заставку снова
            if (replayKey) navigate(location.pathname, { replace: true, state: null })
          }}
        />
      )}
      <Page>
      <header className="s-jhero">
        <img className="s-jlogo" src="/logo.svg" alt="Jaiora" width="112" height="112" />
        <div>
          <p className="s-eyebrow">{c.eyebrow}</p>
          <h1 className="s-jtitle">{c.title}</h1>
          <p className="s-lead">{c.lead}</p>
        </div>
      </header>

      <section className="s-meet">
        <div>
          <p className="s-meet-when">{c.meet.when}</p>
          <p className="s-meet-title">{c.meet.title}</p>
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
        <h2 className="s-h2">{c.doneTitle}</h2>
        <h3 className="s-label">{c.socialTitle}</h3>
        <div className="s-bento">
          {c.social.map((s) => (
            <div key={s.title} className="s-card s-span-6 s-card-static s-feature">
              <span className="s-card-title">
                {s.title}
                <span className="s-step-year">{s.year}</span>
              </span>
              <span className="s-card-text">{s.text}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="s-section">
        <h2 className="s-h2">{c.storyTitle}</h2>
        <ol className="s-timeline">
          {c.story.map((s, i) => (
            <Fragment key={s.title}>
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
                <span className="s-step-text">{s.text}</span>
              </li>
            </Fragment>
          ))}
        </ol>
      </section>

      <section className="s-section">
        <h2 className="s-h2">{c.haveTitle}</h2>
        <Tiles items={c.platform} />
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

      <section className="s-section">
        <h2 className="s-h2">{c.helpTitle}</h2>
        <Tiles items={c.help} />
      </section>
      </Page>
    </>
  )
}
