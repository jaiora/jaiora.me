import { withLang, type Lang } from '@/lib/i18n'
import { CITY_CHATS, CITY_TZ, itemText, whereText, type CityChat } from '@/data/links'
import { POSTS } from '@/data/blog'
import { JAIORA, NETWORK } from '@/data/jaiora'
import { TEAM } from '@/data/team'
import { homeFaq, locationFaq, type FaqItem } from '@/data/faq'
import { nextSaturdayIso } from '@/lib/dates'

export const SITE_URL = 'https://jaiora.me'
export const ORG_ID = `${SITE_URL}/#org`
export const WEBSITE_ID = `${SITE_URL}/#website`
// Та же карточка основателя, что на urvanov.com: один @id связывает графы двух сайтов
export const FOUNDER_ID = 'https://www.urvanov.com/#person'

// GitHub Pages отдаёт разделы как /путь/, поэтому канонический адрес — со слэшем
export const urlOf = (path: string) => SITE_URL + (path === '/' || path.endsWith('/') ? path : path + '/')

type Node = Record<string, unknown>

export interface PageMeta {
  path: string
  lang: Lang
  title: string
  description: string
  type?: 'website' | 'article'
  image: string
  noindex?: boolean
  date?: string
  // Файлы, от которых зависит страница: дата последнего коммита по ним — честный lastmod в sitemap
  sources: string[]
  alternates: { lang: Lang; path: string }[]
  crumbs: { name: string; path: string }[]
  jsonLd: Node[]
}

const LANGS: Lang[] = ['ru', 'en']
const cityName = (c: CityChat, lang: Lang) => itemText(c, lang).label
const ogImage = (lang: Lang) => (lang === 'en' ? '/og.en.png' : '/og.png')

export function organization(lang: Lang): Node {
  const c = JAIORA[lang]
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: 'Jaiora',
    alternateName: lang === 'en' ? 'Jaiora' : 'Джайора',
    slogan: c.title,
    description:
      lang === 'en'
        ? `Offline LinkedIn: a networking community and meetups. Every task and goal has a person who can help — we help you find them and meet in person. ${NETWORK.people.toLocaleString('en-US')} members across ${CITY_CHATS.length} cities today, with a ${NETWORK.goalYear} goal of 30 cities and ${NETWORK.goalPeople.toLocaleString('en-US')} members.`
        : `Оффлайн-LinkedIn: сообщество нетворкинга и встречи вживую. У любой задачи и цели есть человек, который поможет её решить — мы помогаем его найти и встретиться. Сейчас ${NETWORK.people.toLocaleString('ru-RU')} участников в ${CITY_CHATS.length} городах, цель на ${NETWORK.goalYear} год — 30 городов и ${NETWORK.goalPeople.toLocaleString('ru-RU')} участников.`,
    url: urlOf(withLang('/', lang)),
    logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.svg`, width: 100, height: 100 },
    image: `${SITE_URL}${ogImage(lang)}`,
    foundingDate: '2026',
    founder: { '@type': 'Person', '@id': FOUNDER_ID, name: lang === 'en' ? 'Egor Urvanov' : 'Егор Урванов', url: 'https://www.urvanov.com/' },
    areaServed: CITY_CHATS.map((x) => ({ '@type': 'City', name: cityName(x, lang) })),
    knowsLanguage: ['ru', 'en'],
    sameAs: ['https://www.urvanov.com/jaiora/', ...CITY_CHATS.map((x) => x.url)],
  }
}

export function website(lang: Lang): Node {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: 'Jaiora',
    url: `${SITE_URL}/`,
    inLanguage: ['ru', 'en'],
    publisher: { '@id': ORG_ID },
    description: JAIORA[lang].lead,
  }
}

const webPage = (type: string, path: string, lang: Lang, name: string, description: string, extra: Node = {}): Node => ({
  '@type': type,
  '@id': urlOf(path) + '#page',
  url: urlOf(path),
  name,
  description,
  inLanguage: lang,
  isPartOf: { '@id': WEBSITE_ID },
  about: { '@id': ORG_ID },
  ...extra,
})

const faqPage = (id: string, lang: Lang, items: FaqItem[]): Node => ({
  '@type': 'FAQPage',
  '@id': id,
  inLanguage: lang,
  mainEntity: items.map((it) => ({ '@type': 'Question', name: it.q, acceptedAnswer: { '@type': 'Answer', text: it.a } })),
})

// startDate — ближайшая суббота на момент сборки: без даты начала Google не показывает событие в выдаче, а сайт пересобирается при каждой выкладке
function weeklyMeetup(c: CityChat, lang: Lang, path: string): Node {
  const name = cityName(c, lang)
  return {
    '@type': 'Event',
    '@id': urlOf(path) + '#meetup',
    name: lang === 'en' ? `Jaiora meetup in ${name}` : `Встреча Jaiora в ${whereText(c, 'ru')}`,
    description: JAIORA[lang].meet.text,
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    isAccessibleForFree: true,
    inLanguage: 'ru',
    organizer: { '@id': ORG_ID },
    location: { '@type': 'Place', name, address: { '@type': 'PostalAddress', addressLocality: name } },
    url: urlOf(path),
    ...(CITY_TZ[c.slug] ? { startDate: nextSaturdayIso(CITY_TZ[c.slug]) } : {}),
    eventSchedule: {
      '@type': 'Schedule',
      repeatFrequency: 'P1W',
      byDay: 'https://schema.org/Saturday',
      startTime: '19:00',
      ...(CITY_TZ[c.slug] ? { scheduleTimezone: CITY_TZ[c.slug] } : {}),
    },
  }
}

const STATIC_TEXT = {
  locations: {
    ru: { title: 'Локации — Jaiora', description: 'Личная встреча решает то, что чат не решает. Что такое локация Jaiora, какие есть города и статус встреч в каждом.' },
    en: { title: 'Locations — Jaiora', description: 'A real meetup settles what a chat can’t. What a Jaiora location is, which cities there are, and the meetup status in each.' },
  },
  blog: {
    ru: { title: 'Блог — Jaiora', description: 'Заметки о сообществе, городах и людях Jaiora.' },
    en: { title: 'Blog — Jaiora', description: 'Notes on the Jaiora community, cities, and people.' },
  },
  team: {
    ru: { title: 'Команда — Jaiora', description: 'Те, кто организует встречи, ведёт чаты и двигает Jaiora вперёд.' },
    en: { title: 'Team — Jaiora', description: 'The people who run meetups, keep the chats alive, and drive Jaiora forward.' },
  },
  home: {
    ru: { title: 'Jaiora — оффлайн-LinkedIn: находим человека под задачу и знакомим вживую', description: 'Jaiora — сообщество и встречи: у любой задачи и цели есть человек, который поможет. Помогаем его найти и встретиться вживую. 11 локаций, 10 000 человек.' },
    en: { title: 'Jaiora — offline LinkedIn: we find the right person and introduce you in person', description: 'Jaiora is a community and meetups: every task and goal has a person who can help. We help you find them and meet in person. 11 locations, 10,000 people.' },
  },
}

const CRUMB = {
  home: { ru: 'Главная', en: 'Home' },
  locations: { ru: 'Локации', en: 'Locations' },
  blog: { ru: 'Блог', en: 'Blog' },
  team: { ru: 'Команда', en: 'Team' },
}

// Описание локации: реальные факты из баннера истории, если он есть, иначе общий текст
function cityDescription(c: CityChat, lang: Lang): string {
  const banner = c.story?.banner?.text[lang]
  if (lang === 'en') return `Jaiora in ${cityName(c, lang)}. ${banner ?? 'A networking community and meetups. Join the local chat and find the person you need.'}`
  return `Jaiora в ${whereText(c, 'ru')}. ${banner ?? 'Сообщество нетворкинга и встречи вживую. Локальный чат и нужный человек — здесь.'}`
}

const storyText = (c: CityChat, lang: Lang) => c.story?.paragraph[lang].map((p) => p.text).join('') ?? ''

export function allPages(): PageMeta[] {
  const pages: PageMeta[] = []
  const add = (base: string, build: (lang: Lang, path: string) => Omit<PageMeta, 'path' | 'lang' | 'alternates' | 'image'> & { image?: string }) => {
    const alternates = LANGS.map((l) => ({ lang: l, path: withLang(base, l) }))
    for (const lang of LANGS) {
      const path = withLang(base, lang)
      pages.push({ image: ogImage(lang), ...build(lang, path), path, lang, alternates })
    }
  }

  add('/', (lang, path) => {
    const m = STATIC_TEXT.home[lang]
    return {
      ...m,
      sources: ['src/components/JaioraLanding.tsx', 'src/data/jaiora.ts', 'src/data/links.ts'],
      crumbs: [],
      jsonLd: [webPage('WebPage', path, lang, m.title, m.description, { primaryImageOfPage: `${SITE_URL}${ogImage(lang)}` }), faqPage(urlOf(path) + '#faq', lang, homeFaq(lang))],
    }
  })

  add('/locations', (lang, path) => {
    const m = STATIC_TEXT.locations[lang]
    return {
      ...m,
      sources: ['src/components/LocationsView.tsx', 'src/data/links.ts'],
      crumbs: [{ name: CRUMB.locations[lang], path }],
      jsonLd: [
        webPage('CollectionPage', path, lang, m.title, m.description, {
          mainEntity: {
            '@type': 'ItemList',
            numberOfItems: CITY_CHATS.length,
            itemListElement: CITY_CHATS.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: cityName(c, lang), url: urlOf(withLang(`/location/${c.slug}`, lang)) })),
          },
        }),
      ],
    }
  })

  for (const c of CITY_CHATS) {
    add(`/location/${c.slug}`, (lang, path) => {
      const name = cityName(c, lang)
      const title = lang === 'en' ? `IT community in ${name}: chat and meetups for tech people — Jaiora` : `IT-сообщество в ${whereText(c, 'ru')}: чат и встречи айтишников — Jaiora`
      const description = cityDescription(c, lang)
      const story = storyText(c, lang)
      return {
        title,
        description,
        image: c.story?.photo?.src ?? ogImage(lang),
        sources: ['src/components/LocationView.tsx', 'src/data/links.ts'],
        crumbs: [
          { name: CRUMB.locations[lang], path: withLang('/locations', lang) },
          { name, path },
        ],
        jsonLd: [
          webPage('WebPage', path, lang, title, description, {
            about: [
              { '@id': ORG_ID },
              { '@type': 'City', name, geo: { '@type': 'GeoCoordinates', latitude: c.lat, longitude: c.lon } },
            ],
            relatedLink: c.url,
            ...(c.story?.photo ? { primaryImageOfPage: { '@type': 'ImageObject', url: SITE_URL + c.story.photo.src, caption: c.story.photo.alt[lang] } } : {}),
            ...(story ? { abstract: story } : {}),
            mentions: c.story?.paragraph[lang].filter((p) => p.href?.startsWith('https://t.me/')).map((p) => ({ '@type': 'Person', name: p.text, sameAs: p.href })),
            ...(c.story?.updated ? { dateModified: c.story.updated } : {}),
          }),
          ...(locationFaq(c.slug, lang).length ? [faqPage(urlOf(path) + '#faq', lang, locationFaq(c.slug, lang))] : []),
          ...(c.status === 'autonomous' ? [weeklyMeetup(c, lang, path)] : []),
        ],
      }
    })
  }

  // Пока постов нет, индекс блога пустой — не показываем его поисковикам как «тонкую» страницу
  add('/blog', (lang, path) => {
    const m = STATIC_TEXT.blog[lang]
    return {
      ...m,
      noindex: !POSTS.some((p) => p.lang === lang),
      sources: ['src/components/BlogView.tsx', 'src/data/blog.ts'],
      crumbs: [{ name: CRUMB.blog[lang], path }],
      jsonLd: [webPage('CollectionPage', path, lang, m.title, m.description, { mainEntity: { '@type': 'Blog', name: m.title, publisher: { '@id': ORG_ID } } })],
    }
  })

  add('/team', (lang, path) => {
    const m = STATIC_TEXT.team[lang]
    return {
      ...m,
      sources: ['src/components/TeamView.tsx', 'src/data/team.ts'],
      crumbs: [{ name: CRUMB.team[lang], path }],
      jsonLd: [
        webPage('AboutPage', path, lang, m.title, m.description, {
          mainEntity: {
            '@type': 'ItemList',
            itemListElement: TEAM.map((p, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              item: { '@type': 'Person', name: p.name, sameAs: `https://t.me/${p.handle}`, memberOf: { '@id': ORG_ID } },
            })),
          },
        }),
      ],
    }
  })

  for (const p of POSTS) {
    const path = withLang(`/blog/${p.slug}`, p.lang)
    pages.push({
      path,
      lang: p.lang,
      title: `${p.title} — Jaiora`,
      description: p.description,
      type: 'article',
      date: p.date,
      image: ogImage(p.lang),
      sources: ['src/data/blog.ts'],
      alternates: [{ lang: p.lang, path }],
      crumbs: [
        { name: CRUMB.blog[p.lang], path: withLang('/blog', p.lang) },
        { name: p.title, path },
      ],
      jsonLd: [
        {
          '@type': 'BlogPosting',
          '@id': urlOf(path) + '#page',
          headline: p.title,
          description: p.description,
          datePublished: p.date,
          inLanguage: p.lang,
          url: urlOf(path),
          keywords: p.tags.join(', '),
          publisher: { '@id': ORG_ID },
          isPartOf: { '@id': WEBSITE_ID },
        },
      ],
    })
  }

  return pages
}

export function breadcrumbs(page: PageMeta): Node | null {
  if (!page.crumbs.length) return null
  const items = [{ name: CRUMB.home[page.lang], path: withLang('/', page.lang) }, ...page.crumbs]
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: urlOf(it.path) })),
  }
}

// Для клиентских переходов: путь с языковым префиксом, лишний слэш в конце не мешает
const normalize = (path: string) => path.replace(/\/+$/, '') || '/'
export const metaFor = (path: string): PageMeta | undefined => {
  const p = normalize(path)
  return allPages().find((x) => x.path === p)
}
