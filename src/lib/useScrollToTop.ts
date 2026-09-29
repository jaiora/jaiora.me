import { useLayoutEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

// Новая страница открывается с начала (или на якоре), а не с прокрутки прошлой.
// Первый проход пропускаем: при перезагрузке браузер сам возвращает место, где читали
export function useScrollToTop() {
  const { pathname, hash } = useLocation()
  const first = useRef(true)
  useLayoutEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    if (hash) {
      document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView()
      return
    }
    window.scrollTo(0, 0)
    // hash — только при входе на страницу с якорем, дальше якоря листает браузер
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])
}
