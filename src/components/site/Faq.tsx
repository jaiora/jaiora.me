import type { FaqItem } from '@/data/faq'

// Раскрывающиеся вопросы на нативных <details>: работают без JS и в готовом HTML
export default function Faq({ title, items }: { title: string; items: FaqItem[] }) {
  return (
    <section className="s-section">
      <h2 className="s-h2">{title}</h2>
      <div className="s-faq">
        {items.map((it) => (
          <details key={it.q} className="s-faq-item">
            <summary className="s-faq-q">{it.q}</summary>
            <p className="s-faq-a">{it.a}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
