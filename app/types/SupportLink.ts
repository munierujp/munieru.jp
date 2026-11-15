/** 表示名・支援URL・サービスアイコンをまとめた支援先。 */
export interface SupportLink {
  /** 翻訳に対応付ける安定した識別子。 */
  key: string
  /** カードや一覧に表示する名称。 */
  title: string
  /** 支援先ページの公開URL。 */
  url: string
  /** public配下のローカル画像パス。 */
  image: string
}
