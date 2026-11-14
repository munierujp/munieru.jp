/**
 * CSSの標準ルールと、Nuxt UIのパッケージCSSの読込形式を設定する。
 */
import type { Config } from 'stylelint'

export default {
  // CSSの基本ルールは標準設定に任せる。
  extends: ['stylelint-config-standard'],
  rules: {
    // Nuxt UI/TailwindのVite処理がパッケージ名を解決できるよう、公式例の文字列importを維持する。
    'import-notation': 'string'
  }
} satisfies Config
