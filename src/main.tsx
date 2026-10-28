import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
// Пс1 (quint/specs/site_privacy.qnt): шрифты — с самого сайта, не с fonts.googleapis.com: посетитель не уходит к Google
import '@fontsource/manrope/400.css'
import '@fontsource/manrope/500.css'
import '@fontsource/manrope/600.css'
import '@fontsource/manrope/700.css'
import '@fontsource/manrope/800.css'
import '@fontsource/jetbrains-mono/400.css'
import '@fontsource/jetbrains-mono/500.css'
import '@fontsource/jetbrains-mono/600.css'
import './styles/site.css'

const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Root element #root not found in index.html')
}

const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

// Страницы выложены готовым HTML: оживляем его; иначе (dev) рисуем с нуля.
// 404.html отдаётся на любой несуществующий адрес, в том числе английский — его перерисовываем, а не оживляем
if (rootElement.hasChildNodes() && !rootElement.hasAttribute('data-fresh')) hydrateRoot(rootElement, app)
else createRoot(rootElement).render(app)
