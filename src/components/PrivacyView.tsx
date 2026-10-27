import Page from '@/components/site/Page'
import { PRIVACY, PROCESSORS, PURPOSES, PRIVACY_UPDATED, type PrivacyBlock } from '@/data/privacy'
import { useT } from '@/lib/i18n'

const T = {
  title: { ru: 'Политика конфиденциальности', en: 'Privacy Policy' },
  updated: { ru: 'Редакция от', en: 'Last updated' },
  purpose: { ru: 'Цель', en: 'Purpose' },
  basis: { ru: 'Основание', en: 'Legal basis' },
  service: { ru: 'Сервис', en: 'Service' },
  role: { ru: 'Для чего', en: 'Used for' },
  data: { ru: 'Какие данные', en: 'Data' },
  where: { ru: 'Где', en: 'Location' },
}

function Block({ b }: { b: PrivacyBlock }) {
  const { t } = useT()
  if (b.kind === 'p') return <p>{t(b.text)}</p>
  if (b.kind === 'list') return <ul>{b.items.map((i, n) => <li key={n}>{t(i)}</li>)}</ul>
  if (b.kind === 'purposes') {
    return (
      <div className="s-table-wrap">
        <table className="s-table">
          <thead><tr><th>{t(T.purpose)}</th><th>{t(T.basis)}</th></tr></thead>
          <tbody>{PURPOSES.map((p, n) => <tr key={n}><td>{t(p.purpose)}</td><td>{t(p.basis)}</td></tr>)}</tbody>
        </table>
      </div>
    )
  }
  return (
    <div className="s-table-wrap">
      <table className="s-table">
        <thead><tr><th>{t(T.service)}</th><th>{t(T.role)}</th><th>{t(T.data)}</th><th>{t(T.where)}</th></tr></thead>
        <tbody>{PROCESSORS.map((p) => <tr key={p.name}><td>{p.name}</td><td>{t(p.role)}</td><td>{t(p.data)}</td><td>{t(p.where)}</td></tr>)}</tbody>
      </table>
    </div>
  )
}

export default function PrivacyView() {
  const { lang, t } = useT()
  const date = new Date(PRIVACY_UPDATED).toLocaleDateString(lang === 'en' ? 'en-GB' : 'ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
  return (
    <Page>
      <header className="s-jhero">
        <div>
          <p className="s-eyebrow">Jaiora</p>
          <h1 className="s-jtitle">{t(T.title)}</h1>
          <p className="s-lead">{t(T.updated)} {date}</p>
        </div>
      </header>
      {PRIVACY.map((s) => (
        <section key={s.id} id={s.id} className="s-section s-prose s-legal">
          <h2 className="s-h2">{t(s.title)}</h2>
          {s.blocks.map((b, n) => <Block key={n} b={b} />)}
        </section>
      ))}
    </Page>
  )
}
