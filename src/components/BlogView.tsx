import { Link } from 'react-router-dom'
import Page from '@/components/site/Page'
import { POSTS } from '@/data/blog'
import { useT } from '@/lib/i18n'

const T = {
  title: { ru: 'Блог', en: 'Blog' },
  lead: { ru: 'Заметки о сообществе, городах и людях Jaiora.', en: 'Notes on the Jaiora community, cities, and people.' },
  empty: { ru: 'Постов пока нет — скоро здесь появятся первые заметки.', en: 'No posts yet — the first notes are coming soon.' },
}

export default function BlogView() {
  const { lang, t, to } = useT()
  const posts = POSTS.filter((p) => p.lang === lang).sort((a, b) => (a.date < b.date ? 1 : -1))

  return (
    <Page>
      <header className="s-jhero">
        <div>
          <p className="s-eyebrow">Jaiora</p>
          <h1 className="s-jtitle">{t(T.title)}</h1>
          <p className="s-lead">{t(T.lead)}</p>
        </div>
      </header>

      <section className="s-section">
        {posts.length === 0 ? (
          <div className="s-bento">
            <div className="s-card s-span-12 s-card-static">
              <span className="s-card-text">{t(T.empty)}</span>
            </div>
          </div>
        ) : (
          <div className="s-bento">
            {posts.map((p) => (
              <Link key={p.slug} to={to(`/blog/${p.slug}`)} className="s-card s-span-12">
                <span className="s-card-title">
                  {p.title}
                  <span className="s-step-year">{p.date}</span>
                </span>
                <span className="s-card-text">{p.description}</span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </Page>
  )
}
