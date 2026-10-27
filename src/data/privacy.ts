// Политика конфиденциальности Jaiora (/privacy, /en/privacy). Решения Егора 2026-10-28: одна политика на все сервисы
// Jaiora; юрлица нет — ответственный назван одной строкой в «Контактах»; без привязки к ЕС и США; обработка данных —
// общими словами, без названий сервисов — ни своих, ни сторонних. Общие слова — не неправда:
// что здесь сказано, должно оставаться верным для всех сервисов.
import type { L } from '@/lib/i18n'

export const PRIVACY_UPDATED = '2026-10-28'
export const PRIVACY_TELEGRAM = 'eurvanov'

export type PrivacyBlock =
  | { kind: 'p'; text: L }
  | { kind: 'list'; items: L[] }
  | { kind: 'contact' }

export interface PrivacySection {
  id: string
  title: L
  blocks: PrivacyBlock[]
}

const p = (ru: string, en: string): PrivacyBlock => ({ kind: 'p', text: { ru, en } })

export const PRIVACY: PrivacySection[] = [
  {
    id: 'scope',
    title: { ru: 'Кто мы и что покрывает политика', en: 'Who we are and what this policy covers' },
    blocks: [
      p(
        'Jaiora — открытое сообщество чатов и встреч в разных городах. Политика распространяется на сайт и сообщества Jaiora, а также на сервисы, инструменты и приложения Jaiora, которые ссылаются на эту политику.',
        'Jaiora is an open community of chats and meetups in many cities. This policy applies to the Jaiora website and communities and to Jaiora services, tools and applications that link to this policy.',
      ),
      p(
        'Jaiora не является юридическим лицом. Ответственный указан в разделе «Контакты».',
        'Jaiora is not a legal entity. The responsible person is named in the “Contact” section.',
      ),
    ],
  },
  {
    id: 'telegram',
    title: { ru: 'Общение в Telegram', en: 'Communication on Telegram' },
    blocks: [
      p(
        'Сообщества Jaiora живут в Telegram: там проходят общение участников, анонсы встреч и работа ботов. Данные, которыми вы обмениваетесь в Telegram, обрабатывает Telegram в соответствии со своей политикой конфиденциальности и условиями использования. Jaiora не определяет, как Telegram хранит и использует эти данные.',
        'Jaiora communities live on Telegram: member conversations, meetup announcements and bots all happen there. Data you exchange on Telegram is processed by Telegram under its own privacy policy and terms of service. Jaiora does not control how Telegram stores and uses that data.',
      ),
    ],
  },
  {
    id: 'data',
    title: { ru: 'Данные в сервисах Jaiora', en: 'Data in Jaiora services' },
    blocks: [
      p(
        'В той мере, в какой сервисы Jaiora сами работают с данными, это сведения, которые участники сообщают о себе или публикуют в сообществах, материалы встреч, обращения к нам и технические данные, необходимые для работы сервисов.',
        'To the extent Jaiora services handle data themselves, this is information members share about themselves or publish in the communities, meetup materials, messages sent to us and technical data needed to run the services.',
      ),
      p(
        'Мы используем эти данные, чтобы сообщество и его сервисы работали, развивались и были защищены. Мы делаем это с вашего согласия, чтобы выполнить то, о чём вы просите, в разумных интересах сообщества или когда этого требует закон.',
        'We use this data to run, improve and protect the community and its services. We do so with your consent, to do what you ask of us, in the reasonable interests of the community, or where required by law.',
      ),
    ],
  },
  {
    id: 'meetups',
    title: { ru: 'Встречи и записи', en: 'Meetups and recordings' },
    blocks: [
      p(
        'Доклады на встречах Jaiora могут записываться и транслироваться. Запись экрана и звука начинается только по действию докладчика и идёт только во время доклада; участники могут снимать доклад на свои телефоны. Публикует записи организатор встречи. Чтобы не попасть в публикацию или удалить запись, напишите нам.',
        'Talks at Jaiora meetups may be recorded and streamed. Screen and audio recording starts only when the speaker starts it and runs only during the talk; attendees may film the talk on their phones. Recordings are published by the meetup organiser. To stay out of a published recording or have it removed, contact us.',
      ),
    ],
  },
  {
    id: 'providers',
    title: { ru: 'Сторонние поставщики и искусственный интеллект', en: 'Third-party providers and artificial intelligence' },
    blocks: [
      p(
        'Для работы сервисов мы пользуемся услугами надёжных и широко распространённых сторонних поставщиков, в том числе технологий искусственного интеллекта. Им передаётся только то, что нужно для их работы, и они обязаны защищать данные. Данные могут обрабатываться за пределами вашей страны с мерами защиты, которых требует применимое законодательство.',
        'To run the services we use reliable, widely used third-party providers, including artificial intelligence technologies. They receive only what they need to do their job and are required to protect the data. Data may be processed outside your country with the safeguards required by applicable law.',
      ),
    ],
  },
  {
    id: 'no-ads',
    title: { ru: 'Без рекламы', en: 'No advertising' },
    blocks: [
      p(
        'В сообществах Jaiora нет рекламы и спонсорских размещений, и это принцип: сообщество не продаётся — ни доступ к участникам, ни их внимание, ни их данные. Мы не продаём данные и не передаём их для рекламы.',
        'There is no advertising or sponsored content in Jaiora communities, and this is a principle: the community is not for sale — not access to its members, not their attention, not their data. We do not sell personal data or share it for advertising.',
      ),
    ],
  },
  {
    id: 'rights',
    title: { ru: 'Хранение и ваши права', en: 'Retention and your rights' },
    blocks: [
      p(
        'Мы храним данные, пока они нужны, или пока вы не попросите их удалить. Вы можете в любой момент узнать, какие данные о вас есть у сервисов Jaiora, попросить исправить или удалить их, ограничить их использование, получить их копию, отказаться от их использования или отозвать согласие.',
        'We keep data while it is needed or until you ask us to delete it. At any time you may ask what data Jaiora services hold about you, ask us to correct or delete it, restrict its use, get a copy of it, object to its use or withdraw your consent.',
      ),
      p(
        `Для любого из этих запросов напишите в личные сообщения в Telegram @${PRIVACY_TELEGRAM}. Мы ответим в течение 30 дней.`,
        `For any of these requests, send a direct message to @${PRIVACY_TELEGRAM} on Telegram. We will reply within 30 days.`,
      ),
    ],
  },
  {
    id: 'site',
    title: { ru: 'Сайт', en: 'Website' },
    blocks: [
      p(
        'Сайт Jaiora не использует файлы cookie, счётчики посещений и рекламные метки. Сайт не отслеживает посетителей, поэтому настройка браузера «Не отслеживать» не меняет его работу.',
        'The Jaiora website does not use cookies, visitor analytics or advertising tags. The site does not track visitors, so a browser “Do Not Track” setting does not change how it works.',
      ),
    ],
  },
  {
    id: 'other',
    title: { ru: 'Прочее', en: 'Other' },
    blocks: [
      p(
        'Сервисы Jaiora не предназначены для лиц младше 16 лет. Мы принимаем разумные меры для защиты данных. Политика может обновляться; дата редакции указана вверху страницы.',
        'Jaiora services are not intended for anyone under 16. We take reasonable measures to protect data. This policy may be updated; the date is shown at the top of the page.',
      ),
    ],
  },
  {
    id: 'contact',
    title: { ru: 'Контакты', en: 'Contact' },
    blocks: [{ kind: 'contact' }],
  },
]
