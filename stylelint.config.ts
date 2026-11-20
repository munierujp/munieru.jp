/**
 * CSSの検査に公式の標準ルールを適用する。
 */
import type { Config } from 'stylelint'

const config: Config = {
  // CSSの基本ルールは標準設定に任せる。
  extends: ['stylelint-config-standard']
}

export default config
