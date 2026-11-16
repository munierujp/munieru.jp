import type { LocalizedText } from './LocalizedText'

/** リンクを持たない技術名と、ローカルに保存した装飾アイコン。 */
export interface Skill {
  /** 日英共通の技術名、または言語別の表示名。 */
  name: string | LocalizedText
  /** public配下のローカル画像パス。外部画像を表示時に取得しない。 */
  image: string
}
