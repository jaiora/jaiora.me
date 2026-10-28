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
    title: { ru: 'О сообществе и политике', en: 'About the community and this policy' },
    blocks: [
      p(
        'Jaiora — открытое сообщество чатов и встреч в разных городах. Встречи, записи, публикации и сервисы сообщества создают и поддерживают сами участники. Jaiora не является организацией или юридическим лицом.',
        'Jaiora is an open community of chats and meetups in many cities. Meetups, recordings, posts and community services are created and maintained by the members themselves. Jaiora is not an organisation or a legal entity.',
      ),
      p(
        'Политика описывает, как обращаются с данными на сайте, в сообществах и в сервисах Jaiora, которые ссылаются на эту политику. Для отдельных сервисов могут действовать дополнительные политики, которые конкретизируют эту. С вопросами помогает Егор Урванов — см. «Контакты».',
        'This policy describes how data is handled on the website, in the communities and in Jaiora services that link to this policy. Individual services may have supplementary policies that make this one more specific. Egor Urvanov helps with questions — see “Contact”.',
      ),
    ],
  },
  {
    id: 'telegram',
    title: { ru: 'Общение в Telegram', en: 'Communication on Telegram' },
    blocks: [
      p(
        'Сообщества Jaiora живут в Telegram: там проходят общение участников, анонсы встреч и работа ботов. Данные, которыми вы обмениваетесь в Telegram, обрабатывает Telegram в соответствии со своей политикой конфиденциальности и условиями использования. То, что получают боты Jaiora, обрабатывается сервисами Jaiora по этой политике.',
        'Jaiora communities live on Telegram: member conversations, meetup announcements and bots all happen there. Data you exchange on Telegram is processed by Telegram under its own privacy policy and terms of service. What Jaiora bots receive is processed by Jaiora services under this policy.',
      ),
    ],
  },
  {
    id: 'data',
    title: { ru: 'Данные в сервисах Jaiora', en: 'Data in Jaiora services' },
    blocks: [
      p(
        'Сервисы Jaiora могут работать со сведениями, которые участники сообщают о себе или публикуют в сообществах, с материалами встреч, обращениями и техническими данными, необходимыми для работы сервисов.',
        'Jaiora services may handle information members share about themselves or publish in the communities, meetup materials, requests and technical data needed to run the services.',
      ),
      p(
        'Эти данные используются, чтобы сообщество и его сервисы работали, развивались и были защищены, — с вашего согласия, чтобы выполнить то, о чём вы просите, в разумных интересах сообщества или когда этого требует закон.',
        'This data is used to run, improve and protect the community and its services — with your consent, to do what you ask, in the reasonable interests of the community, or where required by law.',
      ),
      p(
        'Ключи и пароли, которые вы вводите в сервисах Jaiora, хранятся защищённо и не показываются другим людям. Снимки экрана и другие вложения передаются, только когда вы сами их отправили.',
        'Keys and passwords you enter in Jaiora services are stored securely and are not shown to other people. Screenshots and other attachments are transmitted only when you send them yourself.',
      ),
    ],
  },
  {
    id: 'people',
    title: { ru: 'Знакомства', en: 'Introductions' },
    blocks: [
      p(
        'Участники Jaiora помогают друг другу находить нужных людей. Для этого сервисы Jaiora могут учитывать то, что участники пишут о себе в сообществах и в личной переписке с участниками, а также то, что они сами публикуют в открытом доступе, — например, чем человек занимается и что ищет. Если вы не хотите, чтобы ваши сообщения учитывались, напишите Егору Урванову — их перестанут учитывать, а собранное удалят.',
        'Jaiora members help each other find the right people. To do this, Jaiora services may take into account what members write about themselves in the communities and in direct conversations with members, as well as what they publish openly themselves — for example, what a person does and what they are looking for. If you do not want your messages to be taken into account, message Egor Urvanov — they will no longer be used and what has been collected will be deleted.',
      ),
    ],
  },
  {
    id: 'meetups',
    title: { ru: 'Встречи и записи', en: 'Meetups and recordings' },
    blocks: [
      p(
        'Доклады на встречах Jaiora могут записываться и транслироваться. Запись экрана и звука начинается только по действию докладчика и идёт только во время доклада; участники могут снимать доклад на свои телефоны. Записи публикуют сами участники и сами отвечают за свои публикации. Если вы не хотите попасть в запись или хотите её удалить, напишите Егору Урванову — он поможет найти автора.',
        'Talks at Jaiora meetups may be recorded and streamed. Screen and audio recording starts only when the speaker starts it and runs only during the talk; attendees may film the talk on their phones. Recordings are published by the members themselves, who are responsible for what they publish. If you do not want to appear in a recording or want it removed, message Egor Urvanov — he will help you find its author.',
      ),
    ],
  },
  {
    id: 'providers',
    title: { ru: 'Сторонние поставщики и искусственный интеллект', en: 'Third-party providers and artificial intelligence' },
    blocks: [
      p(
        'Для работы сервисов используются услуги надёжных и широко распространённых сторонних поставщиков, в том числе технологий искусственного интеллекта. Им передаётся только то, что нужно для их работы, и они обязаны защищать данные. Данные могут обрабатываться за пределами вашей страны — на основе договорных условий о защите данных и других мер, которых требует применимое законодательство.',
        'The services use reliable, widely used third-party providers, including artificial intelligence technologies. They receive only what they need to do their job and are required to protect the data. Data may be processed outside your country, based on data protection terms in agreements and other safeguards required by applicable law.',
      ),
    ],
  },
  {
    id: 'no-ads',
    title: { ru: 'Без рекламы', en: 'No advertising' },
    blocks: [
      p(
        'В сообществах Jaiora нет рекламы и спонсорских размещений, и это принцип: сообщество не продаётся — ни доступ к участникам, ни их внимание, ни их данные. Данные не продаются и не передаются для рекламы.',
        'There is no advertising or sponsored content in Jaiora communities, and this is a principle: the community is not for sale — not access to its members, not their attention, not their data. Personal data is not sold or shared for advertising.',
      ),
    ],
  },
  {
    id: 'rights',
    title: { ru: 'Хранение и ваши права', en: 'Retention and your rights' },
    blocks: [
      p(
        'Данные хранятся, пока они нужны, или пока вы не попросите их удалить. Вы можете в любой момент узнать, какие данные о вас есть в сервисах Jaiora, попросить исправить или удалить их, ограничить их использование, получить их копию, отказаться от их использования или отозвать согласие, а также пожаловаться в орган по защите данных своей страны.',
        'Data is kept while it is needed or until you ask for it to be deleted. At any time you may ask what data Jaiora services hold about you, ask for it to be corrected or deleted, restrict its use, get a copy of it, object to its use or withdraw your consent, and lodge a complaint with the data protection authority of your country.',
      ),
      p(
        `Для любого из этих запросов напишите Егору Урванову в личные сообщения в Telegram @${PRIVACY_TELEGRAM}: он примет обращение и поможет найти тех, кто может его выполнить. Ответ — в течение 30 дней.`,
        `For any of these requests, send a direct message to Egor Urvanov on Telegram @${PRIVACY_TELEGRAM}: he will take the request and help find those who can act on it. You will get a reply within 30 days.`,
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
        'Сервисы Jaiora не предназначены для лиц младше 16 лет. Для защиты данных принимаются разумные меры. Политика может обновляться; дата редакции указана вверху страницы.',
        'Jaiora services are not intended for anyone under 16. Reasonable measures are taken to protect data. This policy may be updated; the date is shown at the top of the page.',
      ),
    ],
  },
  {
    id: 'contact',
    title: { ru: 'Контакты', en: 'Contact' },
    blocks: [{ kind: 'contact' }],
  },
]
