export interface TeamMember {
  name: string
  // Telegram-ник без @ — по нему строится ссылка
  handle: string
}

// Команда и активные организаторы сети.
export const TEAM: TeamMember[] = [
  { name: 'Егор Урванов', handle: 'eurvanov' },
  { name: 'Александр Прохорович', handle: 'alexanderprokhorovich' },
  { name: 'Павел Морозов', handle: 'truemoroz' },
  { name: 'Константин Трудик', handle: 'TrudikK' },
  { name: 'not_perfect_blue', handle: 'not_perfect_blue' },
  { name: 'Александр', handle: 'Kubig' },
  { name: 'Надежда Яковлева', handle: 'n0d10' },
  { name: 'Олег Теретенко', handle: 'olegteretenko' },
  { name: 'Натали', handle: 'natali_mytarget' },
  { name: 'Ксения Васильева', handle: 'Kseniya_Vasil' },
  { name: 'Иван Лопатин', handle: 'velopilot' },
  { name: 'Екатерина Урванова', handle: 'kb1932' },
]
