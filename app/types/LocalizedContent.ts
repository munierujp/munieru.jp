import type { SupportLink } from './SupportLink'
import type { Skill } from './Skill'
import type { Work } from './Work'
import type { Book } from './Book'
import type { Talk } from './Talk'

/** 翻訳辞書のグループ名と、上書き対象となる項目の型の対応表。 */
export interface LocalizedContent {
  /** 活動への支援先と、その言語別の表示名。 */
  support: SupportLink
  /** スキル名とアイコンの情報。 */
  skills: Skill
  /** 作品と公開状態の情報。 */
  works: Work
  /** 書籍・寄稿内容の情報。 */
  books: Book
  /** 登壇イベントと発表資料の情報。 */
  talks: Talk
}
