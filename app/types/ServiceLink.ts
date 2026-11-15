/** サービス名・公開URL・ローカルのアイコンをまとめたリンク情報。 */
export interface ServiceLink {
  /** カードや一覧に表示する名称。 */
  title: string
  /** 項目の公開先ページのURL。 */
  url: string
  /** public配下のローカル画像パス。外部画像を表示時に取得しない。 */
  image: string
}
