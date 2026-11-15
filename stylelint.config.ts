/**
 * CSSの標準ルールと、Nuxt UIのパッケージCSSの読込形式を設定する。
 */
import type { Config } from 'stylelint'

/** リンターへ渡す設定。専用のConfig型で構造を検査する。 */
const config: Config = {
  // CSSの基本ルールは標準設定に任せる。
  extends: ['stylelint-config-standard'],
  rules: {
    // Nuxt UI/TailwindのVite処理がパッケージ名を解決できるよう、公式例の文字列importを維持する。
    'import-notation': 'string'
  }
}

export default config
