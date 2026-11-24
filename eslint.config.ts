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

export default withNuxt(
  // YAMLの汎用検査は別Issueで扱い、翻訳プリセットによる対象形式の拡大を避ける。
  { ignores: ['**/*.{yaml,yml}'] },
  // 無制限の無効化や無効化・再有効化の対応ミスは、公式の推奨設定で検出する。
  eslintComments.recommended,
  {
    // Nuxtの解析設定より後に、翻訳JSONのメッセージ検査に必要なパーサーを指定する。
    files: ['i18n/locales/*.json'],
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
  // 翻訳の検査は公式推奨設定に従い、Vue・TSの解析設定は後段のNuxt設定を優先する。
  // @ts-expect-error -- 外部プリセットの型定義がexactOptionalPropertyTypesに未対応のため、この参照だけを除外する。
  ...vueI18n.configs.recommended,
  {
    settings: {
      'vue-i18n': {
        localeDir: 'i18n/locales/*.json',
        messageSyntaxVersion: '^11.0.0'
      }
    }
  },
  // script setupにもTS規約を適用する。Vueのパーサー・自動インポートは後段のNuxt設定を優先する。
  // JSXは使わないため、対応するルールは読み込まない。
  ...neostandard({ ts: true, filesTs: ['**/*.vue'], noJsx: true })
)
