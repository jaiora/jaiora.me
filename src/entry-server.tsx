import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import App from './App'

export function render(url: string): string {
  return renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
  )
}

export { allPages, breadcrumbs, organization, website, urlOf, SITE_URL } from './data/seo'
// Данные для llms.txt / llms-full.txt: собираются из тех же источников, что рендерит React
export { JAIORA, NETWORK } from './data/jaiora'
export { CITY_CHATS, STATUS_META, itemText } from './data/links'
export { TEAM } from './data/team'
export { POSTS } from './data/blog'
