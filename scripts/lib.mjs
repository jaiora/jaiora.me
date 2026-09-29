export const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

// Все теги <head> одной страницы: title, description, robots, canonical, hreflang, Open Graph, Twitter, JSON-LD
export function headTags(page, { SITE_URL, urlOf, graph, canonical = true }) {
  const url = urlOf(page.path)
  const img = SITE_URL + page.image
  const big = page.image.endsWith('.png') || page.image.endsWith('.jpg')
  const tags = [
    `<title>${esc(page.title)}</title>`,
    `<meta name="description" content="${esc(page.description)}" />`,
    `<meta name="robots" content="${page.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1'}" />`,
    `<meta property="og:site_name" content="Jaiora" />`,
    `<meta property="og:locale" content="${page.lang === 'en' ? 'en_US' : 'ru_RU'}" />`,
    `<meta property="og:locale:alternate" content="${page.lang === 'en' ? 'ru_RU' : 'en_US'}" />`,
    `<meta property="og:type" content="${page.type ?? 'website'}" />`,
    `<meta property="og:title" content="${esc(page.title)}" />`,
    `<meta property="og:description" content="${esc(page.description)}" />`,
    `<meta property="og:image" content="${img}" />`,
    `<meta property="og:image:alt" content="${esc(page.title)}" />`,
    `<meta name="twitter:card" content="${big ? 'summary_large_image' : 'summary'}" />`,
    `<meta name="twitter:title" content="${esc(page.title)}" />`,
    `<meta name="twitter:description" content="${esc(page.description)}" />`,
    `<meta name="twitter:image" content="${img}" />`,
  ]
  if (page.image.startsWith('/og')) tags.push(`<meta property="og:image:width" content="1200" />`, `<meta property="og:image:height" content="630" />`)
  // canonical/og:url — только у страниц с реальным адресом (у 404 его нет)
  if (canonical) tags.splice(3, 0, `<link rel="canonical" href="${url}" />`), tags.push(`<meta property="og:url" content="${url}" />`)
  if (page.alternates?.length > 1) {
    for (const a of page.alternates) tags.push(`<link rel="alternate" hreflang="${a.lang}" href="${urlOf(a.path)}" />`)
    const ru = page.alternates.find((a) => a.lang === 'ru')
    if (ru) tags.push(`<link rel="alternate" hreflang="x-default" href="${urlOf(ru.path)}" />`)
  }
  if (page.type === 'article' && page.date) tags.push(`<meta property="article:published_time" content="${page.date}" />`)
  if (graph?.length) tags.push(`<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c')}</script>`)
  return tags.join('\n    ')
}
