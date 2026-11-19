/**
 * CSSの標準ルールと、Nuxt UIのパッケージCSSの読込形式を設定する。
 */
import type { Config } from 'stylelint'

const config: Config = {
  // CSSの基本ルールは標準設定に任せる。
  extends: ['stylelint-config-standard'],
  // パッケージCSSのimport構文に合わせるためのルール調整。
  rules: {
    // 公式例に合わせた文字列importを、標準設定のurl記法へ自動修正させない。
    'import-notation': 'string'
  }
}

export default config
