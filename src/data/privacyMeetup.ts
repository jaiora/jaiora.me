// Политика сервиса записи докладов и расширения «Jaiora Meetup» (/privacy/meetup, /en/privacy/meetup) — наследует общую
// (/privacy) и конкретизирует её: данные, разрешения расширения, поставщики поимённо, заявление Limited Use для Chrome
// Web Store. Решение Егора 2026-10-28: «политики наследовать и конкретизировать… в митапе сказать про OpenAI, DigitalOcean».
// Разрешения здесь — ровно те, что в youtube-broadcaster/extension/manifest.json.
import type { L } from '@/lib/i18n'
import { PRIVACY_TELEGRAM } from '@/data/privacy'

export const MEETUP_PRIVACY_UPDATED = '2026-10-28'

export interface LegalSection {
  id: string
  title: L
  paras?: L[]
  items?: L[]
}

const p = (ru: string, en: string): L => ({ ru, en })

export const MEETUP_PRIVACY: LegalSection[] = [
  {
    id: 'about',
    title: p('Что это за политика', 'About this policy'),
    paras: [
      p(
        'Эта политика дополняет общую политику конфиденциальности Jaiora (jaiora.me/privacy) и конкретизирует её для сервиса записи докладов на встречах и расширения для браузера «Jaiora Meetup». Всё, что здесь не сказано, определяется общей политикой.',
        'This policy supplements the general Jaiora privacy policy (jaiora.me/privacy) and makes it specific for the meetup talk-recording service and the “Jaiora Meetup” browser extension. Anything not covered here is governed by the general policy.',
      ),
    ],
  },
  {
    id: 'data',
    title: p('Какие данные', 'What data'),
    items: [
      p('Изображение экрана и звук микрофона ноутбука докладчика — только во время доклада и только после того, как докладчик сам запустил запись.', 'Screen and microphone audio from the speaker’s laptop — only during the talk and only after the speaker starts the recording.'),
      p('Видео с телефонов участников, которые сами снимают доклад.', 'Video from attendees’ phones when they choose to film the talk.'),
      p('Программа встречи: названия докладов и имена докладчиков.', 'The meetup programme: talk titles and speaker names.'),
      p('Ключи доступа к встрече и к трансляции, которые вводит пользователь.', 'Meetup and streaming keys entered by the user.'),
      p('Сообщения об ошибках и снимок экрана к ним — только когда пользователь сам их отправил.', 'Bug reports and their screenshots — only when the user sends them.'),
      p('Технические журналы работы сервиса.', 'Technical service logs.'),
    ],
  },
  {
    id: 'permissions',
    title: p('Разрешения расширения', 'Extension permissions'),
    items: [
      p('«Вкладки» (tabs) — найти среди открытых вкладок ту, где открыты слайды (Google Slides или PDF), по её адресу. Содержимое вкладок расширение не читает.', '“Tabs” — to find, by its address, the open tab that shows the slides (Google Slides or PDF). The extension does not read the contents of tabs.'),
      p('«Отладчик» (debugger) — только для одного действия: нажать стрелку ← или → во вкладке со слайдами, когда докладчик листает их с телефона. Подключение — только к вкладке со слайдами и только во время доклада; после окончания доклада, а при брошенной странице — через 10 минут без нажатий, расширение отключается. Других команд расширение не отправляет.', '“Debugger” — for one action only: pressing the ← or → key in the slides tab when the speaker turns slides from their phone. It attaches only to the slides tab and only during the talk; it detaches when the talk ends, or after 10 minutes without presses if the page is abandoned. The extension sends no other commands.'),
      p('«Активная вкладка» (activeTab) — снимок видимой вкладки к сообщению об ошибке, только по нажатию «Отправить».', '“Active tab” — a screenshot of the visible tab for a bug report, only when “Send” is pressed.'),
      p('«Хранилище» (storage) — настройки, ключи и очередь сообщений об ошибках, пока нет сети; хранятся только в этом браузере.', '“Storage” — settings, keys and the queue of bug reports while offline; kept only in this browser.'),
      p('«Будильники» (alarms) — отпустить вкладку со слайдами через 10 минут без нажатий и повторить отправку сообщений об ошибках.', '“Alarms” — to release the slides tab after 10 minutes without presses and to retry sending bug reports.'),
      p('Доступ к upload.youtube.com — прямой эфир доклада на канал пользователя по ключу трансляции, который он сам ввёл; без ключа эфира нет.', 'Access to upload.youtube.com — live streaming of the talk to the user’s own channel with a stream key they entered; without a key there is no stream.'),
    ],
  },
  {
    id: 'recipients',
    title: p('Кому передаются данные', 'Who receives the data'),
    items: [
      p('Сервер записей Jaiora — записи докладов, программа встречи, сообщения об ошибках.', 'The Jaiora recording server — talk recordings, the meetup programme, bug reports.'),
      p('DigitalOcean — серверы, на которых работает сервис и хранятся записи.', 'DigitalOcean — the servers that run the service and store recordings.'),
      p('Cloudflare — защита и доставка трафика сервиса.', 'Cloudflare — protection and delivery of the service’s traffic.'),
      p('OpenAI — ответы на вопросы о работе сервиса и расшифровка голосовых сообщений в окне помощи и сообщениях об ошибках.', 'OpenAI — answering questions about the service and transcribing voice messages in the help window and bug reports.'),
      p('Google (YouTube) — прямая трансляция, если задан ключ трансляции.', 'Google (YouTube) — live streaming, when a stream key is set.'),
    ],
  },
  {
    id: 'retention',
    title: p('Хранение', 'Retention'),
    paras: [
      p(
        'Записи хранятся, пока их не попросят удалить; ключи в расширении — пока их не сотрут в настройках или не удалят расширение; сообщения об ошибках — пока ошибка не исправлена.',
        'Recordings are kept until deletion is requested; keys in the extension until they are cleared in settings or the extension is removed; bug reports until the bug is fixed.',
      ),
    ],
  },
  {
    id: 'limited-use',
    title: p('Правила Chrome Web Store', 'Chrome Web Store policy'),
    paras: [
      p(
        'Использование данных расширением «Jaiora Meetup» соответствует политике Chrome Web Store о пользовательских данных, включая требования об ограниченном использовании (Limited Use): данные используются только для записи и трансляции доклада и перелистывания слайдов, не продаются, не передаются для рекламы и не используются для оценки кредитоспособности.',
        'The “Jaiora Meetup” extension’s use of data adheres to the Chrome Web Store User Data Policy, including the Limited Use requirements: data is used only to record and stream the talk and turn the slides, is not sold, is not shared for advertising and is not used to determine creditworthiness.',
      ),
    ],
  },
  {
    id: 'contact',
    title: p('Контакты', 'Contact'),
    paras: [
      p(
        `Вопросы о данных и права — Егор Урванов, Telegram @${PRIVACY_TELEGRAM}. Ответ — в течение 30 дней.`,
        `Questions about data and your rights — Egor Urvanov, Telegram @${PRIVACY_TELEGRAM}. You will get a reply within 30 days.`,
      ),
    ],
  },
]
