/**
 * Vueの推奨ルールと、Safariのリスト読み上げに必要な限定的な例外を設定する。
 */
import type { Config } from '@markuplint/ml-config'

export default {
  // Vueのテンプレート構文に対応した推奨ルールを共通の基準にする。
  extends: ['markuplint:recommended-vue'],
  parser: {
    '\\.vue$': '@markuplint/vue-parser'
  },
  specs: {
    '\\.vue$': '@markuplint/vue-spec'
  },
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
} satisfies Config
