import Page from '@/components/site/Page'
import { TERMS, TERMS_UPDATED } from '@/data/terms'
import { useT } from '@/lib/i18n'

const T = {
  title: { ru: 'Условия использования', en: 'Terms of Use' },
  updated: { ru: 'Редакция от', en: 'Last updated' },
}

export default function TermsView() {
  const { lang, t } = useT()
  const date = new Date(TERMS_UPDATED).toLocaleDateString(lang === 'en' ? 'en-GB' : 'ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
  return (
    <Page>
      <header className="s-jhero">
        <div>
          <p className="s-eyebrow">Jaiora</p>
          <h1 className="s-jtitle">{t(T.title)}</h1>
          <p className="s-lead">{t(T.updated)} {date}</p>
        </div>
      </header>
      {TERMS.map((s) => (
        <section key={s.id} id={s.id} className="s-section s-prose s-legal">
          <h2 className="s-h2">{t(s.title)}</h2>
          {s.paras.map((x, n) => <p key={n}>{t(x)}</p>)}
        </section>
      ))}
    </Page>
  )
}
