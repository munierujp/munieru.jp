import type { LocalizedText } from './LocalizedText'

/** 表示名・支援URL・サービスアイコンをまとめた支援先。 */
export interface SupportLink {
  /** 支援先を識別する安定したキー。 */
  key: string
  /** 日英共通の名称、または言語別の表示名。 */
  title: string | LocalizedText
  /** 支援先ページの公開URL。 */
  url: string
  /** public配下のローカル画像パス。 */
  image: string
}
