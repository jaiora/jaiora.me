import Page from '@/components/site/Page'
import { TEAM } from '@/data/team'
import { useT } from '@/lib/i18n'

const T = {
  title: { ru: 'Команда', en: 'Team' },
  lead: { ru: 'Те, кто организует встречи, ведёт чаты и двигает Jaiora вперёд.', en: 'The people who run meetups, keep the chats alive, and drive Jaiora forward.' },
}

export default function TeamView() {
  const { t } = useT()

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
        <div className="s-chips">
          {TEAM.map((m) => (
            <a key={m.handle} href={`https://t.me/${m.handle}`} target="_blank" rel="noopener noreferrer" className="s-chip">
              {m.name}
            </a>
          ))}
        </div>
      </section>
    </Page>
  )
}
