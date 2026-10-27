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
const list = (...items: [string, string][]): PrivacyBlock => ({ kind: 'list', items: items.map(([ru, en]) => ({ ru, en })) })

export const PRIVACY: PrivacySection[] = [
  {
    id: 'scope',
    title: { ru: 'Кто мы и что покрывает политика', en: 'Who we are and what this policy covers' },
    blocks: [
      p(
        'Jaiora — открытое сообщество чатов и встреч в разных городах. Настоящая политика описывает, какие данные о людях обрабатывают сервисы Jaiora, зачем, кому они передаются, как долго хранятся и как реализовать свои права.',
        'Jaiora is an open community of chats and meetups in many cities. This policy explains what personal data Jaiora’s services process, why, who receives it, how long it is kept and how you can exercise your rights.',
      ),
      p(
        'Политика распространяется на сайт и сообщества Jaiora, а также на все сервисы, инструменты и приложения Jaiora — сайты, ботов, расширения для браузера и другие, — которые ссылаются на эту политику.',
        'This policy applies to the Jaiora website and communities and to all Jaiora services, tools and applications — websites, bots, browser extensions and others — that link to this policy.',
      ),
      p(
        'Jaiora не является юридическим лицом. Ответственный за обработку данных указан в разделе «Контакты».',
        'Jaiora is not a legal entity. The person responsible for data processing is named in the “Contact” section.',
      ),
    ],
  },
  {
    id: 'data',
    title: { ru: 'Какие данные мы обрабатываем', en: 'What data we process' },
    blocks: [
      p('В зависимости от того, какими сервисами вы пользуетесь, мы можем обрабатывать:', 'Depending on which services you use, we may process:'),
      list(
        ['данные, которые вы сообщаете сами: имя, контакты, сведения о себе и своём опыте;', 'data you provide yourself: your name, contact details and information about yourself and your experience;'],
        ['данные, которые возникают при пользовании сервисами: сообщения, материалы встреч, обращения в поддержку;', 'data generated when you use the services: messages, meetup materials and support requests;'],
        ['сведения из общедоступных источников, в том числе из открытых чатов сообщества;', 'information from publicly available sources, including open community chats;'],
        ['технические данные: IP-адрес, сведения о браузере и устройстве, журналы работы сервисов.', 'technical data: IP address, browser and device details and service logs.'],
      ),
      p(
        'Мы не собираем намеренно данные особых категорий (о здоровье, убеждениях и т. п.).',
        'We do not intentionally collect special categories of data (such as health or beliefs).',
      ),
    ],
  },
  {
    id: 'purposes',
    title: { ru: 'Зачем мы обрабатываем данные', en: 'Why we process data' },
    blocks: [
      p(
        'Мы обрабатываем данные, чтобы сервисы Jaiora работали: для общения в сообществе, проведения встреч, знакомств и подбора людей, поддержки пользователей, развития и защиты сервисов, а также для исполнения требований закона. Основанием служат ваше согласие, договорённость с вами, наш законный интерес в работе сообщества или требование закона.',
        'We process data so that Jaiora’s services work: for community communication, running meetups, introductions and matching people, supporting users, improving and protecting the services, and complying with the law. The basis is your consent, an arrangement with you, our legitimate interest in running the community, or a legal requirement.',
      ),
    ],
  },
  {
    id: 'ai',
    title: { ru: 'Искусственный интеллект', en: 'Artificial intelligence' },
    blocks: [
      p(
        'Некоторые функции сервисов работают с помощью технологий искусственного интеллекта сторонних поставщиков. Таким поставщикам передаются только данные, нужные для работы конкретной функции, и они обрабатывают их по нашему поручению.',
        'Some features of the services use artificial intelligence technologies from third-party providers. Such providers receive only the data a given feature needs and process it on our behalf.',
      ),
    ],
  },
  {
    id: 'recipients',
    title: { ru: 'Кому передаются данные', en: 'Who receives your data' },
    blocks: [
      p(
        'Для работы сервисов мы пользуемся услугами надёжных и широко распространённых сторонних поставщиков — технической инфраструктуры, связи, искусственного интеллекта и других. Поставщики обрабатывают данные для оказания нам услуг и обязаны их защищать.',
        'To run the services we use reliable, widely used third-party providers — of technical infrastructure, communications, artificial intelligence and others. Providers process data to deliver their services to us and are required to protect it.',
      ),
      p(
        'Кроме того, данные могут быть переданы организаторам встреч и другим участникам — в объёме, нужном для встреч и знакомств, — а также государственным органам, когда этого требует закон.',
        'Data may also be shared with meetup organisers and other members, to the extent needed for meetups and introductions, and with public authorities where required by law.',
      ),
      p(
        'В сообществах Jaiora нет рекламы и спонсорских размещений, и это принцип: сообщество не продаётся — ни доступ к участникам, ни их внимание, ни их данные. Мы не продаём данные и не передаём их для рекламы.',
        'There is no advertising or sponsored content in Jaiora communities, and this is a principle: the community is not for sale — not access to its members, not their attention, not their data. We do not sell personal data or share it for advertising.',
      ),
    ],
  },
  {
    id: 'transfers',
    title: { ru: 'Передача данных в другие страны', en: 'International transfers' },
    blocks: [
      p(
        'Участники Jaiora живут в разных странах, и данные могут обрабатываться за пределами вашей страны. В этом случае мы применяем меры защиты, которые требует применимое законодательство.',
        'Jaiora members live in many countries, and data may be processed outside your country. In that case we apply the safeguards required by applicable law.',
      ),
    ],
  },
  {
    id: 'retention',
    title: { ru: 'Сроки хранения', en: 'Retention' },
    blocks: [
      p(
        'Мы храним данные, пока они нужны для целей, ради которых получены, или пока вы не попросите их удалить, если закон не требует хранить их дольше.',
        'We keep data as long as it is needed for the purposes it was collected for, or until you ask us to delete it, unless the law requires us to keep it longer.',
      ),
    ],
  },
  {
    id: 'rights',
    title: { ru: 'Ваши права', en: 'Your rights' },
    blocks: [
      p('Вы вправе в любой момент:', 'At any time you may:'),
      list(
        ['узнать, какие данные о вас мы обрабатываем, и получить их копию;', 'find out what data we hold about you and get a copy;'],
        ['исправить неточные данные;', 'correct inaccurate data;'],
        ['потребовать удаления данных;', 'ask us to delete your data;'],
        ['ограничить обработку или возразить против неё, в том числе против подбора людей;', 'restrict or object to processing, including matching;'],
        ['получить данные в машиночитаемом виде для передачи другому сервису;', 'receive your data in a machine-readable format to move it elsewhere;'],
        ['отозвать согласие — это не влияет на обработку до отзыва;', 'withdraw consent — this does not affect processing before withdrawal;'],
                ['подать жалобу в орган по защите данных своей страны.', 'lodge a complaint with the data protection authority of your country.'],
      ),
      p(
        `Напишите в Telegram @${PRIVACY_TELEGRAM}. Мы ответим в течение 30 дней. Мы не ухудшаем условия для тех, кто воспользовался своими правами.`,
        `Message @${PRIVACY_TELEGRAM} on Telegram. We will reply within 30 days. We do not treat anyone less favourably for exercising their rights.`,
      ),
    ],
  },
  {
    id: 'site',
    title: { ru: 'Сайт и файлы cookie', en: 'Website and cookies' },
    blocks: [
      p(
        'Сайт Jaiora не использует файлы cookie, счётчики посещений и рекламные метки и не отслеживает посетителей, поэтому сигнал браузера «Не отслеживать» (Do Not Track) не меняет его работу. Как и при любом обращении к сайту, ваш IP-адрес и сведения о браузере получают сервисы, обеспечивающие его работу. Если что-то из этого изменится, мы заранее обновим эту политику и, где это требуется, спросим ваше согласие.',
        'The Jaiora website does not use cookies, visitor analytics or advertising tags and does not track visitors, so a browser “Do Not Track” signal does not change how it works. As with any website request, your IP address and browser details are received by the services that keep the site running. If any of this changes, we will update this policy first and ask for your consent where required.',
      ),
    ],
  },
  {
    id: 'children',
    title: { ru: 'Дети', en: 'Children' },
    blocks: [
      p(
        'Сервисы Jaiora не предназначены для лиц младше 16 лет. Если вы узнали, что ребёнок передал нам свои данные, напишите нам (раздел «Контакты») — мы их удалим.',
        'Jaiora’s services are not intended for anyone under 16. If you learn that a child has given us personal data, contact us and we will delete it.',
      ),
    ],
  },
  {
    id: 'security',
    title: { ru: 'Безопасность', en: 'Security' },
    blocks: [
      p(
        'Мы принимаем разумные меры, чтобы защитить данные от несанкционированного доступа, изменения и утраты.',
        'We take reasonable measures to protect data against unauthorised access, alteration and loss.',
      ),
    ],
  },
  {
    id: 'changes',
    title: { ru: 'Изменения политики', en: 'Changes to this policy' },
    blocks: [
      p(
        'Мы обновляем эту страницу, когда меняются сервисы или поставщики, и указываем дату редакции вверху. О существенных изменениях сообщаем заметно на сайте или в сообществах Jaiora.',
        'We update this page when our services or providers change and show the date at the top. We announce significant changes prominently on the website or in Jaiora communities.',
      ),
    ],
  },
  {
    id: 'contact',
    title: { ru: 'Контакты', en: 'Contact' },
    blocks: [
      { kind: 'contact' },
    ],
  },
]
