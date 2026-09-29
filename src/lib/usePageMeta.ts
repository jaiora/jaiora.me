import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { metaFor, SITE_URL } from '@/data/seo'
import { stripLang, useLang } from '@/lib/i18n'

function setTag(selector: string, create: () => HTMLElement, attr: string, value: string) {
  let el = document.head.querySelector<HTMLElement>(selector)
  if (!el) {
    el = create()
    document.head.appendChild(el)
  }
  el.setAttribute(attr, value)
}

// Статичный index.html уже содержит RU-теги главной; хук обновляет их при переходах и переключении языка.
export function usePageMeta() {
  const lang = useLang()
  const { pathname } = useLocation()
  useEffect(() => {
    const m = metaFor(lang, stripLang(pathname))
    if (!m) return
    document.title = m.title
    document.documentElement.lang = m.lang
    setTag('meta[name="description"]', () => Object.assign(document.createElement('meta'), { name: 'description' }), 'content', m.description)
    setTag('link[rel="canonical"]', () => Object.assign(document.createElement('link'), { rel: 'canonical' }), 'href', SITE_URL + m.path)
  }, [lang, pathname])
}
