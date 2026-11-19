/**
 * neostandard・Nuxtの規約と、コメント・翻訳辞書のチェックを組み合わせる。
 */
import withNuxt from './.nuxt/eslint.config.mjs'
import { neostandard } from 'neostandard'
import eslintComments from '@eslint-community/eslint-plugin-eslint-comments/configs'
import tsdoc from 'eslint-plugin-tsdoc'
import jsdoc from 'eslint-plugin-jsdoc'
import vue from 'eslint-plugin-vue'
import vueI18n from '@intlify/eslint-plugin-vue-i18n'
import * as jsoncParser from 'jsonc-eslint-parser'
import { defineConfig } from 'eslint/config'
import type { Linter } from 'eslint'

export default withNuxt(
  // 無制限の無効化や無効化・再有効化の対応ミスは、公式の推奨設定で検出する。
  eslintComments.recommended,
  {
    name: 'app/i18n-json',
    files: ['i18n/locales/*.json'],
    // 外部辞書はSFCとしてではなくJSONとして解析し、メッセージ構文とキーの検査を有効にする。
    languageOptions: { parser: jsoncParser }
  },
  {
    name: 'app/tsdoc',
    files: ['**/*.{ts,mts,cts,vue}'],
    plugins: { tsdoc },
    rules: {
      // 積極的に記載するTSDocのタグや記法を、TSとVueのscript内で検査する。
      'tsdoc/syntax': 'error'
    }
  },
  {
    ...jsdoc.configs['flat/recommended-error'],
    name: 'app/jsdoc-javascript',
    files: ['**/*.{js,mjs,cjs}']
  },
  {
    ...jsdoc.configs['flat/recommended-tsdoc-error'],
    name: 'app/jsdoc-tsdoc',
    files: ['**/*.{ts,mts,cts,vue}']
  }
).insertBefore(
  // Vue公式の推奨設定を使い、ページ名などのNuxt固有の例外は後段で維持する。
  'nuxt/disables/routes',
  ...vue.configs['flat/recommended']
).prepend(
  // 翻訳の推奨検査はアプリと辞書へ限定し、Vue・TSの解析設定は後段のNuxt設定を優先する。
  ...defineConfig({
    name: 'app/i18n',
    files: ['app/**/*.{vue,ts}', 'i18n/locales/*.json'],
    // 外部プリセットの型推論がexactOptionalPropertyTypesに対応しないため、公式の設定型へ揃える。
    extends: vueI18n.configs.recommended as unknown as Linter.Config[],
    settings: {
      'vue-i18n': {
        localeDir: 'i18n/locales/*.json',
        messageSyntaxVersion: '^11.0.0'
      }
    },
    rules: {
      // フォールバックで翻訳漏れを隠さず、言語間で同じキーを揃える。
      '@intlify/vue-i18n/no-missing-keys-in-other-locales': 'error',
      // 日付・分類の区切り記号は日英で共通とし、翻訳辞書へ移さない。
      '@intlify/vue-i18n/no-raw-text': ['warn', { ignoreText: ['/'] }]
    }
  }),
  // script setupにもTS規約を適用する。Vueのパーサー・自動インポートは後段のNuxt設定を優先する。
  // JSXは使わないため、対応するルールは読み込まない。
  ...neostandard({ ts: true, filesTs: ['**/*.vue'], noJsx: true })
)
