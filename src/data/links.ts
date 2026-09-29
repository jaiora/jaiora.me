import type { L, Lang } from '@/lib/i18n'

export interface LinkItem {
  url: string
  label: string
  // Английский вариант: подставляется вместо русского, если задан
  en?: { label?: string }
  // Координаты для карты (чаты по городам)
  lat?: number
  lon?: number
}

// Форматы сверх стандартной субботы — известны только для городов с самой богатой историей встреч
// (см. reports/chat-facts/<город>_chat_facts_*.md в репозитории goals); для остальных не выдумываем.
export interface CityExtra {
  title: L
  text: L
  formats: L[]
}

// Часть текста истории города: обычный текст или текст со ссылкой (для абзацев с несколькими ссылками подряд)
export interface TextPart {
  text: string
  href?: string
}

// История города цельным текстом — когда фактов набралось на абзац, а не на список тегов.
// Проверено по реальной переписке города, не выдумано (см. отдельное исследование по Бангкоку).
export interface CityStory {
  // Переопределяет общий баннер встреч («Как и в большинстве локаций Jaiora»)
  banner?: { title: L; text: L }
  // Фото со встречи — путь в /public, alt-текст локализован, aspect — реальные пропорции кадра
  // (портретное «3 / 4» или альбомное «4 / 3»), чтобы не обрезать по чужому шаблону
  photo?: { src: string; alt: L; aspect: string }
  paragraph: { ru: TextPart[]; en: TextPart[] }
}

// Статус ритма встреч — ставим только там, где он подтверждён реальной перепиской,
// для остальных локаций не выдумываем и оставляем пустым.
export type LocationStatus = 'dormant' | 'irregular' | 'stable' | 'autonomous'

export const STATUS_ORDER: LocationStatus[] = ['dormant', 'irregular', 'stable', 'autonomous']

export const STATUS_META: Record<LocationStatus, { color: string; label: L; hint: L }> = {
  dormant: {
    color: 'var(--status-dormant)',
    label: { ru: 'Спящий', en: 'Dormant' },
    hint: { ru: 'Чат есть, встреч пока нет', en: 'Chat exists, no meetups yet' },
  },
  irregular: {
    color: 'var(--status-irregular)',
    label: { ru: 'Нерегулярный', en: 'Irregular' },
    hint: { ru: 'Встречи бывают, но без ритма', en: 'Meetups happen, but no set rhythm' },
  },
  stable: {
    color: 'var(--status-stable)',
    label: { ru: 'Стабильный', en: 'Stable' },
    hint: { ru: 'Встречи по расписанию, есть организатор', en: 'Meetups on a schedule, with an organizer' },
  },
  autonomous: {
    color: 'var(--status-autonomous)',
    label: { ru: 'Автономный', en: 'Autonomous' },
    hint: { ru: 'Идёт само, без организатора', en: 'Runs on its own, no organizer needed' },
  },
}

export interface CityChat extends LinkItem {
  // Адрес страницы города: /city/:slug
  slug: string
  // Русское «в …» (предложный падеж); не задано — название несклоняемое, используем label
  whereRu?: string
  extra?: CityExtra
  story?: CityStory
  status?: LocationStatus
}

export const itemText = (item: LinkItem, lang: Lang) => ({
  label: (lang === 'en' && item.en?.label) || item.label,
})

export const whereText = (city: CityChat, lang: Lang) => (lang === 'ru' ? (city.whereRu ?? city.label) : itemText(city, lang).label)

export const CITY_CHATS: CityChat[] = [
  {
    slug: 'batumi',
    url: 'https://t.me/batumi_it_digital',
    label: 'Батуми',
    en: { label: 'Batumi' },
    lat: 41.64,
    lon: 41.64,
    status: 'irregular',
    story: {
      banner: {
        title: { ru: 'От Синори до Level', en: 'From Sinori to Level' },
        text: {
          ru: 'Встречаемся с января 2025-го — одна из самых давних локаций в сети: начинали в Синори, потом ирландский паб, потом SushiGO. После паузы зимой 2026-го традицию возобновили в мае, а с сентября субботы ведут Наталья и Ксения.',
          en: 'We’ve been meeting since January 2025 — one of the oldest locations in the network: started at Sinori, then an Irish pub, then SushiGO. After a pause over the winter of 2026, the tradition restarted in May, and since September, Saturdays are run by Natalie and Ksenia.',
        },
      },
      paragraph: {
        ru: [
          {
            text:
              'Батуми — одна из самых давних локаций Jaiora: первая встреча прошла в январе 2025-го, и с тех пор счёт пошёл на десятки суббот. Место менялось несколько раз — от Синори через ирландский паб до SushiGO. Зимой 2026-го встречи взяли паузу, а в апреле того же года чат пережил тревожный момент: у ',
          },
          { text: 'Саши Романова', href: 'https://t.me/LoginGod' },
          {
            text:
              ' — давнего и любимого в чате персонажа, к которому здесь обращаются за советом чаще, чем к кому-либо ещё, — резко разболелась рука, и потребовалась срочная операция в Стамбуле. Сбор денег закрыли меньше чем за сутки. К осени Сашу снова как ни в чём не бывало подкалывают в чате про его любимый «Гиннесс». В мае традицию суббот возобновили — сначала в ROX BAR, затем в Level Gastro & Game Bar, а с приходом ',
          },
          { text: 'Натальи', href: 'https://t.me/natali_mytarget' },
          { text: ' и ' },
          { text: 'Ксении Васильевой', href: 'https://t.me/Kseniya_Vasil' },
          {
            text:
              ' в сентябре 2026-го, взявших сообщество на себя на ближайшие два месяца, снова вернулись в SushiGO.',
          },
        ],
        en: [
          {
            text:
              'Batumi is one of Jaiora’s oldest locations: the first meetup was in January 2025, and the Saturday count has run into the dozens since. The venue changed a few times — from Sinori through an Irish pub to SushiGO. In the winter of 2026 the meetups paused, and that April the chat went through an anxious moment: ',
          },
          { text: 'Sasha Romanov', href: 'https://t.me/LoginGod' },
          {
            text:
              ' — a longtime, well-liked fixture of the chat, the person people here turn to for advice more than anyone else — suddenly had serious arm pain and needed urgent surgery in Istanbul. The fundraiser closed in under a day. By fall, Sasha was back to getting the usual ribbing in the chat about his beloved Guinness. In May the Saturday tradition restarted — first at ROX BAR, then at Level Gastro & Game Bar, and when ',
          },
          { text: 'Natalie', href: 'https://t.me/natali_mytarget' },
          { text: ' and ' },
          { text: 'Ksenia Vasilyeva', href: 'https://t.me/Kseniya_Vasil' },
          {
            text:
              ' took the community on themselves for two months starting in September 2026, it moved back to SushiGO.',
          },
        ],
      },
    },
  },
  {
    slug: 'da-nang',
    url: 'https://t.me/it_danang',
    label: 'Дананг',
    en: { label: 'Da Nang' },
    whereRu: 'Дананге',
    lat: 16.05,
    lon: 108.22,
    status: 'autonomous',
    story: {
      banner: {
        title: { ru: 'От кафе у дороги до своего пляжа', en: 'From a roadside café to its own beach' },
        text: {
          ru: 'Встречаемся с января 2025-го — раньше почти каждую неделю в NU ARROWS Caffe&Restaurant, а с апреля того же года и по сей день — на пляже, в WiWi Beach Coffee & Food. Больше пятидесяти суббот подряд, без единого настоящего перерыва.',
          en: 'We’ve been meeting since January 2025 — first almost every week at NU ARROWS Caffe&Restaurant, then from April that same year to today, on the beach at WiWi Beach Coffee & Food. More than fifty Saturdays running, without a real break.',
        },
      },
      paragraph: {
        ru: [
          {
            text:
              'Кроме субботы, встречи здесь идут без перерыва с января 2025-го — больше двадцати месяцев подряд, включая новогодние праздники. Начинал их Макс, а с переезда на пляж в апреле 2025-го на месте стал встречать ',
          },
          { text: 'Павел Морозов', href: 'https://t.me/truemoroz' },
          {
            text:
              '. Дальше эстафету по субботним напоминаниям подхватывали разные люди в чате — Александр Батагов, Vlad U и другие. В чате прижилась привычка решать спорные вопросы голосованием, а не сверху. Летом 2025-го, заехав в Дананг, тот же формат привезла и ',
          },
          { text: 'Алёна', href: 'https://t.me/alennka555' },
          {
            text:
              ' — она же поднимает пиклбол и волейбол в Бангкоке: на неделе перед субботней встречей собирала корты и потом вела всех на общий пляжный сбор. Сейчас вокруг субботы вырос целый параллельный формат, который ведёт ',
          },
          { text: 'Константин Трудик', href: 'https://t.me/TrudikK' },
          {
            text:
              ': по вторникам — техническая встреча вперемешку со «свободным микрофоном» для айти-нытья, плюс цикл лекций о том, как ИИ меняет рынок продуктовой разработки, с приглашёнными спикерами вроде ',
          },
          { text: 'Александра Спивака', href: 'https://t.me/sm12h8' },
          {
            text:
              '. Когда в сентябре 2026-го на Дананг обрушился тайфун, встречу в тот же день просто перенесли в другое кафе — сам Константин называет её «градообразующей встречей, которая идёт уже не первый год».',
          },
        ],
        en: [
          {
            text:
              'Beyond Saturday, meetups here have run without a break since January 2025 — more than twenty months straight, holidays included. Max started them, and after the move to the beach in April 2025, ',
          },
          { text: 'Pavel Morozov', href: 'https://t.me/truemoroz' },
          {
            text:
              ' became the one meeting people on-site. From there, different people in the chat took turns posting the weekly reminders — Alexandr Batagov, Vlad U, and others. The chat picked up a habit of settling disputed questions by vote rather than from the top. In the summer of 2025, passing through Da Nang, ',
          },
          { text: 'Alena', href: 'https://t.me/alennka555' },
          {
            text:
              ' brought the same format with her — she’s also the one running pickleball and volleyball in Bangkok: that week she booked courts before the Saturday meetup, then led everyone on to the beach gathering. Now a whole parallel program has grown up around Saturday, run by ',
          },
          { text: 'Konstantin Trudik', href: 'https://t.me/TrudikK' },
          {
            text:
              ': Tuesday technical meetups mixed with an open-mic “IT venting” session, plus a lecture series on how AI is reshaping product work, with guest speakers like ',
          },
          { text: 'Alexander Spivak', href: 'https://t.me/sm12h8' },
          {
            text:
              '. When a typhoon hit Da Nang in September 2026, that day’s meetup was simply moved to another café — Konstantin himself calls it “the city-forming meetup that’s been running for more than a year.”',
          },
        ],
      },
    },
  },
  {
    slug: 'bangkok',
    url: 'https://t.me/bangkok_it',
    label: 'Бангкок',
    en: { label: 'Bangkok' },
    whereRu: 'Бангкоке',
    lat: 13.76,
    lon: 100.5,
    status: 'autonomous',
    story: {
      banner: {
        title: { ru: 'От кальянной до своего места', en: 'From a hookah lounge to a place of our own' },
        text: {
          ru: 'Встречаемся с мая 2024-го: начинали в кальянной, потом в баре, потом в изакае с караоке, а сейчас — на руфтопе. Счёт встреч идёт на сотни.',
          en: 'We’ve been meeting since May 2024: started in a hookah lounge, then a bar, then an izakaya with karaoke, and now on a rooftop. The meetup count runs into the hundreds.',
        },
      },
      photo: {
        src: '/bangkok-rooftop.jpg',
        alt: { ru: 'Встреча Jaiora на руфтопе в Бангкоке', en: 'A Jaiora meetup on a rooftop in Bangkok' },
        aspect: '3 / 4',
      },
      paragraph: {
        ru: [
          { text: 'Кроме привычной субботы Бангкок — самое богатое на форматы место в сети. Регулярные встречи в разных местах вели два человека: ' },
          { text: 'София', href: 'https://t.me/fambata' },
          { text: ' — она нашла изакаю с караоке и устраивала вечеринки для своих (мафия и лото, Хэллоуин, именная «NOVEMBULL»), а после неё ' },
          { text: 'Алёна', href: 'https://t.me/alennka555' },
          { text: ' — нашла нынешний руфтоп, привела волейбол, пиклбол, футбол и баскетбол (у каждого свой чат), организовала лекцию океанолога Александра Осадчиева «Что скрывает океан?» и не только. Кроме того, с августа 2024 года в офисе местного оператора True прошло около десяти митапов на разные темы, где участники читают друг другу доклады (' },
          { text: 'записи', href: 'https://t.me/digital_nomads_asia/378' },
          { text: '), а однажды даже пробовали провести турнир по VR-играм. Сейчас у встреч нет отдельного организатора: сарафанное радио справляется само. А в 2025-м чат подключился к поискам пропавшего парня — и нашёл его.' },
        ],
        en: [
          { text: 'Beyond the usual Saturday, Bangkok is the richest location in the network for formats. The regular meetups were run, at different venues, by two people: ' },
          { text: 'Sonya', href: 'https://t.me/fambata' },
          { text: ', who found the karaoke izakaya and threw private parties (mafia and lotto, Halloween, a themed “NOVEMBULL”), and later ' },
          { text: 'Alyona', href: 'https://t.me/alennka555' },
          { text: ', who found the current rooftop, brought volleyball, pickleball, football, and basketball (each with its own chat), organized a lecture by oceanologist Alexander Osadchiev, “What does the ocean hide?”, and more besides. On top of that, around ten meetups on various topics have been held since August 2024 at the office of the local telecom operator True, where members give talks to each other (' },
          { text: 'recordings', href: 'https://t.me/digital_nomads_asia/378' },
          { text: '), and there was even an attempt to run a VR games tournament. Now there’s no dedicated organizer for the meetups: word of mouth handles it just fine on its own. And in 2025 the chat joined the search for a missing young man — and found him.' },
        ],
      },
    },
  },
  {
    slug: 'bali',
    url: 'https://t.me/bali_digital_it',
    label: 'Бали',
    en: { label: 'Bali' },
    lat: -8.41,
    lon: 115.19,
    status: 'irregular',
    story: {
      banner: {
        title: { ru: 'От сходок на закате до Ju Bali', en: 'From sunset meetups to Ju Bali' },
        text: {
          ru: 'Встречаемся с ноября 2025-го: начинали раз в две недели на закате в Бераве, потом Джимбаран и Убуд по очереди. С конца мая 2026-го собираемся по субботам в одном месте — Ju Bali в Чангу.',
          en: 'We’ve been meeting since November 2025: started every two weeks at sunset in Berawa, then Jimbaran and Ubud in turn. Since late May 2026, we’ve met every Saturday at one place — Ju Bali in Changu.',
        },
      },
      paragraph: {
        ru: [
          { text: 'Чат и первые встречи здесь придумала ' },
          { text: 'Аксинья', href: 'https://t.me/aksinia_chum' },
          {
            text:
              ': раз в две недели она собирала всех на закате — то в Бераве в 54DM, то в Джимбаране, то в Убуде, планы отмечали реакциями и общим календарём. Одну из встреч, в Umalas Lounge, устраивала ',
          },
          { text: 'Настя', href: 'https://t.me/sann_image' },
          { text: ' — со скидкой для сообщества и докладом ' },
          { text: 'Сергей', href: 'https://t.me/mattiy' },
          {
            text:
              ' об эффективных коммуникациях. Весной 2026-го Аксинье одобрили визу в США, и она туда улетела — встречи встали на паузу. В конце мая традицию возобновил ',
          },
          { text: 'Егор', href: 'https://t.me/eurvanov' },
          {
            text:
              ': прежнюю площадку Насти к тому моменту сменили, поэтому она же подсказала следующее место — Ju Bali в Чангу, где собираются по субботам с тех пор — иногда с пропуском недели, если набиралось слишком мало желающих, — и даже когда в сентябре чат голосованием выбирал, не попробовать ли Убуд, «как обычно» победило почти единогласно.',
          },
        ],
        en: [
          { text: 'The chat and its first meetups here were started by ' },
          { text: 'Aksinia', href: 'https://t.me/aksinia_chum' },
          {
            text:
              ': every two weeks she gathered everyone at sunset — in Berawa at 54DM, then Jimbaran, then Ubud, tracking plans through reactions and a shared calendar. One meetup, at Umalas Lounge, was hosted by ',
          },
          { text: 'Nastya', href: 'https://t.me/sann_image' },
          { text: ' — with a discount for the community and a talk by ' },
          { text: 'Sergey', href: 'https://t.me/mattiy' },
          {
            text:
              ' on effective communication. In spring 2026, Aksinia’s US visa got approved and she flew out — the meetups paused. In late May, ',
          },
          { text: 'Egor', href: 'https://t.me/eurvanov' },
          {
            text:
              ' revived the tradition: Nastya’s old venue had changed hands by then, so she was the one who suggested the next spot — Ju Bali in Changu, where the group has met most Saturdays ever since, with an occasional week skipped when too few people were up for it — holding even when a September vote floated trying Ubud instead, where “as usual” won almost unanimously.',
          },
        ],
      },
    },
  },
  {
    slug: 'phuket',
    url: 'https://t.me/phuket_digital_it',
    label: 'Пхукет',
    en: { label: 'Phuket' },
    whereRu: 'Пхукете',
    lat: 7.88,
    lon: 98.39,
    status: 'irregular',
    story: {
      banner: {
        title: { ru: 'От вечеринки в резорте до Sala Mexicali', en: 'From a resort party to Sala Mexicali' },
        text: {
          ru: 'Встречаемся с декабря 2025-го: первая встреча прошла в закрытом пляжном резорте. После паузы и неудачной попытки перезапуска в апреле сообщество вернулось в июне 2026-го — сначала в We Cafe, а с третьей встречи, с 27 июня, и по сей день — в Sala Mexicali Phuket Town.',
          en: 'We’ve been meeting since December 2025: the first meetup was at a private beach resort. After a pause and a failed relaunch attempt in April, the community came back in June 2026 — first at We Cafe, then from the third meetup on, since June 27, at Sala Mexicali Phuket Town, where it’s stayed ever since.',
        },
      },
      paragraph: {
        ru: [
          {
            text:
              'Первая встреча в конце декабря 2025-го прошла в закрытом пляжном резорте — бассейн, бар, шезлонги, барбекю. Позже случались встречи и по инициативе других — например, в январе Макс Рейнор собирал всех в Wine Connection в Бангтао. В апреле сообщество пробовало возродить субботы, перебрало с десяток мест, но не срослось. Настоящий перезапуск случился в июне: сначала в We Cafe, а с третьей встречи, с 27 июня, — в Sala Mexicali Phuket Town, где держится с тех пор. Тема для субботы обычно рождается сама на неделе: то самая нелепая опечатка на карте, то маршруты для похода, то налоги цифрового кочевника в Таиланде. ',
          },
          { text: 'Олег Теретенко', href: 'https://t.me/olegteretenko' },
          {
            text:
              ' однажды разложил формат по пунктам: тема не задана заранее, ноутбук брать не нужно, а за столом — не только айтишники, но и семьи с детьми.',
          },
        ],
        en: [
          {
            text:
              'The first meetup, in late December 2025, was at a private beach resort — a pool, a bar, sun loungers, a barbecue. Later, others stepped up too — in January, Maks Raynor gathered everyone at Wine Connection in Bangtao. In April the community tried to revive the Saturdays, went through about a dozen venues, but it didn’t stick. The real relaunch came in June: first at We Cafe, then from the third meetup on, since June 27, at Sala Mexicali Phuket Town, where it’s stayed ever since. The Saturday topic usually comes up on its own during the week: the silliest map typo, a hiking route, or a digital nomad’s taxes in Thailand. ',
          },
          { text: 'Oleg Teretenko', href: 'https://t.me/olegteretenko' },
          {
            text:
              ' once broke the format down point by point: no set topic, no need to bring a laptop, and the table isn’t just IT people — families with kids come too.',
          },
        ],
      },
    },
  },
  {
    slug: 'almaty',
    url: 'https://t.me/almati_it',
    label: 'Алматы',
    en: { label: 'Almaty' },
    lat: 43.24,
    lon: 76.89,
    status: 'dormant',
    story: {
      banner: {
        title: { ru: 'Начали в 2024-м, встречи сейчас на паузе', en: 'Started in 2024, meetups on pause for now' },
        text: {
          ru: 'Встречались с октября 2024-го — суббота в коливинге, потом бар, бильярд. С лета 2025-го регулярных встреч не было; сейчас чат живёт скорее как доска объявлений для IT-Алматы.',
          en: 'We met from October 2024 — Saturday at a coworking, then a bar, then billiards. There haven’t been regular meetups since summer 2025; these days the chat runs more as a bulletin board for IT in Almaty.',
        },
      },
      paragraph: {
        ru: [
          {
            text:
              'Начали в октябре 2024-го дружно: собирали «#whois», спорили в опросах, куда идти — в коливинг или в бар, — и даже голосовали «бухать или не бухать». К лету 2025-го интерес поугас, а в марте 2026-го ',
          },
          { text: 'Егор', href: 'https://t.me/eurvanov' },
          {
            text:
              ' сам подвёл итог в чате: «Я перестал вкладываться так активно в сообщество». Сейчас чат живёт скорее как доска объявлений: вакансии, предупреждения о мошенниках, ежедневный дайджест от бота и репосты других казахстанских IT-сообществ.',
          },
        ],
        en: [
          {
            text:
              'It started warmly in October 2024: people posted “#whois”, argued in polls over where to go — a coworking or a bar — and even voted on whether to drink or not. By summer 2025 the interest had faded, and in March 2026 ',
          },
          { text: 'Egor', href: 'https://t.me/eurvanov' },
          {
            text:
              ' summed it up in the chat himself: “I’ve stopped putting as much energy into the community.” These days the chat runs more like a bulletin board: job posts, scam warnings, a daily digest from a bot, and reposts from other Kazakhstani IT communities.',
          },
        ],
      },
    },
  },
  {
    slug: 'saint-petersburg',
    url: 'https://t.me/spb_digital_it',
    label: 'Санкт-Петербург',
    en: { label: 'Saint Petersburg' },
    whereRu: 'Санкт-Петербурге',
    lat: 59.93,
    lon: 30.32,
    status: 'irregular',
    story: {
      banner: {
        title: { ru: 'От дайджеста событий до своей субботы', en: 'From an events digest to its own Saturday' },
        text: {
          ru: 'Встречаемся с июня 2026-го: начинали в Af Brew Taproom, потом в «Поддоне», а с четвёртой встречи почти на три месяца прижился Kazan-Mangal. В сентябре снова в поиске места — пробовали бар «Сарапул», сейчас Feromon у Сенной.',
          en: 'We’ve been meeting since June 2026: started at Af Brew Taproom, then at Poddon Bar, and from the fourth meetup it settled at Kazan-Mangal for nearly three months. In September we’re looking for a place again — tried the bar “Sarapul”, now Feromon near Sennaya.',
        },
      },
      photo: {
        src: '/piter-meetup.jpg',
        alt: { ru: 'Встреча Jaiora в Санкт-Петербурге', en: 'A Jaiora meetup in Saint Petersburg' },
        aspect: '4 / 3',
      },
      paragraph: {
        ru: [
          { text: 'Ещё до своих суббот чат жил как афиша: ' },
          { text: 'Саша', href: 'https://t.me/Kubig' },
          { text: ' еженедельно собирает бесплатные ИТ-события по всему Питеру — многотрековые встречи Coffee&Code (Android, iOS, QA, DevOps), PiterJS, Петербургскую группу Linux, вечера ODS.Party и раз в две недели «ИТ-нытьё» в Failover Bar. Эта афиша жива и сегодня. В июне 2026-го ' },
          { text: 'Егор', href: 'https://t.me/eurvanov' },
          { text: ' возобновил традицию собственных встреч сообщества: первая прошла в Af Brew Taproom, дальше в «Поддоне», а с четвёртой прижился Kazan-Mangal, где прошло больше десяти встреч подряд. Формат открытый, без темы и подготовки — просто приходишь, и разговор находится сам. К сентябрю счёт перевалил за пятнадцать встреч, а субботу уже принял Саша.' },
        ],
        en: [
          { text: 'Even before its own Saturdays, the chat lived as an events board: ' },
          { text: 'Sasha', href: 'https://t.me/Kubig' },
          { text: ' curates free IT events across Piter every week — Coffee&Code’s multi-track meetups (Android, iOS, QA, DevOps), PiterJS, the Saint Petersburg Linux user group, ODS.Party evenings, and the biweekly “IT Whining” nights at Failover Bar. That board is still running today. In June 2026, ' },
          { text: 'Egor', href: 'https://t.me/eurvanov' },
          { text: ' revived the community’s own meetup tradition: the first one was at Af Brew Taproom, then at Poddon Bar, and from the fourth one on it settled at Kazan-Mangal for more than ten meetups in a row. The format is open, no topic and no prep needed — you just show up, and the conversation finds itself. By September the count passed fifteen meetups, and Saturdays are now run by Sasha.' },
        ],
      },
    },
  },
  {
    slug: 'antalya',
    url: 'https://t.me/antalia_it',
    label: 'Анталья',
    en: { label: 'Antalya' },
    whereRu: 'Анталье',
    lat: 36.9,
    lon: 30.71,
    status: 'dormant',
    story: {
      banner: {
        title: { ru: 'Начали в марте 2025-го, дальше — от случая к случаю', en: 'Started in March 2025, ad hoc ever since' },
        text: {
          ru: 'Встречались по субботам с марта по июль 2025-го — Leman Cafe, потом ирландский паб. С тех пор регулярного места нет: собираются от случая к случаю, когда получается договориться.',
          en: 'We met every Saturday from March to July 2025 — Leman Cafe, then an Irish pub. There’s been no regular spot since: people get together ad hoc, whenever it comes together.',
        },
      },
      paragraph: {
        ru: [
          { text: 'Первые десять суббот, с марта по июль 2025-го, вели ' },
          { text: 'Артём', href: 'https://t.me/Artemu78' },
          {
            text:
              ' и Егор — начинали в Leman Cafe, потом перебрались в ирландский паб. Дальше регулярный ритм разошёлся: Артём какое-то время водил параллельную встречу по воскресеньям в Старом городе для тех, кто занимается ИИ и вайб-кодингом, но и её со временем свернул. С тех пор в Анталье собираются скорее стихийно — то кофе в Лимане, то шашлык в Сарысу — договариваясь каждый раз заново, без фиксированного дня и места.',
          },
        ],
        en: [
          { text: 'The first ten Saturdays, from March to July 2025, were run by ' },
          { text: 'Artem', href: 'https://t.me/Artemu78' },
          {
            text:
              ' and Egor — starting at Leman Cafe, then moving to an Irish pub. After that the regular rhythm fell apart: Artem ran a parallel Sunday meetup in the Old Town for a while, for people into AI and vibe-coding, but eventually wound that down too. Since then, Antalya gathers more on the fly — coffee in Liman one time, a barbecue in Sarysu another — settling on a day and place fresh each time.',
          },
        ],
      },
    },
  },
  {
    slug: 'moscow',
    url: 'https://t.me/moscow_digital_it',
    label: 'Москва',
    en: { label: 'Moscow' },
    whereRu: 'Москве',
    lat: 55.75,
    lon: 37.62,
    status: 'irregular',
    story: {
      banner: {
        title: { ru: 'От Полянки до своего места', en: 'From Polyanka to a place of our own' },
        text: {
          ru: 'Начинали в апреле 2025-го — бар «Полянка Wine», потом «Blanc». С июля 2026-го собираемся по субботам в «Howard Loves Craft» на Болотной набережной. Пробовали перейти на пятницы — не прижилось, вернулись к субботе.',
          en: 'Started in April 2025 — the bar Polyanka Wine, then Blanc. Since July 2026, Saturday meetups at Howard Loves Craft on Bolotnaya Embankment. Tried switching to Fridays — it didn’t stick, back to Saturday.',
        },
      },
      photo: {
        src: '/moscow-uno.jpg',
        alt: { ru: 'Настольные игры на встрече Jaiora в Москве', en: 'Board games at a Jaiora meetup in Moscow' },
        aspect: '4 / 3',
      },
      paragraph: {
        ru: [
          { text: 'Кроме субботы у Москвы уже есть своя внутренняя жизнь: участники сами собрали мини-базу кортов для бадминтона и падел-тенниса по всему городу — от Алтуфьево до Лужников. ' },
          { text: 'Надежда Яковлева', href: 'https://t.me/n0d10' },
          { text: ' пробует собрать компанию на настольные игры — шахматы, UNO, Monopoly, го. Дважды в чате предупреждали о мошенниках из соседних городских чатов, которые представлялись помощниками и пропадали с деньгами. А однажды один из новичков случайно узнал таксиста, с которым столкнулся в Домодедово, — двумя годами раньше видел его на айти-конференции в Москве.' },
        ],
        en: [
          { text: 'Beyond Saturday, Moscow already has its own life: members put together a mini database of badminton and padel courts all over the city — from Altufyevo to Luzhniki. ' },
          { text: 'Nadezhda Yakovleva', href: 'https://t.me/n0d10' },
          { text: ' is trying to get a board game night going — chess, UNO, Monopoly, Go. Twice the chat warned about scammers from neighboring city chats who posed as helpers and disappeared with the money. And once a newcomer recognized a taxi driver he ran into at Domodedovo airport — two years earlier he’d seen the same guy at an IT conference in Moscow.' },
        ],
      },
    },
  },
  {
    slug: 'belgrade',
    url: 'https://t.me/belgrade_jaiora',
    label: 'Белград',
    en: { label: 'Belgrade' },
    whereRu: 'Белграде',
    lat: 44.79,
    lon: 20.45,
    status: 'irregular',
    story: {
      banner: {
        title: { ru: 'Ожил в сентябре 2026-го', en: 'Came back to life in September 2026' },
        text: {
          ru: 'Чат открыт с апреля 2025-го, но по-настоящему ожил только в сентябре 2026-го: за несколько дней влилась целая волна новых участников, а первая встреча назначена на 3 октября — место пока выбирают.',
          en: 'The chat has been open since April 2025, but it really came back to life only in September 2026: a wave of new members joined within days, and the first meetup is set for October 3 — the venue is still being picked.',
        },
      },
      paragraph: {
        ru: [
          { text: 'Чат создали в апреле 2025-го — но всерьёз дошли руки только в сентябре 2026-го. ' },
          { text: 'Антон', href: 'https://t.me/antonkey1' },
          {
            text:
              ' вызвался найти место для встреч, и буквально за пару дней в чат влилась целая волна новых участников с «#whois». Дмитрий взял на себя подборку заведений — в Сербии во многих местах можно курить внутри, так что поиск некурящего варианта стал отдельной темой обсуждения. Первая встреча назначена на 3 октября.',
          },
        ],
        en: [
          { text: 'The chat was created in April 2025 — but it only really got attention in September 2026. ' },
          { text: 'Anton', href: 'https://t.me/antonkey1' },
          {
            text:
              ' stepped up to find a venue, and within a couple of days a whole wave of new members joined with “#whois” intros. Dmitrii took on putting together a shortlist of venues — smoking indoors is common in Serbia, so finding a smoke-free spot became its own topic of discussion. The first meetup is set for October 3.',
          },
        ],
      },
    },
  },
  {
    slug: 'yerevan',
    url: 'https://t.me/erevan_jaiora',
    label: 'Ереван',
    en: { label: 'Yerevan' },
    whereRu: 'Ереване',
    lat: 40.18,
    lon: 44.51,
    status: 'irregular',
    story: {
      banner: {
        title: { ru: 'Только начинаем', en: 'Just getting started' },
        text: {
          ru: 'Чат открылся 20 сентября 2026-го. Первая встреча — 3 октября, место пока выбираем.',
          en: 'The chat opened on September 20, 2026. The first meetup is on October 3 — the venue is still being picked.',
        },
      },
      paragraph: {
        ru: [
          {
            text:
              'Ереван — самая свежая локация в сети: чат запустили 20 сентября 2026-го, и первая суббота ещё только предстоит — 3 октября, место пока выбирают. Пока готовятся, Ханна Николаенко уже закрепила гид по заведениям города от местного сообщества «Гастробайтеров» — армянская и грузинская кухня, кофейни, винные места — пригодится, когда локация для встречи определится.',
          },
        ],
        en: [
          {
            text:
              'Yerevan is the newest location in the network: the chat launched on September 20, 2026, and the first Saturday is still ahead — October 3, venue still being decided. While that gets sorted, Khanna Nikolaenko has already pinned a guide to the city’s spots from the local “Gastrobiters” community — Armenian and Georgian food, coffee shops, wine bars — handy once a meetup venue is settled.',
          },
        ],
      },
    },
  },
]

// Чаты по темам — показываются на странице Jaiora
export const THEME_CHATS: LinkItem[] = [
  { url: 'https://t.me/agent_coding', label: 'Агент-кодинг', en: { label: 'Agent coding' } },
  { url: 'https://t.me/ptd_vnzh_georgia', label: 'ПТД и ВНЖ', en: { label: 'Residency in Georgia' } },
  { url: 'https://t.me/customer_success_team', label: 'Customer Success Team' },
  { url: 'https://t.me/digital_nomads_asia', label: 'Digital Nomads Asia' },
  { url: 'https://t.me/danang_it_channel', label: 'Анонсы Дананга', en: { label: 'Da Nang announcements' } },
]
