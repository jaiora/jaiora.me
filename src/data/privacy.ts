// Политика конфиденциальности Jaiora (/privacy, /en/privacy). Решения Егора 2026-10-28: одна политика на все сервисы
// Jaiora; юрлица нет — ответственный назван одной строкой в «Контактах»; сторонние сервисы — поимённо в таблице
// PROCESSORS, с оговоркой, что список обновляется. Что обещано здесь, должно совпадать с тем, что делает код:
// новый сервис с данными людей — сначала строка в PROCESSORS, потом подключение.
import type { L } from '@/lib/i18n'

export const PRIVACY_UPDATED = '2026-10-28'
export const PRIVACY_CONTACT = 'e.s.urvanov@urvanov.com'
export const PRIVACY_TELEGRAM = 'eurvanov'

export type PrivacyBlock =
  | { kind: 'p'; text: L }
  | { kind: 'list'; items: L[] }
  | { kind: 'purposes' }
  | { kind: 'processors' }
  | { kind: 'contact' }

export interface PrivacySection {
  id: string
  title: L
  blocks: PrivacyBlock[]
}

const p = (ru: string, en: string): PrivacyBlock => ({ kind: 'p', text: { ru, en } })
const list = (...items: [string, string][]): PrivacyBlock => ({ kind: 'list', items: items.map(([ru, en]) => ({ ru, en })) })

export interface Purpose {
  purpose: L
  basis: L
}

export const PURPOSES: Purpose[] = [
  {
    purpose: { ru: 'Работа чатов, ботов и встреч: участие, ответы на запросы, знакомства', en: 'Running chats, bots and meetups: participation, answering requests, introductions' },
    basis: { ru: 'Исполнение вашей просьбы или договорённости с вами', en: 'Performance of your request or of an arrangement with you' },
  },
  {
    purpose: { ru: 'Запись докладов и публикация записей', en: 'Recording talks and publishing recordings' },
    basis: { ru: 'Согласие докладчика: запись начинается только по его действию; публикация — по решению организатора с согласия докладчика', en: 'The speaker’s consent: recording starts only on the speaker’s action; publication is decided by the organiser with the speaker’s consent' },
  },
  {
    purpose: { ru: 'Подбор людей под задачу, включая поиск работы и кандидатов', en: 'Matching people to a task, including job and candidate search' },
    basis: { ru: 'Ваша просьба; для данных, которые вы не передавали нам сами, — законный интерес с правом возразить в любой момент', en: 'Your request; for data you did not give us yourself, legitimate interest with the right to object at any time' },
  },
  {
    purpose: { ru: 'Поддержка: сообщения об ошибках, вопросы о работе сервисов', en: 'Support: bug reports and questions about the services' },
    basis: { ru: 'Исполнение вашей просьбы', en: 'Performance of your request' },
  },
  {
    purpose: { ru: 'Безопасность, защита от злоупотреблений, исправление ошибок', en: 'Security, abuse prevention and fixing errors' },
    basis: { ru: 'Законный интерес', en: 'Legitimate interest' },
  },
  {
    purpose: { ru: 'Исполнение требований закона', en: 'Compliance with legal obligations' },
    basis: { ru: 'Обязанность по закону', en: 'Legal obligation' },
  },
]

export interface Processor {
  name: string
  role: L
  data: L
  where: L
}

export const PROCESSORS: Processor[] = [
  {
    name: 'DigitalOcean',
    role: { ru: 'Серверы, базы данных и хранение файлов', en: 'Servers, databases and file storage' },
    data: { ru: 'Все данные, которые хранят сервисы Jaiora', en: 'All data stored by Jaiora’s services' },
    where: { ru: 'США', en: 'United States' },
  },
  {
    name: 'Cloudflare',
    role: { ru: 'Защита и доставка трафика сайтов *.jaiora.me', en: 'Protection and delivery of traffic to *.jaiora.me sites' },
    data: { ru: 'IP-адрес, сведения о браузере, содержимое запросов к сайтам', en: 'IP address, browser details, contents of requests to the sites' },
    where: { ru: 'Глобальная сеть, США', en: 'Global network, United States' },
  },
  {
    name: 'OpenAI',
    role: { ru: 'Искусственный интеллект: ответы на вопросы, расшифровка голоса, разбор сообщений об ошибках и чатов, профили участников, подбор людей, голосовые собеседования', en: 'Artificial intelligence: answering questions, voice transcription, analysing bug reports and chats, member profiles, matching people, voice interviews' },
    data: { ru: 'Текст вопросов и сообщений, сообщения в чатах, голос (в том числе на собеседованиях), резюме и сведения о профессиональном опыте', en: 'Text of questions and messages, chat messages, voice (including interviews), CVs and professional background' },
    where: { ru: 'США', en: 'United States' },
  },
  {
    name: 'Anthropic',
    role: { ru: 'Искусственный интеллект: подбор людей и помощь в найме', en: 'Artificial intelligence: matching people and hiring support' },
    data: { ru: 'Описания задач и вакансий, сведения о кандидатах, тексты собеседований', en: 'Task and job descriptions, candidate details, interview transcripts' },
    where: { ru: 'США', en: 'United States' },
  },
  {
    name: 'Telegram',
    role: { ru: 'Чаты, боты, вход в сервисы, платежи внутри Telegram', en: 'Chats, bots, sign-in, in-app payments' },
    data: { ru: 'Сообщения, идентификатор и имя пользователя в Telegram, файлы, сведения о платежах', en: 'Messages, Telegram ID and username, files, payment records' },
    where: { ru: 'ОАЭ и другие страны', en: 'UAE and other countries' },
  },
  {
    name: 'Google',
    role: { ru: 'Прямые трансляции докладов (YouTube), вход через Google, календарь и видеовстречи для собеседований, шрифты сайта', en: 'Live streaming of talks (YouTube), sign-in with Google, calendar and video calls for interviews, website fonts' },
    data: { ru: 'Видео и звук доклада (в трансляции — публично), адрес почты и имя, события календаря, IP-адрес', en: 'Talk video and audio (public when streamed), email address and name, calendar events, IP address' },
    where: { ru: 'США', en: 'United States' },
  },
  {
    name: 'GitHub',
    role: { ru: 'Размещение сайта jaiora.me', en: 'Hosting of the jaiora.me website' },
    data: { ru: 'IP-адрес и сведения о браузере посетителей', en: 'Visitors’ IP address and browser details' },
    where: { ru: 'США', en: 'United States' },
  },
  {
    name: 'Sentry',
    role: { ru: 'Учёт технических ошибок сервиса подбора', en: 'Error tracking for the matching service' },
    data: { ru: 'Технические сведения об ошибке; личные данные перед отправкой удаляются', en: 'Technical error details; personal data is removed before sending' },
    where: { ru: 'США', en: 'United States' },
  },
]

export const PRIVACY: PrivacySection[] = [
  {
    id: 'scope',
    title: { ru: 'Кто мы и что покрывает политика', en: 'Who we are and what this policy covers' },
    blocks: [
      p(
        'Jaiora — открытое сообщество чатов и встреч в разных городах. Настоящая политика описывает, какие данные о людях обрабатывают сервисы Jaiora, зачем, кому они передаются, как долго хранятся и как реализовать свои права.',
        'Jaiora is an open community of chats and meetups in many cities. This policy explains what personal data Jaiora’s services process, why, who receives it, how long it is kept and how you can exercise your rights.',
      ),
      p('Политика распространяется на:', 'This policy applies to:'),
      list(
        ['сайт jaiora.me;', 'the jaiora.me website;'],
        ['чаты Jaiora в Telegram и их модерацию (Moodbot);', 'Jaiora chats on Telegram and their moderation (Moodbot);'],
        ['кабинет сообщества crm.jaiora.me и единый вход в сервисы auth.jaiora.me;', 'the community dashboard crm.jaiora.me and single sign-on auth.jaiora.me;'],
        ['доску города board.jaiora.me и бота встреч;', 'the city board board.jaiora.me and the meetup bot;'],
        ['запись докладов на встречах: сервис meetup.jaiora.me и расширение для браузера «Jaiora Meetup»;', 'recording talks at meetups: the meetup.jaiora.me service and the “Jaiora Meetup” browser extension;'],
        ['заметки по встречам notetaker.jaiora.me;', 'meeting notes notetaker.jaiora.me;'],
        ['«Рядом» (@JaioraBot) — запросы и предложения участников и подбор пар;', '“Ryadom” (@JaioraBot) — members’ requests and offers and matching them;'],
        ['подбор людей и найм: факты о кандидатах facts.jaiora.me, профили участников по их сообщениям в чатах whoiswho.jaiora.me, помощник рекрутера clarify.jaiora.me, голосовой бот для собеседований;', 'people matching and hiring: candidate facts facts.jaiora.me, member profiles based on their chat messages whoiswho.jaiora.me, the recruiter assistant clarify.jaiora.me and a voice interview bot;'],
        ['поддержку во всех сервисах: сообщения об ошибках и вопросы о работе сервисов (tracker.jaiora.me);', 'support in all services: bug reports and questions about how the services work (tracker.jaiora.me);'],
        ['другие сервисы Jaiora, которые ссылаются на эту политику.', 'any other Jaiora service that links to this policy.'],
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
      list(
        ['Профиль и контакты: имя, имя пользователя в Telegram и то, что вы сами указали о себе.', 'Profile and contacts: your name, Telegram username and whatever you tell us about yourself.'],
        ['Сообщения в чатах и ботах Jaiora и обращения к нам.', 'Messages in Jaiora chats and bots, and messages you send us.'],
        ['Записи докладов: изображение экрана, звук, видео с камер участников, снимавших доклад.', 'Talk recordings: screen, audio and video from attendees’ cameras that filmed the talk.'],
        ['Обращения в поддержку: текст, снимки экрана и голосовые сообщения, которые вы приложили.', 'Support requests: text, screenshots and voice messages you attach.'],
        ['Для подбора людей: сведения о профессиональном опыте и интересах, резюме — из того, что вы сообщили, из сообщений в чатах Jaiora и из открытых источников в интернете.', 'For matching: information about professional experience and interests and CVs — from what you told us, from messages in Jaiora chats and from publicly available sources on the internet.'],
        ['Технические данные: IP-адрес, тип браузера, журналы ошибок и запросов к серверам.', 'Technical data: IP address, browser type, error logs and server request logs.'],
      ),
      p(
        'Мы не собираем специально данные особых категорий (о здоровье, религии, политических взглядах и т. п.). Если вы сами упомянули их в сообщении, мы не используем их для подбора людей и иных решений о вас.',
        'We do not deliberately collect special categories of data (health, religion, political views, etc.). If you mention them in a message yourself, we do not use them for matching or any other decision about you.',
      ),
    ],
  },
  {
    id: 'purposes',
    title: { ru: 'Цели и основания обработки', en: 'Purposes and legal bases' },
    blocks: [{ kind: 'purposes' }],
  },
  {
    id: 'ai',
    title: { ru: 'Искусственный интеллект', en: 'Artificial intelligence' },
    blocks: [
      p(
        'Часть функций Jaiora работает с помощью моделей искусственного интеллекта сторонних поставщиков (перечислены в разделе «Кому передаются данные»): ответы на вопросы о сервисах, расшифровка голосовых сообщений, разбор сообщений об ошибках, модерация чатов, составление профилей участников по их сообщениям, подбор людей под задачу, голосовые собеседования.',
        'Some Jaiora features use artificial intelligence models from third-party providers (listed in “Who receives your data”): answering questions about the services, transcribing voice messages, analysing bug reports, moderating chats, building member profiles from their messages, matching people to tasks and voice interviews.',
      ),
      list(
        ['Ответы, созданные искусственным интеллектом, мы помечаем как таковые.', 'Answers generated by artificial intelligence are labelled as such.'],
        ['Поставщикам передаётся только то, что нужно для конкретной функции.', 'Providers receive only what a given feature needs.'],
        ['По условиям, на которых мы пользуемся этими моделями, поставщики не обучают свои модели на переданных данных и хранят их ограниченное время: для защиты от злоупотреблений — как правило, до 30 дней; файлы, загруженные для обработки (например, резюме), — пока они нужны для работы функции.', 'Under the terms on which we use these models, providers do not train their models on the data we send and keep it only for a limited time: for abuse monitoring, usually up to 30 days; files uploaded for processing (such as CVs), as long as the feature needs them.'],
        ['Решения, существенно влияющие на человека (например, рекомендация кандидата), не принимаются только автоматически: их проверяет человек, и вы вправе потребовать пересмотра и объяснения.', 'Decisions that significantly affect a person (for example, recommending a candidate) are never made solely by automated means: a person reviews them, and you may ask for human review and an explanation.'],
      ),
    ],
  },
  {
    id: 'recipients',
    title: { ru: 'Кому передаются данные', en: 'Who receives your data' },
    blocks: [
      p(
        'Для работы сервисов мы пользуемся услугами проверенных поставщиков инфраструктуры, связи и искусственного интеллекта. Они обрабатывают данные только по нашему поручению и для оказания нам услуги, на условиях соглашений об обработке данных, которые требуют защиты данных и запрещают их использование в собственных целях поставщика.',
        'To run the services we use established providers of infrastructure, communications and artificial intelligence. They process data only on our instructions and to provide their service to us, under data processing agreements that require data protection and prohibit use for the provider’s own purposes.',
      ),
      p(
        'Ниже — действующий список таких поставщиков. Он не исчерпывает всех возможных случаев: при подключении нового поставщика или замене существующего мы обновляем список и дату редакции этой политики. К каждому новому поставщику применяются те же требования.',
        'The current list of these providers is below. It is not exhaustive of all possible cases: when we add or replace a provider, we update this list and the date of this policy. The same requirements apply to every new provider.',
      ),
      { kind: 'processors' },
      p(
        'Кроме того, данные могут быть переданы: организатору встречи — записи и сведения, нужные для её проведения; другим участникам — то, что вы сами опубликовали в чате или разрешили передать при знакомстве; государственным органам — только когда этого требует закон.',
        'Data may also be shared with: the meetup organiser — recordings and details needed to run the meetup; other members — what you posted in a chat yourself or agreed to share for an introduction; public authorities — only where required by law.',
      ),
      p(
        'В сообществах Jaiora нет рекламы и спонсорских размещений, и это принцип: сообщество не продаётся — ни доступ к участникам, ни их внимание, ни их данные. Мы не продаём данные, не передаём их рекламодателям и брокерам данных и не используем для рекламы или оценки кредитоспособности.',
        'There is no advertising or sponsored content in Jaiora communities, and this is a principle: the community is not for sale — not access to its members, not their attention, not their data. We do not sell personal data, do not share it with advertisers or data brokers and do not use it for advertising or credit assessment.',
      ),
    ],
  },
  {
    id: 'transfers',
    title: { ru: 'Передача данных в другие страны', en: 'International transfers' },
    blocks: [
      p(
        'Участники Jaiora живут в разных странах, а часть поставщиков находится за пределами вашей страны, в том числе в США. При передаче данных из Европейского союза, Великобритании и Швейцарии мы опираемся на решение Европейской комиссии о достаточности защиты для поставщиков, участвующих в Рамочной программе ЕС–США о защите данных, либо на стандартные договорные условия, утверждённые Европейской комиссией. Для других стран применяются равнозначные меры защиты, предусмотренные их законами.',
        'Jaiora members live in many countries, and some providers are located outside your country, including in the United States. For transfers from the European Union, the United Kingdom and Switzerland we rely on the European Commission’s adequacy decision for providers certified under the EU–U.S. Data Privacy Framework, or on Standard Contractual Clauses approved by the European Commission. For other countries we apply equivalent safeguards required by their laws.',
      ),
    ],
  },
  {
    id: 'retention',
    title: { ru: 'Сроки хранения', en: 'Retention' },
    blocks: [
      list(
        ['Сообщения в чатах — пока существует чат или до вашего запроса на удаление.', 'Chat messages — while the chat exists or until you ask us to delete them.'],
        ['Записи докладов — пока организатор или докладчик не попросит удалить.', 'Talk recordings — until the organiser or the speaker asks us to delete them.'],
        ['Профиль для подбора людей — пока вы пользуетесь подбором или до вашего возражения.', 'Matching profile — while you use matching or until you object.'],
        ['Обращения в поддержку — пока вопрос не решён и после этого столько, сколько нужно, чтобы ошибка не повторилась.', 'Support requests — until the issue is resolved and afterwards as long as needed to prevent it from recurring.'],
        ['Технические журналы — не дольше, чем нужно для безопасности и исправления ошибок.', 'Technical logs — no longer than needed for security and fixing errors.'],
        ['Данные у поставщиков искусственного интеллекта — в пределах сроков, указанных в разделе «Искусственный интеллект».', 'Data held by AI providers — within the periods stated in “Artificial intelligence”.'],
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
        ['потребовать пересмотра человеком решения, принятого с участием искусственного интеллекта;', 'ask for human review of a decision made with the help of artificial intelligence;'],
        ['подать жалобу в орган по защите данных своей страны.', 'lodge a complaint with the data protection authority of your country.'],
      ),
      p(
        `Напишите в Telegram @${PRIVACY_TELEGRAM}. Мы ответим в течение 30 дней. Мы не ухудшаем условия для тех, кто воспользовался своими правами.`,
        `Message @${PRIVACY_TELEGRAM} on Telegram. We will reply within 30 days. We do not treat anyone less favourably for exercising their rights.`,
      ),
    ],
  },
  {
    id: 'us',
    title: { ru: 'Для жителей США', en: 'For U.S. residents' },
    blocks: [
      p(
        'Мы не продаём персональные данные и не передаём их для поведенческой рекламы — рекламы в сообществах Jaiora нет вообще. Жители Калифорнии и других штатов с законами о защите данных имеют права, описанные в разделе «Ваши права». Сайт jaiora.me не отслеживает посетителей, поэтому сигнал браузера «Не отслеживать» (Do Not Track) не меняет его работу.',
        'We do not sell personal information or share it for cross-context behavioural advertising — there is no advertising in Jaiora communities at all. Residents of California and other states with privacy laws have the rights described in “Your rights”. The jaiora.me website does not track visitors, so a browser “Do Not Track” signal does not change how it works.',
      ),
    ],
  },
  {
    id: 'site',
    title: { ru: 'Сайт и файлы cookie', en: 'Website and cookies' },
    blocks: [
      p(
        'Сайт jaiora.me не использует файлы cookie, счётчики посещений и рекламные метки. Сайт размещён на GitHub Pages, шрифты загружаются из Google Fonts: при открытии страницы эти сервисы получают ваш IP-адрес и сведения о браузере, как при любом обращении к сайту. Если что-то из этого изменится, мы заранее обновим эту политику и, где это требуется, спросим ваше согласие.',
        'The jaiora.me website does not use cookies, visitor analytics or advertising tags. The site is hosted on GitHub Pages and its fonts are loaded from Google Fonts: when you open a page, these services receive your IP address and browser details, as with any website request. If any of this changes, we will update this policy first and ask for your consent where required.',
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
        'Данные передаются в зашифрованном виде (HTTPS), доступ к ним имеют только те, кому он нужен для работы сервисов, ключи доступа хранятся отдельно от кода. При утечке, создающей риск для людей, мы уведомим затронутых и, где это требуется, надзорный орган.',
        'Data is transmitted encrypted (HTTPS), access is limited to those who need it to run the services, and access keys are stored separately from code. In the event of a breach that puts people at risk, we will notify those affected and, where required, the supervisory authority.',
      ),
    ],
  },
  {
    id: 'changes',
    title: { ru: 'Изменения политики', en: 'Changes to this policy' },
    blocks: [
      p(
        'Мы обновляем эту страницу, когда меняются сервисы или поставщики, и указываем дату редакции вверху. О существенных изменениях сообщаем заметно на сайте или в чатах Jaiora.',
        'We update this page when our services or providers change and show the date at the top. We announce significant changes prominently on the website or in Jaiora chats.',
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
