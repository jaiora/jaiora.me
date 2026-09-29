import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
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
