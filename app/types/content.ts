// JSONの元データと、翻訳後の表示データで共有する型。
export interface ServiceLink {
  title: string
  url: string
  image: string
}

export interface Skill {
  name: string
  image: string
}

export type WorkCategory = 'web' | 'extension' | 'library' | 'cli'
export type WorkFilter = 'all' | WorkCategory

export interface Work {
  key: string
  title: string
  description: string
  date: string
  url: string
  github: string
  category: WorkCategory
  image?: string
  publicationEnded?: boolean
  developmentEnded?: boolean
}

export interface Book {
  key: string
  title: string
  date: string
  url: string
  image: string
  format: string
  chapterTitle?: string
  description?: string
  contributionLabel?: string
  englishChapterTitle?: string
}

export interface Talk {
  key: string
  title: string
  date: string
  format: string
  eventTitle: string
  image: string
  imageWidth: number
  imageHeight: number
  eventUrl: string
  slidesUrl: string
  englishTitle?: string
  englishEventTitle?: string
}

export interface LocalizedContent {
  links: ServiceLink
  skills: Skill
  works: Work
  books: Book
  talks: Talk
}
