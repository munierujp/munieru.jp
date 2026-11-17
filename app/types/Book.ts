import type { LocalizedText } from './LocalizedText'

/** 寄稿書籍の販売先・表紙・原題と、英語ページ向けの補足情報。 */
export interface Book {
  /** 項目を識別する安定したキー。表示タイトルを変更しても維持する。 */
  key: string
  /** カードや一覧に表示する名称。 */
  title: string
  /** 日付をYYYY-MM-DDで保存する。表示の整形と並べ替えに共用する。 */
  date: string
  /** 項目の公開先ページのURL。 */
  url: string
  /** public配下のローカル画像パス。外部画像を表示時に取得しない。 */
  image: string
  /** 表紙の元画像の幅。高さとともにレイアウトの変化を抑える。 */
  imageWidth: number
  /** 表紙の元画像の高さ。幅とともに縦横比を維持する。 */
  imageHeight: number
  /** 言語別の書籍形式の表示名。 */
  format: LocalizedText
  /** 寄稿した章の原題。 */
  chapterTitle?: string
  /** 表示言語に対応する説明文。 */
  description?: string
  /** 日本語の章名を置き換えず、英語ページで補足する参考訳。 */
  englishChapterTitle?: string
}
