/**
 * Vueの推奨ルールと、Safariのリスト読み上げに必要な限定的な例外を設定する。
 */
import type { Config } from '@markuplint/ml-config'

const config: Config = {
  // Vueのテンプレート構文に対応した推奨ルールを共通の基準にする。
  extends: ['markuplint:recommended-vue'],
  // Vueテンプレートの構文を解析する。
  parser: {
    '\\.vue$': '@markuplint/vue-parser'
  },
  // Vue固有の要素・属性の仕様を読み込む。
  specs: {
    '\\.vue$': '@markuplint/vue-spec'
  },
  // 必要な要素にだけ検査の例外を適用する。
  nodeRules: [
    {
      selector: 'ul[role="list"]',
      rules: {
        // Safariではlist-style: noneのリストが読み上げ時にリスト扱いされないため、
        // 明示的なrole="list"を残す。この要素だけ暗黙のroleとの重複チェックを除外する。
        'a11y/wai-aria/implicit-role': false
      }
    }
  ]
}

export default config
