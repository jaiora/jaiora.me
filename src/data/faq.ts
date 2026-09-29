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
              "a": "Каждую субботу, сейчас — на руфтопе. Отдельного организатора нет: встречи идут силами самого сообщества, актуальное место и время — в закрепе чата."
          },
          {
              "q": "Как попасть в IT-чат Бангкока?",
              "a": "Нажмите «Открыть чат в Telegram» на этой странице и отправьте заявку. Если заявку не приняли, напишите Егору: @eurvanov."
          },
          {
              "q": "Где в Бангкоке поиграть в волейбол, пиклбол или футбол?",
              "a": "Спорт — самая частая тема вопросов в чате. У волейбола, пиклбола, футбола и баскетбола свои чаты, их организовала Алёна; ссылки спрашивайте в общем чате."
          },
          {
              "q": "Как иностранцу открыть банковский счёт в Бангкоке?",
              "a": "Одна из самых обсуждаемых тем. Требования зависят от типа визы и конкретного отделения, и ответы в разных банках отличаются. Участники делятся свежими случаями — спросите в чате, указав свою визу."
          },
          {
              "q": "Какую визу оформить для жизни в Таиланде?",
              "a": "В чате постоянно обсуждают DTV, продление и выезды на границу. Правила меняются, поэтому сверяйтесь с официальными источниками, а за свежим опытом приходите в чат."
          },
          {
              "q": "Как найти жильё в Бангкоке?",
              "a": "С переездом в чате помогают регулярно: делятся сервисами и группами с объявлениями, отвечают на вопросы о жизни в кондо."
          },
          {
              "q": "Где найти хорошего стоматолога в Бангкоке?",
              "a": "Частый запрос в чате. Участники делятся проверенными клиниками, в том числе государственными с разумными ценами, — спросите свежую рекомендацию."
          }
      ],
      "en": [
          {
              "q": "When and where do IT people meet in Bangkok?",
              "a": "Every Saturday, currently on a rooftop. There's no dedicated organizer: the community runs the meetups itself, and the current place and time are pinned in the chat."
          },
          {
              "q": "How do I join the Bangkok IT chat?",
              "a": "Tap “Open the Telegram chat” on this page and send a join request. If it wasn't accepted, message Egor: @eurvanov."
          },
          {
              "q": "Where can I play volleyball, pickleball, or football in Bangkok?",
              "a": "Sports are the most common question topic in the chat. Volleyball, pickleball, football, and basketball each have their own chat, set up by Alyona; ask for the links in the main chat."
          },
          {
              "q": "How can a foreigner open a bank account in Bangkok?",
              "a": "One of the most discussed topics. Requirements depend on your visa type and the specific branch, and answers differ from bank to bank. Members share fresh cases — ask in the chat and mention your visa."
          },
          {
              "q": "Which visa should I get to live in Thailand?",
              "a": "The chat constantly discusses the DTV, extensions, and border runs. Rules change, so check official sources, and come to the chat for fresh first-hand experience."
          },
          {
              "q": "How do I find housing in Bangkok?",
              "a": "The chat regularly helps with moving: members share services and listing groups and answer questions about condo life."
          },
          {
              "q": "Where can I find a good dentist in Bangkok?",
              "a": "A frequent request in the chat. Members share clinics they trust, including public ones with reasonable prices — ask for a fresh recommendation."
          }
      ]
  },
  'da-nang': {
      "ru": [
          {
              "q": "Где и когда встречаются айтишники в Дананге?",
              "a": "Каждую субботу в 19:00 на пляже, в WiWi Beach Coffee & Food. Встречи идут без перерыва с января 2025 года, вход свободный — можно просто прийти."
          },
          {
              "q": "Что ещё бывает в Дананге, кроме суббот?",
              "a": "По вторникам проходит техническая встреча вперемешку со «свободным микрофоном» для айти-нытья, а ещё был цикл лекций о том, как ИИ меняет продуктовую разработку. Этот формат ведёт Константин Трудик, анонсы — в чате."
          },
          {
              "q": "Как открыть банковский счёт в Дананге?",
              "a": "В чате советуют прийти в офис банка — чаще всего называют Vietcombank и BIDV — и попросить счёт для нерезидента. Главное, зачем он нужен, — оплата по QR-коду. Детали зависят от банка, свежий опыт участники охотно пересказывают в чате."
          },
          {
              "q": "Какую сим-карту взять во Вьетнаме и как её пополнять?",
              "a": "Участники в основном пользуются Viettel. Пополнить баланс можно в Winmart, через кнопку top-up в приложении Lazada или в офисе оператора. Для регистрации в Zalo на счёте нужны деньги — без них не приходит СМС."
          },
          {
              "q": "Как снять квартиру в Дананге?",
              "a": "В чате советуют смотреть квартиру лично до оплаты и заранее спросить про соседей: караоке и офисы по соседству — частая причина переездов. Свободными квартирами и контактами хозяев участники тоже делятся в чате."
          },
          {
              "q": "Где арендовать байк и что с правами?",
              "a": "В чате делятся проверенными прокатами и профильными чатами по аренде. Про местные права и оформление байка на себя разбирали подробно — условия зависят от визы, поэтому актуальный опыт лучше спросить в чате."
          },
          {
              "q": "Как найти врача или стоматолога в Дананге?",
              "a": "В чате регулярно делятся клиниками и стоматологами, которыми остались довольны. Если есть страховка, клинику часто подбирает сама страховая."
          }
      ],
      "en": [
          {
              "q": "Where and when do IT people meet in Da Nang?",
              "a": "Every Saturday at 7 pm on the beach, at WiWi Beach Coffee & Food. The meetups have run without a break since January 2025, entry is free — you can just come."
          },
          {
              "q": "What else happens in Da Nang besides Saturdays?",
              "a": "On Tuesdays there's a technical meetup mixed with an open-mic “IT venting” session, and there was a lecture series on how AI is changing product development. Konstantin Trudik runs this format; announcements are in the chat."
          },
          {
              "q": "How do I open a bank account in Da Nang?",
              "a": "Members recommend going to a bank branch — Vietcombank and BIDV come up most often — and asking for a non-resident account. The main reason to have one is paying by QR code. Details vary by bank, and members are happy to share recent experience in the chat."
          },
          {
              "q": "Which SIM card should I get in Vietnam and how do I top it up?",
              "a": "Most members use Viettel. You can top up at Winmart, via the top-up button in the Lazada app, or at the operator's office. To register in Zalo you need some balance — otherwise the SMS doesn't arrive."
          },
          {
              "q": "How do I rent an apartment in Da Nang?",
              "a": "Members recommend seeing the apartment in person before paying and asking about the neighbors in advance: karaoke bars and offices next door are a common reason to move out. People also share free apartments and landlord contacts in the chat."
          },
          {
              "q": "Where can I rent a bike, and what about a license?",
              "a": "Members share trusted rentals and dedicated rental chats. Local licenses and registering a bike in your own name have been discussed in detail — the rules depend on your visa, so it's best to ask for current experience in the chat."
          },
          {
              "q": "How do I find a doctor or dentist in Da Nang?",
              "a": "Members regularly share clinics and dentists they were happy with. If you have insurance, the insurer often picks the clinic for you."
          }
      ]
  },
  'phuket': {
      "ru": [
          {
              "q": "Когда и где встречаются айтишники на Пхукете?",
              "a": "По субботам в 19:00 в Sala Mexicali Phuket Town — там встречи идут с 27 июня 2026 года. Иногда неделю пропускают, поэтому перед выходом загляните в опрос «Придёшь?» в чате."
          },
          {
              "q": "Как попасть в IT-чат Пхукета?",
              "a": "Нажмите «Открыть чат в Telegram» на этой странице и отправьте заявку. После вступления принято представиться с тегом #whois."
          },
          {
              "q": "В каком районе Пхукета живут айтишники?",
              "a": "По опросу в чате больше всего участников живут в Раваи и Чалонге, дальше — Бангтао, Катху и Олд Таун. В чате отмечали, что с Бангтао до юга острова долго добираться, это стоит учесть при выборе жилья."
          },
          {
              "q": "Что делать, если тайский банк заблокировал счёт?",
              "a": "В чате рассказывали о внезапных блокировках, и главный совет участников — не проводить деньги через P2P-обмены. Подробности своего случая лучше обсудить в чате."
          },
          {
              "q": "Как цифровому кочевнику платить налоги в Таиланде?",
              "a": "Тему в чате разбирали несколько дней, единого ответа нет — у каждого своя ситуация. Для своего случая стоит обратиться к специалисту, а опытом участники делятся в чате."
          },
          {
              "q": "Куда сходить в поход или погулять на Пхукете?",
              "a": "На вопрос в чате за пару часов накидали десяток точек на карте — от смотровых до троп. Компанию на маршрут проще всего найти на субботней встрече."
          },
          {
              "q": "Где на Пхукете поиграть в волейбол?",
              "a": "В чате анонсировали бесплатный волейбол на песке в парке в Олд Тауне: любительский уровень, новичков берут. Актуальное время игр — в чате."
          }
      ],
      "en": [
          {
              "q": "When and where do IT people meet in Phuket?",
              "a": "On Saturdays at 7 pm at Sala Mexicali Phuket Town — meetups have been held there since June 27, 2026. A week is skipped now and then, so check the “Coming?” poll in the chat before heading out."
          },
          {
              "q": "How do I join the Phuket IT chat?",
              "a": "Tap “Open the Telegram chat” on this page and send a join request. Once you're in, it's customary to introduce yourself with the #whois tag."
          },
          {
              "q": "Which area of Phuket do IT people live in?",
              "a": "According to a poll in the chat, most members live in Rawai and Chalong, followed by Bang Tao, Kathu, and Old Town. Members noted that getting from Bang Tao to the south of the island takes a long time, worth keeping in mind when choosing housing."
          },
          {
              "q": "What should I do if a Thai bank freezes my account?",
              "a": "Members have described sudden freezes, and their main advice is not to move money through P2P exchanges. Your specific case is best discussed in the chat."
          },
          {
              "q": "How should a digital nomad pay taxes in Thailand?",
              "a": "The chat discussed this for several days with no single answer — everyone's situation differs. For your own case, consult a specialist; members share their experience in the chat."
          },
          {
              "q": "Where can I hike or go for a walk in Phuket?",
              "a": "When someone asked in the chat, members dropped a dozen spots on the map within a couple of hours — from viewpoints to trails. The easiest way to find company for a route is the Saturday meetup."
          },
          {
              "q": "Where can I play volleyball in Phuket?",
              "a": "The chat announced free volleyball on sand in a park in Old Town: amateur level, beginners welcome. Current game times are in the chat."
          }
      ]
  },
  'bali': {
      "ru": [
          {
              "q": "Где и когда встречаются айтишники на Бали?",
              "a": "По субботам в 19:00 в Ju Bali в Чангу — место сообщество выбрало голосованием. Иногда неделю пропускают, если желающих мало, поэтому свежий анонс лучше посмотреть в чате."
          },
          {
              "q": "Что это за встречи и кто их проводит?",
              "a": "Чтобы просто пообщаться: без регламента и заданной темы. Первые встречи на закате собирала Аксинья, сейчас субботы продолжает Егор."
          },
          {
              "q": "В каком районе Бали живут айтишники?",
              "a": "По опросу в чате больше всего участников живёт в Чангу, Бераве и Переренане, дальше идут Убуд, Букит и Семиньяк с Кутой. Поэтому основная встреча — в Чангу."
          },
          {
              "q": "Какую сим-карту взять на Бали?",
              "a": "В чате советуют Telkomsel: карту покупают один раз, а пакеты гигабайт докупают раз в месяц через приложение. Не забудьте зарегистрировать IMEI телефона — это удобно сделать по прилёту."
          },
          {
              "q": "Какой банк открыть на Бали с KITAS?",
              "a": "В чате обсуждали BNI, BCA и OCBC: чаще всего хвалят приложения MyBCA и OCBC, у BNI есть виртуальные карты. Свежий опыт участники рассказывают в чате."
          },
          {
              "q": "Как оформить KITAS или визу цифрового кочевника?",
              "a": "Одни участники оформляли через агентства, другие — сами, без посредников. Требования меняются, поэтому актуальные детали лучше спросить в чате."
          },
          {
              "q": "Где на Бали поработать с ноутбуком?",
              "a": "Участники периодически собираются «поковоркать» вместе в кафе. Из названных в чате мест — Cube в Джимбаране и Roosters в Убуде."
          }
      ],
      "en": [
          {
              "q": "Where and when do IT people meet in Bali?",
              "a": "On Saturdays at 7 pm at Ju Bali in Canggu — the community chose the spot by vote. A week is sometimes skipped when few people can make it, so check the latest announcement in the chat."
          },
          {
              "q": "What are these meetups and who runs them?",
              "a": "Just a chance to talk: no agenda and no set topic. Aksinia gathered the first sunset meetups; now Egor keeps the Saturdays going."
          },
          {
              "q": "Which area of Bali do IT people live in?",
              "a": "According to a poll in the chat, most members live in Canggu, Berawa and Pererenan, followed by Ubud, Bukit and Seminyak/Kuta. That's why the main meetup is in Canggu."
          },
          {
              "q": "Which SIM card should I get in Bali?",
              "a": "Members recommend Telkomsel: you buy the card once and top up data packages monthly through the app. Don't forget to register your phone's IMEI — it's easiest to do on arrival."
          },
          {
              "q": "Which bank should I open in Bali with a KITAS?",
              "a": "BNI, BCA and OCBC have been discussed in the chat: the MyBCA and OCBC apps get the most praise, and BNI offers virtual cards. Members share recent experience in the chat."
          },
          {
              "q": "How do I get a KITAS or a digital nomad visa?",
              "a": "Some members went through agencies, others did it themselves without intermediaries. Requirements change, so it's best to ask for current details in the chat."
          },
          {
              "q": "Where can I work with a laptop in Bali?",
              "a": "Members regularly get together to co-work in cafés. Places named in the chat include Cube in Jimbaran and Roosters in Ubud."
          }
      ]
  },
  'batumi': {
      "ru": [
          {
              "q": "Где и когда проходят встречи Jaiora в Батуми?",
              "a": "По субботам в 19:00 в SushiGO. С сентября 2026 года встречи ведут Наталья и Ксения Васильева; актуальный анонс каждой недели — в закрепе чата."
          },
          {
              "q": "Как новичку влиться в IT-сообщество Батуми?",
              "a": "Напишите о себе в чате с тегом #whois: кто вы, чем занимаетесь, что ищете. Дальше проще всего прийти на субботнюю встречу — там знакомятся вживую."
          },
          {
              "q": "Как открыть счёт в банке в Батуми?",
              "a": "Участники открывают счета в Bank of Georgia, TBC и Credo. Опыт у всех разный: по отзывам в чате, в последнее время BoG открывает счета охотнее, а TBC может попросить выписку по оборотам ИП из другого банка. Наличие счёта в одном банке, по словам участников, помогает открыть второй."
          },
          {
              "q": "Как оформить ИП в Грузии и что такое «ИП 1%»?",
              "a": "Многие участники регистрируют ИП в Доме юстиции и получают статус малого бизнеса — в чате его называют «ИП 1%». Нюансы вроде деклараций, смены статуса и открытия счёта на ИП регулярно разбирают в чате; для своего случая участники советуют сверяться с бухгалтером."
          },
          {
              "q": "Как снять или купить квартиру в Батуми?",
              "a": "Объявления смотрят на ss.ge и через риелторов — в чате делятся проверенными контактами. Цена сильно зависит от района и дома, поэтому перед сделкой участники советуют посмотреть несколько вариантов и спросить мнение местных."
          },
          {
              "q": "Какую сим-карту и мобильный интернет взять в Батуми?",
              "a": "В чате обычно советуют Magti или Silknet: у обоих есть безлимитные пакеты мобильного интернета, которые берут и для домашнего роутера."
          },
          {
              "q": "Как безопасно поменять деньги в Батуми?",
              "a": "В чате советуют не менять деньги у случайных людей. Для криптовалюты — P2P на биржах, выбирая контрагентов с большим числом сделок и высоким процентом одобрений; для наличных — банки и обменники."
          }
      ],
      "en": [
          {
              "q": "When and where are Jaiora meetups in Batumi?",
              "a": "Saturdays at 7 pm at SushiGO. Since September 2026 the meetups are run by Natalie and Ksenia Vasilyeva; each week’s announcement is pinned in the chat."
          },
          {
              "q": "How can a newcomer join the IT community in Batumi?",
              "a": "Introduce yourself in the chat with the #whois tag: who you are, what you do, what you’re looking for. Then the easiest step is to come to the Saturday meetup and meet people in person."
          },
          {
              "q": "How do I open a bank account in Batumi?",
              "a": "Members open accounts at Bank of Georgia, TBC, and Credo. Experiences vary: according to the chat, BoG has lately been more willing to open accounts, while TBC may ask for a statement of your sole-proprietor turnover from another bank. Members say having an account at one bank helps when opening a second."
          },
          {
              "q": "How do I register as a sole proprietor in Georgia, and what is the “1% IE”?",
              "a": "Many members register as individual entrepreneurs at the Public Service Hall and get small-business status — the chat calls it the “1% IE”. Details like declarations, changing status, and opening a business account are discussed in the chat regularly; for your own case members recommend checking with an accountant."
          },
          {
              "q": "How do I rent or buy an apartment in Batumi?",
              "a": "People browse listings on ss.ge and work with realtors — members share trusted contacts in the chat. Prices depend heavily on the district and building, so members advise looking at several options and asking locals before a deal."
          },
          {
              "q": "Which SIM card and mobile internet should I get in Batumi?",
              "a": "The chat usually recommends Magti or Silknet: both offer unlimited mobile internet packages, which people also use for a home router."
          },
          {
              "q": "How do I exchange money safely in Batumi?",
              "a": "The chat advises against exchanging money with random people. For crypto, use P2P on exchanges and pick counterparties with many trades and a high completion rate; for cash, use banks and exchange offices."
          }
      ]
  },
  'moscow': {
      "ru": [
          {
              "q": "Где и когда проходят встречи Jaiora в Москве?",
              "a": "С июля 2026 года — по субботам в «Howard Loves Craft» на Болотной набережной. Раньше собирались в «Полянка Wine» и «Blanc». Ритм пока нерегулярный, поэтому точное время и место каждой встречи публикуют в чате."
          },
          {
              "q": "Как проходят встречи и нужно ли готовиться?",
              "a": "Готовиться не нужно: встреча без программы и докладов. Сидят за столом, общаются о работе и жизни, иногда вместо бара собираются на настолки."
          },
          {
              "q": "Где в Москве поиграть в бадминтон или падел с компанией?",
              "a": "В чате участники собрали свою мини-базу кортов: бадминтон — Алтуфьево, Лужники, Чистые пруды, Юго-Западная; есть и бесплатные площадки для падела. Также советуют бесплатные районные тренировки «Мой спорт район». Напарника обычно находят прямо в чате."
          },
          {
              "q": "Есть ли в чате настольные игры?",
              "a": "Да. Надежда Яковлева собирает компанию на настолки — шахматы, UNO, Monopoly, го. Предложить игру или присоединиться можно в чате."
          },
          {
              "q": "Можно ли найти работу или сотрудника через чат?",
              "a": "Да, участники пишут, кого ищут, и откликаются на запросы: разработчиков, руководителей, проджектов. Начните с представления по тегу #whois — так проще понять, кого вам советовать."
          },
          {
              "q": "Как не попасть на мошенников?",
              "a": "В чате дважды предупреждали о людях из соседних чатов, которые представлялись помощниками и пропадали с деньгами. Перед переводом денег или началом работы уточните у участников в общем чате, кто этот человек."
          }
      ],
      "en": [
          {
              "q": "Where and when are the Jaiora meetups in Moscow?",
              "a": "Since July 2026, on Saturdays at Howard Loves Craft on Bolotnaya Embankment. Earlier meetups were at Polyanka Wine and Blanc. The rhythm is still irregular, so the exact time and place of each meetup is posted in the chat."
          },
          {
              "q": "What are the meetups like, and do I need to prepare?",
              "a": "No preparation needed: there is no agenda or talks. People sit at a table and talk about work and life, and sometimes get together for board games instead of a bar."
          },
          {
              "q": "Where can I play badminton or padel with company in Moscow?",
              "a": "Members put together their own mini database of courts: badminton at Altufyevo, Luzhniki, Chistye Prudy and Yugo-Zapadnaya, plus free padel courts. They also recommend the free district sessions of the “Moy Sport Rayon” program. Partners are usually found right in the chat."
          },
          {
              "q": "Are there board games in the chat?",
              "a": "Yes. Nadezhda Yakovleva gathers people for board games — chess, UNO, Monopoly, Go. You can suggest a game or join in the chat."
          },
          {
              "q": "Can I find a job or a hire through the chat?",
              "a": "Yes, members post who they are looking for and respond to requests: developers, managers, project managers. Start by introducing yourself with the #whois tag — it makes it easier for people to recommend the right contacts."
          },
          {
              "q": "How do I avoid scammers?",
              "a": "The chat has twice warned about people from neighboring chats who posed as helpers and disappeared with the money. Before sending money or starting work with someone, ask members in the public chat who that person is."
          }
      ]
  },
  'saint-petersburg': {
      "ru": [
          {
              "q": "Где в Питере найти бесплатные IT-митапы и конференции?",
              "a": "Саша регулярно собирает в чате анонсы бесплатных IT-событий города под тегом #анонс: встречи Coffee&Code (Android, iOS, QA, DevOps), PiterJS, Петербургская группа пользователей Linux, ODS, QA-митапы, вечера «ИТ-нытья» в Failover Bar. Свои ссылки на митапы и конференции участники тоже присылают в чат."
          },
          {
              "q": "Когда и где проходят встречи Jaiora в Питере?",
              "a": "Собираемся по субботам с июня 2026 года. Долго встречались в Kazan-Mangal, в сентябре пробовали бар «Сарапул» и Feromon у Сенной. Место и день выбирают вместе, итог публикуют в закрепе чата."
          },
          {
              "q": "Как проходят встречи и нужно ли что-то знать заранее?",
              "a": "Готовиться не нужно: формат открытый, обо всём. Просто разговаривают — о работе, проектах, переездах, городе. Новичкам здесь рады."
          },
          {
              "q": "Можно ли через чат найти работу или сотрудника?",
              "a": "Да, в чате публикуют вакансии и резюме и спрашивают контакты под конкретные задачи. Писать можно без согласования с админами — главное, чтобы это было полезно сообществу и без токсичности."
          },
          {
              "q": "Как познакомиться с участниками?",
              "a": "Напишите о себе в чате с тегом #whois: кто вы, чем занимаетесь, что ищете. Это традиция чата, так вас быстрее узнают и позовут на встречу."
          },
          {
              "q": "Кто организует встречи в Питере?",
              "a": "Традицию суббот в июне 2026 года запустил Егор, а с конца сентября встречи ведёт Саша."
          }
      ],
      "en": [
          {
              "q": "Where can I find free IT meetups and conferences in Saint Petersburg?",
              "a": "Sasha regularly posts announcements of the city’s free IT events in the chat under the #анонс tag: Coffee&Code meetups (Android, iOS, QA, DevOps), PiterJS, the Saint Petersburg Linux user group, ODS, QA meetups, and “IT venting” nights at Failover Bar. Members share their own links to meetups and conferences too."
          },
          {
              "q": "When and where are the Jaiora meetups in Saint Petersburg?",
              "a": "We meet on Saturdays since June 2026. For a long time the meetups were at Kazan-Mangal; in September the group tried the bar Sarapul and Feromon near Sennaya. The place and day are chosen together, and the result is pinned in the chat."
          },
          {
              "q": "What are the meetups like, and do I need to know anything in advance?",
              "a": "No need to prepare: the format is open, about everything. People just talk — about work, projects, relocation, the city. Newcomers are welcome."
          },
          {
              "q": "Can I find a job or a hire through the chat?",
              "a": "Yes, the chat has job posts and CVs, and people ask for contacts for specific tasks. You don’t need admin approval to post — the main thing is that it’s useful to the community and not toxic."
          },
          {
              "q": "How do I get to know the members?",
              "a": "Write about yourself in the chat with the #whois tag: who you are, what you do, what you’re looking for. It’s a chat tradition, and it helps people recognize you and invite you to a meetup."
          },
          {
              "q": "Who organizes the meetups in Saint Petersburg?",
              "a": "Egor started the Saturday tradition in June 2026, and since late September the meetups are run by Sasha."
          }
      ]
  },
  'almaty': {
      "ru": [
          {
              "q": "Проходят ли сейчас встречи Jaiora в Алматы?",
              "a": "Регулярные субботние встречи сейчас на паузе. Они шли с октября 2024 года — в коливинге, баре, на бильярде. Чат остаётся живым: договориться о встрече можно прямо там."
          },
          {
              "q": "Где найти IT-мероприятия в Алматы?",
              "a": "Участники делятся анонсами в чате, а в закрепе есть канал с IT-событиями Казахстана — @kz_it_events."
          },
          {
              "q": "Можно ли найти работу или разместить вакансию через чат?",
              "a": "Да, это одна из главных тем чата: компании публикуют вакансии, а специалисты пишут, что ищут работу."
          },
          {
              "q": "Каким банком пользуются в Алматы?",
              "a": "Чаще всего участники пользуются Kaspi — для платежей, переводов и покупок на Kaspi-маркетплейсе; также упоминают Halyk и Jusan."
          },
          {
              "q": "Как платить налоги с иностранного дохода в Казахстане?",
              "a": "В чате разбирают разные варианты: одни принимают платежи на ИП на упрощённом режиме, другие работают по договору как физлицо. Найти бухгалтера по налогам физлиц непросто — участники советуют спрашивать проверенные контакты в чате."
          }
      ],
      "en": [
          {
              "q": "Are there Jaiora meetups in Almaty right now?",
              "a": "The regular Saturday meetups are on pause for now. They ran from October 2024 — at a coworking, a bar, and billiards. The chat is still alive, so you can arrange a meetup right there."
          },
          {
              "q": "Where can I find IT events in Almaty?",
              "a": "Members share announcements in the chat, and a channel with Kazakhstan IT events is pinned there — @kz_it_events."
          },
          {
              "q": "Can I find a job or post a vacancy through the chat?",
              "a": "Yes, it’s one of the chat’s main topics: companies post vacancies, and specialists write that they’re looking for work."
          },
          {
              "q": "Which bank do people use in Almaty?",
              "a": "Most members use Kaspi — for payments, transfers, and shopping on the Kaspi marketplace; Halyk and Jusan are also mentioned."
          },
          {
              "q": "How do I pay taxes on foreign income in Kazakhstan?",
              "a": "The chat discusses different options: some receive payments as a sole proprietor on the simplified regime, others work under a contract as an individual. Finding an accountant for individual taxes is hard — members recommend asking the chat for trusted contacts."
          }
      ]
  },
  'antalya': {
      "ru": [
          {
              "q": "Проходят ли встречи Jaiora в Анталье?",
              "a": "Регулярные субботы шли с марта по июль 2025 года — в Leman Cafe, потом в ирландском пабе. Сейчас собираются от случая к случаю: кофе в Лимане, шашлык в Сарысу — договариваются в чате."
          },
          {
              "q": "Как новичку влиться в IT-сообщество Антальи?",
              "a": "Напишите о себе в чате с тегом #whois и следите за анонсами: встречи, походы и выезды на природу там предлагают сами участники."
          },
          {
              "q": "Есть ли в Анталье коворкинг для айтишников?",
              "a": "Участники ходят в Coworking Antalya в Калеичи — там же проходят мероприятия и мастер-классы на английском, например AI Cafe про нейросети и вайб-кодинг."
          },
          {
              "q": "Как открыть счёт в банке в Турции?",
              "a": "Для счёта обычно нужны ВНЖ и адрес; участники упоминают, что Ziraat выдаёт мультивалютный IBAN. В чате предупреждают, что за P2P-переводы банк может заблокировать счёт, поэтому многие меняют деньги через обменники."
          },
          {
              "q": "Как получить ВНЖ (икамет) в Анталье?",
              "a": "По опыту участников, многие оформляют туристический ВНЖ по договору аренды; кто-то пробует digital nomad и tech-визы. Правила в Турции часто меняются, поэтому актуальный опыт лучше уточнить в чате."
          },
          {
              "q": "Где в Анталье найти компанию для походов и спорта?",
              "a": "Участники ходят в походы с группой @hiking_adventures — старт обычно в Сарысу, а в выходные выбираются туда же семьями жарить шашлыки. В чате есть и любители скалолазания."
          }
      ],
      "en": [
          {
              "q": "Are there Jaiora meetups in Antalya?",
              "a": "Regular Saturdays ran from March to July 2025 — at Leman Cafe, then an Irish pub. Now people get together ad hoc: coffee in Liman, a barbecue in Sarısu — arranged in the chat."
          },
          {
              "q": "How can a newcomer join the IT community in Antalya?",
              "a": "Introduce yourself in the chat with the #whois tag and watch for announcements: members themselves suggest meetups, hikes, and trips out of town."
          },
          {
              "q": "Is there a coworking space for IT people in Antalya?",
              "a": "Members go to Coworking Antalya in Kaleiçi — it also hosts events and English-language workshops, such as AI Cafe on neural networks and vibe coding."
          },
          {
              "q": "How do I open a bank account in Turkey?",
              "a": "You usually need a residence permit and an address; members mention that Ziraat issues a multi-currency IBAN. The chat warns that P2P transfers can get an account blocked, so many exchange money at exchange offices."
          },
          {
              "q": "How do I get a residence permit (ikamet) in Antalya?",
              "a": "From members’ experience, many get a tourist residence permit based on a rental contract; some try digital nomad and tech visas. Rules in Turkey change often, so it’s best to check current experience in the chat."
          },
          {
              "q": "Where can I find people for hiking and sports in Antalya?",
              "a": "Members hike with the @hiking_adventures group — it usually starts from Sarısu, where families also go for weekend barbecues. The chat has climbing enthusiasts too."
          }
      ]
  },
  'belgrade': {
      "ru": [
          {
              "q": "Когда первая встреча Jaiora в Белграде?",
              "a": "В субботу, 3 октября 2026 года, в 19:00. Место выбирают вместе: участники собирают подборку заведений, итог появится в чате. Дальше план — встречаться каждую субботу."
          },
          {
              "q": "Где в Белграде посидеть без табачного дыма?",
              "a": "В Сербии во многих заведениях курят прямо внутри, поэтому для встреч ищут некурящие места. Участники делятся такими кафе и кофейнями в центре, а в тёплую погоду советуют летние веранды."
          },
          {
              "q": "Можно ли писать в чат на английском?",
              "a": "Да, пишите на любом языке — в чате отвечают и на английском, и на сербском."
          },
          {
              "q": "Какие в чате правила?",
              "a": "Ограничений по темам нет, ссылки кидать можно. Главное правило — не токсичить и уважать границы собеседника."
          }
      ],
      "en": [
          {
              "q": "When is the first Jaiora meetup in Belgrade?",
              "a": "On Saturday, October 3, 2026, at 7 pm. The venue is being chosen together: members are putting together a shortlist of places, and the result will be posted in the chat. The plan is to meet every Saturday after that."
          },
          {
              "q": "Where can I sit somewhere smoke-free in Belgrade?",
              "a": "Smoking indoors is common in Serbian venues, so the group looks for smoke-free places for meetups. Members share such cafés and coffee shops in the center, and in warm weather they recommend summer terraces."
          },
          {
              "q": "Can I write in the chat in English?",
              "a": "Yes, write in any language — people in the chat answer in English and Serbian too."
          },
          {
              "q": "What are the chat rules?",
              "a": "There are no topic restrictions, and sharing links is fine. The main rule is not to be toxic and to respect other people’s boundaries."
          }
      ]
  },
  'yerevan': {
      "ru": [
          {
              "q": "Когда первая встреча Jaiora в Ереване?",
              "a": "Первая встреча назначена на субботу, 3 октября 2026 года, в 19:00. Место выбирают вместе в чате."
          },
          {
              "q": "Как влиться в сообщество в Ереване?",
              "a": "Представьтесь в чате с тегом #whois: кто вы, чем занимаетесь, где живёте. До первой встречи участники уже собираются небольшими компаниями — погулять и познакомиться."
          },
          {
              "q": "Где искать квартиру в Ереване?",
              "a": "В чате называли list.am как основную площадку объявлений. Советуют смотреть квартиру лично до оплаты — так меньше шансов нарваться на фейк."
          },
          {
              "q": "Где в Ереване поесть и посидеть?",
              "a": "В закрепе чата лежит гид по заведениям от местного сообщества «Гастробайтеров»: армянская и грузинская кухня, кофейни, винные места."
          }
      ],
      "en": [
          {
              "q": "When is the first Jaiora meetup in Yerevan?",
              "a": "The first meetup is set for Saturday, October 3, 2026, at 7 pm. The venue is being chosen together in the chat."
          },
          {
              "q": "How do I join the community in Yerevan?",
              "a": "Introduce yourself in the chat with the #whois tag: who you are, what you do, where you live. Ahead of the first meetup, members already get together in small groups to walk around and get to know each other."
          },
          {
              "q": "Where do I look for an apartment in Yerevan?",
              "a": "Members named list.am as the main listings site. They recommend seeing the apartment in person before paying — that lowers the chance of running into a fake listing."
          },
          {
              "q": "Where can I eat and hang out in Yerevan?",
              "a": "The chat's pinned messages include a guide to local spots from the “Gastrobiters” community: Armenian and Georgian food, coffee shops, wine bars."
          }
      ]
  },
}

export const locationFaq = (slug: string, lang: Lang): FaqItem[] => LOCATION_FAQ[slug]?.[lang] ?? []
