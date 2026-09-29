import type { Lang } from '@/lib/i18n'
import { CITY_CHATS, itemText, whereText } from '@/data/links'
import { POSTS } from '@/data/blog'

export const SITE_URL = 'https://jaiora.me'

export interface PageMeta {
  path: string
  lang: Lang
  title: string
  description: string
}

const STATIC: Record<string, Record<Lang, PageMeta>> = {
  '/': {
    ru: {
      path: '/',
      lang: 'ru',
      title: 'Jaiora — оффлайн-LinkedIn: находим человека под задачу и знакомим вживую',
      description: 'Jaiora — сообщество и встречи: у любой задачи и цели есть человек, который поможет. Помогаем его найти и встретиться вживую. Городские и тематические чаты.',
    },
    en: {
      path: '/en',
      lang: 'en',
      title: 'Jaiora — offline LinkedIn: we find the right person and introduce you in person',
      description: 'Jaiora is a community and meetups: every task and goal has a person who can help. We help you find them and meet in person. City and topic chats.',
    },
  },
  '/blog': {
    ru: { path: '/blog', lang: 'ru', title: 'Блог — Jaiora', description: 'Заметки о сообществе, городах и людях Jaiora.' },
    en: { path: '/en/blog', lang: 'en', title: 'Blog — Jaiora', description: 'Notes on the Jaiora community, cities, and people.' },
  },
  '/team': {
    ru: { path: '/team', lang: 'ru', title: 'Команда — Jaiora', description: 'Те, кто организует встречи, ведёт чаты и двигает Jaiora вперёд.' },
    en: { path: '/en/team', lang: 'en', title: 'Team — Jaiora', description: 'The people who run meetups, keep the chats alive, and drive Jaiora forward.' },
  },
  '/locations': {
    ru: { path: '/locations', lang: 'ru', title: 'Локации — Jaiora', description: 'Личная встреча решает то, что чат не решает. Что такое локация Jaiora и как найти свою.' },
    en: { path: '/en/locations', lang: 'en', title: 'Locations — Jaiora', description: 'A real meetup settles what a chat can’t. What a Jaiora location is and how to find yours.' },
  },
}

// pathname — уже без языкового префикса (см. stripLang)
export function metaFor(lang: Lang, pathname: string): PageMeta | undefined {
  if (STATIC[pathname]) return STATIC[pathname][lang]

  const location = pathname.match(/^\/location\/([^/]+)$/)
  if (location) {
    const c = CITY_CHATS.find((x) => x.slug === location[1])
    if (!c) return undefined
    const name = itemText(c, lang).label
    const where = whereText(c, lang)
    return lang === 'en'
      ? { path: `/en/location/${c.slug}`, lang, title: `Jaiora in ${name} — offline LinkedIn`, description: `Jaiora in ${name}: a networking community and meetups. Join the local chat and find the person you need.` }
      : { path: `/location/${c.slug}`, lang, title: `Jaiora в ${where} — оффлайн-LinkedIn`, description: `Jaiora в ${where}: сообщество нетворкинга и встречи вживую. Локальный чат и нужный человек — здесь.` }
  }

  const post = pathname.match(/^\/blog\/([^/]+)$/)
  if (post) {
    const p = POSTS.find((x) => x.slug === post[1] && x.lang === lang)
    if (!p) return undefined
    return { path: withLangPath(`/blog/${p.slug}`, lang), lang, title: `${p.title} — Jaiora`, description: p.description }
  }

  return undefined
}

const withLangPath = (path: string, lang: Lang) => (lang === 'en' ? '/en' + path : path)
