import type { Lang } from '@/lib/i18n'
import { CITY_CHATS, itemText } from '@/data/links'
import { JAIORA } from '@/data/jaiora'

export interface FaqItem {
  q: string
  a: string
}

// Одни и те же вопросы видны на странице и уходят в разметку FAQPage: Google учитывает разметку, только если текст виден
const HOME_Q = {
  what: { ru: 'Что такое Jaiora?', en: 'What is Jaiora?' },
  when: { ru: 'Когда и где проходят встречи?', en: 'When and where are the meetups?' },
  who: { ru: 'Кто может прийти и сколько это стоит?', en: 'Who can come and how much does it cost?' },
  rules: { ru: 'Какие правила в сообществе?', en: 'What are the community rules?' },
  find: { ru: 'Что можно найти в Jaiora?', en: 'What can you find in Jaiora?' },
  cities: { ru: 'В каких городах есть Jaiora?', en: 'Which cities is Jaiora in?' },
}

// Ответы — дословно из контента главной, без новых утверждений
export function homeFaq(lang: Lang): FaqItem[] {
  const c = JAIORA[lang]
  return [
    { q: HOME_Q.what[lang], a: `${c.eyebrow}. ${c.lead}` },
    { q: HOME_Q.when[lang], a: `${c.meet.when}. ${c.meet.title}. ${c.meet.text}` },
    { q: HOME_Q.who[lang], a: c.rules[0].text },
    { q: HOME_Q.rules[lang], a: `${c.rulesLead} ${c.rules.map((r) => `${r.title}: ${r.text}`).join(' ')}` },
    { q: HOME_Q.find[lang], a: c.find.map((f) => `${f.title}: ${f.text}.`).join(' ') },
    { q: HOME_Q.cities[lang], a: CITY_CHATS.map((x) => itemText(x, lang).label).join(', ') + '.' },
  ]
}

export const FAQ_TITLE = { ru: 'Частые вопросы', en: 'FAQ' }

// Вопросы по конкретной локации — из реальных вопросов в её чате; ключ — slug локации
export const LOCATION_FAQ: Record<string, { ru: FaqItem[]; en: FaqItem[] }> = {
  'bangkok': {
      "ru": [
          {
              "q": "Когда и где встречаются айтишники в Бангкоке?",
              "a": "Каждую субботу в 19:00 на High Streats Rooftop (1122 Sukhumvit Road, район Пхра Кханонг) — в сентябре 2026 года прошла уже 118-я встреча. Если руфтоп закрыт из-за дождя, встреча переезжает на 7-й этаж того же здания. Отдельного организатора нет: даже если анонса в чате не было, встреча всё равно проходит."
          },
          {
              "q": "Как попасть в IT-чат Бангкока?",
              "a": "Нажмите «Открыть чат в Telegram» на этой странице и отправьте заявку; если её не приняли, напишите Егору — @eurvanov. После вступления представьтесь с тегом #whois: кто вы, чем занимаетесь, что ищете."
          },
          {
              "q": "Где в Бангкоке поиграть в волейбол, пиклбол или футбол?",
              "a": "У сообщества свои спортивные чаты, их организовала Алёна: волейбол и пиклбол — t.me/voleibolbkk, футбол — t.me/footballinbangkok, для баскетбола есть отдельный чат (ссылку дают в общем). По анонсам 2025 года волейбол — классический, на песке в зале с кондиционерами и душем у станции BTS Asok, обычно по субботам в 15:00; пиклбол — на крытых кортах по средам или четвергам в 21:00–23:00."
          },
          {
              "q": "Как иностранцу открыть банковский счёт в Бангкоке?",
              "a": "По опыту участников, в 2025–2026 годах это стало заметно сложнее: к лету 2026-го Bangkok Bank открывает иностранцам в основном зарплатные карты, а по студенческой визе счёт открыть уже тяжело. Если счёт есть, номер телефона должен быть зарегистрирован на тот же паспорт, что и банк: иначе Kasikorn блокирует онлайн-банк до визита в отделение со справкой от оператора. При смене телефона Krungsri разрешает вход с нового устройства только в отделении, а Kasikorn, по опыту участников на январь 2026 года, не принимает переводы с Wise, если счёт открыт на паспорт РФ."
          },
          {
              "q": "Какую визу оформить для жизни в Таиланде?",
              "a": "По опыту участников на 2025–2026 годы: с паспортом РФ на въезде ставят штамп на 60 дней и продлевают в иммиграционном офисе ещё на 30, но летом 2026-го при повторном продлении за год участнику дали только 7 дней. Для долгой жизни чаще всего оформляют DTV: подают из-за пределов Таиланда (например, во Вьетнаме), нужен остаток на счёте от 500 000 бат и выписка с доходом; посредники не обязательны, если документы в порядке. Учебная виза — запасной вариант, но после неё, по словам участников, бывают сложности с DTV. Правила меняются — сверяйтесь с официальным сайтом тайских e-Visa."
          },
          {
              "q": "Как найти жильё в Бангкоке?",
              "a": "На долгий срок проще всего пройтись по понравившимся кондо: в офисе аренды или продаж покажут свободные квартиры. Из сайтов участники называют DDproperty и Renthub (там апартаменты с помесячной арендой), а также группы в Facebook и местных агентов; чаще всего живут вдоль Сукхумвита — Асок, Пхромпхонг, Тхонглор, Эккамай, Оннут — и в Ари. Стандарт — договор на год, оплата помесячно и депозит обычно в два месяца, с его возвратом бывают проблемы. С декабря по февраль краткосрочная аренда дорожает в 2–3 раза, с марта–апреля цены возвращаются в норму."
          },
          {
              "q": "Где найти хорошего стоматолога в Бангкоке?",
              "a": "По опыту участников: чистка в 101 Smile — около 2 500 бат, перелечивание канала в Phaya Thai Hospital 2 — около 20 000 бат (сентябрь 2025). Для пломб и коронок советовали Smile Center Dental Clinic на Пхромпхонге (Сукхумвит 39), для сложного лечения каналов под микроскопом — Global Dental. Ориентиры из чата: осмотр 300–400 бат, удаление 1 000–2 000 бат, коронку дороже 18 000 бат участники считают переплатой; хороший вариант — районная клиника с высоким рейтингом, куда ходят сами тайцы."
          }
      ],
      "en": [
          {
              "q": "When and where do IT people meet in Bangkok?",
              "a": "Every Saturday at 7 pm at High Streats Rooftop (1122 Sukhumvit Road, Phra Khanong) — the 118th meetup took place in September 2026. If the rooftop is closed because of rain, the meetup moves to the 7th floor of the same building. There is no dedicated organizer: even if nobody posts an announcement in the chat, the meetup still happens."
          },
          {
              "q": "How do I join the Bangkok IT chat?",
              "a": "Tap “Open the Telegram chat” on this page and send a join request; if it isn’t approved, message Egor at @eurvanov. Once you’re in, introduce yourself with the #whois tag: who you are, what you do, what you’re looking for."
          },
          {
              "q": "Where can I play volleyball, pickleball, or football in Bangkok?",
              "a": "The community has its own sports chats, set up by Alyona: volleyball and pickleball — t.me/voleibolbkk, football — t.me/footballinbangkok, and a separate basketball chat (ask for the link in the main chat). According to 2025 announcements, volleyball is the classic game played on sand in an air-conditioned hall with showers near BTS Asok, usually on Saturdays at 3 pm; pickleball is on indoor courts on Wednesdays or Thursdays, 9–11 pm."
          },
          {
              "q": "How can a foreigner open a bank account in Bangkok?",
              "a": "Members report it got noticeably harder in 2025–2026: by summer 2026 Bangkok Bank mostly opens salary card accounts for foreigners, and opening one on a student visa is already tough. If you have an account, your phone number must be registered to the same passport as the bank account — otherwise Kasikorn blocks online banking until you visit a branch with a certificate from your mobile operator. When you change phones, Krungsri approves login on the new device only at a branch, and as of January 2026 members say Kasikorn does not accept Wise transfers if the account was opened on a Russian passport."
          },
          {
              "q": "Which visa should I get to live in Thailand?",
              "a": "Based on members’ experience in 2025–2026: with a Russian passport you get a 60-day stamp on entry, extendable by 30 days at an immigration office, but in summer 2026 a member got only 7 days on a second extension within the year. For longer stays most people get a DTV: you apply from outside Thailand (for example, in Vietnam), and you need at least 500,000 baht in your account plus a bank statement showing income; agents aren’t necessary if your documents are in order. A student visa is a fallback, but members say it can cause trouble with a later DTV. Rules change — check the official Thai e-Visa website."
          },
          {
              "q": "How do I find housing in Bangkok?",
              "a": "For a long-term rental, the easiest way is to walk into condos you like: the rental or sales office will show you available units. Members name DDproperty and Renthub (serviced apartments with monthly rent) as well as Facebook groups and local agents; most live along Sukhumvit — Asok, Phrom Phong, Thonglor, Ekkamai, On Nut — and in Ari. The standard is a one-year lease with monthly payments and a deposit of usually two months, and getting the deposit back can be a problem. From December to February short-term rents rise 2–3 times; from March–April prices return to normal."
          },
          {
              "q": "Where can I find a good dentist in Bangkok?",
              "a": "From members’ experience: a cleaning at 101 Smile costs about 2,500 baht, a root canal retreatment at Phaya Thai Hospital 2 about 20,000 baht (September 2025). For fillings and crowns members recommended Smile Center Dental Clinic in Phrom Phong (Sukhumvit 39), and for complex root canal work under a microscope — Global Dental. Benchmarks from the chat: a check-up is 300–400 baht, an extraction 1,000–2,000 baht, and members consider a crown above 18,000 baht overpriced; a good option is a highly rated neighborhood clinic where Thais themselves go."
          }
      ]
  },
  'da-nang': {
      "ru": [
          {
              "q": "Где и когда встречаются айтишники в Дананге?",
              "a": "Каждую субботу в 19:00 на пляже, в WiWi Beach Coffee & Food. Встречи идут без перерыва с января 2025 года, вход свободный, у места есть парковка для байков. Анонс недели публикуют в чате."
          },
          {
              "q": "Что ещё бывает в Дананге, кроме суббот?",
              "a": "По вторникам Константин Трудик проводит техническую встречу вперемешку со «свободным микрофоном» для айти-нытья. Был и цикл из четырёх лекций о том, как ИИ меняет продуктовую разработку, с приглашёнными спикерами. Анонсы — в чате и в канале @danang_it_channel."
          },
          {
              "q": "Как открыть банковский счёт в Дананге?",
              "a": "По опыту участников (2025): идёте в офис Vietcombank или BIDV, говорите, что нужен счёт для нерезидента, заполняете анкету. С собой — оригинал паспорта и местная симка, оформленная на вас: банк проверяет её по СМС. Вся процедура занимает около часа; учтите обеденный перерыв. Vietcombank открывал счёт на срок действия паспорта, а для зарплаты из-за рубежа можно открыть долларовый счёт и дать работодателю SWIFT-реквизиты."
          },
          {
              "q": "Какую сим-карту взять во Вьетнаме и как её пополнять?",
              "a": "Участники в основном берут Viettel, для работы советуют тариф с 5G. Пополнить баланс можно в Winmart, через кнопку top-up в приложении Lazada (там чуть выгоднее) или в офисе Viettel. По умолчанию баланс нулевой — положите немного денег, иначе не придёт СМС для регистрации в Zalo. Чтобы получать СМС за границей, включите роуминг в приложении Viettel (раздел Roam)."
          },
          {
              "q": "Как снять квартиру в Дананге?",
              "a": "Самый быстрый способ по опыту участников — написать запрос в Facebook-группы вроде Danang Rental: сколько спален, пожелания, ваш Telegram и Zalo. Риелторы откликаются в течение пары часов. Ещё смотрят объявления на chotot.com (лучшие варианты уходят за день-два) и в Telegram-канале @DanangApartments. До оплаты посмотрите квартиру лично и спросите про соседей: караоке и офисы за стеной — частая причина переездов."
          },
          {
              "q": "Где арендовать байк и что с правами?",
              "a": "Прокаты участники находят через Telegram-чаты @Auto_Moto_rent_Vietnam и @danang_forum; для аренды обычно просят права, международное удостоверение и залог. Купить байк можно на chotot.com или в точках продажи — на картах ищите «bán xe máy»; при покупке главное — синяя карточка (blue card). По опыту участников (2025), оформить байк на себя или получить местные права можно при визе от года или TRC; правила сверяйте в официальных источниках."
          },
          {
              "q": "Как найти врача или стоматолога в Дананге?",
              "a": "Из клиник участники чаще называют FMP, а с серьёзными ЛОР-вопросами советуют сразу идти к профильному ENT-врачу. Скорая стоит дорого, поэтому, если можете, добирайтесь до клиники сами. С российскими страховками участники обычно платят на месте и потом подают на возмещение. Проверенных стоматологов советуют в чате — там есть ссылки на конкретные клиники."
          }
      ],
      "en": [
          {
              "q": "When and where do IT people meet in Da Nang?",
              "a": "Every Saturday at 7 pm on the beach, at WiWi Beach Coffee & Food. Meetups have run without a break since January 2025, entry is free, and there's bike parking at the venue. The weekly announcement is posted in the chat."
          },
          {
              "q": "What else happens in Da Nang besides Saturdays?",
              "a": "On Tuesdays Konstantin Trudik runs a technical meetup mixed with an open-mic “IT venting” session. There was also a four-part lecture series with guest speakers on how AI is changing product development. Announcements go to the chat and the @danang_it_channel channel."
          },
          {
              "q": "How do I open a bank account in Da Nang?",
              "a": "From members' experience (2025): go to a Vietcombank or BIDV office, ask for a non-resident account and fill in the form. Bring your original passport and a local SIM registered in your name — the bank verifies it by SMS. It takes about an hour; mind the lunch break. Vietcombank opened accounts for the passport's validity period, and for a salary from abroad you can open a USD account and give your employer the SWIFT details."
          },
          {
              "q": "Which SIM card should I get in Vietnam and how do I top it up?",
              "a": "Members mostly use Viettel and recommend a 5G plan for work. You can top up at Winmart, via the top-up button in the Lazada app (slightly cheaper), or at a Viettel office. The balance starts at zero — add a little money, or the SMS for Zalo registration won't arrive. To get SMS abroad, turn on roaming in the Viettel app (the Roam section)."
          },
          {
              "q": "How do I rent an apartment in Da Nang?",
              "a": "The fastest way, according to members, is to post a request in Facebook groups like Danang Rental: number of bedrooms, requirements, your Telegram and Zalo. Realtors reply within a couple of hours. People also check chotot.com (the best listings go within a day or two) and the @DanangApartments Telegram channel. See the apartment in person before paying and ask about the neighbours: karaoke and offices next door are a common reason people move out."
          },
          {
              "q": "Where can I rent a bike, and what about a licence?",
              "a": "Members find rentals through the Telegram chats @Auto_Moto_rent_Vietnam and @danang_forum; rentals usually ask for a licence, an international driving permit, and a deposit. To buy a bike, use chotot.com or local dealers — search maps for “bán xe máy”; when buying, the key document is the blue card. From members' experience (2025), registering a bike in your name or getting a local licence is possible with a visa of a year or more or a TRC; check the rules with official sources."
          },
          {
              "q": "How do I find a doctor or dentist in Da Nang?",
              "a": "The clinic members name most is FMP, and for serious ear-nose-throat issues they suggest going straight to an ENT specialist. Ambulances are expensive, so if you can, get to the clinic yourself. With Russian insurance, members usually pay on the spot and claim a refund later. Trusted dentists are recommended in the chat, with links to specific clinics."
          }
      ]
  },
  'phuket': {
      "ru": [
          {
              "q": "Когда и где встречаются айтишники на Пхукете?",
              "a": "По субботам в 19:00 в Sala Mexicali Phuket Town — там встречи идут с 27 июня 2026 года, в августе несколько суббот прошли в Greek Kitchen у бухты Чалонг. Каждую неделю в чате появляется опрос «Придёшь?»; если желающих мало, неделю иногда пропускают, поэтому загляните в опрос перед выходом."
          },
          {
              "q": "Как попасть в IT-чат Пхукета?",
              "a": "Нажмите «Открыть чат в Telegram» на этой странице и отправьте заявку. После вступления представьтесь с тегом #whois, а чтобы найти соседей, используйте теги районов: #Rawai, #NaiHarn, #Yanui, #Chalong, #Kata, #Karon, #Patong, #Kalim."
          },
          {
              "q": "В каком районе Пхукета живут айтишники?",
              "a": "По опросу в чате (август 2026): Раваи — 12 голосов, Чалонг — 10, Бангтао — 8, Катху — 7, Олд Таун — 6. «Золотым треугольником» участники называют Кату, Раваи и Таун. Про Бангтао предупреждают, что оттуда до юга острова можно простоять в пробках до двух часов."
          },
          {
              "q": "Что делать, если тайский банк заблокировал счёт?",
              "a": "По опыту участников (январь 2026): если доступный баланс внезапно обнулился, позвоните в банк — либо сумму разблокируют в течение 48 часов, либо на счёт наложен полицейский блок, и тогда банк пришлёт данные дела и контакты участка и офицера, который его поставил. Главная причина таких блокировок, по словам участников, — P2P-обмены криптовалюты, поэтому совет чата — не проводить через них деньги. С открытием счёта правила меняются часто: если в одном отделении отказали, пробуйте другие."
          },
          {
              "q": "Как цифровому кочевнику платить налоги в Таиланде?",
              "a": "По опыту участников (август 2026): декларацию подают раз в год, с января по март за прошлый год, дальше штраф. Приходите в налоговую по месту регистрации с документами и выпиской из банка: там посчитают регулярные поступления и присвоят налоговый номер (TIN); отделение в Кату участники хвалят. Ставки — от 0 до 35%, первые 150 000 бат дохода в год не облагаются, прикинуть сумму помогает калькулятор mythaitaxes.com; TIN пригодится и для Upwork — он требует его при привязке иностранной карты. Правила меняются — сверяйтесь с налоговой."
          },
          {
              "q": "Что нужно знать о въезде и визах на Пхукете?",
              "a": "По опыту участников (август 2026): с паспортом РФ на въезде ставят штамп на 60 дней, его можно продлить ещё на 30 в иммиграционном офисе. Без обратного билета обычно пускают, но при проблемной визовой истории могут развернуть — в чате рассказывали, как человеку с когда-то оплаченным оверстеем отказали во въезде. Для долгой жизни участники живут на DTV, учебных и Non-O визах; актуальные требования проверяйте на официальном сайте тайских e-Visa."
          },
          {
              "q": "Где на Пхукете поиграть в волейбол или падел?",
              "a": "Волейбол: по анонсу в чате (апрель 2026) — бесплатно на песке в парке в Олд Тауне, уровень любительский, новичков берут, игра была в субботу в 17:00. Падел на острове играют многие участники — партнёров ищут прямо в чате. Теннис, муай-тай и настольный теннис тоже часто встречаются в #whois-представлениях, так что компанию найти несложно."
          }
      ],
      "en": [
          {
              "q": "When and where do IT people meet in Phuket?",
              "a": "On Saturdays at 7 pm at Sala Mexicali Phuket Town — meetups have been held there since June 27, 2026; in August a few Saturdays took place at Greek Kitchen by Chalong Bay. Every week a “Coming?” poll appears in the chat; if few people sign up, a week is sometimes skipped, so check the poll before heading out."
          },
          {
              "q": "How do I join the Phuket IT chat?",
              "a": "Tap “Open the Telegram chat” on this page and send a join request. Once you’re in, introduce yourself with the #whois tag, and use district tags to find neighbors: #Rawai, #NaiHarn, #Yanui, #Chalong, #Kata, #Karon, #Patong, #Kalim."
          },
          {
              "q": "Which area of Phuket do IT people live in?",
              "a": "According to a chat poll (August 2026): Rawai — 12 votes, Chalong — 10, Bang Tao — 8, Kathu — 7, Old Town — 6. Members call Kata, Rawai, and Phuket Town the “golden triangle”. They warn that from Bang Tao you can spend up to two hours in traffic getting to the south of the island."
          },
          {
              "q": "What should I do if a Thai bank has blocked my account?",
              "a": "From members’ experience (January 2026): if your available balance suddenly drops to zero, call the bank — either the amount is released within 48 hours, or a police block has been placed, and then the bank will send the case details and contacts of the police station and the officer who placed it. Members say the main cause of such blocks is P2P crypto exchanges, so the chat’s advice is not to route money through them. Account-opening rules change often: if one branch refuses, try others."
          },
          {
              "q": "How does a digital nomad pay taxes in Thailand?",
              "a": "From members’ experience (August 2026): you file a return once a year, between January and March for the previous year; after that there’s a fine. Go to the tax office for your registered address with your documents and a bank statement: they calculate your regular income and assign a tax ID (TIN); members praise the Kathu office. Rates range from 0 to 35%, the first 150,000 baht of annual income is tax-free, and the mythaitaxes.com calculator helps estimate the amount; a TIN is also useful for Upwork, which asks for it when you link a foreign card. Rules change — check with the tax office."
          },
          {
              "q": "What should I know about entry and visas in Phuket?",
              "a": "From members’ experience (August 2026): with a Russian passport you get a 60-day stamp on entry, extendable by another 30 days at an immigration office. You’re usually let in without a return ticket, but with a problematic visa history you can be turned back — members described a person with a previously paid overstay being refused entry. For long stays members live on DTV, student, and Non-O visas; check current requirements on the official Thai e-Visa website."
          },
          {
              "q": "Where can I play volleyball or padel in Phuket?",
              "a": "Volleyball: according to a chat announcement (April 2026), it’s free on sand in a park in Old Town, amateur level, newcomers welcome, with a game on Saturday at 5 pm. Many members play padel on the island — partners are found right in the chat. Tennis, Muay Thai, and table tennis also come up often in #whois intros, so finding company is easy."
          }
      ]
  },
  'bali': {
      "ru": [
          {
              "q": "Где и когда встречаются айтишники на Бали?",
              "a": "По субботам в 19:00 в Ju Bali в Чангу — это место чат выбирал голосованием. Иногда неделю пропускают, если желающих мало, поэтому перед выходом посмотрите опрос «Придёшь?» в чате."
          },
          {
              "q": "Что это за встречи и кто их проводит?",
              "a": "Чтобы просто пообщаться: без регламента и заданной темы. Первые встречи на закате в Бераве собирала Аксинья, одну из встреч в Umalas Lounge устраивала Настя с докладом Сергея об эффективных коммуникациях, сейчас субботы продолжает Егор."
          },
          {
              "q": "В каком районе Бали живут айтишники?",
              "a": "По опросу в чате (декабрь 2025) больше всего участников живёт в Чангу, Бераве и Переренане — 22 голоса; дальше Убуд — 13, Букит — 12, Семиньяк и Кута — 10. Поэтому основная встреча — в Чангу."
          },
          {
              "q": "Какую сим-карту взять на Бали?",
              "a": "В чате советуют Telkomsel: сим-карту покупают один раз, а пакет гигабайт докупают раз в месяц через приложение — по опыту участников (июль 2026), около 100 тысяч рупий. Обязательно зарегистрируйте IMEI телефона по прилёту, иначе местная симка в нём работать не будет; если не успели — это можно сделать при следующем въезде. Номер сохраняется, пока вы его регулярно пополняете."
          },
          {
              "q": "Какой банк открыть на Бали с KITAS?",
              "a": "По опыту участников (2026): лучшим чаще называют OCBC, у BCA хорошее приложение MyBCA, у BNI есть виртуальные карты, но пластиковые карты Maestro плохо проходят в онлайн-оплате. Бывает, что карта BCA или BNI работает в магазинах, но отклоняется в приложениях — такие случаи решают в отделении. С KITAS счета в индонезийских банках, по словам участников, открывают без вопросов."
          },
          {
              "q": "Как оформить KITAS удалённого сотрудника (E33G)?",
              "a": "По опыту участников (2025–2026), его оформляют и сами, и через агентства. Путь изнутри страны — с eVOA через промежуточную (bridging) визу на E33G; кто-то подавался из-за границы и обошёлся без неё. Фото для заявки подходит и на белом фоне. Работа на иностранного заказчика с такой визой, по словам участников, легальна; требования проверяйте на официальном сайте иммиграции."
          },
          {
              "q": "Где на Бали поработать с ноутбуком?",
              "a": "В Джимбаране участники работают в Cube, в Убуде — в Roosters, а в Nebula Coworking Space проходят открытые митапы. Ещё в чате регулярно зовут «поковоркать» вместе в кафе — кидайте клич, компания находится."
          }
      ],
      "en": [
          {
              "q": "When and where do IT people meet in Bali?",
              "a": "Saturdays at 7 pm at Ju Bali in Changu — the chat picked the place by vote. Sometimes a week is skipped if too few people are up for it, so check the “Coming?” poll in the chat before heading out."
          },
          {
              "q": "What are these meetups and who runs them?",
              "a": "Just a chance to talk: no agenda and no set topic. Aksinia gathered the first sunset meetups in Berawa, Nastya hosted one at Umalas Lounge with Sergey's talk on effective communication, and now Egor keeps the Saturdays going."
          },
          {
              "q": "Which area of Bali do IT people live in?",
              "a": "In a chat poll (December 2025), most members live in Changu, Berawa and Pererenan — 22 votes; then Ubud — 13, Bukit — 12, Seminyak and Kuta — 10. That's why the main meetup is in Changu."
          },
          {
              "q": "Which SIM card should I get in Bali?",
              "a": "The chat recommends Telkomsel: you buy the SIM once and top up a data package monthly through the app — about 100k rupiah, from members' experience (July 2026). Register your phone's IMEI on arrival, otherwise a local SIM won't work in it; if you missed it, you can do it on your next entry. The number stays active as long as you keep topping it up."
          },
          {
              "q": "Which bank should I open with a KITAS in Bali?",
              "a": "From members' experience (2026): OCBC is most often called the best, BCA has a good app (MyBCA), BNI has virtual cards but its Maestro plastic cards often fail online. Sometimes a BCA or BNI card works in shops but gets declined in apps — members sort that out at the branch. With a KITAS, members say Indonesian banks open accounts without questions."
          },
          {
              "q": "How do I get a remote worker KITAS (E33G)?",
              "a": "From members' experience (2025–2026), people get it both on their own and through agencies. From inside the country the route is eVOA → bridging visa → E33G; some applied from abroad and didn't need the bridge. A photo on a white background is accepted. Members say working for a foreign client on this visa is legal; check the requirements on the official immigration website."
          },
          {
              "q": "Where can I work with a laptop in Bali?",
              "a": "In Jimbaran members work at Cube, in Ubud at Roosters, and Nebula Coworking Space hosts open meetups. The chat also regularly calls for coworking sessions in cafés — post a call and you'll find company."
          }
      ]
  },
  'batumi': {
      "ru": [
          {
              "q": "Где и когда проходят встречи Jaiora в Батуми?",
              "a": "По субботам в 19:00 в SushiGO. С сентября 2026 года встречи ведут Наталья и Ксения Васильева, анонс каждой недели с тегом #Встреча появляется в закрепе чата. Участники из Кобулети договариваются в чате ехать вместе на такси."
          },
          {
              "q": "Как новичку влиться в IT-сообщество Батуми?",
              "a": "Напишите о себе в чате с тегом #whois: кто вы, чем занимаетесь, что ищете. Дальше проще всего прийти на субботнюю встречу в SushiGO — можно одному, с другом или с задачей."
          },
          {
              "q": "Как открыть счёт в банке в Батуми?",
              "a": "Участники пользуются Bank of Georgia, TBC и Credo. По опыту на осень 2025 года BoG открывал счета охотнее, а TBC для счёта ИП попросил выписку оборотов ИП из другого банка за полгода; уже открытый счёт в одном банке помогает открыть второй. TBC хвалят за приём международных переводов, в BoG есть русскоговорящий менеджер в WhatsApp, через которого можно заранее заказать документы. Credo открывает счета без лишних бумаг, но иностранные переводы на него иногда отклоняют, поэтому его держат как запасной."
          },
          {
              "q": "Как оформить ИП в Грузии и что такое «ИП 1%»?",
              "a": "По опыту участников на декабрь 2025 года: ИП регистрируют в Доме юстиции по паспорту, номеру телефона и адресу регистрации — собственник жилья должен дать согласие. Статус малого бизнеса действует со следующего месяца: в месяц открытия налог 20%, дальше 1% с оборота, а декларацию подают каждый месяц до 15-го числа, даже нулевую. С марта 2026 года иностранцам с ИП нужно ещё разрешение на трудовую деятельность — документы для него переводят на грузинский и заверяют у нотариуса. Точные требования сверяйте на rs.ge и в Доме юстиции."
          },
          {
              "q": "Как снять квартиру в Батуми?",
              "a": "Объявления смотрят на ss.ge, myhome.ge и korter.ge; квартиры и проверенных риелторов участники регулярно предлагают прямо в чате. Для тихой жизни в чате советуют районы за улицей Пушкина, подальше от туристической набережной. Квартиру стоит посмотреть лично до оплаты и заключить договор аренды."
          },
          {
              "q": "Какую сим-карту и интернет взять в Батуми?",
              "a": "Основные операторы — Magti и Silknet. У Magti 5G по всему Батуми (если телефон не переключается на 5G, симку меняют в офисе), но безлимит для дома, по опыту на февраль 2026 года, режет скорость после 30–50 ГБ в месяц. Silknet хвалят за стабильный домашний оптоволоконный интернет, а eSIM Silknet можно купить в приложении MySilkNet и переслать QR-код прилетающему гостю."
          },
          {
              "q": "Как безопасно поменять деньги в Батуми?",
              "a": "Надёжнее всего банки и официальные обменники — несколько стоят рядом у Плазы, а курсы удобно сравнить на kursi.ge. У Credo, по отзывам участников, одна из самых выгодных конвертаций. P2P на криптобиржах в чате считают рискованным: там много дропперов, поэтому для рублей и USDT советуют офис обменника; доллары старого образца берут не везде — уточняйте на месте."
          }
      ],
      "en": [
          {
              "q": "When and where are the Jaiora meetups in Batumi?",
              "a": "Saturdays at 7 pm at SushiGO. Since September 2026 the meetups are run by Natalie and Ksenia Vasilyeva; each week's announcement with the #Встреча tag is pinned in the chat. Members from Kobuleti arrange shared taxis in the chat."
          },
          {
              "q": "How can a newcomer join the IT community in Batumi?",
              "a": "Introduce yourself in the chat with the #whois tag: who you are, what you do, what you're looking for. Then the easiest step is the Saturday meetup at SushiGO — come alone, with a friend, or with a task."
          },
          {
              "q": "How do I open a bank account in Batumi?",
              "a": "Members use Bank of Georgia, TBC and Credo. As of autumn 2025, BoG was more willing to open accounts, while TBC asked for six months of business-account turnover from another bank before opening a sole-proprietor account; having an account at one bank helps open a second. TBC is praised for receiving international transfers, and BoG offers a Russian-speaking manager on WhatsApp who can prepare documents in advance. Credo opens accounts with little paperwork, but foreign transfers to it are sometimes rejected, so members keep it as a backup."
          },
          {
              "q": "How do I register a sole proprietorship in Georgia, and what is the “1% IE”?",
              "a": "Based on members' experience as of December 2025: you register at the House of Justice with your passport, phone number and a registration address — the property owner has to consent. Small-business status applies from the following month: 20% tax in the month you register, then 1% of turnover, with a monthly declaration due by the 15th, even if it's zero. Since March 2026 foreigners with a sole proprietorship also need a work activity permit, with documents translated into Georgian and notarized. Check the exact requirements on rs.ge and at the House of Justice."
          },
          {
              "q": "How do I rent an apartment in Batumi?",
              "a": "Listings are on ss.ge, myhome.ge and korter.ge; members also regularly post apartments and trusted realtors right in the chat. For a quieter life, members suggest areas beyond Pushkin Street, away from the touristy seafront. View the apartment in person before paying and sign a rental contract."
          },
          {
              "q": "Which SIM card and internet should I get in Batumi?",
              "a": "The main operators are Magti and Silknet. Magti has 5G across Batumi (if your phone won't switch to 5G, swap the SIM at an office), but as of February 2026 its home unlimited plan slowed down after 30–50 GB a month. Silknet is praised for stable home fiber, and a Silknet eSIM can be bought in the MySilkNet app and sent as a QR code to an arriving guest."
          },
          {
              "q": "How do I exchange money safely in Batumi?",
              "a": "Banks and official exchange offices are the safest — several sit next to each other near Plaza, and kursi.ge is handy for comparing rates. Members say Credo offers one of the best conversion rates. The chat considers P2P on crypto exchanges risky because of money-mule accounts, so for rubles and USDT they recommend an exchange office; old-style dollar bills aren't accepted everywhere, so check on the spot."
          }
      ]
  },
  'moscow': {
      "ru": [
          {
              "q": "Где и когда проходят встречи Jaiora в Москве?",
              "a": "С июля 2026 года — по субботам в 19:00 в «Howard Loves Craft» на Болотной набережной: первая встреча там прошла 25 июля. Ритм пока нерегулярный: в августе одну субботу пропустили и пробовали собраться в пятницу. Точка на карте и дата ближайшей встречи — в закрепе чата."
          },
          {
              "q": "Как проходят встречи и нужно ли готовиться?",
              "a": "Готовиться не нужно. Формат с первой встречи такой: можно прийти и говорить, можно просто слушать, можно про IT, можно про что угодно — бизнес, переезды, спорт. Программы и докладов нет."
          },
          {
              "q": "Где в Москве поиграть в бадминтон или падел с компанией?",
              "a": "Участники в августе 2026 года собрали свой список: бадминтон — корты в Алтуфьево и клубы в Лужниках, на Чистых прудах и Юго-Западной; бесплатные тренировки «Мой спорт район» от города — 4 раза в неделю (moysportrayon.sport.mos.ru). Для падела в городе есть бесплатные площадки, корты проходили и у Новокузнецкой. Напарника обычно находят прямо в чате."
          },
          {
              "q": "Где в Москве поиграть в настольные игры?",
              "a": "Надежда Яковлева собирает компанию на настолки: первая игра прошла в субботу, 26 сентября 2026 года, в 18:00 в пространстве «Гараж» в парке Горького — играли в UNO, на выбор были шахматы, Monopoly и го. В чате также советуют второй этаж «Депо Три вокзала» с большими столами, где собираются любители настолок и мафии, а в мафию участники играют в «Чайхане №1» на Пушкинской."
          },
          {
              "q": "Можно ли найти работу или сотрудника через чат?",
              "a": "Да. Летом 2026 года в чате искали Senior Python Developer (AI) в продуктовую команду, а руководитель разработки из YADRO набирал людей в бэкенд, фронтенд и ML. Кто ищет работу, пишет об этом в представлении с тегом #whois — так делали фронтенд-разработчики, продакты и специалисты по финансам."
          },
          {
              "q": "Как не попасть на мошенников?",
              "a": "В чате есть простое правило: если вы что-то предлагаете или просите, сначала представьтесь с тегом #whois — без этого сообщение выглядит как скам. Предупреждения о мошенниках публиковали в декабре 2025-го и в июле и августе 2026-го, в том числе об аккаунте, который предлагал поменять крипту. Прежде чем переводить деньги, уточните в общем чате, кто этот человек."
          }
      ],
      "en": [
          {
              "q": "When and where are the Jaiora meetups in Moscow?",
              "a": "Since July 2026 — Saturdays at 7 pm at Howard Loves Craft on Bolotnaya Embankment: the first meetup there was on July 25. The rhythm is still irregular: in August one Saturday was skipped and a Friday was tried instead. The map pin and the next meetup date are pinned in the chat."
          },
          {
              "q": "What are the meetups like, and do I need to prepare?",
              "a": "No preparation needed. The format has been the same since the first meetup: you can talk, or just listen, about IT or anything else — business, relocation, sports. There’s no agenda and no talks."
          },
          {
              "q": "Where can I play badminton or padel with others in Moscow?",
              "a": "In August 2026 members put together their own list: badminton — courts in Altufyevo and clubs in Luzhniki, Chistye Prudy, and Yugo-Zapadnaya; free city-run “Moy sport rayon” sessions 4 times a week (moysportrayon.sport.mos.ru). For padel the city has free courts, and members spotted courts near Novokuznetskaya. Partners are usually found right in the chat."
          },
          {
              "q": "Where can I play board games in Moscow?",
              "a": "Nadezhda Yakovleva gathers a board game crowd: the first game night was on Saturday, September 26, 2026, at 6 pm at the Garage space in Gorky Park — they played UNO, with chess, Monopoly, and Go as options. Members also recommend the second floor of Depo Tri Vokzala, with big tables where board game and mafia fans meet, and they play mafia at Chaikhona No. 1 on Pushkinskaya."
          },
          {
              "q": "Can I find a job or hire someone through the chat?",
              "a": "Yes. In summer 2026 the chat had an opening for a Senior Python Developer (AI) in a product team, and a head of development at YADRO was hiring for backend, frontend, and ML. Job seekers say so in their #whois intro — frontend developers, product people, and finance specialists have done exactly that."
          },
          {
              "q": "How do I avoid scammers?",
              "a": "The chat has a simple rule: if you offer or ask for something, introduce yourself with #whois first — otherwise the message looks like a scam. Scam warnings were posted in December 2025 and in July and August 2026, including one about an account offering to swap crypto. Before sending money, ask in the public chat who the person is."
          }
      ]
  },
  'saint-petersburg': {
      "ru": [
          {
              "q": "Где в Питере найти бесплатные IT-митапы?",
              "a": "Саша с января 2026 года собирает в чате анонсы под тегом #анонс — к сентябрю их вышло 33. Регулярное: встречи Coffee&Code по субботам в 11:00 и 14:00 по трекам DevOps, QA, Android и iOS в кофейнях, без регистрации; «IT-нытьё» по вторникам в 20:00 в Failover Bar на 2-й Советской, 18. Там же проходят QA-митапы, а PiterJS собирается в офисе ЮMoney."
          },
          {
              "q": "Когда и где проходят встречи Jaiora в Питере?",
              "a": "По субботам с июня 2026 года. С четвёртой встречи, 27 июня, собирались в Kazan-Mangal; в сентябре пробовали бар «Сарапул» на Садовой, 35, а 26 сентября встретились в Feromon на Ефимова, в 5 минутах от метро «Сенная площадь». День и место выбирают опросом, итог публикуют в закрепе."
          },
          {
              "q": "Как проходят встречи и нужно ли готовиться?",
              "a": "Готовиться не нужно: формат открытый, тему не задают. Говорят о бизнесе, разработке, маркетинге, переездах, проектах, экономике и спорте — о том, что интересно собравшимся. Можно прийти одному, с друзьями или опоздать."
          },
          {
              "q": "Где в Питере искать работу в IT?",
              "a": "В чате за 2026 год вышло около 20 вакансий и резюме, чаще всего в бэкенд и тестирование — публиковать их можно без согласования с админами. Как альтернативу hh участники в январе 2026 года называли LinkedIn (в России работает хуже, зато можно писать напрямую сотрудникам компании), «Хабр Карьеру» и GetMatch."
          },
          {
              "q": "Как познакомиться с участниками?",
              "a": "Напишите о себе с тегом #whois: чем занимаетесь, откуда, что ищете и чем можете помочь. К сентябрю 2026 года так представились больше 200 человек — по этим постам участники находят друг друга по профессии и интересам."
          },
          {
              "q": "Кто организует встречи в Питере?",
              "a": "Традицию суббот в июне 2026 года запустил Егор, а с конца сентября встречи ведёт Саша: он выбирает день опросом и публикует место в закрепе."
          }
      ],
      "en": [
          {
              "q": "Where can I find free IT meetups in Saint Petersburg?",
              "a": "Since January 2026 Sasha has been posting event roundups in the chat under #анонс — 33 of them by September. Regulars: Coffee&Code on Saturdays at 11 am and 2 pm with DevOps, QA, Android, and iOS tracks in cafés, no registration; “IT Whining” on Tuesdays at 8 pm at Failover Bar, 2nd Sovetskaya St. 18. QA meetups happen there too, and PiterJS meets at the YuMoney office."
          },
          {
              "q": "When and where are the Jaiora meetups in Saint Petersburg?",
              "a": "Saturdays since June 2026. From the fourth meetup on June 27 the group met at Kazan-Mangal; in September they tried Sarapul bar at Sadovaya St. 35, and on September 26 met at Feromon on Efimova St., 5 minutes from Sennaya Ploshchad metro. The day and place are chosen by poll and pinned in the chat."
          },
          {
              "q": "What are the meetups like, and do I need to prepare?",
              "a": "No preparation needed: the format is open, with no set topic. People talk about business, development, marketing, relocation, projects, the economy, and sports — whatever the group is into. You can come alone, with friends, or late."
          },
          {
              "q": "Where can I look for IT jobs in Saint Petersburg?",
              "a": "About 20 openings and résumés were posted in the chat in 2026, most often for backend and testing — you can post without asking the admins. In January 2026 members named LinkedIn (weaker in Russia, but you can message company employees directly), Habr Career, and GetMatch as alternatives to hh."
          },
          {
              "q": "How do I get to know the members?",
              "a": "Introduce yourself with #whois: what you do, where you’re from, what you’re looking for, and how you can help. More than 200 people had done so by September 2026 — members use these posts to find each other by profession and interests."
          },
          {
              "q": "Who organizes the meetups in Saint Petersburg?",
              "a": "Egor started the Saturday tradition in June 2026, and since late September Sasha runs the meetups: he picks the day by poll and pins the venue in the chat."
          }
      ]
  },
  'almaty': {
      "ru": [
          {
              "q": "Проходят ли сейчас встречи Jaiora в Алматы?",
              "a": "Регулярные субботы сейчас на паузе. Начинали в октябре 2024 года с «квартирника-нетворкинга» в IT-коливинге по субботам в 19:00, потом собирались в баре и на бильярде. Сейчас разовые встречи договариваются прямо в чате."
          },
          {
              "q": "Где найти IT-мероприятия в Алматы?",
              "a": "В закрепе чата — канал @kz_it_events, а в чате советуют афишу sxodim.com (раздел IT) и календарь profit.kz. Регулярные события: митапы Kolesa Group (Backend meetup, Junday, TeamLead Day — в 2025 году больше 400 участников в Forum Almaty), Build with AI от GDG, встречи Java Almaty Community и beetech conf от Beeline."
          },
          {
              "q": "Можно ли найти работу или сотрудника через чат?",
              "a": "Да, это одна из главных тем: в чате много сотрудников Kaspi, Halyk, Jusan и Kolesa, а вакансии публикуют с тегами #vacancy и #almaty. HR и рекрутеры из чата предлагают помощь с резюме и карьерные консультации."
          },
          {
              "q": "Какой банк открыть и что нужно для этого в Алматы?",
              "a": "Сначала понадобится ИИН — его получают в ЦОНе, там же сдают отпечатки и оформляют ЭЦП. Самый популярный банк у участников — Kaspi: платежи, переводы и покупки в одном приложении, а при покупке техники через Kaspi, по опыту на октябрь 2025 года, бывает до 10% бонусами. Среди альтернатив называют Halyk и Freedom."
          },
          {
              "q": "Как платить налоги с иностранного дохода в Казахстане?",
              "a": "По опыту участников на 2025–2026 годы: с ВНЖ открывают ИП на упрощённом режиме и принимают на него платежи из-за рубежа; с одним РВП ИП открыть нельзя, поэтому работают по договору как физлицо и декларируют доход сами. ИП участник в феврале 2026 года открыл самостоятельно, без посредников, а компания-участник Astana Hub зарегистрировалась онлайн примерно за неделю и принимает платежи через Stripe и Google Play. Требования сверяйте на egov.kz."
          },
          {
              "q": "В каком районе Алматы снять квартиру?",
              "a": "Участники хвалят Бостандыкский район: рядом Ботанический сад, а от Тимирязева до Есентай Молла 10–15 минут пешком вдоль канала. Ещё советуют район Южного у парка на Жароково. По опыту на июнь 2025 года риелторы берут около половины месячной аренды, но умеют заметно сбить цену у хозяина."
          }
      ],
      "en": [
          {
              "q": "Are Jaiora meetups happening in Almaty now?",
              "a": "Regular Saturdays are on pause. They started in October 2024 with a networking house party at an IT coliving on Saturdays at 7 pm, then moved to a bar and billiards. One-off meetups are now arranged right in the chat."
          },
          {
              "q": "Where can I find IT events in Almaty?",
              "a": "The @kz_it_events channel is pinned in the chat, and members recommend the sxodim.com listings (IT section) and the profit.kz calendar. Regular events include Kolesa Group meetups (Backend meetup, Junday, TeamLead Day — over 400 attendees at Forum Almaty in 2025), Build with AI by GDG, Java Almaty Community meetups, and Beeline's beetech conf."
          },
          {
              "q": "Can I find a job or hire someone through the chat?",
              "a": "Yes, it's one of the main topics: many people from Kaspi, Halyk, Jusan and Kolesa are in the chat, and vacancies are posted with the #vacancy and #almaty tags. HR people and recruiters in the chat offer help with CVs and career advice."
          },
          {
              "q": "Which bank should I open in Almaty, and what do I need?",
              "a": "First you need an IIN (individual identification number), issued at a public service center (TsON), where you also give fingerprints and get a digital signature (EDS). Members' most popular bank is Kaspi: payments, transfers and shopping in one app, and as of October 2025 buying electronics through Kaspi could earn up to 10% in bonuses. Halyk and Freedom are named as alternatives."
          },
          {
              "q": "How do I pay tax on foreign income in Kazakhstan?",
              "a": "Based on members' experience in 2025–2026: with a residence permit people register a sole proprietorship on the simplified regime and receive foreign payments to it; with only a temporary residence permit (RVP) you can't register one, so people work under a contract as individuals and declare income themselves. One member registered a sole proprietorship on their own in February 2026, and a member's Astana Hub company registered online in about a week and accepts payments via Stripe and Google Play. Check the requirements on egov.kz."
          },
          {
              "q": "Which area of Almaty is good for renting?",
              "a": "Members praise Bostandyk district: the Botanical Garden is nearby, and from Timiryazev it's a 10–15 minute walk along the canal to Esentai Mall. The Yuzhny area by the Zharokov park is also recommended. As of June 2025, realtors charged about half a month's rent, but they're good at negotiating the price down with owners."
          }
      ]
  },
  'antalya': {
      "ru": [
          {
              "q": "Проходят ли встречи Jaiora в Анталье?",
              "a": "Регулярные субботы шли с марта по июль 2025 года — в Leman Cafe, потом в ирландском пабе. Сейчас собираются от случая к случаю: вечерний кофе в Лимане и Коньяалты, пиво и караоке в Калеичи по пятницам, шашлыки в Сарысу по выходным. Позвать всех можно прямо в чате, а представиться — с тегом #whois."
          },
          {
              "q": "Как снять квартиру в Анталье?",
              "a": "Надолго ищут на sahibinden.com, на короткий срок — на Airbnb. В чате живут в Коньяалты, Лимане, Сарысу, Ларе, а также в Кепезе и Варсаке — там тише, но до центра мешают пробки на проспекте 100. Yıl. По опыту участника на июль 2025 года дуплекс 3+1 с газом в Сарысу стоил 29 000 лир в месяц; к агентам относятся по-разному, так что объявление стоит проверить самому."
          },
          {
              "q": "Как открыть счёт в банке в Турции?",
              "a": "Сначала получите налоговый номер (vergi numarası) — на сайте налоговой это занимает около 10 минут. Для счёта обычно просят ВНЖ, адрес и налоговый номер; Ziraat, по опыту участников, выдаёт мультивалютный IBAN в долларах и евро. Условия сильно зависят от отделения: в апреле 2026 года в одном отделении Vakıf за открытие просили 15 000 лир. В чате был случай блокировки счёта Ziraat из-за P2P-перевода на 150 долларов, поэтому крупные суммы меняют в обменниках с хорошей репутацией."
          },
          {
              "q": "Как получить ВНЖ (икамет) в Анталье?",
              "a": "По опыту участников на декабрь 2025 года: туристический ВНЖ подают через миграционную службу (Göç İdaresi), при продлении, по словам участника, на счёте показывают сумму минимальной зарплаты на себя и по половине на каждого члена семьи. Виза цифрового кочевника требует дохода от 3000 долларов в месяц и одобряется, по словам участницы, с очень высоким процентом, но при продлении доход подтверждают снова; для студенческого ВНЖ нужно показать 5000 долларов на IBAN при подаче. Правила часто меняются — сверяйтесь на e-ikamet.goc.gov.tr."
          },
          {
              "q": "Как зарегистрировать иностранный телефон в Турции?",
              "a": "По опыту участников на июль 2026 года: сначала оформите заявку на регистрацию телефона в приложении оператора, затем подтвердите её в приложении GöçBil и в e-Devlet, в разделе «e-Kayıt Başvurusu Onay İşlemleri». С Turkcell всё прошло гладко, а у Turk Telekom заявка не всегда появлялась в GöçBil — тогда помогает визит в офис оператора."
          },
          {
              "q": "Где в Анталье найти компанию для походов и досуга?",
              "a": "В походы участники ходят с группой @hiking_adventures, а по выходным собираются на шашлыки в Сарысу — и с детьми, и без. В чате также зовут на мафию, квизы и ЧГК, стендап и караоке в Калеичи."
          }
      ],
      "en": [
          {
              "q": "Are Jaiora meetups happening in Antalya?",
              "a": "Regular Saturdays ran from March to July 2025 — at Leman Cafe, then at an Irish pub. Now people get together ad hoc: evening coffee in Liman and Konyaaltı, beer and karaoke in Kaleiçi on Fridays, barbecues in Sarısu at weekends. You can call everyone right in the chat and introduce yourself with the #whois tag."
          },
          {
              "q": "How do I rent an apartment in Antalya?",
              "a": "Long-term rentals are on sahibinden.com, short stays on Airbnb. Chat members live in Konyaaltı, Liman, Sarısu, Lara, and also Kepez and Varsak — quieter, but traffic on 100. Yıl avenue slows trips to the center. As of July 2025, one member paid 29,000 lira a month for a 3+1 duplex with gas in Sarısu; opinions on agents vary, so it's worth checking listings yourself."
          },
          {
              "q": "How do I open a bank account in Turkey?",
              "a": "First get a tax number (vergi numarası) — it takes about 10 minutes on the tax office website. Banks usually ask for a residence permit, an address and the tax number; members report that Ziraat issues a multi-currency IBAN in dollars and euros. Terms depend heavily on the branch: in April 2026 one Vakıf branch asked 15,000 lira to open an account. A member's Ziraat account was blocked over a $150 P2P transfer, so larger sums are exchanged at reputable exchange offices."
          },
          {
              "q": "How do I get a residence permit (ikamet) in Antalya?",
              "a": "Based on members' experience as of December 2025: the tourist residence permit is filed with the migration service (Göç İdaresi), and for an extension, a member says, you show the minimum wage in your account for yourself plus half for each family member. The digital nomad visa requires an income of $3,000 a month and, according to a member, has a very high approval rate, but income is checked again on extension; for a student permit you show $5,000 on an IBAN when applying. Rules change often — check e-ikamet.goc.gov.tr."
          },
          {
              "q": "How do I register a foreign phone in Turkey?",
              "a": "Based on members' experience as of July 2026: first file a phone registration request in your operator's app, then approve it in the GöçBil app and in e-Devlet under “e-Kayıt Başvurusu Onay İşlemleri”. It went smoothly with Turkcell, while with Turk Telekom the request didn't always show up in GöçBil — a visit to the operator's office helps then."
          },
          {
              "q": "Where can I find company for hikes and leisure in Antalya?",
              "a": "Members hike with the @hiking_adventures group, and at weekends they gather for barbecues in Sarısu — with kids or without. The chat also invites people to mafia, quizzes and trivia nights, stand-up and karaoke in Kaleiçi."
          }
      ]
  },
  'belgrade': {
      "ru": [
          {
              "q": "Когда первая встреча Jaiora в Белграде?",
              "a": "В субботу, 3 октября 2026 года, в 19:00. Антон вызвался найти место, участники собрали шорт-лист из шести заведений, итог выберут опросом в чате. Дальше план — встречаться каждую субботу."
          },
          {
              "q": "Где в Белграде посидеть без табачного дыма?",
              "a": "Из подборки участников в сентябре 2026 года внутри не курят в «Тмин» — между Адой и Юлино брдо, там есть место на большую компанию по брони, — и в Pizza + Bar. С летниками: «Печать» в парке с сербской кухней, пиццерия Amici в том же здании, Jazz у площади Республики, «Снежана» на Князя Михаила и Bistro Vračar. Зимой в Белграде сидят и на летниках с инфракрасными обогревателями."
          },
          {
              "q": "Можно ли писать в чат на английском?",
              "a": "Да. В сентябре 2026 года участники представлялись по-английски, в том числе сербские разработчики, которые только учат русский, — им отвечают на английском."
          },
          {
              "q": "Как проходят встречи Jaiora и какие в чате правила?",
              "a": "Во всех городах обычно собирается от 3 до 20 человек. Специальных правил на встрече нет, говорить можно обо всём. В чате главное правило одно — без токсичности и с уважением к границам собеседника."
          }
      ],
      "en": [
          {
              "q": "When is the first Jaiora meetup in Belgrade?",
              "a": "Saturday, October 3, 2026, at 7 pm. Anton stepped up to find a venue, members put together a shortlist of six places, and the final pick will be made by poll in the chat. The plan after that is to meet every Saturday."
          },
          {
              "q": "Where can I sit somewhere smoke-free in Belgrade?",
              "a": "From the members’ September 2026 shortlist, smoking isn’t allowed inside at Tmin — between Ada and Julino Brdo, with room for a big group if you book — and at Pizza + Bar. With terraces: Pečat in the park with Serbian cuisine, the Amici pizzeria in the same building, Jazz by Republic Square, Snežana on Knez Mihailova, and Bistro Vračar. In winter people in Belgrade sit on terraces with infrared heaters too."
          },
          {
              "q": "Can I write in the chat in English?",
              "a": "Yes. In September 2026 members introduced themselves in English, including Serbian developers who are still learning Russian — they get replies in English."
          },
          {
              "q": "What are Jaiora meetups like, and what are the chat rules?",
              "a": "In every city a group of 3 to 20 people usually gathers. There are no special rules at the meetup — you can talk about anything. In the chat there’s one main rule: no toxicity and respect for other people’s boundaries."
          }
      ]
  },
  'yerevan': {
      "ru": [
          {
              "q": "Когда первая встреча Jaiora в Ереване?",
              "a": "Первая встреча назначена на субботу, 3 октября 2026 года, в 19:00. Для неё в чате уже предлагали места с пространством для большой компании: Бир Адеми, Киликия бар, Зитопию и ресторан на Абовяна, 12 — итог объявят в чате."
          },
          {
              "q": "Как влиться в сообщество в Ереване?",
              "a": "Представьтесь в чате с тегом #whois: кто вы, чем занимаетесь, в каком районе живёте. До первой встречи участники собираются по районам: 26 сентября прошла мини-сходка жителей Масива — встретились у Мегамолла и пошли в Нарек Тонратун. Соседей по Нор Норку и Эребуни тоже ищут в чате."
          },
          {
              "q": "Где искать квартиру в Ереване?",
              "a": "Основная площадка, по словам участников, — list.am. Сразу говорите арендодателю, что приедете посмотреть квартиру лично: так меньше шансов нарваться на фейк. Новички рассказывали, что бронирования жилья срывались, а попытки развести на деньги начинались уже в аэропорту, — не платите заранее, пока не увидели жильё."
          },
          {
              "q": "Где в Ереване поесть и посидеть?",
              "a": "В закрепе чата лежит гид по заведениям от местного сообщества «Гастробайтеров»: армянская и грузинская кухня, кофейни, винные места и загородные поездки. Для посиделок компанией участники советуют Бир Адеми, Киликия бар и Зитопию."
          }
      ],
      "en": [
          {
              "q": "When is the first Jaiora meetup in Yerevan?",
              "a": "The first meetup is set for Saturday, October 3, 2026, at 7 pm. Members have already suggested venues with room for a big group — Bir Ademi, Kilikia bar, Zytopia, and a restaurant at 12 Abovyan St — the final pick will be announced in the chat."
          },
          {
              "q": "How do I join the community in Yerevan?",
              "a": "Introduce yourself in the chat with the #whois tag: who you are, what you do, which district you live in. Ahead of the first meetup, members get together by district: on September 26 residents of Massiv held a mini-meetup — they met at Megamall and went to Narek Tonratun. People also look for neighbours in Nor Nork and Erebuni in the chat."
          },
          {
              "q": "Where do I look for an apartment in Yerevan?",
              "a": "The main site, according to members, is list.am. Tell the landlord right away that you'll come to see the flat in person — that cuts down on fake listings. Newcomers reported housing bookings falling through and money scams starting as early as the airport, so don't pay upfront until you've seen the place."
          },
          {
              "q": "Where to eat and hang out in Yerevan?",
              "a": "The chat's pinned message has a guide to local spots from the “Gastrobiters” community: Armenian and Georgian food, coffee shops, wine bars, and trips out of town. For group hangouts, members suggest Bir Ademi, Kilikia bar, and Zytopia."
          }
      ]
  },
}

export const locationFaq = (slug: string, lang: Lang): FaqItem[] => LOCATION_FAQ[slug]?.[lang] ?? []
