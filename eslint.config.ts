/**
 * neostandard・Nuxtの規約と、ESLint制御コメント・TSDoc/JSDocのチェックを組み合わせる。
 */
import withNuxt from './.nuxt/eslint.config.mjs'
import { neostandard } from 'neostandard'
import eslintComments from '@eslint-community/eslint-plugin-eslint-comments/configs'
import tsdoc from 'eslint-plugin-tsdoc'
import jsdoc from 'eslint-plugin-jsdoc'

// Nuxtが生成するVue・TypeScript・JavaScriptの推奨設定を使う。
export default withNuxt(
  // 無制限の無効化や無効化・再有効化の対応ミスは、公式の推奨設定で検出する。
  eslintComments.recommended,
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
).prepend(
  // script setupにもTS規約を適用する。Vueのパーサー・自動インポートは後段のNuxt設定を優先する。
  // JSXは使わないため、対応するルールは読み込まない。
  ...neostandard({ ts: true, filesTs: ['**/*.vue'], noJsx: true })
)
