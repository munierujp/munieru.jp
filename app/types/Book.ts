/** 寄稿書籍の販売先・表紙・原題と、英語ページ向けの補足情報。 */
export interface Book {
  /** 翻訳辞書と対応付ける安定した識別子。表示タイトルを変更しても維持する。 */
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
  /** 書籍・発表の形式を示す表示名。 */
  format: string
  /** 寄稿した章の原題。 */
  chapterTitle?: string
  /** 表示言語に対応する説明文。 */
  description?: string
  /** 英語版で章名に添える寄稿内容の説明。 */
  contributionLabel?: string
  /** 日本語の章名を置き換えず、英語ページで補足する参考訳。 */
  englishChapterTitle?: string
}
