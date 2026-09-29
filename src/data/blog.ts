import type { Lang } from '@/lib/i18n'

export interface BlogPost {
  slug: string
  lang: Lang
  title: string
  description: string
  date: string // YYYY-MM-DD
  tags: string[]
  content: string[] // параграфы; когда появится разметка посложнее — перейти на markdown
}

// Постов пока нет — структура готова, наполнение добавим отдельно.
export const POSTS: BlogPost[] = []
