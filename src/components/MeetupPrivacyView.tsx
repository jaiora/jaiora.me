import Page from '@/components/site/Page'
import { MEETUP_PRIVACY, MEETUP_PRIVACY_UPDATED } from '@/data/privacyMeetup'
import { useT } from '@/lib/i18n'

const T = {
  title: { ru: 'Конфиденциальность: запись докладов', en: 'Privacy: talk recording' },
  updated: { ru: 'Редакция от', en: 'Last updated' },
}

export default function MeetupPrivacyView() {
  const { lang, t } = useT()
  const date = new Date(MEETUP_PRIVACY_UPDATED).toLocaleDateString(lang === 'en' ? 'en-GB' : 'ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
  return (
    <Page>
      <header className="s-jhero">
        <div>
          <p className="s-eyebrow">Jaiora Meetup</p>
          <h1 className="s-jtitle">{t(T.title)}</h1>
          <p className="s-lead">{t(T.updated)} {date}</p>
        </div>
      </header>
      {MEETUP_PRIVACY.map((s) => (
        <section key={s.id} id={s.id} className="s-section s-prose s-legal">
          <h2 className="s-h2">{t(s.title)}</h2>
          {s.paras?.map((x, n) => <p key={n}>{t(x)}</p>)}
          {s.items && <ul>{s.items.map((x, n) => <li key={n}>{t(x)}</li>)}</ul>}
        </section>
      ))}
    </Page>
  )
}
