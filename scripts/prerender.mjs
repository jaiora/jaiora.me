// Постсборка: превращает SPA в набор готовых HTML-страниц на двух языках (для поисковиков и ИИ-краулеров),
// а также пишет sitemap.xml, robots.txt, llms.txt и llms-full.txt. Устроено так же, как на urvanov.com.
import { mkdirSync, readFileSync, writeFileSync, existsSync, rmSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { execSync } from 'node:child_process'
import { headTags } from './lib.mjs'

const DIST = 'dist'
const { render, allPages, breadcrumbs, organization, website, urlOf, SITE_URL, JAIORA, NETWORK, CITY_CHATS, STATUS_META, itemText, TEAM, POSTS } = await import(
  pathToFileURL(join(process.cwd(), 'dist-ssr/entry-server.js')).href
)

const template = readFileSync(join(DIST, 'index.html'), 'utf8')
const buildDate = new Date().toISOString().slice(0, 10)

// Честная дата изменения: последний коммит по реальным источникам страницы, а не дата сборки
const gitDateCache = new Map()
function gitDate(sources) {
  const key = sources.join('|')
  if (gitDateCache.has(key)) return gitDateCache.get(key)
  let d = buildDate
  try {
    const out = execSync(`git log -1 --format=%cI -- ${sources.map((p) => `'${p}'`).join(' ')}`, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim()
    if (out) d = out.slice(0, 10)
  } catch {
    /* нет git — оставляем дату сборки */
  }
  gitDateCache.set(key, d)
  return d
}

function html(page, { body = '', canonical = true, graph, fresh = false } = {}) {
  const head = headTags(page, { SITE_URL, urlOf, graph, canonical })
  return template
    .replace('<html lang="ru">', `<html lang="${page.lang}">`)
    // Замена функцией: в строке-замене «$&» и «$$» — спецсимволы
    .replace(/<title>[\s\S]*?<\/title>/, () => head)
    .replace('<div id="root"></div>', () => `<div id="root"${fresh ? ' data-fresh' : ''}>${body}</div>`)
}

function write(file, content) {
  const path = join(DIST, file)
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, content)
}

const pages = allPages()
for (const page of pages) {
  let body = ''
  try {
    body = render(page.path)
  } catch (e) {
    console.warn(`  ! ${page.path}: без готового HTML (${e.message}), останется клиентская отрисовка`)
  }
  const graph = [organization(page.lang), website(page.lang), breadcrumbs(page), ...page.jsonLd].filter(Boolean)
  write(page.path === '/' ? 'index.html' : join(page.path, 'index.html'), html(page, { body, graph }))
}

// 404: настоящая страница «не найдено» (NotFoundView), без canonical — адреса /404/ не существует
let body404 = ''
try {
  body404 = render('/404')
} catch (e) {
  console.warn(`  ! /404: без готового HTML (${e.message})`)
}
write('404.html', html({ path: '/404', lang: 'ru', image: '/og.png', noindex: true, title: 'Страница не найдена — Jaiora', description: 'Такой страницы нет. Главная Jaiora и все локации сообщества.' }, { canonical: false, body: body404, fresh: true }))

// sitemap.xml: обе языковые версии со связями hreflang; стиль sitemap.xsl — только для человека в браузере
const indexable = pages.filter((p) => !p.noindex)
const priority = (p) => (p.path === '/' || p.path === '/en' ? '1.0' : p.path.includes('/location/') ? '0.8' : '0.6')
const urls = indexable.map((p) => {
  const alt = p.alternates.length > 1
    ? p.alternates.map((a) => `<xhtml:link rel="alternate" hreflang="${a.lang}" href="${urlOf(a.path)}"/>`).join('') +
      `<xhtml:link rel="alternate" hreflang="x-default" href="${urlOf(p.alternates.find((a) => a.lang === 'ru').path)}"/>`
    : ''
  // Фото со встречи (не общая картинка превью) — отдельной записью, чтобы оно попало в поиск по картинкам
  const photo = p.image && !/\/og(\.en)?\.png$/.test(p.image) ? `<image:image><image:loc>${SITE_URL}${p.image}</image:loc></image:image>` : ''
  return `  <url><loc>${urlOf(p.path)}</loc><lastmod>${p.date ?? gitDate(p.sources)}</lastmod><priority>${priority(p)}</priority>${alt}${photo}</url>`
})
write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urls.join('\n')}\n</urlset>\n`)

// robots.txt: обычные и ИИ-краулеры разрешены явно
const AI_BOTS = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-User', 'Claude-SearchBot', 'anthropic-ai', 'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Applebot-Extended', 'CCBot', 'Amazonbot', 'meta-externalagent', 'cohere-ai', 'YandexAdditional', 'YandexGPT']
write('robots.txt', ['User-agent: *', 'Allow: /', '', ...AI_BOTS.flatMap((b) => [`User-agent: ${b}`, 'Allow: /', '']), `Sitemap: ${SITE_URL}/sitemap.xml`, `Host: ${SITE_URL.replace('https://', '')}`, ''].join('\n'))

// llms.txt — короткая карта сайта для ИИ-ассистентов: факты в первом абзаце, ссылки на разделы и локации
const name = (c, lang) => itemText(c, lang).label
const status = (c, lang) => (c.status ? STATUS_META[c.status].label[lang] : '')
const ru = JAIORA.ru
const en = JAIORA.en
write('llms.txt', [
  '# Jaiora',
  '',
  `> ${ru.eyebrow}. ${ru.lead} ${NETWORK.people.toLocaleString('ru-RU')} человек, ${CITY_CHATS.length} локаций. ${ru.meet.when} — ${ru.meet.title.toLowerCase()}. / ${en.eyebrow}. ${en.lead} ${NETWORK.people.toLocaleString('en-US')} people, ${CITY_CHATS.length} locations. ${en.meet.when} — ${en.meet.title.toLowerCase()}.`,
  '',
  `Основатель — Егор Урванов (https://www.urvanov.com/). Цель на ${NETWORK.goalYear} год — 30 городов и ${NETWORK.goalPeople.toLocaleString('ru-RU')} человек. / Founded by Egor Urvanov. ${NETWORK.goalYear} goal: 30 cities and ${NETWORK.goalPeople.toLocaleString('en-US')} people.`,
  '',
  '## Разделы / Sections',
  `- [Главная](${urlOf('/')}) · [Home](${urlOf('/en')}): что такое Jaiora, правила, история / what Jaiora is, rules, history`,
  `- [Локации](${urlOf('/locations')}) · [Locations](${urlOf('/en/locations')}): все города и статус встреч / all cities and meetup status`,
  `- [Команда](${urlOf('/team')}) · [Team](${urlOf('/en/team')})`,
  '',
  '## Локации / Locations',
  ...CITY_CHATS.map((c) => `- [${name(c, 'ru')} / ${name(c, 'en')}](${urlOf(`/location/${c.slug}`)}): ${status(c, 'ru')} / ${status(c, 'en')}; чат / chat ${c.url}`),
  '',
  '## Полный текст / Full text',
  `- [llms-full.txt](${SITE_URL}/llms-full.txt): главная и история каждой локации целиком, RU и EN / home page and every location's story in full, RU and EN`,
  '',
].join('\n'))

// llms-full.txt — полный текст главной и историй локаций, из тех же данных, что рендерит React
function homeSection(lang) {
  const c = JAIORA[lang]
  return [
    `## Jaiora (${lang.toUpperCase()})`,
    '',
    `${c.eyebrow} — ${c.title}`,
    '',
    c.lead,
    '',
    `${c.meet.when}. ${c.meet.title}. ${c.meet.text}`,
    '',
    `### ${c.rulesTitle}`,
    c.rulesLead,
    ...c.rules.map((r) => `- ${r.title}: ${r.text}`),
    ...c.values.map((v) => `- ${v.title}: ${v.text}`),
    '',
    `### ${c.findTitle}`,
    ...c.find.map((f) => `- ${f.title}: ${f.text}`),
    '',
    `### ${c.storyTitle}`,
    ...c.story.map((s) => `- ${s.phase ? `[${s.phase}] ` : ''}${s.title}${s.year ? ` (${s.year})` : ''}: ${s.text}`),
    '',
  ].join('\n')
}

function locationsSection(lang) {
  const out = [`## ${lang === 'en' ? 'Locations' : 'Локации'} (${lang.toUpperCase()})`, '']
  for (const c of CITY_CHATS) {
    out.push(`### ${name(c, lang)}`, `${lang === 'en' ? 'Status' : 'Статус'}: ${status(c, lang)}. ${lang === 'en' ? 'Chat' : 'Чат'}: ${c.url}. ${urlOf(lang === 'en' ? `/en/location/${c.slug}` : `/location/${c.slug}`)}`)
    if (c.story?.banner) out.push('', `${c.story.banner.title[lang]}. ${c.story.banner.text[lang]}`)
    if (c.story) out.push('', c.story.paragraph[lang].map((p) => p.text).join(''))
    if (c.helped) out.push('', ...c.helped.map((h) => `- ${h.title[lang]} (${h.year}): ${h.text[lang]}`))
    out.push('')
  }
  return out.join('\n')
}

write('llms-full.txt', [
  '# Jaiora — главная и все локации целиком / home page and all locations in full',
  '',
  homeSection('ru'),
  homeSection('en'),
  locationsSection('ru'),
  locationsSection('en'),
  `## Команда / Team`,
  '',
  ...TEAM.map((p) => `- ${p.name} — https://t.me/${p.handle}`),
  '',
  ...(POSTS.length ? ['## Блог / Blog', '', ...POSTS.map((p) => `### ${p.title}\n\n${p.date} · ${urlOf(p.lang === 'en' ? `/en/blog/${p.slug}` : `/blog/${p.slug}`)}\n\n${p.content.join('\n\n')}\n`)] : []),
].join('\n'))

if (existsSync('dist-ssr')) rmSync('dist-ssr', { recursive: true })
console.log(`prerender: ${pages.length} страниц (${indexable.length} в sitemap)`)
