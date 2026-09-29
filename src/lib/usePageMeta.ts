import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { metaFor, urlOf } from '@/data/seo'

function setTag(selector: string, create: () => HTMLElement, attr: string, value: string) {
  let el = document.head.querySelector<HTMLElement>(selector)
  if (!el) {
    el = create()
    document.head.appendChild(el)
  }
  el.setAttribute(attr, value)
}

// Готовый HTML каждой страницы уже содержит полный набор тегов (scripts/prerender.mjs);
// хук только держит их в согласии при клиентских переходах между страницами.
export function usePageMeta() {
  const { pathname } = useLocation()
  useEffect(() => {
    const m = metaFor(pathname)
    if (!m) return
    document.title = m.title
    document.documentElement.lang = m.lang
    setTag('meta[name="description"]', () => Object.assign(document.createElement('meta'), { name: 'description' }), 'content', m.description)
    setTag('link[rel="canonical"]', () => Object.assign(document.createElement('link'), { rel: 'canonical' }), 'href', urlOf(m.path))
  }, [pathname])
}
