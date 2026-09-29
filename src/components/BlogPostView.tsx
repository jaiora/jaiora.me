import { Navigate, useParams } from 'react-router-dom'
import Page from '@/components/site/Page'
import { POSTS } from '@/data/blog'
import { useT } from '@/lib/i18n'

export default function BlogPostView() {
  const { slug } = useParams<{ slug: string }>()
  const { lang, to } = useT()
  const post = POSTS.find((p) => p.slug === slug && p.lang === lang)

  if (!post) return <Navigate to={to('/blog')} replace />

  return (
    <Page>
      <article className="s-article">
        <header>
          <p className="s-eyebrow">Jaiora · {post.date}</p>
          <h1 className="s-jtitle">{post.title}</h1>
          <div className="s-chips">
            {post.tags.map((tag) => (
              <span key={tag} className="s-chip s-chip-static">{tag}</span>
            ))}
          </div>
        </header>
        <div className="s-prose">
          {post.content.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </article>
    </Page>
  )
}
