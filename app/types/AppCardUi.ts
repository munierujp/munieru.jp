/** AppCardの各領域へ追加する、用途別の配置クラス。 */
export interface AppCardUi {
  /** 画像・本文・補助リンクを並べるグリッドのクラス。 */
  layout?: string
  /** 本文の配置を補足するクラス。 */
  content?: string
}
