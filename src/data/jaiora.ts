import type { L } from '@/lib/i18n'

export interface Story { title: string; year?: string; text: string; pre?: boolean; phase?: string; group?: string; goal?: boolean }
export interface Tile { title: string; text: string }

export interface JaioraContent {
  eyebrow: string
  title: string
  lead: string
  meet: { when: string; title: string; text: string; button: string }
  rulesTitle: string
  rulesLead: string
  rules: Tile[]
  values: Tile[]
  findTitle: string
  find: Tile[]
  storyTitle: string
  storyBy: { lead: string; name: string; href: string; tail: string }
  story: Story[]
  haveTitle: string
  cityChats: string
  themeChats: string
}

const ru: JaioraContent = {
  eyebrow: 'Jaiora · оффлайн-LinkedIn',
  title: 'Нужный человек существует. Осталось оказаться с ним в одной комнате.',
  lead: 'У любой задачи и цели есть человек, который поможет её решить. Мы помогаем его найти и встретиться вживую. Здесь рады всем.',
  meet: {
    when: 'Каждую субботу · 19:00',
    title: 'Встречаемся в большинстве наших городов',
    text: 'Говорим о работе и о жизни, и не только про IT. Можно прийти одному, с другом или с задачей.',
    button: 'Выбрать свой город ↓',
  },
  rulesTitle: 'На чём держится',
  rulesLead: 'У нас всего два правила.',
  rules: [
    { title: 'Открытость', text: 'Прийти может любой. Без взносов, отбора и условий.' },
    { title: 'Нетоксичность', text: 'Спорить можно, обижать нельзя.' },
  ],
  values: [
    { title: 'Польза сообществу', text: 'Рекламы нет. Здесь советуют друг другу проверенных людей и места.' },
    { title: 'Доверие', text: 'Его не купишь, оно копится годами.' },
    { title: 'Сердце', text: 'Jaiora от тайского ใจ (jai), «сердце». В центре люди, технологии им только помогают.' },
  ],
  findTitle: 'Что можно найти',
  find: [
    { title: 'Свои люди', text: 'Приехать в новый город и в первую же субботу оказаться среди своих' },
    { title: 'Работа', text: 'Найти человека в команду или команду для себя' },
    { title: 'Инвесторы', text: 'Познакомиться с инвестором или найти, во что вложиться' },
    { title: 'Идея', text: 'Рассказать о своей идее и найти тех, кто захочет её делать' },
    { title: 'Любая задача', text: 'Юрист, врач, репетитор по физике для ребёнка: кто-то точно знает нужного человека' },
    { title: 'Переезд', text: 'На новом месте встретят, подскажут и познакомят' },
  ],
  storyTitle: 'Как всё началось',
  storyBy: { lead: 'Рассказывает ', name: 'Егор Урванов', href: 'https://www.urvanov.com/', tail: ', основатель Jaiora' },
  story: [
    { title: 'Люди', year: '2016 и раньше', pre: true, group: 'До сообществ', phase: 'До 2022 · Егор учится работать с людьми', text: 'В МАИ и других сообществах я много работал с людьми: собирал, учил, организовывал, ошибался.' },
    { title: 'GetMentor', year: '2022', pre: true, text: 'Стал топ-1 ментором на GetMentor. Там я понял, как важны нетворк и умение работать с людьми.' },
    { title: 'Отъезд', year: '2022', group: 'Сообщества', phase: 'С 2022 · Егор собирает людей', text: 'В 2022-м многие вдруг очень полюбили путешествовать. Я тоже уехал, в Бангкок.' },
    { title: 'Неудача', year: '2023', text: 'Первое сообщество, которое я собрал вокруг своего кондо, развалилось.' },
    { title: 'Гипотеза', text: 'Я не бросил. Верил, что переезд даётся легче, если на новом месте тебя кто-то встречает.' },
    { title: 'Bangkok IT', text: 'Со второй попытки получилось: я создал Bangkok IT.' },
    { title: 'Работа и имя', year: '2024', text: 'Через сообщество я нашёл работу, меня стали узнавать и звать на подкасты.' },
    { title: 'Сарафан', text: 'В Дананге ко мне подошёл незнакомец: «Мой друг с Кипра тебя знает». Ни того, ни другого я не знал, а сообщества на Кипре у меня нет. Слух стал расходиться сам.' },
    { title: 'Рост', year: '2025', phase: 'С 2025 · Люди собирают людей', text: 'Появились новые сообщества. Сомневались, нужно ли это в городах без экспатов. Москва и Питер показали, что нужно.' },
    { title: 'Переезды', text: 'Люди стали переезжать из города в город. Недавно в Батуми мы сидели за одним столом с ребятами из Бангкока.' },
    { title: 'Jaiora', year: '2026', phase: 'С 2026 · Jaiora: сеть по всему миру', text: 'Сообщества выросли в Jaiora, нас уже 10 000 человек. Мы хотим, чтобы любой мог найти человека под свою задачу или цель и встретиться с ним вживую.' },
    { title: 'Цель', year: '2027', goal: true, text: '30 городов, 30 000 человек по всему миру и свой инструмент для нетворка: оффлайн-LinkedIn, который по задаче или цели подскажет, кто в сообществе может помочь.' },
  ],
  haveTitle: 'Что у нас есть',
  cityChats: 'Чаты по локациям',
  themeChats: 'Тематические чаты и каналы',
}

const en: JaioraContent = {
  eyebrow: 'Jaiora · offline LinkedIn',
  title: 'The right person exists. You just need to be in the same room.',
  lead: 'Every task and goal has a person who can help. We help you find them and meet in person. Everyone is welcome.',
  meet: {
    when: 'Every Saturday · 7 pm',
    title: 'We meet in most of our cities',
    text: 'We talk about work and life, not only IT. Come alone, with a friend, or with a task.',
    button: 'Pick your city ↓',
  },
  rulesTitle: 'What it stands on',
  rulesLead: 'We have just two rules.',
  rules: [
    { title: 'Openness', text: 'Anyone can come. No fees, selection, or conditions.' },
    { title: 'No toxicity', text: 'You can argue, you cannot offend.' },
  ],
  values: [
    { title: 'Value to the community', text: 'No ads. People recommend trusted people and places to each other.' },
    { title: 'Trust', text: 'It cannot be bought, it builds up over years.' },
    { title: 'Heart', text: 'Jaiora comes from Thai ใจ (jai), “heart”. People are at the center, technology only helps them.' },
  ],
  findTitle: 'What you can find',
  find: [
    { title: 'Your people', text: 'Arrive in a new city and find yourself among your own by the first Saturday' },
    { title: 'Work', text: 'Find a person for your team, or a team for yourself' },
    { title: 'Investors', text: 'Meet an investor, or find something to invest in' },
    { title: 'An idea', text: 'Share your idea and find those who want to build it' },
    { title: 'Any task', text: 'A lawyer, a doctor, a physics tutor for your child: someone surely knows the right person' },
    { title: 'Relocation', text: 'At the new place people will greet you, advise, and introduce you' },
  ],
  storyTitle: 'How it all started',
  storyBy: { lead: 'Told by ', name: 'Egor Urvanov', href: 'https://www.urvanov.com/', tail: ', founder of Jaiora' },
  story: [
    { title: 'People', year: '2016 and earlier', pre: true, group: 'Before the communities', phase: 'Before 2022 · Egor learns to work with people', text: 'At MAI and other communities I worked with people a lot: gathering, teaching, organizing, making mistakes.' },
    { title: 'GetMentor', year: '2022', pre: true, text: 'Became the top-1 mentor on GetMentor. There I understood how important networking and working with people are.' },
    { title: 'Leaving', year: '2022', group: 'The communities', phase: 'Since 2022 · Egor brings people together', text: 'In 2022 many people suddenly fell in love with travel. I left too, to Bangkok.' },
    { title: 'Failure', year: '2023', text: 'The first community I built around my condo fell apart.' },
    { title: 'Hypothesis', text: 'I did not give up. I believed relocation is easier when someone meets you at the new place.' },
    { title: 'Bangkok IT', text: 'The second attempt worked: I created Bangkok IT.' },
    { title: 'Work and a name', year: '2024', text: 'Through the community I found a job, people started to recognize me and invite me to podcasts.' },
    { title: 'Word of mouth', text: 'In Da Nang a stranger came up to me: “My friend from Cyprus knows you.” I knew neither of them, and I have no community in Cyprus. The word spread on its own.' },
    { title: 'Growth', year: '2025', phase: 'Since 2025 · People bring people together', text: 'New communities appeared. We doubted whether it was needed in cities without expats. Moscow and Saint Petersburg showed it is.' },
    { title: 'Moves', text: 'People started moving from city to city. Recently in Batumi we sat at one table with folks from Bangkok.' },
    { title: 'Jaiora', year: '2026', phase: 'Since 2026 · Jaiora: a network worldwide', text: 'The communities grew into Jaiora, we are already 10,000 people. We want anyone to find a person for their task or goal and meet them in person.' },
    { title: 'Goal', year: '2027', goal: true, text: '30 cities, 30,000 people worldwide and our own networking tool: an offline LinkedIn that, given a task or goal, tells who in the community can help.' },
  ],
  haveTitle: 'What we have',
  cityChats: 'Location chats',
  themeChats: 'Topic chats and channels',
}

export const JAIORA: L<JaioraContent> = { ru, en }

// Те же числа, что в хронике выше («нас уже 10 000», цель 2027 — 30 000 человек)
export const NETWORK = { people: 10000, goalPeople: 30000, goalYear: 2027 }
