/**
 * UIで使うアイコン名とカードの配置設定の型を定義する。
 */
/** ローカル同梱のアイコン集から使うアイコン名。呼び出し側の誤記をコンパイル時に検出する。 */
export type IconName =
  | 'i-simple-icons-github'
  | 'i-simple-icons-x'
  | 'i-lucide-globe'
  | 'i-lucide-code'
  | 'i-lucide-puzzle'
  | 'i-lucide-terminal'

/** AppCardの各領域へ追加する、用途別の配置クラス。 */
export interface AppCardUi {
  /** 画像・本文・補助リンクを並べるグリッドのクラス。 */
  layout?: string
  /** 本文の配置を補足するクラス。 */
  content?: string
}
