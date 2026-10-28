import Page from '@/components/site/Page'
import { PRIVACY, PRIVACY_TELEGRAM, PRIVACY_UPDATED, type PrivacyBlock } from '@/data/privacy'
import { useT } from '@/lib/i18n'

const T = {
  title: { ru: 'Политика конфиденциальности', en: 'Privacy Policy' },
  updated: { ru: 'Редакция от', en: 'Last updated' },
  controller: { ru: 'Вопросы о данных и правах — Егор Урванов:', en: 'Questions about data and rights — Egor Urvanov:' },
  write: { ru: 'Telegram', en: 'Telegram' },
  help: { ru: 'Примет обращение и поможет найти нужного человека.', en: 'He will take your request and help find the right person.' },
}

function Block({ b }: { b: PrivacyBlock }) {
  const { t } = useT()
  if (b.kind === 'p') return <p>{t(b.text)}</p>
  if (b.kind === 'contact') {
    return (
      <p>
        {t(T.controller)} {t(T.write)} @{PRIVACY_TELEGRAM}. {t(T.help)}
      </p>
    )
  }
  return <ul>{b.items.map((i, n) => <li key={n}>{t(i)}</li>)}</ul>
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
