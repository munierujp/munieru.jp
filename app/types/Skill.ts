/** リンクを持たない技術名と、ローカルに保存した装飾アイコン。 */
export interface Skill {
  /** 表示する名前。 */
  name: string
  /** public配下のローカル画像パス。外部画像を表示時に取得しない。 */
  image: string
}
